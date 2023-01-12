import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CashierOnboardingSideNote from '../cashier-onboarding-side-note';
import { StoreProvider } from '@deriv/stores';

jest.mock('Stores/connect.js', () => ({
    __esModule: true,
    default: 'mockedDefaultExport',
    connect: () => Component => Component,
}));

describe('<CashierOnboardingSideNote />', () => {
    let mockRootStore;
    beforeEach(() => {
        mockRootStore = {
            client: {
                currency: 'USD',
            },
            ui: {
                openRealAccountSignup: jest.fn(),
            },
            modules: {
                cashier: {
                    general_store: {
                        setDepositTarget: jest.fn(),
                    },
                },
            },
        };
    });

    const props = () => ({
        is_crypto: false,
    });

    const renderCashierOnboardingSideNote = () =>
        render(<CashierOnboardingSideNote {...props} />, {
            wrapper: ({ children }) => <StoreProvider store={mockRootStore}>{children}</StoreProvider>,
        });

    it('should show the proper messages, with fiat currency and can_change_fiat_currency={false} property', () => {
        renderCashierOnboardingSideNote();

        expect(screen.getByText('Your fiat account currency is set to USD.')).toBeInTheDocument();
        expect(screen.getByTestId('dt_side_note_text')).toHaveTextContent(
            'If you want to change your account currency, please contact us via live chat.'
        );
    });

    it('should trigger onClick callback when the client clicks the "live chat" link', () => {
        window.LC_API = {
            open_chat_window: jest.fn(),
        };
        renderCashierOnboardingSideNote();

        const live_chat_link = screen.getByText('live chat');
        fireEvent.click(live_chat_link);
        expect(window.LC_API.open_chat_window).toHaveBeenCalledTimes(1);
    });

    it('should show the proper messages when is_crypto is true', () => {
        mockRootStore.client.currency = 'BTC';
        props.is_crypto = true;

        renderCashierOnboardingSideNote();

        expect(screen.getByText('This is your BTC account.')).toBeInTheDocument();
        expect(
            screen.getByText("Don't want to trade in BTC? You can open another cryptocurrency account.")
        ).toBeInTheDocument();
        expect(screen.getByText('Manage your accounts')).toBeInTheDocument();
    });

    it('should trigger onClick callbacks when the client clicks on "Manage your accounts" link', () => {
        mockRootStore.client.currency = 'BTC';
        props.is_crypto = true;

        renderCashierOnboardingSideNote();

        fireEvent.click(screen.getByTestId('dt_cashier_onboarding_side_note_link'));
        expect(mockRootStore.ui.openRealAccountSignup).toHaveBeenCalledTimes(1);
        expect(mockRootStore.modules.cashier.general_store.setDepositTarget).toHaveBeenCalledTimes(1);
    });
});
