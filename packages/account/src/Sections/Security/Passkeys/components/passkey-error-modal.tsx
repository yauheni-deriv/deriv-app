import { Button, Modal, Text } from '@deriv/components';
import { Localize } from '@deriv-com/translations';
import { isNotSupportedError, TPasskeyError } from '../passkeys-configs';
import { TServerError } from '../../../../Types';

type TPasskeyErrorModal = {
    error: TPasskeyError;
    onButtonClick: () => void;
    is_modal_open: boolean;
    error_title: string;
};

const getErrorModalContent = (error: TPasskeyError) => {
    const error_message_header = (
        <Text size='xs' weight='bold'>
            {isNotSupportedError(error as TServerError) ? (
                <Localize i18n_default_text='Passkey setup failed' />
            ) : (
                <Localize i18n_default_text='Unable to process your request' />
            )}
        </Text>
    );

    const error_message = isNotSupportedError(error as TServerError) ? (
        <Localize i18n_default_text="This device doesn't support passkeys." />
    ) : (
        <Localize i18n_default_text='We’re experiencing a temporary issue in processing your request. Please try again later.' />
    );

    return {
        error_message_header,
        error_message,
    };
};

export const PasskeyErrorModal = ({ is_modal_open, error, onButtonClick, error_title }: TPasskeyErrorModal) => {
    // const error_modal_content = getErrorModalContent(error);
    const err = JSON.parse(JSON.stringify(error));
    // eslint-disable-next-line no-console
    console.log('error: ', JSON.stringify(err));

    return (
        <Modal
            portalId='modal_root'
            // header={error_modal_content.error_message_header}
            header={error_title}
            is_open={is_modal_open}
            has_close_icon={false}
            className='passkeys-modal'
        >
            {/* <Modal.Body>{error_modal_content.error_message}</Modal.Body> */}
            <Modal.Body>
                <div>code: {err?.code || ''}</div>
                <div>name: {err?.name || ''}</div>
                <div>message: {err?.message || ''}</div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onButtonClick} large primary>
                    <Localize i18n_default_text='OK' />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
