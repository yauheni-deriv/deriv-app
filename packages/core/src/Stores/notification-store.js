import { StaticUrl } from '@deriv/components';
import {
    daysSince,
    formatDate,
    getPathname,
    getPlatformSettings,
    getStaticUrl,
    getUrlBase,
    isCryptocurrency,
    isEmptyObject,
    isMobile,
    isMultiplierContract,
    LocalStore,
    platform_name,
    routes,
    unique,
} from '@deriv/shared';
import { localize, Localize } from '@deriv/translations';
import { BinaryLink } from 'App/Components/Routes';
import { action, computed, observable, reaction, makeObservable } from 'mobx';
import React from 'react';
import { WS } from 'Services';
import { sortNotifications, sortNotificationsMobile } from '../App/Components/Elements/NotificationMessage/constants';
import BaseStore from './base-store';
import {
    excluded_notifications,
    getCashierValidations,
    getStatusValidations,
    hasMissingRequiredField,
} from './Helpers/client-notifications';

export default class NotificationStore extends BaseStore {
    is_notifications_visible = false;
    notifications = [];
    notification_messages = [];
    marked_notifications = [];
    push_notifications = [];
    client_notifications = {};
    should_show_popups = true;
    p2p_order_props = {};

    constructor(root_store) {
        super({ root_store });

        makeObservable(this, {
            is_notifications_visible: observable,
            notifications: observable,
            notification_messages: observable,
            marked_notifications: observable,
            push_notifications: observable,
            client_notifications: observable,
            should_show_popups: observable,
            p2p_order_props: observable,
            custom_notifications: computed,
            addNotificationBar: action.bound,
            addNotificationMessage: action.bound,
            addNotificationMessageByKey: action.bound,
            showCompletedOrderNotification: action.bound,
            addVerificationNotifications: action.bound,
            filterNotificationMessages: action.bound,
            handleClientNotifications: action.bound,
            markNotificationMessage: action.bound,
            refreshNotifications: action.bound,
            removeAllNotificationMessages: action.bound,
            removeNotifications: action.bound,
            removeNotificationByKey: action.bound,
            removeNotificationMessage: action.bound,
            removeNotificationMessageByKey: action.bound,
            resetVirtualBalanceNotification: action.bound,
            setClientNotifications: action.bound,
            setP2POrderProps: action.bound,
            setShouldShowPopups: action.bound,
            toggleNotificationsModal: action.bound,
            unmarkNotificationMessage: action.bound,
            updateNotifications: action.bound,
        });

        reaction(
            () => root_store.common.app_routing_history.map(i => i.pathname),
            () => {
                this.filterNotificationMessages();
            }
        );
        reaction(
            () => [
                root_store.client.account_settings,
                root_store.client.account_status,
                root_store.client.landing_companies,
                root_store.modules?.cashier?.general_store?.is_p2p_visible,
                root_store.common?.selected_contract_type,
                root_store.client.is_eu,
                root_store.client.has_enabled_two_fa,
                this.p2p_order_props.order_id,
            ],
            async () => {
                if (
                    root_store.client.is_logged_in &&
                    Object.keys(root_store.client.account_status).length > 0 &&
                    Object.keys(root_store.client.landing_companies).length > 0
                )
                    await root_store.modules?.cashier?.general_store?.getP2pCompletedOrders();

                if (
                    !root_store.client.is_logged_in ||
                    (Object.keys(root_store.client.account_status).length > 0 &&
                        Object.keys(root_store.client.landing_companies).length > 0)
                ) {
                    this.removeNotifications();
                    this.removeAllNotificationMessages();
                    this.setClientNotifications();
                    this.handleClientNotifications();
                    this.filterNotificationMessages();
                }
            }
        );
    }

    get custom_notifications() {
        const { has_malta_account, can_have_mlt_account, is_uk } = this.root_store.client;
        const notification_content = {
            mx_mlt_notification: {
                header: () => {
                    if (has_malta_account || can_have_mlt_account) {
                        return localize('Your Options account is scheduled to be closed');
                    } else if (is_uk) {
                        return localize('Your Gaming account is scheduled to be closed');
                    }
                    return localize('Your account is scheduled to be closed');
                },
                main: () => {
                    if (has_malta_account || can_have_mlt_account) {
                        return localize('Withdraw all funds from your Options account.');
                    } else if (is_uk) {
                        return localize('Please withdraw all your funds as soon as possible.');
                    }
                    return localize('Please proceed to withdraw your funds before 30 November 2021.');
                },
            },
        };
        return notification_content;
    }

    addNotificationBar(message) {
        this.push_notifications.push(message);
        this.push_notifications = unique(this.push_notifications, 'msg_type');
    }

    addNotificationMessage(notification) {
        if (!notification) return;
        if (!this.notification_messages.find(item => item.key === notification.key)) {
            // Remove notification messages if it was already closed by user and exists in LocalStore
            const active_loginid = LocalStore.get('active_loginid');
            const messages = LocalStore.getObject('notification_messages');

            if (active_loginid) {
                // Check if is existing message to remove already closed messages stored in LocalStore
                const is_existing_message = Array.isArray(messages[active_loginid])
                    ? messages[active_loginid].includes(notification.key)
                    : false;

                if (is_existing_message) {
                    this.markNotificationMessage({ key: notification.key });
                }

                const sortFn = isMobile() ? sortNotificationsMobile : sortNotifications;
                this.notification_messages = [...this.notification_messages, notification].sort(sortFn);

                if (!excluded_notifications.includes(notification.key)) {
                    this.updateNotifications(this.notification_messages);
                }
            }
        }
    }

    addNotificationMessageByKey(key) {
        if (key) this.addNotificationMessage(this.client_notifications[key]);
    }

    addVerificationNotifications(identity, document, has_restricted_mt5_account) {
        //identity
        if (identity.status === 'verified') {
            this.addNotificationMessage(this.client_notifications.poi_verified);
        } else if (!['none', 'pending'].includes(identity.status)) {
            this.addNotificationMessage(this.client_notifications.poi_failed);
        }

        // document

        if (document.status === 'verified') {
            this.addNotificationMessage(this.client_notifications.poa_verified);
        } else if (has_restricted_mt5_account) {
            if (document.status === 'pending') {
                this.addNotificationMessage(this.client_notifications.resticted_mt5_with_pending_poa);
            } else {
                this.addNotificationMessage(this.client_notifications.resticted_mt5_with_failed_poa);
            }
        } else if (!['none', 'pending'].includes(document.status)) {
            this.addNotificationMessage(this.client_notifications.poa_failed);
        }
    }

    filterNotificationMessages() {
        if (LocalStore.get('active_loginid') !== 'null')
            this.resetVirtualBalanceNotification(LocalStore.get('active_loginid'));

        if (window.location.pathname !== routes.cashier_p2p) {
            this.notification_messages = this.notification_messages.filter(notification => {
                if (notification.platform === undefined || notification.platform.includes(getPathname())) {
                    return true;
                } else if (!notification.platform.includes(getPathname())) {
                    if (notification.is_disposable) {
                        this.removeNotificationMessage({
                            key: notification.key,
                            should_show_again: notification.should_show_again,
                        });
                        this.removeNotificationByKey({ key: notification.key });
                    }
                }

                return false;
            });
        }
    }

    async handleClientNotifications() {
        const {
            account_settings,
            account_status,
            account_open_date,
            accounts,
            has_iom_account,
            has_malta_account,
            isAccountOfType,
            is_eu,
            is_identity_verification_needed,
            is_logged_in,
            is_tnc_needed,
            is_uk,
            landing_company_shortcode,
            loginid,
            obj_total_balance,
            website_status,
            has_enabled_two_fa,
            is_poi_dob_mismatch,
            is_risky_client,
            is_financial_information_incomplete,
            has_restricted_mt5_account,
        } = this.root_store.client;
        const { is_p2p_visible, p2p_completed_orders } = this.root_store.modules.cashier.general_store;
        const { is_10k_withdrawal_limit_reached } = this.root_store.modules.cashier.withdraw;
        const { current_language, selected_contract_type } = this.root_store.common;
        const malta_account = landing_company_shortcode === 'maltainvest';
        const virtual_account = landing_company_shortcode === 'virtual';
        const is_website_up = website_status.site_status === 'up';
        const has_trustpilot = LocalStore.getObject('notification_messages')[loginid]?.includes(
            this.client_notifications.trustpilot.key
        );
        const has_acuity_mt5_download = LocalStore.getObject('notification_messages')[loginid]?.includes(
            this.client_notifications.acuity_mt5_download.key
        );
        let has_missing_required_field;

        if (is_logged_in) {
            if (isEmptyObject(account_status)) return;
            const {
                authentication: { document, identity, needs_verification },
                status,
                cashier_validation,
            } = account_status;

            const hidden_close_account_notification =
                parseInt(localStorage.getItem('hide_close_mx_mlt_account_notification')) === 1;
            const {
                cashier_locked,
                deposit_locked,
                document_needs_action,
                mt5_withdrawal_locked,
                personal_details_locked,
                poi_name_mismatch,
                withdrawal_locked,
            } = getStatusValidations(status || []);

            if (!has_enabled_two_fa && obj_total_balance.amount_real > 0) {
                this.addNotificationMessage(this.client_notifications.two_f_a);
            } else {
                this.removeNotificationByKey({ key: this.client_notifications.two_f_a.key });
            }

            if (is_risky_client && is_financial_information_incomplete) {
                this.addNotificationMessage(this.client_notifications.risk_client);
            } else {
                this.removeNotificationByKey({ key: this.client_notifications.risk_client });
            }

            if (is_poi_dob_mismatch) {
                this.addNotificationMessage(this.client_notifications.poi_dob_mismatch);
            } else {
                this.removeNotificationByKey({ key: this.client_notifications.poi_dob_mismatch });
            }

            if (loginid !== LocalStore.get('active_loginid')) return;

            if (is_uk && malta_account) {
                this.addNotificationMessage(this.client_notifications.close_uk_account);
            }

            if (
                (has_iom_account || has_malta_account) &&
                (!malta_account || !virtual_account) &&
                !hidden_close_account_notification
            ) {
                this.addNotificationMessage(this.client_notifications.close_mx_mlt_account);
            }

            // Acuity notification is available for both Demo and Real desktop clients
            this.addNotificationMessage(this.client_notifications.acuity);
            if (!has_acuity_mt5_download && getPathname() === platform_name.DMT5) {
                this.addNotificationMessage(this.client_notifications.acuity_mt5_download);
            }

            const client = accounts[loginid];
            if (client && !client.is_virtual) {
                if (isEmptyObject(account_status)) return;
                if (loginid !== LocalStore.get('active_loginid')) return;

                const {
                    cashier_locked_status,
                    documents_expired,
                    FinancialAssessmentRequired,
                    is_virtual,
                    no_residence,
                    no_withdrawal_or_trading_status,
                    SelfExclusion,
                    system_maintenance,
                    unwelcome_status,
                    withdrawal_locked_status,
                    ASK_AUTHENTICATE,
                    ASK_CURRENCY,
                    ASK_FINANCIAL_RISK_APPROVAL,
                    ASK_FIX_DETAILS,
                    ASK_SELF_EXCLUSION_MAX_TURNOVER_SET,
                    ASK_TIN_INFORMATION,
                    ASK_UK_FUNDS_PROTECTION,
                } = cashier_validation ? getCashierValidations(cashier_validation) : {};

                const needs_poa =
                    is_10k_withdrawal_limit_reached &&
                    (needs_verification.includes('document') || document?.status !== 'verified');
                const needs_poi = is_10k_withdrawal_limit_reached && identity?.status !== 'verified';
                const onfido_submissions_left = identity?.services.onfido.submissions_left;

                this.addVerificationNotifications(identity, document, has_restricted_mt5_account);

                if (needs_poa) this.addNotificationMessage(this.client_notifications.needs_poa);
                if (needs_poi) this.addNotificationMessage(this.client_notifications.needs_poi);

                if (
                    poi_name_mismatch &&
                    identity?.services.onfido.last_rejected &&
                    !personal_details_locked &&
                    onfido_submissions_left > 0
                ) {
                    this.addNotificationMessage(this.client_notifications.poi_name_mismatch);
                }

                if (system_maintenance) {
                    this.setClientNotifications(client);
                    this.addNotificationMessage(
                        this.client_notifications.system_maintenance(withdrawal_locked, deposit_locked)
                    );
                } else if (cashier_locked) {
                    if (is_virtual) {
                        this.addNotificationMessage(this.client_notifications.is_virtual);
                    } else if (no_residence) {
                        this.addNotificationMessage(this.client_notifications.no_residence);
                    } else if (documents_expired) {
                        this.addNotificationMessage(this.client_notifications.documents_expired);
                    } else if (cashier_locked_status) {
                        this.addNotificationMessage(this.client_notifications.cashier_locked);
                    } else if (ASK_CURRENCY) {
                        this.addNotificationMessage(this.client_notifications.currency);
                    } else if (ASK_AUTHENTICATE && is_identity_verification_needed) {
                        this.addNotificationMessage(this.client_notifications.identity);
                    } else if (ASK_AUTHENTICATE) {
                        this.addNotificationMessage(this.client_notifications.authenticate);
                    } else if (isAccountOfType('financial') && ASK_FINANCIAL_RISK_APPROVAL) {
                        this.addNotificationMessage(this.client_notifications.ask_financial_risk_approval);
                    } else if (FinancialAssessmentRequired) {
                        this.addNotificationMessage(this.client_notifications.risk);
                    } else if (isAccountOfType('financial') && ASK_TIN_INFORMATION) {
                        this.addNotificationMessage(this.client_notifications.tax);
                    } else if (ASK_UK_FUNDS_PROTECTION) {
                        this.addNotificationMessage(this.client_notifications.ask_uk_funds_protection);
                    } else if (ASK_SELF_EXCLUSION_MAX_TURNOVER_SET) {
                        this.addNotificationMessage(this.client_notifications.max_turnover_limit_not_set);
                    } else if (ASK_FIX_DETAILS) {
                        this.addNotificationMessage(
                            this.client_notifications.required_fields(withdrawal_locked, deposit_locked)
                        );
                    } else {
                        this.addNotificationMessage(this.client_notifications.cashier_locked);
                    }
                } else {
                    if (withdrawal_locked) {
                        if (ASK_AUTHENTICATE) {
                            this.addNotificationMessage(this.client_notifications.withdrawal_locked_review);
                        } else if (no_withdrawal_or_trading_status) {
                            this.addNotificationMessage(this.client_notifications.no_withdrawal_or_trading);
                        } else if (withdrawal_locked_status) {
                            this.addNotificationMessage(this.client_notifications.withdrawal_locked);
                        } else if (ASK_FIX_DETAILS) {
                            this.addNotificationMessage(
                                this.client_notifications.required_fields(withdrawal_locked, deposit_locked)
                            );
                        }
                    }
                    if (deposit_locked) {
                        if (SelfExclusion) {
                            this.addNotificationMessage(
                                this.client_notifications.self_exclusion(client.excluded_until)
                            );
                        } else if (unwelcome_status) {
                            this.addNotificationMessage(this.client_notifications.unwelcome);
                        }
                    }
                }

                if (mt5_withdrawal_locked) this.addNotificationMessage(this.client_notifications.mt5_withdrawal_locked);
                if (document_needs_action) this.addNotificationMessage(this.client_notifications.document_needs_action);
                if (is_p2p_visible) {
                    this.addNotificationMessage(this.client_notifications.dp2p);

                    p2p_completed_orders?.map(order => {
                        const {
                            advertiser_details,
                            client_details,
                            id,
                            is_reviewable,
                            status: order_status,
                            type,
                        } = order;

                        if (is_reviewable) {
                            if (type === 'buy' && order_status === 'completed' && client_details.loginid === loginid)
                                this.showCompletedOrderNotification(advertiser_details.name, id);

                            if (
                                type === 'sell' &&
                                order_status === 'completed' &&
                                advertiser_details.loginid === loginid
                            )
                                this.showCompletedOrderNotification(client_details.name, id);
                        }
                    });
                } else {
                    this.removeNotificationMessageByKey({ key: this.client_notifications.dp2p.key });
                }
                if (is_website_up && !has_trustpilot && daysSince(account_open_date) > 7) {
                    this.addNotificationMessage(this.client_notifications.trustpilot);
                }
                if (is_tnc_needed) {
                    this.addNotificationMessage(this.client_notifications.tnc);
                }

                has_missing_required_field = hasMissingRequiredField(account_settings, client, isAccountOfType);
                if (has_missing_required_field) {
                    this.addNotificationMessage(
                        this.client_notifications.required_fields(withdrawal_locked, deposit_locked)
                    );
                }
            }
        }

        if (!is_eu && isMultiplierContract(selected_contract_type) && current_language === 'EN' && is_logged_in) {
            this.addNotificationMessage(this.client_notifications.deriv_go);
        } else {
            this.removeNotificationMessageByKey({ key: this.client_notifications.deriv_go.key });
        }
    }

    showCompletedOrderNotification(advertiser_name, order_id) {
        const notification_key = `order-${order_id}`;

        const notification_redirect_action =
            routes.cashier_p2p === window.location.pathname
                ? {
                      onClick: () => {
                          this.p2p_order_props.redirectToOrderDetails(order_id);
                          this.setP2POrderProps({
                              ...this.p2p_order_props,
                              order_id,
                          });
                          if (this.is_notifications_visible) this.toggleNotificationsModal();
                          this.refreshNotifications();
                      },
                      text: localize('Give feedback'),
                  }
                : {
                      route: `${routes.cashier_p2p}?order=${order_id}`,
                      text: localize('Give feedback'),
                  };

        this.addNotificationMessage({
            action:
                this.p2p_order_props?.order_id === order_id
                    ? {
                          onClick: () => {
                              this.p2p_order_props.setIsRatingModalOpen(true);
                              if (this.is_notifications_visible) this.toggleNotificationsModal();
                              this.refreshNotifications();
                          },
                          text: localize('Give feedback'),
                      }
                    : notification_redirect_action,
            header: <Localize i18n_default_text='Your order {{order_id}} is complete' values={{ order_id }} />,
            key: notification_key,
            message: (
                <Localize
                    i18n_default_text='{{name}} has released your funds. <br/> Would you like to give your feedback?'
                    values={{ name: advertiser_name }}
                />
            ),
            platform: 'P2P',
            type: 'p2p_completed_order',
        });
    }

    markNotificationMessage({ key }) {
        this.marked_notifications.push(key);
    }

    refreshNotifications() {
        this.removeNotifications(true);
        this.removeAllNotificationMessages();
        this.setClientNotifications();
        this.handleClientNotifications();
    }

    removeAllNotificationMessages(should_close_persistent) {
        this.notification_messages = should_close_persistent
            ? []
            : [...this.notification_messages.filter(notifs => notifs.is_persistent)];
    }

    removeNotifications(should_close_persistent) {
        this.notifications = should_close_persistent
            ? []
            : [...this.notifications.filter(notifs => notifs.is_persistent)];
    }

    removeNotificationByKey({ key }) {
        this.notifications = this.notifications.filter(n => n.key !== key);
    }

    removeNotificationMessage({ key, should_show_again } = {}) {
        if (!key) return;
        this.notification_messages = this.notification_messages.filter(n => n.key !== key);
        // Add notification messages to LocalStore when user closes, check for redundancy
        const active_loginid = LocalStore.get('active_loginid');
        if (!excluded_notifications.includes(key) && active_loginid) {
            let messages = LocalStore.getObject('notification_messages');
            // Check if same message already exists in LocalStore for this account
            if (messages[active_loginid] && messages[active_loginid].includes(key)) {
                return;
            }
            const getCurrentMessage = () => {
                if (Array.isArray(messages[active_loginid])) {
                    messages[active_loginid].push(key);
                    return messages[active_loginid];
                }
                return [key];
            };
            if (!should_show_again) {
                // Store message into LocalStore upon closing message
                messages = { ...messages, [active_loginid]: getCurrentMessage() };
                LocalStore.setObject('notification_messages', messages);
            }
        }
    }

    removeNotificationMessageByKey({ key }) {
        this.notification_messages = this.notification_messages.filter(n => n.key !== key);
    }

    resetVirtualBalanceNotification(loginid) {
        const { accounts, is_logged_in } = this.root_store.client;
        if (!is_logged_in) return;
        if (!accounts[loginid].is_virtual) return;
        const min_reset_limit = 1000;
        const max_reset_limit = 999000;
        const balance = parseInt(accounts[loginid].balance);

        // Display notification message to user with virtual account to reset their balance
        // if the balance is less than equals to 1000 or more than equals to 999000
        if (balance <= min_reset_limit || balance >= max_reset_limit) {
            let message = localize(
                'Your demo account balance is low. Reset your balance to continue trading from your demo account.'
            );
            if (balance >= max_reset_limit)
                message = localize(
                    'Your demo account balance has reached the maximum limit, and you will not be able to place new trades. Reset your balance to continue trading from your demo account.'
                );
            this.setClientNotifications({ resetVirtualBalance: this.root_store.client.resetVirtualBalance, message });
            this.addNotificationMessage(this.client_notifications.reset_virtual_balance);
        } else {
            this.removeNotificationByKey({ key: 'reset_virtual_balance' });
            this.removeNotificationMessage({ key: 'reset_virtual_balance', should_show_again: true });
        }
    }

    setClientNotifications(client_data = {}) {
        const { ui } = this.root_store;
        const mx_mlt_custom_header = this.custom_notifications.mx_mlt_notification.header();
        const mx_mlt_custom_content = this.custom_notifications.mx_mlt_notification.main();

        const platform_name_trader = getPlatformSettings('trader').name;
        const platform_name_go = getPlatformSettings('go').name;

        const notifications = {
            acuity: {
                key: 'acuity',
                header: localize('New trading tools for MT5'),
                message: localize('Power up your Financial trades with intuitive tools from Acuity.'),
                secondary_btn: {
                    text: localize('Learn More'),
                    onClick: () => {
                        ui.setIsAcuityModalOpen(true);
                        this.removeNotificationByKey({ key: this.client_notifications.acuity.key });
                        this.removeNotificationMessage({
                            key: this.client_notifications.acuity.key,
                            should_show_again: false,
                        });
                    },
                },
                platform: [platform_name.DTrader],
                is_disposable: true,
                img_src: getUrlBase('/public/images/common/acuity_banner.png'),
                img_alt: 'Acuity',
                className: 'acuity',
                type: 'news',
            },
            acuity_mt5_download: {
                key: 'acuity_mt5_download',
                header: localize('Power up your trades with Acuity'),
                message: localize(
                    'Download intuitive trading tools to keep track of market events. The Acuity suite is only available for Windows, and is most recommended for financial assets.'
                ),
                secondary_btn: {
                    text: localize('Learn More'),
                    onClick: () => {
                        ui.setIsAcuityModalOpen(true);
                        this.removeNotificationByKey({ key: this.client_notifications.acuity_mt5_download.key });
                        this.removeNotificationMessage({
                            key: this.client_notifications.acuity_mt5_download.key,
                            should_show_again: false,
                        });
                    },
                },
                platform: [platform_name.DMT5],
                img_src: getUrlBase('/public/images/common/acuity_software.png'),
                img_alt: 'Acuity Download',
                className: 'acuity-mt5',
                icon: 'IcCloseDark',
                type: 'news',
            },
            ask_financial_risk_approval: {
                key: 'ask_financial_risk_approval',
                header: localize('Complete your Appropriateness Test'),
                message: localize('Please click the following link to complete your Appropriateness Test.'),
                action: {
                    route: routes.financial_assessment,
                    text: localize('Click here'),
                },
                type: 'warning',
            },
            ask_uk_funds_protection: {
                key: 'ask_uk_funds_protection',
                header: localize('Your cashier is locked'),
                message: localize('See how we protect your funds to unlock the cashier.'),
                action: {
                    route: routes.cashier_deposit,
                    text: localize('Find out more'),
                },
                type: 'warning',
            },
            authenticate: {
                key: 'authenticate',
                header: localize('Your account has not been verified'),
                message: localize(
                    'Please submit your proof of identity and proof of address to verify your account in your account settings to access the cashier.'
                ),
                action: {
                    route: routes.proof_of_identity,
                    text: localize('Go to my account settings'),
                },
                type: 'warning',
            },
            cashier_locked: {
                key: 'cashier_locked',
                header: localize('Your cashier is currently locked'),
                message: localize('Please contact us via live chat to unlock it.'),
                action: {
                    onClick: () => {
                        window.LC_API.open_chat_window();
                    },
                    text: localize('Go to live chat'),
                },
                type: 'warning',
            },
            trustpilot: {
                key: 'trustpilot',
                header: localize('Enjoy using Deriv?'),
                header_popup: localize('We’d love to hear your thoughts'),
                message: localize('Drop your review on Trustpilot.'),
                message_popup: localize('Drop your review on Trustpilot.'),
                action: {
                    onClick: () => {
                        window.open('https://www.trustpilot.com/evaluate/deriv.com', '_blank');
                        this.removeNotificationByKey({ key: this.client_notifications.trustpilot.key });
                        this.removeNotificationMessage({
                            key: this.client_notifications.trustpilot.key,
                            should_show_again: false,
                        });
                    },
                    text: localize('Go to Trustpilot'),
                },
                img_src: getUrlBase('/public/images/common/trustpilot_banner.png'),
                img_alt: 'Trustpilot',
                className: 'trustpilot',
                type: 'trustpilot',
            },
            close_mx_mlt_account: {
                key: 'close_mx_mlt_account',
                header: mx_mlt_custom_header,
                message: mx_mlt_custom_content,
                secondary_btn: {
                    text: localize('Learn more'),
                    onClick: () => {
                        ui.showCloseMxMltAccountPopup(true);
                    },
                },
                img_src: getUrlBase('/public/images/common/close_account_banner.png'),
                img_alt: 'close mx mlt account',
                type: 'close_mx_mlt',
            },
            close_uk_account: {
                key: 'close_uk_account',
                header: localize('Your account is scheduled to be closed'),
                message: localize('Please withdraw all your funds.'),
                action: {
                    text: localize('Learn more'),
                    onClick: () => {
                        ui.showCloseUKAccountPopup(true);
                        this.removeNotificationByKey({ key: this.client_notifications.close_uk_account.key });
                        this.removeNotificationMessage({
                            key: this.client_notifications.close_uk_account.key,
                            should_show_again: false,
                        });
                    },
                },
                type: 'danger',
            },
            currency: {
                key: 'currency',
                header: localize('You have not selected your account currency'),
                message: localize('Please set your account currency to enable deposits and withdrawals.'),
                action: {
                    onClick: () => {
                        ui.openRealAccountSignup('set_currency');
                    },
                    text: localize('Set my account currency'),
                },
                type: 'danger',
            },
            deriv_go: {
                key: 'deriv_go',
                message: (
                    <Localize
                        i18n_default_text='Get a faster mobile trading experience with the <0>{{platform_name_go}}</0> app!'
                        components={[<StaticUrl key={0} className='link dark' href='/landing/deriv-go' />]}
                        values={{ platform_name_go }}
                    />
                ),
                cta_btn: {
                    text: localize('Learn more'),
                    onClick: () => {
                        window.open(getStaticUrl('/landing/deriv-go'), '_blank');
                    },
                },
                img_src: getUrlBase('/public/images/common/derivgo_banner.png'),
                img_alt: 'deriv_go',
                type: 'promotions',
            },
            documents_expired: {
                key: 'poi_expired',
                header: localize('You submitted expired identification documents'),
                message: localize('Please submit valid identity documents to unlock the cashier.'),
                action: {
                    route: routes.proof_of_identity,
                    text: localize('Submit identity documents'),
                },
                type: 'danger',
            },
            document_needs_action: {
                key: 'document_needs_action',
                header: localize('Authentication failed'),
                message: (
                    <Localize
                        i18n_default_text='<0>Your Proof of Identity or Proof of Address</0> did not meet our requirements. Please check your email for further instructions.'
                        components={[<BinaryLink key={0} className='link' to={routes.proof_of_identity} />]}
                    />
                ),
                type: 'warning',
            },
            dp2p: {
                key: 'dp2p',
                header: localize('Payment problems?'),
                message: localize('There’s an app for that'),
                primary_btn: {
                    text: localize('Learn more'),
                    onClick: () => {
                        window.open(getStaticUrl('/p2p'), '_blank');
                    },
                },
                img_src: getUrlBase('/public/images/common/dp2p_banner.png'),
                img_alt: 'Deriv P2P',
                type: 'news',
            },
            identity: {
                key: 'identity',
                header: localize('Let’s verify your ID'),
                message: localize(
                    'You need to make a quick identity verification before you can access the Cashier. Please go to your account settings to submit your proof of identity.'
                ),
                action: {
                    route: routes.proof_of_identity,
                    text: localize('Go to my account settings'),
                },
                type: 'warning',
            },
            install_pwa: {
                key: 'install_pwa',
                action: {
                    onClick: () => ui.installWithDeferredPrompt(),
                    text: localize('Install'),
                },
                header: localize('Install the {{platform_name_trader}} web app', { platform_name_trader }),
                message: localize('Launch {{platform_name_trader}} in seconds the next time you want to trade.', {
                    platform_name_trader,
                }),
                type: 'announce',
                should_hide_close_btn: false,
            },
            is_virtual: {
                key: 'is_virtual',
                header: localize('You are on your demo account'),
                message: localize('Please switch to your real account or create one to access the cashier.'),
                type: 'warning',
            },
            max_turnover_limit_not_set: {
                key: 'max_turnover_limit_not_set',
                header: localize('You’ve not set your 30-day turnover limit'),
                message: localize(
                    'Your access to the cashier has been temporarily disabled as you have not set your 30-day turnover limit. Please go to Self-exclusion and set the limit.'
                ),
                action: {
                    route: routes.self_exclusion,
                    text: localize('Go to Self-exclusion'),
                },
                type: 'danger',
            },
            mt5_withdrawal_locked: {
                key: 'mt5_withdrawal_locked',
                header: localize('MT5 withdrawal disabled'),
                message: localize(
                    'MT5 withdrawals have been disabled on your account. Please check your email for more details.'
                ),
                type: 'warning',
            },
            needs_poa: {
                action: {
                    route: routes.proof_of_address,
                    text: localize('Verify address'),
                },
                key: 'needs_poa',
                header: localize('Please verify your proof of address'),
                message: localize('To continue trading with us, please confirm where you live.'),
                type: 'danger',
            },
            needs_poi: {
                action: {
                    route: routes.proof_of_identity,
                    text: localize('Verify identity'),
                },
                key: 'needs_poi',
                header: localize('Please verify your proof of identity'),
                message: localize('To continue trading with us, please confirm who you are.'),
                type: 'danger',
            },

            new_version_available: {
                action: {
                    onClick: () => window.location.reload(),
                    text: localize('Refresh now'),
                },
                key: 'new_version_available',
                header: localize('A new version of Deriv is available'),
                message: localize('This page will automatically refresh in 5 minutes to load the latest version.'),
                type: 'warning',
                should_hide_close_btn: true,
                timeout: 300000,
                timeoutMessage: remaining => localize('Auto update in {{ remaining }} seconds', { remaining }),
            },
            no_residence: {
                key: 'no_residence',
                header: localize('You have not selected your country of residence'),
                message: localize(
                    'Please set your country of residence in your account settings to access the cashier.'
                ),
                action: {
                    route: routes.personal_details,
                    text: localize('Go to my account settings'),
                },
                type: 'warning',
            },
            no_withdrawal_or_trading: {
                key: 'no_withdrawal_or_trading',
                header: localize('You are only allowed to make deposits'),
                message: localize('Please contact us via live chat to enable withdrawals.'),
                action: {
                    onClick: () => {
                        window.LC_API.open_chat_window();
                    },
                    text: localize('Go to live chat'),
                },
                type: 'warning',
            },
            password_changed: {
                key: 'password_changed',
                header: localize('Password updated.'),
                message: <Localize i18n_default_text='Please log in with your updated password.' />,
                type: 'info',
            },
            poa_failed: {
                action: {
                    route: routes.proof_of_address,
                    text: localize('Resubmit proof of address'),
                },
                key: 'poa_failed',
                header: localize('Please resubmit your proof of address or we may restrict your account.'),
                message: localize('Please submit your proof of address.'),
                type: 'danger',
            },
            poa_verified: {
                key: 'poa_verified',
                header: localize('Your proof of address is verified.'),
                type: 'announce',
                should_hide_close_btn: false,
            },
            poi_failed: {
                action: {
                    route: routes.proof_of_identity,
                    text: localize('Resubmit proof of identity'),
                },
                key: 'poi_failed',
                header: localize('Your proof of identity verification has failed'),
                message: localize('Please submit your proof of identity.'),
                type: 'danger',
            },
            poi_verified: {
                key: 'poi_verified',
                header: localize('Your proof of identity is verified.'),
                type: 'announce',
                should_hide_close_btn: false,
            },
            poi_name_mismatch: {
                action: {
                    route: routes.personal_details,
                    text: localize('Personal details'),
                },
                key: 'poi_name_mismatch',
                header: localize('Please update your personal info'),
                message: (
                    <Localize
                        i18n_default_text='It seems that your name in the document is not the same as your Deriv profile. Please update your name in the <0>Personal details</0> page to solve this issue.'
                        components={[<strong key={0} />]}
                    />
                ),
                type: 'warning',
            },
            resticted_mt5_with_pending_poa: {
                key: 'resticted_mt5_with_pending_poa',
                header: localize('Your proof of address verification is pending'),
                message: localize(
                    'Your address verification is pending, and we’ve placed some restrictions on your account. The restrictions will be lifted once your address is verified.'
                ),
                type: 'danger',
            },
            resticted_mt5_with_failed_poa: {
                action: {
                    route: routes.proof_of_address,
                    text: localize('Resubmit proof of address'),
                },
                key: 'resticted_mt5_with_failed_poa',
                header: localize('Your proof of address verification has failed'),
                message: localize(
                    'Your proof of address did not pass our verification checks, and we’ve placed some restrictions on your account. Please resubmit your proof of address.'
                ),
                type: 'danger',
            },
            required_fields: (withdrawal_locked, deposit_locked) => {
                let message;
                if (withdrawal_locked) {
                    message = localize(
                        'Please go to your account settings and complete your personal details to enable withdrawals.'
                    );
                } else if (deposit_locked) {
                    message = localize(
                        'Please go to your account settings and complete your personal details to enable deposits.'
                    );
                } else {
                    message = localize(
                        'Please go to your account settings and complete your personal details to enable deposits and withdrawals.'
                    );
                }
                return {
                    key: 'required_fields',
                    header: localize('Your personal details are incomplete'),
                    message,
                    type: 'danger',
                    action: {
                        route: routes.personal_details,
                        text: localize('Go to my account settings'),
                    },
                };
            },
            reset_virtual_balance: {
                key: 'reset_virtual_balance',
                header: localize('Reset your balance'),
                message: client_data.message,
                type: 'info',
                is_persistent: true,
                should_show_again: true,
                platform: [platform_name.DTrader],
                is_disposable: true,
                action: {
                    text: localize('Reset balance'),
                    onClick: async () => {
                        await client_data.resetVirtualBalance();
                    },
                },
            },
            risk: {
                key: 'risk',
                header: localize('Your cashier is locked'),
                message: localize('Please complete the financial assessment in your account settings to unlock it.'),
                action: {
                    route: routes.financial_assessment,
                    text: localize('Go to my account settings'),
                },
                type: 'warning',
            },
            self_exclusion: excluded_until => {
                return {
                    key: 'self_exclusion',
                    header: localize('You have self-excluded from trading'),
                    message: (
                        <Localize
                            i18n_default_text='You have chosen to exclude yourself from trading on our website until {{exclusion_end}}. If you are unable to place a trade or deposit after your self-exclusion period, please contact us via live chat.'
                            values={{
                                exclusion_end: formatDate(excluded_until, 'DD MMM, YYYY'),
                                interpolation: { escapeValue: false },
                            }}
                        />
                    ),
                    action: {
                        onClick: () => {
                            window.LC_API.open_chat_window();
                        },
                        text: localize('Go to live chat'),
                    },
                    type: 'danger',
                };
            },
            system_maintenance: (withdrawal_locked, deposit_locked) => {
                let message, header;
                if (isCryptocurrency(client_data.currency)) {
                    if (withdrawal_locked) {
                        header = localize('Unable to process withdrawals in the moment');
                        message = localize(
                            'Withdrawals are temporarily unavailable due to system maintenance. You can make withdrawals when the maintenance is complete.'
                        );
                    } else if (deposit_locked) {
                        header = localize('Unable to process deposit in the moment');
                        message = localize(
                            'Deposits are temporarily unavailable due to system maintenance. You can make deposits when the maintenance is complete.'
                        );
                    } else {
                        header = localize('Scheduled cashier system maintenance');
                        message = localize(
                            'Our cryptocurrency cashier is temporarily down due to system maintenance. You can make cryptocurrency deposits and withdrawals in a few minutes when the maintenance is complete.'
                        );
                    }
                } else {
                    header = localize('Scheduled cashier system maintenance');
                    message = localize(
                        'Our cashier is temporarily down due to system maintenance. You can access the cashier in a few minutes when the maintenance is complete.'
                    );
                }
                return {
                    key: 'system_maintenance',
                    header,
                    message,
                    type: 'warning',
                };
            },
            tax: {
                key: 'tax',
                header: localize('You have not provided your tax identification number'),
                message: localize(
                    'This information is necessary for legal and regulatory requirements. Please go to your account settings, and fill in your latest tax identification number.'
                ),
                action: {
                    route: routes.personal_details,
                    text: localize('Go to my account settings'),
                },
                type: 'danger',
            },
            tnc: {
                action: {
                    onClick: async () => {
                        await WS.tncApproval();
                        WS.getSettings();
                    },
                    text: localize('I accept'),
                },
                key: 'tnc',
                header: localize('Terms & conditions updated'),
                message: (
                    <Localize
                        i18n_default_text='Please accept our <0>updated Terms and Conditions</0> to proceed.'
                        components={[<StaticUrl key={0} className='link' href='terms-and-conditions' />]}
                    />
                ),
                type: 'warning',
            },
            two_f_a: {
                key: 'two_f_a',
                header: localize('Stronger security for your Deriv account'),
                message: localize(
                    'With two-factor authentication, you’ll protect your account with both your password and your phone - so only you can access your account, even if someone knows your password.'
                ),
                action: {
                    route: routes.two_factor_authentication,
                    text: localize('Secure my account'),
                },
                type: 'warning',
            },
            unwelcome: {
                key: 'unwelcome',
                header: localize('Deposits are locked'),
                message: localize('Please contact us via live chat.'),
                action: {
                    onClick: () => {
                        window.LC_API.open_chat_window();
                    },
                    text: localize('Go to live chat'),
                },
                type: 'danger',
            },
            withdrawal_locked: {
                key: 'withdrawal_locked',
                header: localize('You are only allowed to make deposits'),
                message: localize('Please contact us via live chat to enable withdrawals.'),
                action: {
                    onClick: () => {
                        window.LC_API.open_chat_window();
                    },
                    text: localize('Go to live chat'),
                },
                type: 'warning',
            },
            withdrawal_locked_review: {
                key: 'withdrawal_locked_review',
                header: localize('You are unable to make withdrawals'),
                message: (
                    <Localize
                        i18n_default_text='To enable withdrawals, please submit your <0>Proof of Identity (POI)</0> and <1>Proof of Address (POA)</1> and also complete the <2>financial assessment</2> in your account settings.'
                        components={[
                            <a key={0} className='link dark' href={'/account/proof-of-identity'} />,
                            <a key={1} className='link dark' href={'/account/proof-of-address'} />,
                            <a key={2} className='link dark' href={'/account/financial-assessment'} />,
                        ]}
                    />
                ),
                type: 'warning',
            },
            you_are_offline: {
                key: 'you_are_offline',
                header: localize('You are offline'),
                message: <Localize i18n_default_text='Check your connection.' />,
                type: 'danger',
            },
            poi_dob_mismatch: {
                key: 'poi_dob_mismatch',
                header: localize('Please update your personal info'),
                message: (
                    <Localize
                        i18n_default_text='It seems that your date of birth in the document is not the same as your Deriv profile. Please update your date of birth in the <0>Personal details</0> page to solve this issue.'
                        components={[<strong key={0} />]}
                    />
                ),
                type: 'warning',
                action: {
                    route: routes.personal_details,
                    text: localize('Personal details'),
                },
            },
            risk_client: {
                key: 'risk_client',
                header: localize('You can only make deposits.'),
                message: (
                    <Localize i18n_default_text='You can only make deposits at the moment. To enable withdrawals, please complete your financial assessment.' />
                ),
                type: 'warning',
                action: {
                    route: routes.financial_assessment,
                    text: localize('Start assessment'),
                },
            },
        };

        this.client_notifications = notifications;
    }

    setP2POrderProps(p2p_order_props) {
        this.p2p_order_props = p2p_order_props;
    }

    //TODO (yauheni-kryzhyk): this method is not used. leaving this for the upcoming new pop-up notifications implementation
    setShouldShowPopups(should_show_popups) {
        this.should_show_popups = should_show_popups;
    }

    toggleNotificationsModal() {
        this.is_notifications_visible = !this.is_notifications_visible;
    }

    unmarkNotificationMessage({ key }) {
        this.marked_notifications = this.marked_notifications.filter(item => key !== item);
    }

    updateNotifications(notifications_array) {
        this.notifications = notifications_array.filter(message => !excluded_notifications.includes(message.key));
    }
}
