import React, {
    createContext,
    Dispatch,
    PropsWithChildren,
    ReactNode,
    RefObject,
    SetStateAction,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useOnClickOutside } from 'usehooks-ts';
import { useBreakpoint } from '@deriv/quill-design';
import { THooks, TMarketTypes, TPlatforms } from '../../types';

type TModalState = {
    accountId?: string;
    marketType?: TMarketTypes.All;
    platform?: TPlatforms.All;
    selectedJurisdiction?: THooks.AvailableMT5Accounts['shortcode'];
};

type TModalContext = {
    getModalState: <T extends keyof TModalState>(key: T) => TModalState[T];
    hide: () => void;
    isOpen: boolean;
    modalState?: Map<keyof TModalState, TModalState[keyof TModalState]>;
    setModalOptions: Dispatch<SetStateAction<TModalOptions>>;
    setModalState: <T extends keyof TModalState>(key: T, value: TModalState[T]) => void;
    show: (ModalContent: ReactNode, options?: TModalOptions) => void;
};

type TModalOptions = {
    defaultRootId?: 'wallets_modal_root' | 'wallets_modal_show_header_root';
    rootRef?: RefObject<HTMLElement>;
    shouldHideDerivAppHeader?: boolean;
};

const ModalContext = createContext<TModalContext | null>(null);

export const useModal = () => {
    const context = useContext(ModalContext);

    if (!context) throw new Error('useModal() must be called within a component wrapped in ModalProvider.');

    return context;
};

const ModalProvider = ({ children }: PropsWithChildren<unknown>) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [content, setContent] = useState<ReactNode | null>();
    const [modalOptions, setModalOptions] = useState<TModalOptions>({});
    const [modalState, setModalState] = useState<Map<keyof TModalState, TModalState[keyof TModalState]>>(new Map());
    const { isLg, isMd, isSm, isXXl, isXl, isXs } = useBreakpoint();

    const rootRef = useRef<HTMLElement>(document.getElementById('wallets_modal_root'));
    const rootHeaderRef = useRef<HTMLElement | null>(document.getElementById('wallets_modal_show_header_root'));

    const getModalState = <T extends keyof TModalState>(key: T): TModalState[T] => {
        return modalState.get(key) as TModalState[T];
    };

    const updateModalState = <T extends keyof TModalState>(key: T, value: TModalState[T]) => {
        setModalState(new Map(modalState.set(key, value)));
    };

    const show = (ModalContent: ReactNode, options?: TModalOptions) => {
        setContent(ModalContent);
        setModalOptions({
            ...modalOptions,
            ...options,
        });
    };

    useEffect(() => {
        if (!rootHeaderRef.current) {
            rootHeaderRef.current = document.getElementById('wallets_modal_show_header_root');
        }
    }, []);

    const hide = () => {
        setContent(null);
    };

    useOnClickOutside(modalRef, isLg || isXl || isXXl ? hide : () => undefined);

    const modalRootRef = useMemo(() => {
        // if they specify their own root, prioritize this first
        if (modalOptions?.rootRef?.current) return modalOptions?.rootRef;
        // if user specifically specify they want to show on root or hide the Deriv.app header
        if (modalOptions?.shouldHideDerivAppHeader || modalOptions?.defaultRootId === 'wallets_modal_root')
            return rootRef;
        // otherwise do the default behaviour, show Deriv.app header if on responsive
        if (modalOptions?.defaultRootId === 'wallets_modal_show_header_root' || isMd || isSm || isXs)
            return rootHeaderRef;
        return rootRef;
    }, [modalOptions?.rootRef, modalOptions?.shouldHideDerivAppHeader, modalOptions?.defaultRootId, isMd, isSm, isXs]);

    return (
        <ModalContext.Provider
            value={{
                getModalState,
                hide,
                isOpen: content !== null,
                modalState,
                setModalOptions,
                setModalState: updateModalState,
                show,
            }}
        >
            {children}
            {modalRootRef?.current &&
                content &&
                createPortal(<div ref={modalRef}>{content}</div>, modalRootRef.current)}
        </ModalContext.Provider>
    );
};

export default ModalProvider;
