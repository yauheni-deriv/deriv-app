import React from 'react';
import { render, screen } from '@testing-library/react';
import { useStores } from 'Stores';
import AppContent from '../app-content.jsx';

jest.mock('Stores', () => ({
    ...jest.requireActual('Stores'),
    useStores: jest.fn(),
}));

jest.mock('@deriv/components', () => ({
    ...jest.requireActual('@deriv/components'),
    Tabs: jest.fn(({ children }) => (
        <div>
            Tabs<div>{children}</div>
        </div>
    )),
    Loading: () => <div>Loading</div>,
}));

jest.mock('Components/dp2p-blocked', () => jest.fn(() => 'Dp2pBlocked'));
jest.mock('Components/nickname-form', () => jest.fn(() => 'NicknameForm'));
jest.mock('Components/verification/verification', () => jest.fn(() => 'Verification'));
jest.mock('Components/my-ads/my-ads', () => jest.fn(() => 'MyAds'));
jest.mock('Components/orders/orders', () => jest.fn(() => 'Orders'));
jest.mock('Components/buy-sell/buy-sell', () => jest.fn(() => 'BuySell'));
jest.mock('Components/my-profile', () => jest.fn(() => 'MyProfile'));

describe('<AppContent/>', () => {
    const mocked_store_values = {
        is_loading: false,
        should_show_dp2p_blocked: false,
        should_show_popup: false,
        props: { should_show_verification: false },
        is_advertiser: false,
    };

    it('should load the Tab component when no error status are set', () => {
        useStores.mockImplementation(() => ({
            general_store: mocked_store_values,
        }));
        render(<AppContent />);

        expect(screen.getByText('Tabs')).toBeInTheDocument();
        expect(screen.queryByTestId('my_profile')).not.toBeInTheDocument();
    });

    it('should render the loading component when is_loading state is true', () => {
        useStores.mockImplementation(() => ({
            general_store: { ...mocked_store_values, is_loading: true },
        }));
        render(<AppContent />);

        expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    it('should render the DP2P blocked component when should_show_dp2p_blocked state is true', () => {
        useStores.mockImplementation(() => ({
            general_store: { ...mocked_store_values, should_show_dp2p_blocked: true },
        }));
        render(<AppContent />);

        expect(screen.getByText('Dp2pBlocked')).toBeInTheDocument();
    });

    it('should render the nick-name form component when should_show_popup state is true', () => {
        useStores.mockImplementation(() => ({
            general_store: { ...mocked_store_values, should_show_popup: true },
        }));
        render(<AppContent />);

        expect(screen.getByText('NicknameForm')).toBeInTheDocument();
    });

    it('should render verification component when should_show_verification state is true', () => {
        useStores.mockImplementation(() => ({
            general_store: { ...mocked_store_values, props: { should_show_verification: true } },
        }));
        render(<AppContent />);

        expect(screen.getByText('Verification')).toBeInTheDocument();
    });

    it('should render only the first notification component when multiple error status is set', () => {
        useStores.mockImplementation(() => ({
            general_store: { ...mocked_store_values, should_show_popup: true, should_show_dp2p_blocked: true },
        }));
        render(<AppContent />);

        expect(screen.queryByText('NicknameForm')).not.toBeInTheDocument();
        expect(screen.getByText('Dp2pBlocked')).toBeInTheDocument();
    });

    it('should render MyProfile component when is_advertiser state is true', () => {
        useStores.mockImplementation(() => ({
            general_store: { ...mocked_store_values, is_advertiser: true },
        }));
        render(<AppContent />);

        expect(screen.getByTestId('my_profile')).toBeInTheDocument();
    });
});
