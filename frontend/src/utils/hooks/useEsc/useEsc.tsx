import { useCallback, useEffect } from 'react';

/**
 * Invokes callback function when user clicks on 'Esc'
 *
 * @param {} cb callback function
 * @param {} deps dependency array
 */
export const useEsc = (cb: () => void, deps: unknown[]) => {
    const handler = useCallback(cb, [deps, cb]);
    useEffect(() => {
        const handleCloseByEsc = (e: KeyboardEvent) => (e.key === 'Escape' || e.key === 'Esc') && handler();
        document.addEventListener('keydown', handleCloseByEsc);
        return () => document.removeEventListener('keydown', handleCloseByEsc);
    }, [handler]);
};
