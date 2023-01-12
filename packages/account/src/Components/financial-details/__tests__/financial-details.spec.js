import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { isDesktop, isMobile } from '@deriv/shared';
import FinancialDetails from '../financial-details';

jest.mock('@deriv/shared', () => ({
    ...jest.requireActual('@deriv/shared'),
    isDesktop: jest.fn(() => true),
    isMobile: jest.fn(() => false),
}));

const modal_root_el = document.createElement('div');
modal_root_el.setAttribute('id', 'modal_root');
document.body.appendChild(modal_root_el);

const fields_enums = {
    account_turnover_enum: [
        { value: 'account turnover 1', text: 'account turnover 1' },
        { value: 'account turnover 2', text: 'account turnover 2' },
    ],
    binary_options_trading_experience_enum: [
        { value: 'binary options trading experience 1', text: 'binary options trading experience 1' },
        { value: 'binary options trading experience 2', text: 'binary options trading experience 2' },
    ],
    binary_options_trading_frequency_enum: [
        { value: 'binary options trading frequency 1', text: 'binary options trading frequency 1' },
        { value: 'binary options trading frequency 2', text: 'binary options trading frequency 2' },
    ],
    cfd_trading_experience_enum: [
        { value: 'cfd trading experience 1', text: 'cfd trading experience 1' },
        { value: 'cfd trading experience 2', text: 'cfd trading experience 2' },
    ],
    cfd_trading_frequency_enum: [
        { value: 'cfd trading frequency 1', text: 'cfd trading frequency 1' },
        { value: 'cfd trading frequency 2', text: 'cfd trading frequency 2' },
    ],
    education_level_enum: [
        { value: 'education level 1', text: 'education level 1' },
        { value: 'education level 2', text: 'education level 2' },
    ],
    employment_industry_enum: [
        { value: 'employment industry 1', text: 'employment industry 1' },
        { value: 'employment industry 2', text: 'employment industry 2' },
    ],
    employment_status_enum: [
        { value: 'employment status 1', text: 'employment status 1' },
        { value: 'employment status 2', text: 'employment status 2' },
    ],
    estimated_worth_enum: [
        { value: 'estimated worth 1', text: 'estimated worth 1' },
        { value: 'estimated worth 2', text: 'estimated worth 2' },
    ],
    forex_trading_experience_enum: [
        { value: 'forex trading experience 1', text: 'forex trading experience 1' },
        { value: 'forex trading experience 2', text: 'forex trading experience 2' },
    ],
    forex_trading_frequency_enum: [
        { value: 'forex trading frequency 1', text: 'forex trading frequency 1' },
        { value: 'forex trading frequency 2', text: 'forex trading frequency 2' },
    ],
    income_source_enum: [
        { value: 'income source 1', text: 'income source 1' },
        { value: 'income source 2', text: 'income source 2' },
    ],
    net_income_enum: [
        { value: 'net income 1', text: 'net income 1' },
        { value: 'net income 2', text: 'net income 2' },
    ],
    occupation_enum: [
        { value: 'occupation 1', text: 'occupation 1' },
        { value: 'occupation 2', text: 'occupation 2' },
    ],
    other_instruments_trading_experience_enum: [
        { value: 'other instruments trading experience 1', text: 'other instruments trading experience 1' },
        { value: 'other instruments trading experience 2', text: 'other instruments trading experience 2' },
    ],
    other_instruments_trading_frequency_enum: [
        { value: 'other instruments trading frequency 1', text: 'other instruments trading frequency 1' },
        { value: 'other instruments trading frequency 2', text: 'other instruments trading frequency 2' },
    ],
    source_of_wealth_enum: [
        { value: 'source of wealth 1', text: 'source of wealth 1' },
        { value: 'source of wealth 2', text: 'source of wealth 2' },
    ],
};

describe('<FinancialDetails />', () => {
    let mock_props = {};

    beforeEach(() => {
        mock_props = {
            getCurrentStep: jest.fn(),
            goToNextStep: jest.fn(),
            onCancel: jest.fn(),
            onSave: jest.fn(),
            onSubmit: jest.fn(),
            validate: jest.fn(() => ({ errors: {} })),
            value: {},
            ...fields_enums,
        };
    });

    const fieldsRenderCheck = () => {
        expect(screen.getAllByText('(All fields are required)').length).toBe(2);
        expect(screen.getByText('Anticipated annual turnover')).toBeInTheDocument();
        expect(screen.getByText('Employment Status')).toBeInTheDocument();
        expect(screen.getByText('Estimated net worth')).toBeInTheDocument();
        expect(screen.getByText('Financial information')).toBeInTheDocument();
        expect(screen.getByText('Industry of employment')).toBeInTheDocument();
        expect(screen.getByText('Level of education')).toBeInTheDocument();
        expect(screen.getByText('Net annual income')).toBeInTheDocument();
        expect(screen.getByText('Occupation')).toBeInTheDocument();
        expect(screen.getByText('Source of income')).toBeInTheDocument();
        expect(screen.getByText('Source of wealth')).toBeInTheDocument();
        expect(screen.getByText("We're legally obliged to ask for your financial information.")).toBeInTheDocument();

        expect(screen.getByText('CFD trading experience')).toBeInTheDocument();
        expect(screen.getByText('CFD trading frequency')).toBeInTheDocument();
        expect(screen.getByText('Digital options trading experience')).toBeInTheDocument();
        expect(screen.getByText('Digital options trading frequency')).toBeInTheDocument();
        expect(screen.getByText('Experience with trading other financial instruments')).toBeInTheDocument();
        expect(screen.getByText('Forex trading experience')).toBeInTheDocument();
        expect(screen.getByText('Forex trading frequency')).toBeInTheDocument();
        expect(screen.getByText('Tell us about your trading experience.')).toBeInTheDocument();
        expect(screen.getByText('Trading experience')).toBeInTheDocument();
    };

    const fieldsNotRenderCheck = () => {
        expect(screen.queryByText('Employment Status')).not.toBeInTheDocument();
        expect(screen.queryByText('Financial information')).not.toBeInTheDocument();
        expect(screen.queryByText('Forex trading experience')).not.toBeInTheDocument();
        expect(screen.queryByText('Tell us about your trading experience.')).not.toBeInTheDocument();
        expect(screen.queryByText('Trading experience')).not.toBeInTheDocument();
        expect(
            screen.queryByText("We're legally obliged to ask for your financial information.")
        ).not.toBeInTheDocument();
    };

    it('should render "FinancialDetails" for desktop', () => {
        const { container } = render(<FinancialDetails {...mock_props} />);

        fieldsRenderCheck();

        const inputs = screen.getAllByTestId('dti_dropdown_display');
        expect(inputs.length).toBe(17);

        expect(container.querySelector('.dc-form-submit-button')).toBeInTheDocument();
        expect(container.querySelector('.dc-modal-footer')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText('Previous')).toBeInTheDocument();
    });

    it('should render "FinancialDetails" for mobile', () => {
        isDesktop.mockReturnValue(false);
        isMobile.mockReturnValue(true);

        const { container } = render(<FinancialDetails {...mock_props} />);

        fieldsRenderCheck();

        const inputs = screen.getAllByRole('combobox');
        expect(inputs.length).toBe(17);

        expect(container.querySelector('.dc-form-submit-button')).toBeInTheDocument();
        expect(container.querySelector('.dc-modal-footer')).not.toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText('Previous')).toBeInTheDocument();
    });

    it('should trigger "Previous" button', () => {
        render(<FinancialDetails {...mock_props} />);

        fieldsRenderCheck();

        const btns = screen.getAllByRole('button');
        expect(btns[0]).toHaveTextContent('Previous');

        fireEvent.click(btns[0]);
        expect(mock_props.getCurrentStep).toHaveBeenCalledTimes(1);
    });

    it('should trigger "Previous" or "Submit" button', async () => {
        isDesktop.mockReturnValue(false);
        isMobile.mockReturnValue(true);

        render(<FinancialDetails {...mock_props} />);

        fieldsRenderCheck();

        const select_inputs = screen.getAllByRole('combobox');

        const account_turnover_select = select_inputs.find(option => option.name === 'account_turnover');
        const binary_options_trading_experience_select = select_inputs.find(
            option => option.name === 'binary_options_trading_experience'
        );
        const binary_options_trading_frequency_select = select_inputs.find(
            option => option.name === 'binary_options_trading_frequency'
        );
        const cfd_trading_experience_select = select_inputs.find(option => option.name === 'cfd_trading_experience');
        const cfd_trading_frequency_select = select_inputs.find(option => option.name === 'cfd_trading_frequency');
        const education_level_select = select_inputs.find(option => option.name === 'education_level');
        const employment_indystry_select = select_inputs.find(option => option.name === 'employment_industry');
        const employment_status_select = select_inputs.find(option => option.name === 'employment_status');
        const estimated_worth_select = select_inputs.find(option => option.name === 'estimated_worth');
        const forex_trading_experience_select = select_inputs.find(
            option => option.name === 'forex_trading_experience'
        );
        const forex_trading_frequency_select = select_inputs.find(option => option.name === 'forex_trading_frequency');
        const income_source_select = select_inputs.find(option => option.name === 'income_source');
        const net_income_select = select_inputs.find(option => option.name === 'net_income');
        const occuppation_select = select_inputs.find(option => option.name === 'occupation');
        const other_instruments_trading_experience_select = select_inputs.find(
            option => option.name === 'other_instruments_trading_experience'
        );
        const other_instruments_trading_frequency_select = select_inputs.find(
            option => option.name === 'other_instruments_trading_frequency'
        );
        const source_of_wealth_select = select_inputs.find(option => option.name === 'source_of_wealth');

        fireEvent.change(account_turnover_select, { target: { value: 'account turnover 1' } });
        fireEvent.change(binary_options_trading_experience_select, {
            target: { value: 'binary options trading experience 2' },
        });
        fireEvent.change(binary_options_trading_frequency_select, {
            target: { value: 'binary options trading frequency 2' },
        });
        fireEvent.change(cfd_trading_experience_select, { target: { value: 'cfd trading experience 1' } });
        fireEvent.change(cfd_trading_frequency_select, { target: { value: 'cfd trading frequency 2' } });
        fireEvent.change(education_level_select, { target: { value: 'education level 2' } });
        fireEvent.change(employment_indystry_select, { target: { value: 'employment industry 1' } });
        fireEvent.change(employment_status_select, { target: { value: 'employment status 2' } });
        fireEvent.change(estimated_worth_select, { target: { value: 'estimated worth 2' } });
        fireEvent.change(forex_trading_experience_select, { target: { value: 'forex trading experience 2' } });
        fireEvent.change(forex_trading_frequency_select, { target: { value: 'forex trading frequency 1' } });
        fireEvent.change(income_source_select, { target: { value: 'income source 1' } });
        fireEvent.change(net_income_select, { target: { value: 'net income 1' } });
        fireEvent.change(occuppation_select, { target: { value: 'occupation 2' } });
        fireEvent.change(other_instruments_trading_experience_select, {
            target: { value: 'other instruments trading experience 1' },
        });
        fireEvent.change(other_instruments_trading_frequency_select, {
            target: { value: 'other instruments trading frequency 2' },
        });
        fireEvent.change(source_of_wealth_select, { target: { value: 'source of wealth 1' } });

        const btns = screen.getAllByRole('button');
        expect(btns[1]).toHaveTextContent('Next');

        fireEvent.click(btns[1]);
        await waitFor(() => {
            expect(mock_props.onSubmit).toHaveBeenCalledTimes(1);
        });
    });
});
