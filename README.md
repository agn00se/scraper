# Cryptocurrency Data Scraper

This web scraper is built to collect cryptocurrency data from Yahoo Finance. It extracts details such as:
  - Symbol
  - Name
  - Ranking By market cap
  - Price
  - Change
  - Market cap
  - Circulating supply
  - Previous close price
  - Open price
  - Daily range (high and low)
  - Link


## How It Works

1. **Initial Scraping**: The scraper first fetches the main table of cryptocurrencies from the Yahoo Finance URL `https://finance.yahoo.com/markets/crypto/all/`. It extracts key data like the cryptocurrency symbol, name, price, and market capitalization.
   
2. **Detail Scraping**: After fetching the initial table data, the scraper navigates to each cryptocurrency's detail page to collect additional information like the circulating supply, previous close price, open price, and the daily price range.

3. **Data Parsing**: Data retrieved from the web will then be parsed to desired formats and converted to proper data types.

4. **Output**: After scraping and parsing the data, the results are saved to `output.json`.


### Future Extensions

- **Pagination and Table Pages**: Currently, the scraper processes only the initial table of cryptocurrencies. Future extensions can include scraping multiple pages of data by implementing pagination (e.g., adding limit and offset to control how many pages to scrape).
- **Scraping Specific Crypto**: The scraper can support scraping a specific crypto of the user's choice. The symbol will be supplied as an argument when scraping. The scraper will find the matching cryto and scrape its details.
- **Scraping With Filters**: Filters can be further supported. When a specific filters are provided (e.g., market cap >= 10B), the scraper only returns crypto details of those who match the criteria. 


### Known Issues

- **Dynamic Data**: Yahoo Finance may change the structure of the HTML, which could cause the scraper to fail if it cannot find the expected elements.
- **Performance**: Scraping the details of each cryptocurrency can be slow, especially when dealing with a large dataset. Adding concurrency (e.g., scraping multiple detail pages simultaneously) can improve performance.


### Running your extractor

To run the scraper:

```
npm install (to add `package-lock.json`)
make setup
make build
make scrape
```

Again, your task is to implement `scrape` and the rest of the required parsing.
A previous developer set up `scrape` and added `requestPage` to handle your http requests before having to switch to another project. Once you've completed your changes and want to test your work, you can run the scrape script again:

```
make build
make scrape
```

You should now have an output that looks similar to `example_output.json`.

Use `make watch` in a separate terminal window in order to run the TypeScript compiler in watch mode. This watches input files and trigger recompilation on changes, removing the need to run `make build` every time you want to test some changes.

Before you submit your solution, please run `make lint` to run eslint on the `src` directory.
