import React from 'react';
import { Dialog, UnhandledErrorModal } from '@deriv/components';
import { localize } from '@deriv/translations';
import { observer, useStore } from '@deriv/stores';

const CFDServerErrorDialog = observer(() => {
    const { ui, modules } = useStore();
    const { enableApp, disableApp } = ui;
    const { cfd } = modules;
    const { clearCFDError, error_message, error_type, has_cfd_error, is_cfd_success_dialog_enabled } = cfd;

    const should_show_error =
        has_cfd_error &&
        !is_cfd_success_dialog_enabled &&
        error_type &&
        !['PasswordReset', 'PasswordError'].includes(error_type);

    if (should_show_error) {
        return error_message ? (
            <Dialog
                title={localize('Something’s not right')}
                confirm_button_text={localize('OK')}
                onConfirm={clearCFDError}
                disableApp={disableApp}
                enableApp={enableApp}
                is_visible={should_show_error}
            >
                {error_message}
            </Dialog>
        ) : (
            <UnhandledErrorModal />
        );
    }
    return null;
});
export default CFDServerErrorDialog;
