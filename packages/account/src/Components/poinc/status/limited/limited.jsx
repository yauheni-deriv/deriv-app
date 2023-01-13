import React from 'react';
import { Icon } from '@deriv/components';
import { Localize, localize } from '@deriv/translations';
import IconMessageContent from 'Components/icon-message-content';

export const PoincLimited = () => (
    <IconMessageContent
        message={localize('Limit reached')}
        text={
            <Localize
                i18n_default_text="You have reached the maximum number of allowed attempts for submitting proof of income. <0 /> Please check the email we've sent you for further information."
                components={[<br key={0} />]}
            />
        }
        icon={<Icon icon='IcPoincUnverified' size={128} />}
    />
);
