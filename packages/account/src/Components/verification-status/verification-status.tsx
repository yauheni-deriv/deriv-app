import { Icon, Text } from '@deriv/components';
import React from 'react';
import styles from './verifications-status.module.scss';

type TVerificationStatus = {
    action_button?: React.ReactElement | null;
    icon: string;
    status_description?: React.ReactElement | null;
    status_title: React.ReactElement | string | null;
};

const VerificationStatus = ({ action_button, icon, status_description, status_title }: TVerificationStatus) => {
    return (
        <div className={styles.container}>
            <Icon icon={icon ?? ''} size={128} />
            <Text as='div' color='general' weight='bold' size='s' align='center' className={styles.status_title}>
                {status_title}
            </Text>
            {status_description && (
                <Text as='div' color='general' size='xs' align='center' className={styles.status_description}>
                    {status_description}
                </Text>
            )}
            {action_button}
        </div>
    );
};
export default VerificationStatus;
