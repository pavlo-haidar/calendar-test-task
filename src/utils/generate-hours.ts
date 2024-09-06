const HOURS_IN_DAY = 24;

export const generateHours = (): number[] => {
  return new Array(HOURS_IN_DAY).fill(null).map((_, index) => index);
};
