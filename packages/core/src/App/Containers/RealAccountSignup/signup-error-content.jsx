import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { isMobile, signup_form_fields } from '@deriv/shared';
import { Button, Icon, StaticUrl, Text } from '@deriv/components';
import { localize, Localize } from '@deriv/translations';

const Heading = ({ code }) => {
    switch (code) {
        case 'DuplicateAccount':
            return (
                <Text as='h1' align='center' weight='bold'>
                    <Localize i18n_default_text='Already signed up?' />
                </Text>
            );
        case 'InvalidAccount':
            return (
                <Text as='h2' size={isMobile() ? 'xs' : 's'} align='center' weight='bold' line_height='xxl'>
                    <Localize i18n_default_text='You can’t add another real account' />
                </Text>
            );
        case 'InputValidationFailed':
        case 'PoBoxInAddress':
        case 'InvalidPhone':
            return (
                <Text as='h1' align='center' weight='bold' line_height='xxl'>
                    <Localize i18n_default_text='Invalid inputs' />
                </Text>
            );

        default:
            return (
                <Text as='h1' align='center' weight='bold'>
                    <Localize i18n_default_text='Something’s not right' />
                </Text>
            );
    }
};

const Message = ({ code, message, details }) => {
    if (code === 'PoBoxInAddress') {
        details.error_details = { address_line_1: message };
    } else if (code === 'InvalidPhone') {
        details.error_details = { phone: message };
    }
    switch (code) {
        case 'DuplicateAccount':
            return (
                <p>
                    <Localize i18n_default_text='An account with your details already exists.' />
                    <br />
                    <Localize
                        i18n_default_text="If you're having trouble signing in, let us know via <0>chat</0>"
                        components={[
                            <span className='chat-inline' key={0} onClick={() => window.LC_API.open_chat_window()} />,
                        ]}
                    />
                </p>
            );
        case 'InvalidAccount':
            return (
                <Text size={isMobile() ? 'xxs' : 'xs'} align='center'>
                    <Localize i18n_default_text={message} />
                </Text>
            );
        case 'InputValidationFailed':
        case 'PoBoxInAddress':
        case 'InvalidPhone':
            return (
                <div className='input_validation_failed'>
                    <Text align='center' weight='normal' line_height='xxl'>
                        <Localize i18n_default_text='We don’t accept the following inputs for:' />
                    </Text>
                    {Object.keys(details?.error_details).map(item => (
                        <div key={item} className='invalid_fields_input'>
                            <Text size='xs' weight='bold'>
                                <Localize i18n_default_text={signup_form_fields[item]} />
                            </Text>
                            <Text size='xs' weight='bold'>
                                {' : '}
                            </Text>
                            <Text size='xs'>{details[item]}</Text>
                        </div>
                    ))}
                </div>
            );

        default:
            return <p>{message}</p>;
    }
};

const TryAgain = ({ text, onConfirm }) => (
    <Button primary onClick={onConfirm} large>
        {text}
    </Button>
);

const ErrorCTA = ({ code, onConfirm }) => {
    switch (code) {
        case 'CurrencyTypeNotAllowed':
            return <TryAgain text={localize('Try a different currency')} onConfirm={onConfirm} />;
        case 'DuplicateAccount':
            return null;
        case 'InputValidationFailed':
        case 'PoBoxInAddress':
        case 'InvalidPhone':
            return <TryAgain text={localize('Let’s try again')} onConfirm={onConfirm} />;
        case 'InvalidAccount':
            return <TryAgain text={localize('OK')} onConfirm={onConfirm} />;

        default:
            return (
                <StaticUrl
                    href={`help-centre/${code === 'InvalidAccount' ? 'account#who-can-open-an-account' : ''}`}
                    type='button'
                    className='dc-btn dc-btn--primary'
                >
                    <Text weight='bold' color='white' size='xxs'>
                        <Localize i18n_default_text='OK' />
                    </Text>
                </StaticUrl>
            );
    }
};

const SignupErrorContent = ({ message, code, onConfirm, className, error_field = {} }) => {
    const is_invalid_field_error = ['InputValidationFailed', 'PoBoxInAddress', 'InvalidPhone'].includes(code);
    const getIconSize = () => {
        if (is_invalid_field_error) return '64';
        else if (code === 'InvalidAccount') return '96';
        return '115';
    };
    return (
        <div
            className={classNames('account-wizard--error', {
                [`account-wizard--error__${className}`]: className,
            })}
        >
            <Icon icon={is_invalid_field_error ? 'IcInvalidError' : 'IcAccountError'} size={getIconSize()} />
            <Heading code={code} />
            <Message code={code} message={message} details={error_field} />
            <ErrorCTA code={code} onConfirm={onConfirm} />
        </div>
    );
};

SignupErrorContent.propTypes = {
    code: PropTypes.string,
    error_field: PropTypes.object,
    message: PropTypes.string,
    onConfirm: PropTypes.func,
    className: PropTypes.string,
};

export default SignupErrorContent;
