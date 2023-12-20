import React from 'react';
import { ButtonToggle } from '@deriv/components';
import { observer } from '@deriv/stores';
import { localize } from 'Components/i18next';
import ToggleContainer from 'Components/toggle-container';
import { my_profile_tabs } from 'Constants/my-profile-tabs';
import { useStores } from 'Stores';

const MyProfileHeader = () => {
    const { my_profile_store } = useStores();

    const getMyProfileTabFilters = () => [
        {
            text: localize('Stats'),
            value: my_profile_tabs.MY_STATS,
        },
        {
            text: localize('Payment methods'),
            value: my_profile_tabs.PAYMENT_METHODS,
        },
        {
            text: localize('Ad details'),
            value: my_profile_tabs.AD_TEMPLATE,
        },
        {
            text: localize('My counterparties'),
            value: my_profile_tabs.MY_COUNTERPARTIES,
        },
    ];

    const onChangeTab = (event: { target: { value: string; name: string } }) =>
        my_profile_store.setActiveTab(event.target.value);

    return (
        <ToggleContainer>
            <ButtonToggle
                buttons_arr={getMyProfileTabFilters()}
                className='my-profile-header'
                is_animated
                name='profile-header'
                onChange={onChangeTab}
                value={my_profile_store.active_tab}
                has_rounded_button
            />
        </ToggleContainer>
    );
};

export default observer(MyProfileHeader);
