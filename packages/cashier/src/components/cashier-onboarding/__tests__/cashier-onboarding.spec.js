import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CashierOnboarding from '../cashier-onboarding';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import { routes } from '@deriv/shared';
import { StoreProvider } from '@deriv/stores';

jest.mock('Stores/connect.js', () => ({
    __esModule: true,
    default: 'mockedDefaultExport',
    connect: () => Component => Component,
}));

describe('<CashierOnboarding />', () => {
    let mockRootStore;
    beforeEach(() => {
        mockRootStore = {
            client: {
                accounts: { CR90000001: { is_virtual: 0, currency: 'USD' } },
                account_status: {
                    cashier_validation: [],
                },
                loginid: undefined,
                current_currency_type: 'crypto',
                is_deposit_lock: false,
                is_withdrawal_lock: true,
                is_identity_verification_needed: false,
                is_switching: false,
                is_landing_company_loaded: true,
                currency: 'USD',
                available_crypto_currencies: ['BTC', 'ETH'],
            },
            common: {
                is_from_derivgo: false,
            },
            ui: {
                openRealAccountSignup: jest.fn(),
                shouldNavigateAfterChooseCrypto: jest.fn(),
                toggleSetCurrencyModal: jest.fn(),
                is_mobile: false,
            },
            modules: {
                cashier: {
                    general_store: {
                        onMountCashierOnboarding: jest.fn(),
                        setDepositTarget: jest.fn(),
                        setIsCashierOnboarding: jest.fn(),
                        setIsDeposit: jest.fn(),
                        setShouldShowAllAvailableCurrencies: jest.fn(),
                        showP2pInCashierOnboarding: jest.fn(),
                        show_p2p_in_cashier_onboarding: true,
                        has_set_currency: true,
                    },
                    account_prompt_dialog: {
                        shouldNavigateAfterPrompt: jest.fn(),
                    },
                    payment_agent: {
                        is_payment_agent_visible_in_onboarding: true,
                    },
                },
            },
        };
    });

    const props = () => ({
        setSideNotes: jest.fn(),
    });

    const history = createBrowserHistory();

    const renderCashierOnboarding = () =>
        render(<CashierOnboarding {...props} />, {
            wrapper: ({ children }) => <StoreProvider store={mockRootStore}>{children}</StoreProvider>,
        });

    const renderCashierOnboardingWithRouter = () =>
        render(
            <Router history={history}>
                <CashierOnboarding {...props} />
            </Router>,
            {
                wrapper: ({ children }) => <StoreProvider store={mockRootStore}>{children}</StoreProvider>,
            }
        );

    it('should show the proper messages when <CashierOnboarding /> is rendered with fiat account', () => {
        renderCashierOnboarding();

        expect(screen.getByText('Choose a way to fund your account')).toBeInTheDocument();
        expect(
            screen.getByText('Please note that some payment methods might not be available in your country.')
        ).toBeInTheDocument();
        expect(screen.getByText('Deposit via bank wire, credit card, and e-wallet')).toBeInTheDocument();
        expect(screen.getByText('Deposit via the following payment methods:')).toBeInTheDocument();
        expect(screen.getByText('Deposit cryptocurrencies')).toBeInTheDocument();
        expect(screen.getByText('We accept the following cryptocurrencies:')).toBeInTheDocument();
        expect(screen.getByText('Buy cryptocurrencies via fiat onramp')).toBeInTheDocument();
        expect(screen.getByText('Choose any of these exchanges to buy cryptocurrencies:')).toBeInTheDocument();
        expect(screen.getByText('Deposit via payment agents')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Deposit in your local currency via an authorised, independent payment agent in your country.'
            )
        ).toBeInTheDocument();
        expect(screen.getByText('Deposit with Deriv P2P')).toBeInTheDocument();
        expect(
            screen.getByText(
                'Deposit in your local currency via peer-to-peer exchange with fellow traders in your country.'
            )
        ).toBeInTheDocument();
    });

    it('should show the proper message when <CashierOnboarding /> is rendered with crypto account', () => {
        mockRootStore.client.accounts = { CR90000002: { is_virtual: 0, currency: 'BTC' } };
        mockRootStore.client.currency = 'BTC';
        renderCashierOnboarding();

        expect(screen.getByText('Buy cryptocurrencies')).toBeInTheDocument();
        expect(screen.queryByText('Buy cryptocurrencies via fiat onramp')).not.toBeInTheDocument();
    });

    it('should trigger proper callbacks when the client chooses "Deposit via bank wire, credit card, and e-wallet" section from his fiat account', () => {
        mockRootStore.client.accounts = { CR90000001: { is_virtual: 0, currency: 'USD' } };
        mockRootStore.client.currency = 'USD';

        renderCashierOnboarding();

        const node_list = screen.getAllByTestId('dt_cashier_onboarding_detail_div');
        const deposit_bank_card_ewallet_detail_div = Array.from(node_list).find(node =>
            node.textContent.includes('Deposit via the following payment methods:')
        );
        fireEvent.click(deposit_bank_card_ewallet_detail_div);

        expect(mockRootStore.modules.cashier.general_store.setDepositTarget).toHaveBeenCalledTimes(1);
        expect(mockRootStore.modules.cashier.general_store.setIsDeposit).toHaveBeenCalledTimes(1);
    });

    it('should trigger proper callbacks when the client chooses "Deposit via bank wire, credit card, and e-wallet" section from his crypto account, not having the fiat account', () => {
        mockRootStore.client.accounts = { CR90000002: { is_virtual: 0, currency: 'BTC' } };
        mockRootStore.client.currency = 'BTC';

        renderCashierOnboarding();

        const node_list = screen.getAllByTestId('dt_cashier_onboarding_detail_div');
        const deposit_bank_card_ewallet_detail_div = Array.from(node_list).find(node =>
            node.textContent.includes('Deposit via the following payment methods:')
        );
        fireEvent.click(deposit_bank_card_ewallet_detail_div);

        expect(mockRootStore.modules.cashier.general_store.setDepositTarget).toHaveBeenCalledTimes(1);
        expect(mockRootStore.ui.openRealAccountSignup).toHaveBeenCalledTimes(1);
    });

    it('should trigger proper callbacks when the client chooses "Deposit via bank wire, credit card, and e-wallet" section from his crypto account, having the fiat account', () => {
        mockRootStore.client.accounts = {
            CR90000001: { is_virtual: 0, currency: 'USD' },
            CR90000002: { is_virtual: 0, currency: 'BTC' },
        };
        mockRootStore.client.currency = 'BTC';

        renderCashierOnboarding();

        const node_list = screen.getAllByTestId('dt_cashier_onboarding_detail_div');
        const deposit_bank_card_ewallet_detail_div = Array.from(node_list).find(node =>
            node.textContent.includes('Deposit via the following payment methods:')
        );
        fireEvent.click(deposit_bank_card_ewallet_detail_div);

        expect(mockRootStore.modules.cashier.general_store.setDepositTarget).toHaveBeenCalledTimes(1);
        expect(mockRootStore.modules.cashier.account_prompt_dialog.shouldNavigateAfterPrompt).toHaveBeenCalledTimes(1);
    });

    it('should trigger proper callbacks when the client chooses "Deposit cryptocurrencies" section from his fiat account, not having the crypto account', () => {
        mockRootStore.client.accounts = { CR90000001: { is_virtual: 0, currency: 'USD' } };

        renderCashierOnboarding();

        const node_list = screen.getAllByTestId('dt_cashier_onboarding_detail_div');
        const deposit_crypto_detail_div = Array.from(node_list).find(node =>
            node.textContent.includes('We accept the following cryptocurrencies:')
        );
        fireEvent.click(deposit_crypto_detail_div);

        expect(mockRootStore.modules.cashier.general_store.setDepositTarget).toHaveBeenCalledTimes(1);
        expect(mockRootStore.ui.openRealAccountSignup).toHaveBeenCalledTimes(1);
    });

    it('should trigger proper callbacks when the client chooses "Deposit cryptocurrencies" section from his crypto account', () => {
        mockRootStore.client.accounts = { CR90000002: { is_virtual: 0, currency: 'BTC' } };
        mockRootStore.client.currency = 'BTC';

        renderCashierOnboarding();

        const node_list = screen.getAllByTestId('dt_cashier_onboarding_detail_div');
        const deposit_crypto_detail_div = Array.from(node_list).find(node =>
            node.textContent.includes('We accept the following cryptocurrencies:')
        );
        fireEvent.click(deposit_crypto_detail_div);

        expect(mockRootStore.modules.cashier.general_store.setDepositTarget).toHaveBeenCalledTimes(1);
        expect(mockRootStore.ui.openRealAccountSignup).toHaveBeenCalledTimes(1);
        expect(mockRootStore.ui.shouldNavigateAfterChooseCrypto).toHaveBeenCalledTimes(1);
    });

    it('should trigger proper callbacks when the client chooses "Buy cryptocurrencies via fiat onramp" section from his fiat account, not having the crypto account', () => {
        mockRootStore.client.accounts = { CR90000001: { is_virtual: 0, currency: 'USD' } };

        renderCashierOnboarding();

        const node_list = screen.getAllByTestId('dt_cashier_onboarding_detail_div');
        const buy_crypto_onramp_detail_div = Array.from(node_list).find(node =>
            node.textContent.includes('Choose any of these exchanges to buy cryptocurrencies:')
        );
        fireEvent.click(buy_crypto_onramp_detail_div);

        expect(mockRootStore.modules.cashier.general_store.setDepositTarget).toHaveBeenCalledTimes(1);
        expect(mockRootStore.ui.openRealAccountSignup).toHaveBeenCalledTimes(1);
    });

    it('should trigger proper callbacks when the client chooses "Buy cryptocurrencies" section from his crypto account', () => {
        mockRootStore.client.accounts = { CR90000002: { is_virtual: 0, currency: 'BTC' } };

        renderCashierOnboarding();

        const node_list = screen.getAllByTestId('dt_cashier_onboarding_detail_div');
        const buy_crypto_onramp_detail_div = Array.from(node_list).find(node =>
            node.textContent.includes('Choose any of these exchanges to buy cryptocurrencies:')
        );
        fireEvent.click(buy_crypto_onramp_detail_div);

        expect(mockRootStore.modules.cashier.general_store.setDepositTarget).toHaveBeenCalledTimes(1);
        expect(mockRootStore.ui.openRealAccountSignup).toHaveBeenCalledTimes(1);
        expect(mockRootStore.ui.shouldNavigateAfterChooseCrypto).toHaveBeenCalledTimes(1);
    });

    it('should trigger proper callbacks when the client chooses "Deposit via payment agents" section', () => {
        mockRootStore.client.accounts = {
            CR90000001: { is_virtual: 0, currency: 'USD' },
            CR90000002: { is_virtual: 0, currency: 'BTC' },
        };

        renderCashierOnboarding();

        const node_list = screen.getAllByTestId('dt_cashier_onboarding_detail_div');
        const deposit_via_pa_detail_div = Array.from(node_list).find(node =>
            node.textContent.includes(
                'Deposit in your local currency via an authorised, independent payment agent in your country.'
            )
        );
        fireEvent.click(deposit_via_pa_detail_div);

        expect(mockRootStore.modules.cashier.general_store.setShouldShowAllAvailableCurrencies).toHaveBeenCalledTimes(
            1
        );
        expect(mockRootStore.modules.cashier.general_store.setDepositTarget).toHaveBeenCalledTimes(1);
        expect(mockRootStore.ui.openRealAccountSignup).toHaveBeenCalledTimes(1);
    });

    it('should trigger proper callbacks when the client chooses "Deposit with Deriv P2P" section from his fiat account', () => {
        mockRootStore.client.accounts = {
            CR90000001: { is_virtual: 0, currency: 'USD' },
            CR90000002: { is_virtual: 0, currency: 'BTC' },
        };

        renderCashierOnboardingWithRouter();

        const node_list = screen.getAllByTestId('dt_cashier_onboarding_detail_div');
        const deposit_with_dp2p_detail_div = Array.from(node_list).find(node =>
            node.textContent.includes(
                'Deposit in your local currency via peer-to-peer exchange with fellow traders in your country.'
            )
        );
        fireEvent.click(deposit_with_dp2p_detail_div);

        expect(mockRootStore.modules.cashier.general_store.setDepositTarget).toHaveBeenCalledTimes(1);
        expect(history.location.pathname).toBe(routes.cashier_p2p);
    });

    it('should trigger proper callbacks when the client chooses "Deposit with Deriv P2P" section from his crypto account, already having the fiat account', () => {
        mockRootStore.client.accounts = {
            CR90000001: { is_virtual: 0, currency: 'USD' },
            CR90000002: { is_virtual: 0, currency: 'BTC' },
        };
        mockRootStore.client.currency = 'BTC';

        renderCashierOnboarding();

        const node_list = screen.getAllByTestId('dt_cashier_onboarding_detail_div');
        const deposit_with_dp2p_detail_div = Array.from(node_list).find(node =>
            node.textContent.includes(
                'Deposit in your local currency via peer-to-peer exchange with fellow traders in your country.'
            )
        );
        fireEvent.click(deposit_with_dp2p_detail_div);

        expect(mockRootStore.modules.cashier.general_store.setDepositTarget).toHaveBeenCalledTimes(1);
        expect(mockRootStore.modules.cashier.account_prompt_dialog.shouldNavigateAfterPrompt).toHaveBeenCalledTimes(1);
    });

    it('should trigger proper callbacks when the client chooses "Deposit with Deriv P2P" section from his crypto account, not having the fiat account', () => {
        mockRootStore.client.accounts = { CR90000002: { is_virtual: 0, currency: 'BTC' } };
        mockRootStore.client.currency = 'BTC';

        renderCashierOnboarding();

        const node_list = screen.getAllByTestId('dt_cashier_onboarding_detail_div');
        const deposit_with_dp2p_detail_div = Array.from(node_list).find(node =>
            node.textContent.includes(
                'Deposit in your local currency via peer-to-peer exchange with fellow traders in your country.'
            )
        );
        fireEvent.click(deposit_with_dp2p_detail_div);

        expect(mockRootStore.modules.cashier.general_store.setDepositTarget).toHaveBeenCalledTimes(1);
        expect(mockRootStore.ui.openRealAccountSignup).toHaveBeenCalledTimes(1);
    });

    it('should show the "Learn more about payment methods" message in Mobile mode', () => {
        mockRootStore.client.accounts = { CR90000001: { is_virtual: 0, currency: 'USD' } };
        mockRootStore.ui.is_mobile = true;

        renderCashierOnboarding();

        expect(screen.getByText('Learn more about payment methods')).toBeInTheDocument();
    });

    it('should trigger onClick callback when the user clicks "Learn more about payment methods" message in Mobile mode', () => {
        mockRootStore.client.accounts = { CR90000001: { is_virtual: 0, currency: 'USD' } };
        mockRootStore.ui.is_mobile = true;
        window.open = jest.fn();

        renderCashierOnboarding();

        const link = screen.getByTestId('dt_cashier_onboarding_header_learn_more');
        fireEvent.click(link);

        expect(window.open).toHaveBeenCalledTimes(1);
    });

    it('should not show "Choose a way to fund your account" message if is_switching is true', () => {
        mockRootStore.client.is_switching = true;
        mockRootStore.client.accounts = { CR90000001: { is_virtual: 0, currency: 'USD' } };

        renderCashierOnboarding();

        expect(screen.queryByText('Choose a way to fund your account')).not.toBeInTheDocument();
    });

    it('should not show "Choose a way to fund your account" message if accounts_list is an empty array', () => {
        mockRootStore.client.accounts = [];

        renderCashierOnboarding();

        expect(screen.queryByText('Choose a way to fund your account')).not.toBeInTheDocument();
    });

    it('should not show "Choose a way to fund your account" message if is_landing_company_loaded is false', () => {
        mockRootStore.client.accounts = { CR90000001: { is_virtual: 0, currency: 'USD' } };
        mockRootStore.client.is_landing_company_loaded = false;

        renderCashierOnboarding();

        expect(screen.queryByText('Choose a way to fund your account')).not.toBeInTheDocument();
    });

    it('should redirect to "routes.trade" when the component will unmount', () => {
        mockRootStore.client.accounts = {
            CR90000001: { is_virtual: 0, currency: 'USD' },
            CR90000002: { is_virtual: 0, currency: 'BTC' },
        };
        mockRootStore.modules.cashier.general_store.has_set_currency = false;

        const { unmount } = renderCashierOnboardingWithRouter();
        unmount();

        expect(history.location.pathname).toBe(routes.trade);
        expect(mockRootStore.ui.toggleSetCurrencyModal).toHaveBeenCalledTimes(1);
    });
});
