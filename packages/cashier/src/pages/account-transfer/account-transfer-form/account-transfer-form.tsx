import classNames from 'classnames';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Field, FieldProps, Formik, Form } from 'formik';
import { Button, Dropdown, InlineMessage, Input, Loading, Money, Text } from '@deriv/components';
import {
    getDecimalPlaces,
    getCurrencyDisplayCode,
    getCurrencyName,
    getPlatformSettings,
    validNumber,
    routes,
} from '@deriv/shared';
import { localize, Localize } from '@deriv/translations';
import { useStore, observer } from '@deriv/stores';
import { TReactChangeEvent, TAccount, TAccountsList, TError } from '../../../types';
import CryptoFiatConverter from '../../../components/crypto-fiat-converter';
import ErrorDialog from '../../../components/error-dialog';
import PercentageSelector from '../../../components/percentage-selector';
import AccountTransferNote from './account-transfer-form-side-note';
import SideNote from '../../../components/side-note';
import AccountPlatformIcon from '../../../components/account-platform-icon';
import { useCashierStore } from '../../../stores/useCashierStores';
import './account-transfer-form.scss';
import AccountTransferReceipt from '../account-transfer-receipt/account-transfer-receipt';

type TAccountTransferFormProps = {
    error?: TError;
    onClickDeposit?: () => void;
    onClickNotes?: () => void;
    onClose: () => void;
    setSideNotes?: (notes: React.ReactNode[]) => void;
};

const AccountOption = ({ account, idx }: TAccountsList) => {
    const is_cfd_account = account.is_dxtrade || account.is_ctrader || account.is_mt || account.is_derivez;

    return (
        <React.Fragment key={idx}>
            {(account.currency || account.platform_icon) && (
                <div className='account-transfer-form__icon'>
                    <AccountPlatformIcon account={account} size={16} />
                </div>
            )}

            <div className='account-transfer-form__currency-wrapper'>
                <Text size='xxs' line_height='xs' styles={{ color: 'prominent', fontWeight: 'inherit' }}>
                    {!is_cfd_account ? getCurrencyName(account.currency) : account.text}
                </Text>
                {!account.is_derivez && (
                    <Text size='xxxs' align='left' color='less-prominent'>
                        {account.value}
                    </Text>
                )}
            </div>

            <span className='account-transfer-form__balance'>
                <Money
                    amount={account.balance}
                    currency={account.currency}
                    has_sign={Boolean(account.balance && Number(account.balance) < 0)}
                    show_currency
                />
            </span>
        </React.Fragment>
    );
};

let accounts_from: TAccount[] = [];
let accounts_to: TAccount[] = [];
let ctrader_accounts_from: TAccount[] = [];
let ctrader_accounts_to: TAccount[] = [];
let derivez_accounts_from: TAccount[] = [];
let derivez_accounts_to: TAccount[] = [];
let dxtrade_accounts_from: TAccount[] = [];
let dxtrade_accounts_to: TAccount[] = [];
let mt_accounts_from: TAccount[] = [];
let mt_accounts_to: TAccount[] = [];
let remaining_transfers: number | undefined;
let has_reached_maximum_daily_transfers = false;

const AccountTransferForm = observer(
    ({ error, onClickDeposit, onClickNotes, setSideNotes, onClose }: TAccountTransferFormProps) => {
        const {
            ui,
            client,
            common: { is_from_derivgo },
        } = useStore();

        const { is_mobile } = ui;
        const { account_limits, authentication_status, is_dxtrade_allowed, getLimits: onMount } = client;
        const { account_transfer, crypto_fiat_converter, general_store } = useCashierStore();

        const {
            account_transfer_amount,
            accounts_list,
            minimum_fee,
            onChangeTransferFrom,
            onChangeTransferTo,
            requestTransferBetweenAccounts,
            selected_from,
            selected_to,
            setAccountTransferAmount,
            error: { setErrorMessage },
            setTransferPercentageSelectorResult,
            transfer_fee,
            transfer_limit,
            validateTransferFromAmount,
            validateTransferToAmount,
            is_transfer_confirm,
        } = account_transfer;
        const { is_crypto, percentage, should_percentage_reset } = general_store;
        const {
            converter_from_amount,
            converter_from_error,
            converter_to_amount,
            converter_to_error,
            onChangeConverterFromAmount,
            onChangeConverterToAmount,
            resetConverter,
        } = crypto_fiat_converter;

        const [from_accounts, setFromAccounts] = React.useState({});
        const [to_accounts, setToAccounts] = React.useState({});
        const [transfer_to_hint, setTransferToHint] = React.useState<string>();

        const is_from_outside_cashier = !location.pathname.startsWith(routes.cashier);

        const { daily_transfers } = account_limits;
        const mt5_remaining_transfers = daily_transfers?.mt5;
        const ctrader_remaining_transfers = daily_transfers?.ctrader;
        const dxtrade_remaining_transfers = daily_transfers?.dxtrade;
        const derivez_remaining_transfers = daily_transfers?.derivez;
        const internal_remaining_transfers = daily_transfers?.internal;

        const is_mt_transfer = selected_to.is_mt || selected_from.is_mt;
        const is_ctrader_transfer = selected_to.is_ctrader || selected_from.is_ctrader;
        const is_dxtrade_transfer = selected_to.is_dxtrade || selected_from.is_dxtrade;
        const is_derivez_transfer = selected_to.is_derivez || selected_from.is_derivez;

        const platform_name_dxtrade = getPlatformSettings('dxtrade').name;

        const history = useHistory();

        const validateAmount = (amount: string) => {
            if (!amount) return localize('This field is required.');

            const { is_ok, message } = validNumber(amount, {
                type: 'float',
                decimals: getDecimalPlaces(selected_from.currency || ''),
                min: Number(transfer_limit.min),
                max: Number(transfer_limit.max),
            });
            if (!is_ok) return message;

            if (typeof selected_from.balance !== 'undefined' && Number(selected_from.balance) < Number(amount))
                return localize('Insufficient balance');

            return undefined;
        };

        const shouldShowTransferButton = (amount: string) => {
            return selected_from.currency === selected_to.currency ? !amount : !converter_from_amount;
        };

        const getAccounts = (type: string, { is_mt, is_ctrader, is_dxtrade, is_derivez }: TAccount) => {
            if (type === 'from') {
                if (is_mt) return mt_accounts_from;
                if (is_ctrader) return ctrader_accounts_from;
                if (is_dxtrade) return dxtrade_accounts_from;
                if (is_derivez) return derivez_accounts_from;

                return accounts_from;
            } else if (type === 'to') {
                if (is_mt) return mt_accounts_to;
                if (is_ctrader) return ctrader_accounts_to;
                if (is_dxtrade) return dxtrade_accounts_to;
                if (is_derivez) return derivez_accounts_to;

                return accounts_to;
            }
            return [];
        };

        React.useEffect(() => {
            onMount();
        }, [onMount]);

        React.useEffect(() => {
            accounts_from = [];
            mt_accounts_from = [];
            ctrader_accounts_from = [];
            dxtrade_accounts_from = [];
            derivez_accounts_from = [];
            accounts_to = [];
            mt_accounts_to = [];
            ctrader_accounts_to = [];
            dxtrade_accounts_to = [];
            derivez_accounts_to = [];

            accounts_list.forEach((account, idx) => {
                const text = <AccountOption idx={idx} account={account} />;
                const value = account.value;

                const is_cfd_account = account.is_mt || account.is_ctrader || account.is_dxtrade || account.is_derivez;
                getAccounts('from', account).push({
                    text,
                    value,
                    is_mt: account.is_mt,
                    is_ctrader: account.is_ctrader,
                    is_dxtrade: account.is_dxtrade,
                    nativepicker_text: `${is_cfd_account ? account.market_type : getCurrencyName(account.currency)} (${
                        account.balance
                    } ${is_cfd_account ? account.currency : account.text})`,
                });
                const is_selected_from = account.value === selected_from.value;

                if (
                    (selected_from.is_mt && (account.is_dxtrade || account.is_ctrader)) ||
                    (selected_from.is_dxtrade && (account.is_mt || account.is_ctrader)) ||
                    (selected_from.is_ctrader && (account.is_mt || account.is_dxtrade))
                )
                    return;

                // account from and to cannot be the same
                if (!is_selected_from) {
                    const is_selected_from_mt = selected_from.is_mt && account.is_mt;
                    const is_selected_from_ctrader = selected_from.is_ctrader && account.is_ctrader;
                    const is_selected_from_dxtrade = selected_from.is_dxtrade && account.is_dxtrade;

                    // cannot transfer to MT account from MT
                    // cannot transfer to cTrader account from cTrader
                    // cannot transfer to Dxtrade account from Dxtrade

                    const is_disabled = is_selected_from_mt || is_selected_from_ctrader || is_selected_from_dxtrade;

                    getAccounts('to', account).push({
                        text,
                        value,
                        is_mt: account.is_mt,
                        is_ctrader: account.is_ctrader,
                        is_dxtrade: account.is_dxtrade,
                        is_derivez: account.is_derivez,
                        disabled: is_disabled,
                        nativepicker_text: `${
                            is_cfd_account ? account.market_type : getCurrencyName(account.currency)
                        } (${account.balance} ${is_cfd_account ? account.currency : account.text})`,
                    });
                }
            });

            setFromAccounts({
                ...(mt_accounts_from.length && { [localize('Deriv MT5 accounts')]: mt_accounts_from }),
                ...(ctrader_accounts_from.length && { [localize('Deriv cTrader accounts')]: ctrader_accounts_from }),
                ...(dxtrade_accounts_from.length && {
                    [localize('{{platform_name_dxtrade}} accounts', { platform_name_dxtrade })]: dxtrade_accounts_from,
                }),
                ...(derivez_accounts_from.length && { [localize('Deriv EZ accounts')]: derivez_accounts_from }),
                ...(accounts_from.length && { [localize('Deriv accounts')]: accounts_from }),
            });

            setToAccounts({
                ...(mt_accounts_to.length && { [localize('Deriv MT5 accounts')]: mt_accounts_to }),
                ...(ctrader_accounts_to.length && { [localize('Deriv cTrader accounts')]: ctrader_accounts_to }),
                ...(dxtrade_accounts_to.length && {
                    [localize('{{platform_name_dxtrade}} accounts', { platform_name_dxtrade })]: dxtrade_accounts_to,
                }),
                ...(derivez_accounts_to.length && { [localize('Deriv EZ accounts')]: derivez_accounts_to }),
                ...(accounts_to.length && { [localize('Deriv accounts')]: accounts_to }),
            });
        }, [accounts_list, selected_to, selected_from]); // eslint-disable-line react-hooks/exhaustive-deps

        React.useEffect(() => {
            if (Object.keys(from_accounts).length) {
                const side_notes = [];
                side_notes.push(
                    <AccountTransferNote
                        allowed_transfers_count={{
                            internal: internal_remaining_transfers?.allowed,
                            mt5: mt5_remaining_transfers?.allowed,
                            ctrader: ctrader_remaining_transfers?.allowed,
                            dxtrade: dxtrade_remaining_transfers?.allowed,
                            derivez: derivez_remaining_transfers?.allowed,
                        }}
                        transfer_fee={transfer_fee}
                        currency={selected_from.currency || ''}
                        minimum_fee={minimum_fee}
                        key={0}
                        is_crypto_to_crypto_transfer={selected_from.is_crypto && selected_to.is_crypto}
                        is_dxtrade_allowed={is_dxtrade_allowed}
                        is_dxtrade_transfer={is_dxtrade_transfer}
                        is_mt_transfer={is_mt_transfer}
                        is_ctrader_transfer={is_ctrader_transfer}
                        is_from_derivgo={is_from_derivgo}
                        is_derivez_transfer={is_derivez_transfer}
                    />
                );
                setSideNotes?.([
                    <SideNote title={<Localize i18n_default_text='Notes' />} key={0}>
                        {side_notes}
                    </SideNote>,
                ]);
            }

            return () => {
                setSideNotes?.([]);
            };
        }, [
            transfer_fee,
            selected_from,
            selected_to,
            minimum_fee,
            from_accounts,
            is_dxtrade_allowed,
            setSideNotes,
            is_crypto,
            internal_remaining_transfers?.allowed,
            mt5_remaining_transfers?.allowed,
            dxtrade_remaining_transfers?.allowed,
            derivez_remaining_transfers?.allowed,
            is_dxtrade_transfer,
            is_mt_transfer,
            is_from_derivgo,
            is_derivez_transfer,
            ctrader_remaining_transfers?.allowed,
            is_ctrader_transfer,
        ]);

        React.useEffect(() => {
            const getRemainingTransfers = () => {
                if (is_mt_transfer) {
                    return mt5_remaining_transfers?.available;
                } else if (is_ctrader_transfer) {
                    return ctrader_remaining_transfers?.available;
                } else if (is_dxtrade_transfer) {
                    return dxtrade_remaining_transfers?.available;
                } else if (is_derivez_transfer) {
                    return derivez_remaining_transfers?.available;
                }
                return internal_remaining_transfers?.available;
            };

            remaining_transfers = getRemainingTransfers();
            has_reached_maximum_daily_transfers = !Number(remaining_transfers);

            const hint =
                remaining_transfers && Number(remaining_transfers) === 1
                    ? localize('You have {{number}} transfer remaining for today.', { number: remaining_transfers })
                    : localize('You have {{number}} transfers remaining for today.', { number: remaining_transfers });
            setTransferToHint(hint);
            resetConverter();
        }, [selected_to, selected_from, account_limits]); // eslint-disable-line react-hooks/exhaustive-deps

        const is_mt5_restricted =
            selected_from?.is_mt &&
            selected_from?.status?.includes('poa_failed') &&
            authentication_status?.document_status !== 'verified';

        const poa_pending_msg = localize(
            'You will be able to transfer funds between MT5 accounts and other accounts once your address is verified.'
        );

        const Mt5RestrictedMsg = () => (
            <Localize
                i18n_default_text='Please <0>resubmit</0> your proof of address to transfer funds between MT5 and Deriv accounts.'
                components={[<Link key={0} to={routes.proof_of_address} className='link dark' />]}
            />
        );

        const depositClick = () => {
            if (onClickDeposit) {
                onClickDeposit();
            }
            history.push(routes.cashier_deposit);
        };

        const getMt5Error = () => {
            if (is_mt5_restricted) {
                return authentication_status?.document_status === 'pending' ? poa_pending_msg : <Mt5RestrictedMsg />;
            }
            return null;
        };

        const NotesLink = () => {
            return (
                <div className='account-transfer-form__button-link' onClick={onClickNotes}>
                    <Text size='xs' weight='bold' color='red'>
                        <Localize i18n_default_text='Notes ' />
                    </Text>
                </div>
            );
        };

        if (is_transfer_confirm) {
            return <AccountTransferReceipt onClose={onClose} />;
        }

        return (
            <div
                className='cashier__wrapper account-transfer-form__wrapper'
                data-testid='dt_account_transfer_form_wrapper'
            >
                {!is_from_outside_cashier && (
                    <Text
                        as='h2'
                        color='prominent'
                        weight='bold'
                        align='center'
                        className='cashier__header cashier__content-header'
                    >
                        {localize('Transfer between your accounts in Deriv')}
                    </Text>
                )}
                <Formik
                    initialValues={{
                        amount: account_transfer_amount || '',
                        converter_from_amount: converter_from_amount || '',
                        converter_to_amount: converter_to_amount || '',
                    }}
                    onSubmit={() => {
                        requestTransferBetweenAccounts({
                            amount: account_transfer_amount ? Number(account_transfer_amount) : 0,
                        });
                    }}
                    validateOnBlur={false}
                    enableReinitialize
                >
                    {({ errors, handleChange, isSubmitting, setFieldValue, setFieldError, values }) => (
                        <React.Fragment>
                            {isSubmitting || accounts_list.length === 0 ? (
                                <div className='cashier__loader-wrapper' data-testid='dt_cashier_loader_wrapper'>
                                    <Loading className='cashier__loader' is_fullscreen={false} />
                                </div>
                            ) : (
                                <>
                                    {has_reached_maximum_daily_transfers && (
                                        <div className='account-transfer-form__inline-warning-message'>
                                            <InlineMessage
                                                message={localize(
                                                    'You have reached the maximum daily transfers. Please try again tomorrow.'
                                                )}
                                                size='sm'
                                            />
                                        </div>
                                    )}
                                    <Form className='account-transfer-form' noValidate>
                                        <div
                                            className='cashier__drop-down-wrapper account-transfer-form__drop-down-wrapper'
                                            data-testid='dt_account_transfer_form_drop_down_wrapper'
                                        >
                                            <Dropdown
                                                id='transfer_from'
                                                className='account-transfer-form__drop-down'
                                                classNameDisplay='cashier__drop-down-display'
                                                classNameDisplaySpan='cashier__drop-down-display-span'
                                                classNameItems='cashier__drop-down-items'
                                                classNameLabel='cashier__drop-down-label'
                                                test_id='dt_account_transfer_form_drop_down'
                                                is_large
                                                label={localize('From')}
                                                list={from_accounts}
                                                list_height='404'
                                                name='transfer_from'
                                                value={selected_from.value}
                                                onChange={(e: TReactChangeEvent) => {
                                                    onChangeTransferFrom(e);
                                                    handleChange(e);
                                                    setFieldValue('amount', '');
                                                    setTimeout(() => setFieldError('amount', ''));
                                                }}
                                                error={selected_from.error}
                                            />
                                            <Dropdown
                                                id='transfer_to'
                                                className='account-transfer-form__drop-down account-transfer-form__drop-down--to-dropdown'
                                                classNameDisplay='cashier__drop-down-display'
                                                classNameDisplaySpan='cashier__drop-down-display-span'
                                                classNameItems='cashier__drop-down-items'
                                                classNameLabel='cashier__drop-down-label'
                                                cclassNameHint={classNames('account-transfer-form__hint', {
                                                    'account-transfer-form__hint__disabled':
                                                        has_reached_maximum_daily_transfers,
                                                })}
                                                test_id='dt_account_transfer_form_to_dropdown'
                                                is_large
                                                label={localize('To')}
                                                list={to_accounts}
                                                list_height='404'
                                                initial_height_offset={is_mobile ? 160 : 180}
                                                name='transfer_to'
                                                value={selected_to.value}
                                                onChange={(e: TReactChangeEvent) => {
                                                    onChangeTransferTo(e);
                                                    setFieldValue('amount', '');
                                                    setTimeout(() => setFieldError('amount', ''));
                                                }}
                                                hint={transfer_to_hint}
                                                error={getMt5Error() ?? selected_to.error}
                                            />
                                        </div>
                                        {selected_from.currency === selected_to.currency ? (
                                            <Field name='amount' validate={validateAmount}>
                                                {({ field }: FieldProps<string>) => (
                                                    <Input
                                                        {...field}
                                                        onChange={(e: TReactChangeEvent) => {
                                                            setErrorMessage({ code: '', message: '' });
                                                            handleChange(e);
                                                            setAccountTransferAmount(e.target.value);
                                                        }}
                                                        className={classNames(
                                                            'cashier__input dc-input--no-placeholder account-transfer-form__input',
                                                            {
                                                                'account-transfer-form__input-fit-content':
                                                                    !is_from_outside_cashier,
                                                            }
                                                        )}
                                                        classNameHint={classNames('account-transfer-form__hint', {
                                                            'account-transfer-form__hint__disabled':
                                                                is_mt5_restricted ||
                                                                has_reached_maximum_daily_transfers,
                                                        })}
                                                        data-testid='dt_account_transfer_form_input'
                                                        name='amount'
                                                        type='text'
                                                        label={localize('Amount')}
                                                        error={errors.amount ? errors.amount : ''}
                                                        required
                                                        trailing_icon={
                                                            selected_from.currency ? (
                                                                <span
                                                                    className={classNames(
                                                                        'symbols',
                                                                        `symbols--${selected_from.currency.toLowerCase()}`
                                                                    )}
                                                                >
                                                                    {getCurrencyDisplayCode(selected_from.currency)}
                                                                </span>
                                                            ) : undefined
                                                        }
                                                        autoComplete='off'
                                                        maxLength={30}
                                                        hint={
                                                            transfer_limit.max ? (
                                                                <Localize
                                                                    i18n_default_text='Transfer limits: <0 /> - <1 />'
                                                                    components={[
                                                                        <Money
                                                                            key={0}
                                                                            amount={transfer_limit.min}
                                                                            currency={selected_from.currency}
                                                                            show_currency
                                                                        />,
                                                                        <Money
                                                                            key={1}
                                                                            amount={transfer_limit.max}
                                                                            currency={selected_from.currency}
                                                                            show_currency
                                                                        />,
                                                                    ]}
                                                                />
                                                            ) : (
                                                                ''
                                                            )
                                                        }
                                                        disabled={is_mt5_restricted}
                                                    />
                                                )}
                                            </Field>
                                        ) : (
                                            <div
                                                className={
                                                    is_mt5_restricted ? 'account-transfer-form__crypto--disabled' : ''
                                                }
                                            >
                                                <div className='account-transfer-form__crypto--percentage-selector'>
                                                    <PercentageSelector
                                                        amount={
                                                            selected_from.balance ? Number(selected_from.balance) : 0
                                                        }
                                                        from_account={selected_from.value}
                                                        getCalculatedAmount={setTransferPercentageSelectorResult}
                                                        percentage={percentage}
                                                        should_percentage_reset={should_percentage_reset}
                                                        to_account={selected_to.value}
                                                        from_currency={selected_from.currency || ''}
                                                        to_currency={selected_to.currency || ''}
                                                    />
                                                </div>
                                                <CryptoFiatConverter
                                                    from_currency={selected_from.currency || ''}
                                                    to_currency={selected_to.currency || ''}
                                                    hint={
                                                        transfer_limit.max ? (
                                                            <Localize
                                                                i18n_default_text='Transfer limits: <0 /> - <1 />'
                                                                components={[
                                                                    <Money
                                                                        key={0}
                                                                        amount={transfer_limit.min}
                                                                        currency={selected_from.currency}
                                                                        show_currency
                                                                    />,
                                                                    <Money
                                                                        key={1}
                                                                        amount={transfer_limit.max}
                                                                        currency={selected_from.currency}
                                                                        show_currency
                                                                    />,
                                                                ]}
                                                            />
                                                        ) : (
                                                            ''
                                                        )
                                                    }
                                                    onChangeConverterFromAmount={onChangeConverterFromAmount}
                                                    onChangeConverterToAmount={onChangeConverterToAmount}
                                                    resetConverter={resetConverter}
                                                    validateFromAmount={validateTransferFromAmount}
                                                    validateToAmount={validateTransferToAmount}
                                                />
                                            </div>
                                        )}
                                        <div
                                            className={classNames(
                                                'cashier__form-submit',
                                                'account-transfer-form__form-buttons',
                                                {
                                                    'account-transfer-form__form-buttons--with-notes':
                                                        is_from_outside_cashier,
                                                }
                                            )}
                                            data-testid='dt_account_transfer_form_submit'
                                        >
                                            {is_from_outside_cashier && <NotesLink />}
                                            <div className='account-transfer-form__form-buttons__default'>
                                                <Button secondary large onClick={depositClick}>
                                                    <Localize i18n_default_text='Deposit' />
                                                </Button>

                                                <Button
                                                    className='account-transfer-form__submit-button'
                                                    type='submit'
                                                    is_disabled={
                                                        isSubmitting ||
                                                        has_reached_maximum_daily_transfers ||
                                                        !!selected_from.error ||
                                                        !!selected_to.error ||
                                                        (selected_from.balance && !Number(selected_from.balance)) ||
                                                        !!converter_from_error ||
                                                        !!converter_to_error ||
                                                        !!errors.amount ||
                                                        shouldShowTransferButton(values.amount) ||
                                                        is_mt5_restricted
                                                    }
                                                    primary
                                                    large
                                                >
                                                    <Localize i18n_default_text='Transfer' />
                                                </Button>
                                            </div>
                                        </div>
                                        {!is_from_outside_cashier && (
                                            <SideNote title={<Localize i18n_default_text='Notes' />} is_mobile>
                                                <AccountTransferNote
                                                    allowed_transfers_count={{
                                                        internal: internal_remaining_transfers?.allowed,
                                                        mt5: mt5_remaining_transfers?.allowed,
                                                        ctrader: ctrader_remaining_transfers?.allowed,
                                                        dxtrade: dxtrade_remaining_transfers?.allowed,
                                                        derivez: derivez_remaining_transfers?.allowed,
                                                    }}
                                                    transfer_fee={transfer_fee}
                                                    currency={selected_from.currency || ''}
                                                    minimum_fee={minimum_fee}
                                                    is_crypto_to_crypto_transfer={
                                                        selected_from.is_crypto && selected_to.is_crypto
                                                    }
                                                    is_dxtrade_allowed={is_dxtrade_allowed}
                                                    is_dxtrade_transfer={is_dxtrade_transfer}
                                                    is_ctrader_transfer={is_ctrader_transfer}
                                                    is_mt_transfer={is_mt_transfer}
                                                    is_from_derivgo={is_from_derivgo}
                                                    is_derivez_transfer={is_derivez_transfer}
                                                />
                                            </SideNote>
                                        )}
                                        <ErrorDialog error={error} />
                                    </Form>
                                </>
                            )}
                        </React.Fragment>
                    )}
                </Formik>
            </div>
        );
    }
);
AccountTransferForm.displayName = 'AccountTransferForm';
export default AccountTransferForm;
