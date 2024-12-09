URL: https://docs.python-telegram-bot.org/en/v21.9/index.html
---
ContentsMenuExpandLight modeDark modeAuto light/dark, in light modeAuto light/dark, in dark mode

Back to top

[View this page](_sources/index.rst.txt "View this page")

[Edit this page](https://github.com/python-telegram-bot/python-telegram-bot/edit/2ac52018c29c791aa0438750e5bcdf2da8945bf8/docs/source/index.rst "Edit this page")

Toggle Light / Dark / Auto color theme

Toggle table of contents sidebar

# Hidden Headline [¶](\#hidden-headline "Link to this heading")

This is just here to get furo to display the right sidebar.

[![python-telegram-bot Logo](https://raw.githubusercontent.com/python-telegram-bot/logos/master/logo-text/png/ptb-logo-text_768.png)](https://python-telegram-bot.org) [![PyPi Package Version](https://img.shields.io/pypi/v/python-telegram-bot.svg)](https://pypi.org/project/python-telegram-bot/) [![Supported Python versions](https://img.shields.io/pypi/pyversions/python-telegram-bot.svg)](https://pypi.org/project/python-telegram-bot/) [![Supported Bot API version](https://img.shields.io/badge/Bot%20API-8.1-blue?logo=telegram)](https://core.telegram.org/bots/api-changelog) [![PyPi Package Monthly Download](https://img.shields.io/pypi/dm/python-telegram-bot)](https://pypistats.org/packages/python-telegram-bot) [![Documentation Status](https://readthedocs.org/projects/python-telegram-bot/badge/?version=stable)](https://docs.python-telegram-bot.org/en/stable/) [![LGPLv3 License](https://img.shields.io/pypi/l/python-telegram-bot.svg)](https://www.gnu.org/licenses/lgpl-3.0.html) [![Github Actions workflow](https://github.com/python-telegram-bot/python-telegram-bot/actions/workflows/unit_tests.yml/badge.svg?branch=master)](https://github.com/python-telegram-bot/python-telegram-bot/) [![Code coverage](https://codecov.io/gh/python-telegram-bot/python-telegram-bot/branch/master/graph/badge.svg)](https://app.codecov.io/gh/python-telegram-bot/python-telegram-bot) [![Median time to resolve an issue](https://isitmaintained.com/badge/resolution/python-telegram-bot/python-telegram-bot.svg)](https://isitmaintained.com/project/python-telegram-bot/python-telegram-bot) [![Code quality: Codacy](https://api.codacy.com/project/badge/Grade/99d901eaa09b44b4819aec05c330c968)](https://app.codacy.com/gh/python-telegram-bot/python-telegram-bot/dashboard) [![pre-commit.ci status](https://results.pre-commit.ci/badge/github/python-telegram-bot/python-telegram-bot/master.svg)](https://results.pre-commit.ci/latest/github/python-telegram-bot/python-telegram-bot/master) [![Code Style: Black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black) [![Telegram Channel](https://img.shields.io/badge/Telegram-Channel-blue.svg?logo=telegram)](https://t.me/pythontelegrambotchannel) [![Telegram Group](https://img.shields.io/badge/Telegram-Group-blue.svg?logo=telegram)](https://telegram.me/pythontelegrambotgroup)

We have made you a wrapper you can’t refuse

We have a vibrant community of developers helping each other in our [Telegram group](https://telegram.me/pythontelegrambotgroup). Join us!

_Stay tuned for library updates and new releases on our_ [Telegram Channel](https://telegram.me/pythontelegrambotchannel).

## Introduction [¶](\#introduction "Link to this heading")

This library provides a pure Python, asynchronous interface for the
[Telegram Bot API](https://core.telegram.org/bots/api).
It’s compatible with Python versions **3.9+**.

In addition to the pure API implementation, this library features several convenience methods and shortcuts as well as a number of high-level classes to
make the development of bots easy and straightforward. These classes are contained in the
`telegram.ext` submodule.

After [installing](#installing) the library, be sure to check out the section on [working with PTB](#working-with-ptb).

### Telegram API support [¶](\#telegram-api-support "Link to this heading")

All types and methods of the Telegram Bot API **8.1** are natively supported by this library.
In addition, Bot API functionality not yet natively included can still be used as described [in our wiki](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Bot-API-Forward-Compatibility).

### Notable Features [¶](\#notable-features "Link to this heading")

- [Fully asynchronous](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Concurrency)

- Convenient shortcut methods, e.g. [Message.reply\_text](https://docs.python-telegram-bot.org/en/stable/telegram.message.html#telegram.Message.reply_text)

- [Fully annotated with static type hints](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Type-Checking)

- [Customizable and extendable interface](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Architecture)

- Seamless integration with [webhooks](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Webhooks) and [polling](https://docs.python-telegram-bot.org/en/stable/telegram.ext.application.html#telegram.ext.Application.run_polling)

- [Comprehensive documentation and examples](#working-with-ptb)


## Installing [¶](\#installing "Link to this heading")

You can install or upgrade `python-telegram-bot` via

```
$ pip install python-telegram-bot --upgrade

```

Copy to clipboard

To install a pre-release, use the `--pre` [flag](https://pip.pypa.io/en/stable/cli/pip_install/#cmdoption-pre) in addition.

You can also install `python-telegram-bot` from source, though this is usually not necessary.

```
$ git clone https://github.com/python-telegram-bot/python-telegram-bot
$ cd python-telegram-bot
$ pip install build
$ python -m build

```

Copy to clipboard

### Verifying Releases [¶](\#verifying-releases "Link to this heading")

To enable you to verify that a release file that you downloaded was indeed provided by the `python-telegram-bot` team, we have taken the following measures.

Starting with v21.4, all releases are signed via [sigstore](https://www.sigstore.dev).
The corresponding signature files are uploaded to the [GitHub releases page](https://github.com/python-telegram-bot/python-telegram-bot/releases).
To verify the signature, please install the [sigstore Python client](https://pypi.org/project/sigstore/) and follow the instructions for [verifying signatures from GitHub Actions](https://github.com/sigstore/sigstore-python?tab=readme-ov-file). As input for the `--repository` parameter, please use the value `python-telegram-bot/python-telegram-bot`.

Earlier releases are signed with a GPG key.
The signatures are uploaded to both the [GitHub releases page](https://github.com/python-telegram-bot/python-telegram-bot/releases) and the [PyPI project](https://pypi.org/project/python-telegram-bot/) and end with a suffix `.asc`.
Please find the public keys [here](https://github.com/python-telegram-bot/python-telegram-bot/tree/master/public_keys).
The keys are named in the format `<first_version>-<last_version>.gpg`.

In addition, the GitHub release page also contains the sha1 hashes of the release files in the files with the suffix `.sha1`.

### Dependencies & Their Versions [¶](\#dependencies-their-versions "Link to this heading")

`python-telegram-bot` tries to use as few 3rd party dependencies as possible.
However, for some features using a 3rd party library is more sane than implementing the functionality again.
As these features are _optional_, the corresponding 3rd party dependencies are not installed by default.
Instead, they are listed as optional dependencies.
This allows to avoid unnecessary dependency conflicts for users who don’t need the optional features.

The only required dependency is [httpx ~= 0.27](https://www.python-httpx.org) for
`telegram.request.HTTPXRequest`, the default networking backend.

`python-telegram-bot` is most useful when used along with additional libraries.
To minimize dependency conflicts, we try to be liberal in terms of version requirements on the (optional) dependencies.
On the other hand, we have to ensure stability of `python-telegram-bot`, which is why we do apply version bounds.
If you encounter dependency conflicts due to these bounds, feel free to reach out.

#### Optional Dependencies [¶](\#optional-dependencies "Link to this heading")

PTB can be installed with optional dependencies:

- `pip install "python-telegram-bot[passport]"` installs the [cryptography>=39.0.1](https://cryptography.io/en/stable) library. Use this, if you want to use Telegram Passport related functionality.

- `pip install "python-telegram-bot[socks]"` installs [httpx\[socks\]](https://www.python-httpx.org/#dependencies). Use this, if you want to work behind a Socks5 server.

- `pip install "python-telegram-bot[http2]"` installs [httpx\[http2\]](https://www.python-httpx.org/#dependencies). Use this, if you want to use HTTP/2.

- `pip install "python-telegram-bot[rate-limiter]"` installs [aiolimiter~=1.1,<1.3](https://aiolimiter.readthedocs.io/en/stable/). Use this, if you want to use `telegram.ext.AIORateLimiter`.

- `pip install "python-telegram-bot[webhooks]"` installs the [tornado~=6.4](https://www.tornadoweb.org/en/stable/) library. Use this, if you want to use `telegram.ext.Updater.start_webhook`/ `telegram.ext.Application.run_webhook`.

- `pip install "python-telegram-bot[callback-data]"` installs the [cachetools>=5.3.3,<5.6.0](https://cachetools.readthedocs.io/en/latest/) library. Use this, if you want to use [arbitrary callback\_data](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Arbitrary-callback_data).

- `pip install "python-telegram-bot[job-queue]"` installs the [APScheduler~=3.10.4](https://apscheduler.readthedocs.io/en/3.x/) library and enforces [pytz>=2018.6](https://pypi.org/project/pytz/), where `pytz` is a dependency of `APScheduler`. Use this, if you want to use the `telegram.ext.JobQueue`.


To install multiple optional dependencies, separate them by commas, e.g. `pip install "python-telegram-bot[socks,webhooks]"`.

Additionally, two shortcuts are provided:

- `pip install "python-telegram-bot[all]"` installs all optional dependencies.

- `pip install "python-telegram-bot[ext]"` installs all optional dependencies that are related to `telegram.ext`, i.e. `[rate-limiter, webhooks, callback-data, job-queue]`.


## Working with PTB [¶](\#working-with-ptb "Link to this heading")

Once you have installed the library, you can begin working with it - so let’s get started!

### Quick Start [¶](\#quick-start "Link to this heading")

Our Wiki contains an [Introduction to the API](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Introduction-to-the-API) explaining how the pure Bot API can be accessed via `python-telegram-bot`.
Moreover, the [Tutorial: Your first Bot](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Extensions---Your-first-Bot) gives an introduction on how chatbots can be easily programmed with the help of the `telegram.ext` module.

### Resources [¶](\#resources "Link to this heading")

- The [package documentation](https://docs.python-telegram-bot.org/) is the technical reference for `python-telegram-bot`.
It contains descriptions of all available classes, modules, methods and arguments as well as the [changelog](https://docs.python-telegram-bot.org/changelog.html).

- The [wiki](https://github.com/python-telegram-bot/python-telegram-bot/wiki/) is home to number of more elaborate introductions of the different features of `python-telegram-bot` and other useful resources that go beyond the technical documentation.

- Our [examples section](https://docs.python-telegram-bot.org/examples.html) contains several examples that showcase the different features of both the Bot API and `python-telegram-bot`.
Even if it is not your approach for learning, please take a look at `echobot.py`. It is the de facto base for most of the bots out there.
The code for these examples is released to the public domain, so you can start by grabbing the code and building on top of it.

- The [official Telegram Bot API documentation](https://core.telegram.org/bots/api) is of course always worth a read.


### Getting help [¶](\#getting-help "Link to this heading")

If the resources mentioned above don’t answer your questions or simply overwhelm you, there are several ways of getting help.

1. We have a vibrant community of developers helping each other in our [Telegram group](https://telegram.me/pythontelegrambotgroup). Join us! Asking a question here is often the quickest way to get a pointer in the right direction.

2. Ask questions by opening [a discussion](https://github.com/python-telegram-bot/python-telegram-bot/discussions/new).

3. You can even ask for help on Stack Overflow using the [python-telegram-bot tag](https://stackoverflow.com/questions/tagged/python-telegram-bot).


### Concurrency [¶](\#concurrency "Link to this heading")

Since v20.0, `python-telegram-bot` is built on top of Pythons `asyncio` module.
Because `asyncio` is in general single-threaded, `python-telegram-bot` does currently not aim to be thread-safe.
Noteworthy parts of `python-telegram-bots` API that are likely to cause issues (e.g. race conditions) when used in a multi-threaded setting include:

- `telegram.ext.Application/Updater.update_queue`

- `telegram.ext.ConversationHandler.check/handle_update`

- `telegram.ext.CallbackDataCache`

- `telegram.ext.BasePersistence`

- all classes in the `telegram.ext.filters` module that allow to add/remove allowed users/chats at runtime


## Contributing [¶](\#contributing "Link to this heading")

Contributions of all sizes are welcome.
Please review our [contribution guidelines](https://github.com/python-telegram-bot/python-telegram-bot/blob/master/.github/CONTRIBUTING.rst) to get started.
You can also help by [reporting bugs or feature requests](https://github.com/python-telegram-bot/python-telegram-bot/issues/new/choose).

## Donating [¶](\#donating "Link to this heading")

Occasionally we are asked if we accept donations to support the development.
While we appreciate the thought, maintaining PTB is our hobby, and we have almost no running costs for it. We therefore have nothing set up to accept donations.
If you still want to donate, we kindly ask you to donate to another open source project/initiative of your choice instead.

## License [¶](\#license "Link to this heading")

You may copy, distribute and modify the software provided that modifications are described and licensed for free under [LGPL-3](https://www.gnu.org/licenses/lgpl-3.0.html).
Derivative works (including modifications or anything statically linked to the library) can only be redistributed under LGPL-3, but applications that use the library don’t have to be.