import React from 'react';
import { AUTH_STATUS_CODES, formatIDVError, getPlatformRedirect, platforms } from '@deriv/shared';
import { getIDVStatusMessages } from './proof-of-identity-utils';
import VerificationStatus from '../../../Components/verification-status/verification-status';

const Idv = ({
    handleRequireSubmission,
    idv,
    is_from_external,
    needs_poa,
    redirect_button,
    routeBackTo,
    app_routing_history,
    is_already_attempted,
}) => {
    const { status, submissions_left, last_rejected } = idv;
    const from_platform = getPlatformRedirect(app_routing_history);

    const status_content = React.useMemo(
        () =>
            getIDVStatusMessages(
                status,
                { needs_poa, is_already_attempted, mismatch_status: formatIDVError(last_rejected, status) },
                !!redirect_button,
                is_from_external
            ),
        [status, needs_poa, redirect_button, is_from_external, last_rejected, is_already_attempted]
    );

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

    let onClick;

    if (AUTH_STATUS_CODES.VERIFIED) {
        onClick = handleRequireSubmission;
    } else {
        onClick = onClickRedirectButton;
    }

    if (
        [AUTH_STATUS_CODES.REJECTED, AUTH_STATUS_CODES.SUSPECTED, AUTH_STATUS_CODES.EXPIRED].some(
            item => item === status
        ) &&
        Number(submissions_left) >= 1
    ) {
        return null;
    }
    return (
        <VerificationStatus
            icon={status_content.icon}
            status_description={status_content.description}
            status_title={status_content.title}
        >
            {status_content.action_button?.(onClick, from_platform.name)}
        </VerificationStatus>
    );
};

export default Idv;
