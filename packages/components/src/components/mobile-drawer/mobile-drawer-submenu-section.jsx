import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Text from '../text/text';
import Icon from '../icon/icon';

const SubMenuSection = props => {
    const { submenu_toggle_class, section_title, section_icon, children } = props;
    return (
        <div className={classNames('dc-mobile-drawer__submenu-section', submenu_toggle_class)}>
            <div className='dc-mobile-drawer__submenu-section-title'>
                {section_icon && <Icon className='dc-mobile-drawer__submenu-section-title-icon' icon={section_icon} />}
                {section_title && (
                    <Text as='h3' size='xs' weight='bold' className='dc-mobile-drawer__submenu-section-title-text'>
                        {section_title}
                    </Text>
                )}
            </div>
            <div className='dc-mobile-drawer__submenu-section-content'>{children}</div>
        </div>
    );
};

SubMenuSection.propTypes = {
    children: PropTypes.node,
    section_icon: PropTypes.string,
    section_title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    submenu_toggle_class: PropTypes.string,
};

export default React.memo(SubMenuSection);
