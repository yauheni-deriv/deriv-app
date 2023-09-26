import React, { useEffect, useMemo } from 'react';
import { APIProvider } from '@deriv/api';
import { ExchangeRatesProvider } from './providers';
import StoreContext from './storeContext';
import { ExchangeRatesStore, FeatureFlagsStore } from './stores';
import type { TCoreStores, TStores } from '../types';

const StoreProvider = ({ children, store }: React.PropsWithChildren<{ store: TCoreStores }>) => {
    const memoizedValue: TStores = useMemo(() => {
        // If the store is mocked for testing purposes, then return the mocked value.
        if ('is_mock' in store && store.is_mock) return store as unknown as TStores;

        // Otherwise, instantiate store and return it.
        return {
            ...store,
            exchange_rates: new ExchangeRatesStore(),
            feature_flags: new FeatureFlagsStore(),
        };
    }, [store]);

    useEffect(() => {
        return () => {
            Object.values(memoizedValue).forEach(value => {
                if (typeof value === 'object' && 'unmount' in value) value.unmount();
            });
        };
    }, [memoizedValue]);

    return (
        <APIProvider>
            <StoreContext.Provider value={memoizedValue}>
                <ExchangeRatesProvider>{children}</ExchangeRatesProvider>
            </StoreContext.Provider>
        </APIProvider>
    );
};

export default StoreProvider;
