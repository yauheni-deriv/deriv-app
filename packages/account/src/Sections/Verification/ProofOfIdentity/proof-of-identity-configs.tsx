import React from 'react';
import { Localize } from '@deriv/translations';
import {
    AUTH_STATUS_CODES,
    isNavigationFromDerivGO,
    isNavigationFromP2P,
    routes,
    idv_error_statuses,
} from '@deriv/shared';
import VerificationStatusActionButton from '../../../Components/verification-status-action-button';
import { TAuthStatusCode } from '../../../Types/common.type';
import { TIDVErrorStatus } from '../../../Helpers/utils';

export const submission_status_code = {
    selecting: 'selecting',
    submitting: 'submitting',
    complete: 'complete',
} as const;

export const service_code = {
    idv: 'idv',
    onfido: 'onfido',
    manual: 'manual',
} as const;

type TAuthStatus = {
    needs_poa?: boolean;
};

export const getPOIStatusMessages = (
    status: TAuthStatusCode,
    auth_status?: TAuthStatus,
    should_show_redirect_btn?: boolean,
    is_from_external?: boolean
) => {
    const resubmitButton = (onClick?: () => void, platform_name?: string) => (
        <React.Fragment>
            <VerificationStatusActionButton
                button_text={<Localize i18n_default_text='Upload Document' />}
                onClick={onClick}
            />
            {!is_from_external && should_show_redirect_btn && (
                <VerificationStatusActionButton
                    button_text={<Localize i18n_default_text='Back to {{platform_name}}' values={{ platform_name }} />}
                    onClick={onClick}
                />
            )}
        </React.Fragment>
    );

    const verifiedButton = (onClick?: () => void, platform_name?: string) => {
        if (is_from_external) return null;
        if (auth_status?.needs_poa) {
            return (
                <VerificationStatusActionButton
                    to={routes.proof_of_address}
                    button_text={<Localize i18n_default_text='Submit proof of address' />}
                />
            );
        }
        if (should_show_redirect_btn)
            return (
                <VerificationStatusActionButton
                    button_text={<Localize i18n_default_text='Back to {{platform_name}}' values={{ platform_name }} />}
                    onClick={onClick}
                />
            );

        return null;
    };

    const live_chat_link = (
        <Localize
            i18n_default_text='Please contact us via <0>live chat</0>.'
            components={[
                <span
                    key={0}
                    className='link link--orange'
                    onClick={() => window.LC_API.open_chat_window()}
                    onKeyDown={e => e.key === 'Enter' && window.LC_API.open_chat_window()}
                />,
            ]}
        />
    );

    const titles: Record<typeof status, React.ReactElement | null> = {
        none: <Localize i18n_default_text='Proof of identity verification not required' />,
        pending: null,
        rejected: <Localize i18n_default_text="You've reached the limit for uploading your documents." />,
        verified: <Localize i18n_default_text='Your proof of identity is verified' />,
        expired: <Localize i18n_default_text='New proof of identity document needed' />,
        suspected: <Localize i18n_default_text="You've reached the limit for uploading your documents." />,
    };

    const descriptions: Record<typeof status, React.ReactElement | null> = {
        none: (
            <Localize
                i18n_default_text='Your account does not need identity verification at this time.<0/>We will inform you if identity verification is required in the future.'
                components={[<br key={0} />]}
            />
        ),
        pending: <Localize i18n_default_text='' />,
        rejected: live_chat_link,
        verified: auth_status?.needs_poa ? (
            <Localize i18n_default_text='To continue trading, you must also submit a proof of address.' />
        ) : null,
        expired: null,
        suspected: live_chat_link,
    };

    const icons: Record<typeof status, string> = {
        none: 'IcPoiVerified',
        pending: '',
        rejected: 'IcPoiFailed',
        verified: 'IcPoaVerified',
        expired: 'IcPoiUpload',
        suspected: 'IcPoiFailed',
    };

    const action_buttons: Record<
        typeof status,
        null | ((onClick?: () => void, platform_name?: string) => JSX.Element | null)
    > = {
        none: null,
        pending: null,
        rejected: null,
        verified: verifiedButton,
        expired: resubmitButton,
        suspected: null,
    };

    return {
        title: titles[status],
        description: descriptions[status],
        icon: icons[status],
        action_button: action_buttons[status],
    };
};

type TAuthIDVStatus = TAuthStatus & {
    mismatch_status?: TIDVErrorStatus | null;
    is_already_attempted?: boolean;
};

export const getIDVStatusMessages = (
    status: TAuthStatusCode,
    auth_status?: TAuthIDVStatus,
    should_show_redirect_btn?: boolean,
    is_from_external?: boolean,
    is_mobile?: boolean
) => {
    const rejectedButton = (onClick?: () => void) => (
        <VerificationStatusActionButton
            button_text={<Localize i18n_default_text='Upload identity document' />}
            onClick={onClick}
        />
    );

    const verifiedButton = (onClick?: () => void, platform_name?: string) => {
        if (auth_status?.needs_poa && !is_from_external) {
            return (
                <VerificationStatusActionButton
                    to={routes.proof_of_address}
                    button_text={<Localize i18n_default_text='Submit proof of address' />}
                />
            );
        } else if (should_show_redirect_btn) {
            return (
                <VerificationStatusActionButton
                    button_text={<Localize i18n_default_text='Back to {{platform_name}}' values={{ platform_name }} />}
                    onClick={onClick}
                />
            );
        }
        return (
            <VerificationStatusActionButton to='/' button_text={<Localize i18n_default_text='Continue trading' />} />
        );
    };

    const pendingButton = (onClick?: () => void, platform_name?: string) => {
        if (auth_status?.needs_poa && !is_from_external) {
            return (
                <VerificationStatusActionButton
                    to={routes.proof_of_address}
                    button_text={<Localize i18n_default_text='Submit proof of address' />}
                />
            );
        } else if (should_show_redirect_btn) {
            return (
                <VerificationStatusActionButton
                    button_text={<Localize i18n_default_text='Back to {{platform_name}}' values={{ platform_name }} />}
                    onClick={onClick}
                />
            );
        }
        return null;
    };

    const is_expired_or_failed_error =
        auth_status?.mismatch_status === idv_error_statuses.poi_expired ||
        auth_status?.mismatch_status === idv_error_statuses.poi_failed;

    const is_mismatch_error =
        auth_status?.mismatch_status === idv_error_statuses.poi_name_dob_mismatch ||
        auth_status?.mismatch_status === idv_error_statuses.poi_dob_mismatch ||
        auth_status?.mismatch_status === idv_error_statuses.poi_name_mismatch;

    const getPendingHeaderText = () => {
        if (auth_status?.is_already_attempted) {
            if (auth_status?.mismatch_status) return <Localize i18n_default_text='Your profile is updated' />;
            if (is_expired_or_failed_error) return <Localize i18n_default_text='Your document has been submitted' />;
        }
        return <Localize i18n_default_text='Your documents were submitted successfully' />;
    };

    const titles: Record<typeof status, React.ReactElement | null> = {
        none: null,
        pending: getPendingHeaderText(),
        rejected: <Localize i18n_default_text='ID verification failed' />,
        verified: auth_status?.needs_poa ? (
            <Localize i18n_default_text='Your ID is verified. You will also need to submit proof of your address.' />
        ) : (
            <Localize i18n_default_text='ID verification passed' />
        ),
        expired: <Localize i18n_default_text='ID verification failed' />,
        suspected: <Localize i18n_default_text='ID verification failed' />,
    };

    const getPendingDescriptionText = () => {
        return (
            <React.Fragment>
                {auth_status?.is_already_attempted && (is_mismatch_error || is_expired_or_failed_error) ? (
                    <Localize
                        i18n_default_text="We'll review your proof of identity again and will give you an update as soon as possible.<0/>"
                        components={[<br key={0} />]}
                    />
                ) : (
                    <Localize
                        i18n_default_text='We’ll review your documents and notify you of its status within 5 minutes.<0/>'
                        components={[<br key={0} />]}
                    />
                )}
                {auth_status?.needs_poa && <Localize i18n_default_text="Next, we'll need your proof of address." />}
            </React.Fragment>
        );
    };

    const descriptions: Record<typeof status, React.ReactElement | null> = {
        none: null,
        pending: getPendingDescriptionText(),
        rejected: (
            <Localize
                i18n_default_text='We were unable to verify your ID with the details you provided.<0/>Please upload your identity document.'
                components={[<br key={0} />]}
            />
        ),
        verified:
            auth_status?.needs_poa && !is_mobile ? (
                <Localize i18n_default_text="Next, we'll need your proof of address." />
            ) : null,
        expired: (
            <Localize
                i18n_default_text='We were unable to verify your ID with the details you provided.<0/>Please upload your identity document.'
                components={[<br key={0} />]}
            />
        ),
        suspected: (
            <Localize
                i18n_default_text='We were unable to verify your ID with the details you provided.<0/>Please upload your identity document.'
                components={[<br key={0} />]}
            />
        ),
    };

    const icons: Record<typeof status, string> = {
        none: '',
        pending: 'IcIdvDocumentPending',
        rejected: 'IcIdvDocumentRejected',
        verified: 'IcIdvVerified',
        expired: 'IcIdvDocumentRejected',
        suspected: 'IcIdvDocumentRejected',
    };

    const action_buttons: Record<
        typeof status,
        null | ((onClick?: () => void, platform_name?: string) => JSX.Element | null)
    > = {
        none: null,
        pending: pendingButton,
        rejected: rejectedButton,
        verified: verifiedButton,
        expired: rejectedButton,
        suspected: rejectedButton,
    };

    return {
        title: titles[status],
        description: descriptions[status],
        icon: icons[status],
        action_button: action_buttons[status],
    };
};

type TAuthUploadCompleteStatus = TAuthStatus & {
    is_manual_upload?: boolean;
};

export const getUploadCompleteStatusMessages = (
    status: typeof AUTH_STATUS_CODES[keyof typeof AUTH_STATUS_CODES],
    auth_status?: TAuthUploadCompleteStatus,
    should_show_redirect_btn?: boolean,
    is_from_external?: boolean
) => {
    const is_redirected_from_platform = isNavigationFromP2P() || isNavigationFromDerivGO();

    const pendingButton = (onClick?: () => void, platform_name?: string) => {
        if (!auth_status?.needs_poa) {
            if (!is_from_external && should_show_redirect_btn)
                return (
                    <VerificationStatusActionButton
                        button_text={
                            <Localize i18n_default_text='Back to {{platform_name}}' values={{ platform_name }} />
                        }
                        onClick={onClick}
                    />
                );
            if (!is_redirected_from_platform) {
                return (
                    <VerificationStatusActionButton
                        to='/'
                        button_text={<Localize i18n_default_text='Continue trading' />}
                    />
                );
            }
        }
        if (auth_status?.needs_poa) {
            return (
                <React.Fragment>
                    <VerificationStatusActionButton
                        to={routes.proof_of_address}
                        button_text={<Localize i18n_default_text='Submit proof of address' />}
                    />
                    {!is_from_external && should_show_redirect_btn && (
                        <VerificationStatusActionButton
                            button_text={
                                <Localize i18n_default_text='Back to {{platform_name}}' values={{ platform_name }} />
                            }
                            onClick={onClick}
                        />
                    )}
                </React.Fragment>
            );
        }
        return null;
    };

    const titles: Record<typeof status, React.ReactElement | null> = {
        expired: null,
        none: null,
        pending: <Localize i18n_default_text='Your documents were submitted successfully' />,
        rejected: null,
        suspected: null,
        verified: null,
    };

    const descriptions: Record<typeof status, React.ReactElement | null> = {
        expired: null,
        none: null,
        pending: (
            <div>
                {auth_status?.is_manual_upload ? (
                    <Localize i18n_default_text='We’ll review your documents and notify you of its status within 1 - 3 working days.' />
                ) : (
                    <Localize i18n_default_text='We’ll review your documents and notify you of its status within 5 minutes.' />
                )}
                {auth_status?.needs_poa && (
                    <Localize
                        i18n_default_text='<0/>You must also submit a proof of address.'
                        components={[<br key={0} />]}
                    />
                )}
            </div>
        ),
        rejected: null,
        suspected: null,
        verified: null,
    };

    const icons: Record<typeof status, string> = {
        expired: '',
        none: '',
        pending: 'IcPoiVerified',
        rejected: '',
        suspected: '',
        verified: '',
    };

    const action_buttons: Record<
        typeof status,
        null | ((onClick?: () => void, platform_name?: string) => JSX.Element | null)
    > = {
        expired: null,
        none: null,
        pending: pendingButton,
        rejected: null,
        suspected: null,
        verified: null,
    };

    return {
        title: titles[status],
        description: descriptions[status],
        icon: icons[status],
        action_button: action_buttons[status],
    };
};
