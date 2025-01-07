import asyncio

import telegram
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from telegram import InlineKeyboardButton, InlineKeyboardMarkup

from backend import settings
from callback.models import Callback

message_template = """
Заказали обратный звонок!

**Время:** {}

**Имя:** {}
**Номер:**{}

[Telegram](t.me/{}) или [WhatsApp](wa.me/{})
"""


def run_async(func):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    return loop.run_until_complete(func)


async def send_message_async(bot, chat_id, instance):
    message = message_template.format(instance.created_at.strftime("%H:%M %d.%m.%Y"),
                                      instance.name,
                                      instance.phone_number,
                                      instance.phone_number,
                                      instance.phone_number,
                                      )
    reply_markup = InlineKeyboardMarkup([
        [
            InlineKeyboardButton("Telegram", url=f"t.me/{instance.phone_number}"),
            InlineKeyboardButton("whatsapp", url=f"wa.me/{instance.phone_number}"),
        ]
    ])
    try:
        await bot.send_message(chat_id=chat_id,
                               text=message,
                               parse_mode='Markdown',
                               disable_web_page_preview=True,
                               reply_markup=reply_markup,
                               )
    except Exception as e:
        print("Не удалось отправить сообщение пользователю", chat_id, e)


@receiver(post_save, sender=Callback)
def send_notification_to_telegram(sender, instance, created, **kwargs):
    if created:
        bot = telegram.Bot(token=settings.TELEGRAM_BOT_TOKEN)
        users = User.objects.exclude(last_name__isnull=True).exclude(last_name__exact='')

        for user in users:
            run_async(send_message_async(bot, user.last_name, instance))
