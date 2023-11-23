import React from 'react';
import RejectedReasons from 'Components/poi/status/rejected-reasons';
import Unsupported from 'Components/poi/status/unsupported';
import { getPOIStatusMessages, getUploadCompleteStatusMessages } from './proof-of-identity-utils';
import { AUTH_STATUS_CODES, getPlatformRedirect, platforms } from '@deriv/shared';
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
                    rejected_reasons={rejected_reasons}
                    handleRequireSubmission={handleRequireSubmission}
                />
            );
        case AUTH_STATUS_CODES.PENDING:
        case AUTH_STATUS_CODES.VERIFIED:
        case AUTH_STATUS_CODES.EXPIRED:
            return (
                <VerificationStatus
                    status_title={content.title}
                    status_description={content.description}
                    icon={content.icon}
                    action_button={content.action_button?.(onClick, from_platform.name)}
                />
            );
        default:
            return null;
    }
};

export default Onfido;
