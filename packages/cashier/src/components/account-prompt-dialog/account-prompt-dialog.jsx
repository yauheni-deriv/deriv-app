import PropTypes from 'prop-types';
import React from 'react';
import { Dialog } from '@deriv/components';
import { isCryptocurrency } from '@deriv/shared';
import { localize, Localize } from '@deriv/translations';
import { useStore, observer } from '@deriv/stores';

const AccountPromptDialog = observer(() => {
    const {
        client: { accounts },
        modules: {
            cashier: {
                account_prompt_dialog: { continueRoute, is_confirmed, last_location, onCancel, onConfirm, should_show },
            },
        },
    } = useStore();

    React.useEffect(continueRoute, [is_confirmed, last_location, continueRoute]);

    const non_crypto_account_loginid = React.useMemo(
        () =>
            Object.entries(accounts).reduce((initial_value, [loginid, settings]) => {
                return !settings.is_virtual && !isCryptocurrency(settings.currency) ? loginid : initial_value;
            }, ''),
        [accounts]
    );

    const non_crypto_currency = non_crypto_account_loginid && accounts[non_crypto_account_loginid].currency;

    return (
        <Dialog
            className='acc-prompt-dialog'
            title={localize('Switch account?')}
            confirm_button_text={localize('Switch account')}
            cancel_button_text={localize('Cancel')}
            onConfirm={onConfirm}
            onCancel={onCancel}
            is_visible={should_show}
        >
            <Localize
                i18n_default_text='To deposit money, please switch to your {{currency_symbol}} account.'
                values={{
                    currency_symbol: non_crypto_currency?.toUpperCase(),
                }}
            />
        </Dialog>
    );
});

AccountPromptDialog.propTypes = {
    accounts: PropTypes.object,
    continueRoute: PropTypes.func,
    is_confirmed: PropTypes.bool,
    last_location: PropTypes.string,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    should_show: PropTypes.bool,
};

export default AccountPromptDialog;
