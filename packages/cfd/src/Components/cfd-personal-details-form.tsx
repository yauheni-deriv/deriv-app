import { Field, FieldProps, Formik, FormikHelpers as FormikActions, FormikProps } from 'formik';
import React from 'react';
import { LandingCompany, ResidenceList } from '@deriv/api-types';
import {
    Autocomplete,
    AutoHeightWrapper,
    DesktopWrapper,
    Div100vhContainer,
    Dropdown,
    FormSubmitButton,
    FormSubmitErrorMessage,
    Input,
    Loading,
    MobileWrapper,
    Modal,
    SelectNative,
    Text,
    ThemedScrollbars,
} from '@deriv/components';
import { isDeepEqual, isDesktop, isMobile } from '@deriv/shared';
import { Localize, localize } from '@deriv/translations';
import RootStore from '../Stores/index';

type TCFDPersonalDetailsFormProps = {
    changeable_fields?: string[];
    has_previous_button?: boolean;
    is_loading: boolean;
    context: RootStore;
    landing_company: LandingCompany;
    residence_list: ResidenceList;
    onCancel: () => void;
    onSave: (index: number, values: TFormValues) => void;
    onSubmit: TOnSubmit;
    value: TFormValues;
    index: number;
    form_error?: string;
};

type TValidatePersonalDetailsParams = {
    values: TFormValues;
    context: RootStore;
    residence_list: ResidenceList;
    account_opening_reason: TAccountOpeningReasonList;
    is_tin_required: boolean;
};

type TFindDefaultValuesInResidenceList = (params: {
    residence_list: ResidenceList;
    citizen_text: string;
    tax_residence_text: string;
    place_of_birth_text?: string;
}) => {
    citizen?: ResidenceList[0];
    place_of_birth?: ResidenceList[0];
    tax_residence?: ResidenceList[0];
};

type TCFDInputFieldProps = {
    id?: string;
    value?: string;
    name: string;
    maxLength?: number;
    label: string;
    optional?: boolean;
    required?: boolean;
    placeholder: string;
    disabled?: boolean;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

type TFormValues = { [key: string]: string };

type TOnSubmit = (
    index: number,
    value: TFormValues,
    setSubmitting: (isSubmitting: boolean) => void,
    is_dirty?: boolean
) => void;

type TSubmitForm = (
    values: TFormValues,
    actions: FormikActions<TFormValues>,
    idx: number,
    onSubmitFn: TOnSubmit,
    is_dirty: boolean,
    residence_list: ResidenceList
) => void;

type TAccountOpeningReasonList = {
    text: string;
    value: string;
}[];

const getAccountOpeningReasonList = (): TAccountOpeningReasonList => [
    {
        text: localize('Hedging'),
        value: 'Hedging',
    },
    {
        text: localize('Income Earning'),
        value: 'Income Earning',
    },
    {
        text: localize('Speculative'),
        value: 'Speculative',
    },
    {
        text: localize('Peer-to-peer exchange'),
        value: 'Peer-to-peer exchange',
    },
];

export const InputField = ({ maxLength, name, optional = false, ...props }: TCFDInputFieldProps) => (
    <Field name={name}>
        {({ field, form: { errors, touched } }: FieldProps<string, TFormValues>) => (
            <Input
                {...field}
                type='text'
                required={!optional}
                name={name}
                autoComplete='off'
                maxLength={maxLength || 30}
                error={touched[field.name as keyof TFormValues] && errors[field.name as keyof TFormValues]}
                {...props}
            />
        )}
    </Field>
);

const validatePersonalDetails = ({
    values,
    context,
    residence_list,
    account_opening_reason,
    is_tin_required,
}: TValidatePersonalDetailsParams) => {
    const [tax_residence_obj] = residence_list.filter(res => res.text === values.tax_residence && res.tin_format);

    const tin_format = tax_residence_obj?.tin_format;

    const tin_regex = tin_format || ['^[A-Za-z0-9./s-]{0,25}$']; // fallback to API's default rule check

    const validations: { [key: string]: ((v: string) => boolean | RegExpMatchArray | null)[] } = {
        citizen: [(v: string) => !!v, (v: string) => residence_list.map(i => i.text).includes(v)],
        tax_residence: [(v: string) => !!v, (v: string) => residence_list.map(i => i.text).includes(v)],
        tax_identification_number: [
            (v: string) => ((!values.tax_residence && is_tin_required) || tin_format ? !!v : true),
            (v: string) => (tin_regex ? tin_regex?.some(regex => v.match(regex)) : true),
        ],
        account_opening_reason: [
            (v: string) => !!v,
            (v: string) => account_opening_reason.map(i => i.value).includes(v),
        ],
        place_of_birth: [(v: string) => !!v, (v: string) => residence_list.map(i => i.text).includes(v)],
    };
    const mappedKey: { [key: string]: string } = {
        citizen: localize('Citizenship'),
        tax_residence: localize('Tax residence'),
        tax_identification_number: localize('Tax identification number'),
        account_opening_reason: localize('Account opening reason'),
        place_of_birth: localize('Place of birth'),
    };

    const field_error_messages = (field_name: string): string[] => [
        localize('{{field_name}} is required', { field_name }),
        localize('{{field_name}} is not properly formatted.', { field_name }),
    ];

    const errors: { [key: string]: React.ReactNode } = {};

    Object.entries(validations).forEach(([key, rules]) => {
        const error_index = rules.findIndex(v => !v(values[key as 'citizen']));
        if (error_index !== -1) {
            errors[key] = field_error_messages(mappedKey[key])[error_index];
        }
    });

    return errors;
};

const findDefaultValuesInResidenceList: TFindDefaultValuesInResidenceList = ({
    residence_list,
    citizen_text,
    tax_residence_text,
    place_of_birth_text,
}) => {
    let citizen, tax_residence, place_of_birth;
    residence_list?.forEach((item: ResidenceList[0]) => {
        if (item.text === citizen_text) {
            citizen = item;
        }
        if (item.text === place_of_birth_text) {
            place_of_birth = item;
        }
        if (item.text === tax_residence_text) {
            tax_residence = item;
        }
    });
    return { citizen, place_of_birth, tax_residence };
};

const submitForm: TSubmitForm = (values, actions, idx, onSubmitFn, is_dirty, residence_list) => {
    const { citizen, place_of_birth, tax_residence } = findDefaultValuesInResidenceList({
        residence_list,
        citizen_text: values.citizen,
        tax_residence_text: values.tax_residence,
        place_of_birth_text: values.place_of_birth,
    });

    const payload = {
        ...values,
        citizen: citizen?.value || '',
        place_of_birth: place_of_birth?.value || '',
        tax_residence: tax_residence?.value || '',
    };
    onSubmitFn(idx, payload, actions.setSubmitting, is_dirty);
};

const CFDPersonalDetailsForm = ({
    changeable_fields,
    has_previous_button,
    is_loading,
    landing_company,
    residence_list,
    onCancel,
    onSave,
    context,
    onSubmit,
    value,
    index,
    form_error,
}: TCFDPersonalDetailsFormProps) => {
    const account_opening_reason = getAccountOpeningReasonList();
    const is_tin_required = !!(landing_company?.config?.tax_details_required ?? false);

    const handleCancel = (values: TFormValues) => {
        onSave(index, values);
        onCancel();
    };

    const onSubmitForm = (values: TFormValues, actions: FormikActions<TFormValues>) =>
        submitForm(values, actions, index, onSubmit, !isDeepEqual(value, values), residence_list);

    if (residence_list.length === 0) return <Loading is_fullscreen={false} />;
    if (is_loading) return <Loading is_fullscreen={false} />;

    return (
        <Formik
            initialValues={{ ...value }}
            validateOnChange
            validateOnBlur
            validate={values =>
                validatePersonalDetails({
                    values,
                    context,
                    residence_list,
                    account_opening_reason,
                    is_tin_required,
                })
            }
            onSubmit={onSubmitForm}
            validateOnMount
        >
            {({
                handleSubmit,
                isSubmitting,
                handleChange,
                handleBlur,
                errors,
                touched,
                values,
                setFieldValue,
                isValid,
            }: FormikProps<TFormValues>) => {
                const citizenship_error = touched.citizen && errors.citizen;
                const place_of_birth_error = touched.place_of_birth && errors.place_of_birth;
                const tax_residence_error = touched.tax_residence && errors.tax_residence;
                const account_opening_reason_error = touched.account_opening_reason && errors.account_opening_reason;

                const is_citizenship_disabled = !!value.citizen && !changeable_fields?.includes('citizen');
                const is_place_of_birth_disabled =
                    !!value.place_of_birth && !changeable_fields?.includes('place_of_birth');
                const is_tax_residence_disabled =
                    !!value.tax_residence && !changeable_fields?.includes('tax_residence');
                const is_account_opening_reason_disabled =
                    !!value.account_opening_reason && !changeable_fields?.includes('account_opening_reason');
                const handleItemSelection = (item: ResidenceList[0], _field: string) => {
                    const item_value = item.value ? item.text : '';
                    setFieldValue(_field, item_value, true);
                };

                return (
                    <AutoHeightWrapper default_height={200} height_offset={isDesktop() ? 148 : null}>
                        {({ setRef }: { setRef: (instance: HTMLFormElement | null) => void }) => (
                            <form
                                className='cfd-personal-details-modal__form'
                                ref={setRef}
                                onSubmit={handleSubmit}
                                autoComplete='off'
                                noValidate
                            >
                                <Div100vhContainer
                                    className='details-form'
                                    max_autoheight_offset='179px'
                                    is_disabled={isDesktop()}
                                >
                                    <Text
                                        as='p'
                                        size='xxs'
                                        align='center'
                                        className='details-form__description'
                                        data-testid='dt_cfd_details_form_description'
                                    >
                                        <Localize
                                            i18n_default_text={
                                                'Any information you provide is confidential and will be used for verification purposes only.'
                                            }
                                        />
                                    </Text>
                                    <ThemedScrollbars height='512px' is_bypassed={isMobile()}>
                                        <div className='details-form__elements'>
                                            <fieldset className='account-form__fieldset'>
                                                <DesktopWrapper>
                                                    <Field name='citizen'>
                                                        {({ field }: FieldProps<string, TFormValues>) => (
                                                            <Autocomplete
                                                                {...field}
                                                                id='real_mt5_citizenship'
                                                                data-lpignore='true'
                                                                autoComplete='off'
                                                                type='text'
                                                                label={localize('Citizenship')}
                                                                error={citizenship_error}
                                                                disabled={is_citizenship_disabled}
                                                                list_items={residence_list}
                                                                onItemSelection={(item: ResidenceList[0]) =>
                                                                    handleItemSelection(item, 'citizen')
                                                                }
                                                                list_portal_id='modal_root'
                                                                required
                                                            />
                                                        )}
                                                    </Field>
                                                </DesktopWrapper>
                                                <MobileWrapper>
                                                    <SelectNative
                                                        placeholder={localize('Please select')}
                                                        label={localize('Citizenship')}
                                                        value={values.citizen}
                                                        list_items={residence_list}
                                                        error={citizenship_error}
                                                        disabled={is_citizenship_disabled}
                                                        use_text={true}
                                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                                            setFieldValue('citizen', e.target.value, true)
                                                        }
                                                        required
                                                        should_hide_disabled_options={false}
                                                    />
                                                </MobileWrapper>
                                            </fieldset>
                                            <fieldset className='account-form__fieldset'>
                                                <DesktopWrapper>
                                                    <Field name='place_of_birth'>
                                                        {({ field }: FieldProps<string, TFormValues>) => (
                                                            <Autocomplete
                                                                {...field}
                                                                id='real_mt5_place_of_birth'
                                                                data-lpignore='true'
                                                                autoComplete='off'
                                                                type='text'
                                                                label={localize('Place of birth')}
                                                                error={place_of_birth_error}
                                                                disabled={is_place_of_birth_disabled}
                                                                list_items={residence_list}
                                                                onItemSelection={(item: ResidenceList[0]) =>
                                                                    handleItemSelection(item, 'place_of_birth')
                                                                }
                                                                list_portal_id='modal_root'
                                                                required
                                                            />
                                                        )}
                                                    </Field>
                                                </DesktopWrapper>
                                                <MobileWrapper>
                                                    <SelectNative
                                                        placeholder={localize('Please select')}
                                                        label={localize('Place of birth')}
                                                        value={values.place_of_birth}
                                                        list_items={residence_list}
                                                        error={place_of_birth_error}
                                                        disabled={is_place_of_birth_disabled}
                                                        use_text={true}
                                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                                            setFieldValue('place_of_birth', e.target.value, true)
                                                        }
                                                        required
                                                        should_hide_disabled_options={false}
                                                    />
                                                </MobileWrapper>
                                            </fieldset>
                                            <fieldset className='account-form__fieldset'>
                                                <DesktopWrapper>
                                                    <Field name='tax_residence'>
                                                        {({ field }: FieldProps<string, TFormValues>) => (
                                                            <Autocomplete
                                                                id='real_mt5_tax_residence'
                                                                data-lpignore='true'
                                                                type='text'
                                                                autoComplete='off'
                                                                label={localize('Tax residence')}
                                                                error={tax_residence_error}
                                                                disabled={is_tax_residence_disabled}
                                                                list_items={residence_list}
                                                                onItemSelection={(item: ResidenceList[0]) =>
                                                                    handleItemSelection(item, 'tax_residence')
                                                                }
                                                                list_portal_id='modal_root'
                                                                {...field}
                                                            />
                                                        )}
                                                    </Field>
                                                </DesktopWrapper>
                                                <MobileWrapper>
                                                    <SelectNative
                                                        placeholder={localize('Please select')}
                                                        label={localize('Tax residence')}
                                                        value={values.tax_residence}
                                                        error={tax_residence_error}
                                                        disabled={is_tax_residence_disabled}
                                                        list_items={residence_list}
                                                        use_text={true}
                                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                                            setFieldValue('tax_residence', e.target.value, true)
                                                        }
                                                        required
                                                    />
                                                </MobileWrapper>
                                            </fieldset>
                                            <fieldset className='account-form__fieldset'>
                                                <InputField
                                                    id='real_mt5_tax_identification_number'
                                                    name='tax_identification_number'
                                                    label={localize('Tax identification number')}
                                                    placeholder={localize('Tax identification number')}
                                                    value={values.tax_identification_number}
                                                    onBlur={handleBlur}
                                                    disabled={
                                                        !!value.tax_identification_number &&
                                                        !changeable_fields?.includes('tax_identification_number')
                                                    }
                                                    optional
                                                />
                                            </fieldset>
                                            <Field name='account_opening_reason'>
                                                {({ field }: FieldProps<string, TFormValues>) => (
                                                    <React.Fragment>
                                                        <DesktopWrapper>
                                                            <Dropdown
                                                                {...field}
                                                                placeholder={localize('Account opening reason')}
                                                                is_align_text_left
                                                                name={field.name}
                                                                list={account_opening_reason}
                                                                value={values.account_opening_reason}
                                                                disabled={is_account_opening_reason_disabled}
                                                                onChange={handleChange}
                                                                handleBlur={handleBlur}
                                                                error={account_opening_reason_error}
                                                                list_portal_id='modal_root'
                                                            />
                                                        </DesktopWrapper>
                                                        <MobileWrapper>
                                                            <SelectNative
                                                                {...field}
                                                                placeholder={localize('Please select')}
                                                                name={field.name}
                                                                label={localize('Account opening reason')}
                                                                list_items={account_opening_reason}
                                                                value={values.account_opening_reason}
                                                                disabled={is_account_opening_reason_disabled}
                                                                error={account_opening_reason_error}
                                                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                                    handleChange(e);
                                                                    setFieldValue(
                                                                        'account_opening_reason',
                                                                        e.target.value,
                                                                        true
                                                                    );
                                                                }}
                                                                data_testid='account_opening_reason_mobile'
                                                            />
                                                        </MobileWrapper>
                                                    </React.Fragment>
                                                )}
                                            </Field>
                                        </div>
                                    </ThemedScrollbars>
                                </Div100vhContainer>
                                <Modal.Footer is_bypassed={isMobile()} has_separator>
                                    {form_error && <FormSubmitErrorMessage message={form_error} />}
                                    <FormSubmitButton
                                        cancel_label={localize('Previous')}
                                        is_disabled={isSubmitting || !isValid || Object.keys(errors).length > 0}
                                        is_absolute={isMobile()}
                                        label={localize('Next')}
                                        context={context}
                                        onCancel={() => handleCancel(values)}
                                        has_cancel={has_previous_button}
                                    />
                                </Modal.Footer>
                            </form>
                        )}
                    </AutoHeightWrapper>
                );
            }}
        </Formik>
    );
};

export default CFDPersonalDetailsForm;
