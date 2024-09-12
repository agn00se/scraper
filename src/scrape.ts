import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as puppeteer from 'puppeteer';

import { Cryptos, Crypto } from './models';
import { parsePriceWithUnit as parsePrice, parseDayRange, sanitizePriceString } from './helpers';
import { requestPage } from './requests';

const IDENTIFIER = {
  PRICE: 'regularMarketPrice',
  CHANGE: 'regularMarketChange',
  MARKET_CAP: 'marketCap',
  PREVIOUS_CLOSE: 'regularMarketPreviousClose',
  OPEN_PRICE: 'regularMarketOpen',
  CIRCULATING_SUPPLY: 'Circulating Supply',
  DAYS_RANGE: 'regularMarketDayRange',
};

const BASE_URL = 'https://finance.yahoo.com';

const scrape = async (url: string): Promise<Cryptos> => {
  const page = await requestPage(url);

  const $ = cheerio.load(page.data);

  const table = $('table');
  // Validate the table exists before parsing.
  if (table.length === 0) {
    throw new Error('unable to parse required crypto table');
  }

  // Add your code here!
  const cryptoData: Cryptos = [];

  table.find('tbody tr').each((index, element) => {
    const symbol = $(element).find('span.symbol').text().trim();
    const name = $(element).find('span.longName').text().trim();
    const price = parseFloat(extractByDataField($, IDENTIFIER.PRICE, element));
    const change = parseFloat(extractByDataField($, IDENTIFIER.CHANGE, element));
    const marketCap = parsePrice(extractByDataField($, IDENTIFIER.MARKET_CAP, element));
    const link = BASE_URL + $(element).find('a').attr('href');

    const crypto: Crypto = {
      symbol,
      name,
      rankByMarketCap: index + 1,
      price,
      change,
      marketCap,
      circulatingSupply: 0,
      previousClosePrice: 0,
      openPrice: 0,
      daysRange: [0, 0],
      link,
    };

    cryptoData.push(crypto);
  });

  await scrapeCryptoDetail(cryptoData);

  return cryptoData;
};

const scrapeCryptoDetail = async (cryptoData: Cryptos): Promise<void> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const crypto of cryptoData) {
    try {
      await page.goto(crypto.link);

      const content = await page.content();
      const $ = cheerio.load(content);

      crypto.circulatingSupply = parsePrice(extractByLabel($, IDENTIFIER.CIRCULATING_SUPPLY));
      crypto.previousClosePrice = parseFloat(extractByDataField($, IDENTIFIER.PREVIOUS_CLOSE));
      crypto.openPrice = parseFloat(extractByDataField($, IDENTIFIER.OPEN_PRICE));
      crypto.daysRange = parseDayRange(extractByDataField($, IDENTIFIER.DAYS_RANGE));
    } catch (error) {
      console.error(`Error scraping additional data for ${crypto.symbol}: ${error.message}`);
    }
  }

  await browser.close();
};

const extractByLabel = ($: cheerio.CheerioAPI, label: string): string => {
  // Find by label
  const labelElement = $(`span:contains("${label}")`).closest('li');

  if (!labelElement.length) {
    return '';
  }

  // Extract value from the nearest '.value' class element
  const valueElement = labelElement.find('.value');
  return valueElement.length ? valueElement.text().trim() : '';
};

const extractByDataField = ($: cheerio.CheerioAPI, label: string, element?: any): string => {
  // Find by data-field value
  const fieldElement = element
    ? $(element).find(`[data-field="${label}"]`)
    : $(`[data-field="${label}"]`);

  if (!fieldElement.length) {
    return '';
  }

  // Extract the value from the data-value attribute
  const value = fieldElement.attr('data-value');
  return value ? sanitizePriceString(value) : '';
};

const saveToFile = (data: Cryptos, filePath: string): void => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

(async () => {
  const startingUrl = 'https://finance.yahoo.com/markets/crypto/all/';
  const data = await scrape(startingUrl);
  saveToFile(data, 'output.json');
})();
