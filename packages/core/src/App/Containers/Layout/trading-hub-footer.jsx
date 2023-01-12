import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { withRouter } from 'react-router';
import NetworkStatus, {
    AccountLimits as AccountLimitsFooter,
    EndpointNote,
    GoToDeriv,
    HelpCentre,
    RegulatoryInformation,
    ResponsibleTrading,
    ToggleSettings,
    ToggleFullScreen,
} from 'App/Components/Layout/Footer';
import LiveChat from 'App/Components/Elements/LiveChat';
import WhatsApp from 'App/Components/Elements/WhatsApp/index.ts';
import { connect } from 'Stores/connect';
import ServerTime from '../server-time.jsx';
import { isBot, routes } from '@deriv/shared';
import DarkModeToggleIcon from 'Assets/SvgComponents/footer/ic-footer-light-theme.svg';
import LightModeToggleIcon from 'Assets/SvgComponents/footer/ic-footer-dark-theme.svg';
import { Popover } from '@deriv/components';

const FooterIconSeparator = () => <div className='footer-icon-separator' />;

const FooterExtensionRenderer = (footer_extension, idx) => {
    const { Component: FooterExtensionComponent } = footer_extension;
    return (
        <React.Fragment key={`footer-link-${footer_extension.position}-${idx}`}>
            {footer_extension.has_left_separator && <FooterIconSeparator />}
            <FooterExtensionComponent />
            {footer_extension.has_right_separator && <FooterIconSeparator />}
        </React.Fragment>
    );
};

const TradingHubFooter = ({
    enableApp,
    footer_extensions,
    is_app_disabled,
    is_eu,
    is_logged_in,
    is_route_modal_on,
    is_settings_modal_on,
    is_virtual,
    disableApp,
    landing_company_shortcode,
    toggleSettingsModal,
    settings_extension,
    setDarkMode,
    is_dark_mode,
}) => {
    let footer_extensions_left = [];
    let footer_extensions_right = [];
    if (footer_extensions.filter) {
        footer_extensions_left = footer_extensions.filter(footer_extension => footer_extension.position === 'left');
        footer_extensions_right = footer_extensions.filter(footer_extension => footer_extension.position === 'right');
    }

    const changeTheme = () => {
        if (isBot()) return;
        setDarkMode(!is_dark_mode);
    };

    const location = window.location.pathname;

    return (
        <footer
            className={classNames('footer', {
                'footer--is-disabled': is_app_disabled || is_route_modal_on,
            })}
        >
            {footer_extensions_left.length > 0 && (
                <div className='footer__links footer__links--left'>
                    {footer_extensions_left.map(FooterExtensionRenderer)}
                </div>
            )}
            <EndpointNote />
            <NetworkStatus />
            <FooterIconSeparator />
            <ServerTime />
            <FooterIconSeparator />
            <div className='footer__links'>
                {footer_extensions_right.map(FooterExtensionRenderer)}
                <WhatsApp />
                <LiveChat />
                <GoToDeriv />
                <ResponsibleTrading />
                {is_logged_in && <AccountLimitsFooter />}
                {is_logged_in && !is_virtual && (
                    <RegulatoryInformation landing_company={landing_company_shortcode} is_eu={is_eu} />
                )}
                <div className='footer__links--dark-mode'>
                    <Popover alignment='top' message='Change theme'>
                        {is_dark_mode ? (
                            <LightModeToggleIcon onClick={changeTheme} />
                        ) : (
                            <DarkModeToggleIcon onClick={changeTheme} />
                        )}
                    </Popover>
                </div>
                <FooterIconSeparator />
                <HelpCentre />
                {location === routes.trade && (
                    <ToggleSettings
                        is_settings_visible={is_settings_modal_on}
                        toggleSettings={toggleSettingsModal}
                        disableApp={disableApp}
                        enableApp={enableApp}
                        settings_extension={settings_extension}
                    />
                )}
                <ToggleFullScreen />
            </div>
        </footer>
    );
};

TradingHubFooter.propTypes = {
    is_app_disabled: PropTypes.bool,
    is_logged_in: PropTypes.bool,
    is_route_modal_on: PropTypes.bool,
    is_settings_modal_on: PropTypes.bool,
    landing_company_shortcode: PropTypes.string,
    location: PropTypes.object,
    toggleSettingsModal: PropTypes.func,
    settings_extension: PropTypes.array,
    is_virtual: PropTypes.bool,
    is_eu: PropTypes.bool,
    disableApp: PropTypes.func,
    enableApp: PropTypes.func,
    footer_extensions: PropTypes.array,
    is_dark_mode: PropTypes.bool,
    setDarkMode: PropTypes.func,
};

export default withRouter(
    connect(({ client, ui }) => ({
        enableApp: ui.enableApp,
        footer_extensions: ui.footer_extensions,
        settings_extension: ui.settings_extension,
        is_app_disabled: ui.is_app_disabled,
        is_route_modal_on: ui.is_route_modal_on,
        is_logged_in: client.is_logged_in,
        is_eu: client.is_eu,
        is_loading: ui.is_loading,
        is_settings_modal_on: ui.is_settings_modal_on,
        is_virtual: client.is_virtual,
        landing_company_shortcode: client.landing_company_shortcode,
        disableApp: ui.disableApp,
        toggleSettingsModal: ui.toggleSettingsModal,
        is_dark_mode: ui.is_dark_mode_on,
        setDarkMode: ui.setDarkMode,
    }))(TradingHubFooter)
);
