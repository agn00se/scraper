

BIN = node_modules/.bin
BUILD_DIR = build
TSC = $(BIN)/tsc
TSC_CONFIG = tsconfig.json
ESLINT = $(BIN)/eslint
TS_SRC = $(shell find src -type f -name "*.ts")

.PHONY: setup
setup:
	npm ci

.PHONY: clean
clean:
	rm -rf $(BUILD_DIR)

.PHONY: build
build: clean
	$(TSC) -p $(TSC_CONFIG)

.PHONY: watch
watch: clean
	$(TSC) -p $(TSC_CONFIG) -w

.PHONY: lint
lint:
	@$(ESLINT) . --ext .ts

.PHONY: fix
fix:
	@$(ESLINT) . --fix --ext .ts

.PHONY: scrape
scrape: $(BUILD_DIR)/scrape.js
	node --max-http-header-size 80000 $(BUILD_DIR)/scrape.js
