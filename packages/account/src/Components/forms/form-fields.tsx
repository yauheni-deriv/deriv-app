import React from 'react';
import { Field, FieldProps } from 'formik';
import { DateOfBirthPicker, Input } from '@deriv/components';
import { toMoment } from '@deriv/shared';
import { TInputProps } from '../../../../components/src/components/input';

type DateOfBirthFieldProps = {
    name: string;
    required?: boolean;
    label?: string;
    hint?: string;
    disabled: boolean;
    placeholder?: string;
    portal_id?: string;
};

export const DateOfBirthField: React.FC<DateOfBirthFieldProps> = ({ name, portal_id, ...rest }) => (
    <Field name={name}>
        {({ field: { value }, form: { setFieldValue, errors, touched, setTouched } }: FieldProps) => (
            <DateOfBirthPicker
                error={touched.date_of_birth && errors.date_of_birth}
                onBlur={() =>
                    setTouched({
                        ...touched,
                        date_of_birth: true,
                    })
                }
                onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
                    setFieldValue(name, target?.value ? toMoment(target.value).format('YYYY-MM-DD') : '', true)
                }
                value={value}
                portal_id={portal_id}
                {...rest}
            />
        )}
    </Field>
);

export const FormInputField: React.FC<TInputProps> = ({ name, ...rest }) => (
    <Field name={name}>
        {({ field, form: { touched, errors } }: FieldProps) => (
            <Input
                autoComplete='off'
                maxLength={rest.maxLength || 30}
                error={touched[field.name] && errors[field.name] ? String(errors[field.name]) : ''}
                {...field}
                {...rest}
            />
        )}
    </Field>
);
