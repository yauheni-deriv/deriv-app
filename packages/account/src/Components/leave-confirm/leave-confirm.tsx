import React from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { FormikConsumer } from 'formik';
import { Button, Icon, Modal } from '@deriv/components';
import { isMobile, PlatformContext } from '@deriv/shared';
import { localize } from '@deriv/translations';
import IconMessageContent from 'Components/icon-message-content';
import { TPlatformContext } from 'Types';

type TLeaveConfirmMessage = {
    back: () => void;
    leave: () => void;
};

type TTransitionBlocker = {
    dirty: boolean;
    onDirty: (prop: boolean) => void;
};

const LeaveConfirmMessage = ({ back, leave }: TLeaveConfirmMessage) => {
    const { is_appstore } = React.useContext<TPlatformContext>(PlatformContext);
    return (
        <IconMessageContent
            className='leave-confirm'
            message={localize('Unsaved changes')}
            text={localize('You have unsaved changes. Are you sure you want to discard changes and leave this page?')}
            icon={
                <Icon
                    icon={is_appstore ? 'IcUnsavedChangesDashboard' : 'IcUnsavedChanges'}
                    size={isMobile() ? 93 : 128}
                    data_testid='unsaved_changes_icon'
                />
            }
        >
            <div className='account-management-flex-wrapper account-management-leave-confirm'>
                <Button
                    type='button'
                    has_effect
                    onClick={back}
                    text={localize('Cancel')}
                    secondary
                    {...(isMobile() ? { large: true } : {})}
                />
                <Button
                    type='button'
                    has_effect
                    onClick={leave}
                    text={localize('Leave Settings')}
                    primary
                    {...(isMobile() ? { large: true } : {})}
                />
            </div>
        </IconMessageContent>
    );
};
/**
 * Blocks routing if Formik form is dirty
 * Has to be a child of <Formik> for FormikConsumer to work
 */
export const TransitionBlocker = ({ dirty, onDirty }: TTransitionBlocker) => {
    const [show, setShow] = React.useState(false);
    const [next_location, setNextLocation] = React.useState<{ pathname: string } | null>(null);
    const history = useHistory();

    React.useEffect(() => {
        return () => unblock();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const unblock = history.block((location: { pathname: string }) => {
        if (dirty) {
            if (onDirty) onDirty(false);

            if (show) leave();

            setShow(true);
            setNextLocation(location);
        }
        return !dirty;
    });

    const leave = () => {
        if (next_location?.pathname) {
            const { pathname } = next_location;
            unblock();
            history.push(pathname);
        } else history.push(null);
    };

    const back = () => {
        setNextLocation(null);
        setShow(false);
        if (onDirty) onDirty(true);
    };

    return (
        <>
            {show && isMobile() ? (
                <LeaveConfirmMessage back={back} leave={leave} />
            ) : (
                <Modal is_open={show} small toggleModal={back}>
                    <Modal.Body>
                        <LeaveConfirmMessage back={back} leave={leave} />
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};
export const TransitionBlockerWithRouter = withRouter(TransitionBlocker);

const LeaveConfirm = ({ onDirty }: { onDirty: (prop: boolean) => void }) => (
    <FormikConsumer>
        {formik => <TransitionBlockerWithRouter onDirty={onDirty} dirty={formik.dirty && formik.submitCount === 0} />}
    </FormikConsumer>
);

export default LeaveConfirm;
