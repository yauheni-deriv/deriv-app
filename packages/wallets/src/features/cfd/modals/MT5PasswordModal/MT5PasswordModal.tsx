import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    useAccountStatus,
    useActiveWalletAccount,
    useAvailableMT5Accounts,
    useCreateMT5Account,
    useMT5AccountsList,
    useSettings,
    useTradingPlatformPasswordChange,
} from '@deriv/api';
import { SentEmailContent, WalletError } from '../../../../components';
import { ModalStepWrapper, ModalWrapper, WalletButton, WalletButtonGroup } from '../../../../components/Base';
import { useModal } from '../../../../components/ModalProvider';
import useDevice from '../../../../hooks/useDevice';
import MT5PasswordIcon from '../../../../public/images/ic-mt5-password.svg';
import { TMarketTypes, TPlatforms } from '../../../../types';
import { validPassword } from '../../../../utils/password';
import { PlatformDetails } from '../../constants';
import { CreatePassword, EnterPassword } from '../../screens';
import MT5AccountAdded from '../MT5AccountAdded/MT5AccountAdded';

type TProps = {
    marketType: TMarketTypes.SortedMT5Accounts;
    platform: TPlatforms.All;
};

const MT5PasswordModal: React.FC<TProps> = ({ marketType, platform }) => {
    const [password, setPassword] = useState('');
    const {
        data: newMT5Account,
        error,
        isLoading: createMT5AccountLoading,
        isSuccess,
        mutate,
        status,
    } = useCreateMT5Account();
    const { isLoading: tradingPlatformPasswordChangeLoading, mutate: tradingPasswordChange } =
        useTradingPlatformPasswordChange();
    const { data: accountStatus } = useAccountStatus();
    const { data: activeWallet } = useActiveWalletAccount();
    const { data: availableMT5Accounts } = useAvailableMT5Accounts();
    const { isMobile } = useDevice();
    const history = useHistory();
    const { data: mt5Accounts } = useMT5AccountsList();
    const { getModalState, hide, show } = useModal();
    const { data: settings } = useSettings();
    const isMT5PasswordNotSet = accountStatus?.is_mt5_password_not_set;

    const hasMT5Account = mt5Accounts?.find(account => account.login);
    const isDemo = activeWallet?.is_virtual;
    const selectedJurisdiction = getModalState('selectedJurisdiction');

    const onSubmit = useCallback(async () => {
        const accountType = marketType === 'synthetic' ? 'gaming' : marketType;

        // in order to create account, we need to set a password through trading_platform_password_change endpoint first
        // then only mt5_create_account can be called, otherwise it will response an error for password required
        if (isMT5PasswordNotSet) {
            await tradingPasswordChange({
                new_password: password,
                platform: PlatformDetails.mt5.platform,
            });
        }

        const categoryAccountType = activeWallet?.is_virtual ? 'demo' : accountType;

        mutate({
            payload: {
                account_type: categoryAccountType,
                address: settings?.address_line_1 ?? '',
                city: settings?.address_city ?? '',
                company: selectedJurisdiction,
                country: settings?.country_code ?? '',
                email: settings?.email ?? '',
                leverage: availableMT5Accounts?.find(acc => acc.market_type === marketType)?.leverage ?? 500,
                mainPassword: password,
                ...(marketType === 'financial' && { mt5_account_type: 'financial' }),
                ...(selectedJurisdiction &&
                    (selectedJurisdiction !== 'labuan'
                        ? {
                              account_type: categoryAccountType,
                              ...(selectedJurisdiction === 'financial' && { mt5_account_type: 'financial' }),
                          }
                        : {
                              account_type: 'financial',
                              mt5_account_type: 'financial_stp',
                          })),
                ...(marketType === 'all' && { sub_account_category: 'swap_free' }),
                name: settings?.first_name ?? '',
                phone: settings?.phone ?? '',
                state: settings?.address_state ?? '',
                zipCode: settings?.address_postcode ?? '',
            },
        });
    }, [
        activeWallet?.is_virtual,
        availableMT5Accounts,
        isMT5PasswordNotSet,
        marketType,
        mutate,
        password,
        selectedJurisdiction,
        settings?.address_city,
        settings?.address_line_1,
        settings?.address_postcode,
        settings?.address_state,
        settings?.country_code,
        settings?.email,
        settings?.first_name,
        settings?.phone,
        tradingPasswordChange,
    ]);

    const renderTitle = useCallback(() => {
        if (hasMT5Account) {
            return `Add a ${isDemo ? 'demo' : 'real'} ${PlatformDetails.mt5.title} account`;
        }
        return `Create a ${isDemo ? 'demo' : 'real'} ${PlatformDetails.mt5.title} account`;
    }, [hasMT5Account, isDemo]);

    const renderSuccessButton = useCallback(() => {
        if (isDemo) {
            return (
                <div className='wallets-success-btn'>
                    <WalletButton isFullWidth onClick={hide} size='lg'>
                        OK
                    </WalletButton>
                </div>
            );
        }
        return (
            <WalletButtonGroup isFlex isFullWidth>
                <WalletButton onClick={hide} size='lg' variant='outlined'>
                    Maybe later
                </WalletButton>
                <WalletButton
                    onClick={() => {
                        hide();
                        history.push('/wallets/cashier/transfer');
                    }}
                    size='lg'
                >
                    Transfer funds
                </WalletButton>
            </WalletButtonGroup>
        );
    }, [history, isDemo, hide]);

    const renderFooter = useCallback(() => {
        if (isSuccess) return renderSuccessButton();
        if (hasMT5Account)
            return (
                <WalletButtonGroup isFullWidth>
                    <WalletButton
                        isFullWidth
                        onClick={() => {
                            show(
                                <ModalStepWrapper title="We've sent you an email">
                                    <SentEmailContent platform={platform} />
                                </ModalStepWrapper>
                            );
                        }}
                        size='lg'
                        variant='outlined'
                    >
                        Forgot password?
                    </WalletButton>
                    <WalletButton
                        disabled={!password || createMT5AccountLoading || tradingPlatformPasswordChangeLoading}
                        isFullWidth
                        isLoading={tradingPlatformPasswordChangeLoading || createMT5AccountLoading}
                        onClick={onSubmit}
                        size='lg'
                    >
                        Add account
                    </WalletButton>
                </WalletButtonGroup>
            );
        return (
            <WalletButton
                disabled={
                    !password ||
                    createMT5AccountLoading ||
                    tradingPlatformPasswordChangeLoading ||
                    !validPassword(password)
                }
                isFullWidth
                isLoading={tradingPlatformPasswordChangeLoading || createMT5AccountLoading}
                onClick={onSubmit}
                size='lg'
            >
                Create Deriv MT5 password
            </WalletButton>
        );
    }, [
        createMT5AccountLoading,
        hasMT5Account,
        isSuccess,
        onSubmit,
        password,
        platform,
        renderSuccessButton,
        show,
        tradingPlatformPasswordChangeLoading,
    ]);

    const passwordComponent = useMemo(() => {
        return isMT5PasswordNotSet ? (
            <CreatePassword
                icon={<MT5PasswordIcon />}
                isLoading={tradingPlatformPasswordChangeLoading || createMT5AccountLoading}
                onPasswordChange={e => setPassword(e.target.value)}
                onPrimaryClick={onSubmit}
                password={password}
                platform={PlatformDetails.mt5.platform}
            />
        ) : (
            <EnterPassword
                isLoading={tradingPlatformPasswordChangeLoading || createMT5AccountLoading}
                marketType={marketType}
                onPasswordChange={e => setPassword(e.target.value)}
                onPrimaryClick={onSubmit}
                onSecondaryClick={() =>
                    show(
                        <ModalWrapper>
                            <SentEmailContent platform={platform} />
                        </ModalWrapper>
                    )
                }
                password={password}
                passwordError={error?.error?.code === 'PasswordError'}
                platform={PlatformDetails.mt5.platform}
            />
        );
    }, [
        createMT5AccountLoading,
        error?.error?.code,
        isMT5PasswordNotSet,
        marketType,
        onSubmit,
        password,
        platform,
        show,
        tradingPlatformPasswordChangeLoading,
    ]);

    if (status === 'error' && error?.error?.code !== 'PasswordError') {
        return <WalletError errorMessage={error?.error.message} onClick={hide} title={error?.error?.code} />;
    }

    if (isSuccess) {
        return <MT5AccountAdded account={newMT5Account} marketType={marketType} platform={platform} />;
    }

    if (isMobile) {
        return (
            <ModalStepWrapper renderFooter={renderFooter} title={renderTitle()}>
                {passwordComponent}
            </ModalStepWrapper>
        );
    }

    return <ModalWrapper hideCloseButton={isSuccess}>{passwordComponent}</ModalWrapper>;
};

export default MT5PasswordModal;
