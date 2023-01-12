import classNames from 'classnames';
import React from 'react';
import { Button, HintBox, Icon, Loading, Popover, Text, useCopyToClipboard } from '@deriv/components';
import { getKebabCase, website_name, isMobile } from '@deriv/shared';
import { localize, Localize } from '@deriv/translations';
import { connect } from 'Stores/connect';
import { TProviderDetails, TRootStore, TUiStore } from 'Types';

type TOnRampProviderPopupProps = {
    api_error: string;
    deposit_address: string;
    is_dark_mode_on: TUiStore['is_dark_mode_on'];
    is_deposit_address_loading: boolean;
    is_requesting_widget_html: boolean;
    onClickDisclaimerContinue: () => void;
    onClickGoToDepositPage: () => void;
    selected_provider: TProviderDetails;
    setIsOnRampModalOpen: (boolean: boolean) => void;
    should_show_dialog: boolean;
    should_show_widget: boolean;
    widget_error: string;
    widget_html: string;
};

const OnRampProviderPopup = ({
    api_error,
    deposit_address,
    is_dark_mode_on,
    is_deposit_address_loading,
    is_requesting_widget_html,
    onClickDisclaimerContinue,
    onClickGoToDepositPage,
    selected_provider,
    setIsOnRampModalOpen,
    should_show_dialog,
    should_show_widget,
    widget_error,
    widget_html,
}: TOnRampProviderPopupProps) => {
    const el_onramp_widget_container_ref = React.useRef(null);
    const [is_copied, copyToClipboard, setIsCopied] = useCopyToClipboard();
    let timeout_clipboard: ReturnType<typeof setTimeout>;

    const onClickCopyDepositAddress = () => {
        copyToClipboard(deposit_address);

        timeout_clipboard = setTimeout(() => {
            setIsCopied(false);
        }, 500);
    };

    React.useEffect(() => {
        return () => clearTimeout(timeout_clipboard);
    }, []);

    // JS executed after "on-ramp__widget-container" has been added to the DOM.
    // Used for providers that require JS to be executed for inclusion of their widget.
    // (vs embedding an <iframe>)
    React.useEffect(() => {
        if (should_show_widget && widget_html) {
            selected_provider.onMountWidgetContainer(el_onramp_widget_container_ref);
        }
    }, [selected_provider, should_show_widget, widget_html]);

    if (selected_provider === null) {
        return null;
    }

    if (is_deposit_address_loading || (should_show_widget && is_requesting_widget_html)) {
        return <Loading is_fullscreen />;
    }

    if (should_show_widget) {
        return (
            <div
                className={classNames('on-ramp__widget-container', {
                    'on-ramp__widget-container--error': widget_error,
                })}
                ref={el_onramp_widget_container_ref}
            >
                {widget_error ? (
                    <div className='on-ramp__widget-container-error'>{widget_error}</div>
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: widget_html }} />
                )}
            </div>
        );
    }

    if (should_show_dialog) {
        return (
            <div className='on-ramp__popup-no-deposit-address'>
                <Text size='xs' className='on-ramp__popup-no-deposit-address-text'>
                    {api_error ? (
                        <Localize i18n_default_text='Please go to the Deposit page to get an address.' />
                    ) : (
                        <Localize i18n_default_text='Please go to the Deposit page to generate an address. Then come back here to continue with your transaction.' />
                    )}
                </Text>
                <Button.Group className='on-ramp__popup-no-deposit-address-buttons'>
                    <Button text={localize('Cancel')} onClick={() => setIsOnRampModalOpen(false)} secondary large />
                    <Button text={localize('Go to Deposit page')} onClick={onClickGoToDepositPage} primary large />
                </Button.Group>
            </div>
        );
    }

    return (
        <div className='on-ramp__popup' data-testid='dti_on-ramp_popup'>
            {selected_provider.should_show_deposit_address && (
                <React.Fragment>
                    <div className='on-ramp__popup-deposit'>
                        <Text
                            size={isMobile() ? 'xxs' : 'xs'}
                            color='general'
                            line_height={isMobile() ? 'm' : 'l'}
                            align={isMobile() ? 'left' : 'center'}
                        >
                            <Localize i18n_default_text="Please copy the crypto address you see below. You'll need it to deposit your cryptocurrency." />
                        </Text>
                        <div className='on-ramp__popup-deposit-address'>
                            <Popover zIndex={9998} alignment='right' message={localize('Copied!')} is_open={is_copied}>
                                <input
                                    className={classNames('on-ramp__popup-deposit-address-text', {
                                        'on-ramp__popup-deposit-address-text--dark': is_dark_mode_on,
                                    })}
                                    defaultValue={deposit_address}
                                    disabled
                                    onFocus={e => e.preventDefault()}
                                />
                                <Icon
                                    className='on-ramp__popup-deposit-address-icon'
                                    data_testid='dti_deposit_address_icon'
                                    icon={isMobile() ? 'IcCopy' : 'icClipboard'}
                                    size={16}
                                    onClick={onClickCopyDepositAddress}
                                />
                            </Popover>
                        </div>
                        <div className='on-ramp__popup-deposit-address-hint'>
                            <HintBox
                                icon={'IcInfo'}
                                is_info
                                message={localize(
                                    'This address can only be used ONCE. Please copy a new one for your next transaction.'
                                )}
                            />
                        </div>
                    </div>
                    <div className='on-ramp__popup-divider' />
                </React.Fragment>
            )}
            <div className='on-ramp__popup-disclaimer'>
                <Text
                    line_height='m'
                    weight='bold'
                    color='prominent'
                    as='p'
                    className='on-ramp__popup-disclaimer-title'
                >
                    <Localize i18n_default_text='Disclaimer' />
                </Text>
                <Text
                    size={isMobile() ? 'xxs' : 'xs'}
                    line_height='l'
                    color='general'
                    as='p'
                    className='on-ramp__popup-disclaimer-text'
                >
                    <Localize
                        i18n_default_text="By clicking 'Continue' you will be redirected to {{ service }}, a third-party payment service provider. Please note that {{ website_name }} is not responsible for the content or services provided by {{ service }}. If you encounter any issues related to {{ service }} services, you must contact {{ service }} directly."
                        values={{
                            service: selected_provider.name,
                            website_name,
                        }}
                    />
                </Text>
            </div>
            {!should_show_widget && deposit_address && (
                <div className='on-ramp__popup-buttons'>
                    <Button.Group>
                        <Button large onClick={() => setIsOnRampModalOpen(false)} secondary text={localize('Cancel')} />
                        <Button
                            id={`gtm-onramp-provider-continue--${getKebabCase(selected_provider.name)}`}
                            large
                            onClick={onClickDisclaimerContinue}
                            primary
                            text={localize('Continue')}
                        />
                    </Button.Group>
                </div>
            )}
        </div>
    );
};

export default connect(({ modules, ui }: TRootStore) => ({
    api_error: modules.cashier.onramp.api_error,
    deposit_address: modules.cashier.onramp.deposit_address,
    is_dark_mode_on: ui.is_dark_mode_on,
    is_deposit_address_loading: modules.cashier.onramp.is_deposit_address_loading,
    is_requesting_widget_html: modules.cashier.onramp.is_requesting_widget_html,
    onClickDisclaimerContinue: modules.cashier.onramp.onClickDisclaimerContinue,
    onClickGoToDepositPage: modules.cashier.onramp.onClickGoToDepositPage,
    selected_provider: modules.cashier.onramp.selected_provider,
    setIsOnRampModalOpen: modules.cashier.onramp.setIsOnRampModalOpen,
    should_show_dialog: modules.cashier.onramp.should_show_dialog,
    should_show_widget: modules.cashier.onramp.should_show_widget,
    widget_error: modules.cashier.onramp.widget_error,
    widget_html: modules.cashier.onramp.widget_html,
}))(OnRampProviderPopup);
