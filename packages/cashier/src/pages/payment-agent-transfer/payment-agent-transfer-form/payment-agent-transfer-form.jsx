import classNames from 'classnames';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Field, Formik, Form } from 'formik';
import { Button, DesktopWrapper, Input, Text } from '@deriv/components';
import { getDecimalPlaces, validNumber, getCurrencyDisplayCode } from '@deriv/shared';
import { useStore } from '@deriv/stores';
import { localize, Localize } from '@deriv/translations';
import ErrorDialog from 'Components/error-dialog';
import './payment-agent-transfer-form.scss';

const validateTransfer = (values, { balance, currency, transfer_limit }) => {
    const errors = {};

    if (!values.loginid || !/^[A-Za-z]+[0-9]+$/.test(values.loginid)) {
        errors.loginid = localize('Please enter a valid client login ID.');
    }

    const { is_ok, message } = validNumber(values.amount, {
        type: 'float',
        decimals: getDecimalPlaces(currency),
        ...(transfer_limit.min && {
            min: transfer_limit.min,
            max: +balance >= transfer_limit.min && +balance < transfer_limit.max ? balance : transfer_limit.max,
        }),
    });

    if (!values.amount) {
        errors.amount = localize('This field is required.');
    } else if (+balance < +values.amount) {
        errors.amount = localize('Insufficient balance.');
    } else if (!is_ok) {
        errors.amount = message;
    }

    if (values.description && !/^[0-9A-Za-z .,'-]{0,250}$/.test(values.description.replace(/\n/g, ' '))) {
        errors.description = localize('Please enter a valid description.');
    }

    return errors;
};

const PaymentAgentTransferForm = observer(() => {
    const {
        client,
        modules: {
            cashier: { payment_agent_transfer: payment_agent_transfer_store },
        },
    } = useStore();

    const { balance, currency } = client;

    const {
        confirm: { amount, description, client_id: transfer_to },
        error,
        requestTryPaymentAgentTransfer,
        transfer_limit,
    } = payment_agent_transfer_store;

    const { setErrorMessage } = error;

    const validateTransferPassthrough = values =>
        validateTransfer(values, {
            balance,
            currency,
            transfer_limit,
        });

    const onTransferPassthrough = async (values, actions) => {
        const payment_agent_transfer = await requestTryPaymentAgentTransfer({
            amount: values.amount,
            currency,
            description: values.description.replace(/\n/g, ' '),
            transfer_to: values.loginid,
        });
        if (payment_agent_transfer.error) {
            actions.setSubmitting(false);
        }
    };

    return (
        <div className='cashier__wrapper payment-agent-transfer-form__container'>
            <DesktopWrapper>
                <Text
                    as='h2'
                    color='prominent'
                    weight='bold'
                    align='center'
                    className='cashier__header cashier__content-header'
                >
                    <Localize i18n_default_text='Transfer to client' />
                </Text>
            </DesktopWrapper>
            <Formik
                initialValues={{
                    // in case coming back from confirmation screen, populate the recent data to be edited
                    loginid: transfer_to || '',
                    amount: amount || '',
                    description: description || '',
                }}
                validate={validateTransferPassthrough}
                onSubmit={onTransferPassthrough}
            >
                {({ errors, isSubmitting, isValid, touched, handleChange }) => (
                    <Form noValidate>
                        <Field name='loginid'>
                            {({ field }) => (
                                <Input
                                    {...field}
                                    onChange={e => {
                                        setErrorMessage('');
                                        handleChange(e);
                                    }}
                                    className='payment-agent-transfer-form__input'
                                    type='text'
                                    label={localize('Client account number')}
                                    error={touched.loginid && errors.loginid}
                                    required
                                    autoComplete='off'
                                    maxLength={20}
                                />
                            )}
                        </Field>
                        <Field name='amount'>
                            {({ field }) => (
                                <Input
                                    {...field}
                                    onChange={e => {
                                        setErrorMessage('');
                                        handleChange(e);
                                    }}
                                    className='payment-agent-transfer-form__input dc-input--no-placeholder'
                                    type='text'
                                    label={localize('Amount')}
                                    error={touched.amount && errors.amount}
                                    required
                                    trailing_icon={
                                        <span
                                            className={classNames(
                                                'symbols',
                                                `symbols--${(currency || '').toLowerCase()}`
                                            )}
                                        >
                                            {getCurrencyDisplayCode(currency)}
                                        </span>
                                    }
                                    autoComplete='off'
                                    maxLength={30}
                                />
                            )}
                        </Field>
                        <Field name='description'>
                            {({ field }) => (
                                <Input
                                    {...field}
                                    onChange={e => {
                                        setErrorMessage('');
                                        handleChange(e);
                                    }}
                                    className='payment-agent-transfer-form__input-area'
                                    type='textarea'
                                    label={localize('Description')}
                                    error={errors.description}
                                    required
                                    autoComplete='off'
                                    has_character_counter
                                    max_characters={250}
                                />
                            )}
                        </Field>
                        <div className='cashier__form-submit'>
                            <Button
                                className='cashier__form-submit-button payment-agent-transfer-form__submit-button'
                                type='submit'
                                is_disabled={!isValid || isSubmitting}
                                primary
                                large
                            >
                                <Localize i18n_default_text='Transfer' />
                            </Button>
                        </div>
                        <ErrorDialog error={error} />
                    </Form>
                )}
            </Formik>
        </div>
    );
});

export default PaymentAgentTransferForm;
