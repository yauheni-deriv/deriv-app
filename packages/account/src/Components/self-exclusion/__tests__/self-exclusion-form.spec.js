import React from 'react';
import { render, screen } from '@testing-library/react';
import SelfExclusionContext from '../self-exclusion-context';
import SelfExclusionForm from '../self-exclusion-form';

jest.mock('../self-exclusion-confirm-page', () => () => <div>SelfExclusionConfirmPage</div>);
jest.mock('../self-exclusion-inputs', () => () => <div>SelfExclusionInputs</div>);

describe('<SelfExclusionForm />', () => {
    let mock_context = {};

    beforeEach(() => {
        mock_context = {
            state: {
                is_confirm_page: false,
                self_exclusions: {},
            },
            handleSubmit: jest.fn(),
            validateFields: jest.fn(),
        };
    });

    it('should render SelfExclusionForm component with SelfExclusionInputs', () => {
        render(
            <SelfExclusionContext.Provider value={mock_context}>
                <SelfExclusionForm />
            </SelfExclusionContext.Provider>
        );

        expect(screen.getByText('SelfExclusionInputs')).toBeInTheDocument();
        expect(screen.queryByText('SelfExclusionConfirmPage')).not.toBeInTheDocument();
    });

    it('should render SelfExclusionForm component with SelfExclusionConfirmPage', () => {
        mock_context.state.is_confirm_page = true;

        render(
            <SelfExclusionContext.Provider value={mock_context}>
                <SelfExclusionForm />
            </SelfExclusionContext.Provider>
        );

        expect(screen.getByText('SelfExclusionConfirmPage')).toBeInTheDocument();
        expect(screen.queryByText('SelfExclusionInputs')).not.toBeInTheDocument();
    });
});
