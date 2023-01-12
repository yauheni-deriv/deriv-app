import React from 'react';
import { Loading } from '@deriv/components';
import RootStore from 'Stores/index';
import { connect } from 'Stores/connect';

type TBlocklyLoadingProps = {
    is_loading: boolean;
};

const BlocklyLoading: React.FC<TBlocklyLoadingProps> = ({ is_loading }) => (
    <>
        {is_loading && (
            <div className='bot__loading'>
                <Loading />
            </div>
        )}
    </>
);

export default connect(({ blockly_store }: RootStore) => ({
    is_loading: blockly_store.is_loading,
}))(BlocklyLoading);
