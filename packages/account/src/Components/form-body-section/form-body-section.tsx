import React from 'react';
import classNames from 'classnames';
import { Text } from '@deriv/components';
import { PlatformContext } from '@deriv/shared';
import { TPlatformContext } from 'Types';

export type TFormBodySection = {
    has_side_note?: boolean;
    side_note?: string | React.ReactElement;
};

const FormBodySection = ({ children, has_side_note, side_note }: React.PropsWithChildren<TFormBodySection>) => {
    const { is_appstore }: Partial<TPlatformContext> = React.useContext(PlatformContext);
    if (has_side_note) {
        return (
            <div
                data-testid='dt_side_note_container'
                className={classNames('account-form__section', { 'account-form__section--dashboard': is_appstore })}
            >
                <div className='account-form__section-side-note'>
                    {typeof side_note === 'string' ? (
                        <Text size='xxs' data-testid='side-note-text'>
                            {side_note}
                        </Text>
                    ) : (
                        side_note
                    )}
                </div>
                <div className='account-form__section-content'>{children}</div>
            </div>
        );
    }
    return children as JSX.Element;
};

export default FormBodySection;
