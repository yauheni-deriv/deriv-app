import { TMessageFnProps } from '../types';

const transferFeesBetweenWalletsMessageFn = ({
    displayMoney,
    sourceAccount,
    sourceAmount,
    targetAccount,
}: TMessageFnProps) => {
    if (!sourceAccount.currency || !sourceAccount.currencyConfig || !sourceAmount || !targetAccount.currency)
        return null;

    const minimumFeeAmount = 1 / Math.pow(10, sourceAccount.currencyConfig.fractional_digits);

    const minimumFeeText = displayMoney?.(
        minimumFeeAmount,
        sourceAccount.currency,
        sourceAccount.currencyConfig.fractional_digits
    );

    const feePercentage = sourceAccount.currencyConfig?.transfer_between_accounts.fees[targetAccount.currency];

    const feeAmount = (feePercentage * sourceAmount) / 100;

    const feeMessageText = displayMoney?.(
        feeAmount > minimumFeeAmount ? feeAmount : minimumFeeAmount,
        sourceAccount.currency,
        sourceAccount.currencyConfig.fractional_digits
    );

    return {
        text: `Fee: ${feeMessageText} (${feePercentage}% transfer fee or ${minimumFeeText}, whichever is higher, applies for fund transfers between your ${targetAccount.accountName} and cryptocurrency Wallets)`,
        type: 'info' as const,
    };
};

export default transferFeesBetweenWalletsMessageFn;
