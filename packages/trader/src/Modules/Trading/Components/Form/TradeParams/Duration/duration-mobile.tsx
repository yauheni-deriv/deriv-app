import React from 'react';
import { Tabs, TickPicker, Numpad, RelativeDatepicker } from '@deriv/components';
import { isEmptyObject, addComma, getDurationMinMaxValues, getUnitMap } from '@deriv/shared';
import { Localize, localize } from '@deriv/translations';
import { observer, useStore } from '@deriv/stores';
import { useTraderStore } from 'Stores/useTraderStores';
import moment from 'moment';
import ExpiryText from './expiry-text';
import DurationRangeText from './duration-range-text';
import type { TTradeParamsMobile } from 'Modules/Trading/Containers/trade-params-mobile';

type TDuration = Pick<
    TTradeParamsMobile,
    | 'amount_tab_idx'
    | 'd_duration'
    | 'duration_tab_idx'
    | 'h_duration'
    | 'm_duration'
    | 's_duration'
    | 't_duration'
    | 'has_amount_error'
    | 'payout_value'
    | 'setDurationError'
    | 'setDurationTabIdx'
    | 'setSelectedDuration'
    | 'stake_value'
    | 'toggleModal'
> & {
    expiry_epoch?: string | number;
};

type TNumber = Pick<
    TDuration,
    | 'expiry_epoch'
    | 'has_amount_error'
    | 'payout_value'
    | 'setDurationError'
    | 'setSelectedDuration'
    | 'stake_value'
    | 'toggleModal'
> & {
    basis_option: string;
    contract_expiry?: string;
    duration_unit_option: ReturnType<typeof useTraderStore>['duration_units_list'][0];
    duration_values?: Record<string, number>;
    selected_duration: number;
    show_expiry?: boolean;
};

type TTicks = Omit<TNumber, 'expiry_epoch' | 'contract_expiry' | 'duration_unit_option' | 'show_expiry'>;

type TDurationUnit = 't' | 's' | 'm' | 'h' | 'd';

const submit_label = localize('OK');

const updateAmountChanges = (
    obj: Record<string, string | number>,
    stake_value: number,
    payout_value: number,
    basis: string,
    trade_basis: string,
    trade_amount: number
) => {
    // TODO: Move onChangeMultiple outside of duration and amount
    //  and unify all trade parameter components to use same onMultipleChange func onSubmit
    // Checks if Amount tab was changed to stake and stake value was updated
    if (basis === 'stake' && stake_value !== trade_amount) {
        obj.basis = 'stake';
        obj.amount = stake_value;
        // Checks if Amount tab was changed to payout and payout value was updated
    } else if (basis === 'payout' && payout_value !== trade_amount) {
        obj.basis = 'payout';
        obj.amount = payout_value;
        // Checks if Amount tab was changed but payout or stake value was not updated
    } else if (trade_basis !== basis) {
        obj.basis = basis;
        obj.amount = trade_amount;
    }
};

const Ticks = observer(
    ({
        setDurationError,
        basis_option,
        toggleModal,
        has_amount_error,
        payout_value,
        stake_value,
        selected_duration,
        setSelectedDuration,
    }: TTicks) => {
        const {
            duration_min_max,
            duration: trade_duration,
            duration_unit: trade_duration_unit,
            basis: trade_basis,
            amount: trade_amount,
            onChangeMultiple,
        } = useTraderStore();
        React.useEffect(() => {
            setDurationError(false);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        const [min_tick, max_tick] = getDurationMinMaxValues(duration_min_max, 'tick', 't');

        const setTickDuration = (value: { target: { value: number; name: string } }) => {
            const { value: duration } = value.target;
            const on_change_obj: Record<string, string | number> = {};

            // check for any amount changes from Amount trade params tab before submitting onChange object
            if (!has_amount_error)
                updateAmountChanges(on_change_obj, stake_value, payout_value, basis_option, trade_basis, trade_amount);

            if (trade_duration !== duration || trade_duration_unit !== 't') {
                on_change_obj.duration_unit = 't';
                on_change_obj.duration = duration;
            }

            if (!isEmptyObject(on_change_obj)) onChangeMultiple(on_change_obj);
            toggleModal();
        };

        const onTickChange = (tick: number) => setSelectedDuration('t', tick);
        const tick_duration =
            trade_duration < Number(min_tick) && selected_duration < Number(min_tick)
                ? Number(min_tick)
                : selected_duration;
        return (
            <div className='trade-params__duration-tickpicker'>
                <TickPicker
                    default_value={tick_duration}
                    submit_label={submit_label}
                    max_value={Number(max_tick)}
                    min_value={Number(min_tick)}
                    onSubmit={setTickDuration}
                    onValueChange={onTickChange}
                    singular_label={localize('Tick')}
                    plural_label={localize('Ticks')}
                />
            </div>
        );
    }
);

const Numbers = observer(
    ({
        basis_option,
        contract_expiry = 'intraday',
        duration_unit_option,
        duration_values,
        expiry_epoch,
        has_amount_error,
        payout_value,
        selected_duration,
        setDurationError,
        setSelectedDuration,
        stake_value,
        show_expiry = false,
        toggleModal,
    }: TNumber) => {
        const { ui } = useStore();
        const { addToast } = ui;
        const {
            duration_min_max,
            duration: trade_duration,
            duration_unit: trade_duration_unit,
            basis: trade_basis,
            amount: trade_amount,
            onChangeMultiple,
        } = useTraderStore();
        const { value: duration_unit } = duration_unit_option;
        const [min, max] = getDurationMinMaxValues(duration_min_max, contract_expiry, duration_unit);
        const [has_error, setHasError] = React.useState(false);

        const validateDuration = (value: number | string) => {
            const localized_message = (
                <Localize
                    i18n_default_text='Should be between {{min}} and {{max}}'
                    values={{
                        min,
                        max: addComma(max, 0, false),
                    }}
                />
            );
            if (parseInt(value as string) < Number(min) || Math.trunc(selected_duration) > Number(max)) {
                addToast({ key: 'duration_error', content: localized_message, type: 'error', timeout: 2000 });
                setDurationError(true);
                setHasError(true);
                return 'error';
            } else if (parseInt(value as string) > Number(max)) {
                addToast({ key: 'duration_error', content: localized_message, type: 'error', timeout: 2000 });
                setHasError(true);
                return 'error';
            } else if (value.toString().length < 1) {
                addToast({ key: 'duration_error', content: localized_message, type: 'error', timeout: 2000 });
                setDurationError(true);
                setHasError(true);
                return false;
            }

            setDurationError(false);
            setHasError(false);
            return true;
        };

        const setDuration = (duration: string | number) => {
            const on_change_obj: Record<string, string | number> = {};

            // check for any amount changes from Amount trade params tab before submitting onChange object
            if (!has_amount_error)
                updateAmountChanges(on_change_obj, stake_value, payout_value, basis_option, trade_basis, trade_amount);

            if (trade_duration !== Number(duration) || trade_duration_unit !== duration_unit) {
                on_change_obj.duration_unit = duration_unit;
                on_change_obj.duration = duration;
                on_change_obj.expiry_type = 'duration';
            }

            if (!isEmptyObject(on_change_obj)) onChangeMultiple(on_change_obj);
            toggleModal();
        };

        const setExpiryDate = (epoch: number, duration: string | number) => {
            if (trade_duration_unit !== 'd') {
                return moment.utc().add(Number(duration), 'days').format('D MMM YYYY, [23]:[59]:[59] [GMT +0]');
            }
            let expiry_date = new Date((epoch - trade_duration * 24 * 60 * 60) * 1000);
            if (duration) {
                expiry_date = new Date(expiry_date.getTime() + Number(duration) * 24 * 60 * 60 * 1000);
            }

            return expiry_date
                .toUTCString()
                .replace('GMT', 'GMT +0')
                .substring(5)
                .replace(/(\d{2}) (\w{3} \d{4})/, '$1 $2,');
        };

        const onNumberChange = (num: number | string) => {
            setSelectedDuration(duration_unit, Number(num));
            validateDuration(num);
        };

        const fixed_date = !has_error ? setExpiryDate(Number(expiry_epoch), Number(duration_values?.d_duration)) : '';

        const { name_plural, name } = getUnitMap()[duration_unit];
        const duration_unit_text = name_plural ?? name;

        return (
            <div className='trade-params__amount-keypad'>
                <div className='text-container'>
                    <DurationRangeText min={min} max={max} duration_unit_text={duration_unit_text} />
                    {show_expiry && <ExpiryText fixed_date={fixed_date} />}
                </div>
                <Numpad
                    value={selected_duration}
                    onSubmit={setDuration}
                    render={({ value: v, className }) => {
                        return <div className={className}>{v}</div>;
                    }}
                    pip_size={0}
                    submit_label={submit_label}
                    min={Number(min)}
                    max={Number(max)}
                    reset_press_interval={350}
                    reset_value=''
                    onValidate={validateDuration}
                    onValueChange={onNumberChange}
                />
            </div>
        );
    }
);

const Duration = observer(
    ({
        amount_tab_idx,
        d_duration,
        duration_tab_idx,
        expiry_epoch,
        h_duration,
        has_amount_error,
        m_duration,
        payout_value,
        s_duration,
        setDurationError,
        setDurationTabIdx,
        setSelectedDuration,
        stake_value,
        t_duration,
        toggleModal,
    }: TDuration) => {
        const { duration_units_list, duration_min_max, duration_unit, basis: trade_basis } = useTraderStore();
        const duration_values = {
            t_duration,
            s_duration,
            m_duration,
            h_duration,
            d_duration,
        };
        const has_selected_tab_idx = typeof duration_tab_idx !== 'undefined';
        const active_index = has_selected_tab_idx
            ? duration_tab_idx
            : duration_units_list.findIndex(d => d.value === duration_unit);
        const [min, max] = getDurationMinMaxValues(duration_min_max, 'daily', 'd');
        const handleRelativeChange = (date: number) => {
            setSelectedDuration('d', date);
        };
        const selected_basis_option = () => {
            if (amount_tab_idx === 0) {
                return 'stake';
            } else if (amount_tab_idx === 1) {
                return 'payout';
            }
            return trade_basis;
        };

        const onTabChange = (index: number) => {
            setDurationTabIdx(index);
            const { value: unit } = duration_units_list[index];
            setSelectedDuration(unit, duration_values[`${unit as TDurationUnit}_duration`]);
        };

        return (
            <div>
                <Tabs active_index={active_index} onTabItemClick={num => onTabChange(num)} single_tab_has_no_label top>
                    {duration_units_list.map(duration_unit_option => {
                        switch (duration_unit_option.value) {
                            case 't':
                                return (
                                    <div label={duration_unit_option.text} key={duration_unit_option.value}>
                                        <Ticks
                                            basis_option={selected_basis_option()}
                                            has_amount_error={has_amount_error}
                                            toggleModal={toggleModal}
                                            selected_duration={t_duration}
                                            setDurationError={setDurationError}
                                            setSelectedDuration={setSelectedDuration}
                                            stake_value={stake_value}
                                            payout_value={payout_value}
                                        />
                                    </div>
                                );
                            case 's':
                                return (
                                    <div label={duration_unit_option.text} key={duration_unit_option.value}>
                                        <Numbers
                                            basis_option={selected_basis_option()}
                                            has_amount_error={has_amount_error}
                                            toggleModal={toggleModal}
                                            duration_unit_option={duration_unit_option}
                                            selected_duration={s_duration}
                                            setDurationError={setDurationError}
                                            setSelectedDuration={setSelectedDuration}
                                            stake_value={stake_value}
                                            payout_value={payout_value}
                                        />
                                    </div>
                                );
                            case 'm':
                                return (
                                    <div label={duration_unit_option.text} key={duration_unit_option.value}>
                                        <Numbers
                                            basis_option={selected_basis_option()}
                                            has_amount_error={has_amount_error}
                                            toggleModal={toggleModal}
                                            duration_unit_option={duration_unit_option}
                                            selected_duration={m_duration}
                                            setDurationError={setDurationError}
                                            setSelectedDuration={setSelectedDuration}
                                            stake_value={stake_value}
                                            payout_value={payout_value}
                                        />
                                    </div>
                                );
                            case 'h':
                                return (
                                    <div label={duration_unit_option.text} key={duration_unit_option.value}>
                                        <Numbers
                                            basis_option={selected_basis_option()}
                                            has_amount_error={has_amount_error}
                                            toggleModal={toggleModal}
                                            duration_unit_option={duration_unit_option}
                                            selected_duration={h_duration}
                                            setDurationError={setDurationError}
                                            setSelectedDuration={setSelectedDuration}
                                            stake_value={stake_value}
                                            payout_value={payout_value}
                                        />
                                    </div>
                                );
                            case 'd':
                                return (
                                    <div label={duration_unit_option.text} key={duration_unit_option.value}>
                                        <Numbers
                                            basis_option={selected_basis_option()}
                                            has_amount_error={has_amount_error}
                                            toggleModal={toggleModal}
                                            duration_unit_option={duration_unit_option}
                                            contract_expiry='daily'
                                            selected_duration={d_duration}
                                            setDurationError={setDurationError}
                                            setSelectedDuration={setSelectedDuration}
                                            stake_value={stake_value}
                                            show_expiry
                                            payout_value={payout_value}
                                            expiry_epoch={expiry_epoch}
                                            duration_values={duration_values}
                                        />
                                        <RelativeDatepicker
                                            onChange={handleRelativeChange}
                                            min_date={min}
                                            max_date={max}
                                            title={localize('Pick an end date')}
                                        />
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })}
                </Tabs>
            </div>
        );
    }
);

export default Duration;
