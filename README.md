# WebMD

From markdown to website.

- [Goal](#goal)
- [Development](#development)
  - [Your first time](#your-first-time)
  - [Makefile](#makefile)
  - [Commits](#commits)
- [Thanks](#thanks)

## Goal

I need a static site generator for my own website. I needed also to experiment [Deno](https://deno.land/).

## Development

### Your first time

First time you setup this repo, and before any work, please run `make init`. It will setup git hooks. We use it to automate quality checks for commit message.

### Makefile

All useful commands for project are inside a makefile. To list them you can type `make help` or just `make`.

### Commits

Project follow [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) specification.

Here is a short description of types

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

## Thanks

When I was looking for a parser which fit my needs I found some broken libs. One of them was producing a tree from string source. It was the correct way to let me add more grammar to markdown for my static site purpose.

I then try to look to tutorials for this method and I found that one:

- [Writing a Parser — Part I: Getting Started](https://medium.com/swlh/writing-a-parser-getting-started-44ba70bb6cc9)
- [Writing a Parser — Part II: Algorithms and Implementation](https://medium.com/swlh/writing-a-parser-algorithms-and-implementation-a7c40f46493d)
- [Writing a Parser — Part III: Syntax Error Handling](https://medium.com/swlh/writing-a-parser-syntax-error-handling-b71b67a8ac66)

Many thanks Supun Setunga !
