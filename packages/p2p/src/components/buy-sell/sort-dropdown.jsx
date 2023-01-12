import React from 'react';
import { Dropdown, Icon } from '@deriv/components';
import { isDesktop } from '@deriv/shared';
import { observer } from 'mobx-react-lite';
import { localize } from 'Components/i18next';
import { useStores } from 'Stores';
import 'Components/buy-sell/sort-dropdown.scss';

const SortDropdown = () => {
    const { buy_sell_store } = useStores();

    if (isDesktop()) {
        return (
            <Dropdown
                className='sort-dropdown'
                classNameLabel='sort-dropdown--label'
                is_align_text_left
                list={buy_sell_store.sort_list}
                onChange={buy_sell_store.handleChange}
                placeholder={localize('Sort by')}
                value={buy_sell_store.selected_value}
            />
        );
    }

    return (
        <div
            data-testid='sort-div'
            className='sort-dropdown--sort'
            onClick={() => buy_sell_store.setIsSortDropdownOpen(true)}
        >
            <Icon icon='IcCashierSort' size={16} data_testid='mobile-view-sort-icon' />
        </div>
    );
};

export default observer(SortDropdown);
