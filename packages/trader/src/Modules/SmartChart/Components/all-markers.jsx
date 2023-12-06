// Things to do before touching this file :P
// 1- Please read https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
// 2- Please read RawMarker.jsx in https://github.com/binary-com/SmartCharts
// 3- Please read contract-store.js & trade.jsx carefully
import React from 'react';
import { getContractStatus, getDecimalPlaces, isAccumulatorContract, isVanillaContract } from '@deriv/shared';
import { RawMarker } from 'Modules/SmartChart';
import * as ICONS from './icons';

const is_firefox = navigator.userAgent.search('Firefox') > 0;

const RawMarkerMaker = draw_callback => {
    const Marker = ({ epoch_array, price_array, ...rest }) => (
        <RawMarker
            epoch_array={epoch_array}
            price_array={price_array}
            draw_callback={args => draw_callback({ ...args, ...rest })}
        />
    );
    return Marker;
};

const dark_theme = {
    accu_contract_shade: '#00a79e14',
    accu_shade: '#377cfc14',
    accu_shade_crossed: '#cc2e3d14',
    bg: '#0e0e0e',
    fg: '#ffffff',
    grey_border: '#6e6e6e',
    lost: '#cc2e3d',
    open: '#377cfc',
    sold: '#ffad3a',
    won: '#00a79e',
};

const light_theme = {
    accu_contract_shade: '#4bb4b314',
    accu_shade: '#377cfc14',
    accu_shade_crossed: '#ec3f3f14',
    bg: '#ffffff',
    fg: '#333333',
    grey_border: '#999999',
    lost: '#ec3f3f',
    open: '#377cfc',
    sold: '#ffad3a',
    won: '#4bb4b3',
};

function getColor({ status, profit, is_dark_theme, is_vanilla }) {
    const colors = is_dark_theme ? dark_theme : light_theme;
    let color = colors[status || 'open'];
    if (is_vanilla) {
        if (status === 'open') return colors.open;
        return colors[profit > 0 ? 'won' : 'lost'];
    }
    if (status === 'open' && profit) {
        color = colors[profit > 0 ? 'won' : 'lost'];
    }
    return color;
}

const calc_scale = zoom => {
    return zoom ? Math.max(Math.min(Math.sqrt(zoom / 18), 1.2), 0.8) : 1;
};

const hex_map = [];
const calc_opacity = (from, to) => {
    if (hex_map.length === 0) {
        for (let i = 255; i >= 0; --i) {
            hex_map[i] = (i < 16 ? '0' : '') + i.toString(16);
        }
    }
    const opacity = Math.floor(Math.min(Math.max(to - from - 10, 0) / 6, 1) * 255);
    return hex_map[opacity];
};

/** @param {CanvasRenderingContext2D} ctx */
const draw_path = (ctx, { zoom, top, left, icon }) => {
    ctx.save();
    const scale = calc_scale(zoom);

    ctx.translate(left - (icon.width * scale) / 2, top - (icon.height * scale) / 2);

    ctx.scale(scale, scale);

    icon.paths.forEach(({ points, fill, stroke }) => {
        if (fill) {
            ctx.fillStyle = fill;
        }
        if (stroke) {
            ctx.strokeStyle = stroke;
        }
        ctx.beginPath();
        let prev_x, prev_y;
        for (let idx = 0; idx < points.length; idx++) {
            let x, y, cx1, cx2, cy1, cy2, r;
            if (points[idx] === 'M') {
                x = points[++idx];
                y = points[++idx];
                ctx.moveTo(x, y);
            } else if (points[idx] === 'L') {
                x = points[++idx];
                y = points[++idx];
                ctx.lineTo(x, y);
            } else if (points[idx] === 'V') {
                y = points[++idx];
                ctx.lineTo(prev_x, y);
            } else if (points[idx] === 'H') {
                x = points[++idx];
                ctx.lineTo(x, prev_y);
            } else if (points[idx] === 'Q') {
                cx1 = points[++idx];
                cy1 = points[++idx];
                x = points[++idx];
                y = points[++idx];
                ctx.quadraticCurveTo(cx1, cy1, x, y);
            } else if (points[idx] === 'C') {
                cx1 = points[++idx];
                cy1 = points[++idx];
                cx2 = points[++idx];
                cy2 = points[++idx];
                x = points[++idx];
                y = points[++idx];
                ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x, y);
            } else if (points[idx] === 'A') {
                x = points[++idx];
                y = points[++idx];
                r = points[++idx];
                const start_a = points[++idx];
                const end_a = points[++idx];
                ctx.arc(x, y, r, start_a, end_a);
            }
            prev_x = x;
            prev_y = y;
        }
        ctx.closePath();
        if (fill) {
            ctx.fill();
        }
        if (stroke) {
            ctx.stroke();
        }
    });
    ctx.scale(1, 1);
    ctx.restore();
};

const drawAccuBarrierRange = ({
    coordinates,
    ctx,
    labels,
    has_persistent_borders,
    previous_tick,
    scale,
    shade_color,
    stroke_color,
}) => {
    ctx.save();
    const { bottom, start_left, top } = coordinates;
    const end_left =
        coordinates.end_left ?? ctx.canvas.offsetWidth - ctx.canvas.parentElement.stx.panels.chart.yaxisTotalWidthRight;
    const end_top = ctx.canvas.offsetHeight - ctx.canvas.parentElement.stx.xaxisHeight;
    const is_top_visible = top < end_top && (top >= 0 || !has_persistent_borders);
    const is_bottom_visible = bottom < end_top;
    // using 2 instead of 0 to distance the top barrier line from the top of the chart and make it clearly visible in C.Details:
    const persistent_top = top < 0 && has_persistent_borders ? 2 : end_top;
    const displayed_top = is_top_visible ? top : persistent_top;
    const displayed_bottom = is_bottom_visible ? bottom : end_top;
    const is_start_left_visible = start_left < end_left;
    const middle_top = bottom - Math.abs(bottom - top) / 2;
    if (!is_start_left_visible) return;
    ctx.lineWidth = 1;
    ctx.strokeStyle = stroke_color;
    ctx.setLineDash([]);
    ctx.font = labels?.font;
    ctx.textAlign = 'right';

    if (is_top_visible || has_persistent_borders) {
        ctx.fillStyle = stroke_color;
        // draw difference between high barrier and previous spot price
        if (labels?.top) {
            ctx.fillText(labels?.top, end_left - 1, displayed_top - 10);
        }
        // draw top barrier with an arrow
        ctx.beginPath();
        ctx.moveTo(end_left, displayed_top);
        ctx.lineTo(start_left - 2.5, displayed_top);
        ctx.lineTo(start_left, displayed_top + 4.5);
        ctx.lineTo(start_left + 2.5, displayed_top);
        ctx.fill();
        ctx.stroke();
    }
    if (middle_top < end_top && previous_tick) {
        const { draw_line_without_tick_marker, radius, stroke_color: prev_tick_stroke_color } = previous_tick || {};
        ctx.fillStyle = prev_tick_stroke_color;
        ctx.globalCompositeOperation = 'destination-over';
        if (prev_tick_stroke_color && !draw_line_without_tick_marker) {
            // draw previous tick marker in DTrader
            ctx.strokeStyle = prev_tick_stroke_color;
            ctx.beginPath();
            ctx.arc(start_left - 1 * scale, middle_top, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
        // draw horizontal dashed line between barriers to accentuate that they're related to previous tick
        ctx.strokeStyle = stroke_color;
        ctx.beginPath();
        ctx.setLineDash([2, 4]);
        ctx.moveTo(start_left + (radius || 0), middle_top);
        ctx.lineTo(end_left, middle_top);
        ctx.stroke();
        ctx.globalCompositeOperation = 'source-over';
    }
    if (is_bottom_visible || has_persistent_borders) {
        ctx.fillStyle = stroke_color;
        // draw difference between low barrier and previous spot price
        if (labels?.bottom && displayed_bottom + 12 < end_top) {
            ctx.fillText(labels?.bottom, end_left - 1, displayed_bottom + 12);
        }
        // draw bottom barrier with an arrow
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.moveTo(end_left, displayed_bottom);
        ctx.lineTo(start_left - 2.5, displayed_bottom);
        ctx.lineTo(start_left, displayed_bottom - 4.5);
        ctx.lineTo(start_left + 2.5, displayed_bottom);
        ctx.fill();
        ctx.stroke();
    }
    // draw shaded area between barriers
    ctx.fillStyle = shade_color;
    ctx.fillRect(start_left, displayed_top, end_left - start_left, Math.abs(displayed_bottom - displayed_top));
    ctx.restore();
};

const render_label = ({ ctx, text, tick: { zoom, left, top } }) => {
    const scale = calc_scale(zoom);
    const size = Math.floor(scale * 3 + 7);
    ctx.font = `${size}px Roboto`;
    text.split(/\n/).forEach((line, idx) => {
        const w = Math.ceil(ctx.measureText(line).width);
        ctx.fillText(line, left - 5 - w, top + idx * size + 1);
    });
};

const shadowed_text = ({ ctx, color, is_dark_theme, text, left, top, scale }) => {
    ctx.save();
    ctx.textAlign = 'center';
    const size = Math.floor(scale * 12);
    ctx.font = `bold ${size}px BinarySymbols, Roboto`;
    if (color) ctx.fillStyle = color;
    if (!is_firefox) {
        ctx.shadowColor = is_dark_theme ? 'rgba(16,19,31,1)' : 'rgba(255,255,255,1)';
        ctx.shadowBlur = 12;
    }
    // fillText once in firefox due to disabling of text shadows, for default cases where its enabled, set to 5 (to add blur intensity)
    for (let i = 0; i < (is_firefox ? 1 : 5); ++i) {
        ctx.fillText(text, left, top);
    }
    ctx.restore();
};

const TickContract = RawMarkerMaker(
    ({
        ctx: context,
        canvas_height: canvas_fixed_height,
        points: [start, ...ticks],
        prices: [barrier, barrier_2], // TODO: support two barrier contracts
        is_last_contract,
        is_dark_theme,
        is_in_contract_details,
        granularity,
        contract_info: {
            accu_barriers_difference,
            contract_type,
            exit_tick_time,
            status,
            profit,
            has_crossed_accu_barriers,
            is_accumulator_trade_without_contract,
            is_sold,
            is_expired,
            // tick_stream,
            tick_count,
        },
    }) => {
        /** @type {CanvasRenderingContext2D} */
        const ctx = context;

        const is_accumulator_contract = isAccumulatorContract(contract_type);
        const contract_status = is_accumulator_contract
            ? getContractStatus({ contract_type, profit, exit_tick_time, status })
            : status;
        const is_accu_contract_ended = is_accumulator_contract && contract_status !== 'open';
        const color = getColor({
            is_dark_theme,
            status: contract_status,
            profit: is_sold || is_accu_contract_ended ? profit : null,
        });

        const draw_start_line = is_last_contract && start.visible && !is_sold;
        const scale = calc_scale(start.zoom);
        const canvas_height = canvas_fixed_height / window.devicePixelRatio;

        [barrier, barrier_2].filter(Boolean).forEach(b => {
            b = Math.min(Math.max(b, 2), canvas_height - 32); // eslint-disable-line
        });

        const entry = ticks[0];
        const exit = ticks[ticks.length - 1];
        const previous_tick = ticks[ticks.length - 2] || exit;
        const opacity = is_sold ? calc_opacity(start.left, exit.left) : '';

        if (start && is_accumulator_trade_without_contract) {
            // draw 2 barriers with a shade between them for ACCU trade without contracts
            drawAccuBarrierRange({
                coordinates: {
                    bottom: barrier_2,
                    start_left: start.left,
                    top: barrier,
                },
                ctx,
                labels: accu_barriers_difference,
                previous_tick: {
                    stroke_color: getColor({ status: 'fg', is_dark_theme }) + opacity,
                    radius: 1.5 * scale,
                },
                scale,
                shade_color: getColor({
                    status: has_crossed_accu_barriers ? 'accu_shade_crossed' : 'accu_shade',
                    is_dark_theme,
                }),
                stroke_color: getColor({ status: has_crossed_accu_barriers ? 'lost' : 'open', is_dark_theme }),
            });
            return;
        }
        if (
            barrier &&
            barrier_2 &&
            (((previous_tick || exit) && is_accumulator_contract && is_in_contract_details) ||
                (!contract_type && start))
        ) {
            // draw 2 barriers with a shade between them for an ongoing ACCU contract:
            const contract_details_start_left =
                is_accumulator_contract && contract_status === 'open' ? exit?.left : previous_tick?.left;
            drawAccuBarrierRange({
                coordinates: {
                    bottom: barrier_2,
                    start_left: is_in_contract_details ? contract_details_start_left : start.left,
                    top: barrier,
                },
                ctx,
                // we should show barrier lines in contract details even when they are outside of the chart:
                has_persistent_borders: is_in_contract_details,
                labels: !is_in_contract_details && accu_barriers_difference,
                previous_tick: {
                    draw_line_without_tick_marker: is_in_contract_details,
                    stroke_color: color + opacity,
                    radius: 1.5 * scale,
                },
                scale,
                shade_color: getColor({
                    status:
                        has_crossed_accu_barriers || contract_status === 'lost'
                            ? 'accu_shade_crossed'
                            : 'accu_contract_shade',
                    is_dark_theme,
                }),
                stroke_color: getColor({
                    status: has_crossed_accu_barriers || contract_status === 'lost' ? 'lost' : 'won',
                    is_dark_theme,
                }),
            });
        }
        if (is_in_contract_details) return;

        ctx.save();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;

        if (draw_start_line) {
            render_label({
                ctx,
                text: 'Start\nTime',
                tick: { zoom: start.zoom, left: start.left - 1 * scale, top: canvas_height - 50 },
            });
            ctx.beginPath();
            ctx.setLineDash([3, 3]);
            ctx.moveTo(start.left - 1 * scale, 0);
            if (ticks.length && barrier && !is_accumulator_contract) {
                ctx.lineTo(start.left - 1 * scale, barrier - 34 * scale);
                ctx.moveTo(start.left - 1 * scale, barrier + 4 * scale);
            }
            ctx.lineTo(start.left - 1 * scale, canvas_fixed_height);
            ctx.stroke();
        }

        if (!ticks.length || !barrier) {
            ctx.restore();
            return;
        }

        // barrier line
        if ((start.visible || entry.visible || exit.visible) && (!is_accumulator_contract || is_accu_contract_ended)) {
            const top = is_accumulator_contract ? entry.top : barrier;
            ctx.strokeStyle = color + opacity;
            ctx.beginPath();
            ctx.setLineDash([1, 1]);
            ctx.moveTo(start.left, top);
            ctx.lineTo(entry.left, top);
            ctx.stroke();

            ctx.beginPath();
            ctx.setLineDash([]);
            ctx.moveTo(entry.left, top);
            ctx.lineTo(exit.left, top);
            ctx.stroke();
            ctx.strokeStyle = color;
        }

        // ticks for last contract
        if (is_last_contract && granularity === 0 && !is_sold && !is_accumulator_contract) {
            ticks
                .filter(tick => tick.visible)
                .forEach(tick => {
                    const clr = tick === exit ? color : getColor({ status: 'fg', is_dark_theme });
                    ctx.fillStyle = clr + opacity;
                    ctx.beginPath();
                    ctx.arc(tick.left - 1 * scale, tick.top, 1.5 * scale, 0, Math.PI * 2);
                    ctx.fill();
                });
            ctx.fillStyle = color;
        }
        // entry & expiry markers
        if (granularity === 0) {
            [entry, is_expired || is_accu_contract_ended ? exit : null].forEach(tick => {
                if (tick && tick.visible) {
                    ctx.strokeStyle = color + opacity;
                    ctx.setLineDash([2, 2]);
                    ctx.beginPath();
                    ctx.moveTo(tick.left - 1 * scale, tick.top);
                    if (tick === entry && is_accumulator_contract) {
                        // draw line to start marker having the same y-coordinates:
                        ctx.lineTo(start.left - 1 * scale, entry.top);
                    } else if (tick === exit && is_accumulator_contract) {
                        // draw dashed line from end icon to exit tick:
                        ctx.moveTo(exit.left, entry.top);
                        ctx.lineTo(exit.left, exit.top);
                    } else ctx.lineTo(tick.left - 1 * scale, barrier);
                    ctx.stroke();

                    ctx.fillStyle = color + opacity;
                    ctx.beginPath();
                    ctx.arc(tick.left - 1 * scale, tick.top, 3 * scale, 0, Math.PI * 2);
                    ctx.fill();

                    if (tick === entry) {
                        ctx.beginPath();
                        ctx.fillStyle = getColor({ status: 'bg', is_dark_theme }) + opacity;
                        ctx.arc(tick.left - 1 * scale, tick.top, 2 * scale, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            });
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
        }
        // count down
        if (start.visible && !is_sold && !is_accumulator_contract) {
            shadowed_text({
                ctx,
                scale,
                is_dark_theme,
                text: `${ticks.length - 1}/${tick_count}`,
                left: start.left,
                top: barrier - 27 * scale,
            });
        }

        // start-time marker
        if (start.visible) {
            draw_path(ctx, {
                top: is_accumulator_contract ? entry.top - 9 * scale : barrier - 9 * scale,
                left: start.left - 1 * scale,
                zoom: start.zoom,
                icon: ICONS.START.with_color(
                    color + (is_sold ? opacity : ''),
                    getColor({ status: 'bg', is_dark_theme }) + (is_sold ? opacity : '')
                ),
            });
        }
        // status marker
        if (exit.visible && (is_sold || is_accu_contract_ended)) {
            draw_path(ctx, {
                top: is_accumulator_contract ? entry.top - 9 * scale : barrier - 9 * scale,
                left: exit.left + 8 * scale,
                zoom: exit.zoom,
                icon: ICONS.END.with_color(color, getColor({ status: 'bg', is_dark_theme })),
            });
            if (is_accu_contract_ended) {
                drawAccuBarrierRange({
                    coordinates: {
                        bottom: barrier_2,
                        end_left: exit.left,
                        start_left: previous_tick?.left,
                        top: barrier,
                    },
                    ctx,
                    previous_tick: {
                        stroke_color: color + opacity,
                        radius: 1.5 * scale,
                    },
                    scale,
                    shade_color: getColor({
                        status:
                            has_crossed_accu_barriers || contract_status === 'lost'
                                ? 'accu_shade_crossed'
                                : 'accu_contract_shade',
                        is_dark_theme,
                    }),
                    stroke_color: getColor({
                        status: has_crossed_accu_barriers || contract_status === 'lost' ? 'lost' : 'won',
                        is_dark_theme,
                    }),
                });
            }
        }
        ctx.restore();
    }
);

const currency_symbols = {
    AUD: '\u0041\u0024',
    EUR: '\u20AC',
    GBP: '\u00A3',
    JPY: '\u00A5',
    USD: '\u0024',
    BTC: '\u20bf',
    BCH: '\ue901',
    ETH: '\u0045',
    ETC: '\ue900',
    LTC: '\u0141',
    UST: '\u20ae',
};

const NonTickContract = RawMarkerMaker(
    ({
        ctx: context,
        canvas_height: canvas_fixed_height,
        points: [start, expiry, entry, exit],
        is_last_contract,
        prices: [barrier, entry_tick_top, exit_tick_top], // TODO: support two barrier contracts
        is_dark_theme,
        granularity,
        currency,
        contract_info: {
            contract_type,
            // exit_tick_time,
            // is_expired,
            is_sold,
            status,
            profit,
        },
    }) => {
        /** @type {CanvasRenderingContext2D} */
        const ctx = context;

        // the y value reported for candles is not accurate
        if (granularity !== 0) {
            if (entry) {
                entry.top = entry_tick_top;
            }
            if (exit) {
                exit.top = exit_tick_top;
            }
        }

        const color = getColor({ status, profit, is_dark_theme, is_vanilla: isVanillaContract(contract_type) });

        ctx.save();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;

        const draw_start_line = is_last_contract && start.visible && !is_sold;
        const show_profit = is_last_contract && !is_sold && profit && start.visible && barrier;
        const scale = calc_scale(start.zoom);
        const opacity = is_sold ? calc_opacity(start.left, expiry.left) : '';

        const canvas_height = canvas_fixed_height / window.devicePixelRatio;
        if (barrier) {
            barrier = Math.min(Math.max(barrier, 2), canvas_height - 32); // eslint-disable-line
        }

        if (draw_start_line) {
            render_label({
                ctx,
                text: 'Start\nTime',
                tick: {
                    zoom: start.zoom,
                    left: start.left - 1 * scale,
                    top: canvas_height - 50,
                },
            });
            ctx.beginPath();
            ctx.setLineDash([3, 3]);
            ctx.moveTo(start.left - 1 * scale, 0);
            if (barrier) {
                ctx.lineTo(start.left - 1 * scale, barrier - (show_profit ? 38 : 20) * scale);
                ctx.moveTo(start.left - 1 * scale, barrier + 4 * scale);
            }
            ctx.lineTo(start.left - 1 * scale, canvas_fixed_height);
            ctx.stroke();
        }
        // barrier line
        if (barrier && entry && (start.visible || expiry.visible || Math.sign(start.left) !== Math.sign(expiry.left))) {
            ctx.strokeStyle = color + opacity;
            ctx.beginPath();
            ctx.setLineDash([1, 1]);
            ctx.moveTo(start.left, barrier);
            ctx.lineTo(entry.left, barrier);
            ctx.stroke();

            ctx.beginPath();
            ctx.setLineDash([]);
            ctx.moveTo(entry.left, barrier);
            ctx.lineTo(expiry.left, barrier);
            ctx.stroke();
            ctx.strokeStyle = color;
        }

        // entry & expiry tick markers
        [entry, exit].forEach(tick => {
            if (tick && tick.visible) {
                ctx.strokeStyle = color + opacity;
                ctx.setLineDash([2, 2]);
                ctx.beginPath();
                ctx.moveTo(tick.left - 1 * scale, tick.top);
                ctx.lineTo(tick.left - 1 * scale, barrier);
                ctx.stroke();

                ctx.fillStyle = color + opacity;
                ctx.beginPath();
                ctx.arc(tick.left - 1 * scale, tick.top, 3 * scale, 0, Math.PI * 2);
                ctx.fill();

                if (tick === entry) {
                    ctx.beginPath();
                    ctx.fillStyle = getColor({ status: 'bg', is_dark_theme }) + opacity;
                    ctx.arc(tick.left - 1 * scale, tick.top, 2 * scale, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
            }
        });

        // start-time marker
        if (start && start.visible && barrier) {
            draw_path(ctx, {
                top: barrier - 9 * scale,
                left: start.left - 1 * scale,
                zoom: start.zoom,
                icon: ICONS.START.with_color(color + opacity),
            });
        }
        // show the profit
        if (show_profit) {
            const symbol = currency_symbols[currency] || '';
            const decimal_places = getDecimalPlaces(currency);
            const sign = profit < 0 ? '-' : profit > 0 ? '+' : ' '; // eslint-disable-line
            const text = `${sign}${symbol}${Math.abs(profit).toFixed(decimal_places)}`;
            shadowed_text({
                ctx,
                color: getColor({ status: 'open', profit }),
                scale,
                text,
                is_dark_theme,
                left: start.left,
                top: barrier - 28 * scale,
            });
        }
        // status marker
        if (expiry.visible) {
            draw_path(ctx, {
                top: barrier - 9 * scale,
                left: expiry.left + 8 * scale,
                zoom: expiry.zoom,
                icon: ICONS.END.with_color(color, getColor({ status: 'bg', is_dark_theme })),
            });
        }
        ctx.restore();
    }
);

const DigitContract = RawMarkerMaker(
    ({
        ctx: context,
        points: [start, ...ticks],
        prices: [entry_tick_top, exit_tick_top],
        is_last_contract,
        is_dark_theme,
        granularity,
        contract_info: {
            // contract_type,
            status,
            profit,
            is_sold,
            // barrier,
            tick_stream,
            tick_count,
        },
    }) => {
        /** @type {CanvasRenderingContext2D} */
        const ctx = context;

        const color = getColor({
            is_dark_theme,
            status,
            profit: is_sold ? profit : null,
        });

        ctx.save();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;

        const draw_start_line = is_last_contract && start.visible && !is_sold;
        const scale = calc_scale(start.zoom);

        if (granularity !== 0 && start && entry_tick_top) {
            start.top = entry_tick_top;
        }
        if (draw_start_line) {
            ctx.beginPath();
            ctx.setLineDash([3, 3]);
            ctx.moveTo(start.left - 1 * scale, 0);
            if (ticks.length) {
                ctx.lineTo(start.left - 1 * scale, start.top - 34 * scale);
                ctx.moveTo(start.left - 1 * scale, start.top + 4 * scale);
            }
            ctx.lineTo(start.left - 1 * scale, ctx.canvas.height);
            ctx.stroke();
        }

        if (!ticks.length) {
            ctx.restore();
            return;
        }
        const expiry = ticks[ticks.length - 1];
        const opacity = is_sold ? calc_opacity(start.left, expiry.left) : '';
        if (granularity !== 0 && expiry && exit_tick_top) {
            expiry.top = exit_tick_top;
        }

        // count down
        if (start.visible && start.top && !is_sold) {
            shadowed_text({
                ctx,
                scale,
                is_dark_theme,
                text: `${ticks.length}/${tick_count}`,
                left: start.left - 1 * scale,
                top: start.top - 27 * scale,
            });
        }
        // start-time marker
        if (start.visible && (granularity === 0 || !is_sold)) {
            draw_path(ctx, {
                top: start.top - 9 * scale,
                left: start.left - 1 * scale,
                zoom: start.zoom,
                icon: ICONS.START.with_color(color + opacity, getColor({ status: 'bg', is_dark_theme }) + opacity),
            });
        }
        // remaining ticks
        ticks.forEach((tick, idx) => {
            if (tick !== expiry) {
                return;
            }
            if (!tick.visible) {
                return;
            }
            if (granularity !== 0 && tick !== expiry) {
                return;
            }
            if (granularity !== 0 && tick === expiry && !is_sold) {
                return;
            }
            const clr = tick !== expiry ? getColor({ status: 'fg', is_dark_theme }) : color;
            ctx.beginPath();
            ctx.fillStyle = clr;
            ctx.arc(tick.left, tick.top, 7 * scale, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = is_sold ? color : getColor({ status: 'bg', is_dark_theme });
            ctx.arc(tick.left, tick.top, 6 * scale, 0, Math.PI * 2);
            ctx.fill();

            const last_tick = tick_stream[idx];
            const last_digit = last_tick.tick_display_value.slice(-1);
            ctx.fillStyle = is_sold ? 'white' : clr;
            ctx.textAlign = 'center';
            ctx.shadowBlur = 0;
            ctx.font = `bold ${12 * scale}px BinarySymbols, Roboto`;
            ctx.fillText(last_digit, tick.left, tick.top);
        });
        // status marker
        if (expiry.visible && is_sold) {
            ctx.fillStyle = color;
            draw_path(ctx, {
                top: expiry.top - 16 * scale,
                left: expiry.left + 8 * scale,
                zoom: expiry.zoom,
                icon: ICONS.END.with_color(color, getColor({ status: 'bg', is_dark_theme })),
            });
        }
        ctx.restore();
    }
);

export default {
    TickContract,
    NonTickContract,
    DigitContract,
};
