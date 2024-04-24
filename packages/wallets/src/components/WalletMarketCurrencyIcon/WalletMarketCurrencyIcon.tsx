import React, { ComponentType, SVGAttributes } from 'react';
import { AccountsDerivAccountLightIcon } from '@deriv/quill-icons';
import CTraderIcon from '../../public/images/ctrader.svg';
import DerivXIcon from '../../public/images/derivx.svg';
import DerivedMT5Icon from '../../public/images/mt5-derived.svg';
import FinancialMT5Icon from '../../public/images/mt5-financial.svg';
import SwapFreeMT5Icon from '../../public/images/mt5-swap-free.svg';
import { THooks, TPlatforms } from '../../types';
import { WalletCardIcon } from '../WalletCardIcon';
import { WalletGradientBackground } from '../WalletGradientBackground';
import './WalletMarketCurrencyIcon.scss';

// TODO: Migrate these market type icons to use quill-icons
const marketTypeToIconMapper: Record<string, ComponentType<SVGAttributes<SVGElement>>> = {
    all: SwapFreeMT5Icon,
    financial: FinancialMT5Icon,
    synthetic: DerivedMT5Icon,
};

// TODO: Migrate these market type icons to use quill-icons
const marketTypeToPlatformIconMapper: Record<string, ComponentType<SVGAttributes<SVGElement>>> = {
    ctrader: CTraderIcon,
    dxtrade: DerivXIcon,
};

type TWalletMarketCurrencyIconProps = {
    currency: Exclude<THooks.ActiveWalletAccount['currency'], undefined>;
    isDemo: THooks.ActiveWalletAccount['is_virtual'];
    marketType?: THooks.SortedMT5Accounts['market_type'];
    platform?: TPlatforms.All;
};

const ResizedDerivAccountLightIcon = () => (
    <AccountsDerivAccountLightIcon className='wallets-market-currency-icon__after' height={48} width={48} />
);

const WalletMarketCurrencyIcon: React.FC<TWalletMarketCurrencyIconProps> = ({
    currency,
    isDemo,
    marketType,
    platform,
}) => {
    let MarketTypeIcon: ComponentType<SVGAttributes<SVGElement>>;
    if (marketType && platform) {
        MarketTypeIcon =
            marketType === 'all' && Object.keys(marketTypeToPlatformIconMapper).includes(platform)
                ? marketTypeToPlatformIconMapper[platform]
                : marketTypeToIconMapper[marketType];
    } else {
        MarketTypeIcon = ResizedDerivAccountLightIcon;
    }

    return (
        <div className='wallets-market-currency-icon'>
            <MarketTypeIcon className='wallets-market-currency-icon__after' />
            <div
                className={`wallets-market-currency-icon__before wallets-market-currency-icon__before-${
                    isDemo ? 'demo' : 'real'
                }`}
            >
                <WalletGradientBackground currency={currency} hasShine isDemo={isDemo} type='card'>
                    <WalletCardIcon device='desktop' size='lg' type={isDemo ? 'Demo' : currency} />
                </WalletGradientBackground>
            </div>
        </div>
    );
};

export default WalletMarketCurrencyIcon;
