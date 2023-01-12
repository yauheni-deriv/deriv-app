import React from 'react';
import classNames from 'classnames';
import { Input, Text } from '@deriv/components';
import { isMobile } from '@deriv/shared';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { localize, Localize } from 'Components/i18next';
import ChatFooterIcon from 'Components/orders/chat/chat-footer-icon.jsx';
import { useStores } from 'Stores';
import ChatMessage from 'Utils/chat-message';

const ChatFooter = observer(() => {
    const { order_store, sendbird_store } = useStores();
    const file_input_ref = React.useRef(null);
    const text_input_ref = React.useRef(null);
    const [character_count, setCharacterCount] = React.useState(0);

    const updateTextAreaBounds = () => {
        const el_target = text_input_ref.current;

        if (el_target) {
            el_target.setAttribute('style', 'height: auto;');
            el_target.setAttribute('style', `height: ${el_target.scrollHeight}px;`);
        }
    };

    const handleChange = event => {
        setCharacterCount(event.target.value.length);
        updateTextAreaBounds();
    };

    const handleKeyDown = event => {
        if (event.key === 'Enter' && !isMobile()) {
            if (event.ctrlKey || event.metaKey) {
                const { target: element } = event;
                const { value } = element;

                if (typeof element.selectionStart === 'number' && typeof element.selectionEnd === 'number') {
                    event.target.value = `${value.slice(0, element.selectionStart)}\n${value.slice(
                        element.selectionEnd
                    )}`;
                } else if (document.selection?.createRange) {
                    element.focus();

                    const range = document.selection.createRange();

                    range.text = '\r\n';
                    range.collapse(false);
                    range.select();
                }

                updateTextAreaBounds();
            } else {
                event.preventDefault();
                sendMessage();
            }
        }
    };

    const sendMessage = () => {
        const el_target = text_input_ref.current;
        const should_restore_focus = document.activeElement === el_target;

        if (el_target && el_target.value) {
            sendbird_store.sendMessage(el_target.value);
            el_target.value = '';
            handleChange({ target: el_target });

            if (should_restore_focus) {
                el_target.focus();
            }
        }
    };

    React.useEffect(() => updateTextAreaBounds(), []);

    const should_show_attachment_icon = character_count === 0;
    const max_characters = 5000;

    if (sendbird_store.is_chat_frozen || order_store.order_information.is_inactive_order) {
        return (
            <Text align='center' className='order-chat__footer--frozen' color='prominent' line_height='s' size='xs'>
                <Localize i18n_default_text='This conversation is closed.' />
            </Text>
        );
    }

    return (
        <React.Fragment>
            <Text className='order-chat__footer-disclaimer' color='less-prominent' size='xxs'>
                <Localize i18n_default_text='In case of a dispute, we will only consider the communication through Deriv P2P chat channel.' />
            </Text>
            <div
                className={classNames('order-chat__footer', {
                    'order-chat__footer--empty': sendbird_store.chat_messages.length === 0,
                })}
            >
                <div className='order-chat__footer-input'>
                    <Input
                        has_character_counter
                        initial_character_count={character_count}
                        max_characters={max_characters}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder={localize('Enter message')}
                        ref={ref => (text_input_ref.current = ref)}
                        rows={1}
                        trailing_icon={
                            <div
                                className='order-chat__footer-icon-container'
                                onClick={
                                    should_show_attachment_icon ? () => file_input_ref.current.click() : sendMessage
                                }
                            >
                                <ChatFooterIcon should_show_attachment_icon={should_show_attachment_icon} />
                            </div>
                        }
                        type='textarea'
                    />
                    <input
                        onChange={e => sendbird_store.sendFile(e.target.files[0])}
                        ref={el => (file_input_ref.current = el)}
                        style={{ display: 'none' }}
                        type='file'
                    />
                </div>
            </div>
        </React.Fragment>
    );
});

ChatFooter.displayName = 'ChatFooter';
ChatFooter.propTypes = {
    chat_messages: PropTypes.arrayOf(PropTypes.instanceOf(ChatMessage)),
    sendMessage: PropTypes.bool,
    sendFile: PropTypes.bool,
};

export default ChatFooter;
