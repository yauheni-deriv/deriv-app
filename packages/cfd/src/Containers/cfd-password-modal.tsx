import { Formik, FormikErrors, FormikHelpers } from 'formik';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { SentEmailModal } from '@deriv/account';
import { DetailsOfEachMT5Loginid, GetAccountStatus, LandingCompany, Mt5NewAccount } from '@deriv/api-types';
import RootStore from '../Stores/index';
import { getMtCompanies, getFormattedJurisdictionCode, TMtCompanies } from '../Stores/Modules/CFD/Helpers/cfd-config';
import {
    FormSubmitButton,
    Icon,
    MobileDialog,
    Modal,
    PasswordInput,
    PasswordMeter,
    Text,
    MultiStep,
} from '@deriv/components';
import {
    CFD_PLATFORMS,
    getCFDPlatformLabel,
    getErrorMessages,
    getLegalEntityName,
    isDesktop,
    isMobile,
    routes,
    validLength,
    validPassword,
    WS,
} from '@deriv/shared';
import { localize, Localize } from '@deriv/translations';
import SuccessDialog from '../Components/success-dialog';
import 'Sass/cfd.scss';
import { connect } from '../Stores/connect';
import ChangePasswordConfirmation from './cfd-change-password-confirmation';

export type TCFDPasswordFormValues = { password: string };

type TExtendedDetailsOfEachMT5Loginid = Omit<DetailsOfEachMT5Loginid, 'market_type'> & {
    market_type?: 'synthetic' | 'financial' | 'gaming';
};

type TOnSubmitPassword = (values: TCFDPasswordFormValues, actions: FormikHelpers<TCFDPasswordFormValues>) => void;

type TPasswordModalHeaderProps = {
    should_set_trading_password: boolean;
    is_password_reset_error: boolean;
    platform: string;
    has_mt5_account?: boolean;
    context: RootStore;
};

type TIconTypeProps = {
    platform: string;
    type?: string;
    is_eu: boolean;
};

type TCFDPasswordFormReusedProps = {
    platform: string;
    context: RootStore;
    error_message: string;
    validatePassword: (values: TCFDPasswordFormValues) => FormikErrors<TCFDPasswordFormValues>;
};

type TCFDCreatePasswordProps = TCFDPasswordFormReusedProps & {
    password: string;
    context: RootStore;
    onSubmit: TOnSubmitPassword;
    is_real_financial_stp: boolean;
};

type TCFDCreatePasswordFormProps = TCFDPasswordFormReusedProps & {
    has_mt5_account: boolean;
    context: RootStore;
    submitPassword: TOnSubmitPassword;
    is_real_financial_stp: boolean;
};

type TMultiStepRefProps = {
    goNextStep: () => void;
    goPrevStep: () => void;
};

type TCFDPasswordFormProps = TCFDPasswordFormReusedProps & {
    account_title: string;
    account_type: {
        category?: string;
        type?: string;
    };
    closeModal: () => void;
    context: RootStore;
    error_type?: string;
    form_error?: string;
    has_mt5_account: boolean;
    is_bvi: boolean;
    is_dxtrade_allowed: boolean;
    is_real_financial_stp: boolean;
    jurisdiction_selected_shortcode: string;
    onCancel: () => void;
    onForgotPassword: () => void;
    should_set_trading_password: boolean;
    submitPassword: TOnSubmitPassword;
};

type TCFDPasswordModalProps = RouteComponentProps & {
    account_title: string;
    context: RootStore;
    account_type: {
        category?: string;
        type?: string;
    };
    account_status: GetAccountStatus;
    disableCFDPasswordModal: () => void;
    email: string;
    error_message: string;
    error_type?: string;
    form_error?: string;
    getAccountStatus: (platform: string) => void;
    is_eu: boolean;
    is_fully_authenticated: boolean;
    is_cfd_password_modal_enabled: boolean;
    is_cfd_success_dialog_enabled: boolean;
    is_dxtrade_allowed: boolean;
    jurisdiction_selected_shortcode: string;
    platform: string;
    has_cfd_error: boolean;
    landing_companies: LandingCompany;
    mt5_login_list: TExtendedDetailsOfEachMT5Loginid[];
    cfd_new_account: Mt5NewAccount;
    setCFDSuccessDialog: (value: boolean) => void;
    setMt5Error: (state: boolean, obj?: Error) => void;
    submitMt5Password: (values: TCFDPasswordFormValues, actions: FormikHelpers<TCFDPasswordFormValues>) => void;
    submitCFDPassword: (
        values: TCFDPasswordFormValues & { platform?: string },
        actions: FormikHelpers<TCFDPasswordFormValues>
    ) => void;
};

const PasswordModalHeader = ({
    should_set_trading_password,
    is_password_reset_error,
    platform,
    context,
}: TPasswordModalHeaderProps) => {
    const element = isMobile() ? 'p' : 'span';
    const alignment = 'center';
    const font_size = 's';
    const style = isMobile()
        ? {
              padding: '2rem',
          }
        : {};

    return (
        <Text styles={style} as={element} line_height='m' weight='bold' size={font_size} align={alignment}>
            {!should_set_trading_password && !is_password_reset_error && (
                <Localize
                    i18n_default_text='Enter your {{platform}} password'
                    values={{
                        platform: getCFDPlatformLabel(platform),
                    }}
                />
            )}
            {is_password_reset_error && <Localize i18n_default_text='Too many attempts' />}
        </Text>
    );
};
const getSubmitText = (
    platform: string,
    is_eu: boolean,
    needs_poi: boolean,
    jurisdiction_selected_shortcode: string,
    type?: string,
    category?: string
) => {
    if (!category && !type) return '';

    const category_label = category === 'real' ? localize('real') : localize('demo');
    const type_label =
        getMtCompanies(is_eu)[category as keyof TMtCompanies][type as keyof TMtCompanies['demo' | 'real']].short_title;
    const jurisdiction_label = getFormattedJurisdictionCode(jurisdiction_selected_shortcode);

    if (category === 'real') {
        if (needs_poi) {
            return localize('We need proof of your identity and address before you can start trading.');
        }

        return (
            <Localize
                i18n_default_text='Congratulations, you have successfully created your {{category}} {{platform}} <0>{{type}} {{jurisdiction_selected_shortcode}}</0> account. To start trading, transfer funds from your Deriv account into this account.'
                values={{
                    // TODO: remove below condition once deriv x changes are completed
                    type: platform === 'dxtrade' && type_label === 'Derived' ? 'Synthetic' : type_label,
                    platform: getCFDPlatformLabel(platform),
                    category: category_label,
                    jurisdiction_selected_shortcode: jurisdiction_label,
                }}
                components={[<strong className='cfd-account__platform' key={0} />]}
            />
        );
    }

    return (
        <Localize
            i18n_default_text='Congratulations, you have successfully created your {{category}} {{platform}} <0>{{type}}</0> account.'
            values={{
                type: type_label,
                platform: getCFDPlatformLabel(platform),
                category: category_label,
            }}
            components={[<strong className='cfd-account__platform' key={0} />]}
        />
    );
};

const IconType = React.memo(({ platform, type, is_eu }: TIconTypeProps) => {
    if (platform === CFD_PLATFORMS.DXTRADE) {
        switch (type) {
            case 'all':
                return <Icon icon='IcDxtradeDerivxPlatform' size={128} />;
            case 'synthetic':
                return <Icon icon='IcDxtradeSyntheticPlatform' size={128} />;
            case 'financial':
                return <Icon icon='IcDxtradeFinancialPlatform' size={128} />;
            default:
                return <Icon icon='IcDxtradeDerivxPlatform' size={128} />;
        }
    }

    switch (type) {
        case 'synthetic':
            return <Icon icon='IcMt5SyntheticPlatform' size={128} />;
        case 'financial':
            if (is_eu) {
                return <Icon icon='IcMt5CfdPlatform' size={128} />;
            }
            return <Icon icon='IcMt5FinancialPlatform' size={128} />;
        default:
            return <Icon icon='IcMt5FinancialStpPlatform' size={128} />;
    }
});
IconType.displayName = 'IconType';

const getCancelButtonLabel = ({ should_set_trading_password, error_type }: TCFDPasswordFormProps) => {
    if (should_set_trading_password && error_type !== 'PasswordReset') {
        return isDesktop() ? null : localize('Cancel');
    }

    return localize('Forgot password?');
};

const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    handleChange: (el: React.ChangeEvent<HTMLInputElement>) => void,
    validateForm: (values?: TCFDPasswordFormValues) => Promise<FormikErrors<TCFDPasswordFormValues>>,
    setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void
) => {
    handleChange(e);
    validateForm().then(() => {
        setFieldTouched('password', true);
    });
};

const CreatePassword = ({
    password,
    platform,
    validatePassword,
    context,
    onSubmit,
    error_message,
    is_real_financial_stp,
}: TCFDCreatePasswordProps) => {
    return (
        <Formik
            initialValues={{
                password,
            }}
            enableReinitialize
            validate={validatePassword}
            onSubmit={onSubmit}
        >
            {({
                errors,
                isSubmitting,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldTouched,
                touched,
                values,
                validateForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <div
                        className='cfd-password-modal__content dc-modal__container_cfd-password-modal__body cfd-password-modal__create-password-content'
                        data-testid='dt_create_password'
                    >
                        <Icon
                            icon={platform === CFD_PLATFORMS.MT5 ? 'IcMt5OnePassword' : 'IcDxtradeOnePassword'}
                            width='122'
                            height='108'
                        />
                        <Text size='s' weight='bold' className='cfd-password-modal__create-password-title'>
                            <Localize
                                i18n_default_text='Create a {{platform}} password'
                                values={{
                                    platform: getCFDPlatformLabel(platform),
                                }}
                            />
                        </Text>
                        <Text size='xs' align='center' className='cfd-password-modal__create-password-description'>
                            <Localize
                                i18n_default_text='You can use this password for all your {{platform}} accounts.'
                                values={{
                                    platform: getCFDPlatformLabel(platform),
                                }}
                            />
                        </Text>
                        <div className='input-element'>
                            <PasswordMeter
                                input={values.password}
                                context={context}
                                has_error={!!(touched.password && errors.password)}
                                custom_feedback_messages={getErrorMessages().password_warnings}
                            >
                                {() => (
                                    <PasswordInput
                                        autoComplete='new-password'
                                        label={localize('{{platform}} password', {
                                            platform: getCFDPlatformLabel(platform),
                                        })}
                                        error={
                                            (touched.password && errors.password) ||
                                            (values.password.length === 0 ? error_message : '')
                                        }
                                        name='password'
                                        value={values.password}
                                        onBlur={handleBlur}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            handlePasswordInputChange(e, handleChange, validateForm, setFieldTouched);
                                        }}
                                        data_testId={`dt_${platform}_password`}
                                    />
                                )}
                            </PasswordMeter>
                        </div>
                        {is_real_financial_stp && (
                            <div className='dc-modal__container_cfd-password-modal__description'>
                                <Localize i18n_default_text='Your MT5 Financial STP account will be opened through Deriv (FX) Ltd. All trading in this account is subject to the regulations and guidelines of the Labuan Financial Service Authority (LFSA). None of your other accounts, including your Deriv account, is subject to the regulations and guidelines of the Labuan Financial Service Authority (LFSA).' />
                            </div>
                        )}
                        <FormSubmitButton
                            is_disabled={!values.password || Object.keys(errors).length > 0}
                            is_loading={isSubmitting}
                            label={localize('Create {{platform}} password', {
                                platform: getCFDPlatformLabel(platform),
                            })}
                            is_center={true}
                            context={context}
                        />
                    </div>
                </form>
            )}
        </Formik>
    );
};

const CFDCreatePasswordForm = ({
    has_mt5_account,
    platform,
    error_message,
    context,
    validatePassword,
    submitPassword,
    is_real_financial_stp,
}: TCFDCreatePasswordFormProps) => {
    const multi_step_ref = React.useRef<TMultiStepRefProps>();
    const [password, setPassword] = React.useState('');

    const onSubmit: TOnSubmitPassword = (values, actions) => {
        if (platform === CFD_PLATFORMS.MT5 && has_mt5_account) {
            setPassword(values.password);
            multi_step_ref.current?.goNextStep();
        } else {
            submitPassword(values, actions);
        }
    };

    const steps = [
        {
            component: (
                <CreatePassword
                    password={password}
                    context={context}
                    platform={platform}
                    error_message={error_message}
                    validatePassword={validatePassword}
                    onSubmit={onSubmit}
                    is_real_financial_stp={is_real_financial_stp}
                />
            ),
        },
        {
            component: (
                <ChangePasswordConfirmation
                    className='cfd-password-modal__change-password-confirmation'
                    platform={platform}
                    onConfirm={(_values: TCFDPasswordFormValues, actions: FormikHelpers<TCFDPasswordFormValues>) =>
                        submitPassword({ password }, actions)
                    }
                    onCancel={() => multi_step_ref.current?.goPrevStep()}
                    context={context}
                />
            ),
        },
    ];

    return <MultiStep ref={multi_step_ref} steps={steps} />;
};

const CFDPasswordForm = (props: TCFDPasswordFormProps) => {
    const button_label = React.useMemo(() => {
        if (props.error_type === 'PasswordReset') {
            return localize('Try later');
        }
        return localize('Add account');
    }, [props.error_type]);

    const has_cancel_button =
        (isDesktop() ? !props.should_set_trading_password : true) || props.error_type === 'PasswordReset';
    const cancel_button_label = getCancelButtonLabel(props);

    const handleCancel = () => {
        if (!has_cancel_button) {
            return undefined;
        }
        if (props.should_set_trading_password) {
            return props.onCancel();
        }

        return props.onForgotPassword();
    };

    if (props.error_type === 'PasswordReset') {
        return (
            <React.Fragment>
                <div className='cfd-password-reset'>
                    <div className='cfd-password-modal__content cfd-password-modal__content--password-reset'>
                        <Text as='p' line_height='24' size='xs'>
                            <Localize i18n_default_text='Please try again in a minute.' />
                        </Text>
                    </div>
                    <Formik onSubmit={props.closeModal} initialValues={{}}>
                        {({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <FormSubmitButton
                                    has_cancel={has_cancel_button}
                                    cancel_label={cancel_button_label}
                                    onCancel={handleCancel}
                                    context={props.context}
                                    is_absolute={isMobile()}
                                    label={button_label}
                                />
                            </form>
                        )}
                    </Formik>
                </div>
            </React.Fragment>
        );
    }

    if (props.should_set_trading_password) {
        return (
            <CFDCreatePasswordForm
                platform={props.platform}
                context={props.context}
                error_message={props.error_message}
                validatePassword={props.validatePassword}
                submitPassword={props.submitPassword}
                has_mt5_account={props.has_mt5_account}
                is_real_financial_stp={props.is_real_financial_stp}
            />
        );
    }

    return (
        <Formik
            initialValues={{
                password: '',
            }}
            enableReinitialize
            validate={props.validatePassword}
            onSubmit={props.submitPassword}
        >
            {({
                errors,
                isSubmitting,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldTouched,
                touched,
                values,
                validateForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <div className='cfd-password-modal__content dc-modal__container_cfd-password-modal__body'>
                        {!props.should_set_trading_password && (
                            <Text size='xs' className='dc-modal__container_cfd-password-modal__account-title'>
                                {props.account_type.category === 'real' && (
                                    <Localize
                                        i18n_default_text='Enter your {{platform}} password to add a {{platform}} {{account}} {{jurisdiction_shortcode}} account.'
                                        values={{
                                            platform: getCFDPlatformLabel(props.platform),
                                            account: props.account_title,
                                            jurisdiction_shortcode: getFormattedJurisdictionCode(
                                                props.jurisdiction_selected_shortcode
                                            ),
                                        }}
                                    />
                                )}
                                {props.account_type.category === 'demo' && (
                                    <Localize
                                        i18n_default_text='Enter your {{platform}} password to add a {{platform}} {{account}} account.'
                                        values={{
                                            platform: getCFDPlatformLabel(props.platform),
                                            account: props.account_title,
                                        }}
                                    />
                                )}
                            </Text>
                        )}
                        <div className='input-element'>
                            <PasswordInput
                                autoComplete='new-password'
                                label={localize('{{platform}} password', {
                                    platform: getCFDPlatformLabel(props.platform),
                                })}
                                error={
                                    (touched.password && errors.password) ||
                                    (values.password.length === 0 ? props.error_message : '')
                                }
                                name='password'
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handlePasswordInputChange(e, handleChange, validateForm, setFieldTouched);
                                }}
                                data_testId={`dt_${props.platform}_password`}
                            />
                        </div>

                        {props.is_real_financial_stp && (
                            <div className='dc-modal__container_cfd-password-modal__description'>
                                <Localize
                                    i18n_default_text='Your MT5 Financial STP account will be opened through {{legal_entity_name}}. All trading in this account is subject to the regulations and guidelines of the Labuan Financial Service Authority (LFSA). None of your other accounts, including your Deriv account, is subject to the regulations and guidelines of the Labuan Financial Service Authority (LFSA).'
                                    values={{
                                        legal_entity_name: getLegalEntityName('fx'),
                                    }}
                                />
                            </div>
                        )}
                        {props.error_type === 'PasswordError' && (
                            <Text size='xs' as='p' className='dc-modal__container_mt5-password-modal__hint'>
                                <Localize
                                    i18n_default_text='Hint: You may have entered your Deriv password, which is different from your {{platform}} password.'
                                    values={{
                                        platform: getCFDPlatformLabel(props.platform),
                                    }}
                                />
                            </Text>
                        )}
                    </div>
                    <FormSubmitButton
                        is_disabled={!values.password}
                        has_cancel={has_cancel_button}
                        cancel_label={cancel_button_label}
                        onCancel={handleCancel}
                        is_absolute={isMobile()}
                        is_loading={isSubmitting}
                        label={button_label}
                        context={props.context}
                        is_center={props.should_set_trading_password}
                        form_error={props.form_error}
                    />
                </form>
            )}
        </Formik>
    );
};

const CFDPasswordModal = ({
    account_title,
    account_type,
    account_status,
    disableCFDPasswordModal,
    email,
    error_message,
    error_type,
    form_error,
    getAccountStatus,
    history,
    is_eu,
    context,
    is_fully_authenticated,
    is_cfd_password_modal_enabled,
    is_cfd_success_dialog_enabled,
    is_dxtrade_allowed,
    jurisdiction_selected_shortcode,
    platform,
    has_cfd_error,
    landing_companies,
    mt5_login_list,
    cfd_new_account,
    setCFDSuccessDialog,
    setMt5Error,
    submitMt5Password,
    submitCFDPassword,
}: TCFDPasswordModalProps) => {
    const [is_password_modal_exited, setPasswordModalExited] = React.useState(true);
    const is_bvi = landing_companies?.mt_financial_company?.financial_stp?.shortcode === 'bvi';
    const has_mt5_account = Boolean(mt5_login_list?.length);
    const should_set_trading_password =
        Array.isArray(account_status?.status) &&
        account_status.status.includes(
            platform === CFD_PLATFORMS.MT5 ? 'mt5_password_not_set' : 'dxtrade_password_not_set'
        );
    const is_password_error = error_type === 'PasswordError';
    const is_password_reset = error_type === 'PasswordReset';
    const [is_sent_email_modal_open, setIsSentEmailModalOpen] = React.useState(false);

    const validatePassword = (values: TCFDPasswordFormValues) => {
        const errors: FormikErrors<TCFDPasswordFormValues> = {};
        if (
            !validLength(values.password, {
                min: 8,
                max: 25,
            })
        ) {
            errors.password = localize('You should enter {{min_number}}-{{max_number}} characters.', {
                min_number: 8,
                max_number: 25,
            });
        } else if (!validPassword(values.password)) {
            errors.password = getErrorMessages().password();
        }
        if (values.password?.toLowerCase() === email.toLowerCase()) {
            errors.password = localize('Your password cannot be the same as your email address.');
        }
        return errors;
    };

    const closeDialogs = () => {
        setCFDSuccessDialog(false);
        setMt5Error(false);
    };

    const closeModal = () => {
        closeDialogs();
        disableCFDPasswordModal();
    };

    const closeOpenSuccess = () => {
        disableCFDPasswordModal();
        closeDialogs();
        if (account_type.category === 'real') {
            if (needs_poi) {
                history.push(routes.proof_of_identity);
            } else {
                sessionStorage.setItem('cfd_transfer_to_login_id', cfd_new_account.login || '');
                history.push(routes.cashier_acc_transfer);
            }
        }
    };

    const handleForgotPassword = () => {
        closeModal();
        let redirect_to = platform === CFD_PLATFORMS.MT5 ? 1 : 2;

        // if account type is real convert redirect_to from 1 or 2 to 10 or 20
        // and if account type is demo convert redirect_to from 1 or 2 to 11 or 21
        if (account_type.category === 'real') {
            redirect_to = Number(`${redirect_to}0`);
        } else if (account_type.category === 'demo') {
            redirect_to = Number(`${redirect_to}1`);
        }

        const password_reset_code =
            platform === CFD_PLATFORMS.MT5
                ? 'trading_platform_mt5_password_reset'
                : 'trading_platform_dxtrade_password_reset';
        WS.verifyEmail(email, password_reset_code, {
            url_parameters: {
                redirect_to,
            },
        });
        setIsSentEmailModalOpen(true);
    };

    const submitPassword: TOnSubmitPassword = (values, actions) => {
        if (platform === CFD_PLATFORMS.MT5) {
            submitMt5Password(
                {
                    ...values,
                },
                actions
            );
        } else {
            (values as TCFDPasswordFormValues & { platform: string }).platform = platform;
            submitCFDPassword(values, actions);
        }
    };

    const should_show_password =
        is_cfd_password_modal_enabled &&
        !is_cfd_success_dialog_enabled &&
        (!has_cfd_error || is_password_error || is_password_reset);

    const should_show_success =
        !has_cfd_error && is_cfd_success_dialog_enabled && is_cfd_password_modal_enabled && is_password_modal_exited;

    const should_show_sent_email_modal = is_sent_email_modal_open && is_password_modal_exited;

    const is_real_financial_stp = [account_type.category, account_type.type].join('_') === 'real_financial_stp';

    const should_show_password_modal = React.useMemo(() => {
        if (should_show_password) {
            return should_set_trading_password ? true : isDesktop();
        }
        return false;
    }, [should_set_trading_password, should_show_password]);

    const should_show_password_dialog = React.useMemo(() => {
        if (should_show_password) {
            if (!should_set_trading_password) return isMobile();
        }
        return false;
    }, [should_set_trading_password, should_show_password]);

    const needs_poi = is_eu && !is_fully_authenticated;

    const success_modal_submit_label = React.useMemo(() => {
        if (account_type.category === 'real') {
            if (needs_poi) {
                return localize('Submit proof');
            }
            return localize('Transfer now');
        }
        return localize('Continue');
    }, [account_type, needs_poi]);

    const cfd_password_form = (
        <CFDPasswordForm
            is_bvi={is_bvi}
            context={context}
            account_title={account_title}
            account_type={account_type}
            closeModal={closeModal}
            error_type={error_type}
            error_message={error_message}
            has_mt5_account={has_mt5_account}
            form_error={form_error}
            jurisdiction_selected_shortcode={jurisdiction_selected_shortcode}
            should_set_trading_password={should_set_trading_password}
            is_real_financial_stp={is_real_financial_stp}
            validatePassword={validatePassword}
            onForgotPassword={handleForgotPassword}
            submitPassword={submitPassword}
            platform={platform}
            is_dxtrade_allowed={is_dxtrade_allowed}
            onCancel={closeModal}
        />
    );

    const password_modal = (
        <Modal
            className='cfd-password-modal'
            has_close_icon
            is_open={should_show_password_modal}
            toggleModal={closeModal}
            should_header_stick_body
            renderTitle={() => (
                <PasswordModalHeader
                    should_set_trading_password={should_set_trading_password}
                    is_password_reset_error={is_password_reset}
                    platform={platform}
                    context={context}
                />
            )}
            onUnmount={() => getAccountStatus(platform)}
            onExited={() => setPasswordModalExited(true)}
            onEntered={() => setPasswordModalExited(false)}
            width={isMobile() ? '32.8rem' : 'auto'}
        >
            {cfd_password_form}
        </Modal>
    );

    const password_dialog = (
        <MobileDialog
            has_full_height
            portal_element_id='modal_root'
            visible={should_show_password_dialog}
            onClose={closeModal}
            wrapper_classname='cfd-password-modal'
        >
            <PasswordModalHeader
                should_set_trading_password={should_set_trading_password}
                has_mt5_account={has_mt5_account}
                is_password_reset_error={is_password_reset}
                platform={platform}
                context={context}
            />

            {cfd_password_form}
        </MobileDialog>
    );

    const success_heading = needs_poi ? (
        <Text as='h2' weight='bold' size='s' className='dc-modal-header__title'>
            {localize('Your account is ready')}
        </Text>
    ) : (
        ''
    );

    return (
        <React.Fragment>
            {password_modal}
            {password_dialog}
            <SuccessDialog
                is_open={should_show_success}
                toggleModal={closeModal}
                onCancel={closeModal}
                onSubmit={closeOpenSuccess}
                classNameMessage='cfd-password-modal__message'
                heading={success_heading}
                message={getSubmitText(
                    platform,
                    is_eu,
                    needs_poi,
                    jurisdiction_selected_shortcode,
                    account_type.type,
                    account_type.category
                )}
                icon={<IconType platform={platform} type={account_type.type} is_eu={is_eu} />}
                icon_size='xlarge'
                text_submit={success_modal_submit_label}
                has_cancel={account_type.category === 'real'}
                has_close_icon={false}
                width={isMobile() ? '32.8rem' : 'auto'}
                is_medium_button={isMobile()}
            />
            <SentEmailModal
                is_open={should_show_sent_email_modal}
                identifier_title='trading_password'
                onClose={() => setIsSentEmailModalOpen(false)}
                onClickSendEmail={handleForgotPassword}
            />
        </React.Fragment>
    );
};

export default connect(({ client, modules }: RootStore) => ({
    email: client.email,
    account_title: modules.cfd.account_title,
    account_type: modules.cfd.account_type,
    account_status: client.account_status,
    disableCFDPasswordModal: modules.cfd.disableCFDPasswordModal,
    error_message: modules.cfd.error_message,
    error_type: modules.cfd.error_type,
    getAccountStatus: modules.cfd.getAccountStatus,
    has_cfd_error: modules.cfd.has_cfd_error,
    landing_companies: client.landing_companies,
    is_eu: client.is_eu,
    is_eu_country: client.is_eu_country,
    is_logged_in: client.is_logged_in,
    is_cfd_success_dialog_enabled: modules.cfd.is_cfd_success_dialog_enabled,
    is_cfd_password_modal_enabled: modules.cfd.is_cfd_password_modal_enabled,
    is_dxtrade_allowed: client.is_dxtrade_allowed,
    jurisdiction_selected_shortcode: modules.cfd.jurisdiction_selected_shortcode,
    setMt5Error: modules.cfd.setError,
    setCFDSuccessDialog: modules.cfd.setCFDSuccessDialog,
    submitMt5Password: modules.cfd.submitMt5Password,
    submitCFDPassword: modules.cfd.submitCFDPassword,
    cfd_new_account: modules.cfd.new_account_response,
    mt5_trading_servers: client.mt5_trading_servers,
    mt5_login_list: client.mt5_login_list,
    is_fully_authenticated: client.is_fully_authenticated,
}))(withRouter(CFDPasswordModal));
