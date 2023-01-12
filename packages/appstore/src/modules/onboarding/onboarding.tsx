import React from 'react';
import { localize } from '@deriv/translations';
import { isMobile, isDesktop, routes, PlatformContext } from '@deriv/shared';
import { Button, Text, Icon, ProgressBarOnboarding } from '@deriv/components';
import WalletIcon from 'Assets/svgs/wallet';
import { trading_hub_contents } from 'Constants/trading-hub-content';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStores } from 'Stores';

type TOnboardingProps = {
    contents: Record<
        string,
        {
            component: React.ReactNode;
            eu_footer_header?: string;
            footer_header: string;
            eu_footer_text?: string;
            footer_text: string;
            next_content?: string;
            has_next_content: boolean;
        }
    >;
};

const Onboarding = ({ contents = trading_hub_contents }: TOnboardingProps) => {
    const history = useHistory();
    const number_of_steps = Object.keys(contents);
    const { tradinghub, client } = useStores();
    const { toggleIsTourOpen } = tradinghub;
    const { is_eu, is_eu_country, is_logged_in } = client;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore // TODO: remove this after PlatformContext is converted to TS
    const { setIsPreAppStore } = React.useContext(PlatformContext);
    const [step, setStep] = React.useState<number>(1);

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const nextStep = () => {
        if (step < number_of_steps.length) setStep(step + 1);
        if (step === number_of_steps.length) {
            setIsPreAppStore(true);
            history.push(routes.trading_hub);
            toggleIsTourOpen(true);
        }
    };
    const is_eu_user = (is_logged_in && is_eu) || (!is_logged_in && is_eu_country);

    const onboarding_step = number_of_steps[step - 1];

    const footer_header = contents[onboarding_step]?.footer_header;
    const footer_text = contents[onboarding_step]?.footer_text;

    const eu_footer_header = contents[onboarding_step]?.eu_footer_header || footer_header;
    const eu_footer_text = contents[onboarding_step]?.eu_footer_text || footer_text;

    const footer_header_text = is_eu_user ? eu_footer_header : footer_header;

    const footer_desctiption = is_eu_user ? eu_footer_text : footer_text;

    return (
        <div className='onboarding-wrapper'>
            <div className='onboarding-header'>
                <WalletIcon icon={'DerivLogo'} />
                <Icon
                    icon='IcCross'
                    custom_color='var(--general-main-1)'
                    className='onboarding-header__cross-icon'
                    onClick={() => {
                        setIsPreAppStore(true);
                        toggleIsTourOpen(false);
                        history.push(routes.trading_hub);
                    }}
                />
            </div>
            <div className='onboarding-body'>
                <Text as='h2' weight='bold' align='center' color='white'>
                    {contents[onboarding_step]?.component}
                </Text>
            </div>
            <div className='onboarding-footer'>
                <div className='onboarding-footer-wrapper'>
                    <Text as='h2' weight='bold' size='sm' align='center' className='onboarding-footer-header'>
                        {footer_header_text}
                    </Text>
                    <Text as='p' size='xs' align='center' className='onboarding-footer-text'>
                        {footer_desctiption}
                    </Text>
                    {isDesktop() && (
                        <div className='onboarding-footer-buttons'>
                            <Button secondary onClick={prevStep} style={step === 1 ? { visibility: 'hidden' } : {}}>
                                {localize('Back')}
                            </Button>
                            <ProgressBarOnboarding step={step} amount_of_steps={number_of_steps} setStep={setStep} />
                            <Button primary onClick={nextStep} className='onboarding-footer-buttons--full-size'>
                                {contents[onboarding_step]?.has_next_content
                                    ? contents[onboarding_step]?.next_content
                                    : localize('Next')}
                            </Button>
                        </div>
                    )}
                    {isMobile() && (
                        <React.Fragment>
                            <div className='onboarding-footer__progress-bar'>
                                <ProgressBarOnboarding
                                    step={step}
                                    amount_of_steps={number_of_steps}
                                    setStep={setStep}
                                />
                            </div>
                            <div
                                className='onboarding-footer-buttons'
                                style={step === 1 ? { justifyContent: 'start' } : {}}
                            >
                                <Button
                                    secondary
                                    className={step !== 1 ? 'onboarding-footer-buttons--mobile' : ''}
                                    onClick={prevStep}
                                    style={step === 1 ? { display: 'none' } : {}}
                                >
                                    {localize('Back')}
                                </Button>
                                <Button
                                    primary
                                    onClick={nextStep}
                                    className={
                                        step === 1
                                            ? 'onboarding-footer-buttons--full-size'
                                            : 'onboarding-footer-buttons--mobile'
                                    }
                                >
                                    {contents[onboarding_step]?.has_next_content
                                        ? contents[onboarding_step]?.next_content
                                        : localize('Next')}
                                </Button>
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};

export default observer(Onboarding);
