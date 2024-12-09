URL: https://docs.python-telegram-bot.org/en/v21.9/telegram.bot.html
---
ContentsMenuExpandLight modeDark modeAuto light/dark, in light modeAuto light/dark, in dark mode

Back to top

[View this page](_sources/telegram.bot.rst.txt "View this page")

[Edit this page](https://github.com/python-telegram-bot/python-telegram-bot/edit/2ac52018c29c791aa0438750e5bcdf2da8945bf8/docs/source/telegram.bot.rst "Edit this page")

Toggle Light / Dark / Auto color theme

Toggle table of contents sidebar

# Bot [¶](\#bot "Link to this heading")

_class_ telegram.Bot( _token_, _base\_url='https://api.telegram.org/bot'_, _base\_file\_url='https://api.telegram.org/file/bot'_, _request=None_, _get\_updates\_request=None_, _private\_key=None_, _private\_key\_password=None_, _local\_mode=False_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L129-L10013) [¶](#telegram.Bot "Link to this definition")

Bases: [`telegram.TelegramObject`](telegram.telegramobject.html#telegram.TelegramObject "telegram.TelegramObject"), [`contextlib.AbstractAsyncContextManager`](https://docs.python.org/3/library/contextlib.html#contextlib.AbstractAsyncContextManager "(in Python v3.13)")

This object represents a Telegram Bot.

Instances of this class can be used as asyncio context managers, where

```
async with bot:
    # code

```

Copy to clipboard

is roughly equivalent to

```
try:
    await bot.initialize()
    # code
finally:
    await bot.shutdown()

```

Copy to clipboard

Use In

[`telegram.ext.ApplicationBuilder.bot()`](telegram.ext.applicationbuilder.html#telegram.ext.ApplicationBuilder.bot "telegram.ext.ApplicationBuilder.bot")

Available In

- [`telegram.ext.Application.bot`](telegram.ext.application.html#telegram.ext.Application.bot "telegram.ext.Application.bot")

- [`telegram.ext.BasePersistence.bot`](telegram.ext.basepersistence.html#telegram.ext.BasePersistence.bot "telegram.ext.BasePersistence.bot")

- [`telegram.ext.CallbackContext.bot`](telegram.ext.callbackcontext.html#telegram.ext.CallbackContext.bot "telegram.ext.CallbackContext.bot")

- [`telegram.ext.Updater.bot`](telegram.ext.updater.html#telegram.ext.Updater.bot "telegram.ext.Updater.bot")


See also

[`__aenter__()`](#telegram.Bot.__aenter__ "telegram.Bot.__aenter__") and [`__aexit__()`](#telegram.Bot.__aexit__ "telegram.Bot.__aexit__").

Note

- Most bot methods have the argument `api_kwargs` which allows passing arbitrary keywords
to the Telegram API. This can be used to access new features of the API before they are
incorporated into PTB. The limitations to this argument are the same as the ones
described in [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request").

- Bots should not be serialized since if you for e.g. change the bots token, then your
serialized instance will not reflect that change. Trying to pickle a bot instance will
raise [`pickle.PicklingError`](https://docs.python.org/3/library/pickle.html#pickle.PicklingError "(in Python v3.13)"). Trying to deepcopy a bot instance will raise
[`TypeError`](https://docs.python.org/3/library/exceptions.html#TypeError "(in Python v3.13)").


Examples

[Raw API Bot](examples.rawapibot.html)

See also

[Your First Bot](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Extensions---Your-first-Bot),
[Builder Pattern](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Builder-Pattern)

Added in version 13.2: Objects of this class are comparable in terms of equality. Two objects of this class are
considered equal, if their [`bot`](#telegram.Bot.bot "telegram.Bot.bot") is equal.

Changed in version 20.0:

- Removed the deprecated methods `kick_chat_member`, `kickChatMember`,
`get_chat_members_count` and `getChatMembersCount`.

- Removed the deprecated property `commands`.

- Removed the deprecated `defaults` parameter. If you want to use
[`telegram.ext.Defaults`](telegram.ext.defaults.html#telegram.ext.Defaults "telegram.ext.Defaults"), please use the subclass [`telegram.ext.ExtBot`](telegram.ext.extbot.html#telegram.ext.ExtBot "telegram.ext.ExtBot")
instead.

- Attempting to pickle a bot instance will now raise [`pickle.PicklingError`](https://docs.python.org/3/library/pickle.html#pickle.PicklingError "(in Python v3.13)").

- Attempting to deepcopy a bot instance will now raise [`TypeError`](https://docs.python.org/3/library/exceptions.html#TypeError "(in Python v3.13)").

- The following are now keyword-only arguments in Bot methods:
`location`, `filename`, `venue`, `contact`,
`{read, write, connect, pool}_timeout`, `api_kwargs`. Use a named argument for those,
and notice that some positional arguments changed position as a result.

- For uploading files, file paths are now always accepted. If [`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot") is
[`False`](https://docs.python.org/3/library/constants.html#False "(in Python v3.13)"), the file contents will be read in binary mode and uploaded. Otherwise,
the file path will be passed in the
[file URI scheme](https://en.wikipedia.org/wiki/File_URI_scheme).


Changed in version 20.5: Removed deprecated methods `set_sticker_set_thumb` and `setStickerSetThumb`.
Use [`set_sticker_set_thumbnail()`](#telegram.Bot.set_sticker_set_thumbnail "telegram.Bot.set_sticker_set_thumbnail") and [`setStickerSetThumbnail()`](#telegram.Bot.setStickerSetThumbnail "telegram.Bot.setStickerSetThumbnail") instead.

Parameters:

- [**token**](#telegram.Bot.params.token) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Bot’s unique authentication token.

- [**base\_url**](#telegram.Bot.params.base_url) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Telegram Bot API service URL.

- [**base\_file\_url**](#telegram.Bot.params.base_file_url) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Telegram Bot API file URL.

- [**request**](#telegram.Bot.params.request) ( [`telegram.request.BaseRequest`](telegram.request.baserequest.html#telegram.request.BaseRequest "telegram.request.BaseRequest"), optional) – Pre initialized
[`telegram.request.BaseRequest`](telegram.request.baserequest.html#telegram.request.BaseRequest "telegram.request.BaseRequest") instances. Will be used for all bot methods
_except_ for [`get_updates()`](#telegram.Bot.get_updates "telegram.Bot.get_updates"). If not passed, an instance of
[`telegram.request.HTTPXRequest`](telegram.request.httpxrequest.html#telegram.request.HTTPXRequest "telegram.request.HTTPXRequest") will be used.

- [**get\_updates\_request**](#telegram.Bot.params.get_updates_request) ( [`telegram.request.BaseRequest`](telegram.request.baserequest.html#telegram.request.BaseRequest "telegram.request.BaseRequest"), optional) – Pre initialized
[`telegram.request.BaseRequest`](telegram.request.baserequest.html#telegram.request.BaseRequest "telegram.request.BaseRequest") instances. Will be used exclusively for
[`get_updates()`](#telegram.Bot.get_updates "telegram.Bot.get_updates"). If not passed, an instance of
[`telegram.request.HTTPXRequest`](telegram.request.httpxrequest.html#telegram.request.HTTPXRequest "telegram.request.HTTPXRequest") will be used.

- [**private\_key**](#telegram.Bot.params.private_key) ( [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)"), optional) – Private key for decryption of telegram passport data.

- [**private\_key\_password**](#telegram.Bot.params.private_key_password) ( [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)"), optional) – Password for above private key.

- [**local\_mode**](#telegram.Bot.params.local_mode) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –

Set to [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the [`base_url`](#telegram.Bot.params.base_url "telegram.Bot") is
the URI of a [Local Bot API Server](https://core.telegram.org/bots/api#using-a-local-bot-api-server) that runs with the `--local` flag. Currently, the only effect of
this is that files are uploaded using their local path in the
[file URI scheme](https://en.wikipedia.org/wiki/File_URI_scheme).
Defaults to [`False`](https://docs.python.org/3/library/constants.html#False "(in Python v3.13)").



Added in version 20.0..


* * *

Since this class has a large number of methods and attributes, below you can find a quick overview.

Sending Messages

|     |     |
| --- | --- |
| [`send_animation()`](#telegram.Bot.send_animation "telegram.Bot.send_animation") | Used for sending animations |
| [`send_audio()`](#telegram.Bot.send_audio "telegram.Bot.send_audio") | Used for sending audio files |
| [`send_chat_action()`](#telegram.Bot.send_chat_action "telegram.Bot.send_chat_action") | Used for sending chat actions |
| [`send_contact()`](#telegram.Bot.send_contact "telegram.Bot.send_contact") | Used for sending contacts |
| [`send_dice()`](#telegram.Bot.send_dice "telegram.Bot.send_dice") | Used for sending dice messages |
| [`send_document()`](#telegram.Bot.send_document "telegram.Bot.send_document") | Used for sending documents |
| [`send_game()`](#telegram.Bot.send_game "telegram.Bot.send_game") | Used for sending a game |
| [`send_gift()`](#telegram.Bot.send_gift "telegram.Bot.send_gift") | Used for sending a gift |
| [`send_invoice()`](#telegram.Bot.send_invoice "telegram.Bot.send_invoice") | Used for sending an invoice |
| [`send_location()`](#telegram.Bot.send_location "telegram.Bot.send_location") | Used for sending location |
| [`send_media_group()`](#telegram.Bot.send_media_group "telegram.Bot.send_media_group") | Used for sending media grouped together |
| [`send_message()`](#telegram.Bot.send_message "telegram.Bot.send_message") | Used for sending text messages |
| [`send_paid_media()`](#telegram.Bot.send_paid_media "telegram.Bot.send_paid_media") | Used for sending paid media to channels |
| [`send_photo()`](#telegram.Bot.send_photo "telegram.Bot.send_photo") | Used for sending photos |
| [`send_poll()`](#telegram.Bot.send_poll "telegram.Bot.send_poll") | Used for sending polls |
| [`send_sticker()`](#telegram.Bot.send_sticker "telegram.Bot.send_sticker") | Used for sending stickers |
| [`send_venue()`](#telegram.Bot.send_venue "telegram.Bot.send_venue") | Used for sending venue locations. |
| [`send_video()`](#telegram.Bot.send_video "telegram.Bot.send_video") | Used for sending videos |
| [`send_video_note()`](#telegram.Bot.send_video_note "telegram.Bot.send_video_note") | Used for sending video notes |
| [`send_voice()`](#telegram.Bot.send_voice "telegram.Bot.send_voice") | Used for sending voice messages |
| [`copy_message()`](#telegram.Bot.copy_message "telegram.Bot.copy_message") | Used for copying the contents of an arbitrary message |
| [`copy_messages()`](#telegram.Bot.copy_messages "telegram.Bot.copy_messages") | Used for copying the contents of an multiple arbitrary messages |
| [`forward_message()`](#telegram.Bot.forward_message "telegram.Bot.forward_message") | Used for forwarding messages |
| [`forward_messages()`](#telegram.Bot.forward_messages "telegram.Bot.forward_messages") | Used for forwarding multiple messages at once |

Updating Messages

|     |     |
| --- | --- |
| [`answer_callback_query()`](#telegram.Bot.answer_callback_query "telegram.Bot.answer_callback_query") | Used for answering the callback query |
| [`answer_inline_query()`](#telegram.Bot.answer_inline_query "telegram.Bot.answer_inline_query") | Used for answering the inline query |
| [`answer_pre_checkout_query()`](#telegram.Bot.answer_pre_checkout_query "telegram.Bot.answer_pre_checkout_query") | Used for answering a pre checkout query |
| [`answer_shipping_query()`](#telegram.Bot.answer_shipping_query "telegram.Bot.answer_shipping_query") | Used for answering a shipping query |
| [`answer_web_app_query()`](#telegram.Bot.answer_web_app_query "telegram.Bot.answer_web_app_query") | Used for answering a web app query |
| [`delete_message()`](#telegram.Bot.delete_message "telegram.Bot.delete_message") | Used for deleting messages. |
| [`delete_messages()`](#telegram.Bot.delete_messages "telegram.Bot.delete_messages") | Used for deleting multiple messages as once. |
| [`edit_message_caption()`](#telegram.Bot.edit_message_caption "telegram.Bot.edit_message_caption") | Used for editing captions |
| [`edit_message_media()`](#telegram.Bot.edit_message_media "telegram.Bot.edit_message_media") | Used for editing the media on messages |
| [`edit_message_live_location()`](#telegram.Bot.edit_message_live_location "telegram.Bot.edit_message_live_location") | Used for editing the location in live location messages |
| [`edit_message_reply_markup()`](#telegram.Bot.edit_message_reply_markup "telegram.Bot.edit_message_reply_markup") | Used for editing the reply markup on messages |
| [`edit_message_text()`](#telegram.Bot.edit_message_text "telegram.Bot.edit_message_text") | Used for editing text messages |
| [`stop_poll()`](#telegram.Bot.stop_poll "telegram.Bot.stop_poll") | Used for stopping the running poll |
| [`set_message_reaction()`](#telegram.Bot.set_message_reaction "telegram.Bot.set_message_reaction") | Used for setting reactions on messages |

Chat Moderation and information

|     |     |
| --- | --- |
| [`approve_chat_join_request()`](#telegram.Bot.approve_chat_join_request "telegram.Bot.approve_chat_join_request") | Used for approving a chat join request |
| [`decline_chat_join_request()`](#telegram.Bot.decline_chat_join_request "telegram.Bot.decline_chat_join_request") | Used for declining a chat join request |
| [`ban_chat_member()`](#telegram.Bot.ban_chat_member "telegram.Bot.ban_chat_member") | Used for banning a member from the chat |
| [`unban_chat_member()`](#telegram.Bot.unban_chat_member "telegram.Bot.unban_chat_member") | Used for unbanning a member from the chat |
| [`ban_chat_sender_chat()`](#telegram.Bot.ban_chat_sender_chat "telegram.Bot.ban_chat_sender_chat") | Used for banning a channel in a channel or supergroup |
| [`unban_chat_sender_chat()`](#telegram.Bot.unban_chat_sender_chat "telegram.Bot.unban_chat_sender_chat") | Used for unbanning a channel in a channel or supergroup |
| [`restrict_chat_member()`](#telegram.Bot.restrict_chat_member "telegram.Bot.restrict_chat_member") | Used for restricting a chat member |
| [`promote_chat_member()`](#telegram.Bot.promote_chat_member "telegram.Bot.promote_chat_member") | Used for promoting a chat member |
| [`set_chat_administrator_custom_title()`](#telegram.Bot.set_chat_administrator_custom_title "telegram.Bot.set_chat_administrator_custom_title") | Used for assigning a custom admin title to an admin |
| [`set_chat_permissions()`](#telegram.Bot.set_chat_permissions "telegram.Bot.set_chat_permissions") | Used for setting the permissions of a chat |
| [`export_chat_invite_link()`](#telegram.Bot.export_chat_invite_link "telegram.Bot.export_chat_invite_link") | Used for creating a new primary invite link for a chat |
| [`create_chat_invite_link()`](#telegram.Bot.create_chat_invite_link "telegram.Bot.create_chat_invite_link") | Used for creating an additional invite link for a chat |
| [`edit_chat_invite_link()`](#telegram.Bot.edit_chat_invite_link "telegram.Bot.edit_chat_invite_link") | Used for editing a non-primary invite link |
| [`revoke_chat_invite_link()`](#telegram.Bot.revoke_chat_invite_link "telegram.Bot.revoke_chat_invite_link") | Used for revoking an invite link created by the bot |
| [`set_chat_photo()`](#telegram.Bot.set_chat_photo "telegram.Bot.set_chat_photo") | Used for setting a photo to a chat |
| [`delete_chat_photo()`](#telegram.Bot.delete_chat_photo "telegram.Bot.delete_chat_photo") | Used for deleting a chat photo |
| [`set_chat_title()`](#telegram.Bot.set_chat_title "telegram.Bot.set_chat_title") | Used for setting a chat title |
| [`set_chat_description()`](#telegram.Bot.set_chat_description "telegram.Bot.set_chat_description") | Used for setting the description of a chat |
| [`set_user_emoji_status()`](#telegram.Bot.set_user_emoji_status "telegram.Bot.set_user_emoji_status") | Used for setting the users status emoji |
| [`pin_chat_message()`](#telegram.Bot.pin_chat_message "telegram.Bot.pin_chat_message") | Used for pinning a message |
| [`unpin_chat_message()`](#telegram.Bot.unpin_chat_message "telegram.Bot.unpin_chat_message") | Used for unpinning a message |
| [`unpin_all_chat_messages()`](#telegram.Bot.unpin_all_chat_messages "telegram.Bot.unpin_all_chat_messages") | Used for unpinning all pinned chat messages |
| [`get_business_connection()`](#telegram.Bot.get_business_connection "telegram.Bot.get_business_connection") | Used for getting information about the business account. |
| [`get_user_profile_photos()`](#telegram.Bot.get_user_profile_photos "telegram.Bot.get_user_profile_photos") | Used for obtaining user’s profile pictures |
| [`get_chat()`](#telegram.Bot.get_chat "telegram.Bot.get_chat") | Used for getting information about a chat |
| [`get_chat_administrators()`](#telegram.Bot.get_chat_administrators "telegram.Bot.get_chat_administrators") | Used for getting the list of admins in a chat |
| [`get_chat_member_count()`](#telegram.Bot.get_chat_member_count "telegram.Bot.get_chat_member_count") | Used for getting the number of members in a chat |
| [`get_chat_member()`](#telegram.Bot.get_chat_member "telegram.Bot.get_chat_member") | Used for getting a member of a chat |
| [`get_user_chat_boosts()`](#telegram.Bot.get_user_chat_boosts "telegram.Bot.get_user_chat_boosts") | Used for getting the list of boosts added to a chat |
| [`leave_chat()`](#telegram.Bot.leave_chat "telegram.Bot.leave_chat") | Used for leaving a chat |

Bot settings

|     |     |
| --- | --- |
| [`set_my_commands()`](#telegram.Bot.set_my_commands "telegram.Bot.set_my_commands") | Used for setting the list of commands |
| [`delete_my_commands()`](#telegram.Bot.delete_my_commands "telegram.Bot.delete_my_commands") | Used for deleting the list of commands |
| [`get_my_commands()`](#telegram.Bot.get_my_commands "telegram.Bot.get_my_commands") | Used for obtaining the list of commands |
| [`get_my_default_administrator_rights()`](#telegram.Bot.get_my_default_administrator_rights "telegram.Bot.get_my_default_administrator_rights") | Used for obtaining the default administrator rights for the bot |
| [`set_my_default_administrator_rights()`](#telegram.Bot.set_my_default_administrator_rights "telegram.Bot.set_my_default_administrator_rights") | Used for setting the default administrator rights for the bot |
| [`get_chat_menu_button()`](#telegram.Bot.get_chat_menu_button "telegram.Bot.get_chat_menu_button") | Used for obtaining the menu button of a private chat or the default menu button |
| [`set_chat_menu_button()`](#telegram.Bot.set_chat_menu_button "telegram.Bot.set_chat_menu_button") | Used for setting the menu button of a private chat or the default menu button |
| [`set_my_description()`](#telegram.Bot.set_my_description "telegram.Bot.set_my_description") | Used for setting the description of the bot |
| [`get_my_description()`](#telegram.Bot.get_my_description "telegram.Bot.get_my_description") | Used for obtaining the description of the bot |
| [`set_my_short_description()`](#telegram.Bot.set_my_short_description "telegram.Bot.set_my_short_description") | Used for setting the short description of the bot |
| [`get_my_short_description()`](#telegram.Bot.get_my_short_description "telegram.Bot.get_my_short_description") | Used for obtaining the short description of the bot |
| [`set_my_name()`](#telegram.Bot.set_my_name "telegram.Bot.set_my_name") | Used for setting the name of the bot |
| [`get_my_name()`](#telegram.Bot.get_my_name "telegram.Bot.get_my_name") | Used for obtaining the name of the bot |

Stickerset management

|     |     |
| --- | --- |
| [`add_sticker_to_set()`](#telegram.Bot.add_sticker_to_set "telegram.Bot.add_sticker_to_set") | Used for adding a sticker to a set |
| [`delete_sticker_from_set()`](#telegram.Bot.delete_sticker_from_set "telegram.Bot.delete_sticker_from_set") | Used for deleting a sticker from a set |
| [`create_new_sticker_set()`](#telegram.Bot.create_new_sticker_set "telegram.Bot.create_new_sticker_set") | Used for creating a new sticker set |
| [`delete_sticker_set()`](#telegram.Bot.delete_sticker_set "telegram.Bot.delete_sticker_set") | Used for deleting a sticker set made by a bot |
| [`set_chat_sticker_set()`](#telegram.Bot.set_chat_sticker_set "telegram.Bot.set_chat_sticker_set") | Used for setting a sticker set of a chat |
| [`delete_chat_sticker_set()`](#telegram.Bot.delete_chat_sticker_set "telegram.Bot.delete_chat_sticker_set") | Used for deleting the set sticker set of a chat |
| [`replace_sticker_in_set()`](#telegram.Bot.replace_sticker_in_set "telegram.Bot.replace_sticker_in_set") | Used for replacing a sticker in a set |
| [`set_sticker_position_in_set()`](#telegram.Bot.set_sticker_position_in_set "telegram.Bot.set_sticker_position_in_set") | Used for moving a sticker’s position in the set |
| [`set_sticker_set_title()`](#telegram.Bot.set_sticker_set_title "telegram.Bot.set_sticker_set_title") | Used for setting the title of a sticker set |
| [`set_sticker_emoji_list()`](#telegram.Bot.set_sticker_emoji_list "telegram.Bot.set_sticker_emoji_list") | Used for setting the emoji list of a sticker |
| [`set_sticker_keywords()`](#telegram.Bot.set_sticker_keywords "telegram.Bot.set_sticker_keywords") | Used for setting the keywords of a sticker |
| [`set_sticker_mask_position()`](#telegram.Bot.set_sticker_mask_position "telegram.Bot.set_sticker_mask_position") | Used for setting the mask position of a mask sticker |
| [`set_sticker_set_thumbnail()`](#telegram.Bot.set_sticker_set_thumbnail "telegram.Bot.set_sticker_set_thumbnail") | Used for setting the thumbnail of a sticker set |
| [`set_custom_emoji_sticker_set_thumbnail()`](#telegram.Bot.set_custom_emoji_sticker_set_thumbnail "telegram.Bot.set_custom_emoji_sticker_set_thumbnail") | Used for setting the thumbnail of a custom emoji sticker set |
| [`get_sticker_set()`](#telegram.Bot.get_sticker_set "telegram.Bot.get_sticker_set") | Used for getting a sticker set |
| [`upload_sticker_file()`](#telegram.Bot.upload_sticker_file "telegram.Bot.upload_sticker_file") | Used for uploading a sticker file |
| [`get_custom_emoji_stickers()`](#telegram.Bot.get_custom_emoji_stickers "telegram.Bot.get_custom_emoji_stickers") | Used for getting custom emoji files based on their IDs |

Games

|     |     |
| --- | --- |
| [`get_game_high_scores()`](#telegram.Bot.get_game_high_scores "telegram.Bot.get_game_high_scores") | Used for getting the game high scores |
| [`set_game_score()`](#telegram.Bot.set_game_score "telegram.Bot.set_game_score") | Used for setting the game score |

Getting updates

|     |     |
| --- | --- |
| [`get_updates()`](#telegram.Bot.get_updates "telegram.Bot.get_updates") | Used for getting updates using long polling |
| [`get_webhook_info()`](#telegram.Bot.get_webhook_info "telegram.Bot.get_webhook_info") | Used for getting current webhook status |
| [`set_webhook()`](#telegram.Bot.set_webhook "telegram.Bot.set_webhook") | Used for setting a webhook to receive updates |
| [`delete_webhook()`](#telegram.Bot.delete_webhook "telegram.Bot.delete_webhook") | Used for removing webhook integration |

Forum topic management

|     |     |
| --- | --- |
| [`close_forum_topic()`](#telegram.Bot.close_forum_topic "telegram.Bot.close_forum_topic") | Used for closing a forum topic |
| [`close_general_forum_topic()`](#telegram.Bot.close_general_forum_topic "telegram.Bot.close_general_forum_topic") | Used for closing the general forum topic |
| [`create_forum_topic()`](#telegram.Bot.create_forum_topic "telegram.Bot.create_forum_topic") | Used to create a topic |
| [`delete_forum_topic()`](#telegram.Bot.delete_forum_topic "telegram.Bot.delete_forum_topic") | Used for deleting a forum topic |
| [`edit_forum_topic()`](#telegram.Bot.edit_forum_topic "telegram.Bot.edit_forum_topic") | Used to edit a topic |
| [`edit_general_forum_topic()`](#telegram.Bot.edit_general_forum_topic "telegram.Bot.edit_general_forum_topic") | Used to edit the general topic |
| [`get_forum_topic_icon_stickers()`](#telegram.Bot.get_forum_topic_icon_stickers "telegram.Bot.get_forum_topic_icon_stickers") | Used to get custom emojis to use as topic icons |
| [`hide_general_forum_topic()`](#telegram.Bot.hide_general_forum_topic "telegram.Bot.hide_general_forum_topic") | Used to hide the general topic |
| [`unhide_general_forum_topic()`](#telegram.Bot.unhide_general_forum_topic "telegram.Bot.unhide_general_forum_topic") | Used to unhide the general topic |
| [`reopen_forum_topic()`](#telegram.Bot.reopen_forum_topic "telegram.Bot.reopen_forum_topic") | Used to reopen a topic |
| [`reopen_general_forum_topic()`](#telegram.Bot.reopen_general_forum_topic "telegram.Bot.reopen_general_forum_topic") | Used to reopen the general topic |
| [`unpin_all_forum_topic_messages()`](#telegram.Bot.unpin_all_forum_topic_messages "telegram.Bot.unpin_all_forum_topic_messages") | Used to unpin all messages in a forum topic |
| [`unpin_all_general_forum_topic_messages()`](#telegram.Bot.unpin_all_general_forum_topic_messages "telegram.Bot.unpin_all_general_forum_topic_messages") | Used to unpin all messages in the general forum topic |

Payments and Stars

|     |     |
| --- | --- |
| [`create_invoice_link()`](#telegram.Bot.create_invoice_link "telegram.Bot.create_invoice_link") | Used to generate an HTTP link for an invoice |
| [`edit_user_star_subscription()`](#telegram.Bot.edit_user_star_subscription "telegram.Bot.edit_user_star_subscription") | Used for editing a user’s star subscription |
| [`get_star_transactions()`](#telegram.Bot.get_star_transactions "telegram.Bot.get_star_transactions") | Used for obtaining the bot’s Telegram Stars transactions |
| [`refund_star_payment()`](#telegram.Bot.refund_star_payment "telegram.Bot.refund_star_payment") | Used for refunding a payment in Telegram Stars |

Miscellaneous

|     |     |
| --- | --- |
| [`close()`](#telegram.Bot.close "telegram.Bot.close") | Used for closing server instance when switching to another local server |
| [`log_out()`](#telegram.Bot.log_out "telegram.Bot.log_out") | Used for logging out from cloud Bot API server |
| [`get_file()`](#telegram.Bot.get_file "telegram.Bot.get_file") | Used for getting basic info about a file |
| [`get_available_gifts()`](#telegram.Bot.get_available_gifts "telegram.Bot.get_available_gifts") | Used for getting information about gifts available for sending |
| [`get_me()`](#telegram.Bot.get_me "telegram.Bot.get_me") | Used for getting basic information about the bot |
| [`save_prepared_inline_message()`](#telegram.Bot.save_prepared_inline_message "telegram.Bot.save_prepared_inline_message") | Used for storing a message to be sent by a user of a Mini App |

Properties

|     |     |
| --- | --- |
| [`base_file_url`](#telegram.Bot.base_file_url "telegram.Bot.base_file_url") | Telegram Bot API file URL |
| [`base_url`](#telegram.Bot.base_url "telegram.Bot.base_url") | Telegram Bot API service URL |
| [`bot`](#telegram.Bot.bot "telegram.Bot.bot") | The user instance of the bot as returned by [`get_me()`](#telegram.Bot.get_me "telegram.Bot.get_me") |
| [`can_join_groups`](#telegram.Bot.can_join_groups "telegram.Bot.can_join_groups") | Whether the bot can join groups |
| [`can_read_all_group_messages`](#telegram.Bot.can_read_all_group_messages "telegram.Bot.can_read_all_group_messages") | Whether the bot can read all incoming group messages |
| [`id`](#telegram.Bot.id "telegram.Bot.id") | The user id of the bot |
| [`name`](#telegram.Bot.name "telegram.Bot.name") | The username of the bot, with leading `@` |
| [`first_name`](#telegram.Bot.first_name "telegram.Bot.first_name") | The first name of the bot |
| [`last_name`](#telegram.Bot.last_name "telegram.Bot.last_name") | The last name of the bot |
| [`local_mode`](#telegram.Bot.local_mode "telegram.Bot.local_mode") | Whether the bot is running in local mode |
| [`username`](#telegram.Bot.username "telegram.Bot.username") | The username of the bot, without leading `@` |
| [`link`](#telegram.Bot.link "telegram.Bot.link") | The t.me link of the bot |
| [`private_key`](#telegram.Bot.private_key "telegram.Bot.private_key") | Deserialized private key for decryption of telegram passport data |
| [`supports_inline_queries`](#telegram.Bot.supports_inline_queries "telegram.Bot.supports_inline_queries") | Whether the bot supports inline queries |
| [`token`](#telegram.Bot.token "telegram.Bot.token") | Bot’s unique authentication token |

* * *

_async_\_\_aenter\_\_() [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L311-L328) [¶](#telegram.Bot.__aenter__ "Link to this definition")

Asynchronous context manager which [`initializes`](#telegram.Bot.initialize "telegram.Bot.initialize") the Bot.

Returns:

The initialized Bot instance.

Raises:

[**Exception**](https://docs.python.org/3/library/exceptions.html#Exception "(in Python v3.13)") – If an exception is raised during initialization, [`shutdown()`](#telegram.Bot.shutdown "telegram.Bot.shutdown")
is called in this case.

_async_\_\_aexit\_\_( _exc\_type_, _exc\_val_, _exc\_tb_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L329-L339) [¶](#telegram.Bot.__aexit__ "Link to this definition")

Asynchronous context manager which [`shuts down`](#telegram.Bot.shutdown "telegram.Bot.shutdown") the Bot.

\_\_deepcopy\_\_( _memodict_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L351-L361) [¶](#telegram.Bot.__deepcopy__ "Link to this definition")

Customizes how [`copy.deepcopy()`](https://docs.python.org/3/library/copy.html#copy.deepcopy "(in Python v3.13)") processes objects of this type. Bots can not
be deepcopied and this method will always raise an exception.

Added in version 20.0.

Raises:

[**TypeError**](https://docs.python.org/3/library/exceptions.html#TypeError "(in Python v3.13)") –

\_\_eq\_\_( _other_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L362-L373) [¶](#telegram.Bot.__eq__ "Link to this definition")

Defines equality condition for the [`telegram.Bot`](#telegram.Bot "telegram.Bot") object.
Two objects of this class are considered to be equal if their attributes
[`bot`](#telegram.Bot.bot "telegram.Bot.bot") are equal.

Returns:

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") if both attributes [`bot`](#telegram.Bot.bot "telegram.Bot.bot") are equal. [`False`](https://docs.python.org/3/library/constants.html#False "(in Python v3.13)") otherwise.

\_\_hash\_\_() [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L374-L379) [¶](#telegram.Bot.__hash__ "Link to this definition")

See [`telegram.TelegramObject.__hash__()`](telegram.telegramobject.html#telegram.TelegramObject.__hash__ "telegram.TelegramObject.__hash__")

\_\_reduce\_\_() [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L340-L350) [¶](#telegram.Bot.__reduce__ "Link to this definition")

Customizes how [`copy.deepcopy()`](https://docs.python.org/3/library/copy.html#copy.deepcopy "(in Python v3.13)") processes objects of this type. Bots can not
be pickled and this method will always raise an exception.

Added in version 20.0.

Raises:

[**pickle.PicklingError**](https://docs.python.org/3/library/pickle.html#pickle.PicklingError "(in Python v3.13)") –

\_\_repr\_\_() [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L380-L390) [¶](#telegram.Bot.__repr__ "Link to this definition")

Give a string representation of the bot in the form `Bot[token=...]`.

As this class doesn’t implement [`object.__str__()`](https://docs.python.org/3/reference/datamodel.html#object.__str__ "(in Python v3.13)"), the default implementation
will be used, which is equivalent to [`__repr__()`](#telegram.Bot.__repr__ "telegram.Bot.__repr__").

Returns:

[`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")

_async_ addStickerToSet( _user\_id_, _name_, _sticker_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6564-L6622) [¶](#telegram.Bot.addStickerToSet "Link to this definition")

Alias for [`add_sticker_to_set()`](#telegram.Bot.add_sticker_to_set "telegram.Bot.add_sticker_to_set")

_async_ add\_sticker\_to\_set( _user\_id_, _name_, _sticker_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6564-L6622) [¶](#telegram.Bot.add_sticker_to_set "Link to this definition")

Use this method to add a new sticker to a set created by the bot. The format of the added
sticker must match the format of the other stickers in the set. Emoji sticker sets can have
up to [`200`](telegram.constants.html#telegram.constants.StickerSetLimit.MAX_EMOJI_STICKERS "telegram.constants.StickerSetLimit.MAX_EMOJI_STICKERS") stickers. Other
sticker sets can have up to
[`120`](telegram.constants.html#telegram.constants.StickerSetLimit.MAX_STATIC_STICKERS "telegram.constants.StickerSetLimit.MAX_STATIC_STICKERS") stickers.

Changed in version 20.2: Since Bot API 6.6, the parameter [`sticker`](#telegram.Bot.add_sticker_to_set.params.sticker "telegram.Bot.add_sticker_to_set") replace the parameters
`png_sticker`, `tgs_sticker`, `webm_sticker`, `emojis`, and `mask_position`.

Changed in version 20.5: Removed deprecated parameters `png_sticker`, `tgs_sticker`, `webm_sticker`,
`emojis`, and `mask_position`.

Parameters:

- [**user\_id**](#telegram.Bot.add_sticker_to_set.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – User identifier of created sticker set owner.

- [**name**](#telegram.Bot.add_sticker_to_set.params.name) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Sticker set name.

- [**sticker**](#telegram.Bot.add_sticker_to_set.params.sticker) ( [`telegram.InputSticker`](telegram.inputsticker.html#telegram.InputSticker "telegram.InputSticker")) –

An object with information about the added
sticker. If exactly the same sticker had already been added to the set, then the
set isn’t changed.



Added in version 20.2.


Keyword Arguments:

- [**read\_timeout**](#telegram.Bot.add_sticker_to_set.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**write\_timeout**](#telegram.Bot.add_sticker_to_set.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) –

Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). By default, `20` seconds are used as write timeout.



Deprecated since version 20.7: In future versions, the default value will be changed to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**connect\_timeout**](#telegram.Bot.add_sticker_to_set.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**pool\_timeout**](#telegram.Bot.add_sticker_to_set.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**api\_kwargs**](#telegram.Bot.add_sticker_to_set.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.


Returns:

On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.

Return type:

[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")

Raises:

[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –

_async_ answerCallbackQuery( _callback\_query\_id_, _text=None_, _show\_alert=None_, _url=None_, _cache\_time=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4002-L4066) [¶](#telegram.Bot.answerCallbackQuery "Link to this definition")

Alias for [`answer_callback_query()`](#telegram.Bot.answer_callback_query "telegram.Bot.answer_callback_query")

_async_ answerInlineQuery( _inline\_query\_id_, _results_, _cache\_time=None_, _is\_personal=None_, _next\_offset=None_, _button=None_, _\*_, _current\_offset=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3549-L3645) [¶](#telegram.Bot.answerInlineQuery "Link to this definition")

Alias for [`answer_inline_query()`](#telegram.Bot.answer_inline_query "telegram.Bot.answer_inline_query")

_async_ answerPreCheckoutQuery( _pre\_checkout\_query\_id_, _ok_, _error\_message=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5347-L5402) [¶](#telegram.Bot.answerPreCheckoutQuery "Link to this definition")

Alias for [`answer_pre_checkout_query()`](#telegram.Bot.answer_pre_checkout_query "telegram.Bot.answer_pre_checkout_query")

_async_ answerShippingQuery( _shipping\_query\_id_, _ok_, _shipping\_options=None_, _error\_message=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5289-L5346) [¶](#telegram.Bot.answerShippingQuery "Link to this definition")

Alias for [`answer_shipping_query()`](#telegram.Bot.answer_shipping_query "telegram.Bot.answer_shipping_query")

_async_ answerWebAppQuery( _web\_app\_query\_id_, _result_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5403-L5448) [¶](#telegram.Bot.answerWebAppQuery "Link to this definition")

Alias for [`answer_web_app_query()`](#telegram.Bot.answer_web_app_query "telegram.Bot.answer_web_app_query")

_async_ answer\_callback\_query( _callback\_query\_id_, _text=None_, _show\_alert=None_, _url=None_, _cache\_time=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4002-L4066) [¶](#telegram.Bot.answer_callback_query "Link to this definition")

Use this method to send answers to callback queries sent from inline keyboards. The answer
will be displayed to the user as a notification at the top of the chat screen or as an
alert.
Alternatively, the user can be redirected to the specified Game URL. For this option to
work, you must first create a game for your bot via [@BotFather](https://t.me/BotFather)
and accept the terms. Otherwise, you may use links like t.me/your\_bot?start=XXXX that open
your bot with a parameter.

Shortcuts

[`telegram.CallbackQuery.answer()`](telegram.callbackquery.html#telegram.CallbackQuery.answer "telegram.CallbackQuery.answer")

Parameters:

- [**callback\_query\_id**](#telegram.Bot.answer_callback_query.params.callback_query_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the query to be answered.

- [**text**](#telegram.Bot.answer_callback_query.params.text) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Text of the notification. If not specified, nothing will
be shown to the user, 0- [`200`](telegram.callbackquery.html#telegram.CallbackQuery.MAX_ANSWER_TEXT_LENGTH "telegram.CallbackQuery.MAX_ANSWER_TEXT_LENGTH")
characters.

- [**show\_alert**](#telegram.Bot.answer_callback_query.params.show_alert) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – If [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), an alert will be shown by the
client instead of a notification at the top of the chat screen. Defaults to
[`False`](https://docs.python.org/3/library/constants.html#False "(in Python v3.13)").

- [**url**](#telegram.Bot.answer_callback_query.params.url) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –

URL that will be opened by the user’s client. If you have
created a Game and accepted the conditions via
[@BotFather](https://t.me/BotFather), specify the URL that
opens your game - note that this will only work if the query comes from a callback
game button. Otherwise, you may use links like t.me/your\_bot?start=XXXX that open
your bot with a parameter.

- [**cache\_time**](#telegram.Bot.answer_callback_query.params.cache_time) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – The maximum amount of time in seconds that the
result of the callback query may be cached client-side. Defaults to 0.


Keyword Arguments:

- [**read\_timeout**](#telegram.Bot.answer_callback_query.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**write\_timeout**](#telegram.Bot.answer_callback_query.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**connect\_timeout**](#telegram.Bot.answer_callback_query.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**pool\_timeout**](#telegram.Bot.answer_callback_query.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**api\_kwargs**](#telegram.Bot.answer_callback_query.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.


Returns:

[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)") On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.

Raises:

[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –

_async_ answer\_inline\_query( _inline\_query\_id_, _results_, _cache\_time=None_, _is\_personal=None_, _next\_offset=None_, _button=None_, _\*_, _current\_offset=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3549-L3645) [¶](#telegram.Bot.answer_inline_query "Link to this definition")

Use this method to send answers to an inline query. No more than
[`50`](telegram.inlinequery.html#telegram.InlineQuery.MAX_RESULTS "telegram.InlineQuery.MAX_RESULTS") results per query are allowed.

Warning

In most use cases [`current_offset`](#telegram.Bot.answer_inline_query.params.current_offset "telegram.Bot.answer_inline_query") should not be passed manually. Instead of
calling this method directly, use the shortcut [`telegram.InlineQuery.answer()`](telegram.inlinequery.html#telegram.InlineQuery.answer "telegram.InlineQuery.answer") with
[`telegram.InlineQuery.answer.auto_pagination`](telegram.inlinequery.html#telegram.InlineQuery.answer.params.auto_pagination "telegram.InlineQuery.answer") set to [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), which will
take care of passing the correct value.

Shortcuts

[`telegram.InlineQuery.answer()`](telegram.inlinequery.html#telegram.InlineQuery.answer "telegram.InlineQuery.answer")

See also

[Working with Files and Media](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Working-with-Files-and-Media)

Changed in version 20.5: Removed deprecated arguments `switch_pm_text` and `switch_pm_parameter`.

Parameters:

- [**inline\_query\_id**](#telegram.Bot.answer_inline_query.params.inline_query_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the answered query.

- [**results**](#telegram.Bot.answer_inline_query.params.results) (list\[ [`telegram.InlineQueryResult`](telegram.inlinequeryresult.html#telegram.InlineQueryResult "telegram.InlineQueryResult")\] \| Callable) – A list of results for
the inline query. In case [`current_offset`](#telegram.Bot.answer_inline_query.params.current_offset "telegram.Bot.answer_inline_query") is passed,
[`results`](#telegram.Bot.answer_inline_query.params.results "telegram.Bot.answer_inline_query") may also be
a callable that accepts the current page index starting from 0. It must return
either a list of [`telegram.InlineQueryResult`](telegram.inlinequeryresult.html#telegram.InlineQueryResult "telegram.InlineQueryResult") instances or [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)") if
there are no more results.

- [**cache\_time**](#telegram.Bot.answer_inline_query.params.cache_time) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – The maximum amount of time in seconds that the
result of the inline query may be cached on the server. Defaults to `300`.

- [**is\_personal**](#telegram.Bot.answer_inline_query.params.is_personal) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if results may be cached on
the server side only for the user that sent the query. By default,
results may be returned to any user who sends the same query.

- [**next\_offset**](#telegram.Bot.answer_inline_query.params.next_offset) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Pass the offset that a client should send in the
next query with the same text to receive more results. Pass an empty string if
there are no more results or if you don’t support pagination. Offset length can’t
exceed [`64`](telegram.inlinequery.html#telegram.InlineQuery.MAX_OFFSET_LENGTH "telegram.InlineQuery.MAX_OFFSET_LENGTH") bytes.

- [**button**](#telegram.Bot.answer_inline_query.params.button) ( [`telegram.InlineQueryResultsButton`](telegram.inlinequeryresultsbutton.html#telegram.InlineQueryResultsButton "telegram.InlineQueryResultsButton"), optional) –

A button to be shown
above the inline query results.



Added in version 20.3.


Keyword Arguments:

- [**current\_offset**](#telegram.Bot.answer_inline_query.params.current_offset) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – The [`telegram.InlineQuery.offset`](telegram.inlinequery.html#telegram.InlineQuery.offset "telegram.InlineQuery.offset") of
the inline query to answer. If passed, PTB will automatically take care of
the pagination for you, i.e. pass the correct [`next_offset`](#telegram.Bot.answer_inline_query.params.next_offset "telegram.Bot.answer_inline_query") and truncate
the results list/get the results from the callable you passed.

- [**read\_timeout**](#telegram.Bot.answer_inline_query.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**write\_timeout**](#telegram.Bot.answer_inline_query.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**connect\_timeout**](#telegram.Bot.answer_inline_query.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**pool\_timeout**](#telegram.Bot.answer_inline_query.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**api\_kwargs**](#telegram.Bot.answer_inline_query.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.


Returns:

On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.

Return type:

[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")

Raises:

[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –

_async_ answer\_pre\_checkout\_query( _pre\_checkout\_query\_id_, _ok_, _error\_message=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5347-L5402) [¶](#telegram.Bot.answer_pre_checkout_query "Link to this definition")

Once the user has confirmed their payment and shipping details, the Bot API sends the final
confirmation in the form of an [`telegram.Update`](telegram.update.html#telegram.Update "telegram.Update") with the field
[`telegram.Update.pre_checkout_query`](telegram.update.html#telegram.Update.pre_checkout_query "telegram.Update.pre_checkout_query"). Use this method to respond to such pre-checkout
queries.

Note

The Bot API must receive an answer within 10 seconds after the pre-checkout
query was sent.

Shortcuts

[`telegram.PreCheckoutQuery.answer()`](telegram.precheckoutquery.html#telegram.PreCheckoutQuery.answer "telegram.PreCheckoutQuery.answer")

Parameters:

- [**pre\_checkout\_query\_id**](#telegram.Bot.answer_pre_checkout_query.params.pre_checkout_query_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the query to be answered.

- [**ok**](#telegram.Bot.answer_pre_checkout_query.params.ok) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")) – Specify [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") if everything is alright
(goods are available, etc.) and the bot is ready to proceed with the order. Use
[`False`](https://docs.python.org/3/library/constants.html#False "(in Python v3.13)") if there are any problems.

- [**error\_message**](#telegram.Bot.answer_pre_checkout_query.params.error_message) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Required if [`ok`](#telegram.Bot.answer_pre_checkout_query.params.ok "telegram.Bot.answer_pre_checkout_query") is [`False`](https://docs.python.org/3/library/constants.html#False "(in Python v3.13)"). Error
message in human readable form that explains the reason for failure to proceed with
the checkout (e.g. “Sorry, somebody just bought the last of our amazing black
T-shirts while you were busy filling out your payment details. Please choose a
different color or garment!”). Telegram will display this message to the user.


Keyword Arguments:

- [**read\_timeout**](#telegram.Bot.answer_pre_checkout_query.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**write\_timeout**](#telegram.Bot.answer_pre_checkout_query.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**connect\_timeout**](#telegram.Bot.answer_pre_checkout_query.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**pool\_timeout**](#telegram.Bot.answer_pre_checkout_query.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**api\_kwargs**](#telegram.Bot.answer_pre_checkout_query.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.


Returns:

On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned

Return type:

[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")

Raises:

[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –

_async_ answer\_shipping\_query( _shipping\_query\_id_, _ok_, _shipping\_options=None_, _error\_message=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5289-L5346) [¶](#telegram.Bot.answer_shipping_query "Link to this definition")

If you sent an invoice requesting a shipping address and the parameter
[`send_invoice.is_flexible`](#telegram.Bot.send_invoice.params.is_flexible "telegram.Bot.send_invoice") was specified, the Bot API will send an
[`telegram.Update`](telegram.update.html#telegram.Update "telegram.Update") with a [`telegram.Update.shipping_query`](telegram.update.html#telegram.Update.shipping_query "telegram.Update.shipping_query") field to the bot.
Use this method to reply to shipping queries.

Shortcuts

[`telegram.ShippingQuery.answer()`](telegram.shippingquery.html#telegram.ShippingQuery.answer "telegram.ShippingQuery.answer")

Parameters:

- [**shipping\_query\_id**](#telegram.Bot.answer_shipping_query.params.shipping_query_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the query to be answered.

- [**ok**](#telegram.Bot.answer_shipping_query.params.ok) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")) – Specify [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") if delivery to the specified address is possible
and [`False`](https://docs.python.org/3/library/constants.html#False "(in Python v3.13)") if there are any problems (for example, if delivery to the
specified address is not possible).

- [**shipping\_options**](#telegram.Bot.answer_shipping_query.params.shipping_options) (Sequence\[ [`telegram.ShippingOption`](telegram.shippingoption.html#telegram.ShippingOption "telegram.ShippingOption")\]), optional) –

Required if
[`ok`](#telegram.Bot.answer_shipping_query.params.ok "telegram.Bot.answer_shipping_query") is [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"). A sequence of available shipping options.



Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.

- [**error\_message**](#telegram.Bot.answer_shipping_query.params.error_message) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Required if [`ok`](#telegram.Bot.answer_shipping_query.params.ok "telegram.Bot.answer_shipping_query") is [`False`](https://docs.python.org/3/library/constants.html#False "(in Python v3.13)").
Error message in human readable form that explains why it is impossible to complete
the order (e.g. “Sorry, delivery to your desired address is unavailable”). Telegram
will display this message to the user.


Keyword Arguments:

- [**read\_timeout**](#telegram.Bot.answer_shipping_query.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**write\_timeout**](#telegram.Bot.answer_shipping_query.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**connect\_timeout**](#telegram.Bot.answer_shipping_query.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**pool\_timeout**](#telegram.Bot.answer_shipping_query.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**api\_kwargs**](#telegram.Bot.answer_shipping_query.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.


Returns:

On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.

Return type:

[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")

Raises:

[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –

_async_ answer\_web\_app\_query( _web\_app\_query\_id_, _result_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5403-L5448) [¶](#telegram.Bot.answer_web_app_query "Link to this definition")

Use this method to set the result of an interaction with a Web App and send a
corresponding message on behalf of the user to the chat from which the query originated.

Added in version 20.0.

Parameters:

- [**web\_app\_query\_id**](#telegram.Bot.answer_web_app_query.params.web_app_query_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the query to be answered.

- [**result**](#telegram.Bot.answer_web_app_query.params.result) ( [`telegram.InlineQueryResult`](telegram.inlinequeryresult.html#telegram.InlineQueryResult "telegram.InlineQueryResult")) – An object describing the message to be
sent.


Keyword Arguments:

- [**read\_timeout**](#telegram.Bot.answer_web_app_query.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**write\_timeout**](#telegram.Bot.answer_web_app_query.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**connect\_timeout**](#telegram.Bot.answer_web_app_query.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**pool\_timeout**](#telegram.Bot.answer_web_app_query.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**api\_kwargs**](#telegram.Bot.answer_web_app_query.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.


Returns:

On success, a sent
[`telegram.SentWebAppMessage`](telegram.sentwebappmessage.html#telegram.SentWebAppMessage "telegram.SentWebAppMessage") is returned.

Return type:

[`telegram.SentWebAppMessage`](telegram.sentwebappmessage.html#telegram.SentWebAppMessage "telegram.SentWebAppMessage")

Raises:

[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –

_async_ approveChatJoinRequest( _chat\_id_, _user\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5989-L6028) [¶](#telegram.Bot.approveChatJoinRequest "Link to this definition")

Alias for [`approve_chat_join_request()`](#telegram.Bot.approve_chat_join_request "telegram.Bot.approve_chat_join_request")

_async_ approve\_chat\_join\_request( _chat\_id_, _user\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5989-L6028) [¶](#telegram.Bot.approve_chat_join_request "Link to this definition")

Use this method to approve a chat join request.

The bot must be an administrator in the chat for this to work and must have the
[`telegram.ChatPermissions.can_invite_users`](telegram.chatpermissions.html#telegram.ChatPermissions.can_invite_users "telegram.ChatPermissions.can_invite_users") administrator right.

Shortcuts

- [`telegram.ChatJoinRequest.approve()`](telegram.chatjoinrequest.html#telegram.ChatJoinRequest.approve "telegram.ChatJoinRequest.approve")

- [`telegram.User.approve_join_request()`](telegram.user.html#telegram.User.approve_join_request "telegram.User.approve_join_request")


Added in version 13.8.

Parameters:

- [**chat\_id**](#telegram.Bot.approve_chat_join_request.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).

- [**user\_id**](#telegram.Bot.approve_chat_join_request.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Unique identifier of the target user.


Keyword Arguments:

- [**read\_timeout**](#telegram.Bot.approve_chat_join_request.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**write\_timeout**](#telegram.Bot.approve_chat_join_request.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**connect\_timeout**](#telegram.Bot.approve_chat_join_request.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**pool\_timeout**](#telegram.Bot.approve_chat_join_request.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**api\_kwargs**](#telegram.Bot.approve_chat_join_request.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.


Returns:

On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.

Return type:

[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")

Raises:

[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –

_async_ banChatMember( _chat\_id_, _user\_id_, _until\_date=None_, _revoke\_messages=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3814-L3874) [¶](#telegram.Bot.banChatMember "Link to this definition")

Alias for [`ban_chat_member()`](#telegram.Bot.ban_chat_member "telegram.Bot.ban_chat_member")

_async_ banChatSenderChat( _chat\_id_, _sender\_chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3875-L3917) [¶](#telegram.Bot.banChatSenderChat "Link to this definition")

Alias for [`ban_chat_sender_chat()`](#telegram.Bot.ban_chat_sender_chat "telegram.Bot.ban_chat_sender_chat")

_async_ ban\_chat\_member( _chat\_id_, _user\_id_, _until\_date=None_, _revoke\_messages=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3814-L3874) [¶](#telegram.Bot.ban_chat_member "Link to this definition")

Use this method to ban a user from a group, supergroup or a channel. In the case of
supergroups and channels, the user will not be able to return to the group on their own
using invite links, etc., unless unbanned first. The bot must be an administrator in the
chat for this to work and must have the appropriate admin rights.

Added in version 13.7.

Parameters:

- [**chat\_id**](#telegram.Bot.ban_chat_member.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target group or username
of the target supergroup or channel (in the format `@channelusername`).

- [**user\_id**](#telegram.Bot.ban_chat_member.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Unique identifier of the target user.

- [**until\_date**](#telegram.Bot.ban_chat_member.params.until_date) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`datetime.datetime`](https://docs.python.org/3/library/datetime.html#datetime.datetime "(in Python v3.13)"), optional) – Date when the user will
be unbanned, unix time. If user is banned for more than 366 days or less than 30
seconds from the current time they are considered to be banned forever. Applied
for supergroups and channels only.
For timezone naive [`datetime.datetime`](https://docs.python.org/3/library/datetime.html#datetime.datetime "(in Python v3.13)") objects, the default timezone of the bot will be used, which is UTC unless [`telegram.ext.Defaults.tzinfo`](telegram.ext.defaults.html#telegram.ext.Defaults.tzinfo "telegram.ext.Defaults.tzinfo") is used.

- [**revoke\_messages**](#telegram.Bot.ban_chat_member.params.revoke_messages) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –

Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") to delete all messages from
the chat for the user that is being removed. If [`False`](https://docs.python.org/3/library/constants.html#False "(in Python v3.13)"), the user will be able
to see messages in the group that were sent before the user was removed.
Always [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") for supergroups and channels.



Added in version 13.4.


Keyword Arguments:

- [**read\_timeout**](#telegram.Bot.ban_chat_member.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**write\_timeout**](#telegram.Bot.ban_chat_member.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**connect\_timeout**](#telegram.Bot.ban_chat_member.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**pool\_timeout**](#telegram.Bot.ban_chat_member.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**api\_kwargs**](#telegram.Bot.ban_chat_member.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.


Returns:

On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.

Return type:

[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")

Raises:

[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –

_async_ ban\_chat\_sender\_chat( _chat\_id_, _sender\_chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3875-L3917) [¶](#telegram.Bot.ban_chat_sender_chat "Link to this definition")

Use this method to ban a channel chat in a supergroup or a channel. Until the chat is
unbanned, the owner of the banned chat won’t be able to send messages on behalf of **any of**
**their channels**. The bot must be an administrator in the supergroup or channel for this
to work and must have the appropriate administrator rights.

Added in version 13.9.

Parameters:

- [**chat\_id**](#telegram.Bot.ban_chat_sender_chat.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target group or username
of the target supergroup or channel (in the format `@channelusername`).

- [**sender\_chat\_id**](#telegram.Bot.ban_chat_sender_chat.params.sender_chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Unique identifier of the target sender chat.


Keyword Arguments:

- [**read\_timeout**](#telegram.Bot.ban_chat_sender_chat.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**write\_timeout**](#telegram.Bot.ban_chat_sender_chat.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**connect\_timeout**](#telegram.Bot.ban_chat_sender_chat.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**pool\_timeout**](#telegram.Bot.ban_chat_sender_chat.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**api\_kwargs**](#telegram.Bot.ban_chat_sender_chat.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.


Returns:

On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.

Return type:

[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")

Raises:

[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –

_property_ base\_file\_url [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L408-L416) [¶](#telegram.Bot.base_file_url "Link to this definition")

Telegram Bot API file URL, built from [`Bot.base_file_url`](#telegram.Bot.params.base_file_url "telegram.Bot") and
[`Bot.token`](#telegram.Bot.params.token "telegram.Bot").

Added in version 20.0.

Type:

[`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")

_property_ base\_url [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L399-L407) [¶](#telegram.Bot.base_url "Link to this definition")

Telegram Bot API service URL, built from [`Bot.base_url`](#telegram.Bot.params.base_url "telegram.Bot") and
[`Bot.token`](#telegram.Bot.params.token "telegram.Bot").

Added in version 20.0.

Type:

[`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")

_property_ bot [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L446-L463) [¶](#telegram.Bot.bot "Link to this definition")

User instance for the bot as returned by [`get_me()`](#telegram.Bot.get_me "telegram.Bot.get_me").

Warning

This value is the cached return value of [`get_me()`](#telegram.Bot.get_me "telegram.Bot.get_me"). If the bots profile is
changed during runtime, this value won’t reflect the changes until [`get_me()`](#telegram.Bot.get_me "telegram.Bot.get_me") is
called again.

See also

[`initialize()`](#telegram.Bot.initialize "telegram.Bot.initialize")

Type:

[`telegram.User`](telegram.user.html#telegram.User "telegram.User")

_property_ can\_join\_groups [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L497-L503) [¶](#telegram.Bot.can_join_groups "Link to this definition")

Bot’s [`telegram.User.can_join_groups`](telegram.user.html#telegram.User.can_join_groups "telegram.User.can_join_groups") attribute. Shortcut for the
corresponding attribute of [`bot`](#telegram.Bot.bot "telegram.Bot.bot").

Type:

[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")

_property_ can\_read\_all\_group\_messages [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L504-L510) [¶](#telegram.Bot.can_read_all_group_messages "Link to this definition")

Bot’s [`telegram.User.can_read_all_group_messages`](telegram.user.html#telegram.User.can_read_all_group_messages "telegram.User.can_read_all_group_messages") attribute.
Shortcut for the corresponding attribute of [`bot`](#telegram.Bot.bot "telegram.Bot.bot").

Type:

[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")

_async_ close( _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7787-L7817) [¶](#telegram.Bot.close "Link to this definition")

Use this method to close the bot instance before moving it from one local server to
another. You need to delete the webhook before calling this method to ensure that the bot
isn’t launched again after server restart. The method will return error 429 in the first
10 minutes after the bot is launched.

Keyword Arguments:

- [**read\_timeout**](#telegram.Bot.close.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**write\_timeout**](#telegram.Bot.close.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**connect\_timeout**](#telegram.Bot.close.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**pool\_timeout**](#telegram.Bot.close.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**api\_kwargs**](#telegram.Bot.close.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.


Returns:

On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.

Return type:

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)")

Raises:

[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –

_async_ closeForumTopic( _chat\_id_, _message\_thread\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8413-L8456) [¶](#telegram.Bot.closeForumTopic "Link to this definition")

Alias for [`close_forum_topic()`](#telegram.Bot.close_forum_topic "telegram.Bot.close_forum_topic")

_async_ closeGeneralForumTopic( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8670-L8708) [¶](#telegram.Bot.closeGeneralForumTopic "Link to this definition")

Alias for [`close_general_forum_topic()`](#telegram.Bot.close_general_forum_topic "telegram.Bot.close_general_forum_topic")

_async_ close\_forum\_topic( _chat\_id_, _message\_thread\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8413-L8456) [¶](#telegram.Bot.close_forum_topic "Link to this definition")

Use this method to close an open topic in a forum supergroup chat. The bot must
be an administrator in the chat for this to work and must have
[`can_manage_topics`](telegram.chatadministratorrights.html#telegram.ChatAdministratorRights.params.can_manage_topics "telegram.ChatAdministratorRights") administrator rights,
unless it is the creator of the topic.

Shortcuts

[`telegram.Message.close_forum_topic()`](telegram.message.html#telegram.Message.close_forum_topic "telegram.Message.close_forum_topic")

Added in version 20.0.

Parameters:

- [**chat\_id**](#telegram.Bot.close_forum_topic.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`).

- [**message\_thread\_id**](#telegram.Bot.close_forum_topic.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Unique identifier for the target message thread of the forum topic.


Keyword Arguments:

- [**read\_timeout**](#telegram.Bot.close_forum_topic.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**write\_timeout**](#telegram.Bot.close_forum_topic.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**connect\_timeout**](#telegram.Bot.close_forum_topic.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**pool\_timeout**](#telegram.Bot.close_forum_topic.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**api\_kwargs**](#telegram.Bot.close_forum_topic.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.


Returns:

On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.

Return type:

[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")

Raises:

[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –

_async_ close\_general\_forum\_topic( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8670-L8708) [¶](#telegram.Bot.close_general_forum_topic "Link to this definition")

Use this method to close an open ‘General’ topic in a forum supergroup chat. The bot must
be an administrator in the chat for this to work and must have
[`can_manage_topics`](telegram.chatadministratorrights.html#telegram.ChatAdministratorRights.can_manage_topics "telegram.ChatAdministratorRights.can_manage_topics") administrator rights.

Added in version 20.0.

Parameters:

[**chat\_id**](#telegram.Bot.close_general_forum_topic.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`).

Keyword Arguments:

- [**read\_timeout**](#telegram.Bot.close_general_forum_topic.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**write\_timeout**](#telegram.Bot.close_general_forum_topic.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**connect\_timeout**](#telegram.Bot.close_general_forum_topic.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**pool\_timeout**](#telegram.Bot.close_general_forum_topic.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**api\_kwargs**](#telegram.Bot.close_general_forum_topic.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.


Returns:

On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.

Return type:

[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")

Raises:

[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –

_async_ copyMessage( _chat\_id_, _from\_chat\_id_, _message\_id_, _caption=None_, _parse\_mode=None_, _caption\_entities=None_, _disable\_notification=None_, _reply\_markup=None_, _protect\_content=None_, _message\_thread\_id=None_, _reply\_parameters=None_, _show\_caption\_above\_media=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7818-L7954) [¶](#telegram.Bot.copyMessage "Link to this definition")

Alias for [`copy_message()`](#telegram.Bot.copy_message "telegram.Bot.copy_message")

_async_ copyMessages( _chat\_id_, _from\_chat\_id_, _message\_ids_, _disable\_notification=None_, _protect\_content=None_, _message\_thread\_id=None_, _remove\_caption=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7955-L8025) [¶](#telegram.Bot.copyMessages "Link to this definition")

Alias for [`copy_messages()`](#telegram.Bot.copy_messages "telegram.Bot.copy_messages")

_async_ copy\_message( _chat\_id_, _from\_chat\_id_, _message\_id_, _caption=None_, _parse\_mode=None_, _caption\_entities=None_, _disable\_notification=None_, _reply\_markup=None_, _protect\_content=None_, _message\_thread\_id=None_, _reply\_parameters=None_, _show\_caption\_above\_media=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7818-L7954) [¶](#telegram.Bot.copy_message "Link to this definition")

Use this method to copy messages of any kind. Service messages, paid media messages,
giveaway messages, giveaway winners messages, and invoice messages
can’t be copied. The method is analogous to the method [`forward_message()`](#telegram.Bot.forward_message "telegram.Bot.forward_message"), but the
copied message doesn’t have a link to the original message.

Shortcuts

- [`telegram.Message.copy()`](telegram.message.html#telegram.Message.copy "telegram.Message.copy")

- [`telegram.Message.reply_copy()`](telegram.message.html#telegram.Message.reply_copy "telegram.Message.reply_copy")

- [`telegram.User.copy_message()`](telegram.user.html#telegram.User.copy_message "telegram.User.copy_message")

- [`telegram.User.send_copy()`](telegram.user.html#telegram.User.send_copy "telegram.User.send_copy")


Parameters:

- [**chat\_id**](#telegram.Bot.copy_message.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).

- [**from\_chat\_id**](#telegram.Bot.copy_message.params.from_chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the chat where the
original message was sent (or channel username in the format `@channelusername`).

- [**message\_id**](#telegram.Bot.copy_message.params.message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Message identifier in the chat specified in from\_chat\_id.

- [**caption**](#telegram.Bot.copy_message.params.caption) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – New caption for media,
0- [`1024`](telegram.constants.html#telegram.constants.MessageLimit.CAPTION_LENGTH "telegram.constants.MessageLimit.CAPTION_LENGTH") characters after
entities parsing. If not specified, the original caption is kept.

- [**parse\_mode**](#telegram.Bot.copy_message.params.parse_mode) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Mode for parsing entities in the new caption. See
the constants in [`telegram.constants.ParseMode`](telegram.constants.html#telegram.constants.ParseMode "telegram.constants.ParseMode") for the available modes.

- [**caption\_entities**](#telegram.Bot.copy_message.params.caption_entities) (Sequence\[ [`telegram.MessageEntity`](telegram.messageentity.html#telegram.MessageEntity "telegram.MessageEntity")\], optional) –

Sequence of special entities that appear in the caption, which can be specified instead of `parse_mode`.



Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.

- [**disable\_notification**](#telegram.Bot.copy_message.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.

- [**protect\_content**](#telegram.Bot.copy_message.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –

Protects the contents of the sent message from forwarding and saving.



Added in version 13.10.

- [**message\_thread\_id**](#telegram.Bot.copy_message.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –

Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.



Added in version 20.0.

- [**reply\_markup**](#telegram.Bot.copy_message.params.reply_markup) ( [`InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup") \| [`ReplyKeyboardMarkup`](telegram.replykeyboardmarkup.html#telegram.ReplyKeyboardMarkup "telegram.ReplyKeyboardMarkup") \| [`ReplyKeyboardRemove`](telegram.replykeyboardremove.html#telegram.ReplyKeyboardRemove "telegram.ReplyKeyboardRemove") \| [`ForceReply`](telegram.forcereply.html#telegram.ForceReply "telegram.ForceReply"), optional) – Additional interface options. An object for an inline keyboard, custom reply
keyboard, instructions to remove reply keyboard or to force a reply from the user.

- [**reply\_parameters**](#telegram.Bot.copy_message.params.reply_parameters) ( [`telegram.ReplyParameters`](telegram.replyparameters.html#telegram.ReplyParameters "telegram.ReplyParameters"), optional) –

Description of the message to reply to.



Added in version 20.8.

- [**show\_caption\_above\_media**](#telegram.Bot.copy_message.params.show_caption_above_media) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –

Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the caption must be shown above the message media.



Added in version 21.3.

- [**allow\_paid\_broadcast**](#telegram.Bot.copy_message.params.allow_paid_broadcast) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –

Pass True to allow up to [`1000`](telegram.constants.html#telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND "telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND") messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot’s balance.



Added in version 21.7.


Keyword Arguments:

- [**allow\_sending\_without\_reply**](#telegram.Bot.copy_message.params.allow_sending_without_reply) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –

Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the message should be sent even if the specified replied-to message is not found.
Mutually exclusive with [`reply_parameters`](#telegram.Bot.copy_message.params.reply_parameters "telegram.Bot.copy_message"), which this is a convenience
parameter for



Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.copy_message.params.reply_parameters "telegram.Bot.copy_message") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.





Changed in version 21.0: This argument is now a keyword-only argument.

- [**reply\_to\_message\_id**](#telegram.Bot.copy_message.params.reply_to_message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –

If the message is a reply, ID of the original message.
Mutually exclusive with [`reply_parameters`](#telegram.Bot.copy_message.params.reply_parameters "telegram.Bot.copy_message"), which this is a convenience
parameter for



Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.copy_message.params.reply_parameters "telegram.Bot.copy_message") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.





Changed in version 21.0: This argument is now a keyword-only argument.

- [**read\_timeout**](#telegram.Bot.copy_message.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**write\_timeout**](#telegram.Bot.copy_message.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**connect\_timeout**](#telegram.Bot.copy_message.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**pool\_timeout**](#telegram.Bot.copy_message.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**api\_kwargs**](#telegram.Bot.copy_message.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.


Returns:

On success, the [`telegram.MessageId`](telegram.messageid.html#telegram.MessageId "telegram.MessageId") of the sent

message is returned.

Return type:

[`telegram.MessageId`](telegram.messageid.html#telegram.MessageId "telegram.MessageId")

Raises:

[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –

_async_ copy\_messages( _chat\_id_, _from\_chat\_id_, _message\_ids_, _disable\_notification=None_, _protect\_content=None_, _message\_thread\_id=None_, _remove\_caption=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7955-L8025) [¶](#telegram.Bot.copy_messages "Link to this definition")

Use this method to copy messages of any kind. If some of the specified messages can’t be
found or copied, they are skipped. Service messages, paid media messages, giveaway
messages, giveaway winners messages, and invoice messages can’t be copied. A quiz poll can
be copied only if the value
of the field [`telegram.Poll.correct_option_id`](telegram.poll.html#telegram.Poll.correct_option_id "telegram.Poll.correct_option_id") is known to the bot. The method is
analogous to the method [`forward_messages()`](#telegram.Bot.forward_messages "telegram.Bot.forward_messages"), but the copied messages don’t have a
link to the original message. Album grouping is kept for copied messages.

Shortcuts

- [`telegram.User.copy_messages()`](telegram.user.html#telegram.User.copy_messages "telegram.User.copy_messages")

- [`telegram.User.send_copies()`](telegram.user.html#telegram.User.send_copies "telegram.User.send_copies")


Added in version 20.8.

Parameters:

- [**chat\_id**](#telegram.Bot.copy_messages.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).

- [**from\_chat\_id**](#telegram.Bot.copy_messages.params.from_chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the chat where the
original message was sent (or channel username in the format `@channelusername`).

- [**message\_ids**](#telegram.Bot.copy_messages.params.message_ids) (Sequence\[ [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")\]) – A list of
[`1`](telegram.constants.html#telegram.constants.BulkRequestLimit.MIN_LIMIT "telegram.constants.BulkRequestLimit.MIN_LIMIT") -
[`100`](telegram.constants.html#telegram.constants.BulkRequestLimit.MAX_LIMIT "telegram.constants.BulkRequestLimit.MAX_LIMIT") identifiers of messages
in the chat [`from_chat_id`](#telegram.Bot.copy_messages.params.from_chat_id "telegram.Bot.copy_messages") to copy. The identifiers must be
specified in a strictly increasing order.

- [**disable\_notification**](#telegram.Bot.copy_messages.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.

- [**protect\_content**](#telegram.Bot.copy_messages.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Protects the contents of the sent message from forwarding and saving.

- [**message\_thread\_id**](#telegram.Bot.copy_messages.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.

- [**remove\_caption**](#telegram.Bot.copy_messages.params.remove_caption) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") to copy the messages without
their captions.


Keyword Arguments:

- [**read\_timeout**](#telegram.Bot.copy_messages.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**write\_timeout**](#telegram.Bot.copy_messages.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**connect\_timeout**](#telegram.Bot.copy_messages.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**pool\_timeout**](#telegram.Bot.copy_messages.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**api\_kwargs**](#telegram.Bot.copy_messages.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.


Returns:

On success, a tuple of [`MessageId`](telegram.messageid.html#telegram.MessageId "telegram.MessageId")
of the sent messages is returned.

Return type:

tuple\[ [`telegram.MessageId`](telegram.messageid.html#telegram.MessageId "telegram.MessageId")\]

Raises:

[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –

_async_ createChatInviteLink( _chat\_id_, _expire\_date=None_, _member\_limit=None_, _name=None_, _creates\_join\_request=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5788-L5862) [¶](#telegram.Bot.createChatInviteLink "Link to this definition")

Alias for [`create_chat_invite_link()`](#telegram.Bot.create_chat_invite_link "telegram.Bot.create_chat_invite_link")

_async_ createChatSubscriptionInviteLink( _chat\_id_, _subscription\_period_, _subscription\_price_, _name=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9537-L9596) [¶](#telegram.Bot.createChatSubscriptionInviteLink "Link to this definition")

Alias for [`create_chat_subscription_invite_link()`](#telegram.Bot.create_chat_subscription_invite_link "telegram.Bot.create_chat_subscription_invite_link")

_async_ createForumTopic( _chat\_id_, _name_, _icon\_color=None_, _icon\_custom\_emoji\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8298-L8356) [¶](#telegram.Bot.createForumTopic "Link to this definition")

Alias for [`create_forum_topic()`](#telegram.Bot.create_forum_topic "telegram.Bot.create_forum_topic")

_async_ createInvoiceLink( _title_, _description_, _payload_, _provider\_token_, _currency_, _prices_, _max\_tip\_amount=None_, _suggested\_tip\_amounts=None_, _provider\_data=None_, _photo\_url=None_, _photo\_size=None_, _photo\_width=None_, _photo\_height=None_, _need\_name=None_, _need\_phone\_number=None_, _need\_email=None_, _need\_shipping\_address=None_, _send\_phone\_number\_to\_provider=None_, _send\_email\_to\_provider=None_, _is\_flexible=None_, _subscription\_period=None_, _business\_connection\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8106-L8266) [¶](#telegram.Bot.createInvoiceLink "Link to this definition")

Alias for [`create_invoice_link()`](#telegram.Bot.create_invoice_link "telegram.Bot.create_invoice_link")

_async_ createNewStickerSet( _user\_id_, _name_, _title_, _stickers_, _sticker\_type=None_, _needs\_repainting=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6658-L6749) [¶](#telegram.Bot.createNewStickerSet "Link to this definition")

Alias for [`create_new_sticker_set()`](#telegram.Bot.create_new_sticker_set "telegram.Bot.create_new_sticker_set")

_async_ create\_chat\_invite\_link( _chat\_id_, _expire\_date=None_, _member\_limit=None_, _name=None_, _creates\_join\_request=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5788-L5862) [¶](#telegram.Bot.create_chat_invite_link "Link to this definition")

Use this method to create an additional invite link for a chat. The bot must be an
administrator in the chat for this to work and must have the appropriate admin rights.
The link can be revoked using the method [`revoke_chat_invite_link()`](#telegram.Bot.revoke_chat_invite_link "telegram.Bot.revoke_chat_invite_link").

Note

When joining _public_ groups via an invite link, Telegram clients may display the
usual “Join” button, effectively ignoring the invite link. In particular, the parameter
[`creates_join_request`](#telegram.Bot.create_chat_invite_link.params.creates_join_request "telegram.Bot.create_chat_invite_link") has no effect in this case.
However, this behavior is undocument and may be subject to change.
See [this GitHub thread](https://github.com/tdlib/telegram-bot-api/issues/429)
for some discussion.

Added in version 13.4.

Parameters:

- [**chat\_id**](#telegram.Bot.create_chat_invite_link.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).

- [**expire\_date**](#telegram.Bot.create_chat_invite_link.params.expire_date) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`datetime.datetime`](https://docs.python.org/3/library/datetime.html#datetime.datetime "(in Python v3.13)"), optional) – Date when the link will
expire. Integer input will be interpreted as Unix timestamp.
For timezone naive [`datetime.datetime`](https://docs.python.org/3/library/datetime.html#datetime.datetime "(in Python v3.13)") objects, the default timezone of the bot will be used, which is UTC unless [`telegram.ext.Defaults.tzinfo`](telegram.ext.defaults.html#telegram.ext.Defaults.tzinfo "telegram.ext.Defaults.tzinfo") is used.

- [**member\_limit**](#telegram.Bot.create_chat_invite_link.params.member_limit) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Maximum number of users that can be members of
the chat simultaneously after joining the chat via this invite link;
[`1`](telegram.constants.html#telegram.constants.ChatInviteLinkLimit.MIN_MEMBER_LIMIT "telegram.constants.ChatInviteLinkLimit.MIN_MEMBER_LIMIT")-
[`99999`](telegram.constants.html#telegram.constants.ChatInviteLinkLimit.MAX_MEMBER_LIMIT "telegram.constants.ChatInviteLinkLimit.MAX_MEMBER_LIMIT").

- [**name**](#telegram.Bot.create_chat_invite_link.params.name) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –

Invite link name;
0- [`32`](telegram.constants.html#telegram.constants.ChatInviteLinkLimit.NAME_LENGTH "telegram.constants.ChatInviteLinkLimit.NAME_LENGTH") characters.

Added in version 13.8.

- [**creates\_join\_request**](#telegram.Bot.create_chat_invite_link.params.creates_join_request) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –

[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if users joining the chat
via the link need to be approved by chat administrators.
If [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), [`member_limit`](#telegram.Bot.create_chat_invite_link.params.member_limit "telegram.Bot.create_chat_invite_link") can’t be specified.



Added in version 13.8.


Keyword Arguments:

- [**read\_timeout**](#telegram.Bot.create_chat_invite_link.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**write\_timeout**](#telegram.Bot.create_chat_invite_link.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**connect\_timeout**](#telegram.Bot.create_chat_invite_link.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**pool\_timeout**](#telegram.Bot.create_chat_invite_link.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**api\_kwargs**](#telegram.Bot.create_chat_invite_link.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.


Returns:

[`telegram.ChatInviteLink`](telegram.chatinvitelink.html#telegram.ChatInviteLink "telegram.ChatInviteLink")

Raises:

[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –

_async_ create\_chat\_subscription\_invite\_link( _chat\_id_, _subscription\_period_, _subscription\_price_, _name=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9537-L9596) [¶](#telegram.Bot.create_chat_subscription_invite_link "Link to this definition")

Use this method to create a [subscription invite link](https://telegram.org/blog/superchannels-star-reactions-subscriptions#star-subscriptions) for a channel chat.
The bot must have the [`can_invite_users`](telegram.chatpermissions.html#telegram.ChatPermissions.can_invite_users "telegram.ChatPermissions.can_invite_users") administrator
right. The link can be edited using the [`edit_chat_subscription_invite_link()`](#telegram.Bot.edit_chat_subscription_invite_link "telegram.Bot.edit_chat_subscription_invite_link") or
revoked using the [`revoke_chat_invite_link()`](#telegram.Bot.revoke_chat_invite_link "telegram.Bot.revoke_chat_invite_link").

Added in version 21.5.

Parameters:

- [**chat\_id**](#telegram.Bot.create_chat_subscription_invite_link.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).

- [**subscription\_period**](#telegram.Bot.create_chat_subscription_invite_link.params.subscription_period) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – The number of seconds the subscription will be
active for before the next payment. Currently, it must always be
[`2592000`](telegram.constants.html#telegram.constants.ChatSubscriptionLimit.SUBSCRIPTION_PERIOD "telegram.constants.ChatSubscriptionLimit.SUBSCRIPTION_PERIOD") (30 days).

- [**subscription\_price**](#telegram.Bot.create_chat_subscription_invite_link.params.subscription_price) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – The number of Telegram Stars a user must pay initially
and after each subsequent subscription period to be a member of the chat;
[`1`](telegram.constants.html#telegram.constants.ChatSubscriptionLimit.MIN_PRICE "telegram.constants.ChatSubscriptionLimit.MIN_PRICE")-
[`2500`](telegram.constants.html#telegram.constants.ChatSubscriptionLimit.MAX_PRICE "telegram.constants.ChatSubscriptionLimit.MAX_PRICE").

- [**name**](#telegram.Bot.create_chat_subscription_invite_link.params.name) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Invite link name;
0- [`32`](telegram.constants.html#telegram.constants.ChatInviteLinkLimit.NAME_LENGTH "telegram.constants.ChatInviteLinkLimit.NAME_LENGTH") characters.

Keyword Arguments:

- [**read\_timeout**](#telegram.Bot.create_chat_subscription_invite_link.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**write\_timeout**](#telegram.Bot.create_chat_subscription_invite_link.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**connect\_timeout**](#telegram.Bot.create_chat_subscription_invite_link.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**pool\_timeout**](#telegram.Bot.create_chat_subscription_invite_link.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**api\_kwargs**](#telegram.Bot.create_chat_subscription_invite_link.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.


Returns:

[`telegram.ChatInviteLink`](telegram.chatinvitelink.html#telegram.ChatInviteLink "telegram.ChatInviteLink")

Raises:

[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –

_async_ create\_forum\_topic( _chat\_id_, _name_, _icon\_color=None_, _icon\_custom\_emoji\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8298-L8356) [¶](#telegram.Bot.create_forum_topic "Link to this definition")

Use this method to create a topic in a forum supergroup chat. The bot must be
an administrator in the chat for this to work and must have
[`can_manage_topics`](telegram.chatadministratorrights.html#telegram.ChatAdministratorRights.params.can_manage_topics "telegram.ChatAdministratorRights") administrator rights.

Added in version 20.0.

Parameters:

- [**chat\_id**](#telegram.Bot.create_forum_topic.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`).

- [**name**](#telegram.Bot.create_forum_topic.params.name) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – New topic name,
[`1`](telegram.constants.html#telegram.constants.ForumTopicLimit.MIN_NAME_LENGTH "telegram.constants.ForumTopicLimit.MIN_NAME_LENGTH")-
[`128`](telegram.constants.html#telegram.constants.ForumTopicLimit.MAX_NAME_LENGTH "telegram.constants.ForumTopicLimit.MAX_NAME_LENGTH") characters.

- [**icon\_color**](#telegram.Bot.create_forum_topic.params.icon_color) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Color of the topic icon in RGB format. Currently,
must be one of [`telegram.constants.ForumIconColor.BLUE`](telegram.constants.html#telegram.constants.ForumIconColor.BLUE "telegram.constants.ForumIconColor.BLUE"),
[`telegram.constants.ForumIconColor.YELLOW`](telegram.constants.html#telegram.constants.ForumIconColor.YELLOW "telegram.constants.ForumIconColor.YELLOW"),
[`telegram.constants.ForumIconColor.PURPLE`](telegram.constants.html#telegram.constants.ForumIconColor.PURPLE "telegram.constants.ForumIconColor.PURPLE"),
[`telegram.constants.ForumIconColor.GREEN`](telegram.constants.html#telegram.constants.ForumIconColor.GREEN "telegram.constants.ForumIconColor.GREEN"),
[`telegram.constants.ForumIconColor.PINK`](telegram.constants.html#telegram.constants.ForumIconColor.PINK "telegram.constants.ForumIconColor.PINK"), or
[`telegram.constants.ForumIconColor.RED`](telegram.constants.html#telegram.constants.ForumIconColor.RED "telegram.constants.ForumIconColor.RED").

- [**icon\_custom\_emoji\_id**](#telegram.Bot.create_forum_topic.params.icon_custom_emoji_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – New unique identifier of the custom emoji
shown as the topic icon. Use [`get_forum_topic_icon_stickers()`](#telegram.Bot.get_forum_topic_icon_stickers "telegram.Bot.get_forum_topic_icon_stickers")
to get all allowed custom emoji identifiers.


Keyword Arguments:

- [**read\_timeout**](#telegram.Bot.create_forum_topic.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**write\_timeout**](#telegram.Bot.create_forum_topic.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**connect\_timeout**](#telegram.Bot.create_forum_topic.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**pool\_timeout**](#telegram.Bot.create_forum_topic.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").

- [**api\_kwargs**](#telegram.Bot.create_forum_topic.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.


Returns:

[`telegram.ForumTopic`](telegram.forumtopic.html#telegram.ForumTopic "telegram.ForumTopic")

Raises:

[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –

_async_ create\_invoice\_link( _title_, _description_, _payload_, _provider\_token_, _currency_, _prices_, _max\_tip\_amount=None_, _suggested\_tip\_amounts=None_, _provider\_data=None_, _photo\_url=None_, _photo\_size=None_, _photo\_width=None_, _photo\_height=None_, _need\_name=None_, _need\_phone\_number=None_, _need\_email=None_, _need\_shipping\_address=None_, _send\_phone\_number\_to\_provider=None_, _send\_email\_to\_provider=None_, _is\_flexible=None_, _subscription\_period=None_, _business\_connection\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8106-L8266) [¶](#telegram.Bot.create_invoice_link "Link to this definition")

Use this method to create a link for an invoice.

Added in version 20.0.

Parameters:

- [**business\_connection\_id**](#telegram.Bot.create_invoice_link.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –

Unique identifier of the business connection on behalf of which the message will be sent.
For payments in [Telegram Stars](https://t.me/BotNews/90) only.



Added in version 21.8.

- [**title**](#telegram.Bot.create_invoice_link.params.title) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Product name. [`1`](telegram.invoice.html#telegram.Invoice.MIN_TITLE_LENGTH "telegram.Invoice.MIN_TITLE_LENGTH")-
[`32`](telegram.invoice.html#telegram.Invoice.MAX_TITLE_LENGTH "telegram.Invoice.MAX_TITLE_LENGTH") characters.

- [**description**](#telegram.Bot.create_invoice_link.params.description) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Product description.
[`1`](telegram.invoice.html#telegram.Invoice.MIN_DESCRIPTION_LENGTH "telegram.Invoice.MIN_DESCRIPTION_LENGTH")-
[`255`](telegram.invoice.html#telegram.Invoice.MAX_DESCRIPTION_LENGTH "telegram.Invoice.MAX_DESCRIPTION_LENGTH") characters.

- [**payload**](#telegram.Bot.create_invoice_link.params.payload) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Bot-defined invoice payload.
[`1`](telegram.invoice.html#telegram.Invoice.MIN_PAYLOAD_LENGTH "telegram.Invoice.MIN_PAYLOAD_LENGTH")-
[`128`](telegram.invoice.html#telegram.Invoice.MAX_PAYLOAD_LENGTH "telegram.Invoice.MAX_PAYLOAD_LENGTH") bytes. This will not be
displayed to the user, use it for your internal processes.

- [**provider\_token**](#telegram.Bot.create_invoice_link.params.provider_token) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) –

Payments provider token, obtained via
[@BotFather](https://t.me/BotFather). Pass an empty string for payments in
[Telegram Stars](https://t.me/BotNews/90).



Deprecated since version 21.3: As of Bot API 7.4, this parameter is now optional and future versions of the
library will make it optional as well.

- [**currency**](#telegram.Bot.create_invoice_link.params.currency) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Three-letter ISO 4217 currency code, see [more on currencies](https://core.telegram.org/bots/payments#supported-currencies). Pass `XTR` for
payments in [Telegram Stars](https://t.me/BotNews/90).

- [**prices**](#telegram.Bot.create_invoice_link.params.prices) (Sequence\[ [`telegram.LabeledPrice`](telegram.labeledprice.html#telegram.LabeledPrice "telegram.LabeledPrice")) –\
\
Price breakdown, a sequence\
of components (e.g. product price, tax, discount, delivery cost, delivery tax,\
bonus, etc.). Must contain exactly one item for payments in [Telegram Stars](https://t.me/BotNews/90).\
\
\
\
Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.\
\
- [**subscription\_period**](#telegram.Bot.create_invoice_link.params.subscription_period) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`datetime.timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta "(in Python v3.13)"), optional) –\
\
The time the\
subscription will be active for before the next payment, either as number of\
seconds or as [`datetime.timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta "(in Python v3.13)") object. The currency must be set to\
`“XTR”` (Telegram Stars) if the parameter is used. Currently, it must always be\
[`2592000`](telegram.constants.html#telegram.constants.InvoiceLimit.SUBSCRIPTION_PERIOD "telegram.constants.InvoiceLimit.SUBSCRIPTION_PERIOD") if specified. Any\
number of subscriptions can be active for a given bot at the same time, including\
multiple concurrent subscriptions from the same user. Subscription price must\
not exceed\
[`2500`](telegram.constants.html#telegram.constants.InvoiceLimit.SUBSCRIPTION_MAX_PRICE "telegram.constants.InvoiceLimit.SUBSCRIPTION_MAX_PRICE")\
Telegram Stars.\
\
\
\
Added in version 21.8.\
\
- [**max\_tip\_amount**](#telegram.Bot.create_invoice_link.params.max_tip_amount) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – The maximum accepted amount for tips in the\
_smallest units_ of the currency (integer, **not** float/double). For example, for\
a maximum tip of `US$ 1.45` pass `max_tip_amount = 145`. See the `exp`\
parameter in [currencies.json](https://core.telegram.org/bots/payments/currencies.json), it shows the number of\
digits past the decimal point for each currency (2 for the majority of currencies).\
Defaults to `0`. Not supported for payments in [Telegram Stars](https://t.me/BotNews/90).\
\
- [**suggested\_tip\_amounts**](#telegram.Bot.create_invoice_link.params.suggested_tip_amounts) (Sequence\[ [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")\], optional) –\
\
An array of\
suggested amounts of tips in the _smallest units_ of the currency (integer, **not**\
float/double). At most [`4`](telegram.invoice.html#telegram.Invoice.MAX_TIP_AMOUNTS "telegram.Invoice.MAX_TIP_AMOUNTS") suggested tip\
amounts can be specified. The suggested tip amounts must be positive, passed in a\
strictly increased order and must not exceed [`max_tip_amount`](#telegram.Bot.create_invoice_link.params.max_tip_amount "telegram.Bot.create_invoice_link").\
\
\
\
Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.\
\
- [**provider\_data**](#telegram.Bot.create_invoice_link.params.provider_data) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)") \| [`object`](https://docs.python.org/3/library/functions.html#object "(in Python v3.13)"), optional) – Data about the\
invoice, which will be shared with the payment provider. A detailed description of\
required fields should be provided by the payment provider. When an object is\
passed, it will be encoded as JSON.\
\
- [**photo\_url**](#telegram.Bot.create_invoice_link.params.photo_url) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – URL of the product photo for the invoice. Can be a\
photo of the goods or a marketing image for a service.\
\
- [**photo\_size**](#telegram.Bot.create_invoice_link.params.photo_size) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Photo size in bytes.\
\
- [**photo\_width**](#telegram.Bot.create_invoice_link.params.photo_width) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Photo width.\
\
- [**photo\_height**](#telegram.Bot.create_invoice_link.params.photo_height) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Photo height.\
\
- [**need\_name**](#telegram.Bot.create_invoice_link.params.need_name) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if you require the user’s full\
name to complete the order. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).\
\
- [**need\_phone\_number**](#telegram.Bot.create_invoice_link.params.need_phone_number) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if you require the user’s\
phone number to complete the order. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).\
\
- [**need\_email**](#telegram.Bot.create_invoice_link.params.need_email) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if you require the user’s email\
address to complete the order. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).\
\
- [**need\_shipping\_address**](#telegram.Bot.create_invoice_link.params.need_shipping_address) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if you require the\
user’s shipping address to complete the order. Ignored for payments in\
[Telegram Stars](https://t.me/BotNews/90).\
\
- [**send\_phone\_number\_to\_provider**](#telegram.Bot.create_invoice_link.params.send_phone_number_to_provider) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if user’s\
phone number should be sent to provider. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).\
\
- [**send\_email\_to\_provider**](#telegram.Bot.create_invoice_link.params.send_email_to_provider) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if user’s email\
address should be sent to provider. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).\
\
- [**is\_flexible**](#telegram.Bot.create_invoice_link.params.is_flexible) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the final price depends on\
the shipping method. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.create_invoice_link.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.create_invoice_link.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.create_invoice_link.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.create_invoice_link.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.create_invoice_link.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the created invoice link is returned.\
\
Return type:\
\
[`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")\
\
_async_ create\_new\_sticker\_set( _user\_id_, _name_, _title_, _stickers_, _sticker\_type=None_, _needs\_repainting=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6658-L6749) [¶](#telegram.Bot.create_new_sticker_set "Link to this definition")\
\
Use this method to create new sticker set owned by a user.\
The bot will be able to edit the created sticker set thus created.\
\
Changed in version 20.0: The parameter `contains_masks` has been removed. Use [`sticker_type`](#telegram.Bot.create_new_sticker_set.params.sticker_type "telegram.Bot.create_new_sticker_set")\
instead.\
\
Changed in version 20.2: Since Bot API 6.6, the parameters [`stickers`](#telegram.Bot.create_new_sticker_set.params.stickers "telegram.Bot.create_new_sticker_set") and [`sticker_format`](#telegram.Bot.create_new_sticker_set.params.sticker_format "telegram.Bot.create_new_sticker_set")\
replace the parameters `png_sticker`, `tgs_sticker`,\`\`webm\_sticker\`\`, `emojis`,\
and `mask_position`.\
\
Changed in version 20.5: Removed the deprecated parameters mentioned above and adjusted the order of the\
parameters.\
\
Removed in version 21.2: Removed the deprecated parameter `sticker_format`.\
\
Parameters:\
\
- [**user\_id**](#telegram.Bot.create_new_sticker_set.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – User identifier of created sticker set owner.\
\
- [**name**](#telegram.Bot.create_new_sticker_set.params.name) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Short name of sticker set, to be used in t.me/addstickers/ URLs\
(e.g., animals). Can contain only english letters, digits and underscores.\
Must begin with a letter, can’t contain consecutive underscores and\
must end in “\_by\_<bot username>”. <bot\_username> is case insensitive.\
[`1`](telegram.constants.html#telegram.constants.StickerLimit.MIN_NAME_AND_TITLE "telegram.constants.StickerLimit.MIN_NAME_AND_TITLE")-\
[`64`](telegram.constants.html#telegram.constants.StickerLimit.MAX_NAME_AND_TITLE "telegram.constants.StickerLimit.MAX_NAME_AND_TITLE") characters.\
\
- [**title**](#telegram.Bot.create_new_sticker_set.params.title) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Sticker set title,\
[`1`](telegram.constants.html#telegram.constants.StickerLimit.MIN_NAME_AND_TITLE "telegram.constants.StickerLimit.MIN_NAME_AND_TITLE")-\
[`64`](telegram.constants.html#telegram.constants.StickerLimit.MAX_NAME_AND_TITLE "telegram.constants.StickerLimit.MAX_NAME_AND_TITLE") characters.\
\
- [**stickers**](#telegram.Bot.create_new_sticker_set.params.stickers) (Sequence\[ [`telegram.InputSticker`](telegram.inputsticker.html#telegram.InputSticker "telegram.InputSticker")\]) –\
\
A sequence of\
[`1`](telegram.constants.html#telegram.constants.StickerSetLimit.MIN_INITIAL_STICKERS "telegram.constants.StickerSetLimit.MIN_INITIAL_STICKERS")-\
[`50`](telegram.constants.html#telegram.constants.StickerSetLimit.MAX_INITIAL_STICKERS "telegram.constants.StickerSetLimit.MAX_INITIAL_STICKERS") initial\
stickers to be added to the sticker set.\
\
\
\
Added in version 20.2.\
\
- [**sticker\_type**](#telegram.Bot.create_new_sticker_set.params.sticker_type) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Type of stickers in the set, pass\
[`telegram.Sticker.REGULAR`](telegram.sticker.html#telegram.Sticker.REGULAR "telegram.Sticker.REGULAR") or [`telegram.Sticker.MASK`](telegram.sticker.html#telegram.Sticker.MASK "telegram.Sticker.MASK"), or\
[`telegram.Sticker.CUSTOM_EMOJI`](telegram.sticker.html#telegram.Sticker.CUSTOM_EMOJI "telegram.Sticker.CUSTOM_EMOJI"). By default, a regular sticker set is created\
\
\
\
Added in version 20.0.\
\
- [**needs\_repainting**](#telegram.Bot.create_new_sticker_set.params.needs_repainting) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") if stickers in the sticker\
set must be repainted to the color of text when used in messages, the accent color\
if used as emoji status, white on chat photos, or another appropriate color based\
on context; for custom emoji sticker sets only.\
\
\
\
Added in version 20.2.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.create_new_sticker_set.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.create_new_sticker_set.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) –\
\
Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). By default, `20` seconds are used as write timeout.\
\
\
\
Deprecated since version 20.7: In future versions, the default value will be changed to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.create_new_sticker_set.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.create_new_sticker_set.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.create_new_sticker_set.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ declineChatJoinRequest( _chat\_id_, _user\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6029-L6068) [¶](#telegram.Bot.declineChatJoinRequest "Link to this definition")\
\
Alias for [`decline_chat_join_request()`](#telegram.Bot.decline_chat_join_request "telegram.Bot.decline_chat_join_request")\
\
_async_ decline\_chat\_join\_request( _chat\_id_, _user\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6029-L6068) [¶](#telegram.Bot.decline_chat_join_request "Link to this definition")\
\
Use this method to decline a chat join request.\
\
The bot must be an administrator in the chat for this to work and must have the\
[`telegram.ChatPermissions.can_invite_users`](telegram.chatpermissions.html#telegram.ChatPermissions.can_invite_users "telegram.ChatPermissions.can_invite_users") administrator right.\
\
Shortcuts\
\
- [`telegram.ChatJoinRequest.decline()`](telegram.chatjoinrequest.html#telegram.ChatJoinRequest.decline "telegram.ChatJoinRequest.decline")\
\
- [`telegram.User.decline_join_request()`](telegram.user.html#telegram.User.decline_join_request "telegram.User.decline_join_request")\
\
\
Added in version 13.8.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.decline_chat_join_request.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**user\_id**](#telegram.Bot.decline_chat_join_request.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Unique identifier of the target user.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.decline_chat_join_request.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.decline_chat_join_request.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.decline_chat_join_request.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.decline_chat_join_request.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.decline_chat_join_request.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ deleteChatPhoto( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6115-L6150) [¶](#telegram.Bot.deleteChatPhoto "Link to this definition")\
\
Alias for [`delete_chat_photo()`](#telegram.Bot.delete_chat_photo "telegram.Bot.delete_chat_photo")\
\
_async_ deleteChatStickerSet( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4882-L4913) [¶](#telegram.Bot.deleteChatStickerSet "Link to this definition")\
\
Alias for [`delete_chat_sticker_set()`](#telegram.Bot.delete_chat_sticker_set "telegram.Bot.delete_chat_sticker_set")\
\
_async_ deleteForumTopic( _chat\_id_, _message\_thread\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8501-L8543) [¶](#telegram.Bot.deleteForumTopic "Link to this definition")\
\
Alias for [`delete_forum_topic()`](#telegram.Bot.delete_forum_topic "telegram.Bot.delete_forum_topic")\
\
_async_ deleteMessage( _chat\_id_, _message\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L1041-L1098) [¶](#telegram.Bot.deleteMessage "Link to this definition")\
\
Alias for [`delete_message()`](#telegram.Bot.delete_message "telegram.Bot.delete_message")\
\
_async_ deleteMessages( _chat\_id_, _message\_ids_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L1099-L1140) [¶](#telegram.Bot.deleteMessages "Link to this definition")\
\
Alias for [`delete_messages()`](#telegram.Bot.delete_messages "telegram.Bot.delete_messages")\
\
_async_ deleteMyCommands( _scope=None_, _language\_code=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7708-L7754) [¶](#telegram.Bot.deleteMyCommands "Link to this definition")\
\
Alias for [`delete_my_commands()`](#telegram.Bot.delete_my_commands "telegram.Bot.delete_my_commands")\
\
_async_ deleteStickerFromSet( _sticker_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6750-L6782) [¶](#telegram.Bot.deleteStickerFromSet "Link to this definition")\
\
Alias for [`delete_sticker_from_set()`](#telegram.Bot.delete_sticker_from_set "telegram.Bot.delete_sticker_from_set")\
\
_async_ deleteStickerSet( _name_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6783-L6818) [¶](#telegram.Bot.deleteStickerSet "Link to this definition")\
\
Alias for [`delete_sticker_set()`](#telegram.Bot.delete_sticker_set "telegram.Bot.delete_sticker_set")\
\
_async_ deleteWebhook( _drop\_pending\_updates=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4622-L4658) [¶](#telegram.Bot.deleteWebhook "Link to this definition")\
\
Alias for [`delete_webhook()`](#telegram.Bot.delete_webhook "telegram.Bot.delete_webhook")\
\
_async_ delete\_chat\_photo( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6115-L6150) [¶](#telegram.Bot.delete_chat_photo "Link to this definition")\
\
Use this method to delete a chat photo. Photos can’t be changed for private chats. The bot\
must be an administrator in the chat for this to work and must have the appropriate admin\
rights.\
\
Parameters:\
\
[**chat\_id**](#telegram.Bot.delete_chat_photo.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.delete_chat_photo.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.delete_chat_photo.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.delete_chat_photo.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.delete_chat_photo.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.delete_chat_photo.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ delete\_chat\_sticker\_set( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4882-L4913) [¶](#telegram.Bot.delete_chat_sticker_set "Link to this definition")\
\
Use this method to delete a group sticker set from a supergroup. The bot must be an\
administrator in the chat for this to work and must have the appropriate admin rights.\
Use the field [`telegram.ChatFullInfo.can_set_sticker_set`](telegram.chatfullinfo.html#telegram.ChatFullInfo.can_set_sticker_set "telegram.ChatFullInfo.can_set_sticker_set") optionally returned in\
[`get_chat()`](#telegram.Bot.get_chat "telegram.Bot.get_chat") requests to check if the bot can use this method.\
\
Parameters:\
\
[**chat\_id**](#telegram.Bot.delete_chat_sticker_set.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`).\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.delete_chat_sticker_set.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.delete_chat_sticker_set.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.delete_chat_sticker_set.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.delete_chat_sticker_set.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.delete_chat_sticker_set.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
_async_ delete\_forum\_topic( _chat\_id_, _message\_thread\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8501-L8543) [¶](#telegram.Bot.delete_forum_topic "Link to this definition")\
\
Use this method to delete a forum topic along with all its messages in a forum supergroup\
chat. The bot must be an administrator in the chat for this to work and must have\
[`can_delete_messages`](telegram.chatadministratorrights.html#telegram.ChatAdministratorRights.params.can_delete_messages "telegram.ChatAdministratorRights") administrator rights.\
\
Shortcuts\
\
[`telegram.Message.delete_forum_topic()`](telegram.message.html#telegram.Message.delete_forum_topic "telegram.Message.delete_forum_topic")\
\
Added in version 20.0.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.delete_forum_topic.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`).\
\
- [**message\_thread\_id**](#telegram.Bot.delete_forum_topic.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Unique identifier for the target message thread of the forum topic.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.delete_forum_topic.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.delete_forum_topic.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.delete_forum_topic.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.delete_forum_topic.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.delete_forum_topic.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ delete\_message( _chat\_id_, _message\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L1041-L1098) [¶](#telegram.Bot.delete_message "Link to this definition")\
\
Use this method to delete a message, including service messages, with the following\
limitations:\
\
- A message can only be deleted if it was sent less than 48 hours ago.\
\
- Service messages about a supergroup, channel, or forum topic creation can’t be deleted.\
\
- A dice message in a private chat can only be deleted if it was sent more than 24\
hours ago.\
\
- Bots can delete outgoing messages in private chats, groups, and supergroups.\
\
- Bots can delete incoming messages in private chats.\
\
- Bots granted [`can_post_messages`](telegram.chatmemberadministrator.html#telegram.ChatMemberAdministrator.can_post_messages "telegram.ChatMemberAdministrator.can_post_messages") permissions\
can delete outgoing messages in channels.\
\
- If the bot is an administrator of a group, it can delete any message there.\
\
- If the bot has [`can_delete_messages`](telegram.chatmemberadministrator.html#telegram.ChatMemberAdministrator.can_delete_messages "telegram.ChatMemberAdministrator.can_delete_messages")\
permission in a supergroup or a channel, it can delete any message there.\
\
\
Shortcuts\
\
- [`telegram.Message.delete()`](telegram.message.html#telegram.Message.delete "telegram.Message.delete")\
\
- [`telegram.User.delete_message()`](telegram.user.html#telegram.User.delete_message "telegram.User.delete_message")\
\
\
See also\
\
[`telegram.CallbackQuery.delete_message()`](telegram.callbackquery.html#telegram.CallbackQuery.delete_message "telegram.CallbackQuery.delete_message") (calls [`delete_message()`](#telegram.Bot.delete_message "telegram.Bot.delete_message")\
indirectly, via [`telegram.Message.delete()`](telegram.message.html#telegram.Message.delete "telegram.Message.delete"))\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.delete_message.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**message\_id**](#telegram.Bot.delete_message.params.message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Identifier of the message to delete.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.delete_message.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.delete_message.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.delete_message.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.delete_message.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.delete_message.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ delete\_messages( _chat\_id_, _message\_ids_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L1099-L1140) [¶](#telegram.Bot.delete_messages "Link to this definition")\
\
Use this method to delete multiple messages simultaneously. If some of the specified\
messages can’t be found, they are skipped.\
\
Shortcuts\
\
[`telegram.User.delete_messages()`](telegram.user.html#telegram.User.delete_messages "telegram.User.delete_messages")\
\
Added in version 20.8.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.delete_messages.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**message\_ids**](#telegram.Bot.delete_messages.params.message_ids) (Sequence\[ [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")\]) – A list of\
[`1`](telegram.constants.html#telegram.constants.BulkRequestLimit.MIN_LIMIT "telegram.constants.BulkRequestLimit.MIN_LIMIT")-\
[`100`](telegram.constants.html#telegram.constants.BulkRequestLimit.MAX_LIMIT "telegram.constants.BulkRequestLimit.MAX_LIMIT") identifiers of messages\
to delete. See [`delete_message()`](#telegram.Bot.delete_message "telegram.Bot.delete_message") for limitations on which messages can be\
deleted.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.delete_messages.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.delete_messages.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.delete_messages.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.delete_messages.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.delete_messages.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ delete\_my\_commands( _scope=None_, _language\_code=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7708-L7754) [¶](#telegram.Bot.delete_my_commands "Link to this definition")\
\
Use this method to delete the list of the bot’s commands for the given scope and user\
language. After deletion,\
[higher level commands](https://core.telegram.org/bots/api#determining-list-of-commands)\
will be shown to affected users.\
\
Added in version 13.7.\
\
See also\
\
[`get_my_commands()`](#telegram.Bot.get_my_commands "telegram.Bot.get_my_commands"), [`set_my_commands()`](#telegram.Bot.set_my_commands "telegram.Bot.set_my_commands")\
\
Parameters:\
\
- [**scope**](#telegram.Bot.delete_my_commands.params.scope) ( [`telegram.BotCommandScope`](telegram.botcommandscope.html#telegram.BotCommandScope "telegram.BotCommandScope"), optional) – An object,\
describing scope of users for which the commands are relevant. Defaults to\
[`telegram.BotCommandScopeDefault`](telegram.botcommandscopedefault.html#telegram.BotCommandScopeDefault "telegram.BotCommandScopeDefault").\
\
- [**language\_code**](#telegram.Bot.delete_my_commands.params.language_code) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – A two-letter ISO 639-1 language code. If empty,\
commands will be applied to all users from the given scope, for whose language\
there are no dedicated commands.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.delete_my_commands.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.delete_my_commands.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.delete_my_commands.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.delete_my_commands.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.delete_my_commands.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ delete\_sticker\_from\_set( _sticker_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6750-L6782) [¶](#telegram.Bot.delete_sticker_from_set "Link to this definition")\
\
Use this method to delete a sticker from a set created by the bot.\
\
Parameters:\
\
[**sticker**](#telegram.Bot.delete_sticker_from_set.params.sticker) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – File identifier of the sticker.\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.delete_sticker_from_set.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.delete_sticker_from_set.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.delete_sticker_from_set.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.delete_sticker_from_set.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.delete_sticker_from_set.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ delete\_sticker\_set( _name_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6783-L6818) [¶](#telegram.Bot.delete_sticker_set "Link to this definition")\
\
Use this method to delete a sticker set that was created by the bot.\
\
Added in version 20.2.\
\
Parameters:\
\
[**name**](#telegram.Bot.delete_sticker_set.params.name) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Sticker set name.\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.delete_sticker_set.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.delete_sticker_set.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.delete_sticker_set.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.delete_sticker_set.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.delete_sticker_set.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ delete\_webhook( _drop\_pending\_updates=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4622-L4658) [¶](#telegram.Bot.delete_webhook "Link to this definition")\
\
Use this method to remove webhook integration if you decide to switch back to\
[`get_updates()`](#telegram.Bot.get_updates "telegram.Bot.get_updates").\
\
Parameters:\
\
[**drop\_pending\_updates**](#telegram.Bot.delete_webhook.params.drop_pending_updates) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") to drop all pending\
updates.\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.delete_webhook.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.delete_webhook.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.delete_webhook.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.delete_webhook.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.delete_webhook.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ do\_api\_request( _endpoint_, _api\_kwargs=None_, _return\_type=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L783-L875) [¶](#telegram.Bot.do_api_request "Link to this definition")\
\
Do a request to the Telegram API.\
\
This method is here to make it easier to use new API methods that are not yet supported\
by this library.\
\
Hint\
\
Since PTB does not know which arguments are passed to this method, some caution is\
necessary in terms of PTBs utility functionalities. In particular\
\
- passing objects of any class defined in the [`telegram`](telegram.html#module-telegram "telegram") module is supported\
\
- when uploading files, a [`telegram.InputFile`](telegram.inputfile.html#telegram.InputFile "telegram.InputFile") must be passed as the value for\
the corresponding argument. Passing a file path or file-like object will not work.\
File paths will work only in combination with [`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot").\
\
- when uploading files, PTB can still correctly determine that\
a special write timeout value should be used instead of the default\
[`telegram.request.HTTPXRequest.write_timeout`](telegram.request.httpxrequest.html#telegram.request.HTTPXRequest.params.write_timeout "telegram.request.HTTPXRequest").\
\
- insertion of default values specified via [`telegram.ext.Defaults`](telegram.ext.defaults.html#telegram.ext.Defaults "telegram.ext.Defaults") will not\
work (only relevant for [`telegram.ext.ExtBot`](telegram.ext.extbot.html#telegram.ext.ExtBot "telegram.ext.ExtBot")).\
\
- The only exception is [`telegram.ext.Defaults.tzinfo`](telegram.ext.defaults.html#telegram.ext.Defaults.tzinfo "telegram.ext.Defaults.tzinfo"), which will be correctly\
applied to [`datetime.datetime`](https://docs.python.org/3/library/datetime.html#datetime.datetime "(in Python v3.13)") objects.\
\
\
Added in version 20.8.\
\
Parameters:\
\
- [**endpoint**](#telegram.Bot.do_api_request.params.endpoint) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – The API endpoint to use, e.g. `getMe` or `get_me`.\
\
- [**api\_kwargs**](#telegram.Bot.do_api_request.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – The keyword arguments to pass to the API call.\
If not specified, no arguments are passed.\
\
- [**return\_type**](#telegram.Bot.do_api_request.params.return_type) ( [`telegram.TelegramObject`](telegram.telegramobject.html#telegram.TelegramObject "telegram.TelegramObject"), optional) – If specified, the result of\
the API call will be deserialized into an instance of this class or tuple of\
instances of this class. If not specified, the raw result of the API call will be\
returned.\
\
\
Returns:\
\
The result of the API call. If [`return_type`](#telegram.Bot.do_api_request.params.return_type "telegram.Bot.do_api_request") is not specified, this is a\
[`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)") or [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), otherwise an instance of [`return_type`](#telegram.Bot.do_api_request.params.return_type "telegram.Bot.do_api_request") or a\
tuple of [`return_type`](#telegram.Bot.do_api_request.params.return_type "telegram.Bot.do_api_request").\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ editChatInviteLink( _chat\_id_, _invite\_link_, _expire\_date=None_, _member\_limit=None_, _name=None_, _creates\_join\_request=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5863-L5941) [¶](#telegram.Bot.editChatInviteLink "Link to this definition")\
\
Alias for [`edit_chat_invite_link()`](#telegram.Bot.edit_chat_invite_link "telegram.Bot.edit_chat_invite_link")\
\
_async_ editChatSubscriptionInviteLink( _chat\_id_, _invite\_link_, _name=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9597-L9649) [¶](#telegram.Bot.editChatSubscriptionInviteLink "Link to this definition")\
\
Alias for [`edit_chat_subscription_invite_link()`](#telegram.Bot.edit_chat_subscription_invite_link "telegram.Bot.edit_chat_subscription_invite_link")\
\
_async_ editForumTopic( _chat\_id_, _message\_thread\_id_, _name=None_, _icon\_custom\_emoji\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8357-L8412) [¶](#telegram.Bot.editForumTopic "Link to this definition")\
\
Alias for [`edit_forum_topic()`](#telegram.Bot.edit_forum_topic "telegram.Bot.edit_forum_topic")\
\
_async_ editGeneralForumTopic( _chat\_id_, _name_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8627-L8669) [¶](#telegram.Bot.editGeneralForumTopic "Link to this definition")\
\
Alias for [`edit_general_forum_topic()`](#telegram.Bot.edit_general_forum_topic "telegram.Bot.edit_general_forum_topic")\
\
_async_ editMessageCaption( _chat\_id=None_, _message\_id=None_, _inline\_message\_id=None_, _caption=None_, _reply\_markup=None_, _parse\_mode=None_, _caption\_entities=None_, _show\_caption\_above\_media=None_, _business\_connection\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4174-L4253) [¶](#telegram.Bot.editMessageCaption "Link to this definition")\
\
Alias for [`edit_message_caption()`](#telegram.Bot.edit_message_caption "telegram.Bot.edit_message_caption")\
\
_async_ editMessageLiveLocation( _chat\_id=None_, _message\_id=None_, _inline\_message\_id=None_, _latitude=None_, _longitude=None_, _reply\_markup=None_, _horizontal\_accuracy=None_, _heading=None_, _proximity\_alert\_radius=None_, _live\_period=None_, _business\_connection\_id=None_, _\*_, _location=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L2840-L2949) [¶](#telegram.Bot.editMessageLiveLocation "Link to this definition")\
\
Alias for [`edit_message_live_location()`](#telegram.Bot.edit_message_live_location "telegram.Bot.edit_message_live_location")\
\
_async_ editMessageMedia( _media_, _chat\_id=None_, _message\_id=None_, _inline\_message\_id=None_, _reply\_markup=None_, _business\_connection\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4254-L4323) [¶](#telegram.Bot.editMessageMedia "Link to this definition")\
\
Alias for [`edit_message_media()`](#telegram.Bot.edit_message_media "telegram.Bot.edit_message_media")\
\
_async_ editMessageReplyMarkup( _chat\_id=None_, _message\_id=None_, _inline\_message\_id=None_, _reply\_markup=None_, _business\_connection\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4324-L4384) [¶](#telegram.Bot.editMessageReplyMarkup "Link to this definition")\
\
Alias for [`edit_message_reply_markup()`](#telegram.Bot.edit_message_reply_markup "telegram.Bot.edit_message_reply_markup")\
\
_async_ editMessageText( _text_, _chat\_id=None_, _message\_id=None_, _inline\_message\_id=None_, _parse\_mode=None_, _reply\_markup=None_, _entities=None_, _link\_preview\_options=None_, _business\_connection\_id=None_, _\*_, _disable\_web\_page\_preview=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4067-L4173) [¶](#telegram.Bot.editMessageText "Link to this definition")\
\
Alias for [`edit_message_text()`](#telegram.Bot.edit_message_text "telegram.Bot.edit_message_text")\
\
_async_ editUserStarSubscription( _user\_id_, _telegram\_payment\_charge\_id_, _is\_canceled_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9382-L9428) [¶](#telegram.Bot.editUserStarSubscription "Link to this definition")\
\
Alias for [`edit_user_star_subscription()`](#telegram.Bot.edit_user_star_subscription "telegram.Bot.edit_user_star_subscription")\
\
_async_ edit\_chat\_invite\_link( _chat\_id_, _invite\_link_, _expire\_date=None_, _member\_limit=None_, _name=None_, _creates\_join\_request=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5863-L5941) [¶](#telegram.Bot.edit_chat_invite_link "Link to this definition")\
\
Use this method to edit a non-primary invite link created by the bot. The bot must be an\
administrator in the chat for this to work and must have the appropriate admin rights.\
\
Note\
\
Though not stated explicitly in the official docs, Telegram changes not only the\
optional parameters that are explicitly passed, but also replaces all other optional\
parameters to the default values. However, since not documented, this behaviour may\
change unbeknown to PTB.\
\
Added in version 13.4.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.edit_chat_invite_link.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**invite\_link**](#telegram.Bot.edit_chat_invite_link.params.invite_link) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)") \| [`telegram.ChatInviteLink`](telegram.chatinvitelink.html#telegram.ChatInviteLink "telegram.ChatInviteLink")) –\
\
The invite link to edit.\
\
\
\
Changed in version 20.0: Now also accepts [`telegram.ChatInviteLink`](telegram.chatinvitelink.html#telegram.ChatInviteLink "telegram.ChatInviteLink") instances.\
\
- [**expire\_date**](#telegram.Bot.edit_chat_invite_link.params.expire_date) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`datetime.datetime`](https://docs.python.org/3/library/datetime.html#datetime.datetime "(in Python v3.13)"), optional) – Date when the link will\
expire.\
For timezone naive [`datetime.datetime`](https://docs.python.org/3/library/datetime.html#datetime.datetime "(in Python v3.13)") objects, the default timezone of the bot will be used, which is UTC unless [`telegram.ext.Defaults.tzinfo`](telegram.ext.defaults.html#telegram.ext.Defaults.tzinfo "telegram.ext.Defaults.tzinfo") is used.\
\
- [**member\_limit**](#telegram.Bot.edit_chat_invite_link.params.member_limit) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Maximum number of users that can be members of\
the chat simultaneously after joining the chat via this invite link;\
[`1`](telegram.constants.html#telegram.constants.ChatInviteLinkLimit.MIN_MEMBER_LIMIT "telegram.constants.ChatInviteLinkLimit.MIN_MEMBER_LIMIT")-\
[`99999`](telegram.constants.html#telegram.constants.ChatInviteLinkLimit.MAX_MEMBER_LIMIT "telegram.constants.ChatInviteLinkLimit.MAX_MEMBER_LIMIT").\
\
- [**name**](#telegram.Bot.edit_chat_invite_link.params.name) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Invite link name;\
0- [`32`](telegram.constants.html#telegram.constants.ChatInviteLinkLimit.NAME_LENGTH "telegram.constants.ChatInviteLinkLimit.NAME_LENGTH") characters.\
\
Added in version 13.8.\
\
- [**creates\_join\_request**](#telegram.Bot.edit_chat_invite_link.params.creates_join_request) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if users joining the chat\
via the link need to be approved by chat administrators.\
If [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), [`member_limit`](#telegram.Bot.edit_chat_invite_link.params.member_limit "telegram.Bot.edit_chat_invite_link") can’t be specified.\
\
\
\
Added in version 13.8.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.edit_chat_invite_link.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.edit_chat_invite_link.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.edit_chat_invite_link.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.edit_chat_invite_link.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.edit_chat_invite_link.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
[`telegram.ChatInviteLink`](telegram.chatinvitelink.html#telegram.ChatInviteLink "telegram.ChatInviteLink")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ edit\_chat\_subscription\_invite\_link( _chat\_id_, _invite\_link_, _name=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9597-L9649) [¶](#telegram.Bot.edit_chat_subscription_invite_link "Link to this definition")\
\
Use this method to edit a subscription invite link created by the bot. The bot must have\
[`telegram.ChatPermissions.can_invite_users`](telegram.chatpermissions.html#telegram.ChatPermissions.can_invite_users "telegram.ChatPermissions.can_invite_users") administrator right.\
\
Added in version 21.5.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.edit_chat_subscription_invite_link.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**invite\_link**](#telegram.Bot.edit_chat_subscription_invite_link.params.invite_link) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)") \| [`telegram.ChatInviteLink`](telegram.chatinvitelink.html#telegram.ChatInviteLink "telegram.ChatInviteLink")) – The invite link to edit.\
\
- [**name**](#telegram.Bot.edit_chat_subscription_invite_link.params.name) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Invite link name;\
0- [`32`](telegram.constants.html#telegram.constants.ChatInviteLinkLimit.NAME_LENGTH "telegram.constants.ChatInviteLinkLimit.NAME_LENGTH") characters.\
\
Tip\
\
Omitting this argument removes the name of the invite link.\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.edit_chat_subscription_invite_link.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.edit_chat_subscription_invite_link.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.edit_chat_subscription_invite_link.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.edit_chat_subscription_invite_link.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.edit_chat_subscription_invite_link.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
[`telegram.ChatInviteLink`](telegram.chatinvitelink.html#telegram.ChatInviteLink "telegram.ChatInviteLink")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ edit\_forum\_topic( _chat\_id_, _message\_thread\_id_, _name=None_, _icon\_custom\_emoji\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8357-L8412) [¶](#telegram.Bot.edit_forum_topic "Link to this definition")\
\
Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must\
be an administrator in the chat for this to work and must have the\
[`can_manage_topics`](telegram.chatadministratorrights.html#telegram.ChatAdministratorRights.params.can_manage_topics "telegram.ChatAdministratorRights") administrator rights,\
unless it is the creator of the topic.\
\
Shortcuts\
\
[`telegram.Message.edit_forum_topic()`](telegram.message.html#telegram.Message.edit_forum_topic "telegram.Message.edit_forum_topic")\
\
Added in version 20.0.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.edit_forum_topic.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`).\
\
- [**message\_thread\_id**](#telegram.Bot.edit_forum_topic.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Unique identifier for the target message thread of the forum topic.\
\
- [**name**](#telegram.Bot.edit_forum_topic.params.name) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – New topic name,\
[`1`](telegram.constants.html#telegram.constants.ForumTopicLimit.MIN_NAME_LENGTH "telegram.constants.ForumTopicLimit.MIN_NAME_LENGTH")-\
[`128`](telegram.constants.html#telegram.constants.ForumTopicLimit.MAX_NAME_LENGTH "telegram.constants.ForumTopicLimit.MAX_NAME_LENGTH") characters. If\
not specified or empty, the current name of the topic will be kept.\
\
- [**icon\_custom\_emoji\_id**](#telegram.Bot.edit_forum_topic.params.icon_custom_emoji_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – New unique identifier of the custom emoji\
shown as the topic icon. Use [`get_forum_topic_icon_stickers()`](#telegram.Bot.get_forum_topic_icon_stickers "telegram.Bot.get_forum_topic_icon_stickers")\
to get all allowed custom emoji identifiers.Pass an empty string to remove the\
icon. If not specified, the current icon will be kept.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.edit_forum_topic.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.edit_forum_topic.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.edit_forum_topic.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.edit_forum_topic.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.edit_forum_topic.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ edit\_general\_forum\_topic( _chat\_id_, _name_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8627-L8669) [¶](#telegram.Bot.edit_general_forum_topic "Link to this definition")\
\
Use this method to edit the name of the ‘General’ topic in a forum supergroup chat. The bot\
must be an administrator in the chat for this to work and must have the\
[`can_manage_topics`](telegram.chatadministratorrights.html#telegram.ChatAdministratorRights.can_manage_topics "telegram.ChatAdministratorRights.can_manage_topics") administrator rights.\
\
Added in version 20.0.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.edit_general_forum_topic.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`).\
\
- [**name**](#telegram.Bot.edit_general_forum_topic.params.name) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – New topic name,\
[`1`](telegram.constants.html#telegram.constants.ForumTopicLimit.MIN_NAME_LENGTH "telegram.constants.ForumTopicLimit.MIN_NAME_LENGTH")-\
[`128`](telegram.constants.html#telegram.constants.ForumTopicLimit.MAX_NAME_LENGTH "telegram.constants.ForumTopicLimit.MAX_NAME_LENGTH") characters.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.edit_general_forum_topic.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.edit_general_forum_topic.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.edit_general_forum_topic.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.edit_general_forum_topic.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.edit_general_forum_topic.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ edit\_message\_caption( _chat\_id=None_, _message\_id=None_, _inline\_message\_id=None_, _caption=None_, _reply\_markup=None_, _parse\_mode=None_, _caption\_entities=None_, _show\_caption\_above\_media=None_, _business\_connection\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4174-L4253) [¶](#telegram.Bot.edit_message_caption "Link to this definition")\
\
Use this method to edit captions of messages.\
\
Note\
\
- It is currently only possible to edit messages without [`telegram.Message.reply_markup`](telegram.message.html#telegram.Message.reply_markup "telegram.Message.reply_markup") or with inline keyboards.\
\
- Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within _48 hours_ from the time they were sent.\
\
\
Shortcuts\
\
- [`telegram.CallbackQuery.edit_message_caption()`](telegram.callbackquery.html#telegram.CallbackQuery.edit_message_caption "telegram.CallbackQuery.edit_message_caption")\
\
- [`telegram.Message.edit_caption()`](telegram.message.html#telegram.Message.edit_caption "telegram.Message.edit_caption")\
\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.edit_message_caption.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Required if inline\_message\_id is not\
specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**message\_id**](#telegram.Bot.edit_message_caption.params.message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Required if inline\_message\_id is not specified.\
Identifier of the message to edit.\
\
- [**inline\_message\_id**](#telegram.Bot.edit_message_caption.params.inline_message_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Required if chat\_id and message\_id are not\
specified. Identifier of the inline message.\
\
- [**caption**](#telegram.Bot.edit_message_caption.params.caption) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – New caption of the message,\
0- [`1024`](telegram.constants.html#telegram.constants.MessageLimit.CAPTION_LENGTH "telegram.constants.MessageLimit.CAPTION_LENGTH") characters after\
entities parsing.\
\
- [**parse\_mode**](#telegram.Bot.edit_message_caption.params.parse_mode) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Mode for parsing entities. See [`telegram.constants.ParseMode`](telegram.constants.html#telegram.constants.ParseMode "telegram.constants.ParseMode") and [formatting options](https://core.telegram.org/bots/api#formatting-options) for more details.\
\
- [**caption\_entities**](#telegram.Bot.edit_message_caption.params.caption_entities) (Sequence\[ [`telegram.MessageEntity`](telegram.messageentity.html#telegram.MessageEntity "telegram.MessageEntity")\], optional) –\
\
Sequence of special entities that appear in the caption, which can be specified instead of `parse_mode`.\
\
\
\
Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.\
\
- [**reply\_markup**](#telegram.Bot.edit_message_caption.params.reply_markup) ( [`telegram.InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup"), optional) – An object for an\
inline keyboard.\
\
- [**show\_caption\_above\_media**](#telegram.Bot.edit_message_caption.params.show_caption_above_media) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the caption must be shown above the message media.\
\
\
\
Added in version 21.3.\
\
- [**business\_connection\_id**](#telegram.Bot.edit_message_caption.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message to be edited was sent\
\
\
\
Added in version 21.4.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.edit_message_caption.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.edit_message_caption.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.edit_message_caption.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.edit_message_caption.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.edit_message_caption.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, if edited message is not an inline message, the\
edited message is returned, otherwise [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ edit\_message\_live\_location( _chat\_id=None_, _message\_id=None_, _inline\_message\_id=None_, _latitude=None_, _longitude=None_, _reply\_markup=None_, _horizontal\_accuracy=None_, _heading=None_, _proximity\_alert\_radius=None_, _live\_period=None_, _business\_connection\_id=None_, _\*_, _location=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L2840-L2949) [¶](#telegram.Bot.edit_message_live_location "Link to this definition")\
\
Use this method to edit live location messages sent by the bot or via the bot\
(for inline bots). A location can be edited until its [`telegram.Location.live_period`](telegram.location.html#telegram.Location.live_period "telegram.Location.live_period")\
expires or editing is explicitly disabled by a call to [`stop_message_live_location()`](#telegram.Bot.stop_message_live_location "telegram.Bot.stop_message_live_location").\
\
Note\
\
You can either supply a [`latitude`](#telegram.Bot.edit_message_live_location.params.latitude "telegram.Bot.edit_message_live_location") and [`longitude`](#telegram.Bot.edit_message_live_location.params.longitude "telegram.Bot.edit_message_live_location") or a\
[`location`](#telegram.Bot.edit_message_live_location.params.location "telegram.Bot.edit_message_live_location").\
\
Shortcuts\
\
- [`telegram.CallbackQuery.edit_message_live_location()`](telegram.callbackquery.html#telegram.CallbackQuery.edit_message_live_location "telegram.CallbackQuery.edit_message_live_location")\
\
- [`telegram.Message.edit_live_location()`](telegram.message.html#telegram.Message.edit_live_location "telegram.Message.edit_live_location")\
\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.edit_message_live_location.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Required if [`inline_message_id`](#telegram.Bot.edit_message_live_location.params.inline_message_id "telegram.Bot.edit_message_live_location")\
is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**message\_id**](#telegram.Bot.edit_message_live_location.params.message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Required if [`inline_message_id`](#telegram.Bot.edit_message_live_location.params.inline_message_id "telegram.Bot.edit_message_live_location") is not\
specified. Identifier of the message to edit.\
\
- [**inline\_message\_id**](#telegram.Bot.edit_message_live_location.params.inline_message_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Required if [`chat_id`](#telegram.Bot.edit_message_live_location.params.chat_id "telegram.Bot.edit_message_live_location") and\
[`message_id`](#telegram.Bot.edit_message_live_location.params.message_id "telegram.Bot.edit_message_live_location") are not specified. Identifier of the inline message.\
\
- [**latitude**](#telegram.Bot.edit_message_live_location.params.latitude) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)"), optional) – Latitude of location.\
\
- [**longitude**](#telegram.Bot.edit_message_live_location.params.longitude) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)"), optional) – Longitude of location.\
\
- [**horizontal\_accuracy**](#telegram.Bot.edit_message_live_location.params.horizontal_accuracy) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)"), optional) – The radius of uncertainty for the\
location, measured in meters;\
0- [`1500`](telegram.constants.html#telegram.constants.LocationLimit.HORIZONTAL_ACCURACY "telegram.constants.LocationLimit.HORIZONTAL_ACCURACY").\
\
- [**heading**](#telegram.Bot.edit_message_live_location.params.heading) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Direction in which the user is moving, in degrees. Must\
be between [`1`](telegram.constants.html#telegram.constants.LocationLimit.MIN_HEADING "telegram.constants.LocationLimit.MIN_HEADING")\
and [`360`](telegram.constants.html#telegram.constants.LocationLimit.MAX_HEADING "telegram.constants.LocationLimit.MAX_HEADING") if specified.\
\
- [**proximity\_alert\_radius**](#telegram.Bot.edit_message_live_location.params.proximity_alert_radius) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Maximum distance for proximity alerts\
about approaching another chat member, in meters. Must be between\
[`1`](telegram.constants.html#telegram.constants.LocationLimit.MIN_PROXIMITY_ALERT_RADIUS "telegram.constants.LocationLimit.MIN_PROXIMITY_ALERT_RADIUS")\
and [`100000`](telegram.constants.html#telegram.constants.LocationLimit.MAX_PROXIMITY_ALERT_RADIUS "telegram.constants.LocationLimit.MAX_PROXIMITY_ALERT_RADIUS")\
if specified.\
\
- [**reply\_markup**](#telegram.Bot.edit_message_live_location.params.reply_markup) ( [`telegram.InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup"), optional) – An object for a new\
inline keyboard.\
\
- [**live\_period**](#telegram.Bot.edit_message_live_location.params.live_period) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
New period in seconds during which the location\
can be updated, starting from the message send date. If\
[`2147483647`](telegram.constants.html#telegram.constants.LocationLimit.LIVE_PERIOD_FOREVER "telegram.constants.LocationLimit.LIVE_PERIOD_FOREVER") is specified,\
then the location can be updated forever. Otherwise, the new value must not exceed\
the current `live_period` by more than a day, and the live location expiration\
date must remain within the next 90 days. If not specified, then `live_period`\
remains unchanged\
\
\
\
Added in version 21.2..\
\
- [**business\_connection\_id**](#telegram.Bot.edit_message_live_location.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message to be edited was sent\
\
\
\
Added in version 21.4.\
\
\
Keyword Arguments:\
\
- [**location**](#telegram.Bot.edit_message_live_location.params.location) ( [`telegram.Location`](telegram.location.html#telegram.Location "telegram.Location"), optional) – The location to send.\
\
- [**read\_timeout**](#telegram.Bot.edit_message_live_location.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.edit_message_live_location.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.edit_message_live_location.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.edit_message_live_location.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.edit_message_live_location.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, if edited message is not an inline message, the\
edited message is returned, otherwise [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
_async_ edit\_message\_media( _media_, _chat\_id=None_, _message\_id=None_, _inline\_message\_id=None_, _reply\_markup=None_, _business\_connection\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4254-L4323) [¶](#telegram.Bot.edit_message_media "Link to this definition")\
\
Use this method to edit animation, audio, document, photo, or video messages, or to add\
media to text messages. If a message\
is part of a message album, then it can be edited only to an audio for audio albums, only\
to a document for document albums and to a photo or a video otherwise. When an inline\
message is edited, a new file can’t be uploaded; use a previously uploaded file via its\
[`file_id`](telegram.file.html#telegram.File.file_id "telegram.File.file_id") or specify a URL.\
\
Note\
\
- It is currently only possible to edit messages without [`telegram.Message.reply_markup`](telegram.message.html#telegram.Message.reply_markup "telegram.Message.reply_markup") or with inline keyboards.\
\
- Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within _48 hours_ from the time they were sent.\
\
\
Shortcuts\
\
- [`telegram.CallbackQuery.edit_message_media()`](telegram.callbackquery.html#telegram.CallbackQuery.edit_message_media "telegram.CallbackQuery.edit_message_media")\
\
- [`telegram.Message.edit_media()`](telegram.message.html#telegram.Message.edit_media "telegram.Message.edit_media")\
\
\
See also\
\
[Working with Files and Media](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Working-with-Files-and-Media)\
\
Parameters:\
\
- [**media**](#telegram.Bot.edit_message_media.params.media) ( [`telegram.InputMedia`](telegram.inputmedia.html#telegram.InputMedia "telegram.InputMedia")) – An object for a new media content\
of the message.\
\
- [**chat\_id**](#telegram.Bot.edit_message_media.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Required if inline\_message\_id is not\
specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**message\_id**](#telegram.Bot.edit_message_media.params.message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Required if inline\_message\_id is not specified.\
Identifier of the message to edit.\
\
- [**inline\_message\_id**](#telegram.Bot.edit_message_media.params.inline_message_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Required if chat\_id and message\_id are not\
specified. Identifier of the inline message.\
\
- [**reply\_markup**](#telegram.Bot.edit_message_media.params.reply_markup) ( [`telegram.InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup"), optional) – An object for an\
inline keyboard.\
\
- [**business\_connection\_id**](#telegram.Bot.edit_message_media.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message to be edited was sent\
\
\
\
Added in version 21.4.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.edit_message_media.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.edit_message_media.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.edit_message_media.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.edit_message_media.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.edit_message_media.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, if edited message is not an inline message, the\
edited Message is returned, otherwise [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ edit\_message\_reply\_markup( _chat\_id=None_, _message\_id=None_, _inline\_message\_id=None_, _reply\_markup=None_, _business\_connection\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4324-L4384) [¶](#telegram.Bot.edit_message_reply_markup "Link to this definition")\
\
Use this method to edit only the reply markup of messages sent by the bot or via the bot\
(for inline bots).\
\
Note\
\
- It is currently only possible to edit messages without [`telegram.Message.reply_markup`](telegram.message.html#telegram.Message.reply_markup "telegram.Message.reply_markup") or with inline keyboards.\
\
- Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within _48 hours_ from the time they were sent.\
\
\
Shortcuts\
\
- [`telegram.CallbackQuery.edit_message_reply_markup()`](telegram.callbackquery.html#telegram.CallbackQuery.edit_message_reply_markup "telegram.CallbackQuery.edit_message_reply_markup")\
\
- [`telegram.Message.edit_reply_markup()`](telegram.message.html#telegram.Message.edit_reply_markup "telegram.Message.edit_reply_markup")\
\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.edit_message_reply_markup.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Required if inline\_message\_id is not\
specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**message\_id**](#telegram.Bot.edit_message_reply_markup.params.message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Required if inline\_message\_id is not specified.\
Identifier of the message to edit.\
\
- [**inline\_message\_id**](#telegram.Bot.edit_message_reply_markup.params.inline_message_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Required if chat\_id and message\_id are not\
specified. Identifier of the inline message.\
\
- [**reply\_markup**](#telegram.Bot.edit_message_reply_markup.params.reply_markup) ( [`telegram.InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup"), optional) – An object for an\
inline keyboard.\
\
- [**business\_connection\_id**](#telegram.Bot.edit_message_reply_markup.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message to be edited was sent\
\
\
\
Added in version 21.4.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.edit_message_reply_markup.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.edit_message_reply_markup.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.edit_message_reply_markup.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.edit_message_reply_markup.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.edit_message_reply_markup.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, if edited message is not an inline message, the\
edited message is returned, otherwise [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ edit\_message\_text( _text_, _chat\_id=None_, _message\_id=None_, _inline\_message\_id=None_, _parse\_mode=None_, _reply\_markup=None_, _entities=None_, _link\_preview\_options=None_, _business\_connection\_id=None_, _\*_, _disable\_web\_page\_preview=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4067-L4173) [¶](#telegram.Bot.edit_message_text "Link to this definition")\
\
Use this method to edit text and game messages.\
\
Note\
\
- It is currently only possible to edit messages without [`telegram.Message.reply_markup`](telegram.message.html#telegram.Message.reply_markup "telegram.Message.reply_markup") or with inline keyboards.\
\
- Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within _48 hours_ from the time they were sent.\
\
\
Shortcuts\
\
- [`telegram.CallbackQuery.edit_message_text()`](telegram.callbackquery.html#telegram.CallbackQuery.edit_message_text "telegram.CallbackQuery.edit_message_text")\
\
- [`telegram.Message.edit_text()`](telegram.message.html#telegram.Message.edit_text "telegram.Message.edit_text")\
\
\
See also\
\
[`telegram.Game.text`](telegram.game.html#telegram.Game.text "telegram.Game.text")\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.edit_message_text.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Required if [`inline_message_id`](#telegram.Bot.edit_message_text.params.inline_message_id "telegram.Bot.edit_message_text")\
is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**message\_id**](#telegram.Bot.edit_message_text.params.message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Required if [`inline_message_id`](#telegram.Bot.edit_message_text.params.inline_message_id "telegram.Bot.edit_message_text") is not\
specified. Identifier of the message to edit.\
\
- [**inline\_message\_id**](#telegram.Bot.edit_message_text.params.inline_message_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Required if [`chat_id`](#telegram.Bot.edit_message_text.params.chat_id "telegram.Bot.edit_message_text") and\
[`message_id`](#telegram.Bot.edit_message_text.params.message_id "telegram.Bot.edit_message_text") are not specified. Identifier of the inline message.\
\
- [**text**](#telegram.Bot.edit_message_text.params.text) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – New text of the message,\
[`1`](telegram.constants.html#telegram.constants.MessageLimit.MIN_TEXT_LENGTH "telegram.constants.MessageLimit.MIN_TEXT_LENGTH")-\
[`4096`](telegram.constants.html#telegram.constants.MessageLimit.MAX_TEXT_LENGTH "telegram.constants.MessageLimit.MAX_TEXT_LENGTH") characters after\
entities parsing.\
\
- [**parse\_mode**](#telegram.Bot.edit_message_text.params.parse_mode) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Mode for parsing entities. See [`telegram.constants.ParseMode`](telegram.constants.html#telegram.constants.ParseMode "telegram.constants.ParseMode") and [formatting options](https://core.telegram.org/bots/api#formatting-options) for more details.\
\
- [**entities**](#telegram.Bot.edit_message_text.params.entities) (Sequence\[ [`telegram.MessageEntity`](telegram.messageentity.html#telegram.MessageEntity "telegram.MessageEntity")\], optional) –\
\
Sequence of special\
entities that appear in message text, which can be specified instead of\
[`parse_mode`](#telegram.Bot.edit_message_text.params.parse_mode "telegram.Bot.edit_message_text").\
\
\
\
Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.\
\
- [**link\_preview\_options**](#telegram.Bot.edit_message_text.params.link_preview_options) ( [`LinkPreviewOptions`](telegram.linkpreviewoptions.html#telegram.LinkPreviewOptions "telegram.LinkPreviewOptions"), optional) –\
\
Link preview generation\
options for the message. Mutually exclusive with\
[`disable_web_page_preview`](#telegram.Bot.edit_message_text.params.disable_web_page_preview "telegram.Bot.edit_message_text").\
\
\
\
Added in version 20.8.\
\
- [**reply\_markup**](#telegram.Bot.edit_message_text.params.reply_markup) ( [`telegram.InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup"), optional) – An object for an\
inline keyboard.\
\
- [**business\_connection\_id**](#telegram.Bot.edit_message_text.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message to be edited was sent\
\
\
\
Added in version 21.4.\
\
\
Keyword Arguments:\
\
- [**disable\_web\_page\_preview**](#telegram.Bot.edit_message_text.params.disable_web_page_preview) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Disables link previews for links in\
this message. Convenience parameter for setting [`link_preview_options`](#telegram.Bot.edit_message_text.params.link_preview_options "telegram.Bot.edit_message_text").\
Mutually exclusive with [`link_preview_options`](#telegram.Bot.edit_message_text.params.link_preview_options "telegram.Bot.edit_message_text").\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`link_preview_options`](#telegram.Bot.edit_message_text.params.link_preview_options "telegram.Bot.edit_message_text") replacing this\
argument. PTB will automatically convert this argument to that one, but\
for advanced options, please use [`link_preview_options`](#telegram.Bot.edit_message_text.params.link_preview_options "telegram.Bot.edit_message_text") directly.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**read\_timeout**](#telegram.Bot.edit_message_text.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.edit_message_text.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.edit_message_text.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.edit_message_text.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.edit_message_text.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, if edited message is not an inline message, the\
edited message is returned, otherwise [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
- [**ValueError**](https://docs.python.org/3/library/exceptions.html#ValueError "(in Python v3.13)") – If both [`disable_web_page_preview`](#telegram.Bot.edit_message_text.params.disable_web_page_preview "telegram.Bot.edit_message_text") and\
[`link_preview_options`](#telegram.Bot.edit_message_text.params.link_preview_options "telegram.Bot.edit_message_text") are passed.\
\
- [**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") – For other errors.\
\
\
_async_ edit\_user\_star\_subscription( _user\_id_, _telegram\_payment\_charge\_id_, _is\_canceled_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9382-L9428) [¶](#telegram.Bot.edit_user_star_subscription "Link to this definition")\
\
Allows the bot to cancel or re-enable extension of a subscription paid in Telegram\
Stars.\
\
Added in version 21.8.\
\
Parameters:\
\
- [**user\_id**](#telegram.Bot.edit_user_star_subscription.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Identifier of the user whose subscription will be edited.\
\
- [**telegram\_payment\_charge\_id**](#telegram.Bot.edit_user_star_subscription.params.telegram_payment_charge_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Telegram payment identifier for the\
subscription.\
\
- [**is\_canceled**](#telegram.Bot.edit_user_star_subscription.params.is_canceled) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") to cancel extension of the user\
subscription; the subscription must be active up to the end of the current\
subscription period. Pass [`False`](https://docs.python.org/3/library/constants.html#False "(in Python v3.13)") to allow the user to re-enable a\
subscription that was previously canceled by the bot.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.edit_user_star_subscription.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.edit_user_star_subscription.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.edit_user_star_subscription.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.edit_user_star_subscription.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.edit_user_star_subscription.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ exportChatInviteLink( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5745-L5787) [¶](#telegram.Bot.exportChatInviteLink "Link to this definition")\
\
Alias for [`export_chat_invite_link()`](#telegram.Bot.export_chat_invite_link "telegram.Bot.export_chat_invite_link")\
\
_async_ export\_chat\_invite\_link( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5745-L5787) [¶](#telegram.Bot.export_chat_invite_link "Link to this definition")\
\
Use this method to generate a new primary invite link for a chat; any previously generated\
link is revoked. The bot must be an administrator in the chat for this to work and must\
have the appropriate admin rights.\
\
Note\
\
Each administrator in a chat generates their own invite links. Bots can’t use invite\
links generated by other administrators. If you want your bot to work with invite\
links, it will need to generate its own link using [`export_chat_invite_link()`](#telegram.Bot.export_chat_invite_link "telegram.Bot.export_chat_invite_link") or\
by calling the [`get_chat()`](#telegram.Bot.get_chat "telegram.Bot.get_chat") method. If your bot needs to generate a new primary\
invite link replacing its previous one, use [`export_chat_invite_link()`](#telegram.Bot.export_chat_invite_link "telegram.Bot.export_chat_invite_link") again.\
\
Parameters:\
\
[**chat\_id**](#telegram.Bot.export_chat_invite_link.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.export_chat_invite_link.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.export_chat_invite_link.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.export_chat_invite_link.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.export_chat_invite_link.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.export_chat_invite_link.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
New invite link on success.\
\
Return type:\
\
[`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_property_ first\_name [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L471-L477) [¶](#telegram.Bot.first_name "Link to this definition")\
\
Bot’s first name. Shortcut for the corresponding attribute of\
[`bot`](#telegram.Bot.bot "telegram.Bot.bot").\
\
Type:\
\
[`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")\
\
_async_ forwardMessage( _chat\_id_, _from\_chat\_id_, _message\_id_, _disable\_notification=None_, _protect\_content=None_, _message\_thread\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L1141-L1205) [¶](#telegram.Bot.forwardMessage "Link to this definition")\
\
Alias for [`forward_message()`](#telegram.Bot.forward_message "telegram.Bot.forward_message")\
\
_async_ forwardMessages( _chat\_id_, _from\_chat\_id_, _message\_ids_, _disable\_notification=None_, _protect\_content=None_, _message\_thread\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L1206-L1267) [¶](#telegram.Bot.forwardMessages "Link to this definition")\
\
Alias for [`forward_messages()`](#telegram.Bot.forward_messages "telegram.Bot.forward_messages")\
\
_async_ forward\_message( _chat\_id_, _from\_chat\_id_, _message\_id_, _disable\_notification=None_, _protect\_content=None_, _message\_thread\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L1141-L1205) [¶](#telegram.Bot.forward_message "Link to this definition")\
\
Use this method to forward messages of any kind. Service messages can’t be forwarded.\
\
Note\
\
Since the release of Bot API 5.5 it can be impossible to forward messages from\
some chats. Use the attributes [`telegram.Message.has_protected_content`](telegram.message.html#telegram.Message.has_protected_content "telegram.Message.has_protected_content") and\
[`telegram.ChatFullInfo.has_protected_content`](telegram.chatfullinfo.html#telegram.ChatFullInfo.has_protected_content "telegram.ChatFullInfo.has_protected_content") to check this.\
\
As a workaround, it is still possible to use [`copy_message()`](#telegram.Bot.copy_message "telegram.Bot.copy_message"). However, this\
behaviour is undocumented and might be changed by Telegram.\
\
Shortcuts\
\
- [`telegram.Message.forward()`](telegram.message.html#telegram.Message.forward "telegram.Message.forward")\
\
- [`telegram.User.forward_from()`](telegram.user.html#telegram.User.forward_from "telegram.User.forward_from")\
\
- [`telegram.User.forward_to()`](telegram.user.html#telegram.User.forward_to "telegram.User.forward_to")\
\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.forward_message.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**from\_chat\_id**](#telegram.Bot.forward_message.params.from_chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the chat where the\
original message was sent (or channel username in the format `@channelusername`).\
\
- [**message\_id**](#telegram.Bot.forward_message.params.message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Message identifier in the chat specified in\
[`from_chat_id`](#telegram.Bot.forward_message.params.from_chat_id "telegram.Bot.forward_message").\
\
- [**disable\_notification**](#telegram.Bot.forward_message.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.\
\
- [**protect\_content**](#telegram.Bot.forward_message.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Protects the contents of the sent message from forwarding and saving.\
\
\
\
Added in version 13.10.\
\
- [**message\_thread\_id**](#telegram.Bot.forward_message.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.\
\
\
\
Added in version 20.0.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.forward_message.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.forward_message.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.forward_message.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.forward_message.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.forward_message.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the sent Message is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ forward\_messages( _chat\_id_, _from\_chat\_id_, _message\_ids_, _disable\_notification=None_, _protect\_content=None_, _message\_thread\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L1206-L1267) [¶](#telegram.Bot.forward_messages "Link to this definition")\
\
Use this method to forward messages of any kind. If some of the specified messages can’t be\
found or forwarded, they are skipped. Service messages and messages with protected content\
can’t be forwarded. Album grouping is kept for forwarded messages.\
\
Shortcuts\
\
- [`telegram.User.forward_messages_from()`](telegram.user.html#telegram.User.forward_messages_from "telegram.User.forward_messages_from")\
\
- [`telegram.User.forward_messages_to()`](telegram.user.html#telegram.User.forward_messages_to "telegram.User.forward_messages_to")\
\
\
Added in version 20.8.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.forward_messages.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**from\_chat\_id**](#telegram.Bot.forward_messages.params.from_chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the chat where the\
original message was sent (or channel username in the format `@channelusername`).\
\
- [**message\_ids**](#telegram.Bot.forward_messages.params.message_ids) (Sequence\[ [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")\]) – A list of\
[`1`](telegram.constants.html#telegram.constants.BulkRequestLimit.MIN_LIMIT "telegram.constants.BulkRequestLimit.MIN_LIMIT")-\
[`100`](telegram.constants.html#telegram.constants.BulkRequestLimit.MAX_LIMIT "telegram.constants.BulkRequestLimit.MAX_LIMIT") identifiers of messages\
in the chat [`from_chat_id`](#telegram.Bot.forward_messages.params.from_chat_id "telegram.Bot.forward_messages") to forward. The identifiers must be specified\
in a strictly increasing order.\
\
- [**disable\_notification**](#telegram.Bot.forward_messages.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.\
\
- [**protect\_content**](#telegram.Bot.forward_messages.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Protects the contents of the sent message from forwarding and saving.\
\
- [**message\_thread\_id**](#telegram.Bot.forward_messages.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.forward_messages.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.forward_messages.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.forward_messages.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.forward_messages.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.forward_messages.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, a tuple of `MessageId` of sent messages\
is returned.\
\
Return type:\
\
tuple\[ [`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\]\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ getAvailableGifts( _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9650-L9680) [¶](#telegram.Bot.getAvailableGifts "Link to this definition")\
\
Alias for [`get_available_gifts()`](#telegram.Bot.get_available_gifts "telegram.Bot.get_available_gifts")\
\
_async_ getBusinessConnection( _business\_connection\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9208-L9246) [¶](#telegram.Bot.getBusinessConnection "Link to this definition")\
\
Alias for [`get_business_connection()`](#telegram.Bot.get_business_connection "telegram.Bot.get_business_connection")\
\
_async_ getChat( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4693-L4733) [¶](#telegram.Bot.getChat "Link to this definition")\
\
Alias for [`get_chat()`](#telegram.Bot.get_chat "telegram.Bot.get_chat")\
\
_async_ getChatAdministrators( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4734-L4774) [¶](#telegram.Bot.getChatAdministrators "Link to this definition")\
\
Alias for [`get_chat_administrators()`](#telegram.Bot.get_chat_administrators "telegram.Bot.get_chat_administrators")\
\
_async_ getChatMember( _chat\_id_, _user\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4810-L4846) [¶](#telegram.Bot.getChatMember "Link to this definition")\
\
Alias for [`get_chat_member()`](#telegram.Bot.get_chat_member "telegram.Bot.get_chat_member")\
\
_async_ getChatMemberCount( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4775-L4809) [¶](#telegram.Bot.getChatMemberCount "Link to this definition")\
\
Alias for [`get_chat_member_count()`](#telegram.Bot.get_chat_member_count "telegram.Bot.get_chat_member_count")\
\
_async_ getChatMenuButton( _chat\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8067-L8105) [¶](#telegram.Bot.getChatMenuButton "Link to this definition")\
\
Alias for [`get_chat_menu_button()`](#telegram.Bot.get_chat_menu_button "telegram.Bot.get_chat_menu_button")\
\
_async_ getCustomEmojiStickers( _custom\_emoji\_ids_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6461-L6503) [¶](#telegram.Bot.getCustomEmojiStickers "Link to this definition")\
\
Alias for [`get_custom_emoji_stickers()`](#telegram.Bot.get_custom_emoji_stickers "telegram.Bot.get_custom_emoji_stickers")\
\
_async_ getFile( _file\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3749-L3813) [¶](#telegram.Bot.getFile "Link to this definition")\
\
Alias for [`get_file()`](#telegram.Bot.get_file "telegram.Bot.get_file")\
\
_async_ getForumTopicIconStickers( _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8267-L8297) [¶](#telegram.Bot.getForumTopicIconStickers "Link to this definition")\
\
Alias for [`get_forum_topic_icon_stickers()`](#telegram.Bot.get_forum_topic_icon_stickers "telegram.Bot.get_forum_topic_icon_stickers")\
\
_async_ getGameHighScores( _user\_id_, _chat\_id=None_, _message\_id=None_, _inline\_message\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5006-L5065) [¶](#telegram.Bot.getGameHighScores "Link to this definition")\
\
Alias for [`get_game_high_scores()`](#telegram.Bot.get_game_high_scores "telegram.Bot.get_game_high_scores")\
\
_async_ getMe( _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L876-L905) [¶](#telegram.Bot.getMe "Link to this definition")\
\
Alias for [`get_me()`](#telegram.Bot.get_me "telegram.Bot.get_me")\
\
_async_ getMyCommands( _scope=None_, _language\_code=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7591-L7643) [¶](#telegram.Bot.getMyCommands "Link to this definition")\
\
Alias for [`get_my_commands()`](#telegram.Bot.get_my_commands "telegram.Bot.get_my_commands")\
\
_async_ getMyDefaultAdministratorRights( _for\_channels=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7504-L7544) [¶](#telegram.Bot.getMyDefaultAdministratorRights "Link to this definition")\
\
Alias for [`get_my_default_administrator_rights()`](#telegram.Bot.get_my_default_administrator_rights "telegram.Bot.get_my_default_administrator_rights")\
\
_async_ getMyDescription( _language\_code=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8918-L8955) [¶](#telegram.Bot.getMyDescription "Link to this definition")\
\
Alias for [`get_my_description()`](#telegram.Bot.get_my_description "telegram.Bot.get_my_description")\
\
_async_ getMyName( _language\_code=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9043-L9080) [¶](#telegram.Bot.getMyName "Link to this definition")\
\
Alias for [`get_my_name()`](#telegram.Bot.get_my_name "telegram.Bot.get_my_name")\
\
_async_ getMyShortDescription( _language\_code=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8956-L8994) [¶](#telegram.Bot.getMyShortDescription "Link to this definition")\
\
Alias for [`get_my_short_description()`](#telegram.Bot.get_my_short_description "telegram.Bot.get_my_short_description")\
\
_async_ getStarTransactions( _offset=None_, _limit=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9338-L9381) [¶](#telegram.Bot.getStarTransactions "Link to this definition")\
\
Alias for [`get_star_transactions()`](#telegram.Bot.get_star_transactions "telegram.Bot.get_star_transactions")\
\
_async_ getStickerSet( _name_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6427-L6460) [¶](#telegram.Bot.getStickerSet "Link to this definition")\
\
Alias for [`get_sticker_set()`](#telegram.Bot.get_sticker_set "telegram.Bot.get_sticker_set")\
\
_async_ getUpdates( _offset=None_, _limit=None_, _timeout=None_, _allowed\_updates=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4385-L4506) [¶](#telegram.Bot.getUpdates "Link to this definition")\
\
Alias for [`get_updates()`](#telegram.Bot.get_updates "telegram.Bot.get_updates")\
\
_async_ getUserChatBoosts( _chat\_id_, _user\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9081-L9122) [¶](#telegram.Bot.getUserChatBoosts "Link to this definition")\
\
Alias for [`get_user_chat_boosts()`](#telegram.Bot.get_user_chat_boosts "telegram.Bot.get_user_chat_boosts")\
\
_async_ getUserProfilePhotos( _user\_id_, _offset=None_, _limit=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3705-L3748) [¶](#telegram.Bot.getUserProfilePhotos "Link to this definition")\
\
Alias for [`get_user_profile_photos()`](#telegram.Bot.get_user_profile_photos "telegram.Bot.get_user_profile_photos")\
\
_async_ getWebhookInfo( _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4914-L4941) [¶](#telegram.Bot.getWebhookInfo "Link to this definition")\
\
Alias for [`get_webhook_info()`](#telegram.Bot.get_webhook_info "telegram.Bot.get_webhook_info")\
\
_async_ get\_available\_gifts( _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9650-L9680) [¶](#telegram.Bot.get_available_gifts "Link to this definition")\
\
Returns the list of gifts that can be sent by the bot to users.\
Requires no parameters.\
\
Added in version 21.8.\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_available_gifts.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_available_gifts.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_available_gifts.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_available_gifts.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_available_gifts.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
[`telegram.Gifts`](telegram.gifts.html#telegram.Gifts "telegram.Gifts")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ get\_business\_connection( _business\_connection\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9208-L9246) [¶](#telegram.Bot.get_business_connection "Link to this definition")\
\
Use this method to get information about the connection of the bot with a business account.\
\
Added in version 21.1.\
\
Parameters:\
\
[**business\_connection\_id**](#telegram.Bot.get_business_connection.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier of the business connection.\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_business_connection.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_business_connection.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_business_connection.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_business_connection.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_business_connection.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the object containing the business\
\
connection information is returned.\
\
Return type:\
\
[`telegram.BusinessConnection`](telegram.businessconnection.html#telegram.BusinessConnection "telegram.BusinessConnection")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ get\_chat( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4693-L4733) [¶](#telegram.Bot.get_chat "Link to this definition")\
\
Use this method to get up to date information about the chat (current name of the user for\
one-on-one conversations, current username of a user, group or channel, etc.).\
\
Changed in version 21.2: In accordance to Bot API 7.3, this method now returns a [`telegram.ChatFullInfo`](telegram.chatfullinfo.html#telegram.ChatFullInfo "telegram.ChatFullInfo").\
\
Parameters:\
\
[**chat\_id**](#telegram.Bot.get_chat.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_chat.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_chat.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_chat.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_chat.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_chat.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
[`telegram.ChatFullInfo`](telegram.chatfullinfo.html#telegram.ChatFullInfo "telegram.ChatFullInfo")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ get\_chat\_administrators( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4734-L4774) [¶](#telegram.Bot.get_chat_administrators "Link to this definition")\
\
Use this method to get a list of administrators in a chat.\
\
Changed in version 20.0: Returns a tuple instead of a list.\
\
Parameters:\
\
[**chat\_id**](#telegram.Bot.get_chat_administrators.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_chat_administrators.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_chat_administrators.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_chat_administrators.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_chat_administrators.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_chat_administrators.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, returns a tuple of `ChatMember`\
objects that contains information about all chat administrators except\
other bots. If the chat is a group or a supergroup and no administrators were\
appointed, only the creator will be returned.\
\
Return type:\
\
tuple\[ [`telegram.ChatMember`](telegram.chatmember.html#telegram.ChatMember "telegram.ChatMember")\]\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ get\_chat\_member( _chat\_id_, _user\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4810-L4846) [¶](#telegram.Bot.get_chat_member "Link to this definition")\
\
Use this method to get information about a member of a chat. The method is only\
guaranteed to work for other users if the bot is an administrator in the chat.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.get_chat_member.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**user\_id**](#telegram.Bot.get_chat_member.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Unique identifier of the target user.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_chat_member.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_chat_member.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_chat_member.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_chat_member.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_chat_member.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
[`telegram.ChatMember`](telegram.chatmember.html#telegram.ChatMember "telegram.ChatMember")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ get\_chat\_member\_count( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4775-L4809) [¶](#telegram.Bot.get_chat_member_count "Link to this definition")\
\
Use this method to get the number of members in a chat.\
\
Added in version 13.7.\
\
Parameters:\
\
[**chat\_id**](#telegram.Bot.get_chat_member_count.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_chat_member_count.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_chat_member_count.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_chat_member_count.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_chat_member_count.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_chat_member_count.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
Number of members in the chat.\
\
Return type:\
\
[`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ get\_chat\_menu\_button( _chat\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8067-L8105) [¶](#telegram.Bot.get_chat_menu_button "Link to this definition")\
\
Use this method to get the current value of the bot’s menu button in a private chat, or\
the default menu button.\
\
Shortcuts\
\
[`telegram.User.get_menu_button()`](telegram.user.html#telegram.User.get_menu_button "telegram.User.get_menu_button")\
\
See also\
\
[`set_chat_menu_button()`](#telegram.Bot.set_chat_menu_button "telegram.Bot.set_chat_menu_button"), [`telegram.Chat.set_menu_button()`](telegram.chat.html#telegram.Chat.set_menu_button "telegram.Chat.set_menu_button"),\
[`telegram.User.set_menu_button()`](telegram.user.html#telegram.User.set_menu_button "telegram.User.set_menu_button")\
\
Added in version 20.0.\
\
Parameters:\
\
[**chat\_id**](#telegram.Bot.get_chat_menu_button.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Unique identifier for the target private chat. If not\
specified, default bot’s menu button will be returned.\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_chat_menu_button.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_chat_menu_button.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_chat_menu_button.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_chat_menu_button.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_chat_menu_button.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the current menu button is returned.\
\
Return type:\
\
[`telegram.MenuButton`](telegram.menubutton.html#telegram.MenuButton "telegram.MenuButton")\
\
_async_ get\_custom\_emoji\_stickers( _custom\_emoji\_ids_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6461-L6503) [¶](#telegram.Bot.get_custom_emoji_stickers "Link to this definition")\
\
Use this method to get information about emoji stickers by their identifiers.\
\
Changed in version 20.0: Returns a tuple instead of a list.\
\
Parameters:\
\
[**custom\_emoji\_ids**](#telegram.Bot.get_custom_emoji_stickers.params.custom_emoji_ids) (Sequence\[ [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")\]) –\
\
Sequence of custom emoji identifiers.\
At most [`200`](telegram.constants.html#telegram.constants.CustomEmojiStickerLimit.CUSTOM_EMOJI_IDENTIFIER_LIMIT "telegram.constants.CustomEmojiStickerLimit.CUSTOM_EMOJI_IDENTIFIER_LIMIT") custom emoji identifiers can be specified.\
\
Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_custom_emoji_stickers.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_custom_emoji_stickers.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_custom_emoji_stickers.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_custom_emoji_stickers.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_custom_emoji_stickers.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
tuple\[ [`telegram.Sticker`](telegram.sticker.html#telegram.Sticker "telegram.Sticker")\]\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ get\_file( _file\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3749-L3813) [¶](#telegram.Bot.get_file "Link to this definition")\
\
Use this method to get basic info about a file and prepare it for downloading. For the\
moment, bots can download files of up to\
[`20 MB`](telegram.constants.html#telegram.constants.FileSizeLimit.FILESIZE_DOWNLOAD "telegram.constants.FileSizeLimit.FILESIZE_DOWNLOAD") in size. The file can then\
be e.g. downloaded with [`telegram.File.download_to_drive()`](telegram.file.html#telegram.File.download_to_drive "telegram.File.download_to_drive"). It is guaranteed that\
the link will be valid for at least 1 hour. When the link expires, a new one can be\
requested by calling get\_file again.\
\
Note\
\
This function may not preserve the original file name and MIME type.\
You should save the file’s MIME type and name (if available) when the File object\
is received.\
\
Shortcuts\
\
- [`telegram.ChatPhoto.get_big_file()`](telegram.chatphoto.html#telegram.ChatPhoto.get_big_file "telegram.ChatPhoto.get_big_file")\
\
- [`telegram.ChatPhoto.get_small_file()`](telegram.chatphoto.html#telegram.ChatPhoto.get_small_file "telegram.ChatPhoto.get_small_file")\
\
\
See also\
\
[Working with Files and Media](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Working-with-Files-and-Media)\
\
Parameters:\
\
[**file\_id**](#telegram.Bot.get_file.params.file_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)") \| [`telegram.Animation`](telegram.animation.html#telegram.Animation "telegram.Animation") \| [`telegram.Audio`](telegram.audio.html#telegram.Audio "telegram.Audio") \| [`telegram.ChatPhoto`](telegram.chatphoto.html#telegram.ChatPhoto "telegram.ChatPhoto") \| [`telegram.Document`](telegram.document.html#telegram.Document "telegram.Document") \| [`telegram.PhotoSize`](telegram.photosize.html#telegram.PhotoSize "telegram.PhotoSize") \| [`telegram.Sticker`](telegram.sticker.html#telegram.Sticker "telegram.Sticker") \| [`telegram.Video`](telegram.video.html#telegram.Video "telegram.Video") \| [`telegram.VideoNote`](telegram.videonote.html#telegram.VideoNote "telegram.VideoNote") \| [`telegram.Voice`](telegram.voice.html#telegram.Voice "telegram.Voice")) – Either the file identifier or an object that has a file\_id attribute\
to get file information about.\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_file.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_file.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_file.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_file.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_file.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
[`telegram.File`](telegram.file.html#telegram.File "telegram.File")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ get\_forum\_topic\_icon\_stickers( _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8267-L8297) [¶](#telegram.Bot.get_forum_topic_icon_stickers "Link to this definition")\
\
Use this method to get custom emoji stickers, which can be used as a forum topic\
icon by any user. Requires no parameters.\
\
Added in version 20.0.\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_forum_topic_icon_stickers.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_forum_topic_icon_stickers.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_forum_topic_icon_stickers.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_forum_topic_icon_stickers.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_forum_topic_icon_stickers.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
tuple\[ [`telegram.Sticker`](telegram.sticker.html#telegram.Sticker "telegram.Sticker")\]\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ get\_game\_high\_scores( _user\_id_, _chat\_id=None_, _message\_id=None_, _inline\_message\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5006-L5065) [¶](#telegram.Bot.get_game_high_scores "Link to this definition")\
\
Use this method to get data for high score tables. Will return the score of the specified\
user and several of their neighbors in a game.\
\
Note\
\
This method will currently return scores for the target user, plus two of their\
closest neighbors on each side. Will also return the top three users if the user and\
his neighbors are not among them. Please note that this behavior is subject to change.\
\
Shortcuts\
\
- [`telegram.CallbackQuery.get_game_high_scores()`](telegram.callbackquery.html#telegram.CallbackQuery.get_game_high_scores "telegram.CallbackQuery.get_game_high_scores")\
\
- [`telegram.Message.get_game_high_scores()`](telegram.message.html#telegram.Message.get_game_high_scores "telegram.Message.get_game_high_scores")\
\
\
Changed in version 20.0: Returns a tuple instead of a list.\
\
Parameters:\
\
- [**user\_id**](#telegram.Bot.get_game_high_scores.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Target user id.\
\
- [**chat\_id**](#telegram.Bot.get_game_high_scores.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Required if [`inline_message_id`](#telegram.Bot.get_game_high_scores.params.inline_message_id "telegram.Bot.get_game_high_scores")\
is not specified. Unique identifier for the target chat.\
\
- [**message\_id**](#telegram.Bot.get_game_high_scores.params.message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Required if [`inline_message_id`](#telegram.Bot.get_game_high_scores.params.inline_message_id "telegram.Bot.get_game_high_scores") is not\
specified. Identifier of the sent message.\
\
- [**inline\_message\_id**](#telegram.Bot.get_game_high_scores.params.inline_message_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Required if [`chat_id`](#telegram.Bot.get_game_high_scores.params.chat_id "telegram.Bot.get_game_high_scores") and\
[`message_id`](#telegram.Bot.get_game_high_scores.params.message_id "telegram.Bot.get_game_high_scores") are not specified. Identifier of the inline message.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_game_high_scores.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_game_high_scores.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_game_high_scores.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_game_high_scores.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_game_high_scores.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
tuple\[ [`telegram.GameHighScore`](telegram.gamehighscore.html#telegram.GameHighScore "telegram.GameHighScore")\]\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ get\_me( _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L876-L905) [¶](#telegram.Bot.get_me "Link to this definition")\
\
A simple method for testing your bot’s auth token. Requires no parameters.\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_me.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_me.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_me.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_me.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_me.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
A [`telegram.User`](telegram.user.html#telegram.User "telegram.User") instance representing that bot if the\
credentials are valid, [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)") otherwise.\
\
Return type:\
\
[`telegram.User`](telegram.user.html#telegram.User "telegram.User")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ get\_my\_commands( _scope=None_, _language\_code=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7591-L7643) [¶](#telegram.Bot.get_my_commands "Link to this definition")\
\
Use this method to get the current list of the bot’s commands for the given scope and user\
language.\
\
See also\
\
[`set_my_commands()`](#telegram.Bot.set_my_commands "telegram.Bot.set_my_commands"), [`delete_my_commands()`](#telegram.Bot.delete_my_commands "telegram.Bot.delete_my_commands")\
\
Changed in version 20.0: Returns a tuple instead of a list.\
\
Parameters:\
\
- [**scope**](#telegram.Bot.get_my_commands.params.scope) ( [`telegram.BotCommandScope`](telegram.botcommandscope.html#telegram.BotCommandScope "telegram.BotCommandScope"), optional) –\
\
An object,\
describing scope of users. Defaults to [`telegram.BotCommandScopeDefault`](telegram.botcommandscopedefault.html#telegram.BotCommandScopeDefault "telegram.BotCommandScopeDefault").\
\
\
\
Added in version 13.7.\
\
- [**language\_code**](#telegram.Bot.get_my_commands.params.language_code) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
A two-letter ISO 639-1 language code or an empty\
string.\
\
\
\
Added in version 13.7.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_my_commands.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_my_commands.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_my_commands.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_my_commands.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_my_commands.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the commands set for the bot. An empty\
tuple is returned if commands are not set.\
\
Return type:\
\
tuple\[ [`telegram.BotCommand`](telegram.botcommand.html#telegram.BotCommand "telegram.BotCommand")\]\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ get\_my\_default\_administrator\_rights( _for\_channels=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7504-L7544) [¶](#telegram.Bot.get_my_default_administrator_rights "Link to this definition")\
\
Use this method to get the current default administrator rights of the bot.\
\
See also\
\
[`set_my_default_administrator_rights()`](#telegram.Bot.set_my_default_administrator_rights "telegram.Bot.set_my_default_administrator_rights")\
\
Added in version 20.0.\
\
Parameters:\
\
[**for\_channels**](#telegram.Bot.get_my_default_administrator_rights.params.for_channels) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") to get default administrator\
rights of the bot in channels. Otherwise, default administrator rights of the bot\
for groups and supergroups will be returned.\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_my_default_administrator_rights.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_my_default_administrator_rights.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_my_default_administrator_rights.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_my_default_administrator_rights.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_my_default_administrator_rights.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success.\
\
Return type:\
\
[`telegram.ChatAdministratorRights`](telegram.chatadministratorrights.html#telegram.ChatAdministratorRights "telegram.ChatAdministratorRights")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ get\_my\_description( _language\_code=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8918-L8955) [¶](#telegram.Bot.get_my_description "Link to this definition")\
\
Use this method to get the current bot description for the given user language.\
\
Parameters:\
\
[**language\_code**](#telegram.Bot.get_my_description.params.language_code) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – A two-letter ISO 639-1 language code or an empty\
string.\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_my_description.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_my_description.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_my_description.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_my_description.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_my_description.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the bot description is returned.\
\
Return type:\
\
[`telegram.BotDescription`](telegram.botdescription.html#telegram.BotDescription "telegram.BotDescription")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ get\_my\_name( _language\_code=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9043-L9080) [¶](#telegram.Bot.get_my_name "Link to this definition")\
\
Use this method to get the current bot name for the given user language.\
\
Parameters:\
\
[**language\_code**](#telegram.Bot.get_my_name.params.language_code) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – A two-letter ISO 639-1 language code or an empty\
string.\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_my_name.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_my_name.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_my_name.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_my_name.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_my_name.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the bot name is returned.\
\
Return type:\
\
[`telegram.BotName`](telegram.botname.html#telegram.BotName "telegram.BotName")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ get\_my\_short\_description( _language\_code=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8956-L8994) [¶](#telegram.Bot.get_my_short_description "Link to this definition")\
\
Use this method to get the current bot short description for the given user language.\
\
Parameters:\
\
[**language\_code**](#telegram.Bot.get_my_short_description.params.language_code) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – A two-letter ISO 639-1 language code or an empty\
string.\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_my_short_description.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_my_short_description.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_my_short_description.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_my_short_description.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_my_short_description.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the bot short description is\
\
returned.\
\
Return type:\
\
[`telegram.BotShortDescription`](telegram.botshortdescription.html#telegram.BotShortDescription "telegram.BotShortDescription")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ get\_star\_transactions( _offset=None_, _limit=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9338-L9381) [¶](#telegram.Bot.get_star_transactions "Link to this definition")\
\
Returns the bot’s Telegram Star transactions in chronological order.\
\
Added in version 21.4.\
\
Parameters:\
\
- [**offset**](#telegram.Bot.get_star_transactions.params.offset) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Number of transactions to skip in the response.\
\
- [**limit**](#telegram.Bot.get_star_transactions.params.limit) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – The maximum number of transactions to be retrieved.\
Values between [`1`](telegram.constants.html#telegram.constants.StarTransactionsLimit.MIN_LIMIT "telegram.constants.StarTransactionsLimit.MIN_LIMIT")-\
[`100`](telegram.constants.html#telegram.constants.StarTransactionsLimit.MAX_LIMIT "telegram.constants.StarTransactionsLimit.MAX_LIMIT") are accepted.\
Defaults to [`100`](telegram.constants.html#telegram.constants.StarTransactionsLimit.MAX_LIMIT "telegram.constants.StarTransactionsLimit.MAX_LIMIT").\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_star_transactions.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_star_transactions.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_star_transactions.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_star_transactions.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_star_transactions.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success.\
\
Return type:\
\
[`telegram.StarTransactions`](telegram.startransactions.html#telegram.StarTransactions "telegram.StarTransactions")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ get\_sticker\_set( _name_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6427-L6460) [¶](#telegram.Bot.get_sticker_set "Link to this definition")\
\
Use this method to get a sticker set.\
\
Parameters:\
\
[**name**](#telegram.Bot.get_sticker_set.params.name) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Name of the sticker set.\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_sticker_set.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_sticker_set.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_sticker_set.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_sticker_set.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_sticker_set.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
[`telegram.StickerSet`](telegram.stickerset.html#telegram.StickerSet "telegram.StickerSet")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ get\_updates( _offset=None_, _limit=None_, _timeout=None_, _allowed\_updates=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4385-L4506) [¶](#telegram.Bot.get_updates "Link to this definition")\
\
Use this method to receive incoming updates using long polling.\
\
Note\
\
1. This method will not work if an outgoing webhook is set up.\
\
2. In order to avoid getting duplicate updates, recalculate offset after each\
server response.\
\
3. To take full advantage of this library take a look at [`telegram.ext.Updater`](telegram.ext.updater.html#telegram.ext.Updater "telegram.ext.Updater")\
\
\
See also\
\
[`telegram.ext.Application.run_polling()`](telegram.ext.application.html#telegram.ext.Application.run_polling "telegram.ext.Application.run_polling"),\
[`telegram.ext.Updater.start_polling()`](telegram.ext.updater.html#telegram.ext.Updater.start_polling "telegram.ext.Updater.start_polling")\
\
Changed in version 20.0: Returns a tuple instead of a list.\
\
Parameters:\
\
- [**offset**](#telegram.Bot.get_updates.params.offset) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Identifier of the first update to be returned. Must be\
greater by one than the highest among the identifiers of previously received\
updates. By default, updates starting with the earliest unconfirmed update are\
returned. An update is considered confirmed as soon as this method is called with\
an offset higher than its [`telegram.Update.update_id`](telegram.update.html#telegram.Update.update_id "telegram.Update.update_id"). The negative offset\
can be specified to retrieve updates starting from -offset update from the end of\
the updates queue. All previous updates will be forgotten.\
\
- [**limit**](#telegram.Bot.get_updates.params.limit) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Limits the number of updates to be retrieved. Values\
between [`1`](telegram.constants.html#telegram.constants.PollingLimit.MIN_LIMIT "telegram.constants.PollingLimit.MIN_LIMIT")-\
[`100`](telegram.constants.html#telegram.constants.PollingLimit.MAX_LIMIT "telegram.constants.PollingLimit.MAX_LIMIT") are accepted.\
Defaults to `100`.\
\
- [**timeout**](#telegram.Bot.get_updates.params.timeout) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Timeout in seconds for long polling. Defaults to `0`,\
i.e. usual short polling. Should be positive, short polling should be used for\
testing purposes only.\
\
- [**allowed\_updates**](#telegram.Bot.get_updates.params.allowed_updates) (Sequence\[ [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")\]), optional) –\
\
A sequence the types of\
updates you want your bot to receive. For example, specify \[“message”,\
“edited\_channel\_post”, “callback\_query”\] to only receive updates of these types.\
See [`telegram.Update`](telegram.update.html#telegram.Update "telegram.Update") for a complete list of available update types.\
Specify an empty sequence to receive all updates except\
[`telegram.Update.chat_member`](telegram.update.html#telegram.Update.chat_member "telegram.Update.chat_member"), [`telegram.Update.message_reaction`](telegram.update.html#telegram.Update.message_reaction "telegram.Update.message_reaction") and\
[`telegram.Update.message_reaction_count`](telegram.update.html#telegram.Update.message_reaction_count "telegram.Update.message_reaction_count") (default). If not specified, the\
previous setting will be used. Please note that this parameter doesn’t affect\
updates created before the call to the get\_updates, so unwanted updates may be\
received for a short period of time.\
\
\
\
Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_updates.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) –\
\
Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
[`timeout`](#telegram.Bot.get_updates.params.timeout "telegram.Bot.get_updates") will be added to this value.\
\
\
\
Changed in version 20.7: Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE") instead of\
`2`.\
\
- [**write\_timeout**](#telegram.Bot.get_updates.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_updates.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_updates.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_updates.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
tuple\[ [`telegram.Update`](telegram.update.html#telegram.Update "telegram.Update")\]\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ get\_user\_chat\_boosts( _chat\_id_, _user\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9081-L9122) [¶](#telegram.Bot.get_user_chat_boosts "Link to this definition")\
\
Use this method to get the list of boosts added to a chat by a user. Requires\
administrator rights in the chat.\
\
Shortcuts\
\
[`telegram.User.get_chat_boosts()`](telegram.user.html#telegram.User.get_chat_boosts "telegram.User.get_chat_boosts")\
\
Added in version 20.8.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.get_user_chat_boosts.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**user\_id**](#telegram.Bot.get_user_chat_boosts.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Unique identifier of the target user.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_user_chat_boosts.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_user_chat_boosts.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_user_chat_boosts.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_user_chat_boosts.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_user_chat_boosts.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the object containing the list of boosts\
\
is returned.\
\
Return type:\
\
[`telegram.UserChatBoosts`](telegram.userchatboosts.html#telegram.UserChatBoosts "telegram.UserChatBoosts")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ get\_user\_profile\_photos( _user\_id_, _offset=None_, _limit=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3705-L3748) [¶](#telegram.Bot.get_user_profile_photos "Link to this definition")\
\
Use this method to get a list of profile pictures for a user.\
\
Shortcuts\
\
[`telegram.User.get_profile_photos()`](telegram.user.html#telegram.User.get_profile_photos "telegram.User.get_profile_photos")\
\
Parameters:\
\
- [**user\_id**](#telegram.Bot.get_user_profile_photos.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Unique identifier of the target user.\
\
- [**offset**](#telegram.Bot.get_user_profile_photos.params.offset) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Sequential number of the first photo to be returned.\
By default, all photos are returned.\
\
- [**limit**](#telegram.Bot.get_user_profile_photos.params.limit) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Limits the number of photos to be retrieved. Values\
between [`1`](telegram.constants.html#telegram.constants.UserProfilePhotosLimit.MIN_LIMIT "telegram.constants.UserProfilePhotosLimit.MIN_LIMIT")-\
[`100`](telegram.constants.html#telegram.constants.UserProfilePhotosLimit.MAX_LIMIT "telegram.constants.UserProfilePhotosLimit.MAX_LIMIT") are accepted.\
Defaults to `100`.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_user_profile_photos.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_user_profile_photos.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_user_profile_photos.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_user_profile_photos.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_user_profile_photos.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
[`telegram.UserProfilePhotos`](telegram.userprofilephotos.html#telegram.UserProfilePhotos "telegram.UserProfilePhotos")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ get\_webhook\_info( _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4914-L4941) [¶](#telegram.Bot.get_webhook_info "Link to this definition")\
\
Use this method to get current webhook status. Requires no parameters.\
\
If the bot is using [`get_updates()`](#telegram.Bot.get_updates "telegram.Bot.get_updates"), will return an object with the\
[`telegram.WebhookInfo.url`](telegram.webhookinfo.html#telegram.WebhookInfo.url "telegram.WebhookInfo.url") field empty.\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.get_webhook_info.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.get_webhook_info.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.get_webhook_info.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.get_webhook_info.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.get_webhook_info.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
[`telegram.WebhookInfo`](telegram.webhookinfo.html#telegram.WebhookInfo "telegram.WebhookInfo")\
\
_async_ hideGeneralForumTopic( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8749-L8788) [¶](#telegram.Bot.hideGeneralForumTopic "Link to this definition")\
\
Alias for [`hide_general_forum_topic()`](#telegram.Bot.hide_general_forum_topic "telegram.Bot.hide_general_forum_topic")\
\
_async_ hide\_general\_forum\_topic( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8749-L8788) [¶](#telegram.Bot.hide_general_forum_topic "Link to this definition")\
\
Use this method to hide the ‘General’ topic in a forum supergroup chat. The bot must\
be an administrator in the chat for this to work and must have\
[`can_manage_topics`](telegram.chatadministratorrights.html#telegram.ChatAdministratorRights.can_manage_topics "telegram.ChatAdministratorRights.can_manage_topics") administrator rights.\
The topic will be automatically closed if it was open.\
\
Added in version 20.0.\
\
Parameters:\
\
[**chat\_id**](#telegram.Bot.hide_general_forum_topic.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`).\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.hide_general_forum_topic.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.hide_general_forum_topic.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.hide_general_forum_topic.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.hide_general_forum_topic.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.hide_general_forum_topic.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_property_ id [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L464-L470) [¶](#telegram.Bot.id "Link to this definition")\
\
Unique identifier for this bot. Shortcut for the corresponding attribute of\
[`bot`](#telegram.Bot.bot "telegram.Bot.bot").\
\
Type:\
\
[`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")\
\
_async_ initialize() [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L746-L767) [¶](#telegram.Bot.initialize "Link to this definition")\
\
Initialize resources used by this class. Currently calls [`get_me()`](#telegram.Bot.get_me "telegram.Bot.get_me") to\
cache [`bot`](#telegram.Bot.bot "telegram.Bot.bot") and calls [`telegram.request.BaseRequest.initialize()`](telegram.request.baserequest.html#telegram.request.BaseRequest.initialize "telegram.request.BaseRequest.initialize") for\
the request objects used by this bot.\
\
See also\
\
[`shutdown()`](#telegram.Bot.shutdown "telegram.Bot.shutdown")\
\
Added in version 20.0.\
\
_property_ last\_name [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L478-L484) [¶](#telegram.Bot.last_name "Link to this definition")\
\
Optional. Bot’s last name. Shortcut for the corresponding attribute of\
[`bot`](#telegram.Bot.bot "telegram.Bot.bot").\
\
Type:\
\
[`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")\
\
_async_ leaveChat( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4659-L4692) [¶](#telegram.Bot.leaveChat "Link to this definition")\
\
Alias for [`leave_chat()`](#telegram.Bot.leave_chat "telegram.Bot.leave_chat")\
\
_async_ leave\_chat( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4659-L4692) [¶](#telegram.Bot.leave_chat "Link to this definition")\
\
Use this method for your bot to leave a group, supergroup or channel.\
\
Parameters:\
\
[**chat\_id**](#telegram.Bot.leave_chat.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.leave_chat.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.leave_chat.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.leave_chat.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.leave_chat.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.leave_chat.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_property_ link [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L492-L496) [¶](#telegram.Bot.link "Link to this definition")\
\
Convenience property. Returns the t.me link of the bot.\
\
Type:\
\
[`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")\
\
_property_ local\_mode [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L417-L424) [¶](#telegram.Bot.local_mode "Link to this definition")\
\
Whether this bot is running in local mode.\
\
Added in version 20.0.\
\
Type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
_async_ logOut( _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7755-L7786) [¶](#telegram.Bot.logOut "Link to this definition")\
\
Alias for [`log_out()`](#telegram.Bot.log_out "telegram.Bot.log_out")\
\
_async_ log\_out( _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7755-L7786) [¶](#telegram.Bot.log_out "Link to this definition")\
\
Use this method to log out from the cloud Bot API server before launching the bot locally.\
You _must_ log out the bot before running it locally, otherwise there is no guarantee that\
the bot will receive updates. After a successful call, you can immediately log in on a\
local server, but will not be able to log in back to the cloud Bot API server for 10\
minutes.\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.log_out.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.log_out.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.log_out.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.log_out.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.log_out.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_property_ name [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L518-L522) [¶](#telegram.Bot.name "Link to this definition")\
\
Bot’s @username. Shortcut for the corresponding attribute of [`bot`](#telegram.Bot.bot "telegram.Bot.bot").\
\
Type:\
\
[`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")\
\
_async_ pinChatMessage( _chat\_id_, _message\_id_, _disable\_notification=None_, _business\_connection\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6282-L6336) [¶](#telegram.Bot.pinChatMessage "Link to this definition")\
\
Alias for [`pin_chat_message()`](#telegram.Bot.pin_chat_message "telegram.Bot.pin_chat_message")\
\
_async_ pin\_chat\_message( _chat\_id_, _message\_id_, _disable\_notification=None_, _business\_connection\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6282-L6336) [¶](#telegram.Bot.pin_chat_message "Link to this definition")\
\
Use this method to add a message to the list of pinned messages in a chat. If the\
chat is not a private chat, the bot must be an administrator in the chat for this to work\
and must have the [`can_pin_messages`](telegram.chatadministratorrights.html#telegram.ChatAdministratorRights.params.can_pin_messages "telegram.ChatAdministratorRights") admin\
right in a supergroup or [`can_edit_messages`](telegram.chatmemberadministrator.html#telegram.ChatMemberAdministrator.can_edit_messages "telegram.ChatMemberAdministrator.can_edit_messages") admin\
right in a channel.\
\
Shortcuts\
\
- [`telegram.Message.pin()`](telegram.message.html#telegram.Message.pin "telegram.Message.pin")\
\
- [`telegram.User.pin_message()`](telegram.user.html#telegram.User.pin_message "telegram.User.pin_message")\
\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.pin_chat_message.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**message\_id**](#telegram.Bot.pin_chat_message.params.message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Identifier of a message to pin.\
\
- [**disable\_notification**](#telegram.Bot.pin_chat_message.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if it is not necessary\
to send a notification to all chat members about the new pinned message.\
Notifications are always disabled in channels and private chats.\
\
- [**business\_connection\_id**](#telegram.Bot.pin_chat_message.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business\
connection on behalf of which the message will be pinned.\
\
\
\
Added in version 21.5.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.pin_chat_message.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.pin_chat_message.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.pin_chat_message.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.pin_chat_message.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.pin_chat_message.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_property_ private\_key [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L428-L435) [¶](#telegram.Bot.private_key "Link to this definition")\
\
Deserialized private key for decryption of telegram passport data.\
\
Added in version 20.0.\
\
_async_ promoteChatMember( _chat\_id_, _user\_id_, _can\_change\_info=None_, _can\_post\_messages=None_, _can\_edit\_messages=None_, _can\_delete\_messages=None_, _can\_invite\_users=None_, _can\_restrict\_members=None_, _can\_pin\_messages=None_, _can\_promote\_members=None_, _is\_anonymous=None_, _can\_manage\_chat=None_, _can\_manage\_video\_chats=None_, _can\_manage\_topics=None_, _can\_post\_stories=None_, _can\_edit\_stories=None_, _can\_delete\_stories=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5520-L5644) [¶](#telegram.Bot.promoteChatMember "Link to this definition")\
\
Alias for [`promote_chat_member()`](#telegram.Bot.promote_chat_member "telegram.Bot.promote_chat_member")\
\
_async_ promote\_chat\_member( _chat\_id_, _user\_id_, _can\_change\_info=None_, _can\_post\_messages=None_, _can\_edit\_messages=None_, _can\_delete\_messages=None_, _can\_invite\_users=None_, _can\_restrict\_members=None_, _can\_pin\_messages=None_, _can\_promote\_members=None_, _is\_anonymous=None_, _can\_manage\_chat=None_, _can\_manage\_video\_chats=None_, _can\_manage\_topics=None_, _can\_post\_stories=None_, _can\_edit\_stories=None_, _can\_delete\_stories=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5520-L5644) [¶](#telegram.Bot.promote_chat_member "Link to this definition")\
\
Use this method to promote or demote a user in a supergroup or a channel. The bot must be\
an administrator in the chat for this to work and must have the appropriate admin rights.\
Pass [`False`](https://docs.python.org/3/library/constants.html#False "(in Python v3.13)") for all boolean parameters to demote a user.\
\
Changed in version 20.0: The argument `can_manage_voice_chats` was renamed to\
[`can_manage_video_chats`](#telegram.Bot.promote_chat_member.params.can_manage_video_chats "telegram.Bot.promote_chat_member") in accordance to Bot API 6.0.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.promote_chat_member.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**user\_id**](#telegram.Bot.promote_chat_member.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Unique identifier of the target user.\
\
- [**is\_anonymous**](#telegram.Bot.promote_chat_member.params.is_anonymous) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the administrator’s presence\
in the chat is hidden.\
\
- [**can\_manage\_chat**](#telegram.Bot.promote_chat_member.params.can_manage_chat) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the administrator can\
access the chat event log, get boost list, see hidden supergroup and channel\
members, report spam messages and ignore slow mode. Implied by any other\
administrator privilege.\
\
\
\
Added in version 13.4.\
\
- [**can\_manage\_video\_chats**](#telegram.Bot.promote_chat_member.params.can_manage_video_chats) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the administrator\
can manage video chats.\
\
\
\
Added in version 20.0.\
\
- [**can\_change\_info**](#telegram.Bot.promote_chat_member.params.can_change_info) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the administrator can\
change chat title, photo and other settings.\
\
- [**can\_post\_messages**](#telegram.Bot.promote_chat_member.params.can_post_messages) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the administrator can\
post messages in the channel, or access channel statistics; for channels only.\
\
- [**can\_edit\_messages**](#telegram.Bot.promote_chat_member.params.can_edit_messages) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the administrator can\
edit messages of other users and can pin messages, for channels only.\
\
- [**can\_delete\_messages**](#telegram.Bot.promote_chat_member.params.can_delete_messages) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the administrator can\
delete messages of other users.\
\
- [**can\_invite\_users**](#telegram.Bot.promote_chat_member.params.can_invite_users) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the administrator can\
invite new users to the chat.\
\
- [**can\_restrict\_members**](#telegram.Bot.promote_chat_member.params.can_restrict_members) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the administrator\
can restrict, ban or unban chat members, or access supergroup statistics.\
\
- [**can\_pin\_messages**](#telegram.Bot.promote_chat_member.params.can_pin_messages) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the administrator can\
pin messages, for supergroups only.\
\
- [**can\_promote\_members**](#telegram.Bot.promote_chat_member.params.can_promote_members) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the administrator can\
add new administrators with a subset of their own privileges or demote\
administrators that they have promoted, directly or indirectly\
(promoted by administrators that were appointed by the user).\
\
- [**can\_manage\_topics**](#telegram.Bot.promote_chat_member.params.can_manage_topics) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the user is\
allowed to create, rename, close, and reopen forum topics; for supergroups only.\
\
\
\
Added in version 20.0.\
\
- [**can\_post\_stories**](#telegram.Bot.promote_chat_member.params.can_post_stories) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the administrator can\
post stories to the chat.\
\
\
\
Added in version 20.6.\
\
- [**can\_edit\_stories**](#telegram.Bot.promote_chat_member.params.can_edit_stories) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the administrator can\
edit stories posted by other users, post stories to the chat page, pin chat\
stories, and access the chat’s story archive\
\
\
\
Added in version 20.6.\
\
- [**can\_delete\_stories**](#telegram.Bot.promote_chat_member.params.can_delete_stories) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the administrator can\
delete stories posted by other users.\
\
\
\
Added in version 20.6.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.promote_chat_member.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.promote_chat_member.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.promote_chat_member.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.promote_chat_member.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.promote_chat_member.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ refundStarPayment( _user\_id_, _telegram\_payment\_charge\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9297-L9337) [¶](#telegram.Bot.refundStarPayment "Link to this definition")\
\
Alias for [`refund_star_payment()`](#telegram.Bot.refund_star_payment "telegram.Bot.refund_star_payment")\
\
_async_ refund\_star\_payment( _user\_id_, _telegram\_payment\_charge\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9297-L9337) [¶](#telegram.Bot.refund_star_payment "Link to this definition")\
\
Refunds a successful payment in [Telegram Stars](https://t.me/BotNews/90).\
\
Shortcuts\
\
[`telegram.User.refund_star_payment()`](telegram.user.html#telegram.User.refund_star_payment "telegram.User.refund_star_payment")\
\
Added in version 21.3.\
\
Parameters:\
\
- [**user\_id**](#telegram.Bot.refund_star_payment.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – User identifier of the user whose payment will be refunded.\
\
- [**telegram\_payment\_charge\_id**](#telegram.Bot.refund_star_payment.params.telegram_payment_charge_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Telegram payment identifier.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.refund_star_payment.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.refund_star_payment.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.refund_star_payment.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.refund_star_payment.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.refund_star_payment.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ reopenForumTopic( _chat\_id_, _message\_thread\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8457-L8500) [¶](#telegram.Bot.reopenForumTopic "Link to this definition")\
\
Alias for [`reopen_forum_topic()`](#telegram.Bot.reopen_forum_topic "telegram.Bot.reopen_forum_topic")\
\
_async_ reopenGeneralForumTopic( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8709-L8748) [¶](#telegram.Bot.reopenGeneralForumTopic "Link to this definition")\
\
Alias for [`reopen_general_forum_topic()`](#telegram.Bot.reopen_general_forum_topic "telegram.Bot.reopen_general_forum_topic")\
\
_async_ reopen\_forum\_topic( _chat\_id_, _message\_thread\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8457-L8500) [¶](#telegram.Bot.reopen_forum_topic "Link to this definition")\
\
Use this method to reopen a closed topic in a forum supergroup chat. The bot must\
be an administrator in the chat for this to work and must have\
[`can_manage_topics`](telegram.chatadministratorrights.html#telegram.ChatAdministratorRights.params.can_manage_topics "telegram.ChatAdministratorRights") administrator rights,\
unless it is the creator of the topic.\
\
Shortcuts\
\
[`telegram.Message.reopen_forum_topic()`](telegram.message.html#telegram.Message.reopen_forum_topic "telegram.Message.reopen_forum_topic")\
\
Added in version 20.0.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.reopen_forum_topic.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`).\
\
- [**message\_thread\_id**](#telegram.Bot.reopen_forum_topic.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Unique identifier for the target message thread of the forum topic.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.reopen_forum_topic.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.reopen_forum_topic.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.reopen_forum_topic.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.reopen_forum_topic.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.reopen_forum_topic.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ reopen\_general\_forum\_topic( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8709-L8748) [¶](#telegram.Bot.reopen_general_forum_topic "Link to this definition")\
\
Use this method to reopen a closed ‘General’ topic in a forum supergroup chat. The bot must\
be an administrator in the chat for this to work and must have\
[`can_manage_topics`](telegram.chatadministratorrights.html#telegram.ChatAdministratorRights.can_manage_topics "telegram.ChatAdministratorRights.can_manage_topics") administrator rights.\
The topic will be automatically unhidden if it was hidden.\
\
Added in version 20.0.\
\
Parameters:\
\
[**chat\_id**](#telegram.Bot.reopen_general_forum_topic.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`).\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.reopen_general_forum_topic.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.reopen_general_forum_topic.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.reopen_general_forum_topic.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.reopen_general_forum_topic.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.reopen_general_forum_topic.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ replaceStickerInSet( _user\_id_, _name_, _old\_sticker_, _sticker_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9247-L9296) [¶](#telegram.Bot.replaceStickerInSet "Link to this definition")\
\
Alias for [`replace_sticker_in_set()`](#telegram.Bot.replace_sticker_in_set "telegram.Bot.replace_sticker_in_set")\
\
_async_ replace\_sticker\_in\_set( _user\_id_, _name_, _old\_sticker_, _sticker_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9247-L9296) [¶](#telegram.Bot.replace_sticker_in_set "Link to this definition")\
\
Use this method to replace an existing sticker in a sticker set with a new one.\
The method is equivalent to calling [`delete_sticker_from_set()`](#telegram.Bot.delete_sticker_from_set "telegram.Bot.delete_sticker_from_set"),\
then [`add_sticker_to_set()`](#telegram.Bot.add_sticker_to_set "telegram.Bot.add_sticker_to_set"), then [`set_sticker_position_in_set()`](#telegram.Bot.set_sticker_position_in_set "telegram.Bot.set_sticker_position_in_set").\
\
Added in version 21.1.\
\
Parameters:\
\
- [**user\_id**](#telegram.Bot.replace_sticker_in_set.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – User identifier of the sticker set owner.\
\
- [**name**](#telegram.Bot.replace_sticker_in_set.params.name) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Sticker set name.\
\
- [**old\_sticker**](#telegram.Bot.replace_sticker_in_set.params.old_sticker) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – File identifier of the replaced sticker.\
\
- [**sticker**](#telegram.Bot.replace_sticker_in_set.params.sticker) ( [`telegram.InputSticker`](telegram.inputsticker.html#telegram.InputSticker "telegram.InputSticker")) – An object with information about the added\
sticker. If exactly the same sticker had already been added to the set, then the\
set remains unchanged.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.replace_sticker_in_set.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.replace_sticker_in_set.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.replace_sticker_in_set.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.replace_sticker_in_set.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.replace_sticker_in_set.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_property_ request [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L436-L445) [¶](#telegram.Bot.request "Link to this definition")\
\
The [`BaseRequest`](telegram.request.baserequest.html#telegram.request.BaseRequest "telegram.request.BaseRequest") object used by this bot.\
\
Warning\
\
Requests to the Bot API are made by the various methods of this class. This attribute\
should _not_ be used manually.\
\
_async_ restrictChatMember( _chat\_id_, _user\_id_, _permissions_, _until\_date=None_, _use\_independent\_chat\_permissions=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5449-L5519) [¶](#telegram.Bot.restrictChatMember "Link to this definition")\
\
Alias for [`restrict_chat_member()`](#telegram.Bot.restrict_chat_member "telegram.Bot.restrict_chat_member")\
\
_async_ restrict\_chat\_member( _chat\_id_, _user\_id_, _permissions_, _until\_date=None_, _use\_independent\_chat\_permissions=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5449-L5519) [¶](#telegram.Bot.restrict_chat_member "Link to this definition")\
\
Use this method to restrict a user in a supergroup. The bot must be an administrator in\
the supergroup for this to work and must have the appropriate admin rights. Pass\
[`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") for all boolean parameters to lift restrictions from a user.\
\
See also\
\
[`telegram.ChatPermissions.all_permissions()`](telegram.chatpermissions.html#telegram.ChatPermissions.all_permissions "telegram.ChatPermissions.all_permissions")\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.restrict_chat_member.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`).\
\
- [**user\_id**](#telegram.Bot.restrict_chat_member.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Unique identifier of the target user.\
\
- [**until\_date**](#telegram.Bot.restrict_chat_member.params.until_date) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`datetime.datetime`](https://docs.python.org/3/library/datetime.html#datetime.datetime "(in Python v3.13)"), optional) – Date when restrictions\
will be lifted for the user, unix time. If user is restricted for more than 366\
days or less than 30 seconds from the current time, they are considered to be\
restricted forever.\
For timezone naive [`datetime.datetime`](https://docs.python.org/3/library/datetime.html#datetime.datetime "(in Python v3.13)") objects, the default timezone of the bot will be used, which is UTC unless [`telegram.ext.Defaults.tzinfo`](telegram.ext.defaults.html#telegram.ext.Defaults.tzinfo "telegram.ext.Defaults.tzinfo") is used.\
\
- [**permissions**](#telegram.Bot.restrict_chat_member.params.permissions) ( [`telegram.ChatPermissions`](telegram.chatpermissions.html#telegram.ChatPermissions "telegram.ChatPermissions")) – An object for new user\
permissions.\
\
- [**use\_independent\_chat\_permissions**](#telegram.Bot.restrict_chat_member.params.use_independent_chat_permissions) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") if chat\
permissions are set independently. Otherwise, the\
[`can_send_other_messages`](telegram.chatpermissions.html#telegram.ChatPermissions.can_send_other_messages "telegram.ChatPermissions.can_send_other_messages") and\
[`can_add_web_page_previews`](telegram.chatpermissions.html#telegram.ChatPermissions.can_add_web_page_previews "telegram.ChatPermissions.can_add_web_page_previews") permissions will imply\
the [`can_send_messages`](telegram.chatpermissions.html#telegram.ChatPermissions.can_send_messages "telegram.ChatPermissions.can_send_messages"),\
[`can_send_audios`](telegram.chatpermissions.html#telegram.ChatPermissions.can_send_audios "telegram.ChatPermissions.can_send_audios"),\
[`can_send_documents`](telegram.chatpermissions.html#telegram.ChatPermissions.can_send_documents "telegram.ChatPermissions.can_send_documents"),\
[`can_send_photos`](telegram.chatpermissions.html#telegram.ChatPermissions.can_send_photos "telegram.ChatPermissions.can_send_photos"),\
[`can_send_videos`](telegram.chatpermissions.html#telegram.ChatPermissions.can_send_videos "telegram.ChatPermissions.can_send_videos"),\
[`can_send_video_notes`](telegram.chatpermissions.html#telegram.ChatPermissions.can_send_video_notes "telegram.ChatPermissions.can_send_video_notes"), and\
[`can_send_voice_notes`](telegram.chatpermissions.html#telegram.ChatPermissions.can_send_voice_notes "telegram.ChatPermissions.can_send_voice_notes") permissions; the\
[`can_send_polls`](telegram.chatpermissions.html#telegram.ChatPermissions.can_send_polls "telegram.ChatPermissions.can_send_polls") permission will imply the\
[`can_send_messages`](telegram.chatpermissions.html#telegram.ChatPermissions.can_send_messages "telegram.ChatPermissions.can_send_messages") permission.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.restrict_chat_member.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.restrict_chat_member.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.restrict_chat_member.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.restrict_chat_member.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.restrict_chat_member.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ revokeChatInviteLink( _chat\_id_, _invite\_link_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5942-L5988) [¶](#telegram.Bot.revokeChatInviteLink "Link to this definition")\
\
Alias for [`revoke_chat_invite_link()`](#telegram.Bot.revoke_chat_invite_link "telegram.Bot.revoke_chat_invite_link")\
\
_async_ revoke\_chat\_invite\_link( _chat\_id_, _invite\_link_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5942-L5988) [¶](#telegram.Bot.revoke_chat_invite_link "Link to this definition")\
\
Use this method to revoke an invite link created by the bot. If the primary link is\
revoked, a new link is automatically generated. The bot must be an administrator in the\
chat for this to work and must have the appropriate admin rights.\
\
Added in version 13.4.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.revoke_chat_invite_link.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**invite\_link**](#telegram.Bot.revoke_chat_invite_link.params.invite_link) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)") \| [`telegram.ChatInviteLink`](telegram.chatinvitelink.html#telegram.ChatInviteLink "telegram.ChatInviteLink")) –\
\
The invite link to revoke.\
\
\
\
Changed in version 20.0: Now also accepts [`telegram.ChatInviteLink`](telegram.chatinvitelink.html#telegram.ChatInviteLink "telegram.ChatInviteLink") instances.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.revoke_chat_invite_link.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.revoke_chat_invite_link.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.revoke_chat_invite_link.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.revoke_chat_invite_link.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.revoke_chat_invite_link.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
[`telegram.ChatInviteLink`](telegram.chatinvitelink.html#telegram.ChatInviteLink "telegram.ChatInviteLink")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ savePreparedInlineMessage( _user\_id_, _result_, _allow\_user\_chats=None_, _allow\_bot\_chats=None_, _allow\_group\_chats=None_, _allow\_channel\_chats=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3646-L3704) [¶](#telegram.Bot.savePreparedInlineMessage "Link to this definition")\
\
Alias for [`save_prepared_inline_message()`](#telegram.Bot.save_prepared_inline_message "telegram.Bot.save_prepared_inline_message")\
\
_async_ save\_prepared\_inline\_message( _user\_id_, _result_, _allow\_user\_chats=None_, _allow\_bot\_chats=None_, _allow\_group\_chats=None_, _allow\_channel\_chats=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3646-L3704) [¶](#telegram.Bot.save_prepared_inline_message "Link to this definition")\
\
Stores a message that can be sent by a user of a Mini App.\
\
Added in version 21.8.\
\
Parameters:\
\
- [**user\_id**](#telegram.Bot.save_prepared_inline_message.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Unique identifier of the target user that can use the prepared\
message.\
\
- [**result**](#telegram.Bot.save_prepared_inline_message.params.result) ( [`telegram.InlineQueryResult`](telegram.inlinequeryresult.html#telegram.InlineQueryResult "telegram.InlineQueryResult")) – The result to store.\
\
- [**allow\_user\_chats**](#telegram.Bot.save_prepared_inline_message.params.allow_user_chats) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") if the message can be sent\
to private chats with users\
\
- [**allow\_bot\_chats**](#telegram.Bot.save_prepared_inline_message.params.allow_bot_chats) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") if the message can be sent\
to private chats with bots\
\
- [**allow\_group\_chats**](#telegram.Bot.save_prepared_inline_message.params.allow_group_chats) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") if the message can be sent\
to group and supergroup chats\
\
- [**allow\_channel\_chats**](#telegram.Bot.save_prepared_inline_message.params.allow_channel_chats) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") if the message can be\
sent to channels\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.save_prepared_inline_message.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.save_prepared_inline_message.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.save_prepared_inline_message.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.save_prepared_inline_message.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.save_prepared_inline_message.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the prepared message is returned.\
\
Return type:\
\
[`telegram.PreparedInlineMessage`](telegram.preparedinlinemessage.html#telegram.PreparedInlineMessage "telegram.PreparedInlineMessage")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ sendAnimation( _chat\_id_, _animation_, _duration=None_, _width=None_, _height=None_, _caption=None_, _parse\_mode=None_, _disable\_notification=None_, _reply\_markup=None_, _caption\_entities=None_, _protect\_content=None_, _message\_thread\_id=None_, _has\_spoiler=None_, _thumbnail=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _show\_caption\_above\_media=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _filename=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L2187-L2357) [¶](#telegram.Bot.sendAnimation "Link to this definition")\
\
Alias for [`send_animation()`](#telegram.Bot.send_animation "telegram.Bot.send_animation")\
\
_async_ sendAudio( _chat\_id_, _audio_, _duration=None_, _performer=None_, _title=None_, _caption=None_, _disable\_notification=None_, _reply\_markup=None_, _parse\_mode=None_, _caption\_entities=None_, _protect\_content=None_, _message\_thread\_id=None_, _thumbnail=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _filename=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L1420-L1581) [¶](#telegram.Bot.sendAudio "Link to this definition")\
\
Alias for [`send_audio()`](#telegram.Bot.send_audio "telegram.Bot.send_audio")\
\
_async_ sendChatAction( _chat\_id_, _action_, _message\_thread\_id=None_, _business\_connection\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3401-L3454) [¶](#telegram.Bot.sendChatAction "Link to this definition")\
\
Alias for [`send_chat_action()`](#telegram.Bot.send_chat_action "telegram.Bot.send_chat_action")\
\
_async_ sendContact( _chat\_id_, _phone\_number=None_, _first\_name=None_, _last\_name=None_, _disable\_notification=None_, _reply\_markup=None_, _vcard=None_, _protect\_content=None_, _message\_thread\_id=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _contact=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3163-L3300) [¶](#telegram.Bot.sendContact "Link to this definition")\
\
Alias for [`send_contact()`](#telegram.Bot.send_contact "telegram.Bot.send_contact")\
\
_async_ sendDice( _chat\_id_, _disable\_notification=None_, _reply\_markup=None_, _emoji=None_, _protect\_content=None_, _message\_thread\_id=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7389-L7503) [¶](#telegram.Bot.sendDice "Link to this definition")\
\
Alias for [`send_dice()`](#telegram.Bot.send_dice "telegram.Bot.send_dice")\
\
_async_ sendDocument( _chat\_id_, _document_, _caption=None_, _disable\_notification=None_, _reply\_markup=None_, _parse\_mode=None_, _disable\_content\_type\_detection=None_, _caption\_entities=None_, _protect\_content=None_, _message\_thread\_id=None_, _thumbnail=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _filename=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L1582-L1736) [¶](#telegram.Bot.sendDocument "Link to this definition")\
\
Alias for [`send_document()`](#telegram.Bot.send_document "telegram.Bot.send_document")\
\
_async_ sendGame( _chat\_id_, _game\_short\_name_, _disable\_notification=None_, _reply\_markup=None_, _protect\_content=None_, _message\_thread\_id=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3301-L3400) [¶](#telegram.Bot.sendGame "Link to this definition")\
\
Alias for [`send_game()`](#telegram.Bot.send_game "telegram.Bot.send_game")\
\
_async_ sendGift( _user\_id_, _gift\_id_, _text=None_, _text\_parse\_mode=None_, _text\_entities=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9681-L9742) [¶](#telegram.Bot.sendGift "Link to this definition")\
\
Alias for [`send_gift()`](#telegram.Bot.send_gift "telegram.Bot.send_gift")\
\
_async_ sendInvoice( _chat\_id_, _title_, _description_, _payload_, _provider\_token_, _currency_, _prices_, _start\_parameter=None_, _photo\_url=None_, _photo\_size=None_, _photo\_width=None_, _photo\_height=None_, _need\_name=None_, _need\_phone\_number=None_, _need\_email=None_, _need\_shipping\_address=None_, _is\_flexible=None_, _disable\_notification=None_, _reply\_markup=None_, _provider\_data=None_, _send\_phone\_number\_to\_provider=None_, _send\_email\_to\_provider=None_, _max\_tip\_amount=None_, _suggested\_tip\_amounts=None_, _protect\_content=None_, _message\_thread\_id=None_, _reply\_parameters=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5066-L5288) [¶](#telegram.Bot.sendInvoice "Link to this definition")\
\
Alias for [`send_invoice()`](#telegram.Bot.send_invoice "telegram.Bot.send_invoice")\
\
_async_ sendLocation( _chat\_id_, _latitude=None_, _longitude=None_, _disable\_notification=None_, _reply\_markup=None_, _live\_period=None_, _horizontal\_accuracy=None_, _heading=None_, _proximity\_alert\_radius=None_, _protect\_content=None_, _message\_thread\_id=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _location=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L2688-L2839) [¶](#telegram.Bot.sendLocation "Link to this definition")\
\
Alias for [`send_location()`](#telegram.Bot.send_location "telegram.Bot.send_location")\
\
_async_ sendMediaGroup( _chat\_id_, _media_, _disable\_notification=None_, _protect\_content=None_, _message\_thread\_id=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_, _caption=None_, _parse\_mode=None_, _caption\_entities=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L2510-L2687) [¶](#telegram.Bot.sendMediaGroup "Link to this definition")\
\
Alias for [`send_media_group()`](#telegram.Bot.send_media_group "telegram.Bot.send_media_group")\
\
_async_ sendMessage( _chat\_id_, _text_, _parse\_mode=None_, _entities=None_, _disable\_notification=None_, _protect\_content=None_, _reply\_markup=None_, _message\_thread\_id=None_, _link\_preview\_options=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _disable\_web\_page\_preview=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L906-L1040) [¶](#telegram.Bot.sendMessage "Link to this definition")\
\
Alias for [`send_message()`](#telegram.Bot.send_message "telegram.Bot.send_message")\
\
_async_ sendPaidMedia( _chat\_id_, _star\_count_, _media_, _caption=None_, _parse\_mode=None_, _caption\_entities=None_, _show\_caption\_above\_media=None_, _disable\_notification=None_, _protect\_content=None_, _reply\_parameters=None_, _reply\_markup=None_, _business\_connection\_id=None_, _payload=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9429-L9536) [¶](#telegram.Bot.sendPaidMedia "Link to this definition")\
\
Alias for [`send_paid_media()`](#telegram.Bot.send_paid_media "telegram.Bot.send_paid_media")\
\
_async_ sendPhoto( _chat\_id_, _photo_, _caption=None_, _disable\_notification=None_, _reply\_markup=None_, _parse\_mode=None_, _caption\_entities=None_, _protect\_content=None_, _message\_thread\_id=None_, _has\_spoiler=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _show\_caption\_above\_media=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _filename=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L1268-L1419) [¶](#telegram.Bot.sendPhoto "Link to this definition")\
\
Alias for [`send_photo()`](#telegram.Bot.send_photo "telegram.Bot.send_photo")\
\
_async_ sendPoll( _chat\_id_, _question_, _options_, _is\_anonymous=None_, _type=None_, _allows\_multiple\_answers=None_, _correct\_option\_id=None_, _is\_closed=None_, _disable\_notification=None_, _reply\_markup=None_, _explanation=None_, _explanation\_parse\_mode=None_, _open\_period=None_, _close\_date=None_, _explanation\_entities=None_, _protect\_content=None_, _message\_thread\_id=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _question\_parse\_mode=None_, _question\_entities=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7147-L7338) [¶](#telegram.Bot.sendPoll "Link to this definition")\
\
Alias for [`send_poll()`](#telegram.Bot.send_poll "telegram.Bot.send_poll")\
\
_async_ sendSticker( _chat\_id_, _sticker_, _disable\_notification=None_, _reply\_markup=None_, _protect\_content=None_, _message\_thread\_id=None_, _emoji=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L1737-L1859) [¶](#telegram.Bot.sendSticker "Link to this definition")\
\
Alias for [`send_sticker()`](#telegram.Bot.send_sticker "telegram.Bot.send_sticker")\
\
_async_ sendVenue( _chat\_id_, _latitude=None_, _longitude=None_, _title=None_, _address=None_, _foursquare\_id=None_, _disable\_notification=None_, _reply\_markup=None_, _foursquare\_type=None_, _google\_place\_id=None_, _google\_place\_type=None_, _protect\_content=None_, _message\_thread\_id=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _venue=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3002-L3162) [¶](#telegram.Bot.sendVenue "Link to this definition")\
\
Alias for [`send_venue()`](#telegram.Bot.send_venue "telegram.Bot.send_venue")\
\
_async_ sendVideo( _chat\_id_, _video_, _duration=None_, _caption=None_, _disable\_notification=None_, _reply\_markup=None_, _width=None_, _height=None_, _parse\_mode=None_, _supports\_streaming=None_, _caption\_entities=None_, _protect\_content=None_, _message\_thread\_id=None_, _has\_spoiler=None_, _thumbnail=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _show\_caption\_above\_media=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _filename=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L1860-L2038) [¶](#telegram.Bot.sendVideo "Link to this definition")\
\
Alias for [`send_video()`](#telegram.Bot.send_video "telegram.Bot.send_video")\
\
_async_ sendVideoNote( _chat\_id_, _video\_note_, _duration=None_, _length=None_, _disable\_notification=None_, _reply\_markup=None_, _protect\_content=None_, _message\_thread\_id=None_, _thumbnail=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _filename=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L2039-L2186) [¶](#telegram.Bot.sendVideoNote "Link to this definition")\
\
Alias for [`send_video_note()`](#telegram.Bot.send_video_note "telegram.Bot.send_video_note")\
\
_async_ sendVoice( _chat\_id_, _voice_, _duration=None_, _caption=None_, _disable\_notification=None_, _reply\_markup=None_, _parse\_mode=None_, _caption\_entities=None_, _protect\_content=None_, _message\_thread\_id=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _filename=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L2358-L2509) [¶](#telegram.Bot.sendVoice "Link to this definition")\
\
Alias for [`send_voice()`](#telegram.Bot.send_voice "telegram.Bot.send_voice")\
\
_async_ send\_animation( _chat\_id_, _animation_, _duration=None_, _width=None_, _height=None_, _caption=None_, _parse\_mode=None_, _disable\_notification=None_, _reply\_markup=None_, _caption\_entities=None_, _protect\_content=None_, _message\_thread\_id=None_, _has\_spoiler=None_, _thumbnail=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _show\_caption\_above\_media=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _filename=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L2187-L2357) [¶](#telegram.Bot.send_animation "Link to this definition")\
\
Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound).\
Bots can currently send animation files of up to\
[`50 MB`](telegram.constants.html#telegram.constants.FileSizeLimit.FILESIZE_UPLOAD "telegram.constants.FileSizeLimit.FILESIZE_UPLOAD") in size, this limit may be\
changed in the future.\
\
Note\
\
[`thumbnail`](#telegram.Bot.send_animation.params.thumbnail "telegram.Bot.send_animation") will be ignored for small files, for which Telegram can easily\
generate thumbnails. However, this behaviour is undocumented and might be changed\
by Telegram.\
\
Shortcuts\
\
- [`telegram.Message.reply_animation()`](telegram.message.html#telegram.Message.reply_animation "telegram.Message.reply_animation")\
\
- [`telegram.User.send_animation()`](telegram.user.html#telegram.User.send_animation "telegram.User.send_animation")\
\
\
See also\
\
[Working with Files and Media](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Working-with-Files-and-Media)\
\
Changed in version 20.5: Removed deprecated argument `thumb`. Use\
`thumbnail` instead.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.send_animation.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**animation**](#telegram.Bot.send_animation.params.animation) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)") \| [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") \| [`InputFile`](telegram.inputfile.html#telegram.InputFile "telegram.InputFile") \| [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") \| [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") \| [`telegram.Animation`](telegram.animation.html#telegram.Animation "telegram.Animation")) –\
\
Animation to\
send. Pass a `file_id` as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one. To upload a file, you can either pass a [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") (e.g. `open("filename", "rb")`), the file contents as bytes or the path of the file (as string or [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") object). In the latter case, the file contents will either be read as bytes or the file path will be passed to Telegram, depending on the [`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot") setting.\
Lastly you can pass an existing [`telegram.Animation`](telegram.animation.html#telegram.Animation "telegram.Animation") object to send.\
\
\
\
Changed in version 13.2: Accept [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") as input.\
\
- [**duration**](#telegram.Bot.send_animation.params.duration) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Duration of sent animation in seconds.\
\
- [**width**](#telegram.Bot.send_animation.params.width) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Animation width.\
\
- [**height**](#telegram.Bot.send_animation.params.height) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Animation height.\
\
- [**caption**](#telegram.Bot.send_animation.params.caption) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Animation caption (may also be used when resending\
animations by file\_id),\
0- [`1024`](telegram.constants.html#telegram.constants.MessageLimit.CAPTION_LENGTH "telegram.constants.MessageLimit.CAPTION_LENGTH") characters after\
entities parsing.\
\
- [**parse\_mode**](#telegram.Bot.send_animation.params.parse_mode) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Mode for parsing entities. See [`telegram.constants.ParseMode`](telegram.constants.html#telegram.constants.ParseMode "telegram.constants.ParseMode") and [formatting options](https://core.telegram.org/bots/api#formatting-options) for more details.\
\
- [**caption\_entities**](#telegram.Bot.send_animation.params.caption_entities) (Sequence\[ [`telegram.MessageEntity`](telegram.messageentity.html#telegram.MessageEntity "telegram.MessageEntity")\], optional) –\
\
Sequence of special entities that appear in the caption, which can be specified instead of `parse_mode`.\
\
\
\
Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.\
\
- [**disable\_notification**](#telegram.Bot.send_animation.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.\
\
- [**protect\_content**](#telegram.Bot.send_animation.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Protects the contents of the sent message from forwarding and saving.\
\
\
\
Added in version 13.10.\
\
- [**message\_thread\_id**](#telegram.Bot.send_animation.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.\
\
\
\
Added in version 20.0.\
\
- [**reply\_markup**](#telegram.Bot.send_animation.params.reply_markup) ( [`InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup") \| [`ReplyKeyboardMarkup`](telegram.replykeyboardmarkup.html#telegram.ReplyKeyboardMarkup "telegram.ReplyKeyboardMarkup") \| [`ReplyKeyboardRemove`](telegram.replykeyboardremove.html#telegram.ReplyKeyboardRemove "telegram.ReplyKeyboardRemove") \| [`ForceReply`](telegram.forcereply.html#telegram.ForceReply "telegram.ForceReply"), optional) – Additional interface options. An object for an inline keyboard, custom reply\
keyboard, instructions to remove reply keyboard or to force a reply from the user.\
\
- [**has\_spoiler**](#telegram.Bot.send_animation.params.has_spoiler) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") if the animation needs to be\
covered with a spoiler animation.\
\
\
\
Added in version 20.0.\
\
- [**thumbnail**](#telegram.Bot.send_animation.params.thumbnail) ( [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") \| [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") \| [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail’s width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can’t be reused and can be only uploaded as a new file. To upload a file, you can either pass a [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") (e.g. `open("filename", "rb")`), the file contents as bytes or the path of the file (as string or [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") object). In the latter case, the file contents will either be read as bytes or the file path will be passed to Telegram, depending on the [`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot") setting.\
\
\
\
Added in version 20.2.\
\
- [**reply\_parameters**](#telegram.Bot.send_animation.params.reply_parameters) ( [`telegram.ReplyParameters`](telegram.replyparameters.html#telegram.ReplyParameters "telegram.ReplyParameters"), optional) –\
\
Description of the message to reply to.\
\
\
\
Added in version 20.8.\
\
- [**business\_connection\_id**](#telegram.Bot.send_animation.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message will be sent.\
\
\
\
Added in version 21.1.\
\
- [**message\_effect\_id**](#telegram.Bot.send_animation.params.message_effect_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the message effect to be added to the message; for private chats only.\
\
\
\
Added in version 21.3.\
\
- [**allow\_paid\_broadcast**](#telegram.Bot.send_animation.params.allow_paid_broadcast) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass True to allow up to [`1000`](telegram.constants.html#telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND "telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND") messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot’s balance.\
\
\
\
Added in version 21.7.\
\
- [**show\_caption\_above\_media**](#telegram.Bot.send_animation.params.show_caption_above_media) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the caption must be shown above the message media.\
\
\
\
Added in version 21.3.\
\
\
Keyword Arguments:\
\
- [**allow\_sending\_without\_reply**](#telegram.Bot.send_animation.params.allow_sending_without_reply) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the message should be sent even if the specified replied-to message is not found.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_animation.params.reply_parameters "telegram.Bot.send_animation"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_animation.params.reply_parameters "telegram.Bot.send_animation") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**reply\_to\_message\_id**](#telegram.Bot.send_animation.params.reply_to_message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
If the message is a reply, ID of the original message.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_animation.params.reply_parameters "telegram.Bot.send_animation"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_animation.params.reply_parameters "telegram.Bot.send_animation") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**filename**](#telegram.Bot.send_animation.params.filename) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Custom file name for the animation, when uploading a\
new file. Convenience parameter, useful e.g. when sending files generated by the\
[`tempfile`](https://docs.python.org/3/library/tempfile.html#module-tempfile "(in Python v3.13)") module.\
\
\
\
Added in version 13.1.\
\
- [**read\_timeout**](#telegram.Bot.send_animation.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.send_animation.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) –\
\
Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). By default, `20` seconds are used as write timeout.\
\
\
\
Deprecated since version 20.7: In future versions, the default value will be changed to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.send_animation.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.send_animation.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.send_animation.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the sent Message is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ send\_audio( _chat\_id_, _audio_, _duration=None_, _performer=None_, _title=None_, _caption=None_, _disable\_notification=None_, _reply\_markup=None_, _parse\_mode=None_, _caption\_entities=None_, _protect\_content=None_, _message\_thread\_id=None_, _thumbnail=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _filename=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L1420-L1581) [¶](#telegram.Bot.send_audio "Link to this definition")\
\
Use this method to send audio files, if you want Telegram clients to display them in the\
music player. Your audio must be in the `.mp3` or `.m4a` format.\
\
Bots can currently send audio files of up to\
[`50 MB`](telegram.constants.html#telegram.constants.FileSizeLimit.FILESIZE_UPLOAD "telegram.constants.FileSizeLimit.FILESIZE_UPLOAD") in size, this limit may be\
changed in the future.\
\
For sending voice messages, use the [`send_voice()`](#telegram.Bot.send_voice "telegram.Bot.send_voice") method instead.\
\
Shortcuts\
\
- [`telegram.Message.reply_audio()`](telegram.message.html#telegram.Message.reply_audio "telegram.Message.reply_audio")\
\
- [`telegram.User.send_audio()`](telegram.user.html#telegram.User.send_audio "telegram.User.send_audio")\
\
\
See also\
\
[Working with Files and Media](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Working-with-Files-and-Media)\
\
Changed in version 20.5: Removed deprecated argument `thumb`. Use\
`thumbnail` instead.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.send_audio.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**audio**](#telegram.Bot.send_audio.params.audio) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)") \| [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") \| [`InputFile`](telegram.inputfile.html#telegram.InputFile "telegram.InputFile") \| [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") \| [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") \| [`telegram.Audio`](telegram.audio.html#telegram.Audio "telegram.Audio")) –\
\
Audio file to\
send. Pass a `file_id` as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one. To upload a file, you can either pass a [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") (e.g. `open("filename", "rb")`), the file contents as bytes or the path of the file (as string or [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") object). In the latter case, the file contents will either be read as bytes or the file path will be passed to Telegram, depending on the [`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot") setting.\
Lastly you can pass an existing [`telegram.Audio`](telegram.audio.html#telegram.Audio "telegram.Audio") object to send.\
\
\
\
Changed in version 13.2: Accept [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") as input.\
\
\
\
\
\
Changed in version 20.0: File paths as input is also accepted for bots _not_ running in\
[`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot").\
\
- [**caption**](#telegram.Bot.send_audio.params.caption) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Audio caption,\
0- [`1024`](telegram.constants.html#telegram.constants.MessageLimit.CAPTION_LENGTH "telegram.constants.MessageLimit.CAPTION_LENGTH") characters after\
entities parsing.\
\
- [**parse\_mode**](#telegram.Bot.send_audio.params.parse_mode) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Mode for parsing entities. See [`telegram.constants.ParseMode`](telegram.constants.html#telegram.constants.ParseMode "telegram.constants.ParseMode") and [formatting options](https://core.telegram.org/bots/api#formatting-options) for more details.\
\
- [**caption\_entities**](#telegram.Bot.send_audio.params.caption_entities) (Sequence\[ [`telegram.MessageEntity`](telegram.messageentity.html#telegram.MessageEntity "telegram.MessageEntity")\], optional) –\
\
Sequence of special entities that appear in the caption, which can be specified instead of `parse_mode`.\
\
\
\
Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.\
\
- [**duration**](#telegram.Bot.send_audio.params.duration) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Duration of sent audio in seconds.\
\
- [**performer**](#telegram.Bot.send_audio.params.performer) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Performer.\
\
- [**title**](#telegram.Bot.send_audio.params.title) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Track name.\
\
- [**disable\_notification**](#telegram.Bot.send_audio.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.\
\
- [**protect\_content**](#telegram.Bot.send_audio.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Protects the contents of the sent message from forwarding and saving.\
\
\
\
Added in version 13.10.\
\
- [**message\_thread\_id**](#telegram.Bot.send_audio.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.\
\
\
\
Added in version 20.0.\
\
- [**reply\_markup**](#telegram.Bot.send_audio.params.reply_markup) ( [`InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup") \| [`ReplyKeyboardMarkup`](telegram.replykeyboardmarkup.html#telegram.ReplyKeyboardMarkup "telegram.ReplyKeyboardMarkup") \| [`ReplyKeyboardRemove`](telegram.replykeyboardremove.html#telegram.ReplyKeyboardRemove "telegram.ReplyKeyboardRemove") \| [`ForceReply`](telegram.forcereply.html#telegram.ForceReply "telegram.ForceReply"), optional) – Additional interface options. An object for an inline keyboard, custom reply\
keyboard, instructions to remove reply keyboard or to force a reply from the user.\
\
- [**thumbnail**](#telegram.Bot.send_audio.params.thumbnail) ( [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") \| [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") \| [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail’s width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can’t be reused and can be only uploaded as a new file. To upload a file, you can either pass a [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") (e.g. `open("filename", "rb")`), the file contents as bytes or the path of the file (as string or [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") object). In the latter case, the file contents will either be read as bytes or the file path will be passed to Telegram, depending on the [`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot") setting.\
\
\
\
Added in version 20.2.\
\
- [**reply\_parameters**](#telegram.Bot.send_audio.params.reply_parameters) ( [`ReplyParameters`](telegram.replyparameters.html#telegram.ReplyParameters "telegram.ReplyParameters"), optional) –\
\
Description of the message to reply to.\
\
\
\
Added in version 20.8.\
\
- [**business\_connection\_id**](#telegram.Bot.send_audio.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message will be sent.\
\
\
\
Added in version 21.1.\
\
- [**message\_effect\_id**](#telegram.Bot.send_audio.params.message_effect_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the message effect to be added to the message; for private chats only.\
\
\
\
Added in version 21.3.\
\
- [**allow\_paid\_broadcast**](#telegram.Bot.send_audio.params.allow_paid_broadcast) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass True to allow up to [`1000`](telegram.constants.html#telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND "telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND") messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot’s balance.\
\
\
\
Added in version 21.7.\
\
\
Keyword Arguments:\
\
- [**allow\_sending\_without\_reply**](#telegram.Bot.send_audio.params.allow_sending_without_reply) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the message should be sent even if the specified replied-to message is not found.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_audio.params.reply_parameters "telegram.Bot.send_audio"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_audio.params.reply_parameters "telegram.Bot.send_audio") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**reply\_to\_message\_id**](#telegram.Bot.send_audio.params.reply_to_message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
If the message is a reply, ID of the original message.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_audio.params.reply_parameters "telegram.Bot.send_audio"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_audio.params.reply_parameters "telegram.Bot.send_audio") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**filename**](#telegram.Bot.send_audio.params.filename) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Custom file name for the audio, when uploading a\
new file. Convenience parameter, useful e.g. when sending files generated by the\
[`tempfile`](https://docs.python.org/3/library/tempfile.html#module-tempfile "(in Python v3.13)") module.\
\
\
\
Added in version 13.1.\
\
- [**read\_timeout**](#telegram.Bot.send_audio.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.send_audio.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) –\
\
Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). By default, `20` seconds are used as write timeout.\
\
\
\
Deprecated since version 20.7: In future versions, the default value will be changed to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.send_audio.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.send_audio.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.send_audio.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the sent Message is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ send\_chat\_action( _chat\_id_, _action_, _message\_thread\_id=None_, _business\_connection\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3401-L3454) [¶](#telegram.Bot.send_chat_action "Link to this definition")\
\
Use this method when you need to tell the user that something is happening on the bot’s\
side. The status is set for 5 seconds or less (when a message arrives from your bot,\
Telegram clients clear its typing status). Telegram only recommends using this method when\
a response from the bot will take a noticeable amount of time to arrive.\
\
Shortcuts\
\
- [`telegram.Message.reply_chat_action()`](telegram.message.html#telegram.Message.reply_chat_action "telegram.Message.reply_chat_action")\
\
- [`telegram.User.send_action()`](telegram.user.html#telegram.User.send_action "telegram.User.send_action")\
\
- [`telegram.User.send_chat_action()`](telegram.user.html#telegram.User.send_chat_action "telegram.User.send_chat_action")\
\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.send_chat_action.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**action**](#telegram.Bot.send_chat_action.params.action) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Type of action to broadcast. Choose one, depending on what the user\
is about to receive. For convenience look at the constants in\
[`telegram.constants.ChatAction`](telegram.constants.html#telegram.constants.ChatAction "telegram.constants.ChatAction").\
\
- [**message\_thread\_id**](#telegram.Bot.send_chat_action.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.\
\
\
\
Added in version 20.0.\
\
- [**business\_connection\_id**](#telegram.Bot.send_chat_action.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message will be sent.\
\
\
\
Added in version 21.1.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.send_chat_action.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.send_chat_action.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.send_chat_action.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.send_chat_action.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.send_chat_action.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ send\_contact( _chat\_id_, _phone\_number=None_, _first\_name=None_, _last\_name=None_, _disable\_notification=None_, _reply\_markup=None_, _vcard=None_, _protect\_content=None_, _message\_thread\_id=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _contact=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3163-L3300) [¶](#telegram.Bot.send_contact "Link to this definition")\
\
Use this method to send phone contacts.\
\
Note\
\
You can either supply [`contact`](#telegram.Bot.send_contact.params.contact "telegram.Bot.send_contact") or [`phone_number`](#telegram.Bot.send_contact.params.phone_number "telegram.Bot.send_contact") and\
[`first_name`](#telegram.Bot.send_contact.params.first_name "telegram.Bot.send_contact") with optionally [`last_name`](#telegram.Bot.send_contact.params.last_name "telegram.Bot.send_contact") and optionally\
[`vcard`](#telegram.Bot.send_contact.params.vcard "telegram.Bot.send_contact").\
\
Shortcuts\
\
- [`telegram.Message.reply_contact()`](telegram.message.html#telegram.Message.reply_contact "telegram.Message.reply_contact")\
\
- [`telegram.User.send_contact()`](telegram.user.html#telegram.User.send_contact "telegram.User.send_contact")\
\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.send_contact.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**phone\_number**](#telegram.Bot.send_contact.params.phone_number) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Contact’s phone number.\
\
- [**first\_name**](#telegram.Bot.send_contact.params.first_name) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Contact’s first name.\
\
- [**last\_name**](#telegram.Bot.send_contact.params.last_name) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Contact’s last name.\
\
- [**vcard**](#telegram.Bot.send_contact.params.vcard) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Additional data about the contact in the form of a vCard,\
0- [`2048`](telegram.constants.html#telegram.constants.ContactLimit.VCARD "telegram.constants.ContactLimit.VCARD") bytes.\
\
- [**disable\_notification**](#telegram.Bot.send_contact.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.\
\
- [**protect\_content**](#telegram.Bot.send_contact.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Protects the contents of the sent message from forwarding and saving.\
\
\
\
Added in version 13.10.\
\
- [**message\_thread\_id**](#telegram.Bot.send_contact.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.\
\
\
\
Added in version 20.0.\
\
- [**reply\_markup**](#telegram.Bot.send_contact.params.reply_markup) ( [`InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup") \| [`ReplyKeyboardMarkup`](telegram.replykeyboardmarkup.html#telegram.ReplyKeyboardMarkup "telegram.ReplyKeyboardMarkup") \| [`ReplyKeyboardRemove`](telegram.replykeyboardremove.html#telegram.ReplyKeyboardRemove "telegram.ReplyKeyboardRemove") \| [`ForceReply`](telegram.forcereply.html#telegram.ForceReply "telegram.ForceReply"), optional) – Additional interface options. An object for an inline keyboard, custom reply\
keyboard, instructions to remove reply keyboard or to force a reply from the user.\
\
- [**reply\_parameters**](#telegram.Bot.send_contact.params.reply_parameters) ( [`telegram.ReplyParameters`](telegram.replyparameters.html#telegram.ReplyParameters "telegram.ReplyParameters"), optional) –\
\
Description of the message to reply to.\
\
\
\
Added in version 20.8.\
\
- [**business\_connection\_id**](#telegram.Bot.send_contact.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message will be sent.\
\
\
\
Added in version 21.1.\
\
- [**message\_effect\_id**](#telegram.Bot.send_contact.params.message_effect_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the message effect to be added to the message; for private chats only.\
\
\
\
Added in version 21.3.\
\
- [**allow\_paid\_broadcast**](#telegram.Bot.send_contact.params.allow_paid_broadcast) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass True to allow up to [`1000`](telegram.constants.html#telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND "telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND") messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot’s balance.\
\
\
\
Added in version 21.7.\
\
\
Keyword Arguments:\
\
- [**allow\_sending\_without\_reply**](#telegram.Bot.send_contact.params.allow_sending_without_reply) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the message should be sent even if the specified replied-to message is not found.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_contact.params.reply_parameters "telegram.Bot.send_contact"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_contact.params.reply_parameters "telegram.Bot.send_contact") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**reply\_to\_message\_id**](#telegram.Bot.send_contact.params.reply_to_message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
If the message is a reply, ID of the original message.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_contact.params.reply_parameters "telegram.Bot.send_contact"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_contact.params.reply_parameters "telegram.Bot.send_contact") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**contact**](#telegram.Bot.send_contact.params.contact) ( [`telegram.Contact`](telegram.contact.html#telegram.Contact "telegram.Contact"), optional) – The contact to send.\
\
- [**read\_timeout**](#telegram.Bot.send_contact.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.send_contact.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.send_contact.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.send_contact.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.send_contact.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the sent Message is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ send\_dice( _chat\_id_, _disable\_notification=None_, _reply\_markup=None_, _emoji=None_, _protect\_content=None_, _message\_thread\_id=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7389-L7503) [¶](#telegram.Bot.send_dice "Link to this definition")\
\
Use this method to send an animated emoji that will display a random value.\
\
Shortcuts\
\
- [`telegram.Message.reply_dice()`](telegram.message.html#telegram.Message.reply_dice "telegram.Message.reply_dice")\
\
- [`telegram.User.send_dice()`](telegram.user.html#telegram.User.send_dice "telegram.User.send_dice")\
\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.send_dice.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**disable\_notification**](#telegram.Bot.send_dice.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.\
\
- [**reply\_markup**](#telegram.Bot.send_dice.params.reply_markup) ( [`InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup") \| [`ReplyKeyboardMarkup`](telegram.replykeyboardmarkup.html#telegram.ReplyKeyboardMarkup "telegram.ReplyKeyboardMarkup") \| [`ReplyKeyboardRemove`](telegram.replykeyboardremove.html#telegram.ReplyKeyboardRemove "telegram.ReplyKeyboardRemove") \| [`ForceReply`](telegram.forcereply.html#telegram.ForceReply "telegram.ForceReply"), optional) – Additional interface options. An object for an inline keyboard, custom reply\
keyboard, instructions to remove reply keyboard or to force a reply from the user\
\
- [**emoji**](#telegram.Bot.send_dice.params.emoji) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Emoji on which the dice throw animation is based.\
Currently, must be one of [`telegram.constants.DiceEmoji`](telegram.constants.html#telegram.constants.DiceEmoji "telegram.constants.DiceEmoji"). Dice can have\
values\
[`1`](telegram.dice.html#telegram.Dice.MIN_VALUE "telegram.Dice.MIN_VALUE")- [`6`](telegram.dice.html#telegram.Dice.MAX_VALUE_BOWLING "telegram.Dice.MAX_VALUE_BOWLING")\
for [`'🎲'`](telegram.dice.html#telegram.Dice.DICE "telegram.Dice.DICE"), [`'🎯'`](telegram.dice.html#telegram.Dice.DARTS "telegram.Dice.DARTS") and\
[`'🎳'`](telegram.dice.html#telegram.Dice.BOWLING "telegram.Dice.BOWLING"), values\
[`1`](telegram.dice.html#telegram.Dice.MIN_VALUE "telegram.Dice.MIN_VALUE")- [`5`](telegram.dice.html#telegram.Dice.MAX_VALUE_BASKETBALL "telegram.Dice.MAX_VALUE_BASKETBALL")\
for [`'🏀'`](telegram.dice.html#telegram.Dice.BASKETBALL "telegram.Dice.BASKETBALL") and [`'⚽'`](telegram.dice.html#telegram.Dice.FOOTBALL "telegram.Dice.FOOTBALL"),\
and values [`1`](telegram.dice.html#telegram.Dice.MIN_VALUE "telegram.Dice.MIN_VALUE")-\
[`64`](telegram.dice.html#telegram.Dice.MAX_VALUE_SLOT_MACHINE "telegram.Dice.MAX_VALUE_SLOT_MACHINE")\
for [`'🎰'`](telegram.dice.html#telegram.Dice.SLOT_MACHINE "telegram.Dice.SLOT_MACHINE"). Defaults to\
[`'🎲'`](telegram.dice.html#telegram.Dice.DICE "telegram.Dice.DICE").\
\
\
\
Changed in version 13.4: Added the [`'🎳'`](telegram.dice.html#telegram.Dice.BOWLING "telegram.Dice.BOWLING") emoji.\
\
- [**protect\_content**](#telegram.Bot.send_dice.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Protects the contents of the sent message from forwarding and saving.\
\
\
\
Added in version 13.10.\
\
- [**message\_thread\_id**](#telegram.Bot.send_dice.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.\
\
\
\
Added in version 20.0.\
\
- [**reply\_parameters**](#telegram.Bot.send_dice.params.reply_parameters) ( [`telegram.ReplyParameters`](telegram.replyparameters.html#telegram.ReplyParameters "telegram.ReplyParameters"), optional) –\
\
Description of the message to reply to.\
\
\
\
Added in version 20.8.\
\
- [**business\_connection\_id**](#telegram.Bot.send_dice.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message will be sent.\
\
\
\
Added in version 21.1.\
\
- [**message\_effect\_id**](#telegram.Bot.send_dice.params.message_effect_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the message effect to be added to the message; for private chats only.\
\
\
\
Added in version 21.3.\
\
- [**allow\_paid\_broadcast**](#telegram.Bot.send_dice.params.allow_paid_broadcast) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass True to allow up to [`1000`](telegram.constants.html#telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND "telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND") messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot’s balance.\
\
\
\
Added in version 21.7.\
\
\
Keyword Arguments:\
\
- [**allow\_sending\_without\_reply**](#telegram.Bot.send_dice.params.allow_sending_without_reply) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the message should be sent even if the specified replied-to message is not found.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_dice.params.reply_parameters "telegram.Bot.send_dice"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_dice.params.reply_parameters "telegram.Bot.send_dice") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**reply\_to\_message\_id**](#telegram.Bot.send_dice.params.reply_to_message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
If the message is a reply, ID of the original message.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_dice.params.reply_parameters "telegram.Bot.send_dice"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_dice.params.reply_parameters "telegram.Bot.send_dice") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**read\_timeout**](#telegram.Bot.send_dice.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.send_dice.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.send_dice.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.send_dice.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.send_dice.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the sent Message is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ send\_document( _chat\_id_, _document_, _caption=None_, _disable\_notification=None_, _reply\_markup=None_, _parse\_mode=None_, _disable\_content\_type\_detection=None_, _caption\_entities=None_, _protect\_content=None_, _message\_thread\_id=None_, _thumbnail=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _filename=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L1582-L1736) [¶](#telegram.Bot.send_document "Link to this definition")\
\
Use this method to send general files.\
\
Bots can currently send files of any type of up to\
[`50 MB`](telegram.constants.html#telegram.constants.FileSizeLimit.FILESIZE_UPLOAD "telegram.constants.FileSizeLimit.FILESIZE_UPLOAD") in size, this limit may be\
changed in the future.\
\
Shortcuts\
\
- [`telegram.Message.reply_document()`](telegram.message.html#telegram.Message.reply_document "telegram.Message.reply_document")\
\
- [`telegram.User.send_document()`](telegram.user.html#telegram.User.send_document "telegram.User.send_document")\
\
\
See also\
\
[Working with Files and Media](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Working-with-Files-and-Media)\
\
Changed in version 20.5: Removed deprecated argument `thumb`. Use\
`thumbnail` instead.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.send_document.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**document**](#telegram.Bot.send_document.params.document) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)") \| [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") \| [`InputFile`](telegram.inputfile.html#telegram.InputFile "telegram.InputFile") \| [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") \| [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") \| [`telegram.Document`](telegram.document.html#telegram.Document "telegram.Document")) –\
\
File to send.\
Pass a `file_id` as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one. To upload a file, you can either pass a [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") (e.g. `open("filename", "rb")`), the file contents as bytes or the path of the file (as string or [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") object). In the latter case, the file contents will either be read as bytes or the file path will be passed to Telegram, depending on the [`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot") setting.\
Lastly you can pass an existing [`telegram.Document`](telegram.document.html#telegram.Document "telegram.Document") object to send.\
\
\
\
Note\
\
\
\
Sending by URL will currently only work `GIF`, `PDF` & `ZIP` files.\
\
\
\
\
\
Changed in version 13.2: Accept [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") as input.\
\
\
\
\
\
Changed in version 20.0: File paths as input is also accepted for bots _not_ running in\
[`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot").\
\
- [**caption**](#telegram.Bot.send_document.params.caption) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Document caption (may also be used when resending\
documents by file\_id), 0- [`1024`](telegram.constants.html#telegram.constants.MessageLimit.CAPTION_LENGTH "telegram.constants.MessageLimit.CAPTION_LENGTH")\
characters after entities parsing.\
\
- [**disable\_content\_type\_detection**](#telegram.Bot.send_document.params.disable_content_type_detection) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Disables automatic server-side\
content type detection for files uploaded using multipart/form-data.\
\
- [**parse\_mode**](#telegram.Bot.send_document.params.parse_mode) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Mode for parsing entities. See [`telegram.constants.ParseMode`](telegram.constants.html#telegram.constants.ParseMode "telegram.constants.ParseMode") and [formatting options](https://core.telegram.org/bots/api#formatting-options) for more details.\
\
- [**caption\_entities**](#telegram.Bot.send_document.params.caption_entities) (Sequence\[ [`telegram.MessageEntity`](telegram.messageentity.html#telegram.MessageEntity "telegram.MessageEntity")\], optional) –\
\
Sequence of special entities that appear in the caption, which can be specified instead of `parse_mode`.\
\
\
\
Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.\
\
- [**disable\_notification**](#telegram.Bot.send_document.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.\
\
- [**protect\_content**](#telegram.Bot.send_document.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Protects the contents of the sent message from forwarding and saving.\
\
\
\
Added in version 13.10.\
\
- [**message\_thread\_id**](#telegram.Bot.send_document.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.\
\
\
\
Added in version 20.0.\
\
- [**reply\_markup**](#telegram.Bot.send_document.params.reply_markup) ( [`InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup") \| [`ReplyKeyboardMarkup`](telegram.replykeyboardmarkup.html#telegram.ReplyKeyboardMarkup "telegram.ReplyKeyboardMarkup") \| [`ReplyKeyboardRemove`](telegram.replykeyboardremove.html#telegram.ReplyKeyboardRemove "telegram.ReplyKeyboardRemove") \| [`ForceReply`](telegram.forcereply.html#telegram.ForceReply "telegram.ForceReply"), optional) – Additional interface options. An object for an inline keyboard, custom reply\
keyboard, instructions to remove reply keyboard or to force a reply from the user.\
\
- [**thumbnail**](#telegram.Bot.send_document.params.thumbnail) ( [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") \| [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") \| [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail’s width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can’t be reused and can be only uploaded as a new file. To upload a file, you can either pass a [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") (e.g. `open("filename", "rb")`), the file contents as bytes or the path of the file (as string or [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") object). In the latter case, the file contents will either be read as bytes or the file path will be passed to Telegram, depending on the [`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot") setting.\
\
\
\
Added in version 20.2.\
\
- [**reply\_parameters**](#telegram.Bot.send_document.params.reply_parameters) ( [`telegram.ReplyParameters`](telegram.replyparameters.html#telegram.ReplyParameters "telegram.ReplyParameters"), optional) –\
\
Description of the message to reply to.\
\
\
\
Added in version 20.8.\
\
- [**business\_connection\_id**](#telegram.Bot.send_document.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message will be sent.\
\
\
\
Added in version 21.1.\
\
- [**message\_effect\_id**](#telegram.Bot.send_document.params.message_effect_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the message effect to be added to the message; for private chats only.\
\
\
\
Added in version 21.3.\
\
- [**allow\_paid\_broadcast**](#telegram.Bot.send_document.params.allow_paid_broadcast) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass True to allow up to [`1000`](telegram.constants.html#telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND "telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND") messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot’s balance.\
\
\
\
Added in version 21.7.\
\
\
Keyword Arguments:\
\
- [**allow\_sending\_without\_reply**](#telegram.Bot.send_document.params.allow_sending_without_reply) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the message should be sent even if the specified replied-to message is not found.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_document.params.reply_parameters "telegram.Bot.send_document"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_document.params.reply_parameters "telegram.Bot.send_document") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**reply\_to\_message\_id**](#telegram.Bot.send_document.params.reply_to_message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
If the message is a reply, ID of the original message.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_document.params.reply_parameters "telegram.Bot.send_document"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_document.params.reply_parameters "telegram.Bot.send_document") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**filename**](#telegram.Bot.send_document.params.filename) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Custom file name for the document, when uploading a\
new file. Convenience parameter, useful e.g. when sending files generated by the\
[`tempfile`](https://docs.python.org/3/library/tempfile.html#module-tempfile "(in Python v3.13)") module.\
\
- [**read\_timeout**](#telegram.Bot.send_document.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.send_document.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) –\
\
Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). By default, `20` seconds are used as write timeout.\
\
\
\
Deprecated since version 20.7: In future versions, the default value will be changed to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.send_document.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.send_document.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.send_document.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the sent Message is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ send\_game( _chat\_id_, _game\_short\_name_, _disable\_notification=None_, _reply\_markup=None_, _protect\_content=None_, _message\_thread\_id=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3301-L3400) [¶](#telegram.Bot.send_game "Link to this definition")\
\
Use this method to send a game.\
\
Shortcuts\
\
- [`telegram.Message.reply_game()`](telegram.message.html#telegram.Message.reply_game "telegram.Message.reply_game")\
\
- [`telegram.User.send_game()`](telegram.user.html#telegram.User.send_game "telegram.User.send_game")\
\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.send_game.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Unique identifier for the target chat.\
\
- [**game\_short\_name**](#telegram.Bot.send_game.params.game_short_name) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) –\
\
Short name of the game, serves as the unique identifier\
for the game. Set up your games via [@BotFather](https://t.me/BotFather).\
\
- [**disable\_notification**](#telegram.Bot.send_game.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.\
\
- [**protect\_content**](#telegram.Bot.send_game.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Protects the contents of the sent message from forwarding and saving.\
\
\
\
Added in version 13.10.\
\
- [**message\_thread\_id**](#telegram.Bot.send_game.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.\
\
\
\
Added in version 20.0.\
\
- [**reply\_markup**](#telegram.Bot.send_game.params.reply_markup) ( [`telegram.InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup"), optional) – An object for a new\
inline keyboard. If empty, one “Play game\_title” button will be\
shown. If not empty, the first button must launch the game.\
\
- [**reply\_parameters**](#telegram.Bot.send_game.params.reply_parameters) ( [`telegram.ReplyParameters`](telegram.replyparameters.html#telegram.ReplyParameters "telegram.ReplyParameters"), optional) –\
\
Description of the message to reply to.\
\
\
\
Added in version 20.8.\
\
- [**business\_connection\_id**](#telegram.Bot.send_game.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message will be sent.\
\
\
\
Added in version 21.1.\
\
- [**message\_effect\_id**](#telegram.Bot.send_game.params.message_effect_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the message effect to be added to the message; for private chats only.\
\
\
\
Added in version 21.3.\
\
- [**allow\_paid\_broadcast**](#telegram.Bot.send_game.params.allow_paid_broadcast) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass True to allow up to [`1000`](telegram.constants.html#telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND "telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND") messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot’s balance.\
\
\
\
Added in version 21.7.\
\
\
Keyword Arguments:\
\
- [**allow\_sending\_without\_reply**](#telegram.Bot.send_game.params.allow_sending_without_reply) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the message should be sent even if the specified replied-to message is not found.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_game.params.reply_parameters "telegram.Bot.send_game"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_game.params.reply_parameters "telegram.Bot.send_game") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**reply\_to\_message\_id**](#telegram.Bot.send_game.params.reply_to_message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
If the message is a reply, ID of the original message.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_game.params.reply_parameters "telegram.Bot.send_game"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_game.params.reply_parameters "telegram.Bot.send_game") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**read\_timeout**](#telegram.Bot.send_game.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.send_game.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.send_game.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.send_game.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.send_game.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the sent Message is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ send\_gift( _user\_id_, _gift\_id_, _text=None_, _text\_parse\_mode=None_, _text\_entities=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9681-L9742) [¶](#telegram.Bot.send_gift "Link to this definition")\
\
Sends a gift to the given user.\
The gift can’t be converted to Telegram Stars by the user\
\
Shortcuts\
\
[`telegram.User.send_gift()`](telegram.user.html#telegram.User.send_gift "telegram.User.send_gift")\
\
Added in version 21.8.\
\
Parameters:\
\
- [**user\_id**](#telegram.Bot.send_gift.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Unique identifier of the target user that will receive the gift\
\
- [**gift\_id**](#telegram.Bot.send_gift.params.gift_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)") \| [`Gift`](telegram.gift.html#telegram.Gift "telegram.Gift")) – Identifier of the gift or a\
[`Gift`](telegram.gift.html#telegram.Gift "telegram.Gift") object\
\
- [**text**](#telegram.Bot.send_gift.params.text) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Text that will be shown along with the gift;\
0- [`255`](telegram.constants.html#telegram.constants.GiftLimit.MAX_TEXT_LENGTH "telegram.constants.GiftLimit.MAX_TEXT_LENGTH") characters\
\
- [**text\_parse\_mode**](#telegram.Bot.send_gift.params.text_parse_mode) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Mode for parsing entities.\
See [`telegram.constants.ParseMode`](telegram.constants.html#telegram.constants.ParseMode "telegram.constants.ParseMode") and\
[formatting options](https://core.telegram.org/bots/api#formatting-options) for\
more details. Entities other than [`BOLD`](telegram.messageentity.html#telegram.MessageEntity.BOLD "telegram.MessageEntity.BOLD"),\
[`ITALIC`](telegram.messageentity.html#telegram.MessageEntity.ITALIC "telegram.MessageEntity.ITALIC"), [`UNDERLINE`](telegram.messageentity.html#telegram.MessageEntity.UNDERLINE "telegram.MessageEntity.UNDERLINE"),\
[`STRIKETHROUGH`](telegram.messageentity.html#telegram.MessageEntity.STRIKETHROUGH "telegram.MessageEntity.STRIKETHROUGH"), [`SPOILER`](telegram.messageentity.html#telegram.MessageEntity.SPOILER "telegram.MessageEntity.SPOILER"), and\
[`CUSTOM_EMOJI`](telegram.messageentity.html#telegram.MessageEntity.CUSTOM_EMOJI "telegram.MessageEntity.CUSTOM_EMOJI") are ignored.\
\
- [**text\_entities**](#telegram.Bot.send_gift.params.text_entities) (Sequence\[ [`telegram.MessageEntity`](telegram.messageentity.html#telegram.MessageEntity "telegram.MessageEntity")\], optional) – A list of special\
entities that appear in the gift text. It can be specified instead of\
[`text_parse_mode`](#telegram.Bot.send_gift.params.text_parse_mode "telegram.Bot.send_gift"). Entities other than [`BOLD`](telegram.messageentity.html#telegram.MessageEntity.BOLD "telegram.MessageEntity.BOLD"),\
[`ITALIC`](telegram.messageentity.html#telegram.MessageEntity.ITALIC "telegram.MessageEntity.ITALIC"), [`UNDERLINE`](telegram.messageentity.html#telegram.MessageEntity.UNDERLINE "telegram.MessageEntity.UNDERLINE"),\
[`STRIKETHROUGH`](telegram.messageentity.html#telegram.MessageEntity.STRIKETHROUGH "telegram.MessageEntity.STRIKETHROUGH"), [`SPOILER`](telegram.messageentity.html#telegram.MessageEntity.SPOILER "telegram.MessageEntity.SPOILER"), and\
[`CUSTOM_EMOJI`](telegram.messageentity.html#telegram.MessageEntity.CUSTOM_EMOJI "telegram.MessageEntity.CUSTOM_EMOJI") are ignored.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.send_gift.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.send_gift.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.send_gift.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.send_gift.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.send_gift.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ send\_invoice( _chat\_id_, _title_, _description_, _payload_, _provider\_token_, _currency_, _prices_, _start\_parameter=None_, _photo\_url=None_, _photo\_size=None_, _photo\_width=None_, _photo\_height=None_, _need\_name=None_, _need\_phone\_number=None_, _need\_email=None_, _need\_shipping\_address=None_, _is\_flexible=None_, _disable\_notification=None_, _reply\_markup=None_, _provider\_data=None_, _send\_phone\_number\_to\_provider=None_, _send\_email\_to\_provider=None_, _max\_tip\_amount=None_, _suggested\_tip\_amounts=None_, _protect\_content=None_, _message\_thread\_id=None_, _reply\_parameters=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5066-L5288) [¶](#telegram.Bot.send_invoice "Link to this definition")\
\
Use this method to send invoices.\
\
Warning\
\
As of API 5.2 [`start_parameter`](#telegram.Bot.send_invoice.params.start_parameter "telegram.Bot.send_invoice") is an optional argument and therefore the\
order of the arguments had to be changed. Use keyword arguments to make sure that the\
arguments are passed correctly.\
\
Shortcuts\
\
- [`telegram.Message.reply_invoice()`](telegram.message.html#telegram.Message.reply_invoice "telegram.Message.reply_invoice")\
\
- [`telegram.User.send_invoice()`](telegram.user.html#telegram.User.send_invoice "telegram.User.send_invoice")\
\
\
Changed in version 13.5: As of Bot API 5.2, the parameter [`start_parameter`](#telegram.Bot.send_invoice.params.start_parameter "telegram.Bot.send_invoice") is optional.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.send_invoice.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**title**](#telegram.Bot.send_invoice.params.title) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Product name. [`1`](telegram.invoice.html#telegram.Invoice.MIN_TITLE_LENGTH "telegram.Invoice.MIN_TITLE_LENGTH")-\
[`32`](telegram.invoice.html#telegram.Invoice.MAX_TITLE_LENGTH "telegram.Invoice.MAX_TITLE_LENGTH") characters.\
\
- [**description**](#telegram.Bot.send_invoice.params.description) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Product description.\
[`1`](telegram.invoice.html#telegram.Invoice.MIN_DESCRIPTION_LENGTH "telegram.Invoice.MIN_DESCRIPTION_LENGTH")-\
[`255`](telegram.invoice.html#telegram.Invoice.MAX_DESCRIPTION_LENGTH "telegram.Invoice.MAX_DESCRIPTION_LENGTH") characters.\
\
- [**payload**](#telegram.Bot.send_invoice.params.payload) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Bot-defined invoice payload.\
[`1`](telegram.invoice.html#telegram.Invoice.MIN_PAYLOAD_LENGTH "telegram.Invoice.MIN_PAYLOAD_LENGTH")-\
[`128`](telegram.invoice.html#telegram.Invoice.MAX_PAYLOAD_LENGTH "telegram.Invoice.MAX_PAYLOAD_LENGTH") bytes. This will not be\
displayed to the user, use it for your internal processes.\
\
- [**provider\_token**](#telegram.Bot.send_invoice.params.provider_token) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) –\
\
Payments provider token, obtained via\
[@BotFather](https://t.me/BotFather). Pass an empty string for payments in\
[Telegram Stars](https://t.me/BotNews/90).\
\
\
\
Deprecated since version 21.3: As of Bot API 7.4, this parameter is now optional and future versions of the\
library will make it optional as well.\
\
- [**currency**](#telegram.Bot.send_invoice.params.currency) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) –\
\
Three-letter ISO 4217 currency code, see [more on currencies](https://core.telegram.org/bots/payments#supported-currencies). Pass `XTR` for\
payment in [Telegram Stars](https://t.me/BotNews/90).\
\
- [**prices**](#telegram.Bot.send_invoice.params.prices) (Sequence\[ [`telegram.LabeledPrice`](telegram.labeledprice.html#telegram.LabeledPrice "telegram.LabeledPrice")\]) –\
\
Price breakdown, a sequence\
of components (e.g. product price, tax, discount, delivery cost, delivery tax,\
bonus, etc.). Must contain exactly one item for payment in [Telegram Stars](https://t.me/BotNews/90).\
\
\
\
Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.\
\
- [**max\_tip\_amount**](#telegram.Bot.send_invoice.params.max_tip_amount) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
The maximum accepted amount for tips in the\
_smallest units_ of the currency (integer, **not** float/double). For example, for\
a maximum tip of `US$ 1.45` pass `max_tip_amount = 145`. See the `exp`\
parameter in [currencies.json](https://core.telegram.org/bots/payments/currencies.json), it shows the number of\
digits past the decimal point for each currency (2 for the majority of currencies).\
Defaults to `0`. Not supported for payment in [Telegram Stars](https://t.me/BotNews/90).\
\
\
\
Added in version 13.5.\
\
- [**suggested\_tip\_amounts**](#telegram.Bot.send_invoice.params.suggested_tip_amounts) (Sequence\[ [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")\], optional) –\
\
An array of\
suggested amounts of tips in the _smallest units_ of the currency (integer, **not**\
float/double). At most [`4`](telegram.invoice.html#telegram.Invoice.MAX_TIP_AMOUNTS "telegram.Invoice.MAX_TIP_AMOUNTS") suggested tip\
amounts can be specified. The suggested tip amounts must be positive, passed in a\
strictly increased order and must not exceed [`max_tip_amount`](#telegram.Bot.send_invoice.params.max_tip_amount "telegram.Bot.send_invoice").\
\
\
\
Added in version 13.5.\
\
\
\
\
\
Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.\
\
- [**start\_parameter**](#telegram.Bot.send_invoice.params.start_parameter) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique deep-linking parameter. If left empty,\
_forwarded copies_ of the sent message will have a _Pay_ button, allowing\
multiple users to pay directly from the forwarded message, using the same invoice.\
If non-empty, forwarded copies of the sent message will have a _URL_ button with a\
deep link to the bot (instead of a _Pay_ button), with the value used as the\
start parameter.\
\
\
\
Changed in version 13.5: As of Bot API 5.2, this parameter is optional.\
\
- [**provider\_data**](#telegram.Bot.send_invoice.params.provider_data) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)") \| [`object`](https://docs.python.org/3/library/functions.html#object "(in Python v3.13)"), optional) – data about the\
invoice, which will be shared with the payment provider. A detailed description of\
required fields should be provided by the payment provider. When an object is\
passed, it will be encoded as JSON.\
\
- [**photo\_url**](#telegram.Bot.send_invoice.params.photo_url) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – URL of the product photo for the invoice. Can be a\
photo of the goods or a marketing image for a service. People like it better when\
they see what they are paying for.\
\
- [**photo\_size**](#telegram.Bot.send_invoice.params.photo_size) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Photo size.\
\
- [**photo\_width**](#telegram.Bot.send_invoice.params.photo_width) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Photo width.\
\
- [**photo\_height**](#telegram.Bot.send_invoice.params.photo_height) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Photo height.\
\
- [**need\_name**](#telegram.Bot.send_invoice.params.need_name) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if you require the user’s full\
name to complete the order. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).\
\
- [**need\_phone\_number**](#telegram.Bot.send_invoice.params.need_phone_number) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if you require the user’s\
phone number to complete the order. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).\
\
- [**need\_email**](#telegram.Bot.send_invoice.params.need_email) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if you require the user’s email\
to complete the order. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).\
\
- [**need\_shipping\_address**](#telegram.Bot.send_invoice.params.need_shipping_address) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if you require the\
user’s shipping address to complete the order. Ignored for payments in\
[Telegram Stars](https://t.me/BotNews/90).\
\
- [**send\_phone\_number\_to\_provider**](#telegram.Bot.send_invoice.params.send_phone_number_to_provider) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if user’s\
phone number should be sent to provider. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).\
\
- [**send\_email\_to\_provider**](#telegram.Bot.send_invoice.params.send_email_to_provider) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if user’s email\
address should be sent to provider. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).\
\
- [**is\_flexible**](#telegram.Bot.send_invoice.params.is_flexible) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the final price depends on\
the shipping method. Ignored for payments in [Telegram Stars](https://t.me/BotNews/90).\
\
- [**disable\_notification**](#telegram.Bot.send_invoice.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.\
\
- [**protect\_content**](#telegram.Bot.send_invoice.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Protects the contents of the sent message from forwarding and saving.\
\
\
\
Added in version 13.10.\
\
- [**message\_thread\_id**](#telegram.Bot.send_invoice.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.\
\
\
\
Added in version 20.0.\
\
- [**reply\_markup**](#telegram.Bot.send_invoice.params.reply_markup) ( [`telegram.InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup"), optional) – An object for an\
inline keyboard. If empty, one ‘Pay total price’ button will be\
shown. If not empty, the first button must be a Pay button.\
\
- [**reply\_parameters**](#telegram.Bot.send_invoice.params.reply_parameters) ( [`telegram.ReplyParameters`](telegram.replyparameters.html#telegram.ReplyParameters "telegram.ReplyParameters"), optional) –\
\
Description of the message to reply to.\
\
\
\
Added in version 20.8.\
\
- [**message\_effect\_id**](#telegram.Bot.send_invoice.params.message_effect_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the message effect to be added to the message; for private chats only.\
\
\
\
Added in version 21.3.\
\
- [**allow\_paid\_broadcast**](#telegram.Bot.send_invoice.params.allow_paid_broadcast) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass True to allow up to [`1000`](telegram.constants.html#telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND "telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND") messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot’s balance.\
\
\
\
Added in version 21.7.\
\
\
Keyword Arguments:\
\
- [**allow\_sending\_without\_reply**](#telegram.Bot.send_invoice.params.allow_sending_without_reply) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the message should be sent even if the specified replied-to message is not found.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_invoice.params.reply_parameters "telegram.Bot.send_invoice"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_invoice.params.reply_parameters "telegram.Bot.send_invoice") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**reply\_to\_message\_id**](#telegram.Bot.send_invoice.params.reply_to_message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
If the message is a reply, ID of the original message.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_invoice.params.reply_parameters "telegram.Bot.send_invoice"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_invoice.params.reply_parameters "telegram.Bot.send_invoice") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**read\_timeout**](#telegram.Bot.send_invoice.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.send_invoice.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.send_invoice.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.send_invoice.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.send_invoice.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the sent Message is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ send\_location( _chat\_id_, _latitude=None_, _longitude=None_, _disable\_notification=None_, _reply\_markup=None_, _live\_period=None_, _horizontal\_accuracy=None_, _heading=None_, _proximity\_alert\_radius=None_, _protect\_content=None_, _message\_thread\_id=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _location=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L2688-L2839) [¶](#telegram.Bot.send_location "Link to this definition")\
\
Use this method to send point on the map.\
\
Note\
\
You can either supply a [`latitude`](#telegram.Bot.send_location.params.latitude "telegram.Bot.send_location") and [`longitude`](#telegram.Bot.send_location.params.longitude "telegram.Bot.send_location") or a\
[`location`](#telegram.Bot.send_location.params.location "telegram.Bot.send_location").\
\
Shortcuts\
\
- [`telegram.Message.reply_location()`](telegram.message.html#telegram.Message.reply_location "telegram.Message.reply_location")\
\
- [`telegram.User.send_location()`](telegram.user.html#telegram.User.send_location "telegram.User.send_location")\
\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.send_location.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**latitude**](#telegram.Bot.send_location.params.latitude) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)"), optional) – Latitude of location.\
\
- [**longitude**](#telegram.Bot.send_location.params.longitude) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)"), optional) – Longitude of location.\
\
- [**horizontal\_accuracy**](#telegram.Bot.send_location.params.horizontal_accuracy) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – The radius of uncertainty for the location,\
measured in meters;\
0- [`1500`](telegram.constants.html#telegram.constants.LocationLimit.HORIZONTAL_ACCURACY "telegram.constants.LocationLimit.HORIZONTAL_ACCURACY").\
\
- [**live\_period**](#telegram.Bot.send_location.params.live_period) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Period in seconds for which the location will be\
updated, should be between\
[`60`](telegram.constants.html#telegram.constants.LocationLimit.MIN_LIVE_PERIOD "telegram.constants.LocationLimit.MIN_LIVE_PERIOD") and\
[`86400`](telegram.constants.html#telegram.constants.LocationLimit.MAX_LIVE_PERIOD "telegram.constants.LocationLimit.MAX_LIVE_PERIOD"), or\
[`2147483647`](telegram.constants.html#telegram.constants.LocationLimit.LIVE_PERIOD_FOREVER "telegram.constants.LocationLimit.LIVE_PERIOD_FOREVER") for live\
locations that can be edited indefinitely.\
\
- [**heading**](#telegram.Bot.send_location.params.heading) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – For live locations, a direction in which the user is\
moving, in degrees. Must be between\
[`1`](telegram.constants.html#telegram.constants.LocationLimit.MIN_HEADING "telegram.constants.LocationLimit.MIN_HEADING") and\
[`360`](telegram.constants.html#telegram.constants.LocationLimit.MAX_HEADING "telegram.constants.LocationLimit.MAX_HEADING") if specified.\
\
- [**proximity\_alert\_radius**](#telegram.Bot.send_location.params.proximity_alert_radius) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – For live locations, a maximum distance\
for proximity alerts about approaching another chat member, in meters. Must be\
between [`1`](telegram.constants.html#telegram.constants.LocationLimit.MIN_PROXIMITY_ALERT_RADIUS "telegram.constants.LocationLimit.MIN_PROXIMITY_ALERT_RADIUS")\
and [`100000`](telegram.constants.html#telegram.constants.LocationLimit.MAX_PROXIMITY_ALERT_RADIUS "telegram.constants.LocationLimit.MAX_PROXIMITY_ALERT_RADIUS")\
if specified.\
\
- [**disable\_notification**](#telegram.Bot.send_location.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.\
\
- [**protect\_content**](#telegram.Bot.send_location.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Protects the contents of the sent message from forwarding and saving.\
\
\
\
Added in version 13.10.\
\
- [**message\_thread\_id**](#telegram.Bot.send_location.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.\
\
\
\
Added in version 20.0.\
\
- [**reply\_markup**](#telegram.Bot.send_location.params.reply_markup) ( [`InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup") \| [`ReplyKeyboardMarkup`](telegram.replykeyboardmarkup.html#telegram.ReplyKeyboardMarkup "telegram.ReplyKeyboardMarkup") \| [`ReplyKeyboardRemove`](telegram.replykeyboardremove.html#telegram.ReplyKeyboardRemove "telegram.ReplyKeyboardRemove") \| [`ForceReply`](telegram.forcereply.html#telegram.ForceReply "telegram.ForceReply"), optional) – Additional interface options. An object for an inline keyboard, custom reply\
keyboard, instructions to remove reply keyboard or to force a reply from the user.\
\
- [**reply\_parameters**](#telegram.Bot.send_location.params.reply_parameters) ( [`telegram.ReplyParameters`](telegram.replyparameters.html#telegram.ReplyParameters "telegram.ReplyParameters"), optional) –\
\
Description of the message to reply to.\
\
\
\
Added in version 20.8.\
\
- [**business\_connection\_id**](#telegram.Bot.send_location.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message will be sent.\
\
\
\
Added in version 21.1.\
\
- [**message\_effect\_id**](#telegram.Bot.send_location.params.message_effect_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the message effect to be added to the message; for private chats only.\
\
\
\
Added in version 21.3.\
\
- [**allow\_paid\_broadcast**](#telegram.Bot.send_location.params.allow_paid_broadcast) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass True to allow up to [`1000`](telegram.constants.html#telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND "telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND") messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot’s balance.\
\
\
\
Added in version 21.7.\
\
\
Keyword Arguments:\
\
- [**allow\_sending\_without\_reply**](#telegram.Bot.send_location.params.allow_sending_without_reply) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the message should be sent even if the specified replied-to message is not found.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_location.params.reply_parameters "telegram.Bot.send_location"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_location.params.reply_parameters "telegram.Bot.send_location") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**reply\_to\_message\_id**](#telegram.Bot.send_location.params.reply_to_message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
If the message is a reply, ID of the original message.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_location.params.reply_parameters "telegram.Bot.send_location"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_location.params.reply_parameters "telegram.Bot.send_location") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**location**](#telegram.Bot.send_location.params.location) ( [`telegram.Location`](telegram.location.html#telegram.Location "telegram.Location"), optional) – The location to send.\
\
- [**read\_timeout**](#telegram.Bot.send_location.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.send_location.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.send_location.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.send_location.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.send_location.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the sent Message is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ send\_media\_group( _chat\_id_, _media_, _disable\_notification=None_, _protect\_content=None_, _message\_thread\_id=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_, _caption=None_, _parse\_mode=None_, _caption\_entities=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L2510-L2687) [¶](#telegram.Bot.send_media_group "Link to this definition")\
\
Use this method to send a group of photos, videos, documents or audios as an album.\
Documents and audio files can be only grouped in an album with messages of the same type.\
\
Note\
\
If you supply a [`caption`](#telegram.Bot.send_media_group.params.caption "telegram.Bot.send_media_group") (along with either [`parse_mode`](#telegram.Bot.send_media_group.params.parse_mode "telegram.Bot.send_media_group") or\
[`caption_entities`](#telegram.Bot.send_media_group.params.caption_entities "telegram.Bot.send_media_group")), then items in [`media`](#telegram.Bot.send_media_group.params.media "telegram.Bot.send_media_group") must have no captions,\
and vice versa.\
\
Shortcuts\
\
- [`telegram.Message.reply_media_group()`](telegram.message.html#telegram.Message.reply_media_group "telegram.Message.reply_media_group")\
\
- [`telegram.User.send_media_group()`](telegram.user.html#telegram.User.send_media_group "telegram.User.send_media_group")\
\
\
See also\
\
[Working with Files and Media](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Working-with-Files-and-Media)\
\
Changed in version 20.0: Returns a tuple instead of a list.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.send_media_group.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**media**](#telegram.Bot.send_media_group.params.media) (Sequence\[ [`telegram.InputMediaAudio`](telegram.inputmediaaudio.html#telegram.InputMediaAudio "telegram.InputMediaAudio"), [`telegram.InputMediaDocument`](telegram.inputmediadocument.html#telegram.InputMediaDocument "telegram.InputMediaDocument"), [`telegram.InputMediaPhoto`](telegram.inputmediaphoto.html#telegram.InputMediaPhoto "telegram.InputMediaPhoto"), [`telegram.InputMediaVideo`](telegram.inputmediavideo.html#telegram.InputMediaVideo "telegram.InputMediaVideo")\]) –\
\
An array\
describing messages to be sent, must include\
[`2`](telegram.constants.html#telegram.constants.MediaGroupLimit.MIN_MEDIA_LENGTH "telegram.constants.MediaGroupLimit.MIN_MEDIA_LENGTH")-\
[`10`](telegram.constants.html#telegram.constants.MediaGroupLimit.MAX_MEDIA_LENGTH "telegram.constants.MediaGroupLimit.MAX_MEDIA_LENGTH") items.\
\
\
\
Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.\
\
- [**disable\_notification**](#telegram.Bot.send_media_group.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.\
\
- [**protect\_content**](#telegram.Bot.send_media_group.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Protects the contents of the sent message from forwarding and saving.\
\
\
\
Added in version 13.10.\
\
- [**message\_thread\_id**](#telegram.Bot.send_media_group.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.\
\
\
\
Added in version 20.0.\
\
- [**reply\_parameters**](#telegram.Bot.send_media_group.params.reply_parameters) ( [`telegram.ReplyParameters`](telegram.replyparameters.html#telegram.ReplyParameters "telegram.ReplyParameters"), optional) –\
\
Description of the message to reply to.\
\
\
\
Added in version 20.8.\
\
- [**business\_connection\_id**](#telegram.Bot.send_media_group.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message will be sent.\
\
\
\
Added in version 21.1.\
\
- [**message\_effect\_id**](#telegram.Bot.send_media_group.params.message_effect_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the message effect to be added to the message; for private chats only.\
\
\
\
Added in version 21.3.\
\
- [**allow\_paid\_broadcast**](#telegram.Bot.send_media_group.params.allow_paid_broadcast) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass True to allow up to [`1000`](telegram.constants.html#telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND "telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND") messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot’s balance.\
\
\
\
Added in version 21.7.\
\
\
Keyword Arguments:\
\
- [**allow\_sending\_without\_reply**](#telegram.Bot.send_media_group.params.allow_sending_without_reply) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the message should be sent even if the specified replied-to message is not found.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_media_group.params.reply_parameters "telegram.Bot.send_media_group"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_media_group.params.reply_parameters "telegram.Bot.send_media_group") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**reply\_to\_message\_id**](#telegram.Bot.send_media_group.params.reply_to_message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
If the message is a reply, ID of the original message.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_media_group.params.reply_parameters "telegram.Bot.send_media_group"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_media_group.params.reply_parameters "telegram.Bot.send_media_group") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**caption**](#telegram.Bot.send_media_group.params.caption) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Caption that will be added to the\
first element of [`media`](#telegram.Bot.send_media_group.params.media "telegram.Bot.send_media_group"), so that it will be used as caption for the\
whole media group.\
Defaults to [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)").\
\
\
\
Added in version 20.0.\
\
- [**parse\_mode**](#telegram.Bot.send_media_group.params.parse_mode) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) –\
\
Parse mode for [`caption`](#telegram.Bot.send_media_group.params.caption "telegram.Bot.send_media_group").\
See the constants in [`telegram.constants.ParseMode`](telegram.constants.html#telegram.constants.ParseMode "telegram.constants.ParseMode") for the\
available modes.\
\
\
\
Added in version 20.0.\
\
- [**caption\_entities**](#telegram.Bot.send_media_group.params.caption_entities) (Sequence\[ [`telegram.MessageEntity`](telegram.messageentity.html#telegram.MessageEntity "telegram.MessageEntity")\], optional) –\
\
List of special entities for [`caption`](#telegram.Bot.send_media_group.params.caption "telegram.Bot.send_media_group"),\
which can be specified instead of [`parse_mode`](#telegram.Bot.send_media_group.params.parse_mode "telegram.Bot.send_media_group").\
Defaults to [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)").\
\
\
\
Added in version 20.0.\
\
- [**read\_timeout**](#telegram.Bot.send_media_group.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.send_media_group.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) –\
\
Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). By default, `20` seconds are used as write timeout.\
\
\
\
Deprecated since version 20.7: In future versions, the default value will be changed to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.send_media_group.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.send_media_group.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.send_media_group.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
An array of the sent Messages.\
\
Return type:\
\
tuple\[ [`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\]\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ send\_message( _chat\_id_, _text_, _parse\_mode=None_, _entities=None_, _disable\_notification=None_, _protect\_content=None_, _reply\_markup=None_, _message\_thread\_id=None_, _link\_preview\_options=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _disable\_web\_page\_preview=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L906-L1040) [¶](#telegram.Bot.send_message "Link to this definition")\
\
Use this method to send text messages.\
\
Shortcuts\
\
- [`telegram.Message.reply_html()`](telegram.message.html#telegram.Message.reply_html "telegram.Message.reply_html")\
\
- [`telegram.Message.reply_markdown_v2()`](telegram.message.html#telegram.Message.reply_markdown_v2 "telegram.Message.reply_markdown_v2")\
\
- [`telegram.Message.reply_markdown()`](telegram.message.html#telegram.Message.reply_markdown "telegram.Message.reply_markdown")\
\
- [`telegram.Message.reply_text()`](telegram.message.html#telegram.Message.reply_text "telegram.Message.reply_text")\
\
- [`telegram.User.send_message()`](telegram.user.html#telegram.User.send_message "telegram.User.send_message")\
\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.send_message.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**text**](#telegram.Bot.send_message.params.text) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Text of the message to be sent. Max\
[`4096`](telegram.constants.html#telegram.constants.MessageLimit.MAX_TEXT_LENGTH "telegram.constants.MessageLimit.MAX_TEXT_LENGTH") characters after\
entities parsing.\
\
- [**parse\_mode**](#telegram.Bot.send_message.params.parse_mode) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Mode for parsing entities. See [`telegram.constants.ParseMode`](telegram.constants.html#telegram.constants.ParseMode "telegram.constants.ParseMode") and [formatting options](https://core.telegram.org/bots/api#formatting-options) for more details.\
\
- [**entities**](#telegram.Bot.send_message.params.entities) (Sequence\[ [`telegram.MessageEntity`](telegram.messageentity.html#telegram.MessageEntity "telegram.MessageEntity")\], optional) –\
\
Sequence of special\
entities that appear in message text, which can be specified instead of\
[`parse_mode`](#telegram.Bot.send_message.params.parse_mode "telegram.Bot.send_message").\
\
\
\
Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.\
\
- [**link\_preview\_options**](#telegram.Bot.send_message.params.link_preview_options) ( [`LinkPreviewOptions`](telegram.linkpreviewoptions.html#telegram.LinkPreviewOptions "telegram.LinkPreviewOptions"), optional) –\
\
Link preview generation\
options for the message. Mutually exclusive with\
[`disable_web_page_preview`](#telegram.Bot.send_message.params.disable_web_page_preview "telegram.Bot.send_message").\
\
\
\
Added in version 20.8.\
\
- [**disable\_notification**](#telegram.Bot.send_message.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.\
\
- [**protect\_content**](#telegram.Bot.send_message.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Protects the contents of the sent message from forwarding and saving.\
\
\
\
Added in version 13.10.\
\
- [**reply\_markup**](#telegram.Bot.send_message.params.reply_markup) ( [`InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup") \| [`ReplyKeyboardMarkup`](telegram.replykeyboardmarkup.html#telegram.ReplyKeyboardMarkup "telegram.ReplyKeyboardMarkup") \| [`ReplyKeyboardRemove`](telegram.replykeyboardremove.html#telegram.ReplyKeyboardRemove "telegram.ReplyKeyboardRemove") \| [`ForceReply`](telegram.forcereply.html#telegram.ForceReply "telegram.ForceReply"), optional) – Additional interface options. An object for an inline keyboard, custom reply\
keyboard, instructions to remove reply keyboard or to force a reply from the user.\
\
- [**message\_thread\_id**](#telegram.Bot.send_message.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.\
\
\
\
Added in version 20.0.\
\
- [**reply\_parameters**](#telegram.Bot.send_message.params.reply_parameters) ( [`telegram.ReplyParameters`](telegram.replyparameters.html#telegram.ReplyParameters "telegram.ReplyParameters"), optional) –\
\
Description of the message to reply to.\
\
\
\
Added in version 20.8.\
\
- [**business\_connection\_id**](#telegram.Bot.send_message.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message will be sent.\
\
\
\
Added in version 21.1.\
\
- [**message\_effect\_id**](#telegram.Bot.send_message.params.message_effect_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the message effect to be added to the message; for private chats only.\
\
\
\
Added in version 21.3.\
\
- [**allow\_paid\_broadcast**](#telegram.Bot.send_message.params.allow_paid_broadcast) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass True to allow up to [`1000`](telegram.constants.html#telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND "telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND") messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot’s balance.\
\
\
\
Added in version 21.7.\
\
\
Keyword Arguments:\
\
- [**allow\_sending\_without\_reply**](#telegram.Bot.send_message.params.allow_sending_without_reply) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the message should be sent even if the specified replied-to message is not found.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_message.params.reply_parameters "telegram.Bot.send_message"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_message.params.reply_parameters "telegram.Bot.send_message") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**reply\_to\_message\_id**](#telegram.Bot.send_message.params.reply_to_message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
If the message is a reply, ID of the original message.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_message.params.reply_parameters "telegram.Bot.send_message"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_message.params.reply_parameters "telegram.Bot.send_message") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**disable\_web\_page\_preview**](#telegram.Bot.send_message.params.disable_web_page_preview) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Disables link previews for links in\
this message. Convenience parameter for setting [`link_preview_options`](#telegram.Bot.send_message.params.link_preview_options "telegram.Bot.send_message").\
Mutually exclusive with [`link_preview_options`](#telegram.Bot.send_message.params.link_preview_options "telegram.Bot.send_message").\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`link_preview_options`](#telegram.Bot.send_message.params.link_preview_options "telegram.Bot.send_message") replacing this\
argument. PTB will automatically convert this argument to that one, but\
for advanced options, please use [`link_preview_options`](#telegram.Bot.send_message.params.link_preview_options "telegram.Bot.send_message") directly.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**read\_timeout**](#telegram.Bot.send_message.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.send_message.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.send_message.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.send_message.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.send_message.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the sent message is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
- [**ValueError**](https://docs.python.org/3/library/exceptions.html#ValueError "(in Python v3.13)") – If both [`disable_web_page_preview`](#telegram.Bot.send_message.params.disable_web_page_preview "telegram.Bot.send_message") and\
[`link_preview_options`](#telegram.Bot.send_message.params.link_preview_options "telegram.Bot.send_message") are passed.\
\
- [**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") – For other errors.\
\
\
_async_ send\_paid\_media( _chat\_id_, _star\_count_, _media_, _caption=None_, _parse\_mode=None_, _caption\_entities=None_, _show\_caption\_above\_media=None_, _disable\_notification=None_, _protect\_content=None_, _reply\_parameters=None_, _reply\_markup=None_, _business\_connection\_id=None_, _payload=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9429-L9536) [¶](#telegram.Bot.send_paid_media "Link to this definition")\
\
Use this method to send paid media.\
\
Shortcuts\
\
[`telegram.Message.reply_paid_media()`](telegram.message.html#telegram.Message.reply_paid_media "telegram.Message.reply_paid_media")\
\
Added in version 21.4.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.send_paid_media.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`). If the chat is a channel, all\
Telegram Star proceeds from this media will be credited to the chat’s balance.\
Otherwise, they will be credited to the bot’s balance.\
\
- [**star\_count**](#telegram.Bot.send_paid_media.params.star_count) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – The number of Telegram Stars that must be paid to buy access\
to the media; [`1`](telegram.constants.html#telegram.constants.InvoiceLimit.MIN_STAR_COUNT "telegram.constants.InvoiceLimit.MIN_STAR_COUNT") -\
[`2500`](telegram.constants.html#telegram.constants.InvoiceLimit.MAX_STAR_COUNT "telegram.constants.InvoiceLimit.MAX_STAR_COUNT").\
\
- [**media**](#telegram.Bot.send_paid_media.params.media) (Sequence\[ [`telegram.InputPaidMedia`](telegram.inputpaidmedia.html#telegram.InputPaidMedia "telegram.InputPaidMedia")\]) – A list describing the media to be\
sent; up to [`10`](telegram.constants.html#telegram.constants.MediaGroupLimit.MAX_MEDIA_LENGTH "telegram.constants.MediaGroupLimit.MAX_MEDIA_LENGTH") items.\
\
- [**payload**](#telegram.Bot.send_paid_media.params.payload) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Bot-defined paid media payload,\
0- [`128`](telegram.constants.html#telegram.constants.InvoiceLimit.MAX_PAYLOAD_LENGTH "telegram.constants.InvoiceLimit.MAX_PAYLOAD_LENGTH") bytes. This will\
not be displayed to the user, use it for your internal processes.\
\
Added in version 21.6.\
\
- [**caption**](#telegram.Bot.send_paid_media.params.caption) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Caption of the media to be sent,\
0- [`1024`](telegram.constants.html#telegram.constants.MessageLimit.CAPTION_LENGTH "telegram.constants.MessageLimit.CAPTION_LENGTH") characters.\
\
- [**parse\_mode**](#telegram.Bot.send_paid_media.params.parse_mode) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Mode for parsing entities. See [`telegram.constants.ParseMode`](telegram.constants.html#telegram.constants.ParseMode "telegram.constants.ParseMode") and [formatting options](https://core.telegram.org/bots/api#formatting-options) for more details.\
\
- [**caption\_entities**](#telegram.Bot.send_paid_media.params.caption_entities) (Sequence\[ [`telegram.MessageEntity`](telegram.messageentity.html#telegram.MessageEntity "telegram.MessageEntity")\], optional) – Sequence of special entities that appear in the caption, which can be specified instead of `parse_mode`.\
\
- [**show\_caption\_above\_media**](#telegram.Bot.send_paid_media.params.show_caption_above_media) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the caption must be shown above the message media.\
\
- [**disable\_notification**](#telegram.Bot.send_paid_media.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.\
\
- [**protect\_content**](#telegram.Bot.send_paid_media.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Protects the contents of the sent message from forwarding and saving.\
\
- [**reply\_parameters**](#telegram.Bot.send_paid_media.params.reply_parameters) ( [`telegram.ReplyParameters`](telegram.replyparameters.html#telegram.ReplyParameters "telegram.ReplyParameters"), optional) – Description of the message to reply to.\
\
- [**reply\_markup**](#telegram.Bot.send_paid_media.params.reply_markup) ( [`InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup") \| [`ReplyKeyboardMarkup`](telegram.replykeyboardmarkup.html#telegram.ReplyKeyboardMarkup "telegram.ReplyKeyboardMarkup") \| [`ReplyKeyboardRemove`](telegram.replykeyboardremove.html#telegram.ReplyKeyboardRemove "telegram.ReplyKeyboardRemove") \| [`ForceReply`](telegram.forcereply.html#telegram.ForceReply "telegram.ForceReply"), optional) – Additional interface options. An object for an inline keyboard, custom reply\
keyboard, instructions to remove reply keyboard or to force a reply from the user.\
\
- [**business\_connection\_id**](#telegram.Bot.send_paid_media.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message will be sent.\
\
\
\
Added in version 21.5.\
\
- [**allow\_paid\_broadcast**](#telegram.Bot.send_paid_media.params.allow_paid_broadcast) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass True to allow up to [`1000`](telegram.constants.html#telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND "telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND") messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot’s balance.\
\
\
\
Added in version 21.7.\
\
\
Keyword Arguments:\
\
- [**allow\_sending\_without\_reply**](#telegram.Bot.send_paid_media.params.allow_sending_without_reply) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the message should be sent even if the specified replied-to message is not found.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_paid_media.params.reply_parameters "telegram.Bot.send_paid_media"), which this is a convenience\
parameter for\
\
- [**reply\_to\_message\_id**](#telegram.Bot.send_paid_media.params.reply_to_message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – If the message is a reply, ID of the original message.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_paid_media.params.reply_parameters "telegram.Bot.send_paid_media"), which this is a convenience\
parameter for\
\
- [**read\_timeout**](#telegram.Bot.send_paid_media.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.send_paid_media.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.send_paid_media.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.send_paid_media.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.send_paid_media.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the sent message is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ send\_photo( _chat\_id_, _photo_, _caption=None_, _disable\_notification=None_, _reply\_markup=None_, _parse\_mode=None_, _caption\_entities=None_, _protect\_content=None_, _message\_thread\_id=None_, _has\_spoiler=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _show\_caption\_above\_media=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _filename=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L1268-L1419) [¶](#telegram.Bot.send_photo "Link to this definition")\
\
Use this method to send photos.\
\
Shortcuts\
\
- [`telegram.Message.reply_photo()`](telegram.message.html#telegram.Message.reply_photo "telegram.Message.reply_photo")\
\
- [`telegram.User.send_photo()`](telegram.user.html#telegram.User.send_photo "telegram.User.send_photo")\
\
\
See also\
\
[Working with Files and Media](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Working-with-Files-and-Media)\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.send_photo.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**photo**](#telegram.Bot.send_photo.params.photo) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)") \| [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") \| [`InputFile`](telegram.inputfile.html#telegram.InputFile "telegram.InputFile") \| [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") \| [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") \| [`telegram.PhotoSize`](telegram.photosize.html#telegram.PhotoSize "telegram.PhotoSize")) –\
\
Photo to send.\
Pass a `file_id` as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one. To upload a file, you can either pass a [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") (e.g. `open("filename", "rb")`), the file contents as bytes or the path of the file (as string or [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") object). In the latter case, the file contents will either be read as bytes or the file path will be passed to Telegram, depending on the [`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot") setting.\
Lastly you can pass an existing [`telegram.PhotoSize`](telegram.photosize.html#telegram.PhotoSize "telegram.PhotoSize") object to send.\
\
\
\
Caution\
\
\
\
- The photo must be at most 10MB in size.\
\
- The photo’s width and height must not exceed 10000 in total.\
\
- Width and height ratio must be at most 20.\
\
\
Changed in version 13.2: Accept [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") as input.\
\
Changed in version 20.0: File paths as input is also accepted for bots _not_ running in\
[`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot").\
\
- [**caption**](#telegram.Bot.send_photo.params.caption) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Photo caption (may also be used when resending photos\
by file\_id), 0- [`1024`](telegram.constants.html#telegram.constants.MessageLimit.CAPTION_LENGTH "telegram.constants.MessageLimit.CAPTION_LENGTH")\
characters after entities parsing.\
\
- [**parse\_mode**](#telegram.Bot.send_photo.params.parse_mode) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Mode for parsing entities. See [`telegram.constants.ParseMode`](telegram.constants.html#telegram.constants.ParseMode "telegram.constants.ParseMode") and [formatting options](https://core.telegram.org/bots/api#formatting-options) for more details.\
\
- [**caption\_entities**](#telegram.Bot.send_photo.params.caption_entities) (Sequence\[ [`telegram.MessageEntity`](telegram.messageentity.html#telegram.MessageEntity "telegram.MessageEntity")\], optional) –\
\
Sequence of special entities that appear in the caption, which can be specified instead of `parse_mode`.\
\
\
\
Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.\
\
- [**disable\_notification**](#telegram.Bot.send_photo.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.\
\
- [**protect\_content**](#telegram.Bot.send_photo.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Protects the contents of the sent message from forwarding and saving.\
\
\
\
Added in version 13.10.\
\
- [**message\_thread\_id**](#telegram.Bot.send_photo.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.\
\
\
\
Added in version 20.0.\
\
- [**reply\_markup**](#telegram.Bot.send_photo.params.reply_markup) ( [`InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup") \| [`ReplyKeyboardMarkup`](telegram.replykeyboardmarkup.html#telegram.ReplyKeyboardMarkup "telegram.ReplyKeyboardMarkup") \| [`ReplyKeyboardRemove`](telegram.replykeyboardremove.html#telegram.ReplyKeyboardRemove "telegram.ReplyKeyboardRemove") \| [`ForceReply`](telegram.forcereply.html#telegram.ForceReply "telegram.ForceReply"), optional) – Additional interface options. An object for an inline keyboard, custom reply\
keyboard, instructions to remove reply keyboard or to force a reply from the user.\
\
- [**has\_spoiler**](#telegram.Bot.send_photo.params.has_spoiler) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") if the photo needs to be covered\
with a spoiler animation.\
\
\
\
Added in version 20.0.\
\
- [**reply\_parameters**](#telegram.Bot.send_photo.params.reply_parameters) ( [`telegram.ReplyParameters`](telegram.replyparameters.html#telegram.ReplyParameters "telegram.ReplyParameters"), optional) –\
\
Description of the message to reply to.\
\
\
\
Added in version 20.8.\
\
- [**business\_connection\_id**](#telegram.Bot.send_photo.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message will be sent.\
\
\
\
Added in version 21.1.\
\
- [**message\_effect\_id**](#telegram.Bot.send_photo.params.message_effect_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the message effect to be added to the message; for private chats only.\
\
\
\
Added in version 21.3.\
\
- [**allow\_paid\_broadcast**](#telegram.Bot.send_photo.params.allow_paid_broadcast) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass True to allow up to [`1000`](telegram.constants.html#telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND "telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND") messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot’s balance.\
\
\
\
Added in version 21.7.\
\
- [**show\_caption\_above\_media**](#telegram.Bot.send_photo.params.show_caption_above_media) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the caption must be shown above the message media.\
\
\
\
Added in version 21.3.\
\
\
Keyword Arguments:\
\
- [**allow\_sending\_without\_reply**](#telegram.Bot.send_photo.params.allow_sending_without_reply) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the message should be sent even if the specified replied-to message is not found.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_photo.params.reply_parameters "telegram.Bot.send_photo"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_photo.params.reply_parameters "telegram.Bot.send_photo") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**reply\_to\_message\_id**](#telegram.Bot.send_photo.params.reply_to_message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
If the message is a reply, ID of the original message.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_photo.params.reply_parameters "telegram.Bot.send_photo"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_photo.params.reply_parameters "telegram.Bot.send_photo") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**filename**](#telegram.Bot.send_photo.params.filename) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Custom file name for the photo, when uploading a\
new file. Convenience parameter, useful e.g. when sending files generated by the\
[`tempfile`](https://docs.python.org/3/library/tempfile.html#module-tempfile "(in Python v3.13)") module.\
\
\
\
Added in version 13.1.\
\
- [**read\_timeout**](#telegram.Bot.send_photo.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.send_photo.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) –\
\
Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). By default, `20` seconds are used as write timeout.\
\
\
\
Deprecated since version 20.7: In future versions, the default value will be changed to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.send_photo.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.send_photo.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.send_photo.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the sent Message is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ send\_poll( _chat\_id_, _question_, _options_, _is\_anonymous=None_, _type=None_, _allows\_multiple\_answers=None_, _correct\_option\_id=None_, _is\_closed=None_, _disable\_notification=None_, _reply\_markup=None_, _explanation=None_, _explanation\_parse\_mode=None_, _open\_period=None_, _close\_date=None_, _explanation\_entities=None_, _protect\_content=None_, _message\_thread\_id=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _question\_parse\_mode=None_, _question\_entities=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7147-L7338) [¶](#telegram.Bot.send_poll "Link to this definition")\
\
Use this method to send a native poll.\
\
Shortcuts\
\
- [`telegram.Message.reply_poll()`](telegram.message.html#telegram.Message.reply_poll "telegram.Message.reply_poll")\
\
- [`telegram.User.send_poll()`](telegram.user.html#telegram.User.send_poll "telegram.User.send_poll")\
\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.send_poll.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**question**](#telegram.Bot.send_poll.params.question) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Poll question, [`1`](telegram.poll.html#telegram.Poll.MIN_QUESTION_LENGTH "telegram.Poll.MIN_QUESTION_LENGTH")-\
[`300`](telegram.poll.html#telegram.Poll.MAX_QUESTION_LENGTH "telegram.Poll.MAX_QUESTION_LENGTH") characters.\
\
- [**options**](#telegram.Bot.send_poll.params.options) (Sequence\[ [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)") \| [`telegram.InputPollOption`](telegram.inputpolloption.html#telegram.InputPollOption "telegram.InputPollOption")\]) –\
\
Sequence of\
[`2`](telegram.poll.html#telegram.Poll.MIN_OPTION_NUMBER "telegram.Poll.MIN_OPTION_NUMBER")-\
[`10`](telegram.poll.html#telegram.Poll.MAX_OPTION_NUMBER "telegram.Poll.MAX_OPTION_NUMBER") answer options. Each option may either\
be a string with\
[`1`](telegram.poll.html#telegram.Poll.MIN_OPTION_LENGTH "telegram.Poll.MIN_OPTION_LENGTH")-\
[`100`](telegram.poll.html#telegram.Poll.MAX_OPTION_LENGTH "telegram.Poll.MAX_OPTION_LENGTH") characters or an\
[`InputPollOption`](telegram.inputpolloption.html#telegram.InputPollOption "telegram.InputPollOption") object. Strings are converted to\
[`InputPollOption`](telegram.inputpolloption.html#telegram.InputPollOption "telegram.InputPollOption") objects automatically.\
\
\
\
Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.\
\
\
\
\
\
Changed in version 21.2: Bot API 7.3 adds support for [`InputPollOption`](telegram.inputpolloption.html#telegram.InputPollOption "telegram.InputPollOption") objects.\
\
- [**is\_anonymous**](#telegram.Bot.send_poll.params.is_anonymous) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the poll needs to be anonymous,\
defaults to [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)").\
\
- [**type**](#telegram.Bot.send_poll.params.type) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Poll type, [`'quiz'`](telegram.poll.html#telegram.Poll.QUIZ "telegram.Poll.QUIZ") or\
[`'regular'`](telegram.poll.html#telegram.Poll.REGULAR "telegram.Poll.REGULAR"), defaults to [`'regular'`](telegram.poll.html#telegram.Poll.REGULAR "telegram.Poll.REGULAR").\
\
- [**allows\_multiple\_answers**](#telegram.Bot.send_poll.params.allows_multiple_answers) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the poll allows\
multiple answers, ignored for polls in quiz mode, defaults to [`False`](https://docs.python.org/3/library/constants.html#False "(in Python v3.13)").\
\
- [**correct\_option\_id**](#telegram.Bot.send_poll.params.correct_option_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – 0-based identifier of the correct answer\
option, required for polls in quiz mode.\
\
- [**explanation**](#telegram.Bot.send_poll.params.explanation) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Text that is shown when a user chooses an incorrect\
answer or taps on the lamp icon in a quiz-style poll,\
0- [`200`](telegram.poll.html#telegram.Poll.MAX_EXPLANATION_LENGTH "telegram.Poll.MAX_EXPLANATION_LENGTH") characters with at most\
[`2`](telegram.poll.html#telegram.Poll.MAX_EXPLANATION_LINE_FEEDS "telegram.Poll.MAX_EXPLANATION_LINE_FEEDS") line feeds after entities\
parsing.\
\
- [**explanation\_parse\_mode**](#telegram.Bot.send_poll.params.explanation_parse_mode) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Mode for parsing entities in the\
explanation. See the constants in [`telegram.constants.ParseMode`](telegram.constants.html#telegram.constants.ParseMode "telegram.constants.ParseMode") for the\
available modes.\
\
- [**explanation\_entities**](#telegram.Bot.send_poll.params.explanation_entities) (Sequence\[ [`telegram.MessageEntity`](telegram.messageentity.html#telegram.MessageEntity "telegram.MessageEntity")\], optional) –\
\
Sequence of\
special entities that appear in message text, which can be specified instead of\
[`explanation_parse_mode`](#telegram.Bot.send_poll.params.explanation_parse_mode "telegram.Bot.send_poll").\
\
\
\
Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.\
\
- [**open\_period**](#telegram.Bot.send_poll.params.open_period) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Amount of time in seconds the poll will be active\
after creation, [`5`](telegram.poll.html#telegram.Poll.MIN_OPEN_PERIOD "telegram.Poll.MIN_OPEN_PERIOD")-\
[`600`](telegram.poll.html#telegram.Poll.MAX_OPEN_PERIOD "telegram.Poll.MAX_OPEN_PERIOD"). Can’t be used together with\
[`close_date`](#telegram.Bot.send_poll.params.close_date "telegram.Bot.send_poll").\
\
- [**close\_date**](#telegram.Bot.send_poll.params.close_date) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`datetime.datetime`](https://docs.python.org/3/library/datetime.html#datetime.datetime "(in Python v3.13)"), optional) – Point in time (Unix\
timestamp) when the poll will be automatically closed. Must be at least\
[`5`](telegram.poll.html#telegram.Poll.MIN_OPEN_PERIOD "telegram.Poll.MIN_OPEN_PERIOD") and no more than\
[`600`](telegram.poll.html#telegram.Poll.MAX_OPEN_PERIOD "telegram.Poll.MAX_OPEN_PERIOD") seconds in the future.\
Can’t be used together with [`open_period`](#telegram.Bot.send_poll.params.open_period "telegram.Bot.send_poll").\
For timezone naive [`datetime.datetime`](https://docs.python.org/3/library/datetime.html#datetime.datetime "(in Python v3.13)") objects, the default timezone of the bot will be used, which is UTC unless [`telegram.ext.Defaults.tzinfo`](telegram.ext.defaults.html#telegram.ext.Defaults.tzinfo "telegram.ext.Defaults.tzinfo") is used.\
\
- [**is\_closed**](#telegram.Bot.send_poll.params.is_closed) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the poll needs to be\
immediately closed. This can be useful for poll preview.\
\
- [**disable\_notification**](#telegram.Bot.send_poll.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.\
\
- [**protect\_content**](#telegram.Bot.send_poll.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Protects the contents of the sent message from forwarding and saving.\
\
\
\
Added in version 13.10.\
\
- [**message\_thread\_id**](#telegram.Bot.send_poll.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.\
\
\
\
Added in version 20.0.\
\
- [**reply\_markup**](#telegram.Bot.send_poll.params.reply_markup) ( [`InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup") \| [`ReplyKeyboardMarkup`](telegram.replykeyboardmarkup.html#telegram.ReplyKeyboardMarkup "telegram.ReplyKeyboardMarkup") \| [`ReplyKeyboardRemove`](telegram.replykeyboardremove.html#telegram.ReplyKeyboardRemove "telegram.ReplyKeyboardRemove") \| [`ForceReply`](telegram.forcereply.html#telegram.ForceReply "telegram.ForceReply"), optional) – Additional interface options. An object for an inline keyboard, custom reply\
keyboard, instructions to remove reply keyboard or to force a reply from the user.\
\
- [**reply\_parameters**](#telegram.Bot.send_poll.params.reply_parameters) ( [`telegram.ReplyParameters`](telegram.replyparameters.html#telegram.ReplyParameters "telegram.ReplyParameters"), optional) –\
\
Description of the message to reply to.\
\
\
\
Added in version 20.8.\
\
- [**business\_connection\_id**](#telegram.Bot.send_poll.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message will be sent.\
\
\
\
Added in version 21.1.\
\
- [**question\_parse\_mode**](#telegram.Bot.send_poll.params.question_parse_mode) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Mode for parsing entities in the question.\
See the constants in [`telegram.constants.ParseMode`](telegram.constants.html#telegram.constants.ParseMode "telegram.constants.ParseMode") for the available modes.\
Currently, only custom emoji entities are allowed.\
\
\
\
Added in version 21.2.\
\
- [**question\_entities**](#telegram.Bot.send_poll.params.question_entities) (Sequence\[ [`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\], optional) –\
\
Special entities\
that appear in the poll [`question`](#telegram.Bot.send_poll.params.question "telegram.Bot.send_poll"). It can be specified instead of\
[`question_parse_mode`](#telegram.Bot.send_poll.params.question_parse_mode "telegram.Bot.send_poll").\
\
\
\
Added in version 21.2.\
\
- [**message\_effect\_id**](#telegram.Bot.send_poll.params.message_effect_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the message effect to be added to the message; for private chats only.\
\
\
\
Added in version 21.3.\
\
- [**allow\_paid\_broadcast**](#telegram.Bot.send_poll.params.allow_paid_broadcast) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass True to allow up to [`1000`](telegram.constants.html#telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND "telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND") messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot’s balance.\
\
\
\
Added in version 21.7.\
\
\
Keyword Arguments:\
\
- [**allow\_sending\_without\_reply**](#telegram.Bot.send_poll.params.allow_sending_without_reply) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the message should be sent even if the specified replied-to message is not found.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_poll.params.reply_parameters "telegram.Bot.send_poll"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_poll.params.reply_parameters "telegram.Bot.send_poll") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**reply\_to\_message\_id**](#telegram.Bot.send_poll.params.reply_to_message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
If the message is a reply, ID of the original message.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_poll.params.reply_parameters "telegram.Bot.send_poll"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_poll.params.reply_parameters "telegram.Bot.send_poll") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**read\_timeout**](#telegram.Bot.send_poll.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.send_poll.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.send_poll.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.send_poll.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.send_poll.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the sent Message is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ send\_sticker( _chat\_id_, _sticker_, _disable\_notification=None_, _reply\_markup=None_, _protect\_content=None_, _message\_thread\_id=None_, _emoji=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L1737-L1859) [¶](#telegram.Bot.send_sticker "Link to this definition")\
\
Use this method to send static `.WEBP`, animated `.TGS`, or video `.WEBM` stickers.\
\
Shortcuts\
\
- [`telegram.Message.reply_sticker()`](telegram.message.html#telegram.Message.reply_sticker "telegram.Message.reply_sticker")\
\
- [`telegram.User.send_sticker()`](telegram.user.html#telegram.User.send_sticker "telegram.User.send_sticker")\
\
\
See also\
\
[Working with Files and Media](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Working-with-Files-and-Media)\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.send_sticker.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**sticker**](#telegram.Bot.send_sticker.params.sticker) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)") \| [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") \| [`InputFile`](telegram.inputfile.html#telegram.InputFile "telegram.InputFile") \| [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") \| [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") \| [`telegram.Sticker`](telegram.sticker.html#telegram.Sticker "telegram.Sticker")) –\
\
Sticker to send.\
Pass a `file_id` as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one. To upload a file, you can either pass a [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") (e.g. `open("filename", "rb")`), the file contents as bytes or the path of the file (as string or [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") object). In the latter case, the file contents will either be read as bytes or the file path will be passed to Telegram, depending on the [`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot") setting. Video stickers can only be sent by a `file_id`. Video and animated\
stickers can’t be sent via an HTTP URL.\
\
Lastly you can pass an existing [`telegram.Sticker`](telegram.sticker.html#telegram.Sticker "telegram.Sticker") object to send.\
\
\
\
Changed in version 13.2: Accept [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") as input.\
\
\
\
\
\
Changed in version 20.0: File paths as input is also accepted for bots _not_ running in\
[`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot").\
\
- [**emoji**](#telegram.Bot.send_sticker.params.emoji) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Emoji associated with the sticker; only for just\
uploaded stickers\
\
\
\
Added in version 20.2.\
\
- [**disable\_notification**](#telegram.Bot.send_sticker.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.\
\
- [**protect\_content**](#telegram.Bot.send_sticker.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Protects the contents of the sent message from forwarding and saving.\
\
\
\
Added in version 13.10.\
\
- [**message\_thread\_id**](#telegram.Bot.send_sticker.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.\
\
\
\
Added in version 20.0.\
\
- [**reply\_markup**](#telegram.Bot.send_sticker.params.reply_markup) ( [`InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup") \| [`ReplyKeyboardMarkup`](telegram.replykeyboardmarkup.html#telegram.ReplyKeyboardMarkup "telegram.ReplyKeyboardMarkup") \| [`ReplyKeyboardRemove`](telegram.replykeyboardremove.html#telegram.ReplyKeyboardRemove "telegram.ReplyKeyboardRemove") \| [`ForceReply`](telegram.forcereply.html#telegram.ForceReply "telegram.ForceReply"), optional) – Additional interface options. An object for an inline keyboard, custom reply\
keyboard, instructions to remove reply keyboard or to force a reply from the user.\
\
- [**reply\_parameters**](#telegram.Bot.send_sticker.params.reply_parameters) ( [`telegram.ReplyParameters`](telegram.replyparameters.html#telegram.ReplyParameters "telegram.ReplyParameters"), optional) –\
\
Description of the message to reply to.\
\
\
\
Added in version 20.8.\
\
- [**business\_connection\_id**](#telegram.Bot.send_sticker.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message will be sent.\
\
\
\
Added in version 21.1.\
\
- [**message\_effect\_id**](#telegram.Bot.send_sticker.params.message_effect_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the message effect to be added to the message; for private chats only.\
\
\
\
Added in version 21.3.\
\
- [**allow\_paid\_broadcast**](#telegram.Bot.send_sticker.params.allow_paid_broadcast) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass True to allow up to [`1000`](telegram.constants.html#telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND "telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND") messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot’s balance.\
\
\
\
Added in version 21.7.\
\
\
Keyword Arguments:\
\
- [**allow\_sending\_without\_reply**](#telegram.Bot.send_sticker.params.allow_sending_without_reply) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the message should be sent even if the specified replied-to message is not found.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_sticker.params.reply_parameters "telegram.Bot.send_sticker"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_sticker.params.reply_parameters "telegram.Bot.send_sticker") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**reply\_to\_message\_id**](#telegram.Bot.send_sticker.params.reply_to_message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
If the message is a reply, ID of the original message.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_sticker.params.reply_parameters "telegram.Bot.send_sticker"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_sticker.params.reply_parameters "telegram.Bot.send_sticker") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**read\_timeout**](#telegram.Bot.send_sticker.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.send_sticker.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) –\
\
Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). By default, `20` seconds are used as write timeout.\
\
\
\
Deprecated since version 20.7: In future versions, the default value will be changed to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.send_sticker.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.send_sticker.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.send_sticker.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the sent Message is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ send\_venue( _chat\_id_, _latitude=None_, _longitude=None_, _title=None_, _address=None_, _foursquare\_id=None_, _disable\_notification=None_, _reply\_markup=None_, _foursquare\_type=None_, _google\_place\_id=None_, _google\_place\_type=None_, _protect\_content=None_, _message\_thread\_id=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _venue=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3002-L3162) [¶](#telegram.Bot.send_venue "Link to this definition")\
\
Use this method to send information about a venue.\
\
Note\
\
- You can either supply [`venue`](#telegram.Bot.send_venue.params.venue "telegram.Bot.send_venue"), or [`latitude`](#telegram.Bot.send_venue.params.latitude "telegram.Bot.send_venue"),\
[`longitude`](#telegram.Bot.send_venue.params.longitude "telegram.Bot.send_venue"), [`title`](#telegram.Bot.send_venue.params.title "telegram.Bot.send_venue") and [`address`](#telegram.Bot.send_venue.params.address "telegram.Bot.send_venue") and optionally\
[`foursquare_id`](#telegram.Bot.send_venue.params.foursquare_id "telegram.Bot.send_venue") and [`foursquare_type`](#telegram.Bot.send_venue.params.foursquare_type "telegram.Bot.send_venue") or optionally\
[`google_place_id`](#telegram.Bot.send_venue.params.google_place_id "telegram.Bot.send_venue") and [`google_place_type`](#telegram.Bot.send_venue.params.google_place_type "telegram.Bot.send_venue").\
\
- Foursquare details and Google Place details are mutually exclusive. However, this\
behaviour is undocumented and might be changed by Telegram.\
\
\
Shortcuts\
\
- [`telegram.Message.reply_venue()`](telegram.message.html#telegram.Message.reply_venue "telegram.Message.reply_venue")\
\
- [`telegram.User.send_venue()`](telegram.user.html#telegram.User.send_venue "telegram.User.send_venue")\
\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.send_venue.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**latitude**](#telegram.Bot.send_venue.params.latitude) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)"), optional) – Latitude of venue.\
\
- [**longitude**](#telegram.Bot.send_venue.params.longitude) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)"), optional) – Longitude of venue.\
\
- [**title**](#telegram.Bot.send_venue.params.title) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Name of the venue.\
\
- [**address**](#telegram.Bot.send_venue.params.address) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Address of the venue.\
\
- [**foursquare\_id**](#telegram.Bot.send_venue.params.foursquare_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Foursquare identifier of the venue.\
\
- [**foursquare\_type**](#telegram.Bot.send_venue.params.foursquare_type) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Foursquare type of the venue, if known.\
(For example, “arts\_entertainment/default”, “arts\_entertainment/aquarium” or\
“food/icecream”.)\
\
- [**google\_place\_id**](#telegram.Bot.send_venue.params.google_place_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Google Places identifier of the venue.\
\
- [**google\_place\_type**](#telegram.Bot.send_venue.params.google_place_type) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Google Places type of the venue. (See\
[supported types](https://developers.google.com/maps/documentation/places/web-service/supported_types).)\
\
- [**disable\_notification**](#telegram.Bot.send_venue.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.\
\
- [**protect\_content**](#telegram.Bot.send_venue.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Protects the contents of the sent message from forwarding and saving.\
\
\
\
Added in version 13.10.\
\
- [**message\_thread\_id**](#telegram.Bot.send_venue.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.\
\
\
\
Added in version 20.0.\
\
- [**reply\_markup**](#telegram.Bot.send_venue.params.reply_markup) ( [`InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup") \| [`ReplyKeyboardMarkup`](telegram.replykeyboardmarkup.html#telegram.ReplyKeyboardMarkup "telegram.ReplyKeyboardMarkup") \| [`ReplyKeyboardRemove`](telegram.replykeyboardremove.html#telegram.ReplyKeyboardRemove "telegram.ReplyKeyboardRemove") \| [`ForceReply`](telegram.forcereply.html#telegram.ForceReply "telegram.ForceReply"), optional) – Additional interface options. An object for an inline keyboard, custom reply\
keyboard, instructions to remove reply keyboard or to force a reply from the user.\
\
- [**reply\_parameters**](#telegram.Bot.send_venue.params.reply_parameters) ( [`telegram.ReplyParameters`](telegram.replyparameters.html#telegram.ReplyParameters "telegram.ReplyParameters"), optional) –\
\
Description of the message to reply to.\
\
\
\
Added in version 20.8.\
\
- [**business\_connection\_id**](#telegram.Bot.send_venue.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message will be sent.\
\
\
\
Added in version 21.1.\
\
- [**message\_effect\_id**](#telegram.Bot.send_venue.params.message_effect_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the message effect to be added to the message; for private chats only.\
\
\
\
Added in version 21.3.\
\
- [**allow\_paid\_broadcast**](#telegram.Bot.send_venue.params.allow_paid_broadcast) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass True to allow up to [`1000`](telegram.constants.html#telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND "telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND") messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot’s balance.\
\
\
\
Added in version 21.7.\
\
\
Keyword Arguments:\
\
- [**allow\_sending\_without\_reply**](#telegram.Bot.send_venue.params.allow_sending_without_reply) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the message should be sent even if the specified replied-to message is not found.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_venue.params.reply_parameters "telegram.Bot.send_venue"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_venue.params.reply_parameters "telegram.Bot.send_venue") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**reply\_to\_message\_id**](#telegram.Bot.send_venue.params.reply_to_message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
If the message is a reply, ID of the original message.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_venue.params.reply_parameters "telegram.Bot.send_venue"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_venue.params.reply_parameters "telegram.Bot.send_venue") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**venue**](#telegram.Bot.send_venue.params.venue) ( [`telegram.Venue`](telegram.venue.html#telegram.Venue "telegram.Venue"), optional) – The venue to send.\
\
- [**read\_timeout**](#telegram.Bot.send_venue.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.send_venue.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.send_venue.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.send_venue.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.send_venue.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the sent Message is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ send\_video( _chat\_id_, _video_, _duration=None_, _caption=None_, _disable\_notification=None_, _reply\_markup=None_, _width=None_, _height=None_, _parse\_mode=None_, _supports\_streaming=None_, _caption\_entities=None_, _protect\_content=None_, _message\_thread\_id=None_, _has\_spoiler=None_, _thumbnail=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _show\_caption\_above\_media=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _filename=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L1860-L2038) [¶](#telegram.Bot.send_video "Link to this definition")\
\
Use this method to send video files, Telegram clients support mp4 videos\
(other formats may be sent as Document).\
\
Bots can currently send video files of up to\
[`50 MB`](telegram.constants.html#telegram.constants.FileSizeLimit.FILESIZE_UPLOAD "telegram.constants.FileSizeLimit.FILESIZE_UPLOAD") in size, this limit may be\
changed in the future.\
\
Note\
\
[`thumbnail`](#telegram.Bot.send_video.params.thumbnail "telegram.Bot.send_video") will be ignored for small video files, for which Telegram can\
easily generate thumbnails. However, this behaviour is undocumented and might be\
changed by Telegram.\
\
Shortcuts\
\
- [`telegram.Message.reply_video()`](telegram.message.html#telegram.Message.reply_video "telegram.Message.reply_video")\
\
- [`telegram.User.send_video()`](telegram.user.html#telegram.User.send_video "telegram.User.send_video")\
\
\
See also\
\
[Working with Files and Media](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Working-with-Files-and-Media)\
\
Changed in version 20.5: Removed deprecated argument `thumb`. Use\
`thumbnail` instead.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.send_video.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**video**](#telegram.Bot.send_video.params.video) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)") \| [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") \| [`InputFile`](telegram.inputfile.html#telegram.InputFile "telegram.InputFile") \| [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") \| [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") \| [`telegram.Video`](telegram.video.html#telegram.Video "telegram.Video")) –\
\
Video file to send.\
Pass a `file_id` as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one. To upload a file, you can either pass a [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") (e.g. `open("filename", "rb")`), the file contents as bytes or the path of the file (as string or [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") object). In the latter case, the file contents will either be read as bytes or the file path will be passed to Telegram, depending on the [`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot") setting.\
Lastly you can pass an existing [`telegram.Video`](telegram.video.html#telegram.Video "telegram.Video") object to send.\
\
\
\
Changed in version 13.2: Accept [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") as input.\
\
\
\
\
\
Changed in version 20.0: File paths as input is also accepted for bots _not_ running in\
[`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot").\
\
- [**duration**](#telegram.Bot.send_video.params.duration) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Duration of sent video in seconds.\
\
- [**width**](#telegram.Bot.send_video.params.width) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Video width.\
\
- [**height**](#telegram.Bot.send_video.params.height) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Video height.\
\
- [**caption**](#telegram.Bot.send_video.params.caption) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Video caption (may also be used when resending videos\
by file\_id), 0- [`1024`](telegram.constants.html#telegram.constants.MessageLimit.CAPTION_LENGTH "telegram.constants.MessageLimit.CAPTION_LENGTH")\
characters after entities parsing.\
\
- [**parse\_mode**](#telegram.Bot.send_video.params.parse_mode) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Mode for parsing entities. See [`telegram.constants.ParseMode`](telegram.constants.html#telegram.constants.ParseMode "telegram.constants.ParseMode") and [formatting options](https://core.telegram.org/bots/api#formatting-options) for more details.\
\
- [**caption\_entities**](#telegram.Bot.send_video.params.caption_entities) (Sequence\[ [`telegram.MessageEntity`](telegram.messageentity.html#telegram.MessageEntity "telegram.MessageEntity")\], optional) –\
\
Sequence of special entities that appear in the caption, which can be specified instead of `parse_mode`.\
\
\
\
Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.\
\
- [**supports\_streaming**](#telegram.Bot.send_video.params.supports_streaming) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the uploaded video is\
suitable for streaming.\
\
- [**disable\_notification**](#telegram.Bot.send_video.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.\
\
- [**protect\_content**](#telegram.Bot.send_video.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Protects the contents of the sent message from forwarding and saving.\
\
\
\
Added in version 13.10.\
\
- [**message\_thread\_id**](#telegram.Bot.send_video.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.\
\
\
\
Added in version 20.0.\
\
- [**reply\_markup**](#telegram.Bot.send_video.params.reply_markup) ( [`InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup") \| [`ReplyKeyboardMarkup`](telegram.replykeyboardmarkup.html#telegram.ReplyKeyboardMarkup "telegram.ReplyKeyboardMarkup") \| [`ReplyKeyboardRemove`](telegram.replykeyboardremove.html#telegram.ReplyKeyboardRemove "telegram.ReplyKeyboardRemove") \| [`ForceReply`](telegram.forcereply.html#telegram.ForceReply "telegram.ForceReply"), optional) – Additional interface options. An object for an inline keyboard, custom reply\
keyboard, instructions to remove reply keyboard or to force a reply from the user.\
\
- [**has\_spoiler**](#telegram.Bot.send_video.params.has_spoiler) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") if the video needs to be covered\
with a spoiler animation.\
\
\
\
Added in version 20.0.\
\
- [**thumbnail**](#telegram.Bot.send_video.params.thumbnail) ( [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") \| [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") \| [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail’s width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can’t be reused and can be only uploaded as a new file. To upload a file, you can either pass a [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") (e.g. `open("filename", "rb")`), the file contents as bytes or the path of the file (as string or [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") object). In the latter case, the file contents will either be read as bytes or the file path will be passed to Telegram, depending on the [`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot") setting.\
\
\
\
Added in version 20.2.\
\
- [**reply\_parameters**](#telegram.Bot.send_video.params.reply_parameters) ( [`telegram.ReplyParameters`](telegram.replyparameters.html#telegram.ReplyParameters "telegram.ReplyParameters"), optional) –\
\
Description of the message to reply to.\
\
\
\
Added in version 20.8.\
\
- [**business\_connection\_id**](#telegram.Bot.send_video.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message will be sent.\
\
\
\
Added in version 21.1.\
\
- [**message\_effect\_id**](#telegram.Bot.send_video.params.message_effect_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the message effect to be added to the message; for private chats only.\
\
\
\
Added in version 21.3.\
\
- [**allow\_paid\_broadcast**](#telegram.Bot.send_video.params.allow_paid_broadcast) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass True to allow up to [`1000`](telegram.constants.html#telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND "telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND") messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot’s balance.\
\
\
\
Added in version 21.7.\
\
- [**show\_caption\_above\_media**](#telegram.Bot.send_video.params.show_caption_above_media) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the caption must be shown above the message media.\
\
\
\
Added in version 21.3.\
\
\
Keyword Arguments:\
\
- [**allow\_sending\_without\_reply**](#telegram.Bot.send_video.params.allow_sending_without_reply) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the message should be sent even if the specified replied-to message is not found.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_video.params.reply_parameters "telegram.Bot.send_video"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_video.params.reply_parameters "telegram.Bot.send_video") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**reply\_to\_message\_id**](#telegram.Bot.send_video.params.reply_to_message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
If the message is a reply, ID of the original message.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_video.params.reply_parameters "telegram.Bot.send_video"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_video.params.reply_parameters "telegram.Bot.send_video") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**filename**](#telegram.Bot.send_video.params.filename) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Custom file name for the video, when uploading a\
new file. Convenience parameter, useful e.g. when sending files generated by the\
[`tempfile`](https://docs.python.org/3/library/tempfile.html#module-tempfile "(in Python v3.13)") module.\
\
\
\
Added in version 13.1.\
\
- [**read\_timeout**](#telegram.Bot.send_video.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.send_video.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) –\
\
Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). By default, `20` seconds are used as write timeout.\
\
\
\
Deprecated since version 20.7: In future versions, the default value will be changed to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.send_video.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.send_video.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.send_video.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the sent Message is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ send\_video\_note( _chat\_id_, _video\_note_, _duration=None_, _length=None_, _disable\_notification=None_, _reply\_markup=None_, _protect\_content=None_, _message\_thread\_id=None_, _thumbnail=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _filename=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L2039-L2186) [¶](#telegram.Bot.send_video_note "Link to this definition")\
\
As of v.4.0, Telegram clients support rounded square mp4 videos of up to 1 minute long.\
Use this method to send video messages.\
\
Note\
\
[`thumbnail`](#telegram.Bot.send_video_note.params.thumbnail "telegram.Bot.send_video_note") will be ignored for small video files, for which Telegram can\
easily generate thumbnails. However, this behaviour is undocumented and might be\
changed by Telegram.\
\
Shortcuts\
\
- [`telegram.Message.reply_video_note()`](telegram.message.html#telegram.Message.reply_video_note "telegram.Message.reply_video_note")\
\
- [`telegram.User.send_video_note()`](telegram.user.html#telegram.User.send_video_note "telegram.User.send_video_note")\
\
\
See also\
\
[Working with Files and Media](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Working-with-Files-and-Media)\
\
Changed in version 20.5: Removed deprecated argument `thumb`. Use\
`thumbnail` instead.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.send_video_note.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**video\_note**](#telegram.Bot.send_video_note.params.video_note) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)") \| [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") \| [`InputFile`](telegram.inputfile.html#telegram.InputFile "telegram.InputFile") \| [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") \| [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") \| [`telegram.VideoNote`](telegram.videonote.html#telegram.VideoNote "telegram.VideoNote")) –\
\
Video note\
to send.\
Pass a file\_id as String to send a video note that exists on the Telegram\
servers (recommended) or upload a new video using multipart/form-data.\
To upload a file, you can either pass a [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") (e.g. `open("filename", "rb")`), the file contents as bytes or the path of the file (as string or [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") object). In the latter case, the file contents will either be read as bytes or the file path will be passed to Telegram, depending on the [`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot") setting.\
Lastly you can pass an existing [`telegram.VideoNote`](telegram.videonote.html#telegram.VideoNote "telegram.VideoNote") object to send.\
Sending video notes by a URL is currently unsupported.\
\
\
\
Changed in version 13.2: Accept [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") as input.\
\
\
\
\
\
Changed in version 20.0: File paths as input is also accepted for bots _not_ running in\
[`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot").\
\
- [**duration**](#telegram.Bot.send_video_note.params.duration) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Duration of sent video in seconds.\
\
- [**length**](#telegram.Bot.send_video_note.params.length) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Video width and height, i.e. diameter of the video\
message.\
\
- [**disable\_notification**](#telegram.Bot.send_video_note.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.\
\
- [**protect\_content**](#telegram.Bot.send_video_note.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Protects the contents of the sent message from forwarding and saving.\
\
\
\
Added in version 13.10.\
\
- [**message\_thread\_id**](#telegram.Bot.send_video_note.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.\
\
\
\
Added in version 20.0.\
\
- [**reply\_markup**](#telegram.Bot.send_video_note.params.reply_markup) ( [`InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup") \| [`ReplyKeyboardMarkup`](telegram.replykeyboardmarkup.html#telegram.ReplyKeyboardMarkup "telegram.ReplyKeyboardMarkup") \| [`ReplyKeyboardRemove`](telegram.replykeyboardremove.html#telegram.ReplyKeyboardRemove "telegram.ReplyKeyboardRemove") \| [`ForceReply`](telegram.forcereply.html#telegram.ForceReply "telegram.ForceReply"), optional) – Additional interface options. An object for an inline keyboard, custom reply\
keyboard, instructions to remove reply keyboard or to force a reply from the user.\
\
- [**thumbnail**](#telegram.Bot.send_video_note.params.thumbnail) ( [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") \| [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") \| [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail’s width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can’t be reused and can be only uploaded as a new file. To upload a file, you can either pass a [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") (e.g. `open("filename", "rb")`), the file contents as bytes or the path of the file (as string or [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") object). In the latter case, the file contents will either be read as bytes or the file path will be passed to Telegram, depending on the [`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot") setting.\
\
\
\
Added in version 20.2.\
\
- [**reply\_parameters**](#telegram.Bot.send_video_note.params.reply_parameters) ( [`telegram.ReplyParameters`](telegram.replyparameters.html#telegram.ReplyParameters "telegram.ReplyParameters"), optional) –\
\
Description of the message to reply to.\
\
\
\
Added in version 20.8.\
\
- [**business\_connection\_id**](#telegram.Bot.send_video_note.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message will be sent.\
\
\
\
Added in version 21.1.\
\
- [**message\_effect\_id**](#telegram.Bot.send_video_note.params.message_effect_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the message effect to be added to the message; for private chats only.\
\
\
\
Added in version 21.3.\
\
- [**allow\_paid\_broadcast**](#telegram.Bot.send_video_note.params.allow_paid_broadcast) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass True to allow up to [`1000`](telegram.constants.html#telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND "telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND") messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot’s balance.\
\
\
\
Added in version 21.7.\
\
\
Keyword Arguments:\
\
- [**allow\_sending\_without\_reply**](#telegram.Bot.send_video_note.params.allow_sending_without_reply) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the message should be sent even if the specified replied-to message is not found.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_video_note.params.reply_parameters "telegram.Bot.send_video_note"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_video_note.params.reply_parameters "telegram.Bot.send_video_note") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**reply\_to\_message\_id**](#telegram.Bot.send_video_note.params.reply_to_message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
If the message is a reply, ID of the original message.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_video_note.params.reply_parameters "telegram.Bot.send_video_note"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_video_note.params.reply_parameters "telegram.Bot.send_video_note") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**filename**](#telegram.Bot.send_video_note.params.filename) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Custom file name for the video note, when uploading a\
new file. Convenience parameter, useful e.g. when sending files generated by the\
[`tempfile`](https://docs.python.org/3/library/tempfile.html#module-tempfile "(in Python v3.13)") module.\
\
\
\
Added in version 13.1.\
\
- [**read\_timeout**](#telegram.Bot.send_video_note.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.send_video_note.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) –\
\
Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). By default, `20` seconds are used as write timeout.\
\
\
\
Deprecated since version 20.7: In future versions, the default value will be changed to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.send_video_note.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.send_video_note.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.send_video_note.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the sent Message is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ send\_voice( _chat\_id_, _voice_, _duration=None_, _caption=None_, _disable\_notification=None_, _reply\_markup=None_, _parse\_mode=None_, _caption\_entities=None_, _protect\_content=None_, _message\_thread\_id=None_, _reply\_parameters=None_, _business\_connection\_id=None_, _message\_effect\_id=None_, _allow\_paid\_broadcast=None_, _\*_, _allow\_sending\_without\_reply=None_, _reply\_to\_message\_id=None_, _filename=None_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L2358-L2509) [¶](#telegram.Bot.send_voice "Link to this definition")\
\
Use this method to send audio files, if you want Telegram clients to display the file\
as a playable voice message. For this to work, your audio must be in an `.ogg` file\
encoded with OPUS , or in .MP3 format, or in .M4A format (other formats may be sent as\
[`Audio`](telegram.audio.html#telegram.Audio "telegram.Audio") or [`Document`](telegram.document.html#telegram.Document "telegram.Document")). Bots can currently send voice\
messages of up to [`50 MB`](telegram.constants.html#telegram.constants.FileSizeLimit.FILESIZE_UPLOAD "telegram.constants.FileSizeLimit.FILESIZE_UPLOAD") in size,\
this limit may be changed in the future.\
\
Note\
\
To use this method, the file must have the type _audio/ogg_ and be no more\
than [`1 MB`](telegram.constants.html#telegram.constants.FileSizeLimit.VOICE_NOTE_FILE_SIZE "telegram.constants.FileSizeLimit.VOICE_NOTE_FILE_SIZE") in size.\
[`1 MB`](telegram.constants.html#telegram.constants.FileSizeLimit.VOICE_NOTE_FILE_SIZE "telegram.constants.FileSizeLimit.VOICE_NOTE_FILE_SIZE")-\
[`20 MB`](telegram.constants.html#telegram.constants.FileSizeLimit.FILESIZE_DOWNLOAD "telegram.constants.FileSizeLimit.FILESIZE_DOWNLOAD") voice notes will be\
sent as files.\
\
Shortcuts\
\
- [`telegram.Message.reply_voice()`](telegram.message.html#telegram.Message.reply_voice "telegram.Message.reply_voice")\
\
- [`telegram.User.send_voice()`](telegram.user.html#telegram.User.send_voice "telegram.User.send_voice")\
\
\
See also\
\
[Working with Files and Media](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Working-with-Files-and-Media)\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.send_voice.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**voice**](#telegram.Bot.send_voice.params.voice) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)") \| [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") \| [`InputFile`](telegram.inputfile.html#telegram.InputFile "telegram.InputFile") \| [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") \| [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") \| [`telegram.Voice`](telegram.voice.html#telegram.Voice "telegram.Voice")) –\
\
Voice file to send.\
Pass a `file_id` as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one. To upload a file, you can either pass a [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") (e.g. `open("filename", "rb")`), the file contents as bytes or the path of the file (as string or [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") object). In the latter case, the file contents will either be read as bytes or the file path will be passed to Telegram, depending on the [`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot") setting.\
Lastly you can pass an existing [`telegram.Voice`](telegram.voice.html#telegram.Voice "telegram.Voice") object to send.\
\
\
\
Changed in version 13.2: Accept [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") as input.\
\
\
\
\
\
Changed in version 20.0: File paths as input is also accepted for bots _not_ running in\
[`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot").\
\
- [**caption**](#telegram.Bot.send_voice.params.caption) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Voice message caption,\
0- [`1024`](telegram.constants.html#telegram.constants.MessageLimit.CAPTION_LENGTH "telegram.constants.MessageLimit.CAPTION_LENGTH") characters after\
entities parsing.\
\
- [**parse\_mode**](#telegram.Bot.send_voice.params.parse_mode) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Mode for parsing entities. See [`telegram.constants.ParseMode`](telegram.constants.html#telegram.constants.ParseMode "telegram.constants.ParseMode") and [formatting options](https://core.telegram.org/bots/api#formatting-options) for more details.\
\
- [**caption\_entities**](#telegram.Bot.send_voice.params.caption_entities) (Sequence\[ [`telegram.MessageEntity`](telegram.messageentity.html#telegram.MessageEntity "telegram.MessageEntity")\], optional) –\
\
Sequence of special entities that appear in the caption, which can be specified instead of `parse_mode`.\
\
\
\
Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.\
\
- [**duration**](#telegram.Bot.send_voice.params.duration) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Duration of the voice message in seconds.\
\
- [**disable\_notification**](#telegram.Bot.send_voice.params.disable_notification) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Sends the message silently. Users will receive a notification with no sound.\
\
- [**protect\_content**](#telegram.Bot.send_voice.params.protect_content) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Protects the contents of the sent message from forwarding and saving.\
\
\
\
Added in version 13.10.\
\
- [**message\_thread\_id**](#telegram.Bot.send_voice.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
Unique identifier for the target message thread (topic) of the forum; for forum supergroups only.\
\
\
\
Added in version 20.0.\
\
- [**reply\_markup**](#telegram.Bot.send_voice.params.reply_markup) ( [`InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup") \| [`ReplyKeyboardMarkup`](telegram.replykeyboardmarkup.html#telegram.ReplyKeyboardMarkup "telegram.ReplyKeyboardMarkup") \| [`ReplyKeyboardRemove`](telegram.replykeyboardremove.html#telegram.ReplyKeyboardRemove "telegram.ReplyKeyboardRemove") \| [`ForceReply`](telegram.forcereply.html#telegram.ForceReply "telegram.ForceReply"), optional) – Additional interface options. An object for an inline keyboard, custom reply\
keyboard, instructions to remove reply keyboard or to force a reply from the user.\
\
- [**reply\_parameters**](#telegram.Bot.send_voice.params.reply_parameters) ( [`telegram.ReplyParameters`](telegram.replyparameters.html#telegram.ReplyParameters "telegram.ReplyParameters"), optional) –\
\
Description of the message to reply to.\
\
\
\
Added in version 20.8.\
\
- [**business\_connection\_id**](#telegram.Bot.send_voice.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message will be sent.\
\
\
\
Added in version 21.1.\
\
- [**message\_effect\_id**](#telegram.Bot.send_voice.params.message_effect_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the message effect to be added to the message; for private chats only.\
\
\
\
Added in version 21.3.\
\
- [**allow\_paid\_broadcast**](#telegram.Bot.send_voice.params.allow_paid_broadcast) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass True to allow up to [`1000`](telegram.constants.html#telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND "telegram.constants.FloodLimit.PAID_MESSAGES_PER_SECOND") messages per second, ignoring [broadcasting limits](https://core.telegram.org/bots/faq#how-can-i-message-all-of-my-bot-39s-subscribers-at-once) for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot’s balance.\
\
\
\
Added in version 21.7.\
\
\
Keyword Arguments:\
\
- [**allow\_sending\_without\_reply**](#telegram.Bot.send_voice.params.allow_sending_without_reply) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the message should be sent even if the specified replied-to message is not found.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_voice.params.reply_parameters "telegram.Bot.send_voice"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_voice.params.reply_parameters "telegram.Bot.send_voice") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**reply\_to\_message\_id**](#telegram.Bot.send_voice.params.reply_to_message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) –\
\
If the message is a reply, ID of the original message.\
Mutually exclusive with [`reply_parameters`](#telegram.Bot.send_voice.params.reply_parameters "telegram.Bot.send_voice"), which this is a convenience\
parameter for\
\
\
\
Changed in version 20.8: Bot API 7.0 introduced [`reply_parameters`](#telegram.Bot.send_voice.params.reply_parameters "telegram.Bot.send_voice") replacing this argument. PTB will automatically convert this argument to that one, but you should update your code to use the new argument.\
\
\
\
\
\
Changed in version 21.0: This argument is now a keyword-only argument.\
\
- [**filename**](#telegram.Bot.send_voice.params.filename) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Custom file name for the voice, when uploading a\
new file. Convenience parameter, useful e.g. when sending files generated by the\
[`tempfile`](https://docs.python.org/3/library/tempfile.html#module-tempfile "(in Python v3.13)") module.\
\
\
\
Added in version 13.1.\
\
- [**read\_timeout**](#telegram.Bot.send_voice.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.send_voice.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) –\
\
Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). By default, `20` seconds are used as write timeout.\
\
\
\
Deprecated since version 20.7: In future versions, the default value will be changed to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.send_voice.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.send_voice.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.send_voice.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the sent Message is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ setChatAdministratorCustomTitle( _chat\_id_, _user\_id_, _custom\_title_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5703-L5744) [¶](#telegram.Bot.setChatAdministratorCustomTitle "Link to this definition")\
\
Alias for [`set_chat_administrator_custom_title()`](#telegram.Bot.set_chat_administrator_custom_title "telegram.Bot.set_chat_administrator_custom_title")\
\
_async_ setChatDescription( _chat\_id_, _description=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6191-L6231) [¶](#telegram.Bot.setChatDescription "Link to this definition")\
\
Alias for [`set_chat_description()`](#telegram.Bot.set_chat_description "telegram.Bot.set_chat_description")\
\
_async_ setChatMenuButton( _chat\_id=None_, _menu\_button=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8026-L8066) [¶](#telegram.Bot.setChatMenuButton "Link to this definition")\
\
Alias for [`set_chat_menu_button()`](#telegram.Bot.set_chat_menu_button "telegram.Bot.set_chat_menu_button")\
\
_async_ setChatPermissions( _chat\_id_, _permissions_, _use\_independent\_chat\_permissions=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5645-L5702) [¶](#telegram.Bot.setChatPermissions "Link to this definition")\
\
Alias for [`set_chat_permissions()`](#telegram.Bot.set_chat_permissions "telegram.Bot.set_chat_permissions")\
\
_async_ setChatPhoto( _chat\_id_, _photo_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6069-L6114) [¶](#telegram.Bot.setChatPhoto "Link to this definition")\
\
Alias for [`set_chat_photo()`](#telegram.Bot.set_chat_photo "telegram.Bot.set_chat_photo")\
\
_async_ setChatStickerSet( _chat\_id_, _sticker\_set\_name_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4847-L4881) [¶](#telegram.Bot.setChatStickerSet "Link to this definition")\
\
Alias for [`set_chat_sticker_set()`](#telegram.Bot.set_chat_sticker_set "telegram.Bot.set_chat_sticker_set")\
\
_async_ setChatTitle( _chat\_id_, _title_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6151-L6190) [¶](#telegram.Bot.setChatTitle "Link to this definition")\
\
Alias for [`set_chat_title()`](#telegram.Bot.set_chat_title "telegram.Bot.set_chat_title")\
\
_async_ setCustomEmojiStickerSetThumbnail( _name_, _custom\_emoji\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7060-L7100) [¶](#telegram.Bot.setCustomEmojiStickerSetThumbnail "Link to this definition")\
\
Alias for [`set_custom_emoji_sticker_set_thumbnail()`](#telegram.Bot.set_custom_emoji_sticker_set_thumbnail "telegram.Bot.set_custom_emoji_sticker_set_thumbnail")\
\
_async_ setGameScore( _user\_id_, _score_, _chat\_id=None_, _message\_id=None_, _inline\_message\_id=None_, _force=None_, _disable\_edit\_message=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4942-L5005) [¶](#telegram.Bot.setGameScore "Link to this definition")\
\
Alias for [`set_game_score()`](#telegram.Bot.set_game_score "telegram.Bot.set_game_score")\
\
_async_ setMessageReaction( _chat\_id_, _message\_id_, _reaction=None_, _is\_big=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9123-L9207) [¶](#telegram.Bot.setMessageReaction "Link to this definition")\
\
Alias for [`set_message_reaction()`](#telegram.Bot.set_message_reaction "telegram.Bot.set_message_reaction")\
\
_async_ setMyCommands( _commands_, _scope=None_, _language\_code=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7644-L7707) [¶](#telegram.Bot.setMyCommands "Link to this definition")\
\
Alias for [`set_my_commands()`](#telegram.Bot.set_my_commands "telegram.Bot.set_my_commands")\
\
_async_ setMyDefaultAdministratorRights( _rights=None_, _for\_channels=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7545-L7590) [¶](#telegram.Bot.setMyDefaultAdministratorRights "Link to this definition")\
\
Alias for [`set_my_default_administrator_rights()`](#telegram.Bot.set_my_default_administrator_rights "telegram.Bot.set_my_default_administrator_rights")\
\
_async_ setMyDescription( _description=None_, _language\_code=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8828-L8872) [¶](#telegram.Bot.setMyDescription "Link to this definition")\
\
Alias for [`set_my_description()`](#telegram.Bot.set_my_description "telegram.Bot.set_my_description")\
\
_async_ setMyName( _name=None_, _language\_code=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8995-L9042) [¶](#telegram.Bot.setMyName "Link to this definition")\
\
Alias for [`set_my_name()`](#telegram.Bot.set_my_name "telegram.Bot.set_my_name")\
\
_async_ setMyShortDescription( _short\_description=None_, _language\_code=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8873-L8917) [¶](#telegram.Bot.setMyShortDescription "Link to this definition")\
\
Alias for [`set_my_short_description()`](#telegram.Bot.set_my_short_description "telegram.Bot.set_my_short_description")\
\
_async_ setPassportDataErrors( _user\_id_, _errors_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7101-L7146) [¶](#telegram.Bot.setPassportDataErrors "Link to this definition")\
\
Alias for [`set_passport_data_errors()`](#telegram.Bot.set_passport_data_errors "telegram.Bot.set_passport_data_errors")\
\
_async_ setStickerEmojiList( _sticker_, _emoji\_list_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6938-L6978) [¶](#telegram.Bot.setStickerEmojiList "Link to this definition")\
\
Alias for [`set_sticker_emoji_list()`](#telegram.Bot.set_sticker_emoji_list "telegram.Bot.set_sticker_emoji_list")\
\
_async_ setStickerKeywords( _sticker_, _keywords=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6979-L7019) [¶](#telegram.Bot.setStickerKeywords "Link to this definition")\
\
Alias for [`set_sticker_keywords()`](#telegram.Bot.set_sticker_keywords "telegram.Bot.set_sticker_keywords")\
\
_async_ setStickerMaskPosition( _sticker_, _mask\_position=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7020-L7059) [¶](#telegram.Bot.setStickerMaskPosition "Link to this definition")\
\
Alias for [`set_sticker_mask_position()`](#telegram.Bot.set_sticker_mask_position "telegram.Bot.set_sticker_mask_position")\
\
_async_ setStickerPositionInSet( _sticker_, _position_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6623-L6657) [¶](#telegram.Bot.setStickerPositionInSet "Link to this definition")\
\
Alias for [`set_sticker_position_in_set()`](#telegram.Bot.set_sticker_position_in_set "telegram.Bot.set_sticker_position_in_set")\
\
_async_ setStickerSetThumbnail( _name_, _user\_id_, _format_, _thumbnail=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6819-L6897) [¶](#telegram.Bot.setStickerSetThumbnail "Link to this definition")\
\
Alias for [`set_sticker_set_thumbnail()`](#telegram.Bot.set_sticker_set_thumbnail "telegram.Bot.set_sticker_set_thumbnail")\
\
_async_ setStickerSetTitle( _name_, _title_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6898-L6937) [¶](#telegram.Bot.setStickerSetTitle "Link to this definition")\
\
Alias for [`set_sticker_set_title()`](#telegram.Bot.set_sticker_set_title "telegram.Bot.set_sticker_set_title")\
\
_async_ setUserEmojiStatus( _user\_id_, _emoji\_status\_custom\_emoji\_id=None_, _emoji\_status\_expiration\_date=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6232-L6281) [¶](#telegram.Bot.setUserEmojiStatus "Link to this definition")\
\
Alias for [`set_user_emoji_status()`](#telegram.Bot.set_user_emoji_status "telegram.Bot.set_user_emoji_status")\
\
_async_ setWebhook( _url_, _certificate=None_, _max\_connections=None_, _allowed\_updates=None_, _ip\_address=None_, _drop\_pending\_updates=None_, _secret\_token=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4507-L4621) [¶](#telegram.Bot.setWebhook "Link to this definition")\
\
Alias for [`set_webhook()`](#telegram.Bot.set_webhook "telegram.Bot.set_webhook")\
\
_async_ set\_chat\_administrator\_custom\_title( _chat\_id_, _user\_id_, _custom\_title_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5703-L5744) [¶](#telegram.Bot.set_chat_administrator_custom_title "Link to this definition")\
\
Use this method to set a custom title for administrators promoted by the bot in a\
supergroup. The bot must be an administrator for this to work.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.set_chat_administrator_custom_title.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`).\
\
- [**user\_id**](#telegram.Bot.set_chat_administrator_custom_title.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Unique identifier of the target administrator.\
\
- [**custom\_title**](#telegram.Bot.set_chat_administrator_custom_title.params.custom_title) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – New custom title for the administrator;\
0- [`16`](telegram.constants.html#telegram.constants.ChatLimit.CHAT_ADMINISTRATOR_CUSTOM_TITLE_LENGTH "telegram.constants.ChatLimit.CHAT_ADMINISTRATOR_CUSTOM_TITLE_LENGTH")\
characters, emoji are not allowed.\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_chat_administrator_custom_title.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_chat_administrator_custom_title.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_chat_administrator_custom_title.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_chat_administrator_custom_title.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_chat_administrator_custom_title.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ set\_chat\_description( _chat\_id_, _description=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6191-L6231) [¶](#telegram.Bot.set_chat_description "Link to this definition")\
\
Use this method to change the description of a group, a supergroup or a channel. The bot\
must be an administrator in the chat for this to work and must have the appropriate admin\
rights.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.set_chat_description.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**description**](#telegram.Bot.set_chat_description.params.description) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – New chat description,\
0- [`255`](telegram.constants.html#telegram.constants.ChatLimit.CHAT_DESCRIPTION_LENGTH "telegram.constants.ChatLimit.CHAT_DESCRIPTION_LENGTH")\
characters.\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_chat_description.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_chat_description.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_chat_description.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_chat_description.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_chat_description.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ set\_chat\_menu\_button( _chat\_id=None_, _menu\_button=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8026-L8066) [¶](#telegram.Bot.set_chat_menu_button "Link to this definition")\
\
Use this method to change the bot’s menu button in a private chat, or the default menu\
button.\
\
Shortcuts\
\
[`telegram.User.set_menu_button()`](telegram.user.html#telegram.User.set_menu_button "telegram.User.set_menu_button")\
\
See also\
\
[`get_chat_menu_button()`](#telegram.Bot.get_chat_menu_button "telegram.Bot.get_chat_menu_button"), [`telegram.Chat.get_menu_button()`](telegram.chat.html#telegram.Chat.get_menu_button "telegram.Chat.get_menu_button") [`telegram.User.get_menu_button()`](telegram.user.html#telegram.User.get_menu_button "telegram.User.get_menu_button")\
\
Added in version 20.0.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.set_chat_menu_button.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Unique identifier for the target private chat. If not\
specified, default bot’s menu button will be changed\
\
- [**menu\_button**](#telegram.Bot.set_chat_menu_button.params.menu_button) ( [`telegram.MenuButton`](telegram.menubutton.html#telegram.MenuButton "telegram.MenuButton"), optional) – An object for the new bot’s menu\
button. Defaults to [`telegram.MenuButtonDefault`](telegram.menubuttondefault.html#telegram.MenuButtonDefault "telegram.MenuButtonDefault").\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_chat_menu_button.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_chat_menu_button.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_chat_menu_button.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_chat_menu_button.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_chat_menu_button.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
_async_ set\_chat\_permissions( _chat\_id_, _permissions_, _use\_independent\_chat\_permissions=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L5645-L5702) [¶](#telegram.Bot.set_chat_permissions "Link to this definition")\
\
Use this method to set default chat permissions for all members. The bot must be an\
administrator in the group or a supergroup for this to work and must have the\
[`telegram.ChatMemberAdministrator.can_restrict_members`](telegram.chatmemberadministrator.html#telegram.ChatMemberAdministrator.can_restrict_members "telegram.ChatMemberAdministrator.can_restrict_members") admin rights.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.set_chat_permissions.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`).\
\
- [**permissions**](#telegram.Bot.set_chat_permissions.params.permissions) ( [`telegram.ChatPermissions`](telegram.chatpermissions.html#telegram.ChatPermissions "telegram.ChatPermissions")) – New default chat permissions.\
\
- [**use\_independent\_chat\_permissions**](#telegram.Bot.set_chat_permissions.params.use_independent_chat_permissions) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) –\
\
Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") if chat\
permissions are set independently. Otherwise, the\
[`can_send_other_messages`](telegram.chatpermissions.html#telegram.ChatPermissions.can_send_other_messages "telegram.ChatPermissions.can_send_other_messages") and\
[`can_add_web_page_previews`](telegram.chatpermissions.html#telegram.ChatPermissions.can_add_web_page_previews "telegram.ChatPermissions.can_add_web_page_previews") permissions will imply\
the [`can_send_messages`](telegram.chatpermissions.html#telegram.ChatPermissions.can_send_messages "telegram.ChatPermissions.can_send_messages"),\
[`can_send_audios`](telegram.chatpermissions.html#telegram.ChatPermissions.can_send_audios "telegram.ChatPermissions.can_send_audios"),\
[`can_send_documents`](telegram.chatpermissions.html#telegram.ChatPermissions.can_send_documents "telegram.ChatPermissions.can_send_documents"),\
[`can_send_photos`](telegram.chatpermissions.html#telegram.ChatPermissions.can_send_photos "telegram.ChatPermissions.can_send_photos"),\
[`can_send_videos`](telegram.chatpermissions.html#telegram.ChatPermissions.can_send_videos "telegram.ChatPermissions.can_send_videos"),\
[`can_send_video_notes`](telegram.chatpermissions.html#telegram.ChatPermissions.can_send_video_notes "telegram.ChatPermissions.can_send_video_notes"), and\
[`can_send_voice_notes`](telegram.chatpermissions.html#telegram.ChatPermissions.can_send_voice_notes "telegram.ChatPermissions.can_send_voice_notes") permissions; the\
[`can_send_polls`](telegram.chatpermissions.html#telegram.ChatPermissions.can_send_polls "telegram.ChatPermissions.can_send_polls") permission will imply the\
[`can_send_messages`](telegram.chatpermissions.html#telegram.ChatPermissions.can_send_messages "telegram.ChatPermissions.can_send_messages") permission.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_chat_permissions.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_chat_permissions.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_chat_permissions.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_chat_permissions.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_chat_permissions.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ set\_chat\_photo( _chat\_id_, _photo_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6069-L6114) [¶](#telegram.Bot.set_chat_photo "Link to this definition")\
\
Use this method to set a new profile photo for the chat.\
\
Photos can’t be changed for private chats. The bot must be an administrator in the chat\
for this to work and must have the appropriate admin rights.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.set_chat_photo.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**photo**](#telegram.Bot.set_chat_photo.params.photo) ( [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") \| [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") \| [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)")) –\
\
New chat photo.\
To upload a file, you can either pass a [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") (e.g. `open("filename", "rb")`), the file contents as bytes or the path of the file (as string or [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") object). In the latter case, the file contents will either be read as bytes or the file path will be passed to Telegram, depending on the [`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot") setting.\
\
\
\
Changed in version 13.2: Accept [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") as input.\
\
\
\
\
\
Changed in version 20.0: File paths as input is also accepted for bots _not_ running in\
[`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot").\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_chat_photo.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_chat_photo.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) –\
\
Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). By default, `20` seconds are used as write timeout.\
\
\
\
Deprecated since version 20.7: In future versions, the default value will be changed to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_chat_photo.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_chat_photo.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_chat_photo.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ set\_chat\_sticker\_set( _chat\_id_, _sticker\_set\_name_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4847-L4881) [¶](#telegram.Bot.set_chat_sticker_set "Link to this definition")\
\
Use this method to set a new group sticker set for a supergroup.\
The bot must be an administrator in the chat for this to work and must have the appropriate\
admin rights. Use the field [`telegram.ChatFullInfo.can_set_sticker_set`](telegram.chatfullinfo.html#telegram.ChatFullInfo.can_set_sticker_set "telegram.ChatFullInfo.can_set_sticker_set") optionally\
returned in [`get_chat()`](#telegram.Bot.get_chat "telegram.Bot.get_chat") requests to check if the bot can use this method.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.set_chat_sticker_set.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`).\
\
- [**sticker\_set\_name**](#telegram.Bot.set_chat_sticker_set.params.sticker_set_name) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Name of the sticker set to be set as the group\
sticker set.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_chat_sticker_set.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_chat_sticker_set.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_chat_sticker_set.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_chat_sticker_set.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_chat_sticker_set.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
_async_ set\_chat\_title( _chat\_id_, _title_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6151-L6190) [¶](#telegram.Bot.set_chat_title "Link to this definition")\
\
Use this method to change the title of a chat. Titles can’t be changed for private chats.\
The bot must be an administrator in the chat for this to work and must have the appropriate\
admin rights.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.set_chat_title.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**title**](#telegram.Bot.set_chat_title.params.title) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – New chat title,\
[`1`](telegram.constants.html#telegram.constants.ChatLimit.MIN_CHAT_TITLE_LENGTH "telegram.constants.ChatLimit.MIN_CHAT_TITLE_LENGTH")-\
[`128`](telegram.constants.html#telegram.constants.ChatLimit.MAX_CHAT_TITLE_LENGTH "telegram.constants.ChatLimit.MAX_CHAT_TITLE_LENGTH") characters.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_chat_title.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_chat_title.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_chat_title.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_chat_title.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_chat_title.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ set\_custom\_emoji\_sticker\_set\_thumbnail( _name_, _custom\_emoji\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7060-L7100) [¶](#telegram.Bot.set_custom_emoji_sticker_set_thumbnail "Link to this definition")\
\
Use this method to set the thumbnail of a custom emoji sticker set.\
\
Added in version 20.2.\
\
Parameters:\
\
- [**name**](#telegram.Bot.set_custom_emoji_sticker_set_thumbnail.params.name) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Sticker set name.\
\
- [**custom\_emoji\_id**](#telegram.Bot.set_custom_emoji_sticker_set_thumbnail.params.custom_emoji_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Custom emoji identifier of a sticker from the\
sticker set; pass an empty string to drop the thumbnail and use the first sticker\
as the thumbnail.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_custom_emoji_sticker_set_thumbnail.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_custom_emoji_sticker_set_thumbnail.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_custom_emoji_sticker_set_thumbnail.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_custom_emoji_sticker_set_thumbnail.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_custom_emoji_sticker_set_thumbnail.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ set\_game\_score( _user\_id_, _score_, _chat\_id=None_, _message\_id=None_, _inline\_message\_id=None_, _force=None_, _disable\_edit\_message=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4942-L5005) [¶](#telegram.Bot.set_game_score "Link to this definition")\
\
Use this method to set the score of the specified user in a game message.\
\
Shortcuts\
\
- [`telegram.CallbackQuery.set_game_score()`](telegram.callbackquery.html#telegram.CallbackQuery.set_game_score "telegram.CallbackQuery.set_game_score")\
\
- [`telegram.Message.set_game_score()`](telegram.message.html#telegram.Message.set_game_score "telegram.Message.set_game_score")\
\
\
See also\
\
[`telegram.Game.text`](telegram.game.html#telegram.Game.text "telegram.Game.text")\
\
Parameters:\
\
- [**user\_id**](#telegram.Bot.set_game_score.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – User identifier.\
\
- [**score**](#telegram.Bot.set_game_score.params.score) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – New score, must be non-negative.\
\
- [**force**](#telegram.Bot.set_game_score.params.force) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the high score is allowed to\
decrease. This can be useful when fixing mistakes or banning cheaters.\
\
- [**disable\_edit\_message**](#telegram.Bot.set_game_score.params.disable_edit_message) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)"), if the game message\
should not be automatically edited to include the current scoreboard.\
\
- [**chat\_id**](#telegram.Bot.set_game_score.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Required if [`inline_message_id`](#telegram.Bot.set_game_score.params.inline_message_id "telegram.Bot.set_game_score")\
is not specified. Unique identifier for the target chat.\
\
- [**message\_id**](#telegram.Bot.set_game_score.params.message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Required if [`inline_message_id`](#telegram.Bot.set_game_score.params.inline_message_id "telegram.Bot.set_game_score") is not\
specified. Identifier of the sent message.\
\
- [**inline\_message\_id**](#telegram.Bot.set_game_score.params.inline_message_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Required if [`chat_id`](#telegram.Bot.set_game_score.params.chat_id "telegram.Bot.set_game_score") and\
[`message_id`](#telegram.Bot.set_game_score.params.message_id "telegram.Bot.set_game_score") are not specified. Identifier of the inline message.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_game_score.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_game_score.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_game_score.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_game_score.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_game_score.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
The edited message. If the message is not an inline message\
, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)").\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") – If the new score is not greater than the user’s\
current score in the chat and [`force`](#telegram.Bot.set_game_score.params.force "telegram.Bot.set_game_score") is [`False`](https://docs.python.org/3/library/constants.html#False "(in Python v3.13)").\
\
_async_ set\_message\_reaction( _chat\_id_, _message\_id_, _reaction=None_, _is\_big=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9123-L9207) [¶](#telegram.Bot.set_message_reaction "Link to this definition")\
\
Use this method to change the chosen reactions on a message. Service messages can’t be\
reacted to. Automatically forwarded messages from a channel to its discussion group have\
the same available reactions as messages in the channel. Bots can’t use paid reactions.\
\
Shortcuts\
\
[`telegram.Message.set_reaction()`](telegram.message.html#telegram.Message.set_reaction "telegram.Message.set_reaction")\
\
Added in version 20.8.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.set_message_reaction.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**message\_id**](#telegram.Bot.set_message_reaction.params.message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Identifier of the target message. If the message belongs to a\
media group, the reaction is set to the first non-deleted message in the group\
instead.\
\
- [**reaction**](#telegram.Bot.set_message_reaction.params.reaction) (Sequence\[ [`telegram.ReactionType`](telegram.reactiontype.html#telegram.ReactionType "telegram.ReactionType") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")\] \| [`telegram.ReactionType`](telegram.reactiontype.html#telegram.ReactionType "telegram.ReactionType") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
A list of reaction\
types to set on the message. Currently, as non-premium users, bots can set up to\
one reaction per message. A custom emoji reaction can be used if it is either\
already present on the message or explicitly allowed by chat administrators. Paid\
reactions can’t be used by bots.\
\
\
\
Tip\
\
\
\
Passed [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)") values will be converted to either\
[`telegram.ReactionTypeEmoji`](telegram.reactiontypeemoji.html#telegram.ReactionTypeEmoji "telegram.ReactionTypeEmoji") or\
[`telegram.ReactionTypeCustomEmoji`](telegram.reactiontypecustomemoji.html#telegram.ReactionTypeCustomEmoji "telegram.ReactionTypeCustomEmoji")\
depending on whether they are listed in\
[`ReactionEmoji`](telegram.constants.html#telegram.constants.ReactionEmoji "telegram.constants.ReactionEmoji").\
\
- [**is\_big**](#telegram.Bot.set_message_reaction.params.is_big) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") to set the reaction with a big\
animation.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_message_reaction.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_message_reaction.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_message_reaction.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_message_reaction.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_message_reaction.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)") On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ set\_my\_commands( _commands_, _scope=None_, _language\_code=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7644-L7707) [¶](#telegram.Bot.set_my_commands "Link to this definition")\
\
Use this method to change the list of the bot’s commands. See the\
[Telegram docs](https://core.telegram.org/bots/features#commands) for more details about\
bot commands.\
\
See also\
\
[`get_my_commands()`](#telegram.Bot.get_my_commands "telegram.Bot.get_my_commands"), [`delete_my_commands()`](#telegram.Bot.delete_my_commands "telegram.Bot.delete_my_commands")\
\
Parameters:\
\
- [**commands**](#telegram.Bot.set_my_commands.params.commands) (Sequence\[ [`BotCommand`](telegram.botcommand.html#telegram.BotCommand "telegram.BotCommand") \| ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"))\]) –\
\
A sequence\
of bot commands to be set as the list of the bot’s commands. At most\
[`100`](telegram.constants.html#telegram.constants.BotCommandLimit.MAX_COMMAND_NUMBER "telegram.constants.BotCommandLimit.MAX_COMMAND_NUMBER") commands can be\
specified.\
\
\
\
Note\
\
\
\
If you pass in a sequence of [`tuple`](https://docs.python.org/3/library/stdtypes.html#tuple "(in Python v3.13)"), the order of elements in each\
[`tuple`](https://docs.python.org/3/library/stdtypes.html#tuple "(in Python v3.13)") must correspond to the order of positional arguments to create a\
[`BotCommand`](telegram.botcommand.html#telegram.BotCommand "telegram.BotCommand") instance.\
\
\
\
\
\
Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.\
\
- [**scope**](#telegram.Bot.set_my_commands.params.scope) ( [`telegram.BotCommandScope`](telegram.botcommandscope.html#telegram.BotCommandScope "telegram.BotCommandScope"), optional) –\
\
An object,\
describing scope of users for which the commands are relevant. Defaults to\
[`telegram.BotCommandScopeDefault`](telegram.botcommandscopedefault.html#telegram.BotCommandScopeDefault "telegram.BotCommandScopeDefault").\
\
\
\
Added in version 13.7.\
\
- [**language\_code**](#telegram.Bot.set_my_commands.params.language_code) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
A two-letter ISO 639-1 language code. If empty,\
commands will be applied to all users from the given scope, for whose language\
there are no dedicated commands.\
\
\
\
Added in version 13.7.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_my_commands.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_my_commands.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_my_commands.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_my_commands.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_my_commands.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ set\_my\_default\_administrator\_rights( _rights=None_, _for\_channels=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7545-L7590) [¶](#telegram.Bot.set_my_default_administrator_rights "Link to this definition")\
\
Use this method to change the default administrator rights requested by the bot when\
it’s added as an administrator to groups or channels. These rights will be suggested to\
users, but they are free to modify the list before adding the bot.\
\
See also\
\
[`get_my_default_administrator_rights()`](#telegram.Bot.get_my_default_administrator_rights "telegram.Bot.get_my_default_administrator_rights")\
\
Added in version 20.0.\
\
Parameters:\
\
- [**rights**](#telegram.Bot.set_my_default_administrator_rights.params.rights) ( [`telegram.ChatAdministratorRights`](telegram.chatadministratorrights.html#telegram.ChatAdministratorRights "telegram.ChatAdministratorRights"), optional) – A\
[`telegram.ChatAdministratorRights`](telegram.chatadministratorrights.html#telegram.ChatAdministratorRights "telegram.ChatAdministratorRights") object describing new default\
administrator\
rights. If not specified, the default administrator rights will be cleared.\
\
- [**for\_channels**](#telegram.Bot.set_my_default_administrator_rights.params.for_channels) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") to change the default\
administrator rights of the bot in channels. Otherwise, the default administrator\
rights of the bot for groups and supergroups will be changed.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_my_default_administrator_rights.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_my_default_administrator_rights.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_my_default_administrator_rights.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_my_default_administrator_rights.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_my_default_administrator_rights.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
Returns [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") on success.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ set\_my\_description( _description=None_, _language\_code=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8828-L8872) [¶](#telegram.Bot.set_my_description "Link to this definition")\
\
Use this method to change the bot’s description, which is shown in the chat with the bot\
if the chat is empty.\
\
Added in version 20.2.\
\
Parameters:\
\
- [**description**](#telegram.Bot.set_my_description.params.description) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – New bot description;\
0- [`512`](telegram.constants.html#telegram.constants.BotDescriptionLimit.MAX_DESCRIPTION_LENGTH "telegram.constants.BotDescriptionLimit.MAX_DESCRIPTION_LENGTH")\
characters. Pass an empty string to remove the dedicated description for the given\
language.\
\
- [**language\_code**](#telegram.Bot.set_my_description.params.language_code) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – A two-letter ISO 639-1 language code. If empty,\
the description will be applied to all users for whose language there is no\
dedicated description.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_my_description.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_my_description.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_my_description.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_my_description.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_my_description.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ set\_my\_name( _name=None_, _language\_code=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8995-L9042) [¶](#telegram.Bot.set_my_name "Link to this definition")\
\
Use this method to change the bot’s name.\
\
Added in version 20.3.\
\
Parameters:\
\
- [**name**](#telegram.Bot.set_my_name.params.name) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
New bot name;\
0- [`64`](telegram.constants.html#telegram.constants.BotNameLimit.MAX_NAME_LENGTH "telegram.constants.BotNameLimit.MAX_NAME_LENGTH")\
characters. Pass an empty string to remove the dedicated name for the given\
language.\
\
Caution\
\
If [`language_code`](#telegram.Bot.set_my_name.params.language_code "telegram.Bot.set_my_name") is not specified, a [`name`](#telegram.Bot.set_my_name.params.name "telegram.Bot.set_my_name") _must_\
be specified.\
\
- [**language\_code**](#telegram.Bot.set_my_name.params.language_code) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – A two-letter ISO 639-1 language code. If empty,\
the name will be applied to all users for whose language there is no\
dedicated name.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_my_name.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_my_name.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_my_name.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_my_name.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_my_name.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ set\_my\_short\_description( _short\_description=None_, _language\_code=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8873-L8917) [¶](#telegram.Bot.set_my_short_description "Link to this definition")\
\
Use this method to change the bot’s short description, which is shown on the bot’s profile\
page and is sent together with the link when users share the bot.\
\
Added in version 20.2.\
\
Parameters:\
\
- [**short\_description**](#telegram.Bot.set_my_short_description.params.short_description) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – New short description for the bot;\
0- [`120`](telegram.constants.html#telegram.constants.BotDescriptionLimit.MAX_SHORT_DESCRIPTION_LENGTH "telegram.constants.BotDescriptionLimit.MAX_SHORT_DESCRIPTION_LENGTH")\
characters. Pass an empty string to remove the dedicated description for the given\
language.\
\
- [**language\_code**](#telegram.Bot.set_my_short_description.params.language_code) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – A two-letter ISO 639-1 language code. If empty,\
the description will be applied to all users for whose language there is no\
dedicated description.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_my_short_description.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_my_short_description.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_my_short_description.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_my_short_description.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_my_short_description.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ set\_passport\_data\_errors( _user\_id_, _errors_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7101-L7146) [¶](#telegram.Bot.set_passport_data_errors "Link to this definition")\
\
Informs a user that some of the Telegram Passport elements they provided contains errors.\
The user will not be able to re-submit their Passport to you until the errors are fixed\
(the contents of the field for which you returned the error must change).\
\
Use this if the data submitted by the user doesn’t satisfy the standards your service\
requires for any reason. For example, if a birthday date seems invalid, a submitted\
document is blurry, a scan shows evidence of tampering, etc. Supply some details in the\
error message to make sure the user knows how to correct the issues.\
\
Parameters:\
\
- [**user\_id**](#telegram.Bot.set_passport_data_errors.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – User identifier\
\
- [**errors**](#telegram.Bot.set_passport_data_errors.params.errors) (Sequence\[ [`PassportElementError`](telegram.passportelementerror.html#telegram.PassportElementError "telegram.PassportElementError")\]) –\
\
A Sequence describing the errors.\
\
\
\
Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_passport_data_errors.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_passport_data_errors.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_passport_data_errors.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_passport_data_errors.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_passport_data_errors.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ set\_sticker\_emoji\_list( _sticker_, _emoji\_list_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6938-L6978) [¶](#telegram.Bot.set_sticker_emoji_list "Link to this definition")\
\
Use this method to change the list of emoji assigned to a regular or custom emoji sticker.\
The sticker must belong to a sticker set created by the bot.\
\
Added in version 20.2.\
\
Parameters:\
\
- [**sticker**](#telegram.Bot.set_sticker_emoji_list.params.sticker) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – File identifier of the sticker.\
\
- [**emoji\_list**](#telegram.Bot.set_sticker_emoji_list.params.emoji_list) (Sequence\[ [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")\]) – A sequence of\
[`1`](telegram.constants.html#telegram.constants.StickerLimit.MIN_STICKER_EMOJI "telegram.constants.StickerLimit.MIN_STICKER_EMOJI")-\
[`20`](telegram.constants.html#telegram.constants.StickerLimit.MAX_STICKER_EMOJI "telegram.constants.StickerLimit.MAX_STICKER_EMOJI") emoji associated with\
the sticker.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_sticker_emoji_list.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_sticker_emoji_list.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_sticker_emoji_list.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_sticker_emoji_list.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_sticker_emoji_list.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ set\_sticker\_keywords( _sticker_, _keywords=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6979-L7019) [¶](#telegram.Bot.set_sticker_keywords "Link to this definition")\
\
Use this method to change search keywords assigned to a regular or custom emoji sticker.\
The sticker must belong to a sticker set created by the bot.\
\
Added in version 20.2.\
\
Parameters:\
\
- [**sticker**](#telegram.Bot.set_sticker_keywords.params.sticker) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – File identifier of the sticker.\
\
- [**keywords**](#telegram.Bot.set_sticker_keywords.params.keywords) (Sequence\[ [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")\]) – A sequence of\
0- [`20`](telegram.constants.html#telegram.constants.StickerLimit.MAX_SEARCH_KEYWORDS "telegram.constants.StickerLimit.MAX_SEARCH_KEYWORDS") search keywords\
for the sticker with total length up to\
[`64`](telegram.constants.html#telegram.constants.StickerLimit.MAX_KEYWORD_LENGTH "telegram.constants.StickerLimit.MAX_KEYWORD_LENGTH") characters.\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_sticker_keywords.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_sticker_keywords.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_sticker_keywords.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_sticker_keywords.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_sticker_keywords.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ set\_sticker\_mask\_position( _sticker_, _mask\_position=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7020-L7059) [¶](#telegram.Bot.set_sticker_mask_position "Link to this definition")\
\
Use this method to change the mask position of a mask sticker.\
The sticker must belong to a sticker set that was created by the bot.\
\
Added in version 20.2.\
\
Parameters:\
\
- [**sticker**](#telegram.Bot.set_sticker_mask_position.params.sticker) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – File identifier of the sticker.\
\
- [**mask\_position**](#telegram.Bot.set_sticker_mask_position.params.mask_position) ( [`telegram.MaskPosition`](telegram.maskposition.html#telegram.MaskPosition "telegram.MaskPosition"), optional) – A object with the position\
where the mask should be placed on faces. Omit the parameter to remove the mask\
position.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_sticker_mask_position.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_sticker_mask_position.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_sticker_mask_position.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_sticker_mask_position.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_sticker_mask_position.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ set\_sticker\_position\_in\_set( _sticker_, _position_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6623-L6657) [¶](#telegram.Bot.set_sticker_position_in_set "Link to this definition")\
\
Use this method to move a sticker in a set created by the bot to a specific position.\
\
Parameters:\
\
- [**sticker**](#telegram.Bot.set_sticker_position_in_set.params.sticker) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – File identifier of the sticker.\
\
- [**position**](#telegram.Bot.set_sticker_position_in_set.params.position) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – New sticker position in the set, zero-based.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_sticker_position_in_set.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_sticker_position_in_set.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_sticker_position_in_set.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_sticker_position_in_set.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_sticker_position_in_set.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ set\_sticker\_set\_thumbnail( _name_, _user\_id_, _format_, _thumbnail=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6819-L6897) [¶](#telegram.Bot.set_sticker_set_thumbnail "Link to this definition")\
\
Use this method to set the thumbnail of a regular or mask sticker set. The format of the\
thumbnail file must match the format of the stickers in the set.\
\
Added in version 20.2.\
\
Changed in version 21.1: As per Bot API 7.2, the new argument [`format`](#telegram.Bot.set_sticker_set_thumbnail.params.format "telegram.Bot.set_sticker_set_thumbnail") will be required, and thus the\
order of the arguments had to be changed.\
\
Parameters:\
\
- [**name**](#telegram.Bot.set_sticker_set_thumbnail.params.name) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Sticker set name\
\
- [**user\_id**](#telegram.Bot.set_sticker_set_thumbnail.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – User identifier of created sticker set owner.\
\
- [**format**](#telegram.Bot.set_sticker_set_thumbnail.params.format) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) –\
\
Format of the added sticker, must be one of\
[`'static'`](telegram.constants.html#telegram.constants.StickerFormat.STATIC "telegram.constants.StickerFormat.STATIC") for a\
`.WEBP` or `.PNG` image, [`'animated'`](telegram.constants.html#telegram.constants.StickerFormat.ANIMATED "telegram.constants.StickerFormat.ANIMATED")\
for a `.TGS` animation, [`'video'`](telegram.constants.html#telegram.constants.StickerFormat.VIDEO "telegram.constants.StickerFormat.VIDEO") for a\
WEBM video.\
\
\
\
Added in version 21.1.\
\
- [**thumbnail**](#telegram.Bot.set_sticker_set_thumbnail.params.thumbnail) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)") \| [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") \| [`InputFile`](telegram.inputfile.html#telegram.InputFile "telegram.InputFile") \| [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") \| [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)"), optional) –\
\
A **.WEBP** or **.PNG** image\
with the thumbnail, must\
be up to [`128`](telegram.constants.html#telegram.constants.StickerSetLimit.MAX_STATIC_THUMBNAIL_SIZE "telegram.constants.StickerSetLimit.MAX_STATIC_THUMBNAIL_SIZE")\
kilobytes in size and have width and height of exactly\
[`100`](telegram.constants.html#telegram.constants.StickerSetLimit.STATIC_THUMB_DIMENSIONS "telegram.constants.StickerSetLimit.STATIC_THUMB_DIMENSIONS") px, or a\
**.TGS** animation with the thumbnail up to\
[`32`](telegram.constants.html#telegram.constants.StickerSetLimit.MAX_ANIMATED_THUMBNAIL_SIZE "telegram.constants.StickerSetLimit.MAX_ANIMATED_THUMBNAIL_SIZE")\
kilobytes in size; see\
[the docs](https://core.telegram.org/stickers#animation-requirements) for\
animated sticker technical requirements, or a **.WEBM** video with the thumbnail up\
to [`32`](telegram.constants.html#telegram.constants.StickerSetLimit.MAX_ANIMATED_THUMBNAIL_SIZE "telegram.constants.StickerSetLimit.MAX_ANIMATED_THUMBNAIL_SIZE")\
kilobytes in size; see\
[this](https://core.telegram.org/stickers#video-requirements) for video sticker\
technical requirements.\
\
Pass a `file_id` as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one. To upload a file, you can either pass a [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") (e.g. `open("filename", "rb")`), the file contents as bytes or the path of the file (as string or [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") object). In the latter case, the file contents will either be read as bytes or the file path will be passed to Telegram, depending on the [`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot") setting.\
\
Animated and video sticker set thumbnails can’t be uploaded via HTTP URL. If\
omitted, then the thumbnail is dropped and the first sticker is used as the\
thumbnail.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_sticker_set_thumbnail.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_sticker_set_thumbnail.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_sticker_set_thumbnail.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_sticker_set_thumbnail.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_sticker_set_thumbnail.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ set\_sticker\_set\_title( _name_, _title_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6898-L6937) [¶](#telegram.Bot.set_sticker_set_title "Link to this definition")\
\
Use this method to set the title of a created sticker set.\
\
Added in version 20.2.\
\
Parameters:\
\
- [**name**](#telegram.Bot.set_sticker_set_title.params.name) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Sticker set name.\
\
- [**title**](#telegram.Bot.set_sticker_set_title.params.title) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Sticker set title,\
[`1`](telegram.constants.html#telegram.constants.StickerLimit.MIN_NAME_AND_TITLE "telegram.constants.StickerLimit.MIN_NAME_AND_TITLE")-\
[`64`](telegram.constants.html#telegram.constants.StickerLimit.MAX_NAME_AND_TITLE "telegram.constants.StickerLimit.MAX_NAME_AND_TITLE") characters.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_sticker_set_title.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_sticker_set_title.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_sticker_set_title.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_sticker_set_title.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_sticker_set_title.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ set\_user\_emoji\_status( _user\_id_, _emoji\_status\_custom\_emoji\_id=None_, _emoji\_status\_expiration\_date=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6232-L6281) [¶](#telegram.Bot.set_user_emoji_status "Link to this definition")\
\
Changes the emoji status for a given user that previously allowed the bot to manage\
their emoji status via the Mini App method\
[requestEmojiStatusAccess](https://core.telegram.org/bots/webapps#initializing-mini-apps)\
.\
\
Added in version 21.8.\
\
Parameters:\
\
- [**user\_id**](#telegram.Bot.set_user_emoji_status.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Unique identifier of the target user\
\
- [**emoji\_status\_custom\_emoji\_id**](#telegram.Bot.set_user_emoji_status.params.emoji_status_custom_emoji_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Custom emoji identifier of the\
emoji status to set. Pass an empty string to remove the status.\
\
- [**emoji\_status\_expiration\_date**](#telegram.Bot.set_user_emoji_status.params.emoji_status_expiration_date) (Union\[ [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), [`datetime.datetime`](https://docs.python.org/3/library/datetime.html#datetime.datetime "(in Python v3.13)")\], optional) – Expiration date of the emoji status, if any, as unix timestamp or\
[`datetime.datetime`](https://docs.python.org/3/library/datetime.html#datetime.datetime "(in Python v3.13)") object.\
For timezone naive [`datetime.datetime`](https://docs.python.org/3/library/datetime.html#datetime.datetime "(in Python v3.13)") objects, the default timezone of the bot will be used, which is UTC unless [`telegram.ext.Defaults.tzinfo`](telegram.ext.defaults.html#telegram.ext.Defaults.tzinfo "telegram.ext.Defaults.tzinfo") is used.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_user_emoji_status.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_user_emoji_status.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_user_emoji_status.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_user_emoji_status.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_user_emoji_status.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ set\_webhook( _url_, _certificate=None_, _max\_connections=None_, _allowed\_updates=None_, _ip\_address=None_, _drop\_pending\_updates=None_, _secret\_token=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L4507-L4621) [¶](#telegram.Bot.set_webhook "Link to this definition")\
\
Use this method to specify a url and receive incoming updates via an outgoing webhook.\
Whenever there is an update for the bot, Telegram will send an HTTPS POST request to the\
specified url, containing An Update. In case of an unsuccessful request,\
Telegram will give up after a reasonable amount of attempts.\
\
If you’d like to make sure that the Webhook was set by you, you can specify secret data in\
the parameter [`secret_token`](#telegram.Bot.set_webhook.params.secret_token "telegram.Bot.set_webhook"). If specified, the request will contain a header\
`X-Telegram-Bot-Api-Secret-Token` with the secret token as content.\
\
Note\
\
1. You will not be able to receive updates using [`get_updates()`](#telegram.Bot.get_updates "telegram.Bot.get_updates") for long as an\
outgoing webhook is set up.\
\
2. To use a self-signed certificate, you need to upload your public key certificate\
using [`certificate`](#telegram.Bot.set_webhook.params.certificate "telegram.Bot.set_webhook") parameter. Please upload as\
[`InputFile`](telegram.inputfile.html#telegram.InputFile "telegram.InputFile"), sending a String will not work.\
\
3. Ports currently supported for Webhooks:\
[`telegram.constants.SUPPORTED_WEBHOOK_PORTS`](telegram.constants.html#telegram.constants.SUPPORTED_WEBHOOK_PORTS "telegram.constants.SUPPORTED_WEBHOOK_PORTS").\
\
\
If you’re having any trouble setting up webhooks, please check out this [guide to\\
Webhooks](https://core.telegram.org/bots/webhooks).\
\
See also\
\
[`telegram.ext.Application.run_webhook()`](telegram.ext.application.html#telegram.ext.Application.run_webhook "telegram.ext.Application.run_webhook"),\
[`telegram.ext.Updater.start_webhook()`](telegram.ext.updater.html#telegram.ext.Updater.start_webhook "telegram.ext.Updater.start_webhook")\
\
Examples\
\
[Custom Webhook Bot](examples.customwebhookbot.html)\
\
Parameters:\
\
- [**url**](#telegram.Bot.set_webhook.params.url) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – HTTPS url to send updates to. Use an empty string to remove webhook\
integration.\
\
- [**certificate**](#telegram.Bot.set_webhook.params.certificate) ( [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") \| [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") \| [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Upload your public key certificate so that the root\
certificate in use can be checked. See our [self-signed guide](https://github.com/python-telegram-bot/python-telegram-bot/wiki/Webhooks#creating-a-self-signed-certificate-using-openssl) for details.\
To upload a file, you can either pass a [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") (e.g. `open("filename", "rb")`) or the file contents as bytes. If the bot is running in [`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot"), passing the path of the file (as string or [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") object) is supported as well.\
\
- [**ip\_address**](#telegram.Bot.set_webhook.params.ip_address) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – The fixed IP address which will be used to send\
webhook requests instead of the IP address resolved through DNS.\
\
- [**max\_connections**](#telegram.Bot.set_webhook.params.max_connections) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Maximum allowed number of simultaneous HTTPS\
connections to the webhook for update delivery,\
[`1`](telegram.constants.html#telegram.constants.WebhookLimit.MIN_CONNECTIONS_LIMIT "telegram.constants.WebhookLimit.MIN_CONNECTIONS_LIMIT")-\
[`100`](telegram.constants.html#telegram.constants.WebhookLimit.MAX_CONNECTIONS_LIMIT "telegram.constants.WebhookLimit.MAX_CONNECTIONS_LIMIT").\
Defaults to `40`. Use lower values to limit the load on your bot’s server,\
and higher values to increase your bot’s throughput.\
\
- [**allowed\_updates**](#telegram.Bot.set_webhook.params.allowed_updates) (Sequence\[ [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")\], optional) –\
\
A sequence of the types of\
updates you want your bot to receive. For example, specify \[“message”,\
“edited\_channel\_post”, “callback\_query”\] to only receive updates of these types.\
See [`telegram.Update`](telegram.update.html#telegram.Update "telegram.Update") for a complete list of available update types.\
Specify an empty sequence to receive all updates except\
[`telegram.Update.chat_member`](telegram.update.html#telegram.Update.chat_member "telegram.Update.chat_member"),\
[`telegram.Update.message_reaction`](telegram.update.html#telegram.Update.message_reaction "telegram.Update.message_reaction")\
and [`telegram.Update.message_reaction_count`](telegram.update.html#telegram.Update.message_reaction_count "telegram.Update.message_reaction_count") (default). If not\
specified, the previous setting will be used. Please note that this\
parameter doesn’t affect\
updates created before the call to the set\_webhook, so unwanted update\
may be received for a short period of time.\
\
\
\
Changed in version 20.0: Accepts any [`collections.abc.Sequence`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Sequence "(in Python v3.13)") as input instead of just a list.\
\
- [**drop\_pending\_updates**](#telegram.Bot.set_webhook.params.drop_pending_updates) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Pass [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") to drop all pending\
updates.\
\
- [**secret\_token**](#telegram.Bot.set_webhook.params.secret_token) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
A secret token to be sent in a header\
`X-Telegram-Bot-Api-Secret-Token` in every webhook request,\
[`1`](telegram.constants.html#telegram.constants.WebhookLimit.MIN_SECRET_TOKEN_LENGTH "telegram.constants.WebhookLimit.MIN_SECRET_TOKEN_LENGTH")-\
[`256`](telegram.constants.html#telegram.constants.WebhookLimit.MAX_SECRET_TOKEN_LENGTH "telegram.constants.WebhookLimit.MAX_SECRET_TOKEN_LENGTH") characters.\
Only characters `A-Z`, `a-z`, `0-9`, `_` and `-` are allowed.\
The header is useful to ensure that the request comes from a webhook set by you.\
\
\
\
Added in version 20.0.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.set_webhook.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.set_webhook.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.set_webhook.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.set_webhook.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.set_webhook.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)") On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ shutdown() [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L768-L782) [¶](#telegram.Bot.shutdown "Link to this definition")\
\
Stop & clear resources used by this class. Currently just calls\
[`telegram.request.BaseRequest.shutdown()`](telegram.request.baserequest.html#telegram.request.BaseRequest.shutdown "telegram.request.BaseRequest.shutdown") for the request objects used by this bot.\
\
See also\
\
[`initialize()`](#telegram.Bot.initialize "telegram.Bot.initialize")\
\
Added in version 20.0.\
\
_async_ stopMessageLiveLocation( _chat\_id=None_, _message\_id=None_, _inline\_message\_id=None_, _reply\_markup=None_, _business\_connection\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L2950-L3001) [¶](#telegram.Bot.stopMessageLiveLocation "Link to this definition")\
\
Alias for [`stop_message_live_location()`](#telegram.Bot.stop_message_live_location "telegram.Bot.stop_message_live_location")\
\
_async_ stopPoll( _chat\_id_, _message\_id_, _reply\_markup=None_, _business\_connection\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7339-L7388) [¶](#telegram.Bot.stopPoll "Link to this definition")\
\
Alias for [`stop_poll()`](#telegram.Bot.stop_poll "telegram.Bot.stop_poll")\
\
_async_ stop\_message\_live\_location( _chat\_id=None_, _message\_id=None_, _inline\_message\_id=None_, _reply\_markup=None_, _business\_connection\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L2950-L3001) [¶](#telegram.Bot.stop_message_live_location "Link to this definition")\
\
Use this method to stop updating a live location message sent by the bot or via the bot\
(for inline bots) before [`live_period`](telegram.location.html#telegram.Location.params.live_period "telegram.Location") expires.\
\
Shortcuts\
\
- [`telegram.CallbackQuery.stop_message_live_location()`](telegram.callbackquery.html#telegram.CallbackQuery.stop_message_live_location "telegram.CallbackQuery.stop_message_live_location")\
\
- [`telegram.Message.stop_live_location()`](telegram.message.html#telegram.Message.stop_live_location "telegram.Message.stop_live_location")\
\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.stop_message_live_location.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Required if [`inline_message_id`](#telegram.Bot.stop_message_live_location.params.inline_message_id "telegram.Bot.stop_message_live_location")\
is not specified. Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**message\_id**](#telegram.Bot.stop_message_live_location.params.message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Required if [`inline_message_id`](#telegram.Bot.stop_message_live_location.params.inline_message_id "telegram.Bot.stop_message_live_location") is not\
specified. Identifier of the sent message with live location to stop.\
\
- [**inline\_message\_id**](#telegram.Bot.stop_message_live_location.params.inline_message_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) – Required if [`chat_id`](#telegram.Bot.stop_message_live_location.params.chat_id "telegram.Bot.stop_message_live_location") and\
[`message_id`](#telegram.Bot.stop_message_live_location.params.message_id "telegram.Bot.stop_message_live_location") are not specified. Identifier of the inline message.\
\
- [**reply\_markup**](#telegram.Bot.stop_message_live_location.params.reply_markup) ( [`telegram.InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup"), optional) – An object for a new\
inline keyboard.\
\
- [**business\_connection\_id**](#telegram.Bot.stop_message_live_location.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message to be edited was sent\
\
\
\
Added in version 21.4.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.stop_message_live_location.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.stop_message_live_location.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.stop_message_live_location.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.stop_message_live_location.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.stop_message_live_location.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, if edited message is not an inline message, the\
edited message is returned, otherwise [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`telegram.Message`](telegram.message.html#telegram.Message "telegram.Message")\
\
_async_ stop\_poll( _chat\_id_, _message\_id_, _reply\_markup=None_, _business\_connection\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L7339-L7388) [¶](#telegram.Bot.stop_poll "Link to this definition")\
\
Use this method to stop a poll which was sent by the bot.\
\
Shortcuts\
\
[`telegram.Message.stop_poll()`](telegram.message.html#telegram.Message.stop_poll "telegram.Message.stop_poll")\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.stop_poll.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**message\_id**](#telegram.Bot.stop_poll.params.message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Identifier of the original message with the poll.\
\
- [**reply\_markup**](#telegram.Bot.stop_poll.params.reply_markup) ( [`telegram.InlineKeyboardMarkup`](telegram.inlinekeyboardmarkup.html#telegram.InlineKeyboardMarkup "telegram.InlineKeyboardMarkup"), optional) – An object for a new\
message inline keyboard.\
\
- [**business\_connection\_id**](#telegram.Bot.stop_poll.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business connection on behalf of which the message to be edited was sent\
\
\
\
Added in version 21.4.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.stop_poll.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.stop_poll.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.stop_poll.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.stop_poll.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.stop_poll.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the stopped Poll is returned.\
\
Return type:\
\
[`telegram.Poll`](telegram.poll.html#telegram.Poll "telegram.Poll")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_property_ supports\_inline\_queries [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L511-L517) [¶](#telegram.Bot.supports_inline_queries "Link to this definition")\
\
Bot’s [`telegram.User.supports_inline_queries`](telegram.user.html#telegram.User.supports_inline_queries "telegram.User.supports_inline_queries") attribute.\
Shortcut for the corresponding attribute of [`bot`](#telegram.Bot.bot "telegram.Bot.bot").\
\
Type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
to\_dict( _recursive=True_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L9743-L9751) [¶](#telegram.Bot.to_dict "Link to this definition")\
\
See [`telegram.TelegramObject.to_dict()`](telegram.telegramobject.html#telegram.TelegramObject.to_dict "telegram.TelegramObject.to_dict").\
\
_property_ token [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L391-L398) [¶](#telegram.Bot.token "Link to this definition")\
\
Bot’s unique authentication token.\
\
Added in version 20.0.\
\
Type:\
\
[`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")\
\
_async_ unbanChatMember( _chat\_id_, _user\_id_, _only\_if\_banned=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3918-L3961) [¶](#telegram.Bot.unbanChatMember "Link to this definition")\
\
Alias for [`unban_chat_member()`](#telegram.Bot.unban_chat_member "telegram.Bot.unban_chat_member")\
\
_async_ unbanChatSenderChat( _chat\_id_, _sender\_chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3962-L4001) [¶](#telegram.Bot.unbanChatSenderChat "Link to this definition")\
\
Alias for [`unban_chat_sender_chat()`](#telegram.Bot.unban_chat_sender_chat "telegram.Bot.unban_chat_sender_chat")\
\
_async_ unban\_chat\_member( _chat\_id_, _user\_id_, _only\_if\_banned=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3918-L3961) [¶](#telegram.Bot.unban_chat_member "Link to this definition")\
\
Use this method to unban a previously kicked user in a supergroup or channel.\
\
The user will _not_ return to the group or channel automatically, but will be able to join\
via link, etc. The bot must be an administrator for this to work. By default, this method\
guarantees that after the call the user is not a member of the chat, but will be able to\
join it. So if the user is a member of the chat they will also be _removed_ from the chat.\
If you don’t want this, use the parameter [`only_if_banned`](#telegram.Bot.unban_chat_member.params.only_if_banned "telegram.Bot.unban_chat_member").\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.unban_chat_member.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**user\_id**](#telegram.Bot.unban_chat_member.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Unique identifier of the target user.\
\
- [**only\_if\_banned**](#telegram.Bot.unban_chat_member.params.only_if_banned) ( [`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)"), optional) – Do nothing if the user is not banned.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.unban_chat_member.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.unban_chat_member.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.unban_chat_member.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.unban_chat_member.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.unban_chat_member.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ unban\_chat\_sender\_chat( _chat\_id_, _sender\_chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L3962-L4001) [¶](#telegram.Bot.unban_chat_sender_chat "Link to this definition")\
\
Use this method to unban a previously banned channel in a supergroup or channel.\
The bot must be an administrator for this to work and must have the\
appropriate administrator rights.\
\
Added in version 13.9.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.unban_chat_sender_chat.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**sender\_chat\_id**](#telegram.Bot.unban_chat_sender_chat.params.sender_chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Unique identifier of the target sender chat.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.unban_chat_sender_chat.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.unban_chat_sender_chat.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.unban_chat_sender_chat.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.unban_chat_sender_chat.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.unban_chat_sender_chat.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ unhideGeneralForumTopic( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8789-L8827) [¶](#telegram.Bot.unhideGeneralForumTopic "Link to this definition")\
\
Alias for [`unhide_general_forum_topic()`](#telegram.Bot.unhide_general_forum_topic "telegram.Bot.unhide_general_forum_topic")\
\
_async_ unhide\_general\_forum\_topic( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8789-L8827) [¶](#telegram.Bot.unhide_general_forum_topic "Link to this definition")\
\
Use this method to unhide the ‘General’ topic in a forum supergroup chat. The bot must\
be an administrator in the chat for this to work and must have\
[`can_manage_topics`](telegram.chatadministratorrights.html#telegram.ChatAdministratorRights.can_manage_topics "telegram.ChatAdministratorRights.can_manage_topics") administrator rights.\
\
Added in version 20.0.\
\
Parameters:\
\
[**chat\_id**](#telegram.Bot.unhide_general_forum_topic.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`).\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.unhide_general_forum_topic.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.unhide_general_forum_topic.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.unhide_general_forum_topic.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.unhide_general_forum_topic.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.unhide_general_forum_topic.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ unpinAllChatMessages( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6389-L6426) [¶](#telegram.Bot.unpinAllChatMessages "Link to this definition")\
\
Alias for [`unpin_all_chat_messages()`](#telegram.Bot.unpin_all_chat_messages "telegram.Bot.unpin_all_chat_messages")\
\
_async_ unpinAllForumTopicMessages( _chat\_id_, _message\_thread\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8544-L8587) [¶](#telegram.Bot.unpinAllForumTopicMessages "Link to this definition")\
\
Alias for [`unpin_all_forum_topic_messages()`](#telegram.Bot.unpin_all_forum_topic_messages "telegram.Bot.unpin_all_forum_topic_messages")\
\
_async_ unpinAllGeneralForumTopicMessages( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8588-L8626) [¶](#telegram.Bot.unpinAllGeneralForumTopicMessages "Link to this definition")\
\
Alias for [`unpin_all_general_forum_topic_messages()`](#telegram.Bot.unpin_all_general_forum_topic_messages "telegram.Bot.unpin_all_general_forum_topic_messages")\
\
_async_ unpinChatMessage( _chat\_id_, _message\_id=None_, _business\_connection\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6337-L6388) [¶](#telegram.Bot.unpinChatMessage "Link to this definition")\
\
Alias for [`unpin_chat_message()`](#telegram.Bot.unpin_chat_message "telegram.Bot.unpin_chat_message")\
\
_async_ unpin\_all\_chat\_messages( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6389-L6426) [¶](#telegram.Bot.unpin_all_chat_messages "Link to this definition")\
\
Use this method to clear the list of pinned messages in a chat. If the\
chat is not a private chat, the bot must be an administrator in the chat for this\
to work and must have the [`can_pin_messages`](telegram.chatadministratorrights.html#telegram.ChatAdministratorRights.params.can_pin_messages "telegram.ChatAdministratorRights")\
admin right in a supergroup or [`can_edit_messages`](telegram.chatmemberadministrator.html#telegram.ChatMemberAdministrator.can_edit_messages "telegram.ChatMemberAdministrator.can_edit_messages")\
admin right in a channel.\
\
Shortcuts\
\
[`telegram.User.unpin_all_messages()`](telegram.user.html#telegram.User.unpin_all_messages "telegram.User.unpin_all_messages")\
\
Parameters:\
\
[**chat\_id**](#telegram.Bot.unpin_all_chat_messages.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.unpin_all_chat_messages.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.unpin_all_chat_messages.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.unpin_all_chat_messages.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.unpin_all_chat_messages.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.unpin_all_chat_messages.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ unpin\_all\_forum\_topic\_messages( _chat\_id_, _message\_thread\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8544-L8587) [¶](#telegram.Bot.unpin_all_forum_topic_messages "Link to this definition")\
\
Use this method to clear the list of pinned messages in a forum topic. The bot must\
be an administrator in the chat for this to work and must have\
[`can_pin_messages`](telegram.chatadministratorrights.html#telegram.ChatAdministratorRights.params.can_pin_messages "telegram.ChatAdministratorRights") administrator rights\
in the supergroup.\
\
Shortcuts\
\
[`telegram.Message.unpin_all_forum_topic_messages()`](telegram.message.html#telegram.Message.unpin_all_forum_topic_messages "telegram.Message.unpin_all_forum_topic_messages")\
\
Added in version 20.0.\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.unpin_all_forum_topic_messages.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`).\
\
- [**message\_thread\_id**](#telegram.Bot.unpin_all_forum_topic_messages.params.message_thread_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – Unique identifier for the target message thread of the forum topic.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.unpin_all_forum_topic_messages.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.unpin_all_forum_topic_messages.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.unpin_all_forum_topic_messages.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.unpin_all_forum_topic_messages.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.unpin_all_forum_topic_messages.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ unpin\_all\_general\_forum\_topic\_messages( _chat\_id_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L8588-L8626) [¶](#telegram.Bot.unpin_all_general_forum_topic_messages "Link to this definition")\
\
Use this method to clear the list of pinned messages in a General forum topic. The bot must\
be an administrator in the chat for this to work and must have\
[`can_pin_messages`](telegram.chatadministratorrights.html#telegram.ChatAdministratorRights.params.can_pin_messages "telegram.ChatAdministratorRights") administrator rights in the\
supergroup.\
\
Added in version 20.5.\
\
Parameters:\
\
[**chat\_id**](#telegram.Bot.unpin_all_general_forum_topic_messages.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target supergroup (in the format `@supergroupusername`).\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.unpin_all_general_forum_topic_messages.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.unpin_all_general_forum_topic_messages.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.unpin_all_general_forum_topic_messages.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.unpin_all_general_forum_topic_messages.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.unpin_all_general_forum_topic_messages.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ unpin\_chat\_message( _chat\_id_, _message\_id=None_, _business\_connection\_id=None_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6337-L6388) [¶](#telegram.Bot.unpin_chat_message "Link to this definition")\
\
Use this method to remove a message from the list of pinned messages in a chat. If the\
chat is not a private chat, the bot must be an administrator in the chat for this to work\
and must have the [`can_pin_messages`](telegram.chatadministratorrights.html#telegram.ChatAdministratorRights.params.can_pin_messages "telegram.ChatAdministratorRights") admin\
right in a supergroup or [`can_edit_messages`](telegram.chatmemberadministrator.html#telegram.ChatMemberAdministrator.can_edit_messages "telegram.ChatMemberAdministrator.can_edit_messages") admin\
right in a channel.\
\
Shortcuts\
\
- [`telegram.Message.unpin()`](telegram.message.html#telegram.Message.unpin "telegram.Message.unpin")\
\
- [`telegram.User.unpin_message()`](telegram.user.html#telegram.User.unpin_message "telegram.User.unpin_message")\
\
\
Parameters:\
\
- [**chat\_id**](#telegram.Bot.unpin_chat_message.params.chat_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)") \| [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) – Unique identifier for the target chat or username of the target channel (in the format `@channelusername`).\
\
- [**message\_id**](#telegram.Bot.unpin_chat_message.params.message_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)"), optional) – Identifier of the message to unpin. Required if\
[`business_connection_id`](#telegram.Bot.unpin_chat_message.params.business_connection_id "telegram.Bot.unpin_chat_message") is specified. If not specified,\
the most recent pinned message (by sending date) will be unpinned.\
\
- [**business\_connection\_id**](#telegram.Bot.unpin_chat_message.params.business_connection_id) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)"), optional) –\
\
Unique identifier of the business\
connection on behalf of which the message will be unpinned.\
\
\
\
Added in version 21.5.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.unpin_chat_message.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.unpin_chat_message.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.unpin_chat_message.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.unpin_chat_message.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.unpin_chat_message.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, [`True`](https://docs.python.org/3/library/constants.html#True "(in Python v3.13)") is returned.\
\
Return type:\
\
[`bool`](https://docs.python.org/3/library/functions.html#bool "(in Python v3.13)")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_async_ uploadStickerFile( _user\_id_, _sticker_, _sticker\_format_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6504-L6563) [¶](#telegram.Bot.uploadStickerFile "Link to this definition")\
\
Alias for [`upload_sticker_file()`](#telegram.Bot.upload_sticker_file "telegram.Bot.upload_sticker_file")\
\
_async_ upload\_sticker\_file( _user\_id_, _sticker_, _sticker\_format_, _\*_, _read\_timeout=None_, _write\_timeout=None_, _connect\_timeout=None_, _pool\_timeout=None_, _api\_kwargs=None_) [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L6504-L6563) [¶](#telegram.Bot.upload_sticker_file "Link to this definition")\
\
Use this method to upload a file with a sticker for later use in the\
[`create_new_sticker_set()`](#telegram.Bot.create_new_sticker_set "telegram.Bot.create_new_sticker_set") and [`add_sticker_to_set()`](#telegram.Bot.add_sticker_to_set "telegram.Bot.add_sticker_to_set") methods (can be used multiple\
times).\
\
Changed in version 20.5: Removed deprecated parameter `png_sticker`.\
\
Parameters:\
\
- [**user\_id**](#telegram.Bot.upload_sticker_file.params.user_id) ( [`int`](https://docs.python.org/3/library/functions.html#int "(in Python v3.13)")) – User identifier of sticker file owner.\
\
- [**sticker**](#telegram.Bot.upload_sticker_file.params.sticker) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)") \| [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") \| [`InputFile`](telegram.inputfile.html#telegram.InputFile "telegram.InputFile") \| [`bytes`](https://docs.python.org/3/library/stdtypes.html#bytes "(in Python v3.13)") \| [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)")) –\
\
A file with the sticker in the\
`".WEBP"`, `".PNG"`, `".TGS"` or `".WEBM"`\
format. See [here](https://core.telegram.org/stickers) for technical requirements\
. To upload a file, you can either pass a [file object](https://docs.python.org/3/glossary.html#term-file-object "(in Python v3.13)") (e.g. `open("filename", "rb")`), the file contents as bytes or the path of the file (as string or [`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path "(in Python v3.13)") object). In the latter case, the file contents will either be read as bytes or the file path will be passed to Telegram, depending on the [`local_mode`](#telegram.Bot.params.local_mode "telegram.Bot") setting.\
\
\
\
Added in version 20.2.\
\
- [**sticker\_format**](#telegram.Bot.upload_sticker_file.params.sticker_format) ( [`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")) –\
\
Format of the sticker. Must be one of\
[`telegram.constants.StickerFormat.STATIC`](telegram.constants.html#telegram.constants.StickerFormat.STATIC "telegram.constants.StickerFormat.STATIC"),\
[`telegram.constants.StickerFormat.ANIMATED`](telegram.constants.html#telegram.constants.StickerFormat.ANIMATED "telegram.constants.StickerFormat.ANIMATED"),\
[`telegram.constants.StickerFormat.VIDEO`](telegram.constants.html#telegram.constants.StickerFormat.VIDEO "telegram.constants.StickerFormat.VIDEO").\
\
\
\
Added in version 20.2.\
\
\
Keyword Arguments:\
\
- [**read\_timeout**](#telegram.Bot.upload_sticker_file.params.read_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.read_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.read_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**write\_timeout**](#telegram.Bot.upload_sticker_file.params.write_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) –\
\
Value to pass to [`telegram.request.BaseRequest.post.write_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.write_timeout "telegram.request.BaseRequest.post"). By default, `20` seconds are used as write timeout.\
\
\
\
Deprecated since version 20.7: In future versions, the default value will be changed to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**connect\_timeout**](#telegram.Bot.upload_sticker_file.params.connect_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.connect_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.connect_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**pool\_timeout**](#telegram.Bot.upload_sticker_file.params.pool_timeout) ( [`float`](https://docs.python.org/3/library/functions.html#float "(in Python v3.13)") \| [`None`](https://docs.python.org/3/library/constants.html#None "(in Python v3.13)"), optional) – Value to pass to [`telegram.request.BaseRequest.post.pool_timeout`](telegram.request.baserequest.html#telegram.request.BaseRequest.post.params.pool_timeout "telegram.request.BaseRequest.post"). Defaults to [`DEFAULT_NONE`](telegram.request.baserequest.html#telegram.request.BaseRequest.DEFAULT_NONE "telegram.request.BaseRequest.DEFAULT_NONE").\
\
- [**api\_kwargs**](#telegram.Bot.upload_sticker_file.params.api_kwargs) ( [`dict`](https://docs.python.org/3/library/stdtypes.html#dict "(in Python v3.13)"), optional) – Arbitrary keyword arguments to be passed to the Telegram API. See [`do_api_request()`](#telegram.Bot.do_api_request "telegram.Bot.do_api_request") for limitations.\
\
\
Returns:\
\
On success, the uploaded File is returned.\
\
Return type:\
\
[`telegram.File`](telegram.file.html#telegram.File "telegram.File")\
\
Raises:\
\
[**telegram.error.TelegramError**](telegram.error.html#telegram.error.TelegramError "telegram.error.TelegramError") –\
\
_property_ username [\[source\]](https://github.com/python-telegram-bot/python-telegram-bot/blob/v21.9/telegram/_bot.py#L485-L491) [¶](#telegram.Bot.username "Link to this definition")\
\
Bot’s username. Shortcut for the corresponding attribute of\
[`bot`](#telegram.Bot.bot "telegram.Bot.bot").\
\
Type:\
\
[`str`](https://docs.python.org/3/library/stdtypes.html#str "(in Python v3.13)")