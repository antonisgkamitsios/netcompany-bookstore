function findUnique<T, K extends keyof T>(data: T[], key: K) {
  const result = [...new Set(data.map((d) => d[key]))];
  return result;
}

export { findUnique };
