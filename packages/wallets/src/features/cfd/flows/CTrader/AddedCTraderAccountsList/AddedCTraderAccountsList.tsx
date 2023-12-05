import React from 'react';
import { useHistory } from 'react-router-dom';
import { useCtraderAccountsList } from '@deriv/api';
import { TradingAccountCard } from '../../../../../components';
import { WalletButton, WalletText } from '../../../../../components/Base';
import { useModal } from '../../../../../components/ModalProvider';
import { getStaticUrl } from '../../../../../helpers/urls';
import CTrader from '../../../../../public/images/ctrader.svg';
import { PlatformDetails } from '../../../constants';
import { MT5TradeModal } from '../../../modals';
import './AddedCTraderAccountsList.scss';

const AddedCTraderAccountsList: React.FC = () => {
    const history = useHistory();
    const { data: cTraderAccounts } = useCtraderAccountsList();
    const { show } = useModal();

    const leading = () => (
        <div
            className='wallets-added-ctrader__icon'
            onClick={() => {
                window.open(getStaticUrl('/deriv-ctrader'));
            }}
            // Fix sonarcloud issue
            onKeyDown={event => {
                if (event.key === 'Enter') {
                    window.open(getStaticUrl('/deriv-ctrader'));
                }
            }}
        >
            <CTrader />
        </div>
    );

    const trailing = () => (
        <div className='wallets-added-ctrader__actions'>
            <WalletButton
                onClick={() => {
                    history.push('/wallets/cashier/transfer');
                }}
                variant='outlined'
            />
            <WalletButton onClick={() => show(<MT5TradeModal platform={PlatformDetails.ctrader.platform} />)}>
                Open
            </WalletButton>
        </div>
    );

    return (
        <div className='wallets-added-ctrader'>
            <TradingAccountCard leading={leading} trailing={trailing}>
                <div className='wallets-added-ctrader__details'>
                    {cTraderAccounts?.map(account => (
                        <React.Fragment key={`added-ctrader-${account.login}`}>
                            <WalletText size='sm'>{PlatformDetails.ctrader.title}</WalletText>
                            <WalletText size='sm' weight='bold'>
                                {account?.formatted_balance}
                            </WalletText>
                            <WalletText color='primary' size='sm' weight='bold'>
                                {account.login}
                            </WalletText>
                        </React.Fragment>
                    ))}
                </div>
            </TradingAccountCard>
        </div>
    );
};

export default AddedCTraderAccountsList;
