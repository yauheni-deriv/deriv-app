import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { TSocketResponse } from '../../types';
import APIProvider from '../APIProvider';
import useMutation from '../useMutation';

jest.mock('@deriv/shared', () => ({
    ...jest.requireActual('@deriv/shared'),
    useWS: () => ({
        send: jest.fn(() =>
            Promise.resolve<TSocketResponse<'verify_email'>>({
                msg_type: 'verify_email',
                verify_email: 1,
                echo_req: {},
            })
        ),
    }),
}));

describe('useMutation', () => {
    test('should call verify_email and get 1 in response', async () => {
        const wrapper = ({ children }: { children: JSX.Element }) => <APIProvider>{children}</APIProvider>;

        const { result, waitFor } = renderHook(() => useMutation('verify_email'), { wrapper });

        result.current.mutate({ payload: { verify_email: 'john@example.com', type: 'request_email' } });

        await waitFor(() => result.current.isSuccess, { timeout: 10000 });

        expect(result.current.data?.verify_email).toEqual(1);
    });
});
