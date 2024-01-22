import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PasskeysFooterButtons from '../passkeys-footer-buttons';

describe('PasskeysFooterButtons', () => {
    const next = 'Next';
    const back = 'Back';

    it('calls the correct functions when the buttons are clicked', () => {
        const mockOnButtonClick = jest.fn();
        const mockOnBackButtonClick = jest.fn();

        render(
            <PasskeysFooterButtons
                button_text={<span>{next}</span>}
                onButtonClick={mockOnButtonClick}
                back_button_text={<span>{back}</span>}
                onBackButtonClick={mockOnBackButtonClick}
            />
        );

        userEvent.click(screen.getByRole('button', { name: next }));
        expect(mockOnButtonClick).toHaveBeenCalled();

        userEvent.click(screen.getByRole('button', { name: back }));
        expect(mockOnBackButtonClick).toHaveBeenCalled();
    });

    it('does not render the back button if back_button_text is not provided', () => {
        const mockOnButtonClick = jest.fn();

        render(<PasskeysFooterButtons button_text={<span>{next}</span>} onButtonClick={mockOnButtonClick} />);

        expect(screen.queryByText(back)).not.toBeInTheDocument();
    });
});
