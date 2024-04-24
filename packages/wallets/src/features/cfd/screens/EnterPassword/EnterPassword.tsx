import React, { useEffect } from 'react';
import { useActiveWalletAccount } from '@deriv/api-v2';
import { WalletButton, WalletPasswordFieldLazy, WalletText } from '../../../../components/Base';
import useDevice from '../../../../hooks/useDevice';
import { TMarketTypes, TPlatforms } from '../../../../types';
import { validPassword } from '../../../../utils/password-validation';
import { CFD_PLATFORMS, MarketTypeDetails, PlatformDetails } from '../../constants';
import './EnterPassword.scss';

type TProps = {
    isLoading?: boolean;
    marketType: TMarketTypes.CreateOtherCFDAccount;
    onPasswordChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPrimaryClick?: () => void;
    onSecondaryClick?: () => void;
    password: string;
    passwordError?: boolean;
    platform: TPlatforms.All;
    setPassword: (value: string) => void;
};

const EnterPassword: React.FC<TProps> = ({
    isLoading,
    marketType,
    onPasswordChange,
    onPrimaryClick,
    onSecondaryClick,
    password,
    passwordError,
    platform,
    setPassword,
}) => {
    const { isDesktop } = useDevice();
    const { data } = useActiveWalletAccount();
    const accountType = data?.is_virtual ? 'Demo' : 'Real';
    const title = PlatformDetails[platform].title;
    const marketTypeTitle =
        platform === PlatformDetails.dxtrade.platform ? accountType : MarketTypeDetails[marketType].title;
    const passwordErrorHints = `Hint: You may have entered your Deriv password, which is different from your ${title} password.`;

    useEffect(() => {
        if (passwordError) {
            setPassword('');
        }
    }, [passwordError, setPassword]);

    return (
        <div className='wallets-enter-password'>
            <div className='wallets-enter-password__container'>
                <WalletText lineHeight='xl' weight='bold'>
                    Enter your {title} password
                </WalletText>
                <div className='wallets-enter-password__content'>
                    <WalletText size='sm'>
                        Enter your {title} password to add a{' '}
                        {platform === CFD_PLATFORMS.MT5 && accountType === 'Demo'
                            ? `${accountType.toLocaleLowerCase()} ${CFD_PLATFORMS.MT5.toLocaleUpperCase()}`
                            : title}{' '}
                        {marketTypeTitle} account.
                    </WalletText>
                    <WalletPasswordFieldLazy
                        label={`${title} password`}
                        onChange={onPasswordChange}
                        password={password}
                        passwordError={passwordError}
                        shouldDisablePasswordMeter
                    />
                    {passwordError && <WalletText size='sm'>{passwordErrorHints}</WalletText>}
                </div>
            </div>
            {isDesktop && (
                <div className='wallets-enter-password__buttons'>
                    <WalletButton onClick={onSecondaryClick} size='md' variant='outlined'>
                        Forgot password?
                    </WalletButton>
                    <WalletButton
                        disabled={isLoading || !validPassword(password)}
                        isLoading={isLoading}
                        onClick={onPrimaryClick}
                        size='md'
                    >
                        Add account
                    </WalletButton>
                </div>
            )}
        </div>
    );
};

export default EnterPassword;
