from django.db import models
from django.utils.timezone import now


class Callback(models.Model):
    name = models.CharField(max_length=100)

    phone_number = models.CharField(max_length=12,
                                    verbose_name="Номер телефона")

    telegram_allowed = models.BooleanField(default=False,
                                           verbose_name="Разрешен ли tg")

    whatsapp_allowed = models.BooleanField(default=False,
                                           verbose_name="Разрешен ли wa")

    created_at = models.DateTimeField(default=now,
                                      verbose_name="Дата создания заявки")

    called_at = models.DateTimeField(null=True,
                                     blank=True,
                                     verbose_name="Дата обработки заявки")

    def __str__(self):
        return self.phone_number

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Обратный звонок"
        verbose_name_plural = "Обратные звонки"
