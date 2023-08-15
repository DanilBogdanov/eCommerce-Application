export function findInputError(errors: object, name: string) {
  const filtered = Object.keys(errors)
    .filter((key: string) => key.includes(name))
    .reduce((cur: object, key: string) => {
      return Object.assign(cur, { error: errors[key as keyof typeof errors] });
    }, {});
  return filtered;
}
