const DEBOUNCE_DELAY = 1000;

export const debounce = (cb: any, delay = DEBOUNCE_DELAY) => {
  let timeout: any;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
