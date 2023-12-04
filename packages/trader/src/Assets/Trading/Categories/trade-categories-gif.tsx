import React from 'react';
import ImageAsianUpDown from 'Assets/SvgComponents/trade_explanations/img-asian.svg';
import ImageCloseToLow from 'Assets/SvgComponents/trade_explanations/img-close-to-low.svg';
import ImageEndsInOut from 'Assets/SvgComponents/trade_explanations/img-ends-in-out.svg';
import ImageEvenOdd from 'Assets/SvgComponents/trade_explanations/img-even-odd.svg';
import ImageHighLow from 'Assets/SvgComponents/trade_explanations/img-high-low.svg';
import ImageHighToClose from 'Assets/SvgComponents/trade_explanations/img-high-to-close.svg';
import ImageHighToLow from 'Assets/SvgComponents/trade_explanations/img-high-to-low.svg';
import ImageMatchDiff from 'Assets/SvgComponents/trade_explanations/img-match-diff.svg';
import ImageMultiplier from 'Assets/SvgComponents/trade_explanations/img-multiplier.svg';
import ImageOverUnder from 'Assets/SvgComponents/trade_explanations/img-over-under.svg';
import ImageReset from 'Assets/SvgComponents/trade_explanations/img-reset.svg';
import ImageRiseFall from 'Assets/SvgComponents/trade_explanations/img-rise-fall.svg';
import ImageRunHighLow from 'Assets/SvgComponents/trade_explanations/img-run-high-low.svg';
import ImageSpread from 'Assets/SvgComponents/trade_explanations/img-spread.svg';
import ImageTickHighLow from 'Assets/SvgComponents/trade_explanations/img-tick-high-low.svg';
import ImageTouch from 'Assets/SvgComponents/trade_explanations/img-touch.svg';
import ContractTypeDescriptionVideo from './contract-type-description-video';
import { VANILLALONG, TURBOS } from '@deriv/shared';

// TODO: Replace static image svgs with themed GIFs or animated SVGs
const TradeCategoriesGIF = ({
    category,
    selected_contract_type,
}: {
    category?: string;
    selected_contract_type?: string;
}) => {
    if (category !== selected_contract_type) return null;
    switch (category) {
        case 'asian':
            return <ImageAsianUpDown />;
        case 'callputspread':
            return <ImageSpread />;
        case 'end':
            return <ImageEndsInOut />;
        case 'even_odd':
            return <ImageEvenOdd />;
        case 'high_low':
            return <ImageHighLow />;
        case 'lb_call':
            return <ImageCloseToLow />;
        case 'lb_put':
            return <ImageHighToClose />;
        case 'lb_high_low':
            return <ImageHighToLow />;
        case 'rise_fall':
            return <ImageRiseFall />;
        case 'rise_fall_equal':
            return <ImageRiseFall />;
        case 'match_diff':
            return <ImageMatchDiff />;
        case 'multiplier':
            return <ImageMultiplier />;
        case 'over_under':
            return <ImageOverUnder />;
        case 'reset':
            return <ImageReset />;
        case 'run_high_low':
            return <ImageRunHighLow />;
        case 'accumulator':
            return <ContractTypeDescriptionVideo selected_contract_type={selected_contract_type} />;
        case 'tick_high_low':
            return <ImageTickHighLow />;
        case 'touch':
            return <ImageTouch />;
        case TURBOS.LONG:
        case TURBOS.SHORT:
            return <ContractTypeDescriptionVideo selected_contract_type='turbos' />;
        case VANILLALONG.CALL:
        case VANILLALONG.PUT:
            return <ContractTypeDescriptionVideo selected_contract_type='vanilla' />;
        default:
            return null;
    }
};

export default TradeCategoriesGIF;
