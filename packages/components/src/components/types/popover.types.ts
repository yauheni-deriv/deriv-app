import React from 'react';
import { Position } from 'react-tiny-popover';

export type TPopoverProps = {
    alignment: Position;
    className?: string;
    classNameBubble?: string;
    classNameTarget?: string;
    classNameTargetIcon?: string;
    counter?: number;
    disable_message_icon?: boolean;
    disable_target_icon?: boolean;
    has_error?: boolean;
    icon: 'info' | 'question' | 'dot' | 'counter';
    id: string;
    is_bubble_hover_enabled?: boolean;
    is_open?: boolean;
    relative_render?: boolean;
    margin: number;
    message: React.ReactNode;
    onBubbleOpen: () => void;
    onBubbleClose: () => void;
    onClick: () => void;
    should_disable_pointer_events?: boolean;
    should_show_cursor?: boolean;
    zIndex: string;
    window_border: number;
    data_testid?: string;
};
