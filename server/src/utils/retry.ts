export async function retry<T>(
  fn: () => Promise<T>,
  retries = 5, // max number of attempts
  initialDelayMs = 2000, // start delay (2s)
  factor = 2, // exponential multiplier
): Promise<T> {
  let lastError: unknown;
  let delay = initialDelayMs;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err: unknown) {
      lastError = err;
      if (attempt < retries) {
        console.warn(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
        await new Promise((res) => setTimeout(res, delay));
        delay *= factor; // exponential increase
      }
    }
  }

  // All attempts failed
  throw lastError;
}
