import { useEffect, useRef, Dispatch, SetStateAction } from 'react';

/**
 * Hook to manage multiple timers for different application states.
 */
interface UseTimerProps {
    setPreparationTime?: Dispatch<SetStateAction<number | null>>;
    setWaitOrderIdTime?: Dispatch<SetStateAction<number>>;
    setCancellationTime?: Dispatch<SetStateAction<number | null>>;
    stopTimer?: () => void;
}

export const useTimers = ({ setPreparationTime, setWaitOrderIdTime, setCancellationTime, stopTimer }: UseTimerProps) => {
    const startTimeRef = useRef<{ prep: null | number; waitOrderId: null | number; cancel: null | number }>({
        prep: null,
        waitOrderId: null,
        cancel: null,
    });

    useEffect(() => {
        if (!setWaitOrderIdTime) return;

        const interval = setInterval(() => {
            setWaitOrderIdTime((prevTime) => {
                if (prevTime === null || prevTime <= 0) {
                    clearInterval(interval);
                    if (stopTimer) {
                        stopTimer();
                    }
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [setWaitOrderIdTime, stopTimer]);

    useEffect(() => {
        if (!setPreparationTime) return;

        startTimeRef.current.prep = Date.now();
        const interval = 60000;

        const orderTimer = window.setInterval(() => {
            if (startTimeRef.current.prep != null) {
                const now = Date.now();
                const elapsed = Math.floor((now - startTimeRef.current.prep) / interval);
                setPreparationTime((prevTime) => {
                    if (prevTime === null) return null;
                    return prevTime - elapsed;
                });
                startTimeRef.current.prep = now;
            }
        }, interval);

        return () => clearInterval(orderTimer);
    }, [setPreparationTime]);

    useEffect(() => {
        if (!setCancellationTime) return;

        startTimeRef.current.cancel = Date.now();
        const interval = 1000;

        const cancellationTimer = window.setInterval(() => {
            if (startTimeRef.current.cancel != null) {
                const now = Date.now();
                const elapsed = Math.floor((now - startTimeRef.current.cancel) / interval);
                setCancellationTime((prevTime) => {
                    if (prevTime === null) return null;
                    const newTime = prevTime - elapsed;
                    return newTime > 0 ? newTime : 0;
                });
                startTimeRef.current.cancel = now;
            }
        }, interval);

        return () => clearInterval(cancellationTimer);
    }, [setCancellationTime]);
};
