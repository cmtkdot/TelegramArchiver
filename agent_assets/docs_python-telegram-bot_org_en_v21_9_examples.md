URL: https://docs.python-telegram-bot.org/en/v21.9/examples.html
---
ContentsMenuExpandLight modeDark modeAuto light/dark, in light modeAuto light/dark, in dark mode

Back to top

[View this page](_sources/examples.rst.txt "View this page")

[Edit this page](https://github.com/python-telegram-bot/python-telegram-bot/edit/2ac52018c29c791aa0438750e5bcdf2da8945bf8/docs/source/examples.rst "Edit this page")

Toggle Light / Dark / Auto color theme

Toggle table of contents sidebar

# Examples [¶](\#examples "Link to this heading")

In this section we display small examples to show what a bot written with
`python-telegram-bot` looks like.
Some bots focus on one specific
aspect of the Telegram Bot API while others focus on one of the
mechanics of this library. Except for the
[rawapibot.py](examples.rawapibot.html) example, they all use the high-level
framework this library provides with the
[`telegram.ext`](telegram.ext.html#module-telegram.ext "telegram.ext") submodule.

All examples are licensed under the [CC0\\
License](https://github.com/python-telegram-bot/python-telegram-bot/blob/master/examples/LICENSE.txt)
and are therefore fully dedicated to the public domain. You can use them
as the base for your own bots without worrying about copyrights.

Do note that we ignore one pythonic convention. Best practice would
dictate, in many handler callbacks function signatures, to replace the
argument `context` with an underscore, since `context` is an unused
local variable in those callbacks. However, since these are examples and
not having a name for that argument confuses beginners, we decided to
have it present.

## [echobot.py](examples.echobot.html) [¶](\#examples-echobot "Link to this heading")

This is probably the base for most of the bots made with
`python-telegram-bot`. It simply replies to each text message with a
message that contains the same text.

## [timerbot.py](examples.timerbot.html) [¶](\#examples-timerbot "Link to this heading")

This bot uses the
[`telegram.ext.JobQueue`](telegram.ext.jobqueue.html#telegram.ext.JobQueue "telegram.ext.JobQueue")
class to send timed messages. The user sets a timer by using `/set`
command with a specific time, for example `/set 30`. The bot then sets
up a job to send a message to that user after 30 seconds. The user can
also cancel the timer by sending `/unset`. To learn more about the
`JobQueue`, read [this wiki article](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Extensions---JobQueue).
Note: To use `JobQueue`, you must install PTB via `pip install "python-telegram-bot[job-queue]"`

## [conversationbot.py](examples.conversationbot.html) [¶](\#examples-conversationbot "Link to this heading")

A common task for a bot is to ask information from the user. In v5.0 of
this library, we introduced the
[`telegram.ext.ConversationHandler`](telegram.ext.conversationhandler.html#telegram.ext.ConversationHandler "telegram.ext.ConversationHandler")
for that exact purpose. This example uses it to retrieve
user-information in a conversation-like style. To get a better
understanding, take a look at the [state diagram](examples.conversationbot.html#conversationbot-diagram).

## [conversationbot2.py](examples.conversationbot2.html) [¶](\#examples-conversationbot2 "Link to this heading")

A more complex example of a bot that uses the `ConversationHandler`.
It is also more confusing. Good thing there is a [fancy state diagram](examples.conversationbot2.html#conversationbot2-diagram).
for this one, too!

## [nestedconversationbot.py](examples.nestedconversationbot.html) [¶](\#examples-nestedconversationbot "Link to this heading")

A even more complex example of a bot that uses the nested
`ConversationHandler` s. While it’s certainly not that complex that
you couldn’t built it without nested `ConversationHanldler` s, it
gives a good impression on how to work with them. Of course, there is a
[fancy state diagram](examples.nestedconversationbot.html#nestedconversationbot-diagram)
for this example, too!

## [persistentconversationbot.py](examples.persistentconversationbot.html) [¶](\#examples-persistentconversationbot "Link to this heading")

A basic example of a bot store conversation state and user\_data over
multiple restarts.

## [inlinekeyboard.py](examples.inlinekeyboard.html) [¶](\#examples-inlinekeyboard "Link to this heading")

This example sheds some light on inline keyboards, callback queries and
message editing. A wiki site explaining this examples lives
[here](https://github.com/python-telegram-bot/python-telegram-bot/wiki/InlineKeyboard-Example).

## [inlinekeyboard2.py](examples.inlinekeyboard2.html) [¶](\#examples-inlinekeyboard2 "Link to this heading")

A more complex example about inline keyboards, callback queries and
message editing. This example showcases how an interactive menu could be
build using inline keyboards.

## [deeplinking.py](examples.deeplinking.html) [¶](\#examples-deeplinking "Link to this heading")

A basic example on how to use deeplinking with inline keyboards.

## [inlinebot.py](examples.inlinebot.html) [¶](\#examples-inlinebot "Link to this heading")

A basic example of an [inline\\
bot](https://core.telegram.org/bots/inline). Don’t forget to enable
inline mode with [@BotFather](https://telegram.me/BotFather).

## [pollbot.py](examples.pollbot.html) [¶](\#examples-pollbot "Link to this heading")

This example sheds some light on polls, poll answers and the
corresponding handlers.

## [passportbot.py](examples.passportbot.html) [¶](\#examples-passportbot "Link to this heading")

A basic example of a bot that can accept passports. Use in combination
with the [HTML page](examples.passportbot.html#passportbot-html).
Don’t forget to enable and configure payments with
[@BotFather](https://telegram.me/BotFather). Check out this
[guide](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Telegram-Passport)
on Telegram passports in PTB.
Note: To use Telegram Passport, you must install PTB via `pip install "python-telegram-bot[passport]"`

## [paymentbot.py](examples.paymentbot.html) [¶](\#examples-paymentbot "Link to this heading")

A basic example of a bot that can accept payments. Don’t forget to
enable and configure payments with
[@BotFather](https://telegram.me/BotFather).

## [errorhandlerbot.py](examples.errorhandlerbot.html) [¶](\#examples-errorhandlerbot "Link to this heading")

A basic example on how to set up a custom error handler.

## [chatmemberbot.py](examples.chatmemberbot.html) [¶](\#examples-chatmemberbot "Link to this heading")

A basic example on how `(my_)chat_member` updates can be used.

## [webappbot.py](examples.webappbot.html) [¶](\#examples-webappbot "Link to this heading")

A basic example of how [Telegram\\
WebApps](https://core.telegram.org/bots/webapps) can be used. Use in
combination with the [HTML page](examples.webappbot.html#webappbot-html).
For your convenience, this file is hosted by the PTB team such that you
don’t need to host it yourself. Uses the
[iro.js](https://iro.js.org) JavaScript library to showcase a
user interface that is hard to achieve with native Telegram
functionality.

## [contexttypesbot.py](examples.contexttypesbot.html) [¶](\#examples-contexttypesbot "Link to this heading")

This example showcases how `telegram.ext.ContextTypes` can be used to
customize the `context` argument of handler and job callbacks.

## [customwebhookbot.py](examples.customwebhookbot.html) [¶](\#examples-customwebhookbot "Link to this heading")

This example showcases how a custom webhook setup can be used in
combination with `telegram.ext.Application`.

## [arbitrarycallbackdatabot.py](examples.arbitrarycallbackdatabot.html) [¶](\#examples-arbitrarycallbackdatabot "Link to this heading")

This example showcases how PTBs “arbitrary callback data” feature can be
used.
Note: To use arbitrary callback data, you must install PTB via `pip install "python-telegram-bot[callback-data]"`

## Pure API [¶](\#pure-api "Link to this heading")

The [rawapibot.py](examples.rawapibot.html) example example uses only the pure, “bare-metal” API wrapper.