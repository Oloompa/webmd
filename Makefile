# SETTINGS
.DEFAULT_GOAL := help # default command if unset on makefile's call
MAKEFLAGS += --silent # Hey make, please shut up !

# CONSTANTS
COVERAGE_DIR = ./coverage
COVERAGE_FILE = ./coverage.lcov
ROOT_SCRIPT = ./src/generate-static.ts
BINARY_NAME = generate-static

.PHONY: help coverage

# FUNCTIONS
# see https://coderwall.com/p/cezf6g/define-your-own-function-in-a-makefile

define echo_not_implemented
	echo "$(shell tput setaf 1)NOT IMPLEMENTED$(shell tput sgr0)"
endef

define print_with_color
	@case ${2} in \
		blue)    tput setaf 33 ;; \
		red)     tput setaf 160 ;; \
		orange)  tput setaf 172 ;; \
		yellow)  tput setaf 220 ;; \
		green)   tput setaf 78 ;; \
		purple)  tput setaf 135 ;; \
		grey)    tput setaf 8 ;; \
		pink)    tput setaf 207 ;; \
		*)       tput setaf 15 ;; \
	esac
	@echo $1
	@tput sgr0
endef

define allow_to_cancel
	while [ -z "$$CONTINUE" ]; do \
		read -r -p "$(if $1,$1,Are you sure to continue ?) [y/N]: " CONTINUE; \
	done ; \
	[ $$CONTINUE = "y" ] || [ $$CONTINUE = "Y" ] || (echo "Exiting."; exit 1;)
endef

##@ HELPERS

help: ## display command list
	cat logo.ascii
	# echo "$(shell tput setaf 3)available commands$(shell tput sgr0)"
	# grep -E '^[a-zA-Z_.-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  $(shell tput setaf 3)make <command>$(shell tput sgr0)\033[36m\033[0m\n"} /^[a-zA-Z_.-]+:.*?##/ { printf "  \033[36m%-30s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ SETUP

init: ## init the repo for the first time
	git config core.hooksPath .githooks
	$(MAKE) reload.dependencies

##@ DEPENDENCIES

lock.dependencies: ## lock dependencies to ensure future dependencies integrity
	deno cache --lock=lock.json --lock-write src/deps.ts

reload.dependencies: ## reload dependencies
	deno cache --reload --lock=lock.json src/deps.ts

##@ QUALITY

lint:
	deno lint

coverage:
	deno coverage $(COVERAGE_DIR) --lcov > $(COVERAGE_FILE)

##@ BUILD

bundle: ## bundle into a single JS file
	deno bundle --lock=lock.json --cached-only


##@ PACKAGE

compile: ## package into an executable file
	deno compile --lock=lock.json --cached-only --output=./bin/$(BINARY_NAME) $(ROOT_SCRIPT)

##@ RUN

run: ## run
	deno run --lock=lock.json --cached-only $(ROOT_SCRIPT)

dev: ## run in watch mode
	deno run --lock=lock.json --cached-only $(ROOT_SCRIPT)

##@ TEST

test: ## Launch unit tests
	deno test --lock=lock.json --cached-only --coverage=$(COVERAGE_DIR)

##@ VERSIONNING

upgrade:
	deno upgrade
