/**
 * Add your models here, example:
 *
 * export type Cryptos = Array<Crypto>;
 * interface Crypto {
 *  name: string;
 *  price: number;
 * }
 */

export type Cryptos = Array<Crypto>;

export interface Crypto {
  symbol: string;
  name: string;
  rankByMarketCap: number;
  price: number;
  change: number;
  marketCap: number;
  circulatingSupply: number;
  previousClosePrice: number;
  openPrice: number;
  daysRange: [number, number];
  link: string;
}
