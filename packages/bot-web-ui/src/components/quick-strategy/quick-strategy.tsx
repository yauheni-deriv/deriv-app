import React, { useState } from 'react';
import { Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';
import { config as qs_config } from '@deriv/bot-skeleton';
import { MobileFullPageModal, Modal } from '@deriv/components';
import { observer, useStore } from '@deriv/stores';
import { localize } from '@deriv/translations';
import { useDBotStore } from 'Stores/useDBotStore';
import DesktopFormWrapper from './form-wrappers/desktop-form-wrapper';
import MobileFormWrapper from './form-wrappers/mobile-form-wrapper';
import LossThresholdWarningDialog from './parts/loss-threshold-warning-dialog';
import { STRATEGIES } from './config';
import Form from './form';
import { TConfigItem, TFormData } from './types';
import './quick-strategy.scss';

type TFormikWrapper = {
    children: React.ReactNode;
};

const getErrorMessage = (dir: 'MIN' | 'MAX', value: number, type = 'DEFAULT') => {
    const errors: { [key: string]: { MIN: string; MAX: string } } = {
        DURATION: {
            MIN: localize('Minimum duration: {{ value }}', { value }),
            MAX: localize('Maximum duration: {{ value }}', { value }),
        },
        DEFAULT: {
            MIN: localize('The value must be equal or greater than {{ value }}', { value }),
            MAX: localize('The value must be equal or less than {{ value }}', { value }),
        },
    };
    return errors[type][dir];
};

const FormikWrapper: React.FC<TFormikWrapper> = observer(({ children }) => {
    const { quick_strategy } = useDBotStore();
    const {
        selected_strategy,
        form_data,
        onSubmit,
        setValue,
        current_duration_min_max,
        initializeLossThresholdWarningData,
    } = quick_strategy;
    const config: TConfigItem[][] = STRATEGIES[selected_strategy]?.fields;
    const [dynamic_schema, setDynamicSchema] = useState(Yup.object().shape({}));

    const initial_value: TFormData = {
        symbol: qs_config.QUICK_STRATEGY.DEFAULT.symbol,
        tradetype: '',
        durationtype: qs_config.QUICK_STRATEGY.DEFAULT.durationtype,
        stake: '1',
        loss: '0',
        profit: '0',
        size: String(qs_config.QUICK_STRATEGY.DEFAULT.size),
        duration: '1',
        unit: String(qs_config.QUICK_STRATEGY.DEFAULT.unit),
        action: 'RUN',
        max_stake: 10,
        boolean_max_stake: false,
    };

    React.useEffect(() => {
        const data = JSON.parse(localStorage.getItem('qs-fields') || '{}');
        Object.keys(data).forEach(key => {
            initial_value[key as keyof TFormData] = data[key];
            setValue(key, data[key]);
        });
        initializeLossThresholdWarningData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getErrors = (formikData: TFormData) => {
        const sub_schema: Record<string, any> = {};
        config.forEach(group => {
            if (!group?.length) return null;
            group.forEach(field => {
                if (field?.validation?.length && field?.name) {
                    if (field.validation.includes('number')) {
                        let schema: Record<string, any> = Yup.number().typeError(localize('Must be a number'));
                        let min = 0;
                        let max = 10;
                        let min_error = getErrorMessage('MIN', min);
                        let max_error = getErrorMessage('MAX', max);
                        if (field.name === 'duration' && current_duration_min_max) {
                            min = current_duration_min_max.min;
                            max = current_duration_min_max.max;
                            min_error = getErrorMessage('MIN', min, 'DURATION');
                            max_error = getErrorMessage('MAX', max, 'DURATION');
                        }
                        const should_validate = field.should_have
                            ? field.should_have?.every(item => {
                                  return formikData?.[item.key] === item.value;
                              })
                            : true;
                        if (should_validate && field.name === 'max_stake') {
                            min = +form_data?.stake;
                            if (isNaN(min)) {
                                min = +initial_value.stake;
                            }
                            min_error = getErrorMessage('MIN', min);
                        }
                        if (should_validate) {
                            field.validation.forEach(validation => {
                                if (typeof validation === 'string') {
                                    switch (validation) {
                                        case 'required':
                                            schema = schema.required(localize('Field cannot be empty'));
                                            break;
                                        case 'min':
                                            schema = schema.min(min, min_error);
                                            break;
                                        case 'max':
                                            schema = schema.max(max, max_error);
                                            break;
                                        case 'ceil':
                                            schema = schema.round('ceil');
                                            break;
                                        case 'floor':
                                            schema = schema.round('floor');
                                            break;
                                        default:
                                            break;
                                    }
                                } else if (typeof validation === 'object') {
                                    if (validation?.type) {
                                        schema = schema[validation.type](
                                            validation.value,
                                            localize(validation.getMessage(validation.value))
                                        );
                                    }
                                }
                            });
                        }
                        sub_schema[field.name] = schema;
                    }
                }
            });
        });
        setDynamicSchema(Yup.object().shape(sub_schema));
    };

    const handleSubmit = (form_data: TFormData) => {
        onSubmit(form_data); // true to load and run the bot
        localStorage?.setItem('qs-fields', JSON.stringify(form_data));
    };

    return (
        <Formik
            initialValues={initial_value}
            validationSchema={dynamic_schema}
            onSubmit={handleSubmit}
            validate={values => getErrors(values)}
            validateOnBlur
            validateOnChange
            validateOnMount
        >
            {children}
        </Formik>
    );
});

const QuickStrategy = observer(() => {
    const { quick_strategy } = useDBotStore();
    const { ui } = useStore();
    const { is_mobile } = ui;
    const { is_open, setFormVisibility } = quick_strategy;

    const handleClose = () => {
        setFormVisibility(false);
    };

    return (
        <FormikWrapper>
            <FormikForm>
                <LossThresholdWarningDialog />
                {is_mobile ? (
                    <MobileFullPageModal
                        is_modal_open={is_open}
                        className='quick-strategy__wrapper'
                        header={localize('Quick Strategy')}
                        onClickClose={handleClose}
                        height_offset='8rem'
                    >
                        <MobileFormWrapper>
                            <Form />
                        </MobileFormWrapper>
                    </MobileFullPageModal>
                ) : (
                    <Modal className='modal--strategy' is_open={is_open} width={'99.6rem'}>
                        <DesktopFormWrapper>
                            <Form />
                        </DesktopFormWrapper>
                    </Modal>
                )}
            </FormikForm>
        </FormikWrapper>
    );
});

export default QuickStrategy;
