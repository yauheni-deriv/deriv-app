import {
    getPropertyValue,
    getUrlBinaryBot,
    getUrlSmartTrader,
    isDesktopOs,
    isEmptyObject,
    LocalStore,
    redirectToLogin,
    setCurrencies,
    State,
    toMoment,
    deriv_urls,
    urlForLanguage,
    filterUrlQuery,
    CFD_PLATFORMS,
    routes,
    isTestLink,
    isProduction,
    isLocal,
    isStaging,
} from '@deriv/shared';
import { getLanguage, localize } from '@deriv/translations';
import Cookies from 'js-cookie';
import { action, computed, observable, reaction, runInAction, toJS, when, makeObservable } from 'mobx';
import moment from 'moment';
import { requestLogout, WS } from 'Services';
import BinarySocketGeneral from 'Services/socket-general';
import BinarySocket from '_common/base/socket_base';
import * as SocketCache from '_common/base/socket_cache';
import { isEuCountry, isMultipliersOnly, isOptionsBlocked } from '_common/utility';
import BaseStore from './base-store';
import { getAccountTitle, getClientAccountType } from './Helpers/client';
import { setDeviceDataCookie } from './Helpers/device';
import { buildCurrenciesList } from './Modules/Trading/Helpers/currency';

const LANGUAGE_KEY = 'i18n_language';
const storage_key = 'client.accounts';
const store_name = 'client_store';
const eu_shortcode_regex = new RegExp('^(maltainvest|malta|iom)$');
const eu_excluded_regex = new RegExp('^mt$');

export default class ClientStore extends BaseStore {
    loginid;
    preferred_language;
    upgrade_info;
    email;
    accounts = {};
    trading_platform_available_accounts = [];
    pre_switch_broadcast = false;
    switched = '';
    is_switching = false;
    switch_broadcast = false;
    initialized_broadcast = false;
    currencies_list = {};
    residence_list = [];
    states_list = [];
    citizen = '';
    selected_currency = '';
    is_populating_account_list = false;
    is_populating_mt5_account_list = true;
    is_populating_dxtrade_account_list = true;
    has_reality_check = false;
    is_reality_check_dismissed;
    reality_check_dur;
    reality_check_timeout;
    website_status = {};
    account_settings = {};
    account_status = {};
    device_data = {};
    is_logging_in = false;
    has_logged_out = false;
    is_landing_company_loaded = false;
    is_account_setting_loaded = false;
    has_enabled_two_fa = false;
    // this will store the landing_company API response, including
    // financial_company: {}
    // gaming_company: {}
    // mt_financial_company: {}
    // mt_gaming_company: {}
    landing_companies = {};

    // All possible landing companies of user between all
    standpoint = {
        iom: false,
        svg: false,
        malta: false,
        maltainvest: false,
        gaming_company: false,
        financial_company: false,
    };

    upgradeable_landing_companies = [];
    mt5_disabled_signup_types = { real: false, demo: false };
    mt5_login_list = [];
    mt5_login_list_error = null;
    dxtrade_accounts_list = [];
    dxtrade_accounts_list_error = null;
    dxtrade_disabled_signup_types = { real: false, demo: false };
    statement = [];
    obj_total_balance = {
        amount_real: undefined,
        amount_mt5: undefined,
        amount_dxtrade: undefined,
        currency: '',
    };

    verification_code = {
        signup: '',
        reset_password: '',
        payment_withdraw: '',
        payment_agent_withdraw: '',
        trading_platform_mt5_password_reset: '',
        trading_platform_dxtrade_password_reset: '',
        request_email: '',
        social_email_change: '',
        system_email_change: '',
    };

    new_email = {
        system_email_change: '',
        social_email_change: '',
    };

    account_limits = {};
    self_exclusion = {};

    local_currency_config = {
        currency: '',
        decimal_places: undefined,
    };
    has_cookie_account = false;

    financial_assessment = null;

    mt5_trading_servers = [];
    dxtrade_trading_servers = [];
    is_cfd_poi_completed = false;

    cfd_score = 0;

    is_mt5_account_list_updated = false;

    prev_real_account_loginid = '';

    constructor(root_store) {
        const local_storage_properties = ['device_data'];
        super({ root_store, local_storage_properties, store_name });

        makeObservable(this, {
            loginid: observable,
            preferred_language: observable,
            upgrade_info: observable,
            email: observable,
            accounts: observable,
            trading_platform_available_accounts: observable,
            pre_switch_broadcast: observable,
            switched: observable,
            is_switching: observable,
            switch_broadcast: observable,
            initialized_broadcast: observable,
            currencies_list: observable,
            residence_list: observable,
            states_list: observable,
            citizen: observable,
            selected_currency: observable,
            is_populating_account_list: observable,
            is_populating_mt5_account_list: observable,
            is_populating_dxtrade_account_list: observable,
            has_reality_check: observable,
            is_reality_check_dismissed: observable,
            reality_check_dur: observable,
            reality_check_timeout: observable,
            website_status: observable,
            account_settings: observable,
            account_status: observable,
            device_data: observable,
            is_logging_in: observable,
            has_logged_out: observable,
            is_landing_company_loaded: observable,
            is_account_setting_loaded: observable,
            has_enabled_two_fa: observable,
            landing_companies: observable,
            standpoint: observable,
            upgradeable_landing_companies: observable,
            mt5_disabled_signup_types: observable,
            mt5_login_list: observable,
            mt5_login_list_error: observable,
            dxtrade_accounts_list: observable,
            dxtrade_accounts_list_error: observable,
            dxtrade_disabled_signup_types: observable,
            statement: observable,
            cfd_score: observable,
            obj_total_balance: observable,
            verification_code: observable,
            new_email: observable,
            account_limits: observable,
            self_exclusion: observable,
            local_currency_config: observable,
            has_cookie_account: observable,
            financial_assessment: observable,
            mt5_trading_servers: observable,
            dxtrade_trading_servers: observable,
            is_cfd_poi_completed: observable,
            prev_real_account_loginid: observable,
            balance: computed,
            account_open_date: computed,
            is_reality_check_visible: computed,
            is_svg: computed,
            reality_check_duration: computed,
            reality_check_dismissed: computed,
            has_active_real_account: computed,
            has_maltainvest_account: computed,
            has_malta_account: computed,
            has_any_real_account: computed,
            first_switchable_real_loginid: computed,
            can_change_fiat_currency: computed,
            legal_allowed_currencies: computed,
            upgradeable_currencies: computed,
            current_currency_type: computed,
            available_crypto_currencies: computed,
            has_iom_account: computed,
            has_fiat: computed,
            current_fiat_currency: computed,
            current_landing_company: computed,
            account_list: computed,
            has_real_mt5_login: computed,
            has_real_dxtrade_login: computed,
            has_account_error_in_mt5_real_list: computed,
            has_account_error_in_mt5_demo_list: computed,
            has_account_error_in_dxtrade_real_list: computed,
            has_account_error_in_dxtrade_demo_list: computed,
            active_accounts: computed,
            all_loginids: computed,
            account_title: computed,
            currency: computed,
            default_currency: computed,
            should_allow_authentication: computed,
            is_risky_client: computed,
            is_financial_assessment_incomplete: computed,
            is_authentication_needed: computed,
            is_identity_verification_needed: computed,
            real_account_creation_unlock_date: computed,
            is_tnc_needed: computed,
            is_social_signup: computed,
            isEligibleForMoreDemoMt5Svg: action.bound,
            isEligibleForMoreRealMt5: action.bound,
            setIsCfdPoiCompleted: action.bound,
            setCitizen: action.bound,
            is_mt5_password_not_set: computed,
            is_dxtrade_password_not_set: computed,
            is_financial_information_incomplete: computed,
            is_deposit_lock: computed,
            is_withdrawal_lock: computed,
            is_trading_experience_incomplete: computed,
            authentication_status: computed,
            social_identity_provider: computed,
            is_from_restricted_country: computed,
            is_fully_authenticated: computed,
            is_pending_authentication: computed,
            is_financial_account: computed,
            is_age_verified: computed,
            landing_company_shortcode: computed,
            landing_company: computed,
            is_valid_login: computed,
            is_logged_in: computed,
            has_restricted_mt5_account: computed,
            should_restrict_bvi_account_creation: computed,
            is_virtual: computed,
            is_eu: computed,
            is_uk: computed,
            is_brazil: computed,
            country_standpoint: computed,
            can_have_mlt_account: computed,
            can_have_mx_account: computed,
            can_have_mf_account: computed,
            can_upgrade: computed,
            can_upgrade_to: computed,
            virtual_account_loginid: computed,
            is_single_currency: computed,
            account_type: computed,
            is_mt5_allowed: computed,
            is_dxtrade_allowed: computed,
            is_bot_allowed: computed,
            clients_country: computed,
            is_eu_country: computed,
            is_options_blocked: computed,
            is_multipliers_only: computed,
            is_pre_appstore: computed,
            resetLocalStorageValues: action.bound,
            getBasicUpgradeInfo: action.bound,
            setMT5DisabledSignupTypes: action.bound,
            setCFDDisabledSignupTypes: action.bound,
            getLimits: action.bound,
            setPreferredLanguage: action.bound,
            setCookieAccount: action.bound,
            setCFDScore: action.bound,
            updateSelfExclusion: action.bound,
            responsePayoutCurrencies: action.bound,
            responseAuthorize: action.bound,
            setWebsiteStatus: action.bound,
            accountRealReaction: action.bound,
            setLoginInformation: action.bound,
            realAccountSignup: action.bound,
            setAccountCurrency: action.bound,
            updateAccountCurrency: action.bound,
            createCryptoAccount: action.bound,
            residence: computed,
            email_address: computed,
            is_website_status_ready: computed,
            updateAccountList: action.bound,
            switchAccount: action.bound,
            resetVirtualBalance: action.bound,
            switchEndSignal: action.bound,
            init: action.bound,
            resetMt5AccountListPopulation: action.bound,
            responseWebsiteStatus: action.bound,
            responseLandingCompany: action.bound,
            setStandpoint: action.bound,
            setRealityCheck: action.bound,
            setLoginId: action.bound,
            setAccounts: action.bound,
            setSwitched: action.bound,
            setIsLoggingIn: action.bound,
            setPreSwitchAccount: action.bound,
            broadcastAccountChange: action.bound,
            switchAccountHandler: action.bound,
            registerReactions: action.bound,
            setBalanceActiveAccount: action.bound,
            setBalanceOtherAccounts: action.bound,
            selectCurrency: action.bound,
            setResidence: action.bound,
            setEmail: action.bound,
            setAccountSettings: action.bound,
            setAccountStatus: action.bound,
            updateAccountStatus: action.bound,
            setInitialized: action.bound,
            cleanUp: action.bound,
            logout: action.bound,
            setLogout: action.bound,
            storeClientAccounts: action.bound,
            setUserLogin: action.bound,
            canStoreClientAccounts: action.bound,
            setVerificationCode: action.bound,
            setNewEmail: action.bound,
            setDeviceData: action.bound,
            getSignupParams: action.bound,
            onSetResidence: action.bound,
            onSetCitizen: action.bound,
            onSignup: action.bound,
            fetchAccountSettings: action.bound,
            fetchResidenceList: action.bound,
            setResidenceList: action.bound,
            fetchStatesList: action.bound,
            resetMt5ListPopulatedState: action.bound,
            updateMt5LoginList: action.bound,
            responseMT5TradingServers: action.bound,
            responseMt5LoginList: action.bound,
            responseDxtradeTradingServers: action.bound,
            responseTradingPlatformAvailableAccounts: action.bound,
            responseTradingPlatformAccountsList: action.bound,
            responseStatement: action.bound,
            getChangeableFields: action.bound,
            syncWithLegacyPlatforms: action.bound,
            is_high_risk: computed,
            has_residence: computed,
            setVisibilityRealityCheck: action.bound,
            clearRealityCheckTimeout: action.bound,
            setRealityCheckDuration: action.bound,
            cleanupRealityCheck: action.bound,
            fetchFinancialAssessment: action.bound,
            setFinancialAndTradingAssessment: action.bound,
            setTwoFAStatus: action.bound,
            is_eu_or_multipliers_only: computed,
            getTwoFAStatus: action.bound,
            isEuropeCountry: action.bound,
            setPrevRealAccountLoginid: action.bound,
            switchAccountHandlerForAppstore: action.bound,
            setIsPreAppStore: action.bound,
        });

        reaction(
            () => [
                this.is_logged_in,
                this.loginid,
                this.email,
                this.landing_company,
                this.currency,
                this.residence,
                this.account_settings,
                this.preferred_language,
            ],
            () => {
                this.setCookieAccount();
            }
        );
        when(
            () => !this.is_logged_in && this.root_store.ui && this.root_store.ui.is_real_acc_signup_on,
            () => this.root_store.ui.closeRealAccountSignup()
        );
    }

    get balance() {
        if (isEmptyObject(this.accounts)) return undefined;
        return this.accounts[this.loginid] && 'balance' in this.accounts[this.loginid]
            ? this.accounts[this.loginid].balance.toString()
            : undefined;
    }

    get account_open_date() {
        if (isEmptyObject(this.accounts)) return undefined;
        return Object.keys(this.accounts[this.loginid]).includes('created_at')
            ? this.accounts[this.loginid].created_at
            : undefined;
    }

    get is_reality_check_visible() {
        if (!this.loginid || !this.landing_company) {
            return false;
        }
        return !!(this.has_reality_check && !this.reality_check_dismissed);
    }

    get is_svg() {
        if (!this.landing_company_shortcode) {
            return false;
        }
        return this.landing_company_shortcode === 'svg' || this.landing_company_shortcode === 'costarica';
    }

    get reality_check_duration() {
        return this.has_reality_check ? this.reality_check_dur || +LocalStore.get('reality_check_duration') : undefined;
    }

    get reality_check_dismissed() {
        return this.has_reality_check
            ? this.is_reality_check_dismissed || JSON.parse(LocalStore.get('reality_check_dismissed') || false)
            : undefined;
    }

    get has_active_real_account() {
        return this.active_accounts.some(acc => acc.is_virtual === 0);
    }

    get has_maltainvest_account() {
        return this.active_accounts.some(acc => acc.landing_company_shortcode === 'maltainvest');
    }

    get has_malta_account() {
        return this.active_accounts.some(acc => acc.landing_company_shortcode === 'malta');
    }

    hasAnyRealAccount = () => {
        return this.account_list.some(acc => acc.is_virtual === 0);
    };

    get has_any_real_account() {
        return this.hasAnyRealAccount();
    }

    get first_switchable_real_loginid() {
        const result = this.active_accounts.find(
            acc => acc.is_virtual === 0 && acc.landing_company_shortcode === 'svg'
        );
        return result.loginid || undefined;
    }

    get can_change_fiat_currency() {
        const has_no_mt5 = !this.has_real_mt5_login;
        const has_no_dxtrade = !this.has_real_dxtrade_login;
        const has_no_transaction = this.statement.count === 0 && this.statement.transactions.length === 0;
        const has_no_deposit_attempt_account_status = !this.account_status?.status?.includes('deposit_attempt');
        const has_account_criteria =
            has_no_transaction && has_no_mt5 && has_no_dxtrade && has_no_deposit_attempt_account_status;
        return !this.is_virtual && has_account_criteria && this.current_currency_type === 'fiat';
    }

    get legal_allowed_currencies() {
        const getDefaultAllowedCurrencies = () => {
            if (this.landing_companies.gaming_company) {
                return this.landing_companies.gaming_company.legal_allowed_currencies;
            }
            if (this.landing_companies.financial_company) {
                return this.landing_companies.financial_company.legal_allowed_currencies;
            }
            return [];
        };

        if (!this.landing_companies || !this.root_store.ui) return [];
        if (!this.root_store.ui.real_account_signup_target) {
            return getDefaultAllowedCurrencies();
        }
        if (
            ['set_currency', 'manage'].includes(this.root_store.ui.real_account_signup_target) &&
            this.current_landing_company
        ) {
            return this.current_landing_company.legal_allowed_currencies;
        }
        const target = this.root_store.ui.real_account_signup_target === 'maltainvest' ? 'financial' : 'gaming';

        if (this.landing_companies[`${target}_company`]) {
            return this.landing_companies[`${target}_company`].legal_allowed_currencies;
        }

        return getDefaultAllowedCurrencies();
    }

    get upgradeable_currencies() {
        if (!this.legal_allowed_currencies || !this.website_status.currencies_config) return [];
        return this.legal_allowed_currencies.map(currency => ({
            value: currency,
            ...this.website_status.currencies_config[currency],
        }));
    }

    get current_currency_type() {
        if (this.account_type === 'virtual') return 'virtual';
        if (
            this.website_status &&
            this.website_status.currencies_config &&
            this.website_status.currencies_config[this.currency]
        ) {
            return this.website_status.currencies_config[this.currency].type;
        }

        return undefined;
    }

    get available_crypto_currencies() {
        const values = Object.values(this.accounts).reduce((acc, item) => {
            acc.push(item.currency);
            return acc;
        }, []);

        return this.upgradeable_currencies.filter(acc => !values.includes(acc.value) && acc.type === 'crypto');
    }

    get has_iom_account() {
        return this.active_accounts.some(acc => acc.landing_company_shortcode === 'iom');
    }

    get has_fiat() {
        const values = Object.values(this.accounts).reduce((acc, item) => {
            if (!item.is_virtual) {
                acc.push(item.currency);
            }
            return acc;
        }, []);
        return !!this.upgradeable_currencies.filter(acc => values.includes(acc.value) && acc.type === 'fiat').length;
    }

    get current_fiat_currency() {
        const values = Object.values(this.accounts).reduce((acc, item) => {
            if (!item.is_virtual) {
                acc.push(item.currency);
            }
            return acc;
        }, []);

        return this.has_fiat
            ? this.upgradeable_currencies.filter(acc => values.includes(acc.value) && acc.type === 'fiat')[0].value
            : undefined;
    }

    // return the landing company object that belongs to the current client by matching shortcode
    // note that it will be undefined for logged out and virtual clients
    get current_landing_company() {
        const landing_company =
            this.landing_companies &&
            Object.keys(this.landing_companies).find(
                company => this.landing_companies[company]?.shortcode === this.landing_company_shortcode
            );
        return landing_company ? this.landing_companies[landing_company] : undefined;
    }

    get account_list() {
        return this.all_loginids.map(id => this.getAccountInfo(id)).filter(account => account);
    }

    get has_real_mt5_login() {
        return this.mt5_login_list.some(account => account.account_type === 'real');
    }

    get has_real_dxtrade_login() {
        return this.dxtrade_accounts_list.some(account => account.account_type === 'real');
    }

    hasAccountErrorInCFDList = (platform, account_type) => {
        if (!this.is_logged_in) return false;

        const list = platform === CFD_PLATFORMS.MT5 ? this.mt5_login_list : this.dxtrade_accounts_list;
        return list?.some(account => !!account.has_error && account.account_type === account_type);
    };

    get has_account_error_in_mt5_real_list() {
        return this.hasAccountErrorInCFDList(CFD_PLATFORMS.MT5, 'real');
    }

    get has_account_error_in_mt5_demo_list() {
        return this.hasAccountErrorInCFDList(CFD_PLATFORMS.MT5, 'demo');
    }

    get has_account_error_in_dxtrade_real_list() {
        return this.hasAccountErrorInCFDList(CFD_PLATFORMS.DXTRADE, 'real');
    }

    get has_account_error_in_dxtrade_demo_list() {
        return this.hasAccountErrorInCFDList(CFD_PLATFORMS.DXTRADE, 'demo');
    }

    get active_accounts() {
        return this.accounts instanceof Object
            ? Object.values(this.accounts).filter(account => !account.is_disabled)
            : [];
    }

    get all_loginids() {
        return !isEmptyObject(this.accounts) ? Object.keys(this.accounts) : [];
    }

    get account_title() {
        return getAccountTitle(this.loginid);
    }

    get currency() {
        if (this.selected_currency.length) {
            return this.selected_currency;
        } else if (this.is_logged_in) {
            return this.accounts[this.loginid].currency;
        }

        return this.default_currency;
    }

    get default_currency() {
        if (Object.keys(this.currencies_list).length > 0) {
            const keys = Object.keys(this.currencies_list);
            // Fix for edge case when logging out from crypto accounts causes Fiat list to be empty
            if (this.currencies_list[localize('Fiat')].length < 1) return 'USD';
            return Object.values(this.currencies_list[`${keys[0]}`])[0].text;
        }

        return 'USD';
    }

    get should_allow_authentication() {
        return this.account_status?.status?.some(
            status => status === 'allow_document_upload' || status === 'allow_poi_resubmission'
        );
    }

    get is_risky_client() {
        if (isEmptyObject(this.account_status)) return false;
        return (
            this.is_logged_in &&
            !this.is_virtual &&
            ['standard', 'high'].includes(this.account_status.risk_classification)
        );
    }

    get is_financial_assessment_incomplete() {
        return this.account_status?.status?.includes('financial_assessment_not_complete');
    }

    get is_authentication_needed() {
        return !this.is_fully_authenticated && !!this.account_status?.authentication?.needs_verification?.length;
    }

    get is_identity_verification_needed() {
        const needs_verification = this.account_status?.authentication?.needs_verification;
        return needs_verification?.length === 1 && needs_verification?.includes('identity');
    }

    get real_account_creation_unlock_date() {
        const { cooling_off_expiration_date } = this.account_settings;
        return cooling_off_expiration_date;
    }

    get is_tnc_needed() {
        if (this.is_virtual) return false;
        const { client_tnc_status } = this.account_settings;
        const { terms_conditions_version } = this.website_status;

        return typeof client_tnc_status !== 'undefined' && client_tnc_status !== terms_conditions_version;
    }

    get is_social_signup() {
        return this.account_status?.status?.includes('social_signup');
    }

    get is_mt5_password_not_set() {
        return this.account_status?.status?.includes('mt5_password_not_set');
    }

    get is_dxtrade_password_not_set() {
        return this.account_status?.status?.includes('dxtrade_password_not_set');
    }

    get is_financial_information_incomplete() {
        return this.account_status?.status?.some(status => status === 'financial_information_not_complete');
    }

    get is_deposit_lock() {
        return this.account_status?.status?.some(status_name => status_name === 'deposit_locked');
    }

    get is_withdrawal_lock() {
        return this.account_status?.status?.some(status_name => status_name === 'withdrawal_locked');
    }

    get is_trading_experience_incomplete() {
        return this.account_status?.status?.some(status => status === 'trading_experience_not_complete');
    }

    get authentication_status() {
        const document_status = this.account_status?.authentication?.document?.status;
        const identity_status = this.account_status?.authentication?.identity?.status;
        return { document_status, identity_status };
    }

    get social_identity_provider() {
        return this.account_status?.social_identity_provider;
    }

    get is_from_restricted_country() {
        return this.residence_list.find(item => item.value === this.residence)?.disabled === 'DISABLED';
    }

    get is_fully_authenticated() {
        return this.account_status?.status?.some(status => status === 'authenticated');
    }

    get is_pending_authentication() {
        return this.account_status?.status?.some(status => status === 'document_under_review');
    }

    get is_financial_account() {
        if (!this.landing_companies) return false;
        return this.account_type === 'financial';
    }

    get is_age_verified() {
        return this.account_status?.status?.some(status => status === 'age_verification');
    }

    get landing_company_shortcode() {
        if (this.accounts[this.loginid]) {
            return this.accounts[this.loginid].landing_company_shortcode;
        }
        return undefined;
    }

    get landing_company() {
        return this.landing_companies;
    }

    get is_valid_login() {
        if (!this.is_logged_in) return true;
        const valid_login_ids_regex = new RegExp('^(MX|MF|VRTC|MLT|CR|FOG)[0-9]+$', 'i');
        return this.all_loginids.every(id => valid_login_ids_regex.test(id));
    }

    get is_logged_in() {
        return !!(
            !isEmptyObject(this.accounts) &&
            Object.keys(this.accounts).length > 0 &&
            this.loginid &&
            this.accounts[this.loginid].token
        );
    }

    get has_restricted_mt5_account() {
        return !!this.mt5_login_list.filter(mt5_account => mt5_account?.status?.includes('poa_failed')).length;
    }

    get should_restrict_bvi_account_creation() {
        return !!this.mt5_login_list.filter(
            item => item?.landing_company_short === 'bvi' && item?.status === 'poa_failed'
        ).length;
    }

    get is_virtual() {
        return !isEmptyObject(this.accounts) && this.accounts[this.loginid] && !!this.accounts[this.loginid].is_virtual;
    }

    get is_eu() {
        if (!this.landing_companies) return false;
        const { gaming_company, financial_company, mt_gaming_company } = this.landing_companies;
        const financial_shortcode = financial_company?.shortcode;
        const gaming_shortcode = gaming_company?.shortcode;
        const mt_gaming_shortcode = mt_gaming_company?.financial.shortcode || mt_gaming_company?.swap_free.shortcode;
        return financial_shortcode || gaming_shortcode || mt_gaming_shortcode
            ? eu_shortcode_regex.test(financial_shortcode) ||
                  eu_shortcode_regex.test(gaming_shortcode) ||
                  eu_shortcode_regex.test(mt_gaming_shortcode)
            : eu_excluded_regex.test(this.residence);
    }

    get is_brazil() {
        return this.clients_country === 'br';
    }

    get is_uk() {
        return this.residence === 'gb';
    }

    get country_standpoint() {
        const result = {
            is_united_kingdom: this.is_uk,
            is_isle_of_man: this.residence === 'im',
            is_france: this.residence === 'fr',
            is_belgium: this.residence === 'be',
            // Other EU countries: Germany, Spain, Italy, Luxembourg and Greece
            is_other_eu:
                this.residence === 'de' ||
                this.residence === 'es' ||
                this.residence === 'it' ||
                this.residence === 'lu' ||
                this.residence === 'gr',
        };

        result.is_rest_of_eu =
            this.is_eu && !result.is_uk && !result.is_france && !result.is_belgium && !result.is_other_eu;

        return result;
    }

    // Manual list of MLT countries during MLT/MX account removal.
    // Also needed to check onboarding modal text for specific country.
    get can_have_mlt_account() {
        const countries = [
            'nl',
            'cy',
            'ie',
            'ro',
            'be',
            'lt',
            'bg',
            'cz',
            'dk',
            'se',
            'pl',
            'ee',
            'hr',
            'at',
            'hu',
            'sl',
            'fi',
            'sk',
            'pt',
            'lv',
        ].includes(this.residence);
        return countries;
    }

    // Manual list of MX countries during MLT/MX account removal.
    get can_have_mx_account() {
        const countries = ['gb', 'im'].includes(this.residence);
        return countries;
    }

    // Manual list of MF countries during MLT/MX account removal.
    // Also needed to check onboarding modal text for specific country.
    get can_have_mf_account() {
        const countries = [
            'it',
            'fr',
            'de',
            'lu',
            'es',
            'gr',
            'nl',
            'cy',
            'ie',
            'ro',
            'lt',
            'bg',
            'cz',
            'dk',
            'se',
            'pl',
            'ee',
            'hr',
            'at',
            'hu',
            'sl',
            'fi',
            'sk',
            'pt',
            'lv',
        ].includes(this.residence);
        return countries;
    }

    get can_upgrade() {
        return this.upgrade_info && (this.upgrade_info.can_upgrade || this.upgrade_info.can_open_multi);
    }

    get can_upgrade_to() {
        return this.upgrade_info && this.upgrade_info.can_upgrade_to;
    }

    get virtual_account_loginid() {
        return this.all_loginids.find(loginid => !!this.accounts[loginid].is_virtual);
    }

    get is_single_currency() {
        return (
            Object.keys(this.currencies_list)
                .map(type => Object.values(this.currencies_list[type]).length)
                .reduce((acc, cur) => acc + cur, 0) === 1
        );
    }

    get account_type() {
        return getClientAccountType(this.loginid);
    }

    get is_mt5_allowed() {
        return this.isMT5Allowed(this.landing_companies);
    }

    get is_dxtrade_allowed() {
        return this.isDxtradeAllowed(this.landing_companies);
    }

    get is_bot_allowed() {
        return this.isBotAllowed();
    }

    get is_pre_appstore() {
        const { trading_hub } = this.account_settings;
        return !!trading_hub;
    }

    getIsMarketTypeMatching = (account, market_type) =>
        market_type === 'synthetic'
            ? account.market_type === market_type || account.market_type === 'gaming'
            : account.market_type === 'financial';

    isEligibleForMoreDemoMt5Svg(market_type) {
        const existing_demo_accounts = this.mt5_login_list.filter(
            account => account.account_type === 'demo' && this.getIsMarketTypeMatching(account, market_type)
        );
        return (
            this.trading_platform_available_accounts.some(
                account =>
                    (market_type === 'synthetic' ? 'gaming' : 'financial') === account.market_type &&
                    account.shortcode === 'svg'
            ) && existing_demo_accounts.every(account => !(account.landing_company_short === 'svg'))
        );
    }

    isEligibleForMoreRealMt5(market_type) {
        const existing_real_accounts = this.mt5_login_list.filter(
            account => account.account_type === 'real' && this.getIsMarketTypeMatching(account, market_type)
        );
        const available_real_accounts_shortcodes = this.trading_platform_available_accounts
            .filter(account => (market_type === 'synthetic' ? 'gaming' : 'financial') === account.market_type)
            .map(account => account.shortcode);

        return !!available_real_accounts_shortcodes.filter(shortcode =>
            existing_real_accounts.every(account => account.landing_company_short !== shortcode)
        ).length;
    }

    isMT5Allowed = landing_companies => {
        // default allowing mt5 to true before landing_companies gets populated
        // since most clients are allowed to use mt5
        if (!landing_companies || !Object.keys(landing_companies).length) return true;

        if (!this.mt5_login_list.some(acc => acc.market_type === 'synthetic')) {
            if (this.country_standpoint.is_belgium || this.country_standpoint.is_france) return false;
        }

        return 'mt_financial_company' in landing_companies || 'mt_gaming_company' in landing_companies;
    };

    isDxtradeAllowed = landing_companies => {
        // Stop showing DerivX for non-logged in EU users
        if (!this.is_logged_in && this.is_eu_country) return false;

        if (!this.website_status?.clients_country || !landing_companies || !Object.keys(landing_companies).length)
            return true;

        // TODO: Remove two first conditions after real released
        return (
            'dxtrade_financial_company' in landing_companies ||
            'dxtrade_gaming_company' in landing_companies ||
            'dxtrade_all_company' in landing_companies ||
            (!this.is_logged_in && !this.is_eu && !this.is_eu_country)
        );
    };

    isBotAllowed = () => {
        // Stop showing Bot, DBot, DSmartTrader for logged out EU IPs
        if (!this.is_logged_in && this.is_eu_country) return false;
        const is_mf = this.landing_company_shortcode === 'maltainvest';
        return this.is_virtual ? this.is_eu_or_multipliers_only : !is_mf && !this.is_options_blocked;
    };

    get is_eu_or_multipliers_only() {
        // Check whether account is multipliers only and if the account is from eu countries
        return !this.is_multipliers_only ? !isEuCountry(this.residence) : !this.is_multipliers_only;
    }

    get clients_country() {
        return this.website_status?.clients_country;
    }

    get is_eu_country() {
        const country = this.website_status.clients_country;
        if (country) return isEuCountry(country);
        return false;
    }

    isEuropeCountry() {
        return this.is_eu_country || this.is_eu;
    }

    get is_options_blocked() {
        return isOptionsBlocked(this.residence);
    }

    get is_multipliers_only() {
        return isMultipliersOnly(this.residence);
    }

    /**
     * Store Values relevant to the loginid to local storage.
     *
     * @param loginid
     */
    resetLocalStorageValues(loginid) {
        this.accounts[loginid].accepted_bch = 0;
        LocalStore.setObject(storage_key, this.accounts);
        LocalStore.set('active_loginid', loginid);
        this.syncWithLegacyPlatforms(loginid, toJS(this.accounts));
        this.loginid = loginid;
    }

    getBasicUpgradeInfo() {
        const upgradeable_landing_companies = [
            ...new Set(State.getResponse('authorize.upgradeable_landing_companies')),
        ];
        let can_open_multi = false;
        let type, can_upgrade_to;
        if ((upgradeable_landing_companies || []).length) {
            can_open_multi =
                upgradeable_landing_companies.indexOf(this.accounts[this.loginid].landing_company_shortcode) !== -1;
            const canUpgrade = (...landing_companies) =>
                landing_companies.find(
                    landing_company =>
                        landing_company !== this.accounts[this.loginid].landing_company_shortcode &&
                        upgradeable_landing_companies.indexOf(landing_company) !== -1
                );
            can_upgrade_to = canUpgrade('svg', 'iom', 'malta', 'maltainvest');
            if (can_upgrade_to) {
                type = can_upgrade_to === 'maltainvest' ? 'financial' : 'real';
            }
        }

        return {
            type,
            can_upgrade: !!can_upgrade_to,
            can_upgrade_to,
            can_open_multi,
        };
    }

    setMT5DisabledSignupTypes(disabled_types_obj) {
        const current_list = this.mt5_disabled_signup_types;
        this.mt5_disabled_signup_types = { ...current_list, ...disabled_types_obj };
    }

    setCFDDisabledSignupTypes(platform, disabled_types_obj) {
        if (platform === CFD_PLATFORMS.DXTRADE) {
            const current_list = this.dxtrade_disabled_signup_types;
            this.dxtrade_disabled_signup_types = { current_list, ...disabled_types_obj };
        }
    }

    getLimits() {
        return new Promise(resolve => {
            WS.authorized.storage.getLimits().then(data => {
                runInAction(() => {
                    if (data.error) {
                        this.account_limits = {
                            api_initial_load_error: data.error.message,
                        };
                        resolve(data);
                    } else {
                        this.account_limits = {
                            ...data.get_limits,
                            is_loading: false,
                        };
                        resolve(data);
                    }
                });
            });
        });
    }

    setPreferredLanguage = lang => {
        this.preferred_language = lang;
        LocalStore.setObject(LANGUAGE_KEY, lang);
    };

    setCookieAccount() {
        const domain = /deriv\.(com|me)/.test(window.location.hostname) ? deriv_urls.DERIV_HOST_NAME : 'binary.sx';
        // eslint-disable-next-line max-len
        const {
            loginid,
            email,
            landing_company_shortcode,
            currency,
            residence,
            account_settings,
            preferred_language,
            user_id,
        } = this;

        const { first_name, last_name, name } = account_settings;
        if (loginid && email) {
            const client_information = {
                loginid,
                email,
                landing_company_shortcode,
                currency,
                residence,
                first_name,
                last_name,
                name,
                preferred_language,
                user_id,
            };
            Cookies.set('client_information', client_information, { domain });
            this.has_cookie_account = true;
        } else {
            Cookies.remove('client_information', { domain });
            this.has_cookie_account = false;
        }
    }

    // CFD score is the computed points based on the CFD related questions that the user answers in trading-assessment.
    setCFDScore(score) {
        this.cfd_score = score;
    }

    getSelfExclusion() {
        return new Promise(resolve => {
            WS.authorized.storage.getSelfExclusion().then(data => {
                runInAction(() => {
                    if (data.get_self_exclusion) {
                        this.self_exclusion = data.get_self_exclusion;
                    } else {
                        this.self_exclusion = false;
                    }
                    resolve(data);
                });
            });
        });
    }
    updateSelfExclusion(values) {
        return new Promise(resolve => {
            WS.authorized.storage.setSelfExclusion(values).then(data => {
                if (!data.error) {
                    this.getSelfExclusion();
                }
                resolve(data);
            });
        });
    }

    responsePayoutCurrencies(response) {
        const list = response.payout_currencies || response;
        this.currencies_list = buildCurrenciesList(list);
        this.selectCurrency('');
    }

    responseAuthorize(response) {
        this.accounts[this.loginid].email = response.authorize.email;
        this.accounts[this.loginid].currency = response.authorize.currency;
        this.accounts[this.loginid].is_virtual = +response.authorize.is_virtual;
        this.accounts[this.loginid].session_start = parseInt(moment().utc().valueOf() / 1000);
        this.accounts[this.loginid].landing_company_shortcode = response.authorize.landing_company_name;
        this.accounts[this.loginid].country = response.country;
        this.updateAccountList(response.authorize.account_list);
        this.upgrade_info = this.getBasicUpgradeInfo();
        this.user_id = response.authorize.user_id;
        this.upgradeable_landing_companies = [...new Set(response.authorize.upgradeable_landing_companies)];
        this.local_currency_config.currency = Object.keys(response.authorize.local_currencies)[0];

        // For residences without local currency (e.g. ax)
        const default_fractional_digits = 2;
        this.local_currency_config.decimal_places = isEmptyObject(response.authorize.local_currencies)
            ? default_fractional_digits
            : +response.authorize.local_currencies[this.local_currency_config.currency].fractional_digits;
    }

    setWebsiteStatus(response) {
        this.website_status = response.website_status;
        this.responseWebsiteStatus(response);
        setCurrencies(this.website_status);
    }

    async accountRealReaction(response) {
        return new Promise(resolve => {
            let client_accounts;
            const has_client_accounts = !!LocalStore.get(storage_key);

            runInAction(() => {
                this.is_populating_account_list = true;
            });

            if (this.is_logged_in && !has_client_accounts) {
                localStorage.setItem(storage_key, JSON.stringify(this.accounts));
                LocalStore.set(storage_key, JSON.stringify(this.accounts));
            }

            try {
                client_accounts = JSON.parse(LocalStore.get(storage_key));
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('JSON parse failed, invalid value (client.accounts): ', error);
            }

            const { oauth_token, client_id } = response.new_account_real ?? response.new_account_maltainvest;
            BinarySocket.authorize(oauth_token)
                .then(authorize_response => {
                    const new_data = {};
                    new_data.token = oauth_token;
                    new_data.residence = authorize_response.authorize.country;
                    new_data.currency = authorize_response.authorize.currency;
                    new_data.is_virtual = authorize_response.authorize.is_virtual;
                    new_data.landing_company_name = authorize_response.authorize.landing_company_fullname;
                    new_data.landing_company_shortcode = authorize_response.authorize.landing_company_name;
                    runInAction(() => (client_accounts[client_id] = new_data));
                    this.setLoginInformation(client_accounts, client_id);
                    WS.authorized.storage.getSettings().then(get_settings_response => {
                        this.setAccountSettings(get_settings_response.get_settings);
                        resolve();
                    });
                })
                .catch(error => {
                    // eslint-disable-next-line no-console
                    console.error('Something went wrong while registering a real account: ', error);
                });
        });
    }

    setLoginInformation(client_accounts, client_id) {
        this.setAccounts(client_accounts);
        localStorage.setItem(storage_key, JSON.stringify(client_accounts));
        LocalStore.set(storage_key, JSON.stringify(client_accounts));
        this.is_populating_account_list = false;
        this.upgrade_info = this.getBasicUpgradeInfo();
        this.setSwitched(client_id);
        this.syncWithLegacyPlatforms(client_id, client_accounts);
    }

    async realAccountSignup(form_values) {
        const DEFAULT_CRYPTO_ACCOUNT_CURRENCY = 'BTC';
        const is_maltainvest_account = this.root_store.ui.real_account_signup_target === 'maltainvest';
        const is_samoa_account = this.root_store.ui.real_account_signup_target === 'samoa';
        let currency = '';
        form_values.residence = this.residence;
        if (is_maltainvest_account) {
            currency = form_values.currency;
        }
        const { document_number, document_type, ...required_form_values } = form_values;
        required_form_values.citizen = this.account_settings.citizen || this.residence;
        const response = is_maltainvest_account
            ? await WS.newAccountRealMaltaInvest(required_form_values)
            : await WS.newAccountReal(required_form_values);

        if (!response.error) {
            await this.accountRealReaction(response);
            if (is_samoa_account) {
                await this.setAccountCurrency(DEFAULT_CRYPTO_ACCOUNT_CURRENCY);
            }
            localStorage.removeItem('real_account_signup_wizard');
            await this.root_store.gtm.pushDataLayer({ event: 'real_signup' });

            return Promise.resolve({
                ...response,
                ...(is_maltainvest_account
                    ? {
                          new_account_maltainvest: {
                              ...response.new_account_maltainvest,
                              currency,
                          },
                      }
                    : {}),
                ...(is_samoa_account
                    ? {
                          new_account_samoa: {
                              currency,
                          },
                      }
                    : {}),
            });
        }
        return Promise.reject(response.error);
    }

    async setAccountCurrency(currency) {
        const response = await WS.setAccountCurrency(currency, {
            previous_currency: this.currency,
        });
        if (!response.error) {
            await this.updateAccountCurrency(currency);
            return Promise.resolve(response);
        }
        return Promise.reject(response.error);
    }

    async updateAccountCurrency(currency, is_set_storage = true) {
        runInAction(() => {
            const new_account = { ...this.accounts[this.loginid] };
            new_account.currency = currency;
            if (!('balance' in new_account)) new_account.balance = 0;
            this.accounts[this.loginid] = new_account;
        });
        if (is_set_storage) {
            localStorage.setItem(storage_key, JSON.stringify(this.accounts));
            LocalStore.setObject(storage_key, JSON.parse(JSON.stringify(this.accounts)));
        }
        this.selectCurrency(currency);
        this.root_store.notifications.removeNotificationMessage({
            key: 'currency',
        });
        this.root_store.notifications.removeNotificationByKey({
            key: 'currency',
        });
        await this.init();
    }

    async createCryptoAccount(currency) {
        const residence = this.residence;
        const { date_of_birth, first_name, last_name } = this.account_settings;
        const data = {
            residence,
            currency,
            first_name,
            last_name,
            date_of_birth: toMoment(date_of_birth).format('YYYY-MM-DD'),
        };

        const response = await WS.newAccountReal(data);
        if (!response.error) {
            await this.accountRealReaction(response);
            return Promise.resolve(response);
        }
        return Promise.reject(response.error);
    }

    get residence() {
        if (this.is_logged_in) {
            return this.account_settings.country_code ?? '';
        }
        return '';
    }

    get email_address() {
        if (this.accounts && this.accounts[this.loginid]) {
            return this.accounts[this.loginid].email;
        }

        return '';
    }

    get is_website_status_ready() {
        return this.website_status && !BinarySocket.getAvailability().is_down;
    }

    isEuCountrySelected = selected_country => {
        if (selected_country) return isEuCountry(selected_country);
        return false;
    };

    isAccountOfType = type => {
        const client_account_type = getClientAccountType(this.loginid);

        return (
            ((type === 'virtual' && client_account_type === 'virtual') ||
                (type === 'real' && client_account_type !== 'virtual') ||
                type === client_account_type) &&
            !this.isDisabled()
        );
    };

    isAccountOfTypeDisabled = type => {
        const filtered_list = this.account_list.filter(acc => getClientAccountType(acc.loginid) === type);
        return filtered_list.length > 0 && filtered_list.every(acc => acc.is_disabled);
    };

    shouldCompleteTax = () => {
        if (!this.isAccountOfType('financial')) return false;

        return !/crs_tin_information/.test((this.account_status || {})?.status);
    };

    updateAccountList(account_list) {
        account_list.forEach(account => {
            if (this.accounts[account.loginid]) {
                this.accounts[account.loginid].excluded_until = account.excluded_until || '';
                Object.keys(account).forEach(param => {
                    const param_to_set = param === 'country' ? 'residence' : param;
                    const value_to_set = typeof account[param] === 'undefined' ? '' : account[param];
                    if (param_to_set !== 'loginid') {
                        this.accounts[account.loginid][param_to_set] = value_to_set;
                    }
                });
            }
        });
    }

    /**
     * Switch to the given loginid account.
     *
     * @param {string} loginid
     */
    async switchAccount(loginid) {
        this.setPreSwitchAccount(true);
        this.setIsLoggingIn(true);
        this.root_store.notifications.removeNotifications(true);
        this.root_store.notifications.removeAllNotificationMessages(true);
        if (!this.is_virtual && /VRTC/.test(loginid)) {
            this.setPrevRealAccountLoginid(this.loginid);
        }
        this.setSwitched(loginid);
        this.responsePayoutCurrencies(await WS.authorized.payoutCurrencies());
    }

    async resetVirtualBalance() {
        this.root_store.notifications.removeNotificationByKey({ key: 'reset_virtual_balance' });
        this.root_store.notifications.removeNotificationMessage({
            key: 'reset_virtual_balance',
            should_show_again: true,
        });
        await WS.authorized.topupVirtual();
    }

    switchEndSignal() {
        this.switch_broadcast = false;
    }

    /**
     * We initially fetch things from local storage, and then do everything inside the store.
     */
    async init(login_new_user) {
        const search = window.location.search;
        const search_params = new URLSearchParams(search);
        const redirect_url = search_params?.get('redirect_url');
        const code_param = search_params?.get('code');
        const action_param = search_params?.get('action');

        this.setIsLoggingIn(true);
        const authorize_response = await this.setUserLogin(login_new_user);

        if (action_param === 'signup') {
            this.root_store.ui.setIsNewAccount();
        }

        if (search) {
            if (code_param && action_param) this.setVerificationCode(code_param, action_param);
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    // timeout is needed to get the token (code) from the URL before we hide it from the URL
                    // and from LiveChat that gets the URL from Window, particularly when initialized via HTML script on mobile
                    history.replaceState(null, null, window.location.search.replace(/&?code=[^&]*/i, ''));
                }, 0);
            });
        }

        this.setDeviceData();

        // On case of invalid token, no need to continue with additional api calls.
        if (authorize_response?.error) {
            await this.logout();
            this.root_store.common.setError(true, {
                header: authorize_response.error.message,
                message: localize('Please Log in'),
                should_show_refresh: false,
                redirect_label: localize('Log in'),
                redirectOnClick: () => redirectToLogin(false, getLanguage()),
            });
            this.setIsLoggingIn(false);
            this.setInitialized(false);
            this.setSwitched('');
            return false;
        }

        this.setLoginId(LocalStore.get('active_loginid'));
        this.setAccounts(LocalStore.getObject(storage_key));
        this.setSwitched('');
        const client = this.accounts[this.loginid];
        // If there is an authorize_response, it means it was the first login
        if (authorize_response) {
            // If this fails, it means the landing company check failed
            if (this.loginid === authorize_response.authorize.loginid) {
                BinarySocketGeneral.authorizeAccount(authorize_response);

                // Client comes back from oauth and logs in
                await this.root_store.rudderstack.identifyEvent();

                await this.root_store.gtm.pushDataLayer({
                    event: 'login',
                });
            } else {
                // So it will send an authorize with the accepted token, to be handled by socket-general
                await BinarySocket.authorize(client.token);
            }
            if (redirect_url) {
                const redirect_route = routes[redirect_url].length > 1 ? routes[redirect_url] : '';
                const has_action = ['payment_agent_withdraw', 'payment_withdraw', 'reset_password'].includes(
                    action_param
                );

                if (has_action) {
                    const query_string = filterUrlQuery(search, ['platform', 'code', 'action']);
                    if ([routes.cashier_withdrawal, routes.cashier_pa].includes(redirect_route)) {
                        // Set redirect path for cashier withdrawal and payment agent withdrawal (after getting PTA redirect_url)
                        window.location.replace(`/redirect?${query_string}`);
                    } else {
                        window.location.replace(`${redirect_route}/redirect?${query_string}`);
                    }
                } else {
                    window.location.replace(`${redirect_route}/?${filterUrlQuery(search, ['platform'])}`);
                }
            }
            runInAction(() => {
                this.is_populating_account_list = false;
            });
            const language = authorize_response.authorize.preferred_language;
            if (language !== 'EN' && language !== LocalStore.get(LANGUAGE_KEY)) {
                window.location.replace(urlForLanguage(authorize_response.authorize.preferred_language));
            }
            if (this.citizen) this.onSetCitizen(this.citizen);
            if (!this.is_virtual) {
                this.setPrevRealAccountLoginid(this.loginid);
            }
        }

        this.selectCurrency('');

        this.responsePayoutCurrencies(await WS.authorized.payoutCurrencies());
        if (this.is_logged_in) {
            WS.storage.mt5LoginList().then(this.responseMt5LoginList);
            WS.tradingServers(CFD_PLATFORMS.MT5).then(this.responseMT5TradingServers);

            WS.tradingPlatformAvailableAccounts(CFD_PLATFORMS.MT5).then(this.responseTradingPlatformAvailableAccounts);
            WS.tradingPlatformAccountsList(CFD_PLATFORMS.DXTRADE).then(this.responseTradingPlatformAccountsList);
            WS.tradingServers(CFD_PLATFORMS.DXTRADE).then(this.responseDxtradeTradingServers);

            this.responseStatement(
                await BinarySocket.send({
                    statement: 1,
                })
            );
            const account_settings = (await WS.authorized.cache.getSettings()).get_settings;
            if (account_settings) this.setPreferredLanguage(account_settings.preferred_language);
            await this.fetchResidenceList();
            await this.getTwoFAStatus();
            if (account_settings && !account_settings.residence) {
                this.root_store.ui.toggleSetResidenceModal(true);
            }

            await WS.authorized.cache.landingCompany(this.residence).then(this.responseLandingCompany);
            if (!this.is_virtual) await this.getLimits();
        } else {
            this.resetMt5AccountListPopulation();
        }
        this.responseWebsiteStatus(await WS.wait('website_status'));

        this.registerReactions();
        this.setIsLoggingIn(false);
        this.setInitialized(true);
        return true;
    }

    resetMt5AccountListPopulation() {
        this.is_populating_mt5_account_list = false;
    }

    responseWebsiteStatus(response) {
        this.website_status = response.website_status;
        if (this.website_status.message && this.website_status.message.length) {
            this.root_store.notifications.addNotificationMessage({
                key: 'maintenance',
                header: localize('Site is being updated'),
                message: localize(this.website_status.message),
                type: 'warning',
                is_persistent: true,
            });
        } else {
            this.root_store.notifications.removeNotificationMessage({
                key: 'maintenance',
            });
        }
    }

    responseLandingCompany(response) {
        this.is_landing_company_loaded = true;
        this.landing_companies = response.landing_company;
        this.setStandpoint(this.landing_companies);
        this.setRealityCheck();
    }

    setStandpoint(landing_companies) {
        if (!landing_companies) return;
        const { gaming_company, financial_company } = landing_companies;
        if (gaming_company?.shortcode) {
            this.standpoint = {
                ...this.standpoint,
                [gaming_company.shortcode]: !!gaming_company?.shortcode,
                gaming_company: gaming_company?.shortcode ?? false,
            };
        }
        if (financial_company?.shortcode) {
            this.standpoint = {
                ...this.standpoint,
                [financial_company.shortcode]: !!financial_company?.shortcode,
                financial_company: financial_company?.shortcode ?? false,
            };
        }
    }

    setRealityCheck() {
        this.has_reality_check = this.current_landing_company?.has_reality_check;
        // if page reloaded after reality check was submitted
        // use the submitted values to initiate rather than asking again
        if (
            this.has_reality_check &&
            this.reality_check_duration &&
            typeof this.reality_check_timeout === 'undefined'
        ) {
            this.setRealityCheckDuration(this.reality_check_duration);
        }
    }

    setLoginId(loginid) {
        this.loginid = loginid;
    }

    setAccounts(accounts) {
        this.accounts = accounts;
    }

    setSwitched(switched) {
        this.switched = switched;
    }

    setIsCfdPoiCompleted(is_completed) {
        this.is_cfd_poi_completed = is_completed;
    }

    /**
     * Check if account is disabled or not
     *
     * @param loginid
     * @returns {string}
     */
    isDisabled(loginid = this.loginid) {
        return this.getAccount(loginid).is_disabled;
    }

    /**
     * Get accounts token from given login id.
     *
     * @param loginid
     * @returns {string}
     */
    getToken(loginid = this.loginid) {
        return this.getAccount(loginid).token;
    }

    /**
     * Get account object from given login id
     *
     * @param loginid
     * @returns {object}
     */
    getAccount(loginid = this.loginid) {
        return this.accounts[loginid];
    }

    /**
     * Get information required by account switcher
     *
     * @param loginid
     * @returns {{loginid: *, is_virtual: (number|number|*), icon: string, title: *}}
     */
    getAccountInfo(loginid = this.loginid) {
        const account = this.getAccount(loginid);
        const currency = account.currency;
        const is_disabled = account.is_disabled;
        const is_virtual = account.is_virtual;
        const account_type = !is_virtual && currency ? currency : this.account_title;

        return {
            loginid,
            is_disabled,
            is_virtual,
            icon: account_type.toLowerCase(), // TODO: display the icon
            title: account_type.toLowerCase() === 'virtual' ? localize('DEMO') : account_type,
        };
    }

    setIsLoggingIn(bool) {
        this.is_logging_in = bool;
    }

    setPreSwitchAccount(is_pre_switch) {
        this.pre_switch_broadcast = is_pre_switch;
    }

    broadcastAccountChange() {
        this.switch_broadcast = true;
    }

    broadcastAccountChangeAfterAuthorize() {
        return BinarySocket.wait('authorize').then(() => {
            this.broadcastAccountChange();
        });
    }

    handleNotFoundLoginId() {
        // Logout if the switched_account doesn't belong to any loginid.
        this.root_store.notifications.addNotificationMessage({
            message: localize('Could not switch to default account.'),
            type: 'danger',
        });
        // request a logout
        this.logout();
    }

    isUnableToFindLoginId() {
        return !this.all_loginids.some(id => id !== this.switched) || this.switched === this.loginid;
    }

    async switchAccountHandler() {
        if (!this.switched || !this.switched.length || !this.getAccount(this.switched)?.token) {
            if (this.isUnableToFindLoginId()) {
                this.handleNotFoundLoginId();
                return;
            }

            // Send a toast message to let the user know we can't switch his account.
            this.root_store.notifications.addNotificationMessage({
                message: localize('Switching to default account.'),
                type: 'info',
            });

            // switch to default account.
            this.switchAccount(this.all_loginids[0]);
            await this.switchAccountHandler();
            return;
        }

        runInAction(() => (this.is_switching = true));
        const from_login_id = this.loginid;
        this.resetLocalStorageValues(this.switched);
        SocketCache.clear();

        // if real to virtual --> switch to blue
        // if virtual to real --> switch to green
        // else keep the existing connection
        const should_switch_socket_connection = this.is_virtual || /VRTC/.test(from_login_id);

        if (should_switch_socket_connection) {
            BinarySocket.closeAndOpenNewConnection();
            await BinarySocket.wait('authorize');
        } else {
            await WS.forgetAll('balance');
            await BinarySocket.authorize(this.getToken());
        }
        if (this.root_store.common.has_error) this.root_store.common.setError(false, null);
        sessionStorage.setItem('active_tab', '1');

        // set local storage
        this.root_store.gtm.setLoginFlag();

        await this.init();

        // broadcastAccountChange is already called after new connection is authorized
        if (!should_switch_socket_connection) this.broadcastAccountChange();

        if (!this.is_virtual) this.getLimits();

        runInAction(() => (this.is_switching = false));
    }

    registerReactions() {
        // Switch account reactions.
        when(
            () => this.switched,
            () => {
                // Remove real account notifications upon switching to virtual
                if (this.accounts[this.switched]?.is_virtual) {
                    this.root_store.notifications.removeNotifications(true);
                    this.root_store.notifications.removeAllNotificationMessages();
                }

                this.switchAccountHandler();
            }
        );
    }

    setBalanceActiveAccount(obj_balance) {
        if (this.accounts[obj_balance?.loginid] && obj_balance.loginid === this.loginid) {
            this.accounts[obj_balance.loginid].balance = obj_balance.balance;
            if (this.accounts[obj_balance.loginid].is_virtual) {
                this.root_store.notifications.resetVirtualBalanceNotification(obj_balance.loginid);
            }
            this.resetLocalStorageValues(this.loginid);
        }
    }

    // This callback is used for balance: all
    // Balance: all is very slow
    // --> so we keep a separate balance subscription for the active account
    setBalanceOtherAccounts(obj_balance) {
        // Balance subscription response received when mt5 transfer is in progress should be ignored.
        // After mt5 transfer is done, `balanceAll` is requested along with `mt5LoginList` in order to update the correct balance.
        if (this.root_store.modules?.cashier?.account_transfer?.is_mt5_transfer_in_progress) return;

        // Only the first response of balance:all will include all accounts
        // subsequent requests will be single account balance updates
        if (this.accounts[obj_balance?.loginid] && !obj_balance.accounts && obj_balance.loginid !== this.loginid) {
            this.accounts[obj_balance.loginid].balance = obj_balance.balance;
        }

        if (this.accounts[obj_balance?.loginid] && obj_balance.accounts) {
            Object.keys(obj_balance.accounts).forEach(account_id => {
                const is_active_account_id = account_id === this.loginid;

                if (!is_active_account_id && this.accounts[account_id]) {
                    this.accounts[account_id].balance = +obj_balance.accounts[account_id].balance;
                }
            });
        }

        if (obj_balance?.total) {
            const total_real = getPropertyValue(obj_balance, ['total', 'deriv']);
            const total_mt5 = getPropertyValue(obj_balance, ['total', CFD_PLATFORMS.MT5]);
            const total_dxtrade = getPropertyValue(obj_balance, ['total', CFD_PLATFORMS.DXTRADE]);
            // in API streaming responses MT5 balance is not re-sent, so we need to reuse the first mt5 total sent
            const has_mt5 = !isEmptyObject(total_mt5);
            const has_dxtrade = !isEmptyObject(total_dxtrade);
            this.obj_total_balance = {
                amount_real: +total_real.amount,
                amount_mt5: has_mt5 ? +total_mt5.amount : this.obj_total_balance.amount_mt5,
                amount_dxtrade: has_dxtrade ? +total_dxtrade.amount : this.obj_total_balance.amount_dxtrade,
                currency: total_real.currency,
            };
        }
    }

    selectCurrency(value) {
        this.selected_currency = value;
    }

    setResidence(residence) {
        this.accounts[this.loginid].residence = residence;
    }

    setCitizen(citizen) {
        this.citizen = citizen;
    }

    setEmail(email) {
        this.accounts[this.loginid].email = email;
        this.email = email;
    }

    setAccountSettings(settings) {
        this.account_settings = settings;
        this.is_account_setting_loaded = true;
    }

    setAccountStatus(status) {
        this.account_status = status;
    }

    async updateAccountStatus() {
        const account_status_response = await WS.authorized.getAccountStatus();
        if (!account_status_response.error) {
            this.setAccountStatus(account_status_response.get_account_status);
        }
    }

    setInitialized(is_initialized) {
        this.initialized_broadcast = is_initialized;
    }

    cleanUp() {
        this.root_store.gtm.pushDataLayer({
            event: 'log_out',
        });
        this.loginid = null;
        this.user_id = null;
        this.upgrade_info = undefined;
        this.accounts = {};
        this.mt5_login_list = [];
        this.dxtrade_accounts_list = [];
        this.landing_companies = {};
        localStorage.removeItem('readScamMessage');
        localStorage.removeItem('isNewAccount');
        localStorage.setItem('active_loginid', this.loginid);
        localStorage.setItem('client.accounts', JSON.stringify(this.accounts));

        runInAction(async () => {
            this.responsePayoutCurrencies(await WS.payoutCurrencies());
        });
        this.root_store.notifications.removeAllNotificationMessages(true);
        this.syncWithLegacyPlatforms(this.loginid, this.accounts);
        this.cleanupRealityCheck();
    }

    async logout() {
        // TODO: [add-client-action] - Move logout functionality to client store
        const response = await requestLogout();

        if (response?.logout === 1) {
            this.cleanUp();

            this.root_store.rudderstack.reset();
            this.setLogout(true);
        }

        return response;
    }

    setLogout(is_logged_out) {
        this.has_logged_out = is_logged_out;
        if (this.root_store.common.has_error) this.root_store.common.setError(false, null);
    }

    /* eslint-disable */
    storeClientAccounts(obj_params, account_list) {
        // store consistent names with other API calls
        // API_V4: send consistent names
        const map_names = {
            country: 'residence',
            landing_company_name: 'landing_company_shortcode',
        };
        const client_object = {};
        let active_loginid;

        if (obj_params.selected_acct) {
            active_loginid = obj_params.selected_acct;
        }

        account_list.forEach(function (account) {
            Object.keys(account).forEach(function (param) {
                if (param === 'loginid') {
                    if (!active_loginid && !account.is_disabled) {
                        if (!account.is_virtual) {
                            active_loginid = account[param];
                        } else if (account.is_virtual) {
                            // TODO: [only_virtual] remove this to stop logging non-SVG clients into virtual
                            active_loginid = account[param];
                        }
                    }
                } else {
                    const param_to_set = map_names[param] || param;
                    const value_to_set = typeof account[param] === 'undefined' ? '' : account[param];
                    if (!(account.loginid in client_object)) {
                        client_object[account.loginid] = {};
                    }
                    client_object[account.loginid][param_to_set] = value_to_set;
                }
            });
        });

        let i = 1;
        while (obj_params[`acct${i}`]) {
            const loginid = obj_params[`acct${i}`];
            const token = obj_params[`token${i}`];
            if (loginid && token) {
                client_object[loginid].token = token;
            }
            i++;
        }

        // if didn't find any login ID that matched the above condition
        // or the selected one doesn't have a token, set the first one
        if (!active_loginid || !client_object[active_loginid].token) {
            active_loginid = obj_params.acct1;
        }

        // TODO: send login flag to GTM if needed
        if (active_loginid && Object.keys(client_object).length) {
            localStorage.setItem('active_loginid', active_loginid);
            localStorage.setItem('client.accounts', JSON.stringify(client_object));
            this.syncWithLegacyPlatforms(active_loginid, this.accounts);
        }
    }

    async setUserLogin(login_new_user) {
        // login_new_user is populated only on virtual sign-up
        let obj_params = {};
        const search = window.location.search;

        if (search) {
            let search_params = new URLSearchParams(window.location.search);

            search_params.forEach((value, key) => {
                const account_keys = ['acct', 'token', 'cur'];
                const is_account_param = account_keys.some(
                    account_key => key?.includes(account_key) && key !== 'affiliate_token'
                );

                if (is_account_param) {
                    obj_params[key] = value;
                }
            });

            // delete account query params - but keep other query params (e.g. utm)
            Object.keys(obj_params).forEach(key => search_params.delete(key));
            search_params.delete('state'); // remove unused state= query string
            search_params = search_params?.toString();
            const search_param_without_account = search_params ? `?${search_params}` : '/';
            history.replaceState(null, null, `${search_param_without_account}${window.location.hash}`);
        }

        const is_client_logging_in = login_new_user ? login_new_user.token1 : obj_params.token1;

        if (is_client_logging_in) {
            const is_pre_appstore = !!this.account_settings.trading_hub;
            const redirect_url = sessionStorage.getItem('redirect_url');
            if (
                is_pre_appstore === 'true' &&
                redirect_url?.endsWith('/') &&
                (isTestLink() || isProduction() || isLocal() || isStaging())
            ) {
                window.history.replaceState({}, document.title, '/appstore/traders-hub');
            } else {
                window.history.replaceState({}, document.title, sessionStorage.getItem('redirect_url'));
            }
            SocketCache.clear();
            // is_populating_account_list is used for socket general to know not to filter the first-time logins
            this.is_populating_account_list = true;
            const authorize_response = await BinarySocket.authorize(is_client_logging_in);

            if (login_new_user) {
                // overwrite obj_params if login is for new virtual account
                obj_params = login_new_user;
            }

            if (authorize_response.error) {
                return authorize_response;
            }

            runInAction(() => {
                const account_list = (authorize_response.authorize || {}).account_list;
                this.upgradeable_landing_companies = [...new Set(authorize_response.upgradeable_landing_companies)];

                if (this.canStoreClientAccounts(obj_params, account_list)) {
                    this.storeClientAccounts(obj_params, account_list);
                } else {
                    // Since there is no API error, we have to add this to manually trigger checks in other parts of the code.
                    authorize_response.error = {
                        code: 'MismatchedAcct',
                        message: localize('Invalid token'),
                    };
                }
            });
            return authorize_response;
        }
    }

    canStoreClientAccounts(obj_params, account_list) {
        const is_ready_to_process = account_list && isEmptyObject(this.accounts);
        const accts = Object.keys(obj_params).filter(value => /^acct./.test(value));

        const is_cross_checked = accts.every(acct =>
            account_list.some(account => account.loginid === obj_params[acct])
        );

        return is_ready_to_process && is_cross_checked;
    }

    setVerificationCode(code, action) {
        this.verification_code[action] = code;
        if (code) {
            LocalStore.set(`verification_code.${action}`, code);
        } else {
            LocalStore.remove(`verification_code.${action}`);
        }
        if (action === 'signup') {
            // TODO: add await if error handling needs to happen before AccountSignup is initialised
            this.fetchResidenceList(); // Prefetch for use in account signup process
        }
    }

    setNewEmail(email, action) {
        this.new_email[action] = email;
        if (email) {
            LocalStore.set(`new_email.${action}`, email);
        } else {
            LocalStore.remove(`new_email.${action}`);
        }
    }

    setDeviceData() {
        setDeviceDataCookie('signup_device', isDesktopOs() ? 'desktop' : 'mobile');
    }

    getSignupParams() {
        const param_list = [
            'date_first_contact',
            'signup_device',
            'gclid_url',
            'utm_source',
            'utm_ad_id',
            'utm_adgroup_id',
            'utm_adrollclk_id',
            'utm_campaign_id',
            'utm_campaign',
            'utm_fbcl_id',
            'utm_gl_client_id',
            'utm_msclk_id',
            'utm_medium',
            'utm_term',
            'utm_content',
            'affiliate_token',
        ];
        const signup_params = {};
        const url_params = new URLSearchParams(window.location.search);

        param_list.forEach(key => {
            if (url_params.get(key)) {
                signup_params[key] = url_params.get(key);
            }
        });

        return signup_params;
    }

    onSetResidence({ residence }, cb) {
        if (!residence) return;
        WS.setSettings({
            residence,
        }).then(async response => {
            if (response.error) {
                cb(response.error.message);
            } else {
                await this.setResidence(residence);
                await WS.authorized.storage
                    .landingCompany(this.accounts[this.loginid].residence)
                    .then(this.responseLandingCompany);
                await WS.authorized.storage.getSettings().then(async response => {
                    this.setAccountSettings(response.get_settings);
                });
                runInAction(async () => {
                    await BinarySocket.authorize(this.getToken()).then(() => {
                        runInAction(() => (this.upgrade_info = this.getBasicUpgradeInfo()));
                    });
                });
                cb();
            }
        });
    }

    onSetCitizen(citizen) {
        if (!citizen) return;
        WS.setSettings({
            set_settings: 1,
            citizen,
        });
    }

    onSignup({ citizenship, password, residence }, cb) {
        if (!this.verification_code.signup || !password || !residence || !citizenship) return;
        WS.newAccountVirtual(this.verification_code.signup, password, residence, this.getSignupParams()).then(
            async response => {
                if (response.error) {
                    cb(response.error.message);
                } else {
                    cb();
                    // Initialize client store with new user login
                    const { client_id, currency, oauth_token } = response.new_account_virtual;
                    await this.setCitizen(citizenship);
                    await this.switchToNewlyCreatedAccount(client_id, oauth_token, currency);
                    // GTM Signup event
                    this.root_store.gtm.pushDataLayer({
                        event: 'virtual_signup',
                    });
                }
            }
        );
    }

    async switchToNewlyCreatedAccount(client_id, oauth_token, currency) {
        this.setPreSwitchAccount(true);
        const new_user_login = {
            acct1: client_id,
            token1: oauth_token,
            curr1: currency,
        };
        await this.init(new_user_login);
        this.broadcastAccountChange();
    }

    fetchAccountSettings() {
        return new Promise(resolve => {
            WS.authorized.storage.getSettings().then(response => {
                this.setAccountSettings(response.get_settings);
                resolve(response);
            });
        });
    }

    fetchResidenceList() {
        return new Promise(resolve => {
            WS.storage.residenceList().then(response => {
                this.setResidenceList(response);
                resolve(response);
            });
        });
    }

    setResidenceList(residence_list_response) {
        this.residence_list = residence_list_response.residence_list || [];
    }

    fetchStatesList() {
        return new Promise((resolve, reject) => {
            WS.authorized.storage
                .statesList({
                    states_list: this.accounts[this.loginid].residence,
                })
                .then(response => {
                    if (response.error) {
                        reject(response.error);
                    } else {
                        runInAction(() => {
                            this.states_list = response.states_list || [];
                        });
                    }
                    resolve(response);
                });
        });
    }

    resetMt5ListPopulatedState() {
        this.is_mt5_account_list_updated = false;
        this.is_populating_mt5_account_list = true;
        this.mt5_login_list_error = null;
    }

    async updateMt5LoginList() {
        if (this.is_logged_in && !this.is_mt5_account_list_updated && !this.is_populating_mt5_account_list) {
            const response = await WS.mt5LoginList();
            this.responseMt5LoginList(response);
        }
    }

    responseMT5TradingServers(response) {
        if (response.error) {
            this.mt5_trading_servers = [];
            return;
        }
        this.mt5_trading_servers = response.trading_servers;
    }

    responseMt5LoginList(response) {
        this.is_populating_mt5_account_list = false;
        this.is_mt5_account_list_updated = true;
        this.mt5_login_list_error = null;
        /** we need to update mt5_login_list on mount of account switcher
         *  to get the new MT5 balances (balance does not stream for MT5 accounts due to API restriction)
         *  but to avoid spamming this call since the rate limit is strict
         *  keep the current mt5_login_list response cached for one minute
         *  after one minute consider it outdated and allow re-requesting it */
        setTimeout(() => {
            this.is_mt5_account_list_updated = false;
        }, 60000);

        if (!response.error) {
            this.mt5_login_list = response.mt5_login_list.map(account => {
                const display_login = (account.error ? account.error.details.login : account.login).replace(
                    /^(MT[DR]?)/i,
                    ''
                );
                if (account.error) {
                    const { account_type, server } = account.error.details;
                    this.setMT5DisabledSignupTypes({
                        [account_type]: true,
                    });
                    return {
                        account_type,
                        display_login,
                        has_error: true,
                        server,
                    };
                }
                return {
                    ...account,
                    display_login,
                };
            });
        } else {
            this.mt5_login_list_error = response.error;
        }
    }

    responseDxtradeTradingServers(response) {
        if (response.error) {
            this.dxtrade_trading_servers = [];
            return;
        }
        this.dxtrade_trading_servers = response.trading_servers;

        this.dxtrade_trading_servers.forEach(trading_server => {
            const { account_type, disabled } = trading_server;
            if (disabled) {
                this.setCFDDisabledSignupTypes(CFD_PLATFORMS.DXTRADE, {
                    [account_type]: true,
                });
            }
        });
    }

    responseTradingPlatformAvailableAccounts(response) {
        if (!response.error) {
            this.trading_platform_available_accounts = response.trading_platform_available_accounts;
        }
    }

    responseTradingPlatformAccountsList(response) {
        const { platform } = response.echo_req || {};

        this[`is_populating_${platform}_account_list`] = false;
        this[`${platform}_accounts_list_error`] = null;

        if (!response.error) {
            this[`${platform}_accounts_list`] = response.trading_platform_accounts.map(account => {
                const display_login = account.error ? account.error.details.account_id : account.account_id;
                if (account.error) {
                    const { account_type, server } = account.error.details;
                    if (platform === CFD_PLATFORMS.DXTRADE) {
                        this.setCFDDisabledSignupTypes(platform, {
                            [account_type]: true,
                        });
                    }
                    return {
                        account_type,
                        display_login,
                        has_error: true,
                        server,
                    };
                }
                return {
                    ...account,
                    display_login,
                };
            });
        } else {
            this[`${platform}_accounts_list_error`] = response.error;
        }
    }

    responseStatement(response) {
        if (!response.error) {
            this.statement = response.statement;
        }
    }

    getChangeableFields() {
        const get_settings =
            Object.keys(this.account_settings).length === 0
                ? WS.authorized.storage.getSettings()
                : this.account_settings;

        const readonly_fields = [...get_settings.immutable_fields, ...['immutable_fields', 'email', 'password']];
        return Object.keys(get_settings).filter(field => !readonly_fields.includes(field));
    }

    syncWithLegacyPlatforms(active_loginid, client_accounts) {
        const smartTrader = {};
        const binaryBot = {};

        smartTrader.iframe = document.getElementById('localstorage-sync');
        binaryBot.iframe = document.getElementById('localstorage-sync__bot');
        smartTrader.origin = getUrlSmartTrader();
        binaryBot.origin = getUrlBinaryBot();

        [smartTrader, binaryBot].forEach(platform => {
            if (platform.iframe) {
                // Keep client.accounts in sync (in case user wasn't logged in).
                platform.iframe.contentWindow.postMessage(
                    {
                        key: 'client.accounts',
                        value: JSON.stringify(client_accounts),
                    },
                    platform.origin
                );
                platform.iframe.contentWindow.postMessage(
                    {
                        key: 'active_loginid',
                        value: active_loginid,
                    },
                    platform.origin
                );
            }
        });
    }

    get is_high_risk() {
        if (isEmptyObject(this.account_status)) return false;
        return this.account_status.risk_classification === 'high';
    }

    get has_residence() {
        return !!this.accounts[this.loginid]?.residence;
    }

    setVisibilityRealityCheck(is_visible) {
        // if reality check timeout has been set, don't make it visible until it runs out
        if (is_visible && typeof this.reality_check_timeout === 'number') {
            return;
        }
        this.is_reality_check_dismissed = !is_visible;
        // store in localstorage to keep track of across tabs/on refresh
        LocalStore.set('reality_check_dismissed', !is_visible);
    }

    clearRealityCheckTimeout() {
        clearTimeout(this.reality_check_timeout);
        this.reality_check_timeout = undefined;
    }

    setRealityCheckDuration(duration) {
        this.reality_check_dur = +duration;
        this.clearRealityCheckTimeout();
        // store in localstorage to keep track of across tabs/on refresh
        LocalStore.set('reality_check_duration', +duration);
        this.reality_check_timeout = setTimeout(() => {
            // set reality_check_timeout to undefined
            this.clearRealityCheckTimeout();
            // after this duration passes, show the summary pop up
            this.setVisibilityRealityCheck(1);
        }, +duration * 60 * 1000);
    }

    cleanupRealityCheck() {
        this.has_reality_check = false;
        this.is_reality_check_dismissed = undefined;
        this.reality_check_dur = undefined;
        this.clearRealityCheckTimeout();
        LocalStore.remove('reality_check_duration');
        LocalStore.remove('reality_check_dismissed');
    }

    fetchFinancialAssessment() {
        return new Promise(async resolve => {
            const { get_financial_assessment } = await WS.authorized.storage.getFinancialAssessment();

            runInAction(() => (this.financial_assessment = get_financial_assessment));
            resolve(get_financial_assessment);
        });
    }

    async setFinancialAndTradingAssessment(payload) {
        const response = await WS.setFinancialAndTradingAssessment(payload);
        return response;
    }

    setTwoFAStatus(status) {
        this.has_enabled_two_fa = status;
    }

    getTwoFAStatus() {
        return new Promise(resolve => {
            WS.authorized.accountSecurity({ account_security: 1, totp_action: 'status' }).then(response => {
                if (response.error) {
                    resolve(response.error);
                } else {
                    const is_enabled = !!getPropertyValue(response, ['account_security', 'totp', 'is_enabled']);
                    this.setTwoFAStatus(is_enabled);
                    resolve(is_enabled);
                }
            });
        });
    }

    setPrevRealAccountLoginid = logind => {
        this.prev_real_account_loginid = logind;
    };

    async switchAccountHandlerForAppstore(tab_current_account_type) {
        if (tab_current_account_type === 'demo' && this.hasAnyRealAccount()) {
            if (this.prev_real_account_loginid) {
                await this.switchAccount(this.prev_real_account_loginid);
            } else {
                await this.switchAccount(
                    this.account_list.find(acc => acc.is_virtual === 0 && !acc.is_disabled).loginid
                );
            }
        } else if (tab_current_account_type === 'real') {
            this.setPrevRealAccountLoginid(this.loginid);
            await this.switchAccount(this.virtual_account_loginid);
        }
    }

    setIsPreAppStore(is_pre_appstore) {
        const trading_hub = is_pre_appstore ? 1 : 0;
        WS.setSettings({
            set_settings: 1,
            trading_hub,
        }).then(response => {
            if (!response.error) {
                this.account_settings = { ...this.account_settings, trading_hub };
            }
        });
    }
}
/* eslint-enable */
