import React from 'react';
import { Trans } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useActiveWalletAccount } from '@deriv/api';
import { WalletButton, WalletText } from '../../components/Base';
import useDevice from '../../hooks/useDevice';
import CFDPlatformsListEmptyState from './CFDPlatformsListEmptyState';
import { CTraderList, MT5PlatformsList, OtherCFDPlatformsList } from './components';
import './CFDPlatformsList.scss';

type TProps = {
    onMT5PlatformListLoaded?: (value: boolean) => void;
};

const CFDPlatformsList: React.FC<TProps> = ({ onMT5PlatformListLoaded }) => {
    const { data: activeWallet } = useActiveWalletAccount();
    const { isMobile } = useDevice();
    const history = useHistory();

    return (
        <div className='wallets-cfd-list'>
            <section className='wallets-cfd-list__header'>
                {isMobile ? (
                    <div className='wallets-cfd-list__header-description'>
                        <WalletText size='sm'>
                            <Trans
                                components={[
                                    <a
                                        className='wallets-cfd-list__header-description__link'
                                        href='https://deriv.com/trade-types/cfds/'
                                        key={0}
                                        rel='noopener noreferrer'
                                        target='_blank'
                                    />,
                                ]}
                                defaults='Trade with leverage and tight spreads for better returns on trades. <0>Learn more</0>'
                            />
                        </WalletText>
                        <WalletButton
                            onClick={() => {
                                history.push('/wallets/compare-accounts');
                            }}
                            size='sm'
                            textSize='sm'
                            variant='ghost'
                        >
                            Compare accounts
                        </WalletButton>
                    </div>
                ) : (
                    <div>
                        <div className='wallets-cfd-list__header-compare-accounts'>
                            <WalletText size='xl' weight='bold'>
                                CFDs
                            </WalletText>
                            <WalletButton
                                onClick={() => {
                                    history.push('/wallets/compare-accounts');
                                }}
                                size='sm'
                                variant='ghost'
                            >
                                Compare accounts
                            </WalletButton>
                        </div>
                        <WalletText size='md'>
                            <Trans
                                components={[
                                    <a
                                        className='wallets-cfd-list__header-description__link'
                                        href='https://deriv.com/trade-types/cfds/'
                                        key={0}
                                        rel='noopener noreferrer'
                                        target='_blank'
                                    />,
                                ]}
                                defaults='Trade with leverage and tight spreads for better returns on trades. <0>Learn more</0>'
                            />
                        </WalletText>
                    </div>
                )}
            </section>
            {activeWallet?.currency_config?.is_crypto ? (
                <CFDPlatformsListEmptyState />
            ) : (
                <React.Fragment>
                    <MT5PlatformsList onMT5PlatformListLoaded={onMT5PlatformListLoaded} />
                    <CTraderList />
                    <OtherCFDPlatformsList />
                </React.Fragment>
            )}
        </div>
    );
};

export default CFDPlatformsList;
