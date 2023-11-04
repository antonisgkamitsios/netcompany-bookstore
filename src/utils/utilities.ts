function findUnique<T, K extends keyof T>(data: T[], key: K) {
  const result = [...new Set(data.map((d) => d[key]))];
  return result;
}

function debounceFn(delay: number) {
  let timeout: NodeJS.Timeout;

  return function debounce(callback: () => void) {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(), delay);
  };
}

export { findUnique, debounceFn };
