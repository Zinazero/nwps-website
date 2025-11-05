export const chunkArray = <T>(arr: T[], startSize: number): T[][] => {
  if (startSize < 2) {
    console.error('Requires chunks of at least 2');
    return [];
  }

  const chunks: T[][] = [];
  let i = 0;
  let size = startSize;

  while (i < arr.length) {
    chunks.push(arr.slice(i, i + size));
    i += size;
    size = size === startSize ? startSize - 1 : startSize;
  }

  return chunks;
};
