export const validedPassword = (value: string): any => {
  const len = value.length;
  if (len < 12) {
    return { min: true, error: true };
  }
  if (len > 20) {
    return { max: true, error: true };
  }
  if (value.match(/^(?=.*[a-z])[\w|@$!%*?&-+]+$/) === null) {
    return { lowercase: true, error: true };
  }
  if (value.match(/^(?=.*[A-Z])[\w|@$!%*?&-+]+$/) === null) {
    return { uppercase: true, error: true };
  }
  if (value.match(/^(?=.*[0-9])[\w|@$!%*?&-+]+$/) === null) {
    return { number: true, error: true };
  }
  if (value.match(/^(?=.*[@$!%*?&-+])[\w|@$!%*?&-+]+$/) === null) {
    return { symbol: true, error: true };
  }
  return null;
};
