import { useEffect, useCallback } from "react";

export function useNuiEvent<T>(action: string, handler: (data: T) => void) {
  const stable = useCallback(handler, []);

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.data?.action === action) {
        stable(event.data.data as T);
      }
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, [action, stable]);
}
