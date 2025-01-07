from django.db import models


class Social(models.Model):
    title = models.CharField(max_length=100,
                             verbose_name="Название соц. сети")
    direct_link = models.CharField(max_length=200,
                                  verbose_name="Ссылка прямая (https://...)")
    internal_link = models.CharField(max_length=100,
                                     verbose_name="Ссылка внутренняя (@nametag)")
    icon = models.CharField(max_length=100,
                            verbose_name="Имя в файле с иконками")

    def __str__(self):
        return f"Соц. сеть {self.title}"

    class Meta:
        verbose_name = "Контакт"
        verbose_name_plural = "Контакты"
