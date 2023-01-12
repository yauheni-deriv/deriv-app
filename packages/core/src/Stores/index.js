import ClientStore from './client-store';
import CommonStore from './common-store';
import GTMStore from './gtm-store';
import RudderStackStore from './rudderstack-store';
import PushWooshStore from './pushwoosh-store';
import ModulesStore from './Modules';
import MenuStore from './menu-store';
import NotificationStore from './notification-store';
import UIStore from './ui-store';
import ActiveSymbolsStore from './active-symbols-store';
import PortfolioStore from './portfolio-store';
import ContractReplayStore from './contract-replay-store';
import ContractTradeStore from './contract-trade-store';
import { ChartBarrierStore } from './chart-barrier-store';
import TradingHubStore from './tradinghub-store';

export default class RootStore {
    constructor() {
        this.client = new ClientStore(this);
        this.common = new CommonStore(this);
        this.modules = new ModulesStore(this);
        this.ui = new UIStore(this);
        this.gtm = new GTMStore(this);
        this.rudderstack = new RudderStackStore(this);
        this.menu = new MenuStore(this);
        this.pushwoosh = new PushWooshStore(this);
        this.notifications = new NotificationStore(this);
        this.active_symbols = new ActiveSymbolsStore(this);
        this.portfolio = new PortfolioStore(this);
        this.contract_replay = new ContractReplayStore(this);
        this.contract_trade = new ContractTradeStore(this);
        this.chart_barrier_store = new ChartBarrierStore(this);
        this.tradinghub = new TradingHubStore(this);
    }
}
