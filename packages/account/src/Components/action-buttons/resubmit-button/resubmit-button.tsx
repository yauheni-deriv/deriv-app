import React from 'react';
import { Button, Text } from '@deriv/components';
import styles from 'Components/verification-status/verifications-status.module.scss';
import { Localize } from '@deriv/translations';

const ResubmitButton = (onClick?: () => void) => (
    <Button onClick={onClick} has_effect primary className={styles.action_button}>
        <Text size='xs' weight='bold' as='p' color='general' className={styles.action_button__text}>
            <Localize i18n_default_text={'Resubmit'} />
        </Text>
    </Button>
);

export default ResubmitButton;
