import React from 'react';
import { Button, Text } from '@deriv/components';
import { formatMoney, CFD_PLATFORMS } from '@deriv/shared';
import { Localize } from '@deriv/translations';
import WalletIcon from 'Assets/svgs/wallet';
import { TPlatform } from 'Types';

import './static-cfd-account-manager.scss';
import classNames from 'classnames';

type TStaticCFDAccountManager = {
    type: string;
    appname: string;
    loginid?: string;
    currency?: string;
    description?: string;
    is_animated?: boolean;
    has_account?: boolean;
    is_last_step?: boolean;
    derived_amount?: string;
    is_blurry: {
        icon: boolean;
        item: boolean;
        text: boolean;
        get: boolean;
        topup: boolean;
        trade: boolean;
        cfd_item: boolean;
        cfd_text: boolean;
        options_item: boolean;
        options_text: boolean;
        cfd_description: boolean;
        options_description: boolean;
        platformlauncher: boolean;
    };
    financial_amount?: string;
    is_onboarding_animated: {
        text: boolean;
        trade: boolean;
        topup: boolean;
        button: boolean;
        get: boolean;
    };
    is_derivx_last_step?: boolean;
    platform: TPlatform | 'options';
    is_financial_last_step?: boolean;
    is_eu_user: boolean;
};

const StaticCFDAccountManager = ({
    type,
    appname,
    loginid,
    currency,
    platform,
    has_account,
    description,
    is_last_step,
    derived_amount,
    is_blurry,
    financial_amount,
    is_onboarding_animated,
    is_eu_user,
}: TStaticCFDAccountManager) => {
    return (
        <div className='static-cfd-account-manager'>
            <div className='static-cfd-account-manager__icon'>
                {platform === CFD_PLATFORMS.MT5 &&
                    !is_eu_user &&
                    (type === 'financial' ? (
                        <WalletIcon
                            icon='Financial'
                            size={64}
                            className={classNames('static-cfd-account-manager--cfds', {
                                'static-cfd-account-manager__icon--blurry': is_blurry.icon || is_last_step,
                            })}
                        />
                    ) : (
                        <WalletIcon
                            icon='Derived'
                            size={64}
                            className={classNames('static-cfd-account-manager--cfds', {
                                'static-cfd-account-manager__icon--blurry': is_blurry.icon,
                            })}
                        />
                    ))}

                {platform === CFD_PLATFORMS.MT5 &&
                    is_eu_user &&
                    (type === 'financial' ? (
                        <WalletIcon
                            icon='CFDs'
                            size={64}
                            className={classNames('static-cfd-account-manager--cfds', {
                                'static-cfd-account-manager__icon--blurry': is_blurry.icon || is_last_step,
                            })}
                        />
                    ) : (
                        <WalletIcon
                            icon='Derived'
                            size={64}
                            className={classNames('static-cfd-account-manager--cfds', {
                                'static-cfd-account-manager__icon--blurry': is_blurry.icon,
                            })}
                        />
                    ))}

                {platform === CFD_PLATFORMS.DXTRADE && (
                    <WalletIcon
                        icon='DerivX'
                        size={58}
                        className={classNames('static-cfd-account-manager--cfds', {
                            'static-cfd-account-manager__icon--blurry': is_blurry.icon || is_last_step,
                        })}
                    />
                )}
                {platform === 'options' && (
                    <WalletIcon
                        icon='Options'
                        size={58}
                        className={is_blurry.icon || is_last_step ? 'static-cfd-account-manager__icon--blurry' : ''}
                    />
                )}
            </div>
            <div className='static-cfd-account-manager__details'>
                <Text
                    size='xs'
                    weight={has_account ? 'normal' : 'bold'}
                    color={is_blurry.item || is_last_step ? 'less-prominent' : 'prominent'}
                >
                    {appname}
                </Text>
                {has_account ? (
                    <React.Fragment>
                        <Text
                            size='xs'
                            weight='bold'
                            color={is_blurry.item || is_last_step ? 'less-prominent' : 'prominent'}
                        >{`${formatMoney(
                            currency,
                            type === 'financial' ? financial_amount : derived_amount,
                            true
                        )} ${currency}`}</Text>
                        <Text size='xs' color={is_blurry.item || is_last_step ? 'less-prominent' : 'prominent'}>
                            {loginid}
                        </Text>
                    </React.Fragment>
                ) : (
                    <Text size='xxxs' color={is_blurry.item || is_last_step ? 'less-prominent' : 'prominent'}>
                        {description}
                    </Text>
                )}
            </div>
            <div className='static-cfd-account-manager__buttons'>
                {has_account && platform !== CFD_PLATFORMS.DXTRADE ? (
                    <React.Fragment>
                        <Button
                            secondary
                            className={classNames('static-cfd-account-manager__buttons-topup', {
                                'static-cfd-account-manager__buttons-topup--blurry': is_blurry.topup,
                                'static-cfd-account-manager__buttons-topup--animated': is_onboarding_animated.topup,
                            })}
                        >
                            <Localize i18n_default_text='Top-up' />
                        </Button>
                        <Button
                            primary
                            className={classNames('static-cfd-account-manager__buttons-trade', {
                                'static-cfd-account-manager__buttons-trade--blurry': is_blurry.trade,
                                'static-cfd-account-manager__buttons-topup--animated': is_onboarding_animated.trade,
                            })}
                        >
                            <Localize i18n_default_text='Trade' />
                        </Button>
                    </React.Fragment>
                ) : (
                    <Button
                        primary_light
                        className={classNames('static-cfd-account-manager__buttons-get', {
                            'static-cfd-account-manager__buttons--animated': is_onboarding_animated.get,
                            'static-cfd-account-manager__buttons-get--blurry': is_blurry.get,
                        })}
                    >
                        <Localize i18n_default_text='Get' />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default StaticCFDAccountManager;
