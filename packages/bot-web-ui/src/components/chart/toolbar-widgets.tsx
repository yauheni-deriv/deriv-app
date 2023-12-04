import React from 'react';
import { isDesktop, isMobile } from '@deriv/shared';
import { ChartMode, DrawTools, Share, StudyLegend, ToolbarWidget, Views } from './v1';

type TToolbarWidgetsProps = {
    updateChartType: (chart_type: string) => void;
    updateGranularity: (updateGranularity: number) => void;
};

const ToolbarWidgets = ({ updateChartType, updateGranularity }: TToolbarWidgetsProps) => {
    return (
        <ToolbarWidget position={isMobile() ? 'bottom' : null}>
            <ChartMode portalNodeId='modal_root' onChartType={updateChartType} onGranularity={updateGranularity} />
            {isDesktop() && (
                <>
                    <StudyLegend portalNodeId='modal_root' searchInputClassName='data-hj-whitelist' />
                    <Views portalNodeId='modal_root' searchInputClassName='data-hj-whitelist' />
                    <DrawTools portalNodeId='modal_root' />
                    <Share portalNodeId='modal_root' />
                </>
            )}
        </ToolbarWidget>
    );
};

export default ToolbarWidgets;
