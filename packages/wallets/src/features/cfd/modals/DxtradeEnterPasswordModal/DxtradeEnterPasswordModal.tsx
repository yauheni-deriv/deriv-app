import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAccountStatus, useActiveWalletAccount, useCreateOtherCFDAccount, useDxtradeAccountsList } from '@deriv/api';
import { SentEmailContent, WalletError } from '../../../../components';
import { ModalStepWrapper, ModalWrapper, WalletButton, WalletButtonGroup } from '../../../../components/Base';
import { useModal } from '../../../../components/ModalProvider';
import useDevice from '../../../../hooks/useDevice';
import DxTradePasswordIcon from '../../../../public/images/ic-dxtrade-password.svg';
import { PlatformDetails } from '../../constants';
import { CFDSuccess, CreatePassword, EnterPassword } from '../../screens';
import './DxtradeEnterPasswordModal.scss';

const DxtradeEnterPasswordModal = () => {
    const history = useHistory();
    const { isMobile } = useDevice();
    const [password, setPassword] = useState('');
    const { data: getAccountStatus, isSuccess: accountStatusSuccess } = useAccountStatus();
    const { error, isLoading, isSuccess, mutate, status } = useCreateOtherCFDAccount();
    const { data: dxtradeAccount, isSuccess: dxtradeAccountListSuccess } = useDxtradeAccountsList();
    const { data: activeWallet } = useActiveWalletAccount();
    const { hide, show } = useModal();
    const accountType = activeWallet?.is_virtual ? 'demo' : 'real';
    const dxtradePlatform = PlatformDetails.dxtrade.platform;

    const isDxtradePasswordNotSet = getAccountStatus?.is_dxtrade_password_not_set;

    const onSubmit = useCallback(() => {
        mutate({
            payload: {
                account_type: accountType,
                market_type: 'all',
                password,
                platform: dxtradePlatform,
            },
        });
    }, [mutate, accountType, password, dxtradePlatform]);

    const successDescription = useMemo(() => {
        return accountType === 'demo'
            ? "Let's practise trading with 10,000 USD virtual funds."
            : `Transfer funds from your ${activeWallet?.currency} Wallet to your ${PlatformDetails.dxtrade.title} account to start trading.`;
    }, [accountType, activeWallet?.currency]);

    const dxtradeBalance = useMemo(() => {
        return dxtradeAccount?.find(account => account.market_type === 'all')?.display_balance;
    }, [dxtradeAccount]);

    const renderFooter = useMemo(() => {
        if (isSuccess) {
            if (accountType === 'demo') {
                return (
                    <WalletButton
                        isFullWidth
                        onClick={() => {
                            hide();
                        }}
                        size='lg'
                    >
                        OK
                    </WalletButton>
                );
            }
            return (
                <WalletButtonGroup isFlex isFullWidth>
                    <WalletButton onClick={() => hide()} size='lg' variant='outlined'>
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
        }

        if (!isDxtradePasswordNotSet) {
            return (
                <WalletButtonGroup isFullWidth>
                    <WalletButton
                        isFullWidth
                        onClick={() => {
                            show(
                                <ModalStepWrapper title="We've sent you an email">
                                    <SentEmailContent platform={dxtradePlatform} />
                                </ModalStepWrapper>
                            );
                        }}
                        size='lg'
                        variant='outlined'
                    >
                        Forgot password?
                    </WalletButton>
                    <WalletButton
                        disabled={!password || isLoading}
                        isFullWidth
                        isLoading={isLoading}
                        onClick={onSubmit}
                        size='lg'
                    >
                        Add account
                    </WalletButton>
                </WalletButtonGroup>
            );
        }

        return (
            <WalletButton
                disabled={!password || isLoading}
                isFullWidth
                isLoading={isLoading}
                onClick={onSubmit}
                size='lg'
            >
                {`Create ${PlatformDetails.dxtrade.title} password`}
            </WalletButton>
        );
    }, [
        accountType,
        dxtradePlatform,
        hide,
        history,
        isDxtradePasswordNotSet,
        isLoading,
        isSuccess,
        onSubmit,
        password,
        show,
    ]);

    const successComponent = useMemo(() => {
        if (isSuccess && dxtradeAccountListSuccess) {
            return (
                <CFDSuccess
                    description={successDescription}
                    displayBalance={dxtradeBalance ?? ''}
                    marketType='all'
                    platform={dxtradePlatform}
                    renderButton={() => renderFooter}
                    title={`Your ${PlatformDetails.dxtrade.title}${
                        accountType === 'demo' ? ` ${accountType}` : ''
                    } account is ready`}
                />
            );
        }
    }, [
        isSuccess,
        dxtradeAccountListSuccess,
        successDescription,
        dxtradeBalance,
        dxtradePlatform,
        accountType,
        renderFooter,
    ]);

    const passwordComponent = useMemo(() => {
        if (!isSuccess && accountStatusSuccess) {
            return isDxtradePasswordNotSet ? (
                <CreatePassword
                    icon={<DxTradePasswordIcon />}
                    isLoading={isLoading}
                    onPasswordChange={e => setPassword(e.target.value)}
                    onPrimaryClick={onSubmit}
                    password={password}
                    platform={dxtradePlatform}
                />
            ) : (
                <EnterPassword
                    isLoading={isLoading}
                    marketType='all'
                    onPasswordChange={e => setPassword(e.target.value)}
                    onPrimaryClick={onSubmit}
                    onSecondaryClick={() =>
                        show(
                            <ModalWrapper>
                                <SentEmailContent platform={dxtradePlatform} />
                            </ModalWrapper>
                        )
                    }
                    password={password}
                    platform={dxtradePlatform}
                />
            );
        }
    }, [
        isSuccess,
        accountStatusSuccess,
        isDxtradePasswordNotSet,
        isLoading,
        onSubmit,
        password,
        dxtradePlatform,
        show,
    ]);

    if (status === 'error') {
        return <WalletError errorMessage={error?.error.message} onClick={() => hide()} title={error?.error?.code} />;
    }

    if (isMobile) {
        return (
            <ModalStepWrapper renderFooter={() => renderFooter} title={' '}>
                {successComponent}
                {passwordComponent}
            </ModalStepWrapper>
        );
    }
    return (
        <ModalWrapper hideCloseButton={isSuccess}>
            {successComponent}
            {passwordComponent}
        </ModalWrapper>
    );
};

export default DxtradeEnterPasswordModal;
