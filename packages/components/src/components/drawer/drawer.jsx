import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../icon';
import { isTabletDrawer } from '@deriv/shared';

// TODO: use-from-shared - Use this icon from icons' shared package
const IconDrawer = ({ className }) => (
    <svg className={className} xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'>
        <path
            fill='var(--text-less-prominent)'
            fillRule='nonzero'
            d='M8.87 2.164l5 5.5a.5.5 0 0 1 0 .672l-5 5.5a.5.5 0 0 1-.74-.672L12.824 8 8.13 2.836a.5.5 0 0 1 .74-.672zm-5 0l5 5.5a.5.5 0 0 1 0 .672l-5 5.5a.5.5 0 0 1-.74-.672L7.824 8 3.13 2.836a.5.5 0 1 1 .74-.672z'
        />
    </svg>
);

const Drawer = ({
    anchor = 'left',
    children,
    className,
    contentClassName,
    footer,
    header,
    width = 250,
    zIndex = 4,
    ...props
}) => {
    const [is_open, setIsOpen] = React.useState(props.is_open);

    React.useEffect(() => {
        setIsOpen(props.is_open);
    }, [props.is_open]);

    const toggleDrawer = () => {
        setIsOpen(!is_open);
        if (props.toggleDrawer) {
            props.toggleDrawer(!is_open);
        }
    };

    // Note: Cannot use isMobile from @deriv/shared due to dimension change error
    // TODO: Maybe we can fix isMobile in @deriv/shared
    const is_mobile = isTabletDrawer();

    return (
        <div
            data-testid='drawer'
            className={classNames('dc-drawer', className, {
                [`dc-drawer--${anchor}`]: !is_mobile,
                'dc-drawer--open': is_open,
            })}
            style={{
                zIndex,
                transform:
                    is_open &&
                    !is_mobile &&
                    (anchor === 'left'
                        ? `translateX(calc(${width}px - 16px))`
                        : `translateX(calc(-${width}px + 16px))`),
            }}
        >
            <div
                className={classNames('dc-drawer__toggle', {
                    'dc-drawer__toggle--open': is_open,
                })}
                onClick={toggleDrawer}
            >
                {is_mobile ? (
                    <Icon icon='IcChevronUp' className='dc-drawer__toggle-icon' />
                ) : (
                    <IconDrawer
                        className={classNames('dc-drawer__toggle-icon', {
                            [`dc-drawer__toggle-icon--${anchor}`]: !is_mobile,
                        })}
                    />
                )}
            </div>
            <div className={classNames('dc-drawer__container', { [`dc-drawer__container--${anchor}`]: !is_mobile })}>
                {header && <div className='dc-drawer__header'>{header}</div>}
                <div className={classNames('dc-drawer__content', contentClassName)}>{children}</div>
                {footer && <div className='dc-drawer__footer'>{footer}</div>}
            </div>
        </div>
    );
};

Drawer.propTypes = {
    anchor: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    footer: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    header: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    width: PropTypes.number,
    zIndex: PropTypes.number,
    is_open: PropTypes.bool,
    toggleDrawer: PropTypes.func,
};

export default Drawer;
