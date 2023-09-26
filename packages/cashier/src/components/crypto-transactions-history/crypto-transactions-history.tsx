import React from 'react';
import { DataList, Icon, Loading, MobileWrapper, Modal, Table, Text } from '@deriv/components';
import { isDesktop, isMobile, routes } from '@deriv/shared';
import { localize, Localize } from '@deriv/translations';
import { useStore, observer } from '@deriv/stores';
import CryptoTransactionsCancelModal from './crypto-transactions-cancel-modal';
import CryptoTransactionsStatusModal from './crypto-transactions-status-modal';
import CryptoTransactionsRenderer from './crypto-transactions-renderer';
import { useCashierStore } from '../../stores/useCashierStores';
import { useCryptoTransactions } from '@deriv/hooks';

const getHeaders = () => [
    { text: localize('Transaction') },
    { text: localize('Amount') },
    { text: localize('Address') },
    { text: localize('Transaction hash') },
    { text: localize('Confirmations') },
    { text: localize('Time') },
    { text: localize('Status') },
    { text: localize('Action') },
];

const CryptoTransactionsHistory = observer(() => {
    const { client } = useStore();
    const { transaction_history, general_store } = useCashierStore();
    const { setIsCryptoTransactionsVisible } = transaction_history;
    const { data, isLoading } = useCryptoTransactions();
    const { setIsDeposit } = general_store;
    const { currency } = client;
    const [is_modal_visible, setIsModalVisible] = React.useState(false);

    React.useEffect(() => {
        return () => setIsCryptoTransactionsVisible(false);
    }, [setIsCryptoTransactionsVisible, currency]);

    const onClickBack = () => {
        setIsCryptoTransactionsVisible(false);
        if (window.location.pathname.endsWith(routes.cashier_deposit)) {
            setIsDeposit(true);
        }
    };

    return (
        <React.Fragment>
            <div className='crypto-transactions-history'>
                <div className='crypto-transactions-history__header'>
                    <div
                        className='crypto-transactions-history__back'
                        onClick={onClickBack}
                        data-testid='dt_crypto_transactions_history_back'
                    >
                        <Icon icon={isMobile() ? 'IcChevronLeftBold' : 'IcArrowLeftBold'} />
                        <Text as='p' size='xs' weight='bold'>
                            <Localize i18n_default_text={` ${currency} recent transactions`} />
                        </Text>
                    </div>
                </div>
                <MobileWrapper>
                    <CryptoTransactionsCancelModal />
                    <CryptoTransactionsStatusModal />
                </MobileWrapper>
                {(data?.length || 0) > 0 ? (
                    <Table className='crypto-transactions-history__table'>
                        {isDesktop() && (
                            <Table.Header className='crypto-transactions-history__table-header'>
                                <Table.Row className='crypto-transactions-history__table-row'>
                                    {getHeaders().map(header => (
                                        <Table.Head key={header.text}>{header.text}</Table.Head>
                                    ))}
                                </Table.Row>
                            </Table.Header>
                        )}
                        <Table.Body className='crypto-transactions-history__table-body'>
                            {isLoading ? (
                                <Loading is_fullscreen={false} />
                            ) : (
                                <DataList
                                    // TODO: CHECK THIS TYPE ERROR
                                    data_source={data}
                                    rowRenderer={row_props => (
                                        <CryptoTransactionsRenderer
                                            {...row_props}
                                            onTooltipClick={() => setIsModalVisible(true)}
                                        />
                                    )}
                                    keyMapper={row => row.id}
                                    row_gap={isMobile() ? 8 : 0}
                                />
                            )}
                        </Table.Body>
                    </Table>
                ) : (
                    <div className='crypto-transactions-history__empty-text'>
                        <Text as='p' size='xs' color='disabled' align='center'>
                            <Localize i18n_default_text='No current transactions available' />
                        </Text>
                    </div>
                )}
            </div>
            <Modal
                has_close_icon
                is_open={is_modal_visible}
                title='Note'
                toggleModal={() => setIsModalVisible(old => !old)}
                width='44rem'
                height='14rem'
                className='crypto-transactions-history__modal'
            >
                <Modal.Body className='crypto-transactions-history__modal-body'>
                    {localize('The details of this transaction is available on CoinsPaid.')}
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
});

export default CryptoTransactionsHistory;
