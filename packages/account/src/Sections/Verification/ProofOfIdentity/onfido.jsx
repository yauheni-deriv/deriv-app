import React from 'react';
import { AUTH_STATUS_CODES, formatOnfidoError, getPlatformRedirect, platforms } from '@deriv/shared';
import RejectedReasons from 'Components/poi/status/rejected-reasons';
import Unsupported from 'Components/poi/status/unsupported';
import { getPOIStatusMessages, getUploadCompleteStatusMessages } from './proof-of-identity-configs';
import VerificationStatus from '../../../Components/verification-status/verification-status';

const Onfido = ({
    handleRequireSubmission,
    is_from_external,
    needs_poa,
    onfido,
    redirect_button,
    manual,
    setIsCfdPoiCompleted,
    country_code,
    handleViewComplete,
    routeBackTo,
    app_routing_history,
}) => {
    const { status, submissions_left, last_rejected: rejected_reasons } = onfido;
    const from_platform = getPlatformRedirect(app_routing_history);

    const onClickRedirectButton = () => {
        const platform = platforms[from_platform.ref];
        const { is_hard_redirect = false, url = '' } = platform ?? {};
        if (is_hard_redirect) {
            window.location.href = url;
            window.sessionStorage.removeItem('config.platform');
        } else {
            routeBackTo(from_platform.route);
        }
    };

    const status_content = React.useMemo(
        () => getPOIStatusMessages(status, { needs_poa }, !!redirect_button, is_from_external),
        [status, needs_poa, redirect_button, is_from_external]
    );

    const upload_complete_status_content = React.useMemo(
        () => getUploadCompleteStatusMessages('pending', { needs_poa }, !!redirect_button, is_from_external),
        [needs_poa, redirect_button, is_from_external]
    );

    let onClick, content;
    if (status === AUTH_STATUS_CODES.VERIFIED || status === AUTH_STATUS_CODES.PENDING) {
        onClick = onClickRedirectButton;
    } else if (status === AUTH_STATUS_CODES.EXPIRED) {
        onClick = handleRequireSubmission;
    }
    if (status === AUTH_STATUS_CODES.PENDING) {
        content = upload_complete_status_content;
    }
    if (content === AUTH_STATUS_CODES.VERIFIED || content === AUTH_STATUS_CODES.EXPIRED) {
        content = status_content;
    }

    switch (status) {
        case AUTH_STATUS_CODES.REJECTED:
        case AUTH_STATUS_CODES.SUSPECTED:
        case AUTH_STATUS_CODES.EXPIRED: {
            const submission_errors = formatOnfidoError(status, rejected_reasons);
            if (Number(submissions_left) < 1) {
                return (
                    <Unsupported
                        manual={manual}
                        is_from_external={is_from_external}
                        setIsCfdPoiCompleted={setIsCfdPoiCompleted}
                        country_code={country_code}
                        handleViewComplete={handleViewComplete}
                        onfido={onfido}
                    />
                );
            }
            return (
                <RejectedReasons
                    rejected_reasons={submission_errors}
                    handleRequireSubmission={handleRequireSubmission}
                />
            );
        }
        case AUTH_STATUS_CODES.PENDING:
        case AUTH_STATUS_CODES.VERIFIED:
            return (
                <VerificationStatus
                    icon={content.icon}
                    status_description={content.description}
                    status_title={content.title}
                >
                    {content.action_button?.(onClick, from_platform.name)}
                </VerificationStatus>
            );
        default:
            return null;
    }
};

export default Onfido;
