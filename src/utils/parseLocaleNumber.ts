export function parseLocaleNumber(value: string): number {
  const normalized = value
    .trim()
    .replace(/\s/g, '')
    .replace(',', '.');

  if (!/^-?\d+(?:\.\d+)?$/.test(normalized)) {
    throw new Error(
      `Unable to parse numeric value: "${value}"`
    );
  }

  const parsed = Number(normalized);

  if (!Number.isFinite(parsed)) {
    throw new Error(
      `Unable to parse numeric value: "${value}"`
    );
  }

  return parsed;
}