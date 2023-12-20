import React from 'react';
import { screen, render } from '@testing-library/react';
import { useStores } from 'Stores/index';
import MyProfile from '../my-profile';

let mock_store: DeepPartial<ReturnType<typeof useStores>>;

jest.mock('Stores', () => ({
    ...jest.requireActual('Stores'),
    useStores: jest.fn(() => mock_store),
}));

jest.mock('Components/verification', () => jest.fn(() => <div>Verification</div>));
jest.mock('../my-profile-content', () => jest.fn(() => <div>MyProfileContent</div>));
jest.mock('../my-profile-stats/my-profile-details-container', () =>
    jest.fn(() => <div>MyProfileDetailsContainer</div>)
);
jest.mock('../my-profile-header', () => jest.fn(() => <div>MyProfileHeader</div>));

describe('<MyProfile />', () => {
    beforeEach(() => {
        mock_store = {
            general_store: {
                advertiser_info: {
                    buy_completion_rate: 100,
                    buy_orders_amount: 1,
                    buy_orders_count: 1,
                    buy_time_avg: 80,
                    partner_count: 1,
                },
                is_advertiser: true,
                should_show_dp2p_blocked: false,
                setActiveIndex: jest.fn(),
            },
            my_profile_store: {
                error_message: '',
                getSettings: jest.fn(),
                setActiveTab: jest.fn(),
                setShouldShowAddPaymentMethodForm: jest.fn(),
            },
        };
    });

    it('should render MyProfile component', () => {
        render(<MyProfile />);

        expect(screen.getByText('MyProfileContent')).toBeInTheDocument();
        expect(screen.getByText('MyProfileDetailsContainer')).toBeInTheDocument();
        expect(screen.getByText('MyProfileHeader')).toBeInTheDocument();
    });

    it('should show error message if error_message has value', () => {
        mock_store.my_profile_store.error_message = 'test error';

        render(<MyProfile />);

        expect(screen.getByText('test error')).toBeInTheDocument();
    });

    it('should render loading component if advertiser info is empty and should_show_dp2p_blocked is false', () => {
        mock_store.my_profile_store.error_message = '';
        mock_store.general_store.advertiser_info = {};

        render(<MyProfile />);

        expect(screen.getByTestId('dt_initial_loader')).toBeInTheDocument();
    });

    it('should render Verification component if is_advertiser is false', () => {
        mock_store.general_store.is_advertiser = false;

        render(<MyProfile />);

        expect(screen.getByText('Verification')).toBeInTheDocument();
    });
});
