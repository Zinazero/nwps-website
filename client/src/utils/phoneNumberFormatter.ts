export const phoneNumberFormatter = (value: string) => {
  if (!value) return '';

  value = value.replace(/\D/g, '');

  if (value.length <= 3) {
    return `(${value})`;
  } else if (value.length <= 6) {
    return `(${value.slice(0, 3)}) ${value.slice(3)}`;
  } else {
    return `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
  }
};
