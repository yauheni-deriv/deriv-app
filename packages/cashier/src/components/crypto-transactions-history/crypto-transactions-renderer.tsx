import React from 'react';
import classNames from 'classnames';
import { Button, Icon, Money, Popover, Table, Text } from '@deriv/components';
import { epochToMoment, formatMoney, isMobile } from '@deriv/shared';
import { localize, Localize } from '@deriv/translations';
import { useStore, observer } from '@deriv/stores';
import { getStatus } from 'Constants/transaction-status';
import { TCryptoTransactionDetails } from 'Types';

type TCryptoTransactionsRendererProps = {
    row: TCryptoTransactionDetails;
};

const CryptoTransactionsRenderer = observer(({ row: crypto }: TCryptoTransactionsRendererProps) => {
    const {
        modules: {
            cashier: { transaction_history },
        },
        client,
    } = useStore();
    const { cancelCryptoTransaction, showCryptoTransactionsCancelModal, showCryptoTransactionsStatusModal } =
        transaction_history;
    const { currency } = client;

    const {
        address_hash,
        address_url,
        amount,
        id,
        is_valid_to_cancel,
        status_code,
        submit_date,
        transaction_hash,
        transaction_url,
        transaction_type,
    } = crypto;
    const formatted_address_hash = address_hash
        ? `${address_hash.substring(0, 4)}....${address_hash.substring(address_hash.length - 4)}`
        : '';
    const formatted_amount = transaction_type === 'withdrawal' ? `-${amount}` : `+${amount}`;
    const formatted_submit_date = isMobile()
        ? epochToMoment(submit_date).format('DD MMM YYYY')
        : epochToMoment(submit_date).format('DD MMM YYYY HH:mm:ss [GMT]');
    const formatted_submit_time = epochToMoment(submit_date).format('HH:mm:ss [GMT]');
    const status = getStatus(transaction_hash, transaction_type, status_code);

    const [is_transaction_clicked, setTransactionClicked] = React.useState(false);
    const onClickCancel = () => {
        setTransactionClicked(true);
    };
    const onClickNo = () => {
        setTransactionClicked(false);
    };
    const cancelTransaction = () => {
        setTransactionClicked(false);
        cancelCryptoTransaction(id);
    };
    const onClickCancelTransaction = () => {
        showCryptoTransactionsCancelModal(id);
    };
    const onClickStatus = () => {
        const description = status.description;
        const name = status.name;
        showCryptoTransactionsStatusModal(description, name);
    };

    if (isMobile()) {
        return (
            <div>
                <Table.Row className='crypto-transactions-history__table-row'>
                    <Table.Cell className='crypto-transactions-history__table-cell'>
                        <Icon
                            icon={transaction_type === 'withdrawal' ? 'IcCashierWithdrawal' : 'IcCashierDeposit'}
                            size={32}
                        />
                        <Text as='p' size='xs' weight='bold' className='crypto-transactions-history__table-type'>
                            <Localize i18n_default_text={transaction_type} />
                        </Text>
                        <div
                            className='crypto-transactions-history__table-status'
                            onClick={onClickStatus}
                            data-testid='dt_table_status'
                        >
                            <div
                                className={classNames(
                                    'crypto-transactions-history__table-status-code',
                                    `crypto-transactions-history__table-status-code-${status.renderer}`
                                )}
                            />
                            <Text as='p' size='xxs'>
                                {status.name}
                            </Text>
                        </div>
                    </Table.Cell>
                    <Table.Cell>
                        <Text as='p' color='prominent' size='xxs' weight='bold'>
                            {localize('Amount')}
                        </Text>
                    </Table.Cell>
                    <Table.Cell className='crypto-transactions-history__table-amount'>
                        <Text
                            as='p'
                            size='xxs'
                            weight='bold'
                            color={status.renderer === 'successful' ? 'profit-success' : 'red'}
                        >
                            <Money
                                currency={currency}
                                amount={formatMoney(currency, formatted_amount, true)}
                                should_format={false}
                                show_currency
                            />
                        </Text>
                    </Table.Cell>
                    <Table.Cell>
                        <Text as='p' color='prominent' size='xxs' weight='bold'>
                            {localize('Address')}
                        </Text>
                    </Table.Cell>
                    <Table.Cell className='crypto-transactions-history__table-hash'>
                        <a
                            className='crypto-transactions-history__table-link'
                            href={address_url}
                            rel='noopener noreferrer'
                            target='_blank'
                        >
                            <Text as='p' size='xxs' color='red'>
                                {address_hash}
                            </Text>
                        </a>
                    </Table.Cell>
                    <Table.Cell>
                        <Text as='p' color='prominent' size='xxs' weight='bold'>
                            {localize('Transaction hash')}
                        </Text>
                    </Table.Cell>
                    <Table.Cell className='crypto-transactions-history__table-hash'>
                        <a
                            className='crypto-transactions-history__table-link'
                            href={transaction_url}
                            rel='noopener noreferrer'
                            target='_blank'
                        >
                            <Text as='p' size='xxs' color='red'>
                                {status.transaction_hash}
                            </Text>
                        </a>
                    </Table.Cell>
                    <Table.Cell>
                        <Text as='p' color='prominent' size='xxs' weight='bold'>
                            {localize('Time')}
                        </Text>
                    </Table.Cell>
                    <Table.Cell className='crypto-transactions-history__table-time'>
                        <Text as='p' size='xxs'>
                            {formatted_submit_date}
                        </Text>
                        <div className='crypto-transactions-history__bullet' />
                        <Text as='p' size='xxs'>
                            {formatted_submit_time}
                        </Text>
                    </Table.Cell>
                    <Table.Cell className='crypto-transactions-history__table-action'>
                        {is_valid_to_cancel === 1 && (
                            <Button
                                onClick={onClickCancelTransaction}
                                small
                                secondary
                                data-testid='dt_cancel_transaction'
                            >
                                <Text as='p' size='xxxs' weight='bolder'>
                                    <Localize i18n_default_text='Cancel transaction' />
                                </Text>
                            </Button>
                        )}
                    </Table.Cell>
                </Table.Row>
            </div>
        );
    }

    return (
        <div>
            <Table.Row className='crypto-transactions-history__table-row'>
                <Table.Cell className='crypto-transactions-history__table-type'>
                    <Icon
                        icon={transaction_type === 'withdrawal' ? 'IcCashierWithdrawal' : 'IcCashierDeposit'}
                        size={32}
                    />
                    <Text as='p' size='xs' weight='bold'>
                        <Localize i18n_default_text={transaction_type} />
                    </Text>
                </Table.Cell>
                <Table.Cell className='crypto-transactions-history__table-amount'>
                    <Text
                        as='p'
                        size='xs'
                        weight='bold'
                        color={status.renderer === 'successful' ? 'profit-success' : 'red'}
                    >
                        <Money
                            currency={currency}
                            amount={formatMoney(currency, formatted_amount, true)}
                            should_format={false}
                            show_currency
                        />
                    </Text>
                </Table.Cell>
                <Table.Cell className='crypto-transactions-history__table-hash'>
                    <Popover
                        alignment='right'
                        className='crypto-transactions-history__table-popover'
                        message={localize('View address on Blockchain')}
                    >
                        <a
                            className='crypto-transactions-history__table-link'
                            href={address_url}
                            rel='noopener noreferrer'
                            target='_blank'
                        >
                            <Text as='p' size='xs' color='red'>
                                {formatted_address_hash}
                            </Text>
                        </a>
                    </Popover>
                </Table.Cell>
                <Table.Cell className='crypto-transactions-history__table-hash'>
                    {transaction_url ? (
                        <Popover
                            alignment='right'
                            className='crypto-transactions-history__table-popover'
                            message={localize('View transaction on Blockchain')}
                        >
                            <a
                                className='crypto-transactions-history__table-link'
                                href={transaction_url}
                                rel='noopener noreferrer'
                                target='_blank'
                            >
                                <Text as='p' size='xs' color='red'>
                                    {status.transaction_hash}
                                </Text>
                            </a>
                        </Popover>
                    ) : (
                        <Text as='p' size='xs' color='red'>
                            {status.transaction_hash}
                        </Text>
                    )}
                </Table.Cell>
                {!is_transaction_clicked && (
                    <Table.Cell>
                        <Text as='p' size='xs'>
                            {formatted_submit_date}
                        </Text>
                    </Table.Cell>
                )}
                {!is_transaction_clicked && (
                    <Table.Cell className='crypto-transactions-history__table-status'>
                        <Popover
                            alignment='left'
                            className='crypto-transactions-history__table-popover'
                            message={status.description}
                        >
                            <div
                                className={classNames(
                                    'crypto-transactions-history__table-status-code',
                                    `crypto-transactions-history__table-status-code-${status.renderer}`
                                )}
                            />
                            <Text as='p' size='xs'>
                                {status.name}
                            </Text>
                        </Popover>
                    </Table.Cell>
                )}
                {is_transaction_clicked ? (
                    <Table.Cell className='crypto-transactions-history__table-confirm'>
                        <div>
                            <Text as='p' color='prominent' size='xxs'>
                                {localize('Are you sure you want to cancel this transaction?')}
                            </Text>
                            <Button onClick={cancelTransaction} primary text={localize('Yes')} />
                            <Button onClick={onClickNo} secondary text={localize('No')} />
                        </div>
                    </Table.Cell>
                ) : (
                    <Table.Cell className='crypto-transactions-history__table-action'>
                        {is_valid_to_cancel === 1 && (
                            <div onClick={onClickCancel} data-testid='dt_crypto_transactions_history_table_button'>
                                <Popover
                                    alignment='left'
                                    className='crypto-transactions-history__table-popover'
                                    message={localize('Cancel transaction')}
                                >
                                    <Icon icon='IcCrossLight' size={10} />
                                </Popover>
                            </div>
                        )}
                    </Table.Cell>
                )}
            </Table.Row>
        </div>
    );
});

export default CryptoTransactionsRenderer;
