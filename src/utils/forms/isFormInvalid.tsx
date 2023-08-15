export const isFormInvalid = (err: object): boolean => {
  if (Object.keys(err).length > 0) return true;
  return false;
};
