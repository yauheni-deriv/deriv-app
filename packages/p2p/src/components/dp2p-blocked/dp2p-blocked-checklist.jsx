import * as React from 'react';
import { Checklist } from '@deriv/components';
import { routes } from '@deriv/shared';
import { observer } from 'mobx-react-lite';
import { useStores } from 'Stores';
import { localize } from '../i18next';

const Dp2pBlockedChecklist = () => {
    const { general_store } = useStores();
    const { history } = general_store.props;

    if (general_store.is_high_risk_fully_authed_without_fa && !general_store.is_p2p_blocked_for_pa) {
        const checklist_items = [
            {
                content: localize('Complete the financial assessment form'),
                status: 'action',
                onClick: () =>
                    history.push({
                        pathname: routes.financial_assessment,
                    }),
            },
        ];

        return (
            <div className='dp2p-blocked__checklist-container'>
                <Checklist className='dp2p-blocked__checklist' items={checklist_items} />
            </div>
        );
    }

    return null;
};

export default observer(Dp2pBlockedChecklist);
