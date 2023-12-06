import React from 'react';
import { useLocation } from 'react-router-dom';
import { StoreProvider, mockStore } from '@deriv/stores';
import { render, screen } from '@testing-library/react';
import Header from '../header';

jest.mock('@deriv/hooks', () => ({
    ...jest.requireActual('react-router-dom'),
    useFeatureFlags: jest.fn(() => ({ is_next_wallet_enabled: false })),
    useStoreWalletAccountsList: jest.fn(() => ({ data: [], has_wallet: false })),
}));
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn().mockReturnValue({ pathname: '' }),
}));
// eslint-disable-next-line react/display-name
jest.mock('../default-header.jsx', () => () => <div data-testid='dt_default_header'>MockedDefaultHeader</div>);
// eslint-disable-next-line react/display-name
jest.mock('../dtrader-header.jsx', () => () => <div data-testid='dt_dtrader_header'>MockedDTraderHeader</div>);
// eslint-disable-next-line react/display-name
jest.mock('../traders-hub-header', () => () => <div data-testid='dt_traders_hub_header'>MockedTradersHubHeader</div>);

describe('Header', () => {
    const store = mockStore({
        client: { is_logged_in: true },
    });
    const renderComponent = (modified_store = store) =>
        render(
            <StoreProvider store={modified_store}>
                <Header />
            </StoreProvider>
        );

    it('should render the "TradersHubHeader" component if user is logged in and in traders hub route', () => {
        (useLocation as jest.Mock).mockReturnValue({
            pathname: '/appstore/traders-hub',
        });
        renderComponent();
        expect(screen.getByTestId('dt_traders_hub_header')).toBeInTheDocument();
        expect(screen.getByText('MockedTradersHubHeader')).toBeInTheDocument();
    });

    it('should render the "DTraderHeader" component if user is logged in and not in the traders hub route', () => {
        (useLocation as jest.Mock).mockReturnValue({
            pathname: '/',
        });
        renderComponent();
        expect(screen.getByTestId('dt_dtrader_header')).toBeInTheDocument();
        expect(screen.getByText('MockedDTraderHeader')).toBeInTheDocument();
    });

    it('should render the "DefaultHeader" component if user is not logged in', () => {
        renderComponent(mockStore({ client: { is_logged_in: false } }));
        expect(screen.getByTestId('dt_default_header')).toBeInTheDocument();
        expect(screen.getByText('MockedDefaultHeader')).toBeInTheDocument();
    });
});
