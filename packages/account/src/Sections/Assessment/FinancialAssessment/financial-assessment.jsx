import classNames from 'classnames';
import React from 'react';
import { PropTypes } from 'prop-types';
import { Formik } from 'formik';
import { useHistory, withRouter } from 'react-router';
import {
    FormSubmitErrorMessage,
    Loading,
    Button,
    Dropdown,
    Modal,
    Icon,
    DesktopWrapper,
    MobileWrapper,
    SelectNative,
    Text,
} from '@deriv/components';
import { routes, isMobile, isDesktop, platforms, PlatformContext, WS } from '@deriv/shared';
import { localize, Localize } from '@deriv/translations';
import { connect } from 'Stores/connect';
import LeaveConfirm from 'Components/leave-confirm';
import IconMessageContent from 'Components/icon-message-content';
import DemoMessage from 'Components/demo-message';
import LoadErrorMessage from 'Components/load-error-message';
import FormBody from 'Components/form-body';
import FormBodySection from 'Components/form-body-section';
import FormSubHeader from 'Components/form-sub-header';
import FormFooter from 'Components/form-footer';
import {
    getAccountTurnoverList,
    getEducationLevelList,
    getEmploymentIndustryList,
    getEmploymentStatusList,
    getEstimatedWorthList,
    getIncomeSourceList,
    getNetIncomeList,
    getOccupationList,
    getSourceOfWealthList,
    getBinaryOptionsTradingExperienceList,
    getBinaryOptionsTradingFrequencyList,
    getCfdTradingExperienceList,
    getCfdTradingFrequencyList,
    getForexTradingExperienceList,
    getForexTradingFrequencyList,
    getOtherInstrumentsTradingExperienceList,
    getOtherInstrumentsTradingFrequencyList,
} from './financial-information-list';

const ConfirmationContent = ({ className }) => {
    return (
        <React.Fragment>
            <Text as='p' size='xs' className={className}>
                <Localize
                    i18n_default_text='In providing our services to you, we are required to obtain information from you in order to assess whether a given product or service is appropriate for you (that is, whether you possess the experience and knowledge to understand the risks involved).<0/><1/>'
                    components={[<br key={0} />, <br key={1} />]}
                />
                <Localize
                    i18n_default_text='On the basis of the information provided in relation to your knowledge and experience, we consider that the investments available via this website are not appropriate for you.<0/><1/>'
                    components={[<br key={0} />, <br key={1} />]}
                />
                <Localize i18n_default_text='By clicking Accept below and proceeding with the Account Opening you should note that you may be exposing yourself to risks (which may be significant, including the risk of loss of the entire sum invested) that you may not have the knowledge and experience to properly assess or mitigate.' />
            </Text>
        </React.Fragment>
    );
};

const ConfirmationModal = ({ is_visible, toggleModal, onSubmit }) => (
    <Modal
        className='financial-assessment-confirmation'
        is_open={is_visible}
        small
        toggleModal={() => toggleModal(false)}
        title={localize('Appropriateness Test, WARNING:')}
    >
        <Modal.Body>
            <ConfirmationContent />
        </Modal.Body>
        <Modal.Footer>
            <Button large text={localize('Decline')} onClick={() => toggleModal(false)} secondary />
            <Button
                large
                text={localize('Accept')}
                onClick={() => {
                    onSubmit();
                    toggleModal(false);
                }}
                primary
            />
        </Modal.Footer>
    </Modal>
);

const ConfirmationPage = ({ toggleModal, onSubmit }) => (
    <div className='account__confirmation-page'>
        <Text
            size='xs'
            weight='bold'
            styles={{ color: 'var(--brand-red-coral)' }}
            className='account__confirmation-page-title'
        >
            {localize('Notice')}
        </Text>
        <ConfirmationContent className='account__confirmation-page-content' />
        <div className='account__confirmation-page-footer'>
            <Button large text={localize('Back')} onClick={() => toggleModal(false)} secondary />
            <Button
                large
                text={localize('Accept')}
                onClick={() => {
                    onSubmit();
                    toggleModal(false);
                }}
                primary
            />
        </div>
    </div>
);

const SubmittedPage = ({ platform, routeBackInApp }) => {
    const history = useHistory();

    const onClickButton = () => {
        if (platforms[platform].is_hard_redirect) {
            window.location.href = platforms[platform].url;
        } else {
            routeBackInApp(history);
        }
    };

    const redirectToPOA = () => {
        history.push(routes.proof_of_address);
    };

    if (platform && !!platforms[platform])
        return (
            <IconMessageContent
                className='submit-success'
                message={localize('Financial assessment submitted successfully')}
                text={platforms[platform].icon_text}
                icon={<Icon icon='IcSuccess' width={96} height={90} />}
            >
                <div className='account-management-flex-wrapper account-management-submit-success'>
                    <Button
                        type='button'
                        has_effect
                        text={localize('Back to {{platform_name}}', {
                            platform_name: platforms[platform].platform_name,
                        })}
                        onClick={onClickButton}
                        primary
                        large
                    />
                </div>
            </IconMessageContent>
        );

    return (
        <IconMessageContent
            className='submit-success'
            message={localize('Financial assessment submitted successfully')}
            text={localize('Let’s continue with providing proofs of address and identity.')}
            icon={<Icon icon='IcSuccess' width={96} height={90} />}
        >
            <div className='account-management-flex-wrapper account-management-submit-success'>
                <Button
                    type='button'
                    has_effect
                    text={localize('Continue')}
                    onClick={() => redirectToPOA()}
                    primary
                    large
                />
            </div>
        </IconMessageContent>
    );
};

const FinancialAssessment = ({
    is_authentication_needed,
    is_financial_account,
    is_mf,
    is_svg,
    is_trading_experience_incomplete,
    is_financial_information_incomplete,
    is_virtual,
    platform,
    refreshNotifications,
    routeBackInApp,
    setFinancialAndTradingAssessment,
    updateAccountStatus,
}) => {
    const history = useHistory();
    const { is_appstore } = React.useContext(PlatformContext);
    const [is_loading, setIsLoading] = React.useState(true);
    const [is_confirmation_visible, setIsConfirmationVisible] = React.useState(false);
    const [has_trading_experience, setHasTradingExperience] = React.useState(false);
    const [is_form_visible, setIsFormVisible] = React.useState(true);
    const [api_initial_load_error, setApiInitialLoadError] = React.useState(null);
    const [is_btn_loading, setIsBtnLoading] = React.useState(false);
    const [is_submit_success, setIsSubmitSuccess] = React.useState(false);
    const [initial_form_values, setInitialFormValues] = React.useState({});

    const {
        income_source,
        employment_status,
        employment_industry,
        occupation,
        source_of_wealth,
        education_level,
        net_income,
        estimated_worth,
        account_turnover,
        binary_options_trading_experience,
        binary_options_trading_frequency,
        cfd_trading_experience,
        cfd_trading_frequency,
        forex_trading_experience,
        forex_trading_frequency,
        other_instruments_trading_experience,
        other_instruments_trading_frequency,
    } = initial_form_values;

    React.useEffect(() => {
        if (is_virtual) {
            setIsLoading(false);
            history.push(routes.personal_details);
        } else {
            WS.authorized.storage.getFinancialAssessment().then(data => {
                WS.wait('get_account_status').then(() => {
                    setHasTradingExperience(
                        (is_financial_account || is_trading_experience_incomplete) && !is_svg && !is_mf
                    );
                    if (data.error) {
                        setApiInitialLoadError(data.error.message);
                        return;
                    }
                    setInitialFormValues(data.get_financial_assessment);
                    setIsLoading(false);
                });
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = async (values, { setSubmitting, setStatus }) => {
        setStatus({ msg: '' });
        setIsBtnLoading(true);
        const form_payload = {
            financial_information: { ...values },
        };
        const data = await setFinancialAndTradingAssessment(form_payload);
        if (data.error) {
            setIsBtnLoading(false);
            setStatus({ msg: data.error.message });
        } else {
            await updateAccountStatus();
            WS.authorized.storage.getFinancialAssessment().then(res_data => {
                setInitialFormValues(res_data.get_financial_assessment);
                setIsSubmitSuccess(true);
                setIsBtnLoading(false);

                if (isDesktop()) {
                    setTimeout(() => setIsSubmitSuccess(false), 10000);
                }
            });
            setSubmitting(false);
            refreshNotifications();
        }
    };

    const validateFields = values => {
        setIsSubmitSuccess(false);
        const errors = {};
        Object.keys(values).forEach(field => {
            if (!values[field]) {
                errors[field] = localize('This field is required');
            }
        });
        return errors;
    };

    const showForm = is_visible => {
        setIsFormVisible(is_visible);
        setIsConfirmationVisible(false);
    };

    const toggleConfirmationModal = value => {
        setIsConfirmationVisible(value);
        if (isMobile()) {
            setIsFormVisible(!value);
        }
    };

    const onClickSubmit = handleSubmit => {
        const is_confirmation_needed = has_trading_experience && is_trading_experience_incomplete;

        if (is_confirmation_needed) {
            toggleConfirmationModal(true);
        } else {
            handleSubmit();
        }
    };

    const getScrollOffset = () => {
        if (is_mf) {
            if (isMobile() && is_financial_information_incomplete) return '220px';
            return is_financial_information_incomplete && !is_submit_success ? '165px' : '160px';
        } else if (isMobile()) return is_appstore ? '160px' : '200px';
        return '80px';
    };

    if (is_loading) return <Loading is_fullscreen={false} className='account__initial-loader' />;
    if (api_initial_load_error) return <LoadErrorMessage error_message={api_initial_load_error} />;
    if (is_virtual) return <DemoMessage has_demo_icon={is_appstore} has_button={is_appstore} />;
    if (isMobile() && is_authentication_needed && !is_mf && is_submit_success)
        return <SubmittedPage platform={platform} routeBackInApp={routeBackInApp} />;

    const setInitialFormData = () => {
        const form_data = {
            income_source,
            employment_status,
            employment_industry,
            occupation,
            source_of_wealth,
            education_level,
            net_income,
            estimated_worth,
            account_turnover,
            ...(has_trading_experience && {
                binary_options_trading_experience,
                binary_options_trading_frequency,
                cfd_trading_experience,
                cfd_trading_frequency,
                forex_trading_experience,
                forex_trading_frequency,
                other_instruments_trading_experience,
                other_instruments_trading_frequency,
            }),
        };
        if (!is_mf) {
            return form_data;
        }
        delete form_data.employment_status;
        return form_data;
    };

    return (
        <React.Fragment>
            <Formik
                initialValues={setInitialFormData()}
                enableReinitialize
                validate={validateFields}
                onSubmit={onSubmit}
            >
                {({
                    values,
                    errors,
                    status,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldTouched,
                    dirty,
                }) => (
                    <>
                        {!is_appstore && isMobile() && is_confirmation_visible && (
                            <ConfirmationPage toggleModal={toggleConfirmationModal} onSubmit={handleSubmit} />
                        )}
                        {(isDesktop() || is_appstore) && (
                            <ConfirmationModal
                                is_visible={is_confirmation_visible}
                                toggleModal={toggleConfirmationModal}
                                onSubmit={handleSubmit}
                            />
                        )}
                        <LeaveConfirm onDirty={isMobile() ? showForm : null} />
                        {is_form_visible && (
                            <form className='account-form account-form__financial-assessment' onSubmit={handleSubmit}>
                                {is_mf && is_financial_information_incomplete && !is_submit_success && (
                                    <div className='financial-banner'>
                                        <div className='financial-banner__frame'>
                                            <div className='financial-banner__container'>
                                                <Icon icon='IcAlertWarning' />
                                                {isMobile() ? (
                                                    <Text size='xxxs' line_height='s'>
                                                        <Localize i18n_default_text='To enable withdrawals, please complete your financial assessment.' />
                                                    </Text>
                                                ) : (
                                                    <Text size='xxs' line_height='l'>
                                                        <Localize i18n_default_text='You can only make deposits at the moment. To enable withdrawals, please complete your financial assessment.' />
                                                    </Text>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <FormBody scroll_offset={getScrollOffset()}>
                                    <FormSubHeader
                                        title={localize('Financial information')}
                                        subtitle={`(${localize('All fields are required')})`}
                                    />
                                    <FormBodySection
                                        has_side_note={is_appstore}
                                        side_note={localize(
                                            'We’re legally obliged to ask for your financial information.'
                                        )}
                                    >
                                        <fieldset className='account-form__fieldset'>
                                            <DesktopWrapper>
                                                <Dropdown
                                                    placeholder={localize('Source of income')}
                                                    is_align_text_left
                                                    name='income_source'
                                                    list={getIncomeSourceList()}
                                                    value={values.income_source}
                                                    onChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    error={touched.income_source && errors.income_source}
                                                />
                                            </DesktopWrapper>
                                            <MobileWrapper>
                                                <SelectNative
                                                    placeholder={localize('Please select')}
                                                    name='income_source'
                                                    label={localize('Source of income')}
                                                    list_items={getIncomeSourceList()}
                                                    value={values.income_source}
                                                    error={touched.income_source && errors.income_source}
                                                    onChange={e => {
                                                        setFieldTouched('income_source', true);
                                                        handleChange(e);
                                                    }}
                                                />
                                            </MobileWrapper>
                                        </fieldset>
                                        {!is_mf && (
                                            <fieldset className='account-form__fieldset'>
                                                <DesktopWrapper>
                                                    <Dropdown
                                                        placeholder={localize('Employment status')}
                                                        is_align_text_left
                                                        name='employment_status'
                                                        list={getEmploymentStatusList()}
                                                        value={values.employment_status}
                                                        onChange={handleChange}
                                                        handleBlur={handleBlur}
                                                        error={touched.employment_status && errors.employment_status}
                                                    />
                                                </DesktopWrapper>
                                                <MobileWrapper>
                                                    <SelectNative
                                                        placeholder={localize('Please select')}
                                                        name='employment_status'
                                                        label={localize('Employment status')}
                                                        list_items={getEmploymentStatusList()}
                                                        value={values.employment_status}
                                                        error={touched.employment_status && errors.employment_status}
                                                        onChange={e => {
                                                            setFieldTouched('employment_status', true);
                                                            handleChange(e);
                                                        }}
                                                    />
                                                </MobileWrapper>
                                            </fieldset>
                                        )}
                                        <fieldset className='account-form__fieldset'>
                                            <DesktopWrapper>
                                                <Dropdown
                                                    placeholder={localize('Industry of employment')}
                                                    is_align_text_left
                                                    name='employment_industry'
                                                    list={getEmploymentIndustryList()}
                                                    value={values.employment_industry}
                                                    onChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    error={touched.employment_industry && errors.employment_industry}
                                                />
                                            </DesktopWrapper>
                                            <MobileWrapper>
                                                <SelectNative
                                                    placeholder={localize('Please select')}
                                                    name='employment_industry'
                                                    label={localize('Industry of employment')}
                                                    list_items={getEmploymentIndustryList()}
                                                    value={values.employment_industry}
                                                    error={touched.employment_industry && errors.employment_industry}
                                                    onChange={e => {
                                                        setFieldTouched('employment_industry', true);
                                                        handleChange(e);
                                                    }}
                                                />
                                            </MobileWrapper>
                                        </fieldset>
                                        <fieldset className='account-form__fieldset'>
                                            <DesktopWrapper>
                                                <Dropdown
                                                    className='account-form__occupation'
                                                    placeholder={localize('Occupation')}
                                                    is_align_text_left
                                                    name='occupation'
                                                    list={getOccupationList()}
                                                    value={values.occupation}
                                                    onChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    error={touched.occupation && errors.occupation}
                                                />
                                            </DesktopWrapper>
                                            <MobileWrapper>
                                                <SelectNative
                                                    placeholder={localize('Please select')}
                                                    name='occupation'
                                                    label={localize('Occupation')}
                                                    list_items={getOccupationList()}
                                                    value={values.occupation}
                                                    error={touched.occupation && errors.occupation}
                                                    onChange={e => {
                                                        setFieldTouched('occupation', true);
                                                        handleChange(e);
                                                    }}
                                                />
                                            </MobileWrapper>
                                        </fieldset>
                                        <fieldset className='account-form__fieldset'>
                                            <DesktopWrapper>
                                                <Dropdown
                                                    placeholder={localize('Source of wealth')}
                                                    is_align_text_left
                                                    name='source_of_wealth'
                                                    list={getSourceOfWealthList()}
                                                    value={values.source_of_wealth}
                                                    onChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    error={touched.source_of_wealth && errors.source_of_wealth}
                                                />
                                            </DesktopWrapper>
                                            <MobileWrapper>
                                                <SelectNative
                                                    placeholder={localize('Please select')}
                                                    name='source_of_wealth'
                                                    label={localize('Source of wealth')}
                                                    list_items={getSourceOfWealthList()}
                                                    value={values.source_of_wealth}
                                                    error={touched.source_of_wealth && errors.source_of_wealth}
                                                    onChange={e => {
                                                        setFieldTouched('source_of_wealth', true);
                                                        handleChange(e);
                                                    }}
                                                />
                                            </MobileWrapper>
                                        </fieldset>
                                        <fieldset className='account-form__fieldset'>
                                            <DesktopWrapper>
                                                <Dropdown
                                                    placeholder={localize('Level of education')}
                                                    is_align_text_left
                                                    name='education_level'
                                                    list={getEducationLevelList()}
                                                    value={values.education_level}
                                                    onChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    error={touched.education_level && errors.education_level}
                                                />
                                            </DesktopWrapper>
                                            <MobileWrapper>
                                                <SelectNative
                                                    placeholder={localize('Please select')}
                                                    name='education_level'
                                                    label={localize('Level of education')}
                                                    list_items={getEducationLevelList()}
                                                    value={values.education_level}
                                                    error={touched.education_level && errors.education_level}
                                                    onChange={e => {
                                                        setFieldTouched('education_level', true);
                                                        handleChange(e);
                                                    }}
                                                />
                                            </MobileWrapper>
                                        </fieldset>
                                        <fieldset className='account-form__fieldset'>
                                            <DesktopWrapper>
                                                <Dropdown
                                                    placeholder={localize('Net annual income')}
                                                    is_align_text_left
                                                    name='net_income'
                                                    list={getNetIncomeList()}
                                                    value={values.net_income}
                                                    onChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    error={touched.net_income && errors.net_income}
                                                />
                                            </DesktopWrapper>
                                            <MobileWrapper>
                                                <SelectNative
                                                    placeholder={localize('Please select')}
                                                    name='net_income'
                                                    label={localize('Net annual income')}
                                                    list_items={getNetIncomeList()}
                                                    value={values.net_income}
                                                    error={touched.net_income && errors.net_income}
                                                    onChange={e => {
                                                        setFieldTouched('net_income', true);
                                                        handleChange(e);
                                                    }}
                                                />
                                            </MobileWrapper>
                                        </fieldset>
                                        <fieldset className='account-form__fieldset'>
                                            <DesktopWrapper>
                                                <Dropdown
                                                    placeholder={localize('Estimated net worth')}
                                                    is_alignment_top
                                                    is_align_text_left
                                                    name='estimated_worth'
                                                    list={getEstimatedWorthList()}
                                                    value={values.estimated_worth}
                                                    onChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    error={touched.estimated_worth && errors.estimated_worth}
                                                />
                                            </DesktopWrapper>
                                            <MobileWrapper>
                                                <SelectNative
                                                    placeholder={localize('Please select')}
                                                    name='estimated_worth'
                                                    label={localize('Estimated net worth')}
                                                    list_items={getEstimatedWorthList()}
                                                    value={values.estimated_worth}
                                                    error={touched.estimated_worth && errors.estimated_worth}
                                                    onChange={e => {
                                                        setFieldTouched('estimated_worth', true);
                                                        handleChange(e);
                                                    }}
                                                />
                                            </MobileWrapper>
                                        </fieldset>
                                        <fieldset className='account-form__fieldset'>
                                            <DesktopWrapper>
                                                <Dropdown
                                                    placeholder={localize('Anticipated account turnover')}
                                                    is_alignment_top
                                                    is_align_text_left
                                                    name='account_turnover'
                                                    list={getAccountTurnoverList()}
                                                    value={values.account_turnover}
                                                    onChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    error={touched.account_turnover && errors.account_turnover}
                                                />
                                            </DesktopWrapper>
                                            <MobileWrapper>
                                                <SelectNative
                                                    placeholder={localize('Please select')}
                                                    name='account_turnover'
                                                    label={localize('Anticipated account turnover')}
                                                    list_items={getAccountTurnoverList()}
                                                    value={values.account_turnover}
                                                    error={touched.account_turnover && errors.account_turnover}
                                                    onChange={e => {
                                                        setFieldTouched('account_turnover', true);
                                                        handleChange(e);
                                                    }}
                                                />
                                            </MobileWrapper>
                                        </fieldset>
                                        {/* Trading experience fieldset */}
                                    </FormBodySection>
                                    {has_trading_experience && (
                                        <>
                                            <FormSubHeader
                                                title={localize('Trading experience')}
                                                subtitle={`(${localize('All fields are required')})`}
                                            />
                                            <FormBodySection
                                                has_side_note={is_appstore}
                                                side_note={localize('Tell us about your trading experience.')}
                                            >
                                                <fieldset className='account-form__fieldset'>
                                                    <DesktopWrapper>
                                                        <Dropdown
                                                            placeholder={localize('Forex trading experience')}
                                                            is_align_text_left
                                                            name='forex_trading_experience'
                                                            list={getForexTradingExperienceList()}
                                                            value={values.forex_trading_experience}
                                                            onChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            error={
                                                                touched.forex_trading_experience &&
                                                                errors.forex_trading_experience
                                                            }
                                                        />
                                                    </DesktopWrapper>
                                                    <MobileWrapper>
                                                        <SelectNative
                                                            placeholder={localize('Please select')}
                                                            name='forex_trading_experience'
                                                            label={localize('Forex trading experience')}
                                                            list_items={getForexTradingExperienceList()}
                                                            value={values.forex_trading_experience}
                                                            error={
                                                                touched.forex_trading_experience &&
                                                                errors.forex_trading_experience
                                                            }
                                                            onChange={e => {
                                                                setFieldTouched('forex_trading_experience', true);
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    </MobileWrapper>
                                                </fieldset>
                                                <fieldset className='account-form__fieldset'>
                                                    <DesktopWrapper>
                                                        <Dropdown
                                                            placeholder={localize('Forex trading frequency')}
                                                            is_align_text_left
                                                            name='forex_trading_frequency'
                                                            list={getForexTradingFrequencyList()}
                                                            value={values.forex_trading_frequency}
                                                            onChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            error={
                                                                touched.forex_trading_frequency &&
                                                                errors.forex_trading_frequency
                                                            }
                                                        />
                                                    </DesktopWrapper>
                                                    <MobileWrapper>
                                                        <SelectNative
                                                            placeholder={localize('Please select')}
                                                            name='forex_trading_frequency'
                                                            label={localize('Forex trading frequency')}
                                                            list_items={getForexTradingFrequencyList()}
                                                            value={values.forex_trading_frequency}
                                                            error={
                                                                touched.forex_trading_frequency &&
                                                                errors.forex_trading_frequency
                                                            }
                                                            onChange={e => {
                                                                setFieldTouched('forex_trading_frequency', true);
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    </MobileWrapper>
                                                </fieldset>
                                                <fieldset className='account-form__fieldset'>
                                                    <DesktopWrapper>
                                                        <Dropdown
                                                            placeholder={localize('Binary options trading experience')}
                                                            is_align_text_left
                                                            name='binary_options_trading_experience'
                                                            list={getBinaryOptionsTradingExperienceList()}
                                                            value={values.binary_options_trading_experience}
                                                            onChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            error={
                                                                touched.binary_options_trading_experience &&
                                                                errors.binary_options_trading_experience
                                                            }
                                                        />
                                                    </DesktopWrapper>
                                                    <MobileWrapper>
                                                        <SelectNative
                                                            placeholder={localize('Please select')}
                                                            name='binary_options_trading_experience'
                                                            label={localize('Binary options trading experience')}
                                                            list_items={getBinaryOptionsTradingExperienceList()}
                                                            value={values.binary_options_trading_experience}
                                                            error={
                                                                touched.binary_options_trading_experience &&
                                                                errors.binary_options_trading_experience
                                                            }
                                                            onChange={e => {
                                                                setFieldTouched(
                                                                    'binary_options_trading_experience',
                                                                    true
                                                                );
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    </MobileWrapper>
                                                </fieldset>
                                                <fieldset className='account-form__fieldset'>
                                                    <DesktopWrapper>
                                                        <Dropdown
                                                            placeholder={localize('Binary options trading frequency')}
                                                            is_align_text_left
                                                            name='binary_options_trading_frequency'
                                                            list={getBinaryOptionsTradingFrequencyList()}
                                                            value={values.binary_options_trading_frequency}
                                                            onChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            error={
                                                                touched.binary_options_trading_frequency &&
                                                                errors.binary_options_trading_frequency
                                                            }
                                                        />
                                                    </DesktopWrapper>
                                                    <MobileWrapper>
                                                        <SelectNative
                                                            placeholder={localize('Please select')}
                                                            name='binary_options_trading_frequency'
                                                            label={localize('Binary options trading frequency')}
                                                            list_items={getBinaryOptionsTradingFrequencyList()}
                                                            value={values.binary_options_trading_frequency}
                                                            error={
                                                                touched.binary_options_trading_frequency &&
                                                                errors.binary_options_trading_frequency
                                                            }
                                                            onChange={e => {
                                                                setFieldTouched(
                                                                    'binary_options_trading_frequency',
                                                                    true
                                                                );
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    </MobileWrapper>
                                                </fieldset>
                                                <fieldset className='account-form__fieldset'>
                                                    <DesktopWrapper>
                                                        <Dropdown
                                                            placeholder={localize('CFD trading experience')}
                                                            is_align_text_left
                                                            name='cfd_trading_experience'
                                                            list={getCfdTradingExperienceList()}
                                                            value={values.cfd_trading_experience}
                                                            onChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            error={
                                                                touched.cfd_trading_experience &&
                                                                errors.cfd_trading_experience
                                                            }
                                                        />
                                                    </DesktopWrapper>
                                                    <MobileWrapper>
                                                        <SelectNative
                                                            placeholder={localize('Please select')}
                                                            name='cfd_trading_experience'
                                                            label={localize('CFD trading experience')}
                                                            list_items={getCfdTradingExperienceList()}
                                                            value={values.cfd_trading_experience}
                                                            error={
                                                                touched.cfd_trading_experience &&
                                                                errors.cfd_trading_experience
                                                            }
                                                            onChange={e => {
                                                                setFieldTouched('cfd_trading_experience', true);
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    </MobileWrapper>
                                                </fieldset>
                                                <fieldset className='account-form__fieldset'>
                                                    <DesktopWrapper>
                                                        <Dropdown
                                                            placeholder={localize('CFD trading frequency')}
                                                            is_align_text_left
                                                            name='cfd_trading_frequency'
                                                            list={getCfdTradingFrequencyList()}
                                                            value={values.cfd_trading_frequency}
                                                            onChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            error={
                                                                touched.cfd_trading_frequency &&
                                                                errors.cfd_trading_frequency
                                                            }
                                                        />
                                                    </DesktopWrapper>
                                                    <MobileWrapper>
                                                        <SelectNative
                                                            placeholder={localize('Please select')}
                                                            name='cfd_trading_frequency'
                                                            label={localize('CFD trading frequency')}
                                                            list_items={getCfdTradingFrequencyList()}
                                                            value={values.cfd_trading_frequency}
                                                            error={
                                                                touched.cfd_trading_frequency &&
                                                                errors.cfd_trading_frequency
                                                            }
                                                            onChange={e => {
                                                                setFieldTouched('cfd_trading_frequency', true);
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    </MobileWrapper>
                                                </fieldset>
                                                <fieldset className='account-form__fieldset'>
                                                    <DesktopWrapper>
                                                        <Dropdown
                                                            placeholder={localize(
                                                                'Other trading instruments experience'
                                                            )}
                                                            is_align_text_left
                                                            name='other_instruments_trading_experience'
                                                            list={getOtherInstrumentsTradingExperienceList()}
                                                            value={values.other_instruments_trading_experience}
                                                            onChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            error={
                                                                touched.other_instruments_trading_experience &&
                                                                errors.other_instruments_trading_experience
                                                            }
                                                        />
                                                    </DesktopWrapper>
                                                    <MobileWrapper>
                                                        <SelectNative
                                                            placeholder={localize('Please select')}
                                                            name='other_instruments_trading_experience'
                                                            label={localize('Other trading instruments experience')}
                                                            list_items={getOtherInstrumentsTradingExperienceList()}
                                                            value={values.other_instruments_trading_experience}
                                                            error={
                                                                touched.other_instruments_trading_experience &&
                                                                errors.other_instruments_trading_experience
                                                            }
                                                            onChange={e => {
                                                                setFieldTouched(
                                                                    'other_instruments_trading_experience',
                                                                    true
                                                                );
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    </MobileWrapper>
                                                </fieldset>
                                                <fieldset className='account-form__fieldset'>
                                                    <DesktopWrapper>
                                                        <Dropdown
                                                            placeholder={localize(
                                                                'Other trading instruments frequency'
                                                            )}
                                                            is_alignment_top
                                                            is_align_text_left
                                                            name='other_instruments_trading_frequency'
                                                            list={getOtherInstrumentsTradingFrequencyList()}
                                                            value={values.other_instruments_trading_frequency}
                                                            onChange={handleChange}
                                                            handleBlur={handleBlur}
                                                            error={
                                                                touched.other_instruments_trading_frequency &&
                                                                errors.other_instruments_trading_frequency
                                                            }
                                                        />
                                                    </DesktopWrapper>
                                                    <MobileWrapper>
                                                        <SelectNative
                                                            placeholder={localize('Please select')}
                                                            name='other_instruments_trading_frequency'
                                                            label={localize('Other trading instruments frequency')}
                                                            list_items={getOtherInstrumentsTradingFrequencyList()}
                                                            value={values.other_instruments_trading_frequency}
                                                            error={
                                                                touched.other_instruments_trading_frequency &&
                                                                errors.other_instruments_trading_frequency
                                                            }
                                                            onChange={e => {
                                                                setFieldTouched(
                                                                    'other_instruments_trading_frequency',
                                                                    true
                                                                );
                                                                handleChange(e);
                                                            }}
                                                        />
                                                    </MobileWrapper>
                                                </fieldset>
                                            </FormBodySection>
                                        </>
                                    )}
                                </FormBody>
                                <FormFooter>
                                    {status && status.msg && <FormSubmitErrorMessage message={status.msg} />}
                                    {isMobile() && !is_appstore && !is_mf && (
                                        <Text
                                            align='center'
                                            size='xxs'
                                            className='account-form__footer-all-fields-required'
                                        >
                                            {localize('All fields are required')}
                                        </Text>
                                    )}
                                    <Button
                                        type='button'
                                        className={classNames('account-form__footer-btn', {
                                            'dc-btn--green': is_submit_success,
                                        })}
                                        onClick={() => onClickSubmit(handleSubmit)}
                                        is_disabled={
                                            isSubmitting || !dirty || is_btn_loading || Object.keys(errors).length > 0
                                        }
                                        has_effect
                                        is_loading={is_btn_loading}
                                        is_submit_success={is_submit_success}
                                        text={is_appstore ? localize('Save') : localize('Submit')}
                                        large
                                        primary
                                    />
                                </FormFooter>
                            </form>
                        )}
                    </>
                )}
            </Formik>
        </React.Fragment>
    );
};

FinancialAssessment.propTypes = {
    is_authentication_needed: PropTypes.bool,
    is_financial_account: PropTypes.bool,
    is_mf: PropTypes.bool,
    is_svg: PropTypes.bool,
    is_trading_experience_incomplete: PropTypes.bool,
    is_financial_information_incomplete: PropTypes.bool,
    is_virtual: PropTypes.bool,
    platform: PropTypes.string,
    refreshNotifications: PropTypes.func,
    routeBackInApp: PropTypes.func,
    setFinancialAndTradingAssessment: PropTypes.func,
    updateAccountStatus: PropTypes.func,
};

export default connect(({ client, common, notifications }) => ({
    is_authentication_needed: client.is_authentication_needed,
    is_financial_account: client.is_financial_account,
    is_mf: client.landing_company_shortcode === 'maltainvest',
    is_svg: client.is_svg,
    is_financial_information_incomplete: client.is_financial_information_incomplete,
    is_trading_experience_incomplete: client.is_trading_experience_incomplete,
    is_virtual: client.is_virtual,
    platform: common.platform,
    refreshNotifications: notifications.refreshNotifications,
    routeBackInApp: common.routeBackInApp,
    setFinancialAndTradingAssessment: client.setFinancialAndTradingAssessment,
    updateAccountStatus: client.updateAccountStatus,
}))(withRouter(FinancialAssessment));
