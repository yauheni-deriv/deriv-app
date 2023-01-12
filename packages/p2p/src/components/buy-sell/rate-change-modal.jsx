import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Modal, Text } from '@deriv/components';
import { isMobile } from '@deriv/shared';
import { localize, Localize } from 'Components/i18next';
import { useStores } from 'Stores';
import './rate-change-modal.scss';

const RateChangeModal = ({ onMount }) => {
    const { buy_sell_store, floating_rate_store, general_store } = useStores();
    const local_currency = general_store.client?.local_currency_config?.currency;
    const is_mobile = isMobile();

    const closeModal = () => {
        floating_rate_store.setIsMarketRateChanged(false);
        buy_sell_store.setShowRateChangePopup(false);
        onMount(false);
    };

    if (!is_mobile && floating_rate_store.is_market_rate_changed) {
        onMount(false);
    }

    return (
        <Modal
            is_open={buy_sell_store.show_rate_change_popup && floating_rate_store.is_market_rate_changed}
            toggleModal={closeModal}
            small
            className='rate-changed-modal'
        >
            <Modal.Body>
                <Text
                    as='p'
                    align='left'
                    className='rate-changed-modal__message'
                    size={isMobile() ? 'xxs' : 'xs'}
                    line_height='s'
                >
                    <Localize
                        i18n_default_text={'The {{local_currency}} market rate has changed.'}
                        values={{ local_currency }}
                    />
                </Text>
            </Modal.Body>
            <Modal.Footer className='rate-changed-modal__button'>
                <Button onClick={closeModal} text={localize('Try again')} primary large />
            </Modal.Footer>
        </Modal>
    );
};

export default observer(RateChangeModal);
