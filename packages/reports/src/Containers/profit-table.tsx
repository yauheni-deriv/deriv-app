import classNames from 'classnames';
import React from 'react';
import { withRouter } from 'react-router';
import { DesktopWrapper, MobileWrapper, DataList, DataTable } from '@deriv/components';
import {
    extractInfoFromShortcode,
    isForwardStarting,
    getContractPath,
    getSupportedContracts,
    getUnsupportedContracts,
} from '@deriv/shared';
import { localize, Localize } from '@deriv/translations';
import { ReportsTableRowLoader } from '../Components/Elements/ContentLoader';
import CompositeCalendar from '../Components/Form/CompositeCalendar';
import { TSupportedContractType, TUnsupportedContractType } from 'Types';
import EmptyTradeHistoryMessage from '../Components/empty-trade-history-message';
import PlaceholderComponent from '../Components/placeholder-component';
import { ReportsMeta } from '../Components/reports-meta';
import { getProfitTableColumnsTemplate } from 'Constants/data-table-constants';
import { observer, useStore } from '@deriv/stores';
import { useReportsStore } from 'Stores/useReportsStores';

type TProfitTable = {
    component_icon: string;
};

type TDataListCell = React.ComponentProps<typeof DataList.Cell>;

type TGetProfitTableColumnsTemplate = ReturnType<typeof getProfitTableColumnsTemplate>;

const getRowAction = (row_obj: { [key: string]: unknown }) => {
    const contract_type = extractInfoFromShortcode(row_obj?.shortcode as string)
        ?.category?.toString()
        .toUpperCase();
    return getSupportedContracts()[contract_type as TSupportedContractType] &&
        !isForwardStarting(row_obj.shortcode as string, Number(row_obj.purchase_time_unix))
        ? getContractPath(Number(row_obj.contract_id))
        : {
              component: (
                  <Localize
                      i18n_default_text="The {{trade_type_name}} contract details aren't currently available. We're working on making them available soon."
                      values={{
                          trade_type_name: getUnsupportedContracts()[contract_type as TUnsupportedContractType]?.name,
                      }}
                  />
              ),
          };
};

const ProfitTable = observer(({ component_icon }: TProfitTable) => {
    const { client } = useStore();
    const { profit_table } = useReportsStore();
    const { currency, is_switching } = client;
    const {
        data,
        date_from,
        date_to,
        error,
        is_empty,
        is_loading,
        handleDateChange,
        handleScroll,
        has_selected_date,
        onMount,
        onUnmount,
        totals,
    } = profit_table;

    React.useEffect(() => {
        onMount();
        return () => {
            onUnmount();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (error) return <p>{error}</p>;

    const filter_component = <CompositeCalendar onChange={handleDateChange} from={date_from} to={date_to} />;

    const columns: TGetProfitTableColumnsTemplate = getProfitTableColumnsTemplate(currency, data.length);

    const columns_map = Object.fromEntries(columns.map(column => [column.col_index, column])) as Record<
        TGetProfitTableColumnsTemplate[number]['col_index'],
        TGetProfitTableColumnsTemplate[number]
    >;

    const mobileRowRenderer: React.ComponentProps<typeof DataList>['rowRenderer'] = ({ row, is_footer }) => {
        const duration_type = /^(MULTUP|MULTDOWN)/.test(row?.shortcode) ? '' : row?.duration_type;
        const duration_classname = duration_type ? `duration-type__${duration_type.toLowerCase()}` : '';

        if (is_footer) {
            return (
                <div className='data-list__row'>
                    <DataList.Cell
                        row={row}
                        column={columns_map.action_type as TDataListCell['column']}
                        is_footer={is_footer}
                    />
                    <DataList.Cell
                        className='data-list__row-cell--amount'
                        row={row}
                        column={columns_map.profit_loss as TDataListCell['column']}
                        is_footer={is_footer}
                    />
                </div>
            );
        }

        return (
            <>
                <div className='data-list__row'>
                    <DataList.Cell row={row} column={columns_map.action_type as TDataListCell['column']} />
                    <div className={classNames('duration-type', duration_classname)}>
                        <div className={classNames('duration-type__background', `${duration_classname}__background`)} />
                        <span className={`${duration_classname}__label`}>{localize(duration_type)}</span>
                    </div>
                </div>
                <div className='data-list__row'>
                    <DataList.Cell row={row} column={columns_map.transaction_id as TDataListCell['column']} />
                    <DataList.Cell
                        className='data-list__row-cell--amount'
                        row={row}
                        column={columns_map.currency as TDataListCell['column']}
                    />
                </div>
                <div className='data-list__row'>
                    <DataList.Cell row={row} column={columns_map.purchase_time as TDataListCell['column']} />
                    <DataList.Cell
                        className='data-list__row-cell--amount'
                        row={row}
                        column={columns_map.buy_price as TDataListCell['column']}
                    />
                </div>
                <div className='data-list__row'>
                    <DataList.Cell row={row} column={columns_map.sell_time as TDataListCell['column']} />
                    <DataList.Cell
                        className='data-list__row-cell--amount'
                        row={row}
                        column={columns_map.sell_price as TDataListCell['column']}
                    />
                </div>
                <div className='data-list__row'>
                    <DataList.Cell row={row} column={columns_map.profit_loss as TDataListCell['column']} />
                </div>
            </>
        );
    };

    return (
        <React.Fragment>
            <ReportsMeta filter_component={filter_component} className='profit-table__filter' />
            {is_switching ? (
                <PlaceholderComponent is_loading />
            ) : (
                <React.Fragment>
                    {data.length === 0 || is_empty ? (
                        <PlaceholderComponent
                            is_loading={is_loading}
                            has_selected_date={has_selected_date}
                            is_empty={is_empty}
                            empty_message_component={EmptyTradeHistoryMessage}
                            component_icon={component_icon}
                            localized_message={localize('You have no trading activity yet.')}
                            localized_period_message={localize(
                                "You've made no transactions of this type during this period."
                            )}
                        />
                    ) : (
                        <div className='reports__content'>
                            <DesktopWrapper>
                                <DataTable
                                    className='profit-table'
                                    data_source={data}
                                    columns={columns}
                                    onScroll={handleScroll}
                                    footer={totals}
                                    getRowAction={getRowAction}
                                    getRowSize={() => 63}
                                    content_loader={ReportsTableRowLoader}
                                >
                                    <PlaceholderComponent is_loading={is_loading} />
                                </DataTable>
                            </DesktopWrapper>
                            <MobileWrapper>
                                <DataList
                                    className='profit-table'
                                    data_source={data}
                                    rowRenderer={mobileRowRenderer}
                                    getRowAction={getRowAction}
                                    onScroll={handleScroll}
                                    footer={totals}
                                    row_gap={8}
                                >
                                    <PlaceholderComponent is_loading={is_loading} />
                                </DataList>
                            </MobileWrapper>
                        </div>
                    )}
                </React.Fragment>
            )}
        </React.Fragment>
    );
});

export default withRouter(ProfitTable);
