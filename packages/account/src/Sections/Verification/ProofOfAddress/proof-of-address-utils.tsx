import React from 'react';
import { AUTH_STATUS_CODES, isNavigationFromDerivGO, isNavigationFromP2P } from '@deriv/shared';
import { Localize } from '@deriv/translations';
import { ContinueTradingButton, RedirectButton, ResubmitButton } from '../../../Components/action-buttons';
import { PoiButton } from '../../../Components/poi/poi-button/poi-button';

type TAuthStatus = {
    needs_poi: boolean;
    is_submitted: boolean;
};

export const getPOAStatusMessages = (
    status: typeof AUTH_STATUS_CODES[keyof typeof AUTH_STATUS_CODES],
    auth_status?: TAuthStatus,
    should_show_redirect_btn?: boolean
) => {
    const is_redirected_from_platform = isNavigationFromP2P() || isNavigationFromDerivGO();

    const pendingButton = () => {
        if (!auth_status?.needs_poi) {
            if (should_show_redirect_btn) return <RedirectButton />;
            if (!is_redirected_from_platform) return <ContinueTradingButton />;
        }
        if (auth_status?.needs_poi) return <PoiButton />;
        return null;
    };

    const verifiedButton = () => {
        if (auth_status?.needs_poi) return <PoiButton />;
        if (should_show_redirect_btn) return <RedirectButton />;
        if (!is_redirected_from_platform) return <ContinueTradingButton />;
        return null;
    };

    const titles: Record<typeof status, React.ReactElement> = {
        expired: <Localize i18n_default_text={'New proof of address is needed'} />,
        none: <Localize i18n_default_text={'Proof of address verification not required'} />,
        pending: auth_status?.is_submitted ? (
            <Localize i18n_default_text={'Your documents were submitted successfully'} />
        ) : (
            <Localize i18n_default_text={'Your proof of address was submitted successfully'} />
        ),
        rejected: <Localize i18n_default_text={'We could not verify your proof of address'} />,
        suspected: <Localize i18n_default_text={'We could not verify your proof of address'} />,
        verified: <Localize i18n_default_text={'Your proof of address is verified'} />,
    };

    const descriptions: Record<typeof status, React.ReactElement | null> = {
        expired: (
            <Localize i18n_default_text={'Your documents for proof of address is expired. Please submit again.'} />
        ),
        none: (
            <Localize
                i18n_default_text={
                    'Your account does not need address verification at this time. We will inform you if address verification is required in the future.'
                }
            />
        ),
        pending: (
            <div>
                {auth_status?.is_submitted ? (
                    <Localize
                        i18n_default_text={
                            'We’ll review your documents and notify you of its status within 1 to 3 days.'
                        }
                    />
                ) : (
                    <Localize i18n_default_text={'Your document is being reviewed, please check back in 1-3 days.'} />
                )}
                {auth_status?.needs_poi && (
                    <>
                        <br /> <Localize i18n_default_text={'You must also submit a proof of identity.'} />
                    </>
                )}
            </div>
        ),
        rejected: <Localize i18n_default_text={'Please check your email for details.'} />,
        suspected: <Localize i18n_default_text={'Please check your email for details.'} />,
        verified: auth_status?.needs_poi ? (
            <Localize i18n_default_text={'To continue trading, you must also submit a proof of identity.'} />
        ) : null,
    };

    const icons: Record<typeof status, string> = {
        expired: 'IcPoaUpload',
        none: 'IcPoaVerified',
        pending: 'IcPoaVerified',
        rejected: 'IcPoaError',
        suspected: 'IcPoaError',
        verified: 'IcPoaVerified',
    };

    const action_buttons: Record<typeof status, null | ((onClick?: () => void) => JSX.Element | null)> = {
        expired: ResubmitButton,
        none: null,
        pending: pendingButton,
        rejected: ResubmitButton,
        suspected: ResubmitButton,
        verified: verifiedButton,
    };

    return {
        title: titles[status],
        description: descriptions[status],
        icon: icons[status],
        action_button: action_buttons[status],
    };
};
