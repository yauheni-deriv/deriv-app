import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import { mockContractInfo, getCardLabels } from '@deriv/shared';
import TurbosCardBody from '../turbos-card-body';

const contract_info = mockContractInfo({
    contract_id: 1,
    bid_price: 1044.02,
    buy_price: 1044.0,
    profit: 50,
    barrier: '10904.80',
    entry_spot_display_value: '1046.80',
    sell_price: 1046.8,
});

describe('TurbosCardBody', () => {
    const mock_props = {
        addToast: jest.fn(),
        connectWithContractUpdate: jest.fn(),
        contract_info,
        contract_update: {
            take_profit: {
                display_name: 'Take profit',
                order_amount: 0,
                order_date: 1678948046,
            },
        },
        currency: 'USD',
        current_focus: null,
        error_message_alignment: 'left',
        getCardLabels: () => getCardLabels(),
        getContractById: jest.fn(),
        is_sold: false,
        onMouseLeave: jest.fn(),
        removeToast: jest.fn(),
        setCurrentFocus: jest.fn(),
        status: 'profit',
        progress_slider_mobile_el: false,
    };
    beforeAll(() => {
        (ReactDOM.createPortal as jest.Mock) = jest.fn(component => {
            return component;
        });
    });

    it('renders header and values correctly', () => {
        render(<TurbosCardBody {...mock_props} />);
        const buy_price_header = screen.getByText(getCardLabels().PURCHASE_PRICE);
        expect(buy_price_header).toBeInTheDocument();
        const buy_price_amount = screen.getByText('1,044.00');
        expect(buy_price_amount).toBeInTheDocument();

        const entry_spot_header = screen.getByText(getCardLabels().ENTRY_SPOT);
        expect(entry_spot_header).toBeInTheDocument();
        const entry_spot_amount = screen.getByText('1,046.80');
        expect(entry_spot_amount).toBeInTheDocument();

        const barrier_header = screen.getByText(getCardLabels().BARRIER);
        expect(barrier_header).toBeInTheDocument();
        const barrier_level = screen.getByText('10,904.80');
        expect(barrier_level).toBeInTheDocument();

        const take_profit_header = screen.getByText(getCardLabels().TAKE_PROFIT);
        expect(take_profit_header).toBeInTheDocument();
        const take_profit_amount = screen.getByText('-');
        expect(take_profit_amount).toBeInTheDocument();

        const total_profit_loss_header = screen.getByText(getCardLabels().TOTAL_PROFIT_LOSS);
        expect(total_profit_loss_header).toBeInTheDocument();
        const total_profit_loss_amount = screen.getByText('50.00');
        expect(total_profit_loss_amount).toBeInTheDocument();
    });
    it('should render Total profit/loss even if profit === 0', () => {
        const new_mocked_props = { ...mock_props };
        new_mocked_props.contract_info.profit = 0;
        render(<TurbosCardBody {...new_mocked_props} />);

        expect(screen.getByText(getCardLabels().TOTAL_PROFIT_LOSS)).toBeInTheDocument();
        expect(screen.getByText('0.00')).toBeInTheDocument();
    });
});
