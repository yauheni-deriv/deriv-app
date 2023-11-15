import React from 'react';
import { Button, ButtonLink, Text } from '@deriv/components';
import style from './verifications-status-action-button.module.scss';

type TButtonLink = {
    onClick?: never;
    to: string;
};

type TButton = {
    onClick?: () => void;
    to?: never;
};

type TVerificationStatusActionButton = { button_text: JSX.Element } & (TButtonLink | TButton);

const VerificationStatusActionButton = ({ button_text, onClick, to }: TVerificationStatusActionButton) => {
    return (
        <div className={style.action_button}>
            {to ? (
                <ButtonLink className={''} to={to}>
                    <Text className={style.action_button__text} as='p' weight='bold'>
                        {button_text}
                    </Text>
                </ButtonLink>
            ) : (
                <Button onClick={onClick} has_effect primary className={''}>
                    <Text size='xs' weight='bold' as='p' color='general' className={style.action_button__text}>
                        {button_text}
                    </Text>
                </Button>
            )}
        </div>
    );
};
export default VerificationStatusActionButton;
