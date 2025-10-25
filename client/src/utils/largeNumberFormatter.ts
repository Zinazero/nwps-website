export const largeNumberFormatter = (num: number) => {
  return new Intl.NumberFormat('fr-FR').format(num);
};
