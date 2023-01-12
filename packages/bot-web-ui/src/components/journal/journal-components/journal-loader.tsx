import classnames from 'classnames';
import React from 'react';
import ContentLoader from 'react-content-loader';

const JournalLoader = ({ is_mobile }: { is_mobile: boolean }) => (
    <ContentLoader
        className={classnames('journal__loader', { 'journal__loader--mobile': is_mobile })}
        speed={3}
        width={350}
        height={92}
        primaryColor={'var(--general-section-1)'}
        secondaryColor={'var(--general-hover)'}
    >
        <rect x='15' y='15' rx='5' ry='5' width='320' height='40' />
        <rect x='15' y='60' rx='5' ry='5' width='180' height='7' />
    </ContentLoader>
);

export default JournalLoader;
