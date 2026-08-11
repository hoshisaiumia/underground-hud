import { useEffect } from 'react';

type NuiHandlerSignature<T> = (data: T) => void;

const IS_BROWSER = !(window as Window & { invokeNative?: unknown }).invokeNative;

export const useNuiEvent = <T>(action: string, handler: NuiHandlerSignature<T>) => {
    useEffect(() => {
        const eventListener = (event: MessageEvent) => {
            const { action: eventAction, data } = event.data;
            if (eventAction === action) {
                handler(data as T);
            }
        };

        window.addEventListener('message', eventListener);
        return () => window.removeEventListener('message', eventListener);
    }, [action, handler]);
};

export const debugNuiEvent = <T>(action: string, data: T) => {
    if (!IS_BROWSER) return;

    window.dispatchEvent(
        new MessageEvent('message', {
            data: { action, data },
        })
    );
};