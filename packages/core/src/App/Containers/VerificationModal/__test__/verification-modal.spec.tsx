import React from 'react';
import VerificationModal from '../verification-modal';
import { render, screen } from '@testing-library/react';
import { isDesktop, isMobile } from '@deriv/shared';
import { StoreProvider, mockStore } from '@deriv/stores';
import userEvent from '@testing-library/user-event';

jest.mock('@deriv/shared', () => ({
    ...jest.requireActual('@deriv/shared'),
    isMobile: jest.fn(),
    isDesktop: jest.fn(),
}));

jest.mock('../verification-modal-content', () => jest.fn(() => <div>VerificationModalContent</div>));

describe('<VerificationDocumentSubmited />', () => {
    let modal_root_el: HTMLDivElement;
    const mock_store = mockStore({});

    const renderComponent = () => {
        render(
            <StoreProvider store={mock_store}>
                <VerificationModal />
            </StoreProvider>
        );
    };

    beforeAll(() => {
        modal_root_el = document.createElement('div');
        modal_root_el.setAttribute('id', 'modal_root');
        document.body.appendChild(modal_root_el);
    });

    afterAll(() => {
        document.body.removeChild(modal_root_el);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should not render the VerificationModal component', () => {
        mock_store.ui.is_verification_modal_visible = true;
        const title = 'Submit your proof of identity and address';
        renderComponent();
        expect(screen.queryByText(title)).not.toBeInTheDocument();
        expect(screen.queryByText('VerificationModalContent')).not.toBeInTheDocument();
    });

    it('should render the VerificationModal component', () => {
        (isDesktop as jest.Mock).mockReturnValue(true);
        mock_store.ui.is_verification_modal_visible = true;
        const title = 'Submit your proof of identity and address';
        renderComponent();
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText('VerificationModalContent')).toBeInTheDocument();
    });

    it('should setIsVerificationModalVisible to false', () => {
        (isDesktop as jest.Mock).mockReturnValue(true);
        mock_store.ui.is_verification_modal_visible = true;
        renderComponent();
        const close_button = screen.getByRole('button');
        expect(close_button).toBeInTheDocument();
        userEvent.click(close_button);
        expect(mock_store.ui.setIsVerificationModalVisible).toHaveBeenCalledWith(false);
    });

    it('should setIsVerificationModalVisible to be false in isMobile', () => {
        modal_root_el = document.createElement('div');
        modal_root_el.setAttribute('id', 'deriv_app');
        document.body.appendChild(modal_root_el);

        (isDesktop as jest.Mock).mockReturnValue(false);
        (isMobile as jest.Mock).mockReturnValue(true);
        mock_store.ui.is_verification_modal_visible = true;
        renderComponent();
        const close_button = screen.getByTestId('dt_dc_mobile_dialog_close_btn');
        expect(close_button).toBeInTheDocument();
        userEvent.click(close_button);
        expect(mock_store.ui.setIsVerificationModalVisible).toHaveBeenCalledWith(false);
    });
});
