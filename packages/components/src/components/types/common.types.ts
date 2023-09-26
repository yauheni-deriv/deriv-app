import React from 'react';
import { getCardLabels, getContractTypeDisplay } from '@deriv/shared';

export type TGenericObjectType = {
    [key: string]: React.ReactNode;
};
export type TGetCardLables = () => ReturnType<typeof getCardLabels>;

export type TGetContractTypeDisplay = (type: string, is_high_low: boolean) => ReturnType<typeof getContractTypeDisplay>;

export type TItem = {
    id: string;
    value: Array<TItem> | string;
};

export type TTableRowItem =
    | {
          message?: string;
          component?: React.ReactElement;
      }
    | string;

export type TRow = { [key: string]: any };

export type TPassThrough = { isTopUp: (item: TRow) => boolean };
