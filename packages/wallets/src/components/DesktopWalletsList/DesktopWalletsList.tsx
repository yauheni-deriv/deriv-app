import React from 'react';
import { useAuthorize, useWalletAccountsList } from '@deriv/api';
import { AccountsList } from '../AccountsList';
import { WalletListCard } from '../WalletListCard';
import { WalletsAccordion } from '../WalletsAccordion';
import './DesktopWalletsList.scss';

const DesktopWalletsList: React.FC = () => {
    const { data: wallets } = useWalletAccountsList();
    const { switchAccount } = useAuthorize();

    return (
        <div className='wallets-desktop-wallets-list'>
            {wallets?.map(wallet => {
                return (
                    <WalletsAccordion
                        isDemo={wallet.is_virtual}
                        isOpen={wallet.is_active}
                        key={`wallets-accordion-${wallet.loginid}`}
                        onToggle={() => switchAccount(wallet.loginid)}
                        renderHeader={() => (
                            <WalletListCard
                                badge={wallet.landing_company_name}
                                balance={wallet.display_balance}
                                currency={wallet.currency_config?.display_code || 'USD'}
                                isActive={wallet.is_active}
                                isDemo={wallet.is_virtual}
                                loginid={wallet.loginid}
                            />
                        )}
                    >
                        <AccountsList />
                    </WalletsAccordion>
                );
            })}
        </div>
    );
};

export default DesktopWalletsList;
