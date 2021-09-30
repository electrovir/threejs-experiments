export function createThrottle(callback, throttleTime = 100) {
  let firstTriggered = false;
  let timeout = void 0;
  let clearFirstTriggeredTimeout = void 0;
  return () => {
    if (!timeout) {
      if (!firstTriggered) {
        callback();
        firstTriggered = true;
      }
      timeout = window.setTimeout(() => {
        callback();
        timeout = void 0;
        if (clearFirstTriggeredTimeout) {
          window.clearTimeout(clearFirstTriggeredTimeout);
        }
        clearFirstTriggeredTimeout = window.setTimeout(() => {
          firstTriggered = false;
          clearFirstTriggeredTimeout = void 0;
        }, Math.floor(throttleTime * 2));
      }, throttleTime);
    }
  };
}
