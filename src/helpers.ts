/**
 * Not required, feel free to add any helper functions here! An example could be:
 *
 * export const isNullUndefined = (u: unknown): boolean => u == null;
 */

// Parse market cap and circulating supply (e.g., 1.1T or 2.3B)
export const parsePriceWithUnit = (marketCapStr: string): number => {
  const trimmedMarketCapStr = marketCapStr.trim();
  const unit = trimmedMarketCapStr.slice(-1);
  const value = parseFloat(sanitizePriceString(trimmedMarketCapStr.slice(0, -1)));

  switch (unit) {
    case 'T':
      return value * 1e12;
    case 'B':
      return value * 1e9;
    case 'M':
      return value * 1e6;
    default:
      // Return the plain number if no unit is found
      return parseFloat(sanitizePriceString(marketCapStr));
  }
};

// Extract range as [low, high] (e.g., "55,000 - 60,000")
export const parseDayRange = (rangeStr: string): [number, number] => {
  const [low, high] = rangeStr.split(' - ').map((val) => parseFloat(sanitizePriceString(val)));
  return [low, high];
};

// Trim spacing and remove ',' in the price string
export const sanitizePriceString = (value: string): string => value.trim().replace(/,/g, '');
