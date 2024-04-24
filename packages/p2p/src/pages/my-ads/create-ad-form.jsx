import * as React from 'react';
import classNames from 'classnames';
import { Formik, Field, Form } from 'formik';
import { Button, Div100vhContainer, Input, RadioGroup, Text, ThemedScrollbars } from '@deriv/components';
import { formatMoney, isDesktop, isMobile } from '@deriv/shared';
import { observer, useStore } from '@deriv/stores';
import { useP2PExchangeRate, useP2PSettings } from '@deriv/hooks';
import FloatingRate from 'Components/floating-rate';
import { Localize, localize } from 'Components/i18next';
import { buy_sell } from 'Constants/buy-sell';
import { ad_type } from 'Constants/floating-rate';
import { useStores } from 'Stores';
import CreateAdSummary from './create-ad-summary.jsx';
import CreateAdFormPaymentMethods from './create-ad-form-payment-methods.jsx';
import { useModalManagerContext } from 'Components/modal-manager/modal-manager-context';
import OrderTimeSelection from './order-time-selection';
import './create-ad-form.scss';

const CreateAdFormWrapper = ({ children }) => {
    if (isMobile()) {
        return <Div100vhContainer height_offset='auto'>{children}</Div100vhContainer>;
    }
    return children;
};

const CreateAdForm = () => {
    const {
        client: { currency, local_currency_config },
    } = useStore();

    const { buy_sell_store, general_store, my_ads_store, my_profile_store } = useStores();
    const {
        p2p_settings: {
            adverts_archive_period,
            float_rate_offset_limit_string,
            order_payment_period_string,
            rate_type,
        },
    } = useP2PSettings();

    const [selected_methods, setSelectedMethods] = React.useState([]);
    const { useRegisterModalProps } = useModalManagerContext();
    const local_currency = local_currency_config.currency;
    const exchange_rate = useP2PExchangeRate(local_currency);

    // eslint-disable-next-line no-shadow
    const handleSelectPaymentMethods = selected_methods => {
        setSelectedMethods(selected_methods);
    };

    // when adding payment methods in creating an ad, once user declines to save their payment method, flow is to close all add payment method modals
    useRegisterModalProps({
        key: 'CancelAddPaymentMethodModal',
        props: {
            should_hide_all_modals_on_cancel: true,
        },
    });

    const onCleanup = () => {
        my_ads_store.setApiErrorMessage('');
        my_ads_store.setShowAdForm(false);
        buy_sell_store.setCreateSellAdFromNoAds(false);
    };

    const onSubmit = (values, { setSubmitting }) => {
        my_ads_store.handleSubmit(values, { setSubmitting }, false, adverts_archive_period);
    };

    React.useEffect(() => {
        my_ads_store.setCurrentMethod({ key: null, is_deleted: false });
        my_profile_store.getPaymentMethodsList();
        my_profile_store.getAdvertiserPaymentMethods();

        return () => {
            onCleanup();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    contact_info: general_store.contact_info,
                    default_advert_description: general_store.default_advert_description,
                    float_rate_offset_limit: float_rate_offset_limit_string,
                    max_transaction: '',
                    min_transaction: '',
                    offer_amount: '',
                    order_completion_time: order_payment_period_string,
                    payment_info: my_ads_store.payment_info,
                    rate_type_string: rate_type,
                    rate_type: rate_type === ad_type.FLOAT ? '-0.01' : '',
                    type: buy_sell_store.create_sell_ad_from_no_ads ? buy_sell.SELL : buy_sell.BUY,
                }}
                onSubmit={onSubmit}
                validate={my_ads_store.validateCreateAdForm}
            >
                {({ errors, handleChange, isSubmitting, isValid, setFieldTouched, setFieldValue, touched, values }) => {
                    const is_sell_advert = values.type === buy_sell.SELL;

                    const onChangeAdTypeHandler = user_input => {
                        if (rate_type === ad_type.FLOAT) {
                            if (user_input === buy_sell.SELL) {
                                setFieldValue('rate_type', '+0.01');
                            } else {
                                setFieldValue('rate_type', '-0.01');
                            }
                        }

                        setFieldValue('type', user_input);
                    };

                    return (
                        <div className='create-ad-form' data-testid='dp2p-create-ad-form_container'>
                            <Form noValidate>
                                <ThemedScrollbars
                                    className='create-ad-form__scrollbar'
                                    is_scrollbar_hidden={isMobile()}
                                >
                                    <CreateAdFormWrapper>
                                        <div className='create-ad-form__scrollbar-container'>
                                            <Field name='type'>
                                                {({ field }) => (
                                                    <RadioGroup
                                                        {...field}
                                                        className='create-ad-form__radio-group'
                                                        name='type'
                                                        onToggle={event => onChangeAdTypeHandler(event.target.value)}
                                                        selected={values.type}
                                                        required
                                                    >
                                                        <RadioGroup.Item
                                                            value={buy_sell.BUY}
                                                            label={localize('Buy {{currency}}', { currency })}
                                                        />
                                                        <RadioGroup.Item
                                                            value={buy_sell.SELL}
                                                            label={localize('Sell {{currency}}', { currency })}
                                                        />
                                                    </RadioGroup>
                                                )}
                                            </Field>
                                            <CreateAdSummary
                                                market_feed={rate_type === ad_type.FLOAT ? exchange_rate : null}
                                                offer_amount={errors.offer_amount ? '' : values.offer_amount}
                                                price_rate={values.rate_type}
                                                type={values.type}
                                            />

                                            <div className='create-ad-form__container'>
                                                <Field name='offer_amount'>
                                                    {({ field }) => (
                                                        <Input
                                                            {...field}
                                                            data-testid='offer_amount'
                                                            data-lpignore='true'
                                                            type='text'
                                                            error={touched.offer_amount && errors.offer_amount}
                                                            label={localize('Total amount')}
                                                            className={classNames('create-ad-form__field', {
                                                                'create-ad-form__offer-amt__sell-ad':
                                                                    values.type === buy_sell.SELL,
                                                            })}
                                                            trailing_icon={
                                                                <Text
                                                                    color={isDesktop() ? 'less-prominent' : 'prominent'}
                                                                    size={isDesktop() ? 'xxs' : 's'}
                                                                >
                                                                    {currency}
                                                                </Text>
                                                            }
                                                            onFocus={() => setFieldTouched('offer_amount', true)}
                                                            onChange={e => {
                                                                my_ads_store.restrictLength(e, handleChange);
                                                            }}
                                                            hint={
                                                                // Using two "==" is intentional as we're checking for nullish
                                                                // rather than falsy values.
                                                                !is_sell_advert ||
                                                                general_store.advertiser_info.balance_available == null
                                                                    ? undefined
                                                                    : localize(
                                                                          'Your Deriv P2P balance is {{ dp2p_balance }}',
                                                                          {
                                                                              dp2p_balance: `${formatMoney(
                                                                                  currency,
                                                                                  general_store.advertiser_info
                                                                                      .balance_available,
                                                                                  true
                                                                              )} ${currency}`,
                                                                          }
                                                                      )
                                                            }
                                                            is_relative_hint
                                                        />
                                                    )}
                                                </Field>
                                                <Field name='rate_type'>
                                                    {({ field }) =>
                                                        rate_type === ad_type.FLOAT ? (
                                                            <FloatingRate
                                                                className='create-ad-form__field'
                                                                data_testid='float_rate_type'
                                                                error_messages={errors.rate_type}
                                                                fiat_currency={currency}
                                                                local_currency={local_currency}
                                                                onChange={handleChange}
                                                                onFocus={() => setFieldTouched('rate_type', true)}
                                                                offset={{
                                                                    upper_limit: float_rate_offset_limit_string,
                                                                    lower_limit: float_rate_offset_limit_string * -1,
                                                                }}
                                                                required
                                                                change_handler={e => {
                                                                    my_ads_store.restrictDecimalPlace(e, handleChange);
                                                                }}
                                                                {...field}
                                                            />
                                                        ) : (
                                                            <Input
                                                                {...field}
                                                                data-testid='fixed_rate_type'
                                                                data-lpignore='true'
                                                                type='text'
                                                                error={touched.rate_type && errors.rate_type}
                                                                label={localize('Fixed rate (1 {{currency}})', {
                                                                    currency,
                                                                })}
                                                                className='create-ad-form__field'
                                                                trailing_icon={
                                                                    <Text
                                                                        color={
                                                                            isDesktop() ? 'less-prominent' : 'prominent'
                                                                        }
                                                                        size={isDesktop() ? 'xxs' : 's'}
                                                                    >
                                                                        {local_currency}
                                                                    </Text>
                                                                }
                                                                onChange={e => {
                                                                    my_ads_store.restrictLength(e, handleChange);
                                                                }}
                                                                onFocus={() => setFieldTouched('rate_type', true)}
                                                                required
                                                            />
                                                        )
                                                    }
                                                </Field>
                                            </div>
                                            <div className='create-ad-form__container'>
                                                <Field name='min_transaction'>
                                                    {({ field }) => (
                                                        <Input
                                                            {...field}
                                                            data-lpignore='true'
                                                            data-testid='min_transaction'
                                                            type='text'
                                                            error={touched.min_transaction && errors.min_transaction}
                                                            label={localize('Min order')}
                                                            className='create-ad-form__field'
                                                            trailing_icon={
                                                                <Text
                                                                    color={isDesktop() ? 'less-prominent' : 'prominent'}
                                                                    size={isDesktop() ? 'xxs' : 's'}
                                                                >
                                                                    {currency}
                                                                </Text>
                                                            }
                                                            onChange={e => {
                                                                my_ads_store.restrictLength(e, handleChange);
                                                            }}
                                                            onFocus={() => setFieldTouched('min_transaction', true)}
                                                            required
                                                        />
                                                    )}
                                                </Field>
                                                <Field name='max_transaction'>
                                                    {({ field }) => (
                                                        <Input
                                                            {...field}
                                                            data-testid='max_transaction'
                                                            data-lpignore='true'
                                                            type='text'
                                                            error={touched.max_transaction && errors.max_transaction}
                                                            label={localize('Max order')}
                                                            className='create-ad-form__field'
                                                            trailing_icon={
                                                                <Text
                                                                    color={isDesktop() ? 'less-prominent' : 'prominent'}
                                                                    size={isDesktop() ? 'xxs' : 's'}
                                                                >
                                                                    {currency}
                                                                </Text>
                                                            }
                                                            onChange={e => {
                                                                my_ads_store.restrictLength(e, handleChange);
                                                            }}
                                                            onFocus={() => setFieldTouched('max_transaction', true)}
                                                            required
                                                        />
                                                    )}
                                                </Field>
                                            </div>
                                            {is_sell_advert && (
                                                <div className='create-ad-form__field--contact-details'>
                                                    <Field name='contact_info'>
                                                        {({ field }) => (
                                                            <Input
                                                                {...field}
                                                                data-testid='contact_info'
                                                                data-lpignore='true'
                                                                type='textarea'
                                                                label={
                                                                    <Text color='less-prominent' size='xs'>
                                                                        <Localize i18n_default_text='Your contact details' />
                                                                    </Text>
                                                                }
                                                                error={touched.contact_info && errors.contact_info}
                                                                className='create-ad-form__field create-ad-form__field--textarea'
                                                                initial_character_count={
                                                                    general_store.contact_info.length
                                                                }
                                                                required
                                                                has_character_counter
                                                                max_characters={300}
                                                                onFocus={() => setFieldTouched('contact_info', true)}
                                                            />
                                                        )}
                                                    </Field>
                                                </div>
                                            )}
                                            <Field name='default_advert_description'>
                                                {({ field }) => (
                                                    <Input
                                                        {...field}
                                                        data-testid='default_advert_description'
                                                        data-lpignore='true'
                                                        type='textarea'
                                                        error={
                                                            touched.default_advert_description &&
                                                            errors.default_advert_description
                                                        }
                                                        label={
                                                            <Text color='less-prominent' size='xs'>
                                                                <Localize i18n_default_text='Instructions (optional)' />
                                                            </Text>
                                                        }
                                                        hint={localize('This information will be visible to everyone.')}
                                                        className='create-ad-form__field create-ad-form__field--textarea'
                                                        initial_character_count={
                                                            general_store.default_advert_description.length
                                                        }
                                                        has_character_counter
                                                        max_characters={300}
                                                        onFocus={() =>
                                                            setFieldTouched('default_advert_description', true)
                                                        }
                                                        required
                                                    />
                                                )}
                                            </Field>
                                            <Field name='order_completion_time'>
                                                {({ field }) => (
                                                    <OrderTimeSelection
                                                        classNameDisplay='create-ad-form__dropdown-display'
                                                        {...field}
                                                    />
                                                )}
                                            </Field>
                                            <div className='create-ad-form__payment-methods--text'>
                                                <Text color='prominent'>
                                                    <Localize i18n_default_text='Payment methods' />
                                                </Text>
                                                <Text color='less-prominent'>
                                                    {is_sell_advert ? (
                                                        <Localize i18n_default_text='You may tap and choose up to 3.' />
                                                    ) : (
                                                        <Localize i18n_default_text='You may choose up to 3.' />
                                                    )}
                                                </Text>
                                            </div>
                                            <CreateAdFormPaymentMethods
                                                onSelectPaymentMethods={handleSelectPaymentMethods}
                                                is_sell_advert={is_sell_advert}
                                            />
                                        </div>
                                        <div className='create-ad-form__container create-ad-form__footer'>
                                            <Button
                                                className='create-ad-form__button'
                                                secondary
                                                large
                                                onClick={onCleanup}
                                                type='button'
                                            >
                                                <Localize i18n_default_text='Cancel' />
                                            </Button>
                                            <Button
                                                className='create-ad-form__button'
                                                primary
                                                large
                                                is_disabled={
                                                    isSubmitting ||
                                                    !isValid ||
                                                    !selected_methods.length ||
                                                    my_ads_store.current_method.is_deleted
                                                }
                                            >
                                                <Localize i18n_default_text='Post ad' />
                                            </Button>
                                        </div>
                                    </CreateAdFormWrapper>
                                </ThemedScrollbars>
                            </Form>
                        </div>
                    );
                }}
            </Formik>
        </React.Fragment>
    );
};

export default observer(CreateAdForm);
