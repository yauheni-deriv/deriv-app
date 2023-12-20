import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { APIProvider } from '@deriv/api';
import { render, screen } from '@testing-library/react';
import WalletListCard from '../WalletListCard';

jest.mock('@deriv/api', () => ({
    ...jest.requireActual('@deriv/api'),
    useBalance: () => ({
        ...jest.requireActual('@deriv/api').useBalance(),
        isLoading: false,
    }),
}));

describe('WalletListCard', () => {
    it('should render the demo wallet list card with the correct details', () => {
        render(
            <APIProvider>
                <WalletListCard
                    badge='SVG'
                    balance='1000.00 USD'
                    currency='USD'
                    isActive
                    isDemo
                    loginid='CR123456'
                    title='USD'
                />
            </APIProvider>
        );

        const cardGradient = screen.getByTestId('dt_wallet_gradient_background');
        expect(screen.getByText('USD Wallet')).toBeInTheDocument();
        expect(screen.getByText('SVG')).toBeInTheDocument();
        expect(screen.getByText('1000.00 USD')).toBeInTheDocument();
        expect(cardGradient).toHaveClass('wallets-gradient--demo-desktop-card-light');
        expect(screen.queryByRole('button', { name: 'reset-balance' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'withdraw' })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'deposit' })).not.toBeInTheDocument();
    });

    it('should render the real wallet list card with the correct details', () => {
        render(
            <APIProvider>
                <WalletListCard
                    badge='MALTA'
                    balance='0.0000021 BTC'
                    currency='BTC'
                    isActive
                    isDemo={false}
                    loginid='CR123456'
                    title='BTC'
                />
            </APIProvider>
        );

        const cardGradient = screen.getByTestId('dt_wallet_gradient_background');
        expect(screen.getByText('BTC Wallet')).toBeInTheDocument();
        expect(screen.getByText('MALTA')).toBeInTheDocument();
        expect(screen.getByText('0.0000021 BTC')).toBeInTheDocument();
        expect(cardGradient).toHaveClass('wallets-gradient--BTC-desktop-card-light');
        expect(screen.queryByRole('button', { name: 'reset-balance' })).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'withdraw' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'deposit' })).toBeInTheDocument();
    });

    it('should redirect to reset balance page when reset balance button is clicked', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <APIProvider>
                    <WalletListCard
                        badge='SVG'
                        balance='1000.00 USD'
                        currency='USD'
                        isActive
                        isDemo
                        loginid='CR123456'
                        title='USD'
                    />
                </APIProvider>
            </Router>
        );

        const resetBalanceButton = screen.getByRole('button', { name: 'reset-balance' });
        expect(resetBalanceButton).toBeInTheDocument();
        resetBalanceButton.click();
        expect(history.location.pathname).toBe('/wallets/cashier/reset-balance');
    });

    it('should redirect to deposit page when deposit button is clicked', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <APIProvider>
                    <WalletListCard
                        badge='MALTA'
                        balance='0.0000021 BTC'
                        currency='BTC'
                        isActive
                        isDemo={false}
                        loginid='CR123456'
                        title='BTC'
                    />
                </APIProvider>
            </Router>
        );

        const depositButton = screen.getByRole('button', { name: 'deposit' });
        expect(depositButton).toBeInTheDocument();
        depositButton.click();
        expect(history.location.pathname).toBe('/wallets/cashier/deposit');
    });

    it('should redirect to withdraw page when withdraw button is clicked', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <APIProvider>
                    <WalletListCard
                        badge='MALTA'
                        balance='0.0000021 BTC'
                        currency='BTC'
                        isActive
                        isDemo={false}
                        loginid='CR123456'
                        title='BTC'
                    />
                </APIProvider>
            </Router>
        );

        const withdrawButton = screen.getByRole('button', { name: 'withdraw' });
        expect(withdrawButton).toBeInTheDocument();
        withdrawButton.click();
        expect(history.location.pathname).toBe('/wallets/cashier/withdraw');
    });

    it('should redirect to transfer page when transfer button is clicked', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <APIProvider>
                    <WalletListCard
                        badge='MALTA'
                        balance='0.0000021 BTC'
                        currency='BTC'
                        isActive
                        isDemo={false}
                        loginid='CR123456'
                        title='BTC'
                    />
                </APIProvider>
            </Router>
        );

        const transferButton = screen.getByRole('button', { name: 'transfer' });
        expect(transferButton).toBeInTheDocument();
        transferButton.click();
        expect(history.location.pathname).toBe('/wallets/cashier/transfer');
    });

    it('should redirect to transactions page when transactions button is clicked', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <APIProvider>
                    <WalletListCard
                        badge='MALTA'
                        balance='0.0000021 BTC'
                        currency='BTC'
                        isActive
                        isDemo={false}
                        loginid='CR123456'
                        title='BTC'
                    />
                </APIProvider>
            </Router>
        );

        const viewAllTransactionsButton = screen.getByRole('button', { name: 'transactions' });
        expect(viewAllTransactionsButton).toBeInTheDocument();
        viewAllTransactionsButton.click();
        expect(history.location.pathname).toBe('/wallets/cashier/transactions');
    });
});
