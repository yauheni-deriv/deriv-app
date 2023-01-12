import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import PaymentAgentWithdrawConfirm from '../payment-agent-withdraw-confirm';
import { StoreProvider } from '@deriv/stores';

describe('<PaymentAgentWithdrawConfirm />', () => {
    let mockRootStore, verification_code;

    beforeAll(() => {
        ReactDOM.createPortal = jest.fn(component => {
            return component;
        });
    });

    afterAll(() => {
        ReactDOM.createPortal.mockClear();
    });

    beforeEach(() => {
        mockRootStore = {
            ui: { disableApp: jest.fn(), enableApp: jest.fn() },
            client: { loginid: 'CR90000100' },
            modules: {
                cashier: {
                    payment_agent: {
                        confirm: {
                            amount: 20,
                            currency: 'USD',
                            loginid: 'CR90000999',
                            payment_agent_name: 'Alicharger',
                        },
                        error: {},
                        requestPaymentAgentWithdraw: jest.fn(),
                        setIsTryWithdrawSuccessful: jest.fn(),
                    },
                },
            },
        };

        verification_code = 'ABCdef';
    });

    const renderPaymentAgentWithdrawConfirm = () => {
        return render(
            <StoreProvider store={mockRootStore}>
                <PaymentAgentWithdrawConfirm verification_code={verification_code} />
            </StoreProvider>
        );
    };

    it('should show proper messages and buttons', () => {
        renderPaymentAgentWithdrawConfirm();

        const [back_btn, transfer_now_btn] = screen.getAllByRole('button');

        expect(screen.getByTestId('dt_red_warning_icon')).toBeInTheDocument();
        expect(screen.getByText('Funds transfer information')).toBeInTheDocument();
        expect(screen.getByText('From account number')).toBeInTheDocument();
        expect(screen.getByText('CR90000100')).toBeInTheDocument();
        expect(screen.getByText('To account number')).toBeInTheDocument();
        expect(screen.getByText('CR90000999')).toBeInTheDocument();
        expect(screen.getByText('Alicharger')).toBeInTheDocument();
        expect(screen.getByText('Amount')).toBeInTheDocument();
        expect(screen.getByText('20.00 USD')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        expect(back_btn).toBeInTheDocument();
        expect(transfer_now_btn).toBeInTheDocument();
    });

    it('should show error messages and button', () => {
        mockRootStore.modules.cashier.payment_agent.error = {
            code: 'code',
            message: 'error_message',
        };

        renderPaymentAgentWithdrawConfirm();

        expect(screen.getByText('Cashier Error')).toBeInTheDocument();
        expect(screen.getByText('error_message')).toBeInTheDocument();
        expect(screen.getAllByRole('button')[2]).toBeInTheDocument();
    });

    it('should trigger setIsTryWithdrawSuccessful method when the client clicks on Back button', () => {
        renderPaymentAgentWithdrawConfirm();

        const [back_btn, _] = screen.getAllByRole('button');
        fireEvent.click(back_btn);

        expect(mockRootStore.modules.cashier.payment_agent.setIsTryWithdrawSuccessful).toHaveBeenCalledWith(false);
    });

    it('should enable Transfer now button when checkbox is checked', () => {
        renderPaymentAgentWithdrawConfirm();

        const el_checkbox = screen.getByRole('checkbox');
        const [_, transfer_now_btn] = screen.getAllByRole('button');
        fireEvent.click(el_checkbox);

        expect(transfer_now_btn).toBeEnabled();
    });

    it('should trigger requestPaymentAgentWithdraw method when the client clicks on Transfer now button', () => {
        renderPaymentAgentWithdrawConfirm();

        const el_checkbox = screen.getByRole('checkbox');
        const [_, transfer_now_btn] = screen.getAllByRole('button');
        fireEvent.click(el_checkbox);
        fireEvent.click(transfer_now_btn);

        const { loginid, currency, amount } = mockRootStore.modules.cashier.payment_agent.confirm;

        expect(mockRootStore.modules.cashier.payment_agent.requestPaymentAgentWithdraw).toHaveBeenCalledWith({
            loginid,
            currency,
            amount,
            verification_code,
        });
    });
});
