import PropTypes from 'prop-types';
import React from 'react';
import { DesktopWrapper, MobileDialog, MobileWrapper } from '@deriv/components';
import { localize } from '@deriv/translations';
import ContractTypeMenu from './ContractTypeMenu';

const ContractTypeDialog = ({
    children,
    is_info_dialog_open,
    onClose,
    is_open,
    item,
    list,
    selected,
    categories,
    onBackButtonClick,
    onChangeInput,
    onCategoryClick,
    show_loading,
}) => (
    <React.Fragment>
        <MobileWrapper>
            <span className='contract-type-widget__select-arrow' />
            <MobileDialog
                portal_element_id='modal_root'
                title={localize('Trade type')}
                wrapper_classname='contracts-modal-list'
                visible={is_open}
                onClose={onClose}
                has_content_scroll
            >
                {children}
            </MobileDialog>
        </MobileWrapper>
        <DesktopWrapper>
            <ContractTypeMenu
                is_info_dialog_open={is_info_dialog_open}
                is_open={is_open}
                item={item}
                list={list}
                selected={selected}
                categories={categories}
                onBackButtonClick={onBackButtonClick}
                onChangeInput={onChangeInput}
                onCategoryClick={onCategoryClick}
                show_loading={show_loading}
            >
                {children}
            </ContractTypeMenu>
        </DesktopWrapper>
    </React.Fragment>
);

ContractTypeDialog.propTypes = {
    categories: PropTypes.array,
    children: PropTypes.element,
    is_info_dialog_open: PropTypes.bool,
    is_open: PropTypes.bool,
    item: PropTypes.object,
    list: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onBackButtonClick: PropTypes.func,
    onCategoryClick: PropTypes.func,
    onChangeInput: PropTypes.func,
    onClose: PropTypes.func,
    selected: PropTypes.string,
    show_loading: PropTypes.bool,
};

export default ContractTypeDialog;
