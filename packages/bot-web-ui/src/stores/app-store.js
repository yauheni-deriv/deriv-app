import { action, reaction, makeObservable } from 'mobx';
import { isEuResidenceWithOnlyVRTC, showDigitalOptionsUnavailableError } from '@deriv/shared';
import { localize } from '@deriv/translations';
import { runIrreversibleEvents, ApiHelpers, DBot } from '@deriv/bot-skeleton';

export default class AppStore {
    constructor(root_store) {
        makeObservable(this, {
            onMount: action.bound,
            onUnmount: action.bound,
        });

        this.root_store = root_store;
        this.dbot_store = null;
        this.api_helpers_store = null;
    }

    onMount() {
        const { blockly_store, core, main_content } = this.root_store;
        const { client, common, ui } = core;
        this.showDigitalOptionsMaltainvestError(client, common);

        blockly_store.startLoading();
        DBot.initWorkspace(__webpack_public_path__, this.dbot_store, this.api_helpers_store, ui.is_mobile).then(() => {
            main_content.setContainerSize();
            blockly_store.endLoading();
        });
        this.registerReloadOnLanguageChange(this);
        this.registerCurrencyReaction.call(this);
        this.registerOnAccountSwitch.call(this);
        this.registerLandingCompanyChangeReaction.call(this);
        this.registerResidenceChangeReaction.call(this);

        window.addEventListener('click', this.onClickOutsideBlockly);
        window.addEventListener('beforeunload', this.onBeforeUnload);

        main_content.getCachedActiveTab();
    }

    onUnmount() {
        DBot.terminateBot();

        if (Blockly.derivWorkspace) {
            clearInterval(Blockly.derivWorkspace.save_workspace_interval);
            Blockly.derivWorkspace.dispose();
        }
        if (typeof this.disposeReloadOnLanguageChangeReaction === 'function') {
            this.disposeReloadOnLanguageChangeReaction();
        }
        if (typeof this.disposeCurrencyReaction === 'function') {
            this.disposeCurrencyReaction();
        }
        if (typeof this.disposeSwitchAccountListener === 'function') {
            this.disposeSwitchAccountListener();
        }
        if (typeof this.disposeLandingCompanyChangeReaction === 'function') {
            this.disposeLandingCompanyChangeReaction();
        }
        if (typeof this.disposeResidenceChangeReaction === 'function') {
            this.disposeResidenceChangeReaction();
        }

        window.removeEventListener('click', this.onClickOutsideBlockly);
        window.removeEventListener('beforeunload', this.onBeforeUnload);

        // Ensure account switch is re-enabled.
        const { ui } = this.root_store.core;

        ui.setAccountSwitcherDisabledMessage(false);
        ui.setPromptHandler(false);
    }

    onBeforeUnload = event => {
        const { is_stop_button_visible } = this.root_store.run_panel;

        if (is_stop_button_visible) {
            event.returnValue = true;
        }
    };
    registerReloadOnLanguageChange() {
        this.disposeReloadOnLanguageChangeReaction = reaction(
            () => this.root_store.common.current_language,
            () => {
                // temporarily added this to refresh just dbot in case of changing language,
                // otherwise it should change language without refresh.
                const { pathname } = window.location;
                const is_bot =
                    /^\/bot/.test(pathname) || (/^\/(br_)/.test(pathname) && pathname.split('/')[2] === 'bot');
                if (is_bot) window.location.reload();
            }
        );
    }
    registerCurrencyReaction() {
        // Syncs all trade options blocks' currency with the client's active currency.
        this.disposeCurrencyReaction = reaction(
            () => this.root_store.core.client.currency,
            currency => {
                if (!Blockly.derivWorkspace) return;

                const trade_options_blocks = Blockly.derivWorkspace
                    .getAllBlocks()
                    .filter(
                        b =>
                            b.type === 'trade_definition_tradeoptions' ||
                            b.type === 'trade_definition_multiplier' ||
                            (b.isDescendantOf('trade_definition_multiplier') && b.category_ === 'trade_parameters')
                    );

                trade_options_blocks.forEach(trade_options_block => trade_options_block.setCurrency(currency));
            }
        );
    }

    registerOnAccountSwitch() {
        const { client, common } = this.root_store.core;

        this.disposeSwitchAccountListener = reaction(
            () => client.switch_broadcast,
            switch_broadcast => {
                if (!switch_broadcast) return;
                this.showDigitalOptionsMaltainvestError(client, common);

                const { active_symbols, contracts_for } = ApiHelpers.instance;

                if (Blockly.derivWorkspace) {
                    active_symbols.retrieveActiveSymbols(true).then(() => {
                        contracts_for.disposeCache();
                        Blockly.derivWorkspace
                            .getAllBlocks()
                            .filter(block => block.type === 'trade_definition_market')
                            .forEach(block => {
                                runIrreversibleEvents(() => {
                                    const fake_create_event = new Blockly.Events.Create(block);
                                    Blockly.Events.fire(fake_create_event);
                                });
                            });
                    });
                }
            }
        );
    }

    registerLandingCompanyChangeReaction() {
        const { client, common } = this.root_store.core;

        this.disposeLandingCompanyChangeReaction = reaction(
            () => client.landing_company_shortcode,
            () => {
                if (
                    (!client.is_logged_in && client.is_eu_country) ||
                    client.has_maltainvest_account ||
                    isEuResidenceWithOnlyVRTC(client.active_accounts) ||
                    client.is_options_blocked
                ) {
                    showDigitalOptionsUnavailableError(common.showError, {
                        text: localize(
                            'We’re working to have this available for you soon. If you have another account, switch to that account to continue trading. You may add a Deriv MT5 Financial.'
                        ),
                        title: localize('DBot is not available for this account'),
                        link: localize('Go to Deriv MT5 dashboard'),
                    });
                }
            }
        );
    }

    registerResidenceChangeReaction() {
        const { client, common } = this.root_store.core;

        this.disposeResidenceChangeReaction = reaction(
            () => client.account_settings.country_code,
            () => {
                if (
                    (!client.is_logged_in && client.is_eu_country) ||
                    client.has_maltainvest_account ||
                    isEuResidenceWithOnlyVRTC(client.active_accounts) ||
                    client.is_options_blocked
                ) {
                    showDigitalOptionsUnavailableError(common.showError, {
                        text: localize(
                            'We’re working to have this available for you soon. If you have another account, switch to that account to continue trading. You may add a Deriv MT5 Financial.'
                        ),
                        title: localize('DBot is not available for this account'),
                        link: localize('Go to Deriv MT5 dashboard'),
                    });
                }
            }
        );
    }

    setDBotEngineStores() {
        // DO NOT pass the rootstore in, if you need a prop define it in dbot-skeleton-store ans pass it through.
        const {
            core: { client },
            flyout,
            toolbar,
            save_modal,
            quick_strategy,
            load_modal,
            blockly_store,
            summary_card,
        } = this.root_store;
        const { handleFileChange } = load_modal;
        const { toggleStrategyModal } = quick_strategy;
        const { startLoading, endLoading } = blockly_store;
        const { populateConfig, setContractUpdateConfig } = summary_card;

        this.dbot_store = {
            is_mobile: false,
            client,
            flyout,
            populateConfig,
            toolbar,
            save_modal,
            startLoading,
            setContractUpdateConfig,
            endLoading,
            toggleStrategyModal,
            handleFileChange,
        };

        this.api_helpers_store = {
            server_time: this.root_store.server_time,
            ws: this.root_store.ws,
        };
    }

    onClickOutsideBlockly = event => {
        if (document.querySelector('.injectionDiv')) {
            const path = event.path || (event.composedPath && event.composedPath());
            const is_click_outside_blockly = !path.some(el => el.classList && el.classList.contains('injectionDiv'));

            if (is_click_outside_blockly) {
                Blockly?.hideChaff(/* allowToolbox */ false);
            }
        }
    };

    showDigitalOptionsMaltainvestError = (client, common) => {
        if (
            (!client.is_logged_in && client.is_eu_country) ||
            client.has_maltainvest_account ||
            isEuResidenceWithOnlyVRTC(client.active_accounts) ||
            client.is_options_blocked
        ) {
            showDigitalOptionsUnavailableError(common.showError, {
                text: localize(
                    'We’re working to have this available for you soon. If you have another account, switch to that account to continue trading. You may add a Deriv MT5 Financial.'
                ),
                title: localize('DBot is not available for this account'),
                link: localize('Go to Deriv MT5 dashboard'),
            });
        } else if (common.has_error) {
            common.setError(false, null);
        }
    };
}
