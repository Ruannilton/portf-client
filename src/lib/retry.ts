export default async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 5,
  delay = 1000
): Promise<T> {
  let attempt = 0;

  while (attempt < retries) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      console.warn(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);

      if (attempt >= retries) {
        throw new Error(`Operation failed after ${retries} attempts: ${error}`);
      }

      await new Promise((res) => setTimeout(res, delay));
      delay *= 2; // Exponential backoff
    }
  }
  throw new Error("Unreachable"); // This should never happen
}
