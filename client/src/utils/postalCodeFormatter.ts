export const postalCodeFormatter = (value: string) => {
  if (!value) return '';

  // Remove all non-alphanumeric characters and convert to uppercase
  const cleaned = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

  // Insert a space after the first 3 characters if length is at least 4
  if (cleaned.length <= 3) return cleaned;
  return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)}`.trim();
};
