import AccountPromptDialogStore from './account-prompt-dialog-store';
import AccountTransferStore from './account-transfer-store';
import CryptoFiatConverterStore from './crypto-fiat-converter-store';
import DepositStore from './deposit-store';
import ErrorDialogStore from './error-dialog-store';
import ErrorStore from './error-store';
import GeneralStore from './general-store';
import IframeStore from './iframe-store';
import OnRampStore from './on-ramp-store';
import PaymentAgentStore from './payment-agent-store';
import PaymentAgentTransferStore from './payment-agent-transfer-store';
import TransactionHistoryStore from './transaction-history-store';
import WithdrawStore from './withdraw-store';

export default class CashierStore {
    constructor({ root_store, WS }) {
        this.account_prompt_dialog = new AccountPromptDialogStore(root_store);
        this.account_transfer = new AccountTransferStore({ root_store, WS });
        this.crypto_fiat_converter = new CryptoFiatConverterStore({ root_store, WS });
        this.deposit = new DepositStore(WS, root_store);
        this.error_dialog = new ErrorDialogStore();
        this.error = new ErrorStore();
        this.general_store = new GeneralStore({ root_store, WS });
        this.iframe = new IframeStore(root_store);
        this.onramp = new OnRampStore({ root_store, WS });
        this.payment_agent = new PaymentAgentStore({ root_store, WS });
        this.payment_agent_transfer = new PaymentAgentTransferStore({ root_store, WS });
        this.transaction_history = new TransactionHistoryStore({ root_store, WS });
        this.withdraw = new WithdrawStore({ root_store, WS });
    }
}
