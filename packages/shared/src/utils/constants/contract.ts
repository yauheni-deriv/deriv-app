import React from 'react';
import { localize } from '@deriv/translations';
import { shouldShowCancellation, shouldShowExpiration, TURBOS } from '../contract';

export const getLocalizedBasis = () =>
    ({
        accumulator: localize('Accumulators'),
        payout: localize('Payout'),
        payout_per_point: localize('Payout per point'),
        stake: localize('Stake'),
        multiplier: localize('Multiplier'),
        turbos: localize('Turbos'),
    } as const);

/**
 * components can be undef or an array containing any of: 'start_date', 'barrier', 'last_digit'
 *     ['duration', 'amount'] are omitted, as they're available in all contract types
 */
type TContractTypesConfig = {
    title: string;
    trade_types: string[];
    basis: string[];
    components: string[];
    barrier_count?: number;
    config?: { hide_duration?: boolean; should_override?: boolean };
};

type TGetContractTypesConfig = (symbol: string) => Record<string, TContractTypesConfig>;

type TContractConfig = {
    button_name?: React.ReactNode;
    name: React.ReactNode;
    position: string;
};

type TGetSupportedContracts = keyof ReturnType<typeof getSupportedContracts>;

export const getContractTypesConfig: TGetContractTypesConfig = symbol => ({
    rise_fall: {
        title: localize('Rise/Fall'),
        trade_types: ['CALL', 'PUT'],
        basis: ['stake', 'payout'],
        components: ['start_date'],
        barrier_count: 0,
    },
    rise_fall_equal: {
        title: localize('Rise/Fall'),
        trade_types: ['CALLE', 'PUTE'],
        basis: ['stake', 'payout'],
        components: ['start_date'],
        barrier_count: 0,
    },
    high_low: {
        title: localize('Higher/Lower'),
        trade_types: ['CALL', 'PUT'],
        basis: ['stake', 'payout'],
        components: ['barrier'],
        barrier_count: 1,
    },
    touch: {
        title: localize('Touch/No Touch'),
        trade_types: ['ONETOUCH', 'NOTOUCH'],
        basis: ['stake', 'payout'],
        components: ['barrier'],
    },
    end: {
        title: localize('Ends In/Ends Out'),
        trade_types: ['EXPIRYMISS', 'EXPIRYRANGE'],
        basis: ['stake', 'payout'],
        components: ['barrier'],
    },
    stay: {
        title: localize('Stays In/Goes Out'),
        trade_types: ['RANGE', 'UPORDOWN'],
        basis: ['stake', 'payout'],
        components: ['barrier'],
    },
    asian: {
        title: localize('Asian Up/Asian Down'),
        trade_types: ['ASIANU', 'ASIAND'],
        basis: ['stake', 'payout'],
        components: [],
    },
    match_diff: {
        title: localize('Matches/Differs'),
        trade_types: ['DIGITMATCH', 'DIGITDIFF'],
        basis: ['stake', 'payout'],
        components: ['last_digit'],
    },
    even_odd: {
        title: localize('Even/Odd'),
        trade_types: ['DIGITODD', 'DIGITEVEN'],
        basis: ['stake', 'payout'],
        components: [],
    },
    over_under: {
        title: localize('Over/Under'),
        trade_types: ['DIGITOVER', 'DIGITUNDER'],
        basis: ['stake', 'payout'],
        components: ['last_digit'],
    },
    // TODO: update the rest of these contracts config
    lb_call: { title: localize('Close-to-Low'), trade_types: ['LBFLOATCALL'], basis: ['multiplier'], components: [] },
    lb_put: { title: localize('High-to-Close'), trade_types: ['LBFLOATPUT'], basis: ['multiplier'], components: [] },
    lb_high_low: { title: localize('High-to-Low'), trade_types: ['LBHIGHLOW'], basis: ['multiplier'], components: [] },
    tick_high_low: {
        title: localize('High Tick/Low Tick'),
        trade_types: ['TICKHIGH', 'TICKLOW'],
        basis: [],
        components: [],
    },
    run_high_low: {
        title: localize('Only Ups/Only Downs'),
        trade_types: ['RUNHIGH', 'RUNLOW'],
        basis: [],
        components: [],
    },
    reset: {
        title: localize('Reset Up/Reset Down'),
        trade_types: ['RESETCALL', 'RESETPUT'],
        basis: [],
        components: [],
    },
    callputspread: {
        title: localize('Spread Up/Spread Down'),
        trade_types: ['CALLSPREAD', 'PUTSPREAD'],
        basis: [],
        components: [],
    },
    accumulator: {
        title: localize('Accumulators'),
        trade_types: ['ACCU'],
        basis: ['stake'],
        components: ['take_profit', 'accumulator', 'accu_info_display'],
        barrier_count: 2,
        config: { hide_duration: true },
    },
    multiplier: {
        title: localize('Multipliers'),
        trade_types: ['MULTUP', 'MULTDOWN'],
        basis: ['stake'],
        components: [
            'take_profit',
            'stop_loss',
            ...(shouldShowCancellation(symbol) ? ['cancellation'] : []),
            ...(shouldShowExpiration(symbol) ? ['expiration'] : []),
        ],
        config: { hide_duration: true },
    }, // hide Duration for Multiplier contracts for now
    turboslong: {
        title: localize('Long/Short'),
        trade_types: ['TURBOSLONG'],
        basis: ['stake'],
        barrier_count: 1,
        components: ['trade_type_tabs', 'barrier_selector', 'take_profit'],
    },
    turbosshort: {
        title: localize('Long/Short'),
        trade_types: ['TURBOSSHORT'],
        basis: ['stake'],
        barrier_count: 1,
        components: ['trade_type_tabs', 'barrier_selector', 'take_profit'],
    },
    vanilla: {
        title: localize('Call/Put'),
        trade_types: ['VANILLALONGCALL', 'VANILLALONGPUT'],
        basis: ['stake'],
        components: ['duration', 'strike', 'amount', 'trade_type_tabs'],
        barrier_count: 1,
        config: { should_override: true },
    },
});

// Config for rendering trade options
export const getContractCategoriesConfig = () =>
    ({
        Turbos: { name: localize('Turbos'), categories: [TURBOS.LONG, TURBOS.SHORT] },
        Multipliers: { name: localize('Multipliers'), categories: ['multiplier'] },
        'Ups & Downs': {
            name: localize('Ups & Downs'),
            categories: ['rise_fall', 'rise_fall_equal', 'run_high_low', 'reset', 'asian', 'callputspread'],
        },
        'Highs & Lows': { name: localize('Highs & Lows'), categories: ['high_low', 'touch', 'tick_high_low'] },
        'Ins & Outs': { name: localize('Ins & Outs'), categories: ['end', 'stay'] },
        'Look Backs': { name: localize('Look Backs'), categories: ['lb_high_low', 'lb_put', 'lb_call'] },
        Digits: { name: localize('Digits'), categories: ['match_diff', 'even_odd', 'over_under'] },
        Vanillas: { name: localize('Vanillas'), categories: ['vanilla'] },
        Accumulators: { name: localize('Accumulators'), categories: ['accumulator'] },
    } as const);

export const unsupported_contract_types_list = [
    // TODO: remove these once all contract types are supported
    'callputspread',
    'run_high_low',
    'reset',
    'asian',
    'tick_high_low',
    'end',
    'stay',
    'lb_call',
    'lb_put',
    'lb_high_low',
];

export const getCardLabels = () =>
    ({
        APPLY: localize('Apply'),
        BARRIER: localize('Barrier:'),
        BUY_PRICE: localize('Buy price:'),
        CANCEL: localize('Cancel'),
        CLOSE: localize('Close'),
        CONTRACT_VALUE: localize('Contract value:'),
        CURRENT_STAKE: localize('Current stake:'),
        DAY: localize('day'),
        DAYS: localize('days'),
        DEAL_CANCEL_FEE: localize('Deal cancel. fee:'),
        DECREMENT_VALUE: localize('Decrement value'),
        DONT_SHOW_THIS_AGAIN: localize("Don't show this again"),
        ENTRY_SPOT: localize('Entry spot:'),
        INCREMENT_VALUE: localize('Increment value'),
        NOT_AVAILABLE: localize('N/A'),
        RESALE_NOT_OFFERED: localize('Resale not offered'),
        SELL: localize('Sell'),
        STAKE: localize('Stake:'),
        STOP_LOSS: localize('Stop loss:'),
        STRIKE: localize('Strike:'),
        TICK: localize('Tick '),
        TICKS: localize('Ticks'),
        TOTAL_PROFIT_LOSS: localize('Total profit/loss:'),
        PROFIT_LOSS: localize('Profit/Loss:'),
        POTENTIAL_PROFIT_LOSS: localize('Potential profit/loss:'),
        INDICATIVE_PRICE: localize('Indicative price:'),
        INITIAL_STAKE: localize('Initial stake:'),
        LOST: localize('Lost'),
        PAYOUT: localize('Sell price:'),
        PURCHASE_PRICE: localize('Buy price:'),
        POTENTIAL_PAYOUT: localize('Payout limit:'),
        TAKE_PROFIT: localize('Take profit:'),
        TAKE_PROFIT_LOSS_NOT_AVAILABLE: localize(
            'Take profit and/or stop loss are not available while deal cancellation is active.'
        ),
        WON: localize('Won'),
    } as const);

export const getMarketNamesMap = () =>
    ({
        FRXAUDCAD: localize('AUD/CAD'),
        FRXAUDCHF: localize('AUD/CHF'),
        FRXAUDJPY: localize('AUD/JPY'),
        FRXAUDNZD: localize('AUD/NZD'),
        FRXAUDPLN: localize('AUD/PLN'),
        FRXAUDUSD: localize('AUD/USD'),
        FRXBROUSD: localize('Oil/USD'),
        FRXEURAUD: localize('EUR/AUD'),
        FRXEURCAD: localize('EUR/CAD'),
        FRXEURCHF: localize('EUR/CHF'),
        FRXEURGBP: localize('EUR/GBP'),
        FRXEURJPY: localize('EUR/JPY'),
        FRXEURNZD: localize('EUR/NZD'),
        FRXEURUSD: localize('EUR/USD'),
        FRXGBPAUD: localize('GBP/AUD'),
        FRXGBPCAD: localize('GBP/CAD'),
        FRXGBPCHF: localize('GBP/CHF'),
        FRXGBPJPY: localize('GBP/JPY'),
        FRXGBPNOK: localize('GBP/NOK'),
        FRXGBPUSD: localize('GBP/USD'),
        FRXNZDJPY: localize('NZD/JPY'),
        FRXNZDUSD: localize('NZD/USD'),
        FRXUSDCAD: localize('USD/CAD'),
        FRXUSDCHF: localize('USD/CHF'),
        FRXUSDJPY: localize('USD/JPY'),
        FRXUSDNOK: localize('USD/NOK'),
        FRXUSDPLN: localize('USD/PLN'),
        FRXUSDSEK: localize('USD/SEK'),
        FRXXAGUSD: localize('Silver/USD'),
        FRXXAUUSD: localize('Gold/USD'),
        FRXXPDUSD: localize('Palladium/USD'),
        FRXXPTUSD: localize('Platinum/USD'),
        OTC_AEX: localize('Netherlands 25'),
        OTC_AS51: localize('Australia 200'),
        OTC_DJI: localize('Wall Street 30'),
        OTC_FCHI: localize('France 40'),
        OTC_FTSE: localize('UK 100'),
        OTC_GDAXI: localize('Germany 40'),
        OTC_HSI: localize('Hong Kong 50'),
        OTC_IBEX35: localize('Spanish Index'),
        OTC_N225: localize('Japan 225'),
        OTC_NDX: localize('US Tech 100'),
        OTC_SPC: localize('US 500'),
        OTC_SSMI: localize('Swiss 20'),
        OTC_SX5E: localize('Euro 50'),
        R_10: localize('Volatility 10 Index'),
        R_25: localize('Volatility 25 Index'),
        R_50: localize('Volatility 50 Index'),
        R_75: localize('Volatility 75 Index'),
        R_100: localize('Volatility 100 Index'),
        BOOM300N: localize('Boom 300 Index'),
        BOOM500: localize('Boom 500 Index'),
        BOOM1000: localize('Boom 1000 Index'),
        CRASH300N: localize('Crash 300 Index'),
        CRASH500: localize('Crash 500 Index'),
        CRASH1000: localize('Crash 1000 Index'),
        RDBEAR: localize('Bear Market Index'),
        RDBULL: localize('Bull Market Index'),
        STPRNG: localize('Step Index'),
        WLDAUD: localize('AUD Basket'),
        WLDEUR: localize('EUR Basket'),
        WLDGBP: localize('GBP Basket'),
        WLDXAU: localize('Gold Basket'),
        WLDUSD: localize('USD Basket'),
        '1HZ10V': localize('Volatility 10 (1s) Index'),
        '1HZ100V': localize('Volatility 100 (1s) Index'),
        '1HZ150V': localize('Volatility 150 (1s) Index'),
        '1HZ200V': localize('Volatility 200 (1s) Index'),
        '1HZ250V': localize('Volatility 250 (1s) Index'),
        '1HZ300V': localize('Volatility 300 (1s) Index'),
        JD10: localize('Jump 10 Index'),
        JD25: localize('Jump 25 Index'),
        JD50: localize('Jump 50 Index'),
        JD75: localize('Jump 75 Index'),
        JD100: localize('Jump 100 Index'),
        JD150: localize('Jump 150 Index'),
        JD200: localize('Jump 200 Index'),
        CRYBCHUSD: localize('BCH/USD'),
        CRYBNBUSD: localize('BNB/USD'),
        CRYBTCLTC: localize('BTC/LTC'),
        CRYIOTUSD: localize('IOT/USD'),
        CRYNEOUSD: localize('NEO/USD'),
        CRYOMGUSD: localize('OMG/USD'),
        CRYTRXUSD: localize('TRX/USD'),
        CRYBTCETH: localize('BTC/ETH'),
        CRYZECUSD: localize('ZEC/USD'),
        CRYXMRUSD: localize('ZMR/USD'),
        CRYXMLUSD: localize('XLM/USD'),
        CRYXRPUSD: localize('XRP/USD'),
        CRYBTCUSD: localize('BTC/USD'),
        CRYDSHUSD: localize('DSH/USD'),
        CRYETHUSD: localize('ETH/USD'),
        CRYEOSUSD: localize('EOS/USD'),
        CRYLTCUSD: localize('LTC/USD'),
    } as const);

export const getUnsupportedContracts = () =>
    ({
        RESETCALL: {
            name: localize('Reset Call'),
            position: 'top',
        },
        RESETPUT: {
            name: localize('Reset Put'),
            position: 'bottom',
        },
        TICKHIGH: {
            name: localize('High Tick'),
            position: 'top',
        },
        TICKLOW: {
            name: localize('Low Tick'),
            position: 'bottom',
        },
        LBFLOATCALL: {
            name: localize('Close-to-Low'),
            position: 'top',
        },
        LBFLOATPUT: {
            name: localize('High-to-Close'),
            position: 'top',
        },
        LBHIGHLOW: {
            name: localize('High-to-Low'),
            position: 'top',
        },
        CALLSPREAD: {
            name: localize('Spread Up'),
            position: 'top',
        },
        PUTSPREAD: {
            name: localize('Spread Down'),
            position: 'bottom',
        },
    } as const);

export const getSupportedContracts = (is_high_low?: boolean) =>
    ({
        ACCU: {
            button_name: localize('Buy'),
            name: localize('Accumulators'),
            position: 'top',
        },
        CALL: {
            name: is_high_low ? localize('Higher') : localize('Rise'),
            position: 'top',
        },
        PUT: {
            name: is_high_low ? localize('Lower') : localize('Fall'),
            position: 'bottom',
        },
        CALLE: {
            name: localize('Rise'),
            position: 'top',
        },
        PUTE: {
            name: localize('Fall'),
            position: 'bottom',
        },
        DIGITMATCH: {
            name: localize('Matches'),
            position: 'top',
        },
        DIGITDIFF: {
            name: localize('Differs'),
            position: 'bottom',
        },
        DIGITEVEN: {
            name: localize('Even'),
            position: 'top',
        },
        DIGITODD: {
            name: localize('Odd'),
            position: 'bottom',
        },
        DIGITOVER: {
            name: localize('Over'),
            position: 'top',
        },
        DIGITUNDER: {
            name: localize('Under'),
            position: 'bottom',
        },
        ONETOUCH: {
            name: localize('Touch'),
            position: 'top',
        },
        NOTOUCH: {
            name: localize('No Touch'),
            position: 'bottom',
        },
        MULTUP: {
            name: localize('Up'),
            position: 'top',
        },
        MULTDOWN: {
            name: localize('Down'),
            position: 'bottom',
        },
        TURBOSLONG: {
            name: localize('Turbos'),
            button_name: localize('Long'),
            position: 'top',
        },
        TURBOSSHORT: {
            name: localize('Turbos'),
            button_name: localize('Short'),
            position: 'bottom',
        },
        VANILLALONGCALL: {
            name: localize('Call'),
            position: 'top',
        },
        VANILLALONGPUT: {
            name: localize('Put'),
            position: 'bottom',
        },
        RUNHIGH: {
            name: localize('Only Ups'),
            position: 'top',
        },
        RUNLOW: {
            name: localize('Only Downs'),
            position: 'bottom',
        },
        EXPIRYMISS: {
            name: localize('Ends Outside'),
            position: 'top',
        },
        EXPIRYRANGE: {
            name: localize('Ends Between'),
            position: 'bottom',
        },
        RANGE: {
            name: localize('Stays Between'),
            position: 'top',
        },
        UPORDOWN: {
            name: localize('Goes Outside'),
            position: 'bottom',
        },
        ASIANU: {
            name: localize('Asian Up'),
            position: 'top',
        },
        ASIAND: {
            name: localize('Asian Down'),
            position: 'bottom',
        },
    } as const);

export const getContractConfig = (is_high_low?: boolean) => ({
    ...getSupportedContracts(is_high_low),
    ...getUnsupportedContracts(),
});

/*
// TODO we can combine getContractTypeDisplay and getContractTypePosition functions.
the difference between these two functions is just the property they return. (name/position)
*/
export const getContractTypeDisplay = (type: string, is_high_low = false, show_button_name = false) => {
    const contract_config = getContractConfig(is_high_low)[type as TGetSupportedContracts] as TContractConfig;
    return (show_button_name && contract_config?.button_name) || contract_config?.name || '';
};

export const getContractTypePosition = (type: TGetSupportedContracts, is_high_low = false) =>
    getContractConfig(is_high_low)?.[type]?.position || 'top';

export const isCallPut = (trade_type: 'rise_fall' | 'rise_fall_equal' | 'high_low'): boolean =>
    trade_type === 'rise_fall' || trade_type === 'rise_fall_equal' || trade_type === 'high_low';
