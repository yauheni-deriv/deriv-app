import OnRampStore from '../on-ramp-store';
import OnrampProviders from 'Config/on-ramp-providers';
import { configure } from 'mobx';

configure({ safeDescriptors: false });

let changelly_provider, onramp_store, onramp_providers, root_store, WS;

beforeEach(() => {
    root_store = {
        client: {
            is_virtual: false,
            currency: 'BTC',
        },
    };
    WS = {
        authorized: {
            cashier: jest.fn().mockResolvedValueOnce({
                cashier: { deposit: { address: 'deposit address' } },
            }),
        },
    };
    onramp_store = new OnRampStore({ WS, root_store });
    onramp_providers = [
        OnrampProviders.createChangellyProvider(onramp_store),
        OnrampProviders.createXanPoolProvider(onramp_store),
        OnrampProviders.createBanxaProvider(onramp_store),
    ];
    changelly_provider = OnrampProviders.createChangellyProvider(onramp_store);
});

jest.mock('@deriv/shared', () => ({
    ...jest.requireActual('@deriv/shared'),
    websiteUrl: () => 'https://app.deriv.com/',
}));

describe('OnRampStore', () => {
    it('onramp tab should not be visible for virtual account', () => {
        onramp_store.root_store.client.is_virtual = true;

        expect(onramp_store.is_onramp_tab_visible).toBeFalsy();
    });

    it('onramp tab should not be visible if the client currency is not cryptocurrency', () => {
        onramp_store.root_store.client.currency = 'USD';

        expect(onramp_store.is_onramp_tab_visible).toBeFalsy();
    });

    it('onramp tab should not be visible if there is no onramp providers', () => {
        expect(onramp_store.is_onramp_tab_visible).toBeFalsy();
    });

    it('onramp tab should be visible if there is at least one onramp provider', () => {
        onramp_store.setOnrampProviders(onramp_providers);
        expect(onramp_store.is_onramp_tab_visible).toBeTruthy();
    });

    it('should return only one provider for USD currency', () => {
        onramp_store.setOnrampProviders(onramp_providers);
        onramp_store.root_store.client.currency = 'USD';

        expect(onramp_store.filtered_onramp_providers.length).toBe(1);
    });

    it('should return three providers for BTC cryptocurrency', () => {
        onramp_store.setOnrampProviders(onramp_providers);

        expect(onramp_store.filtered_onramp_providers.length).toBe(3);
    });

    it('should return proper onramp popup modal title if should_show_widget = true', () => {
        onramp_store.setShouldShowWidget(true);

        expect(onramp_store.onramp_popup_modal_title).toBe('Payment channel');
    });

    it('should return proper onramp popup modal title if should_show_widget = false and there is selected provider with should_show_dialog = true', () => {
        onramp_store.setSelectedProvider(changelly_provider);
        onramp_store.setApiError('API Error');

        expect(onramp_store.onramp_popup_modal_title).toBe('Our server cannot retrieve an address.');
    });

    it('should return empty string to render header + close icon if should_show_widget = false and there is selected provider with should_show_dialog = false', () => {
        onramp_store.setSelectedProvider(changelly_provider);
        onramp_store.setApiError('');

        expect(onramp_store.onramp_popup_modal_title).toBe(' ');
    });

    it('should return undefined if should_show_widget = false and there is no selected provider', () => {
        expect(onramp_store.onramp_popup_modal_title).toBe(undefined);
    });

    it('should have returned from onMountOnramp method if there is no selected_provider', () => {
        const spyOnMountOnramp = jest.spyOn(onramp_store, 'onMountOnramp');
        onramp_store.onMountOnramp();
        changelly_provider.getScriptDependencies = jest.fn().mockReturnValueOnce(['dependecy']);
        onramp_store.setSelectedProvider(changelly_provider);
        onramp_store.setSelectedProvider();

        expect(spyOnMountOnramp).toHaveReturned();
    });

    it('should have returned from onMountOnramp method if there is an empty array without dependencies', async () => {
        const spyOnMountOnramp = jest.spyOn(onramp_store, 'onMountOnramp');
        onramp_store.onMountOnramp();
        changelly_provider.getScriptDependencies = jest.fn().mockReturnValueOnce([]);
        onramp_store.setSelectedProvider(changelly_provider);

        expect(spyOnMountOnramp).toHaveReturned();
    });

    it('should set widget html if it is defined when disposeGetWidgetHtmlReaction reaction is running', async () => {
        const spySetWidgetHtml = jest.spyOn(onramp_store, 'setWidgetHtml');
        onramp_store.setSelectedProvider(changelly_provider);
        changelly_provider.getWidgetHtml = jest.fn().mockResolvedValueOnce('widget');
        onramp_store.onMountOnramp();
        onramp_store.setShouldShowWidget(true);

        expect(await spySetWidgetHtml).toHaveBeenCalledWith('widget');
    });

    // it('should set should_show_widget into false if html widget is not defined when disposeGetWidgetHtmlReaction reaction is running', async () => {
    //     const spySetShouldShowWidget = jest.spyOn(onramp_store, 'setShouldShowWidget');
    //     onramp_store.setSelectedProvider(changelly_provider);
    //     changelly_provider.getWidgetHtml = jest.fn().mockResolvedValueOnce('');
    //     onramp_store.onMountOnramp();
    //     onramp_store.setShouldShowWidget(true);

    //     await waitFor(() => {
    //         expect(spySetShouldShowWidget).toHaveBeenCalledWith(false);
    //     });
    // });

    // it('should set widget error if there is an error when requesting widget when disposeGetWidgetHtmlReaction reaction is running', async () => {
    //     const spySetWidgetError = jest.spyOn(onramp_store, 'setWidgetError');
    //     onramp_store.setSelectedProvider(changelly_provider);
    //     changelly_provider.getWidgetHtml = jest.fn().mockRejectedValueOnce('Request error');
    //     onramp_store.onMountOnramp();
    //     onramp_store.setShouldShowWidget(true);

    //     await waitFor(() => {
    //         expect(spySetWidgetError).toHaveBeenCalledWith('Request error');
    //     });
    // });

    it('should not call setIsRequestingWidgetHtml method if is_requesting_widget_html already equal to true when disposeGetWidgetHtmlReaction reaction is running', () => {
        const spySetIsRequestingWidgetHtml = jest.spyOn(onramp_store, 'setIsRequestingWidgetHtml');
        onramp_store.is_requesting_widget_html = true;
        onramp_store.setSelectedProvider(changelly_provider);
        onramp_store.onMountOnramp();
        onramp_store.setShouldShowWidget(true);

        expect(spySetIsRequestingWidgetHtml).not.toHaveBeenCalled();
    });

    it('should call disposeThirdPartyJsReaction and disposeGetWidgetHtmlReaction reactions when unmount onramp', () => {
        onramp_store.onMountOnramp();
        const spyDisposeThirdPartyJsReaction = jest.spyOn(onramp_store, 'disposeThirdPartyJsReaction');
        const spyDisposeGetWidgetHtmlReaction = jest.spyOn(onramp_store, 'disposeGetWidgetHtmlReaction');
        onramp_store.onUnmountOnramp();

        expect(spyDisposeThirdPartyJsReaction).toBeCalledTimes(1);
        expect(spyDisposeGetWidgetHtmlReaction).toBeCalledTimes(1);
    });

    it('should show widget when onClickDisclaimerContinue method was called', () => {
        onramp_store.onClickDisclaimerContinue();

        expect(onramp_store.should_show_widget).toBeTruthy();
    });

    it('should go to deposit page when onClickGoToDepositPage method was called', () => {
        window.open = jest.fn();
        onramp_store.onClickGoToDepositPage();

        expect(window.open).toHaveBeenCalledWith('https://app.deriv.com/cashier/deposit');

        jest.restoreAllMocks();
    });

    it('should set api error and clear deposit address interval if there is an error in response when pollApiForDepositAddress method was called', async () => {
        jest.useFakeTimers();
        const spySetApiError = jest.spyOn(onramp_store, 'setApiError');
        onramp_store.WS.authorized.cashier = jest.fn().mockResolvedValueOnce({ error: 'API error' });
        onramp_store.pollApiForDepositAddress(false);

        expect(await spySetApiError).toHaveBeenLastCalledWith('API error');
        expect(clearInterval).toHaveBeenCalledTimes(1);

        jest.useRealTimers();
    });

    it('should set empty deposit address when pollApiForDepositAddress method was called with should_allow_empty_address = true', async () => {
        jest.useFakeTimers();
        const spySetDepositAddress = jest.spyOn(onramp_store, 'setDepositAddress');
        onramp_store.WS.authorized.cashier = jest.fn().mockResolvedValueOnce({ cashier: { deposit: { address: '' } } });
        onramp_store.pollApiForDepositAddress(true);

        expect(await spySetDepositAddress).toHaveBeenCalledWith('');
        expect(clearInterval).toHaveBeenCalledTimes(1);

        jest.useRealTimers();
    });

    it('should set deposit address when pollApiForDepositAddress method was called with should_allow_empty_address = false', async () => {
        jest.useFakeTimers();
        const spySetDepositAddress = jest.spyOn(onramp_store, 'setDepositAddress');
        onramp_store.pollApiForDepositAddress(false);

        expect(await spySetDepositAddress).toHaveBeenCalledWith('deposit address');
        expect(clearInterval).toHaveBeenCalledTimes(1);

        jest.useRealTimers();
    });

    it('should set deposit address interval to 3 seconds when pollApiForDepositAddress method was called', async () => {
        jest.useFakeTimers();
        onramp_store.pollApiForDepositAddress(false);
        jest.runOnlyPendingTimers();

        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 3000);

        jest.useRealTimers();
    });

    it('should clear interval after 30 seconds if there is an empty deposit address in response when pollApiForDepositAddress method was called with should_allow_empty_address = false', async () => {
        jest.useFakeTimers();
        onramp_store.pollApiForDepositAddress(false);
        jest.runOnlyPendingTimers();

        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 30000);

        jest.useRealTimers();
    });

    it('should set deposit address loading when pollApiForDepositAddress method was called', async () => {
        const spySetIsDepositAddressLoading = jest.spyOn(onramp_store, 'setIsDepositAddressLoading');
        onramp_store.pollApiForDepositAddress(false);

        expect(await spySetIsDepositAddressLoading.mock.calls).toEqual([[true], [false]]);
    });

    it('should reset popup', () => {
        onramp_store.resetPopup();

        expect(onramp_store.api_error).toBeNull();
        expect(onramp_store.deposit_address).toBeNull();
        expect(onramp_store.is_deposit_address_loading).toBeTruthy();
        expect(onramp_store.selected_provider).toBeNull();
        expect(onramp_store.should_show_widget).toBeFalsy();
        expect(onramp_store.widget_error).toBeNull();
        expect(onramp_store.widget_html).toBeNull();
    });

    it('should set api error', () => {
        onramp_store.setApiError('API error');

        expect(onramp_store.api_error).toBe('API error');
    });

    it('should set copy icon ref', () => {
        onramp_store.setCopyIconRef('icon ref');

        expect(onramp_store.copy_icon_ref).toBe('icon ref');
    });

    it('should set deposit address', () => {
        onramp_store.setDepositAddress('deposit address');

        expect(onramp_store.deposit_address).toBe('deposit address');
    });

    it('should change value of the variable is_deposit_address_loading', () => {
        onramp_store.setIsDepositAddressLoading(true);

        expect(onramp_store.is_deposit_address_loading).toBeTruthy();
    });

    it('should change value of the variable is_onramp_modal_open', () => {
        onramp_store.setIsOnRampModalOpen(true);

        expect(onramp_store.is_onramp_modal_open).toBeTruthy();
    });

    it('should change value of the variable is_requesting_widget_html', () => {
        onramp_store.setIsRequestingWidgetHtml(true);

        expect(onramp_store.is_requesting_widget_html).toBeTruthy();
    });

    it('should set selected provider', () => {
        const spyPollApiForDepositAddress = jest.spyOn(onramp_store, 'pollApiForDepositAddress');
        onramp_store.setSelectedProvider('provider');

        expect(onramp_store.selected_provider).toBe('provider');
        expect(onramp_store.is_onramp_modal_open).toBeTruthy();
        expect(spyPollApiForDepositAddress).toHaveBeenCalledWith(true);
    });

    it('should set selected provider to null if there is no provider', () => {
        onramp_store.setSelectedProvider();

        expect(onramp_store.selected_provider).toBeNull();
        expect(onramp_store.is_onramp_modal_open).toBeFalsy();
    });

    it('should change value of the variable should_show_widget', () => {
        onramp_store.setShouldShowWidget(true);

        expect(onramp_store.should_show_widget).toBeTruthy();
    });

    it('should set onramp providers', () => {
        onramp_store.setOnrampProviders(onramp_providers);

        expect(onramp_store.onramp_providers).toEqual(onramp_providers);
    });

    it('should set widget error', () => {
        onramp_store.setWidgetError('Widget error');

        expect(onramp_store.widget_error).toBe('Widget error');
    });

    it('should set widget html', () => {
        onramp_store.setWidgetHtml('Widget html');

        expect(onramp_store.widget_html).toBe('Widget html');
    });
});
