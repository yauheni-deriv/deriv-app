import React from 'react';
import { Money, Text } from '@deriv/components';
import { connect } from 'Stores/connect';
import MultiplierAmountModal from 'Modules/Trading/Containers/Multiplier/multiplier-amount-modal.jsx';
import MultiplierOptionsModal from 'Modules/Trading/Containers/Multiplier/multiplier-options-modal.jsx';
import MultipliersExpiration from 'Modules/Trading/Components/Form/TradeParams/Multiplier/expiration.jsx';
import MultipliersExpirationModal from 'Modules/Trading/Components/Form/TradeParams/Multiplier/expiration-modal.jsx';
import MultipliersInfo from 'Modules/Trading/Components/Form/TradeParams/Multiplier/info.jsx';
import { localize } from '@deriv/translations';

const AmountWidget = ({ amount, currency, expiration, is_crypto_multiplier }) => {
    const [is_open, setIsOpen] = React.useState(false);
    const [is_expiration_modal_open, setIsExpirationModalOpen] = React.useState(false);

    const toggleModal = () => {
        setIsOpen(!is_open);
    };

    const toggleExpirationModal = () => {
        setIsExpirationModalOpen(!is_expiration_modal_open);
    };

    return (
        <React.Fragment>
            <MultiplierAmountModal is_open={is_open} toggleModal={toggleModal} />
            <div className='mobile-widget mobile-widget__multiplier' onClick={toggleModal}>
                <div className='mobile-widget__multiplier-amount'>
                    <div className='mobile-widget__item'>
                        <Text weight='bold' size='xxs'>
                            <Money amount={amount} currency={currency} show_currency />
                        </Text>
                    </div>
                </div>
                <MultipliersInfo
                    className='mobile-widget__multiplier-trade-info'
                    commission_text_size='xxxxs'
                    stop_out_text_size='xxxxs'
                />
            </div>
            {is_crypto_multiplier && (
                <div className='mobile-widget' onClick={expiration ? toggleExpirationModal : null}>
                    <div className='mobile-widget__multiplier-expiration'>
                        <Text size='xxs'>{localize('Expires on')}</Text>
                        <MultipliersExpiration is_text_only text_size='xxs' />
                    </div>
                    <MultipliersExpirationModal
                        is_open={is_expiration_modal_open}
                        toggleModal={toggleExpirationModal}
                    />
                </div>
            )}
        </React.Fragment>
    );
};

export const MultiplierAmountWidget = connect(({ modules }) => ({
    amount: modules.trade.amount,
    expiration: modules.trade.expiration,
    currency: modules.trade.currency,
    is_crypto_multiplier: modules.trade.is_crypto_multiplier,
    multiplier: modules.trade.multiplier,
}))(AmountWidget);

const MultiplierWidget = ({ multiplier }) => {
    const [is_open, setIsOpen] = React.useState(false);

    const toggleModal = () => {
        setIsOpen(!is_open);
    };

    return (
        <React.Fragment>
            <MultiplierOptionsModal is_open={is_open} toggleModal={toggleModal} />
            <div className='mobile-widget mobile-widget__multiplier-options' onClick={toggleModal}>
                <div className='mobile-widget__item'>
                    <span className='mobile-widget__item-value'>x{multiplier}</span>
                </div>
            </div>
        </React.Fragment>
    );
};

export const MultiplierOptionsWidget = connect(({ modules, ui }) => ({
    multiplier: modules.trade.multiplier,
    addToast: ui.addToast,
}))(MultiplierWidget);
