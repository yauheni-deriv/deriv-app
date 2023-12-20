/** Add types that are shared between components */
import React from 'react';
import { Authorize, GetFinancialAssessment, IdentityVerificationAddDocumentResponse } from '@deriv/api-types';
import { Redirect } from 'react-router-dom';
import { AUTH_STATUS_CODES, MT5_ACCOUNT_STATUS, Platforms } from '@deriv/shared';

export type TToken = {
    display_name: string;
    last_used: string;
    scopes: string[];
    token: string;
};

export type TPoaStatusProps = {
    needs_poi: boolean;
    redirect_button: React.ReactNode;
};

export type TAuthAccountInfo = NonNullable<Authorize['account_list']>[0] & {
    landing_company_shortcode?: string;
};

export type TCurrencyConfig = {
    fractional_digits: number;
    is_deposit_suspended: 0 | 1;
    is_suspended: 0 | 1;
    is_withdrawal_suspended: 0 | 1;
    name: string;
    stake_default: number;
    transfer_between_accounts: {
        fees: {
            [key: string]: number;
        };
        limits: {
            max: number;
            min: number;
        } | null;
    };
    type: 'fiat' | 'crypto';
    value: string;
};

export type TFormValidation = {
    warnings: { [key: string]: string };
    errors: { [key: string]: string };
};

export type TRealAccount = {
    active_modal_index: number;
    current_currency: string;
    error_message: string;
    previous_currency: string;
    success_message: string;
    error_code: number;
    error_details?: Record<string, string>;
};

export type TPopoverAlignment = 'top' | 'right' | 'bottom' | 'left';

export type TRoute = {
    exact?: boolean;
    id?: string;
    icon_component?: string;
    is_invisible?: boolean;
    path?: string;
    icon?: string;
    default?: boolean;
    to?: string;
    component?: ((routes?: TRoute[]) => JSX.Element) | typeof Redirect;
    getTitle?: () => string;
    is_disabled?: boolean;
    subroutes?: TRoute[];
};

export type TRouteConfig = TRoute & {
    is_modal?: boolean;
    is_authenticated?: boolean;
    routes?: TRoute[];
};

export type TBinaryRoutes = {
    is_logged_in: boolean;
    is_logging_in: boolean;
};

export type TUpgradeInfo = {
    type: string;
    can_upgrade: boolean;
    can_upgrade_to: string;
    can_open_multi: boolean;
};

type TIdentity = {
    services: {
        idv: {
            documents_supported: { [key: string]: { display_name: string } } | Record<string, never>;
            has_visual_sample: 0 | 1;
            is_country_supported: 0 | 1;
        };
        onfido: {
            documents_supported: { [key: string]: { display_name: string } };
            is_country_supported: 0 | 1;
        };
    };
};

export type TFile = {
    path: string;
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    size: number;
    type: string;
    webkitRelativePath: string;
};

export type TPOIStatus = {
    needs_poa?: boolean;
    redirect_button?: React.ReactElement;
    is_from_external?: boolean;
    is_manual_upload?: boolean;
};

export type TPersonalDetailsForm = {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    confirmation_checkbox?: boolean;
};

export type TInputFieldValues = Record<string, string>;

export type TIDVVerificationResponse = IdentityVerificationAddDocumentResponse & { error: { message: string } };

export type TDocument = {
    id: string;
    text: string;
    value?: string;
    example_format?: string;
    additional?: {
        display_name?: string;
        example_format?: string;
    };
};

export type TVerificationStatus = Readonly<
    Record<'none' | 'pending' | 'rejected' | 'verified' | 'expired' | 'suspected', string>
>;

export type TIDVFormValues = {
    document_type: TDocument;
    document_number: string;
    document_additional?: string;
    error_message?: string;
};

export type TPlatforms = typeof Platforms[keyof typeof Platforms];

export type TServerError = {
    code: string;
    message: string;
    details?: { [key: string]: string };
    fields?: string[];
};

export type TAuthStatusCode = typeof AUTH_STATUS_CODES[keyof typeof AUTH_STATUS_CODES];

export type TMT5AccountStatus = typeof MT5_ACCOUNT_STATUS[keyof typeof MT5_ACCOUNT_STATUS];

export type TFilesDescription = {
    descriptions: { id: string; value: JSX.Element }[];
    title: React.ReactNode;
};

export type TTradingAssessmentForm = Required<
    Pick<
        GetFinancialAssessment,
        | 'cfd_experience'
        | 'cfd_frequency'
        | 'cfd_trading_definition'
        | 'leverage_trading_high_risk_stop_loss'
        | 'leverage_impact_trading'
        | 'required_initial_margin'
        | 'risk_tolerance'
        | 'source_of_experience'
        | 'trading_experience_financial_instruments'
        | 'trading_frequency_financial_instruments'
    >
>;

export type TQuestion = {
    question_text: string;
    form_control: keyof TTradingAssessmentForm;
    answer_options: { text: string; value: string }[];
    field_type?: string;
};
