export function createThrottle(callback: () => void | Promise<void>, throttleTime: number = 100) {
    /**
     * Tracks if this is the first trigger that's happened in a while ("a while" is determined by
     * throttleTime).
     */
    let firstTriggered = false;
    /** Timeout used to create the throttling. */
    let timeout: undefined | number = undefined;
    /** Used to reset firstTriggered after a while ("a while is determined by throttleTime). */
    let clearFirstTriggeredTimeout: undefined | number = undefined;

    return () => {
        if (!timeout) {
            if (!firstTriggered) {
                // fire the first callback for instant response
                callback();
                firstTriggered = true;
            }

            timeout = window.setTimeout(() => {
                // throttle all subsequent calls
                callback();
                timeout = undefined;

                if (clearFirstTriggeredTimeout) {
                    window.clearTimeout(clearFirstTriggeredTimeout);
                }
                clearFirstTriggeredTimeout = window.setTimeout(() => {
                    firstTriggered = false;
                    clearFirstTriggeredTimeout = undefined;
                }, Math.floor(throttleTime * 2));
            }, throttleTime);
        }
    };
}
