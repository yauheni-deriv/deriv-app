export const isSafari = () => {
    return (
        /constructor/i.test(window.HTMLElement) ||
        (function (p) {
            return p.toString() === '[object SafariRemoteNotification]';
        })(!window.safari || (typeof window.safari !== 'undefined' && window.safari.pushNotification))
    );
};
