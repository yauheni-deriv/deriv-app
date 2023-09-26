import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useLocation, withRouter } from 'react-router';
import { DesktopWrapper, MobileWrapper, ThemedScrollbars } from '@deriv/components';
import { CookieStorage, isMobile, TRACKING_STATUS_KEY, PlatformContext, platforms, routes, WS } from '@deriv/shared';
import { RudderStack } from '@deriv/analytics';
import CookieBanner from '../../Components/Elements/CookieBanner/cookie-banner.jsx';
import { useStore, observer } from '@deriv/stores';
import { getLanguage } from '@deriv/translations';

const tracking_status_cookie = new CookieStorage(TRACKING_STATUS_KEY);

const AppContents = observer(({ children }) => {
    const [show_cookie_banner, setShowCookieBanner] = React.useState(false);
    const [is_gtm_tracking, setIsGtmTracking] = React.useState(false);
    const { is_appstore } = React.useContext(PlatformContext);
    const {
        client,
        common: { platform },
        gtm: { pushDataLayer },
        ui,
    } = useStore();

    const { is_eu_country, is_logged_in, is_logging_in, loginid, user_id } = client;
    const {
        is_app_disabled,
        is_cashier_visible,
        is_cfd_page,
        is_positions_drawer_on,
        is_route_modal_on,
        notifyAppInstall,
        setAppContentsScrollRef,
        is_dark_mode_on: is_dark_mode,
    } = ui;

    const tracking_status = tracking_status_cookie.get(TRACKING_STATUS_KEY);

    const scroll_ref = React.useRef(null);
    const child_ref = React.useRef(null);

    const location = useLocation();

    const current_page = window.location.hostname + window.location.pathname;

    React.useEffect(() => {
        if (is_logged_in && user_id) {
            RudderStack.setAccountType(loginid.substring(0, 2));
            RudderStack.identifyEvent(user_id, {
                language: getLanguage().toLowerCase() || 'en',
            });
            RudderStack.pageView(current_page);
        }
        if (scroll_ref.current) setAppContentsScrollRef(scroll_ref);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    RudderStack.pageView(current_page);

    React.useEffect(() => {
        const allow_tracking = !is_eu_country || tracking_status === 'accepted';
        if (allow_tracking && !is_gtm_tracking) {
            pushDataLayer({ event: 'allow_tracking' });
            setIsGtmTracking(true);
        }
    }, [is_gtm_tracking, is_eu_country, pushDataLayer, tracking_status]);

    React.useEffect(() => {
        if (!tracking_status && !is_logged_in && !is_logging_in) {
            WS.wait('website_status').then(() => {
                setShowCookieBanner(is_eu_country);
            });
        }
    }, [tracking_status, is_logged_in, is_eu_country, is_logging_in]);

    React.useEffect(() => {
        // Gets the reference of the child element and scrolls it to the top
        if (child_ref.current) {
            child_ref.current.scrollTop = 0;
        }
    }, [location?.pathname]);

    React.useEffect(() => {
        const handleInstallPrompt = e => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            // Update UI notify the user they can install the PWA
            notifyAppInstall(e);
        };
        window.addEventListener('beforeinstallprompt', handleInstallPrompt);

        return () => window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    }, [notifyAppInstall]);

    // handle accept/decline cookies
    const onAccept = () => {
        tracking_status_cookie.set(TRACKING_STATUS_KEY, 'accepted', { sameSite: 'none', secure: true });
        pushDataLayer({ event: 'allow_tracking' });
        setShowCookieBanner(false);
        setIsGtmTracking(true);
    };

    const onDecline = () => {
        tracking_status_cookie.set(TRACKING_STATUS_KEY, 'declined', { sameSite: 'none', secure: true });
        setShowCookieBanner(false);
    };

    return (
        <div
            id='app_contents'
            className={classNames('app-contents', {
                'app-contents--show-positions-drawer': is_positions_drawer_on,
                'app-contents--is-disabled': is_app_disabled,
                'app-contents--is-mobile': isMobile(),
                'app-contents--is-route-modal': is_route_modal_on,
                'app-contents--is-scrollable': is_cfd_page || is_cashier_visible,
                'app-contents--is-dashboard': is_appstore,
                'app-contents--is-hidden': platforms[platform],
                'app-contents--is-onboarding': window.location.pathname === routes.onboarding,
            })}
            ref={scroll_ref}
        >
            <MobileWrapper>{children}</MobileWrapper>
            <DesktopWrapper>
                {/* Calculate height of user screen and offset height of header and footer */}
                {window.location.pathname === routes.onboarding ? (
                    <ThemedScrollbars style={{ maxHeight: '', height: '100%' }} refSetter={child_ref}>
                        {children}
                    </ThemedScrollbars>
                ) : (
                    <ThemedScrollbars height='calc(100vh - 84px)' has_horizontal refSetter={child_ref}>
                        {children}
                    </ThemedScrollbars>
                )}
            </DesktopWrapper>
            {show_cookie_banner && (
                <CookieBanner
                    onAccept={onAccept}
                    onDecline={onDecline}
                    is_open={show_cookie_banner}
                    is_dark_mode={is_dark_mode}
                />
            )}
        </div>
    );
});

AppContents.propTypes = {
    children: PropTypes.any,
};

export default withRouter(AppContents);
