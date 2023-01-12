import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CFDTopUpDemoModal from '../cfd-top-up-demo-modal.tsx';

jest.mock('Stores/connect.js', () => ({
    __esModule: true,
    default: 'mockedDefaultExport',
    connect: () => Component => Component,
}));

jest.mock('../../Components/success-dialog.jsx', () => () => <div>Success Dialog</div>);

describe('CFDTopUpDemoModal', () => {
    let modal_root_el;

    beforeAll(() => {
        modal_root_el = document.createElement('div');
        modal_root_el.setAttribute('id', 'modal_root');
        document.body.appendChild(modal_root_el);
    });
    afterAll(() => {
        document.body.removeChild(modal_root_el);
    });

    const synthetic_config = {
        account_type: 'synthetic',
        leverage: 500,
        short_title: 'Derived',
    };

    const financial_config = {
        account_type: 'financial',
        leverage: 1000,
        short_title: 'Financial',
    };

    const mock_props = {
        dxtrade_companies: {},
        mt5_companies: {
            demo: {
                synthetic: {
                    mt5_account_type: synthetic_config.account_type,
                    leverage: synthetic_config.leverage,
                    title: 'Demo Derived',
                    short_title: synthetic_config.short_title,
                },
                financial: {
                    mt5_account_type: financial_config.account_type,
                    leverage: financial_config.leverage,
                    title: 'Demo Financial',
                    short_title: financial_config.short_title,
                },
            },
            real: {
                synthetic: {
                    mt5_account_type: synthetic_config.account_type,
                    leverage: synthetic_config.leverage,
                    title: 'Derived',
                    short_title: synthetic_config.short_title,
                },
                financial: {
                    mt5_account_type: financial_config.account_type,
                    leverage: financial_config.leverage,
                    title: 'CFDs',
                    short_title: financial_config.short_title,
                },
            },
        },
        current_account: { category: 'demo', type: 'financial', balance: '700', display_balance: '700' },
        closeSuccessTopUpModal: jest.fn(),
        closeTopUpModal: jest.fn(),
        is_top_up_virtual_open: true,
        is_top_up_virtual_in_progress: false,
        is_top_up_virtual_success: false,
        platform: 'test platform',
        topUpVirtual: jest.fn(),
    };
    it('should render the button texts correctly', () => {
        render(<CFDTopUpDemoModal {...mock_props} />);
        expect(screen.getByText('Fund top up')).toBeInTheDocument();
        expect(screen.getByText('Current balance')).toBeInTheDocument();
        expect(screen.getByText('Demo Financial account')).toBeInTheDocument();
        expect(screen.queryByTestId('dt_top_up_virtual_description')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Top up/i })).toBeInTheDocument();
    });

    it('should render the proper balance in the current balance', () => {
        render(<CFDTopUpDemoModal {...mock_props} />);
        expect(screen.getByText('700.00')).toBeInTheDocument();
    });

    it('should disable the top up button if the balance is higher than 1000 USD', () => {
        render(
            <CFDTopUpDemoModal
                {...mock_props}
                current_account={{ category: 'demo', type: 'financial', balance: 2000 }}
            />
        );
        const top_up_btn = screen.getByRole('button', { name: /Top up/i });
        expect(top_up_btn).toBeDisabled();
    });

    it('should enable the top up button if the balance is lower than 1000 USD', () => {
        render(
            <CFDTopUpDemoModal
                {...mock_props}
                current_account={{ category: 'demo', type: 'financial', balance: 500 }}
            />
        );
        const top_up_btn = screen.getByRole('button', { name: /Top up/i });
        expect(top_up_btn).toBeEnabled();
    });

    it('should render the success dialog component if the user has less than 1000 USD and clicks on top up', () => {
        render(
            <CFDTopUpDemoModal
                {...mock_props}
                current_account={{ category: 'demo', type: 'financial', balance: 500 }}
            />
        );
        const top_up_btn = screen.getByRole('button', { name: /Top up/i });
        fireEvent.click(top_up_btn);
        expect(screen.getByText('Success Dialog')).toBeInTheDocument();
    });

    it('should render the success component if the is_top_up_virtual_success is true', () => {
        render(
            <CFDTopUpDemoModal
                {...mock_props}
                current_account={{ category: 'demo', type: 'financial', balance: 500 }}
                is_top_up_virtual_success={true}
                is_top_up_virtual_open={false}
            />
        );
        expect(screen.getByText('Success Dialog')).toBeInTheDocument();
        expect(screen.queryByTestId('dt_top_up_virtual_description')).not.toBeInTheDocument();
    });

    it('should not render the component if conditions are false', () => {
        render(
            <CFDTopUpDemoModal
                {...mock_props}
                current_account={{ category: 'demo', type: 'financial', balance: 500 }}
                is_top_up_virtual_success={false}
                is_top_up_virtual_open={false}
            />
        );
        expect(screen.queryByTestId('dt_top_up_virtual_description')).not.toBeInTheDocument();
    });
});
