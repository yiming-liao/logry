export const now = (): number => {
  const [s, ns] = process.hrtime();
  return s * 1000 + ns / 1e6;
};
