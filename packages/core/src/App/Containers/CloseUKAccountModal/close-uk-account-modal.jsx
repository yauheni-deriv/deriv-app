import React from 'react';
import { connect } from 'Stores/connect';
import { Dialog, Text, Button } from '@deriv/components';
import { Localize } from '@deriv/translations';
import PropTypes from 'prop-types';
import { isMobile } from '@deriv/shared';
import './close-uk-account-modal.scss';

export const CloseUKAccountContent = ({ showCloseUKAccountPopup, removeNotificationMessageByKey }) => (
    <>
        <div className='close-uk-account-header'>
            <Text
                as='h1'
                weight='bold'
                className='close-uk-account-header__heading'
                align='left'
                size={isMobile() ? 'xxs' : 's'}
            >
                <Localize i18n_default_text='Your account is scheduled to be closed' />
            </Text>
        </div>
        <div className='close-uk-account__content'>
            <Text as='p' size={isMobile() ? 'xxs' : 'xs'}>
                <Localize i18n_default_text='As part of the changes in our markets, we will be closing our UK clients’ accounts.' />
            </Text>
            <br />
            <Text align='left' weight='bold' as='p' size={isMobile() ? 'xxs' : 'xs'}>
                <Localize i18n_default_text='What this means for you' />
            </Text>
            <Text as='p' size={isMobile() ? 'xxs' : 'xs'}>
                <Localize i18n_default_text='You can no longer trade on Deriv or deposit funds into your account.' />
            </Text>
            <Text as='p' size={isMobile() ? 'xxs' : 'xs'}>
                <Localize i18n_default_text='If you had any open positions, we have closed them and refunded you.' />
            </Text>
            <br />
            <Text align='left' weight='bold' as='p' size={isMobile() ? 'xxs' : 'xs'}>
                <Localize i18n_default_text='What you need to do now' />
            </Text>
            <Text as='p' size={isMobile() ? 'xxs' : 'xs'}>
                <Localize i18n_default_text='Please proceed to withdraw all your funds from your account.' />
            </Text>
            <Text as='p' size={isMobile() ? 'xxs' : 'xs'}>
                <Localize i18n_default_text='You will lose access to your account when it gets closed, so be sure to withdraw all your funds.' />
            </Text>
        </div>
        <div className='close-uk-account dc-dialog__footer'>
            <Button
                className='continue-button'
                onClick={() => {
                    showCloseUKAccountPopup(false);
                    removeNotificationMessageByKey({ key: 'close_uk_account' });
                }}
                primary
                large
            >
                <Localize i18n_default_text='OK, I understand' />
            </Button>
        </div>
    </>
);

const CloseUKAccountModal = ({
    is_logged_in,
    is_loading,
    is_close_uk_account_modal_visible,
    removeNotificationMessageByKey,
    showCloseUKAccountPopup,
}) => {
    const [is_visible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        setIsVisible(is_logged_in && is_close_uk_account_modal_visible);
    }, [is_logged_in, is_close_uk_account_modal_visible]);

    return (
        <div className='close-uk-account'>
            <Dialog is_visible={is_visible} is_loading={is_loading}>
                <CloseUKAccountContent
                    showCloseUKAccountPopup={showCloseUKAccountPopup}
                    removeNotificationMessageByKey={removeNotificationMessageByKey}
                />
            </Dialog>
        </div>
    );
};

CloseUKAccountModal.propTypes = {
    is_loading: PropTypes.bool,
    is_logged_in: PropTypes.bool,
    is_close_uk_account_modal_visible: PropTypes.bool,
    removeNotificationMessageByKey: PropTypes.func,
    showCloseUKAccountPopup: PropTypes.func,
};

export default connect(({ client, notifications, ui }) => ({
    is_close_uk_account_modal_visible: ui.is_close_uk_account_modal_visible,
    is_loading: ui.is_loading,
    is_logged_in: client.is_logged_in,
    removeNotificationMessageByKey: notifications.removeNotificationMessageByKey,
    showCloseUKAccountPopup: ui.showCloseUKAccountPopup,
}))(CloseUKAccountModal);
