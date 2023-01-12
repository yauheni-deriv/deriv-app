import ContentLoader from 'react-content-loader';
import React from 'react';
import PropTypes from 'prop-types';
import { DesktopWrapper, MobileWrapper } from '@deriv/components';

const HeaderItemsLoader = ({ speed }) => (
    <ContentLoader
        speed={speed}
        primaryColor={'var(--general-section-1)'}
        secondaryColor={'var(--general-hover)'}
        style={{ width: '150px', height: '48px' }}
    >
        <DesktopWrapper>
            <circle cx='250' cy='65' r='42' />
            <circle cx='355' cy='65' r='42' />
        </DesktopWrapper>
        <MobileWrapper>
            <circle cx='240' cy='65' r='25' />
            <rect x='355' y='50' rx='0' ry='0' width='38' height='38' />
        </MobileWrapper>
    </ContentLoader>
);

HeaderItemsLoader.propTypes = {
    speed: PropTypes.number,
};

export default HeaderItemsLoader;
