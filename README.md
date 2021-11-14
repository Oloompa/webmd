# WebMD

From markdown to website.

- [Goal](#goal)
- [Development](#development)
  - [First time](#first-time)
  - [Makefile](#makefile)
  - [Commits](#commits)

## Goal

I need a static site generator for my next website. I needed also to experiment [Deno](https://deno.land/).

## Development

### First time

First time you setup this repo, and before any work, please run `make init`. It will setup git hooks. It will setup automatic quality checks.

### Makefile

All useful commands for project are inside a makefile. To list them you can type `make help` or just `make`.

### Commits

Project follow [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) specification.

Here is a short desciption of types

|     Type | Description                                                                                                |
| -------: | :--------------------------------------------------------------------------------------------------------- |
|    build | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)        |
|       ci | Changes to our CI configuration files and scripts (example scopes Travis, Circle, BrowserStack, SauceLabs) |
|     docs | Documentation only changes                                                                                 |
|     feat | A new feature                                                                                              |
|      fix | A bug fix                                                                                                  |
|     perf | A code change that improves performance                                                                    |
| refactor | A code change that neither fixes a bug nor adds a feature                                                  |
|   revert | Commit reverts a previous commit                                                                           |
|    style | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)     |
|     test | Adding missing tests or correcting existing tests                                                          |
