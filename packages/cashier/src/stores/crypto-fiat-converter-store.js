import { action, observable, makeObservable } from 'mobx';
import { getDecimalPlaces } from '@deriv/shared';

export default class CryptoFiatConverterStore {
    constructor({ WS, root_store }) {
        makeObservable(this, {
            converter_from_amount: observable,
            converter_to_amount: observable,
            converter_from_error: observable,
            converter_to_error: observable,
            is_timer_visible: observable,
            setConverterFromAmount: action.bound,
            setConverterToAmount: action.bound,
            setConverterFromError: action.bound,
            setConverterToError: action.bound,
            setIsTimerVisible: action.bound,
            resetTimer: action.bound,
            getExchangeRate: action.bound,
            validateFromAmount: action.bound,
            validateToAmount: action.bound,
            onChangeConverterFromAmount: action.bound,
            onChangeConverterToAmount: action.bound,
            resetConverter: action.bound,
        });

        this.root_store = root_store;
        this.WS = WS;
    }

    converter_from_amount = '';
    converter_to_amount = '';
    converter_from_error = '';
    converter_to_error = '';
    is_timer_visible = false;

    setConverterFromAmount(amount) {
        this.converter_from_amount = amount;
    }

    setConverterToAmount(amount) {
        this.converter_to_amount = amount;
    }

    setConverterFromError(error) {
        this.converter_from_error = error;
    }

    setConverterToError(error) {
        this.converter_to_error = error;
    }

    setIsTimerVisible(is_timer_visible) {
        this.is_timer_visible = is_timer_visible;
    }

    resetTimer() {
        this.setIsTimerVisible(false);
    }

    async getExchangeRate(from_currency, to_currency) {
        const { exchange_rates } = await this.WS.send({
            exchange_rates: 1,
            base_currency: from_currency,
        });
        return exchange_rates.rates[to_currency];
    }

    validateFromAmount() {
        const { account_transfer, general_store, withdraw } = this.root_store.modules.cashier;

        if (general_store.active_container === account_transfer.container) {
            account_transfer.validateTransferFromAmount();
        } else {
            withdraw.validateWithdrawFromAmount();
        }
    }

    validateToAmount() {
        const { account_transfer, general_store, withdraw } = this.root_store.modules.cashier;

        if (general_store.active_container === account_transfer.container) {
            account_transfer.validateTransferToAmount();
        } else {
            withdraw.validateWithdrawToAmount();
        }
    }

    async onChangeConverterFromAmount({ target }, from_currency, to_currency) {
        const { account_transfer, general_store } = this.root_store.modules.cashier;

        this.resetTimer();
        if (target.value) {
            this.setConverterFromAmount(target.value);
            this.validateFromAmount();
            general_store.percentageSelectorSelectionStatus(true);
            general_store.calculatePercentage();
            if (this.converter_from_error) {
                this.setConverterToAmount('');
                this.setConverterToError('');
                this.setIsTimerVisible(false);
                account_transfer.setAccountTransferAmount('');
            } else {
                const rate = await this.getExchangeRate(from_currency, to_currency);
                const decimals = getDecimalPlaces(to_currency);
                const amount = (rate * target.value).toFixed(decimals);
                if (+amount || this.converter_from_amount) {
                    this.setConverterToAmount(amount);
                } else {
                    this.setConverterToAmount('');
                }
                this.validateToAmount();
                this.setConverterToError('');
                this.setIsTimerVisible(true);
                account_transfer.setAccountTransferAmount(target.value);
            }
        } else {
            this.resetConverter();
        }
    }

    async onChangeConverterToAmount({ target }, from_currency, to_currency) {
        const { account_transfer, general_store } = this.root_store.modules.cashier;

        this.resetTimer();
        if (target.value) {
            this.setConverterToAmount(target.value);
            this.validateToAmount();
            if (this.converter_to_error) {
                this.setConverterFromAmount('');
                this.setConverterFromError('');
                this.setIsTimerVisible(false);
                account_transfer.setAccountTransferAmount('');
            } else {
                const rate = await this.getExchangeRate(from_currency, to_currency);
                const decimals = getDecimalPlaces(to_currency);
                const amount = (rate * target.value).toFixed(decimals);
                if (+amount || this.converter_to_amount) {
                    this.setConverterFromAmount(amount);
                } else {
                    this.setConverterFromAmount('');
                }
                general_store.percentageSelectorSelectionStatus(true);
                general_store.calculatePercentage();
                this.validateFromAmount();
                if (this.converter_from_error) {
                    this.setIsTimerVisible(false);
                    account_transfer.setAccountTransferAmount('');
                } else {
                    this.setConverterFromError('');
                    this.setIsTimerVisible(true);
                    account_transfer.setAccountTransferAmount(amount);
                }
            }
        } else {
            this.resetConverter();
        }
    }

    resetConverter() {
        this.setConverterFromAmount('');
        this.setConverterToAmount('');
        this.setConverterFromError('');
        this.setConverterToError('');
        this.setIsTimerVisible(false);
        this.root_store.modules.cashier.general_store.percentageSelectorSelectionStatus(true);
    }
}
