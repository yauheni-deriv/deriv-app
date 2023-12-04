import { FastMarker } from 'Modules/SmartChart';
import { toJS } from 'mobx';
import React, { useMemo } from 'react';

type TChartMarker = {
    marker_config: {
        ContentComponent: 'div';
        x: string | number;
        y: string | number;
    };
    marker_content_props: { className: string };
};
type TRef = {
    setPosition: (position: { epoch: number | null; price: number | null }) => void;
    div: HTMLDivElement;
};

const ChartMarker = ({ marker_config, marker_content_props }: TChartMarker) => {
    const { ContentComponent, ...marker_props } = marker_config;

    // TODO:
    //  - rename x to epoch
    //  - rename y to price
    const onRef = (ref?: TRef) => {
        if (ref) {
            // NOTE: null price means vertical line.
            if (!marker_props.y) {
                const margin = 24; // height of line marker icon

                ref.div.style.height = `calc(100% - ${margin}px)`;
            } else {
                ref.div.style.zIndex = '1';
            }
            ref.setPosition({
                epoch: +marker_props.x,
                price: +marker_props.y,
            });
        }
    };
    const Component = useMemo(() => ContentComponent, []);
    return (
        <FastMarker markerRef={onRef}>
            <Component {...toJS(marker_content_props)} />
        </FastMarker>
    );
};

export default ChartMarker;
