import React from 'react';
import { platformAuthenticatorIsAvailable } from '@simplewebauthn/browser';
import useGrowthbookFeatureFlag from './useGrowthbookFeatureFlag';

const useIsPasskeySupported = () => {
    const [is_passkey_supported, setIsPasskeySupported] = React.useState(false);
    const [is_passkey_support_checking, setIsPasskeySupportChecking] = React.useState(true);
    const is_passkeys_enabled = useGrowthbookFeatureFlag({
        featureFlag: 'web_passkeys',
        defaultValue: true,
    });

    React.useEffect(() => {
        const checkPasskeySupport = async () => {
            try {
                const result = await platformAuthenticatorIsAvailable();
                //TODO: add feature flag with growthbook instead of is_passkeys_enabled here
                setIsPasskeySupported(result && is_passkeys_enabled);
            } catch (error) {
                /* eslint-disable no-console */
                console.error('Error checking passkey support:', error);
            } finally {
                setIsPasskeySupportChecking(false);
            }
        };

        checkPasskeySupport();
    }, []);

    return { is_passkey_supported, is_passkey_support_checking, is_passkeys_enabled };
};

export default useIsPasskeySupported;
