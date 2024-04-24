import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useWalletAccountsList } from '@deriv/api-v2';
import { Loader } from '../components/Loader';

const LazyWalletsNotFoundState = lazy(
    () =>
        import(
            /* webpackChunkName: "wallets-not-found-route" */ '../components/WalletNoWalletFoundState/WalletNoWalletFoundState'
        )
);

const LazyWalletsListingRoute = lazy(
    () => import(/* webpackChunkName: "wallets-listing-route" */ './WalletsListingRoute/WalletsListingRoute')
);
const LazyCashierModalRoute = lazy(
    () => import(/* webpackChunkName: "cashier-modal-route" */ './CashierModalRoute/CashierModalRoute')
);

const LazyCompareAccountsRoute = lazy(
    () => import(/* webpackChunkName: "compare-accounts-route" */ './CompareAccountsRoute/CompareAccountsRoute')
);

const walletsPrefix = '/wallets';

type TWalletsRoute =
    | ''
    | '/cashier'
    | '/cashier/deposit'
    | '/cashier/on-ramp'
    | '/cashier/reset-balance'
    | '/cashier/transactions'
    | '/cashier/transfer'
    | '/cashier/withdraw'
    | '/compare-accounts';

export type TRoute = '/endpoint' | `?${string}` | `${typeof walletsPrefix}${TWalletsRoute}`;

// wallets routes which have their states
interface WalletsRouteState {
    '/cashier/transactions': { showPending: boolean; transactionType: 'deposit' | 'withdrawal' };
    '/cashier/transfer': { shouldSelectDefaultWallet: boolean; toAccountLoginId: string };
}

type TStatefulRoute = TRoute & `${typeof walletsPrefix}${keyof WalletsRouteState}`;

type TRouteState = {
    [T in TStatefulRoute]: T extends `${typeof walletsPrefix}${infer R extends keyof WalletsRouteState}`
        ? Partial<WalletsRouteState[R]>
        : never;
};

type TLocationInfo = {
    [T in TRoute]: {
        pathname: T;
        state?: T extends TStatefulRoute ? TRouteState[T] : never;
    };
}[TRoute];

declare module 'react-router-dom' {
    export function useHistory(): {
        location: TLocationInfo & {
            hash: string;
            search: string;
        };
        push: <T extends TRoute>(path: T, ...state: T extends TStatefulRoute ? [TRouteState[T]?] : []) => void;
    };

    export function useRouteMatch(path: TRoute): boolean;
}

const Router: React.FC = () => {
    const { data: walletAccounts, isLoading } = useWalletAccountsList();

    if ((!walletAccounts || !walletAccounts.length) && !isLoading)
        return (
            <Route
                path={walletsPrefix}
                render={() => (
                    <React.Suspense fallback={<Loader />}>
                        <LazyWalletsNotFoundState />
                    </React.Suspense>
                )}
            />
        );

    return (
        <Switch>
            <Route
                path={`${walletsPrefix}/compare-accounts`}
                render={() => (
                    <React.Suspense fallback={<Loader />}>
                        <LazyCompareAccountsRoute />
                    </React.Suspense>
                )}
            />
            <Route
                path={`${walletsPrefix}/cashier`}
                render={() => (
                    <React.Suspense fallback={<Loader />}>
                        <LazyCashierModalRoute />
                    </React.Suspense>
                )}
            />
            <Route
                path={walletsPrefix}
                render={() => (
                    <React.Suspense fallback={<Loader />}>
                        <LazyWalletsListingRoute />
                    </React.Suspense>
                )}
            />
        </Switch>
    );
};

export default Router;
