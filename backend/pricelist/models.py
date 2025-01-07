from django.db import models


class PriceCategory(models.Model):
    title = models.CharField(max_length=50,
                             verbose_name="Название группы цен")
    description = models.CharField(max_length=250,
                                   verbose_name="Описание группы цен")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Группа цен"
        verbose_name_plural = "Группы цен"


class Price(models.Model):
    title = models.CharField(max_length=50,
                             verbose_name="Заголовок")
    price = models.PositiveIntegerField(verbose_name="Цена")
    category = models.ForeignKey(PriceCategory,
                                 on_delete=models.CASCADE,
                                 related_name='prices',
                                 verbose_name="Категория")

    def __str__(self):
        return f"{self.title} ({self.category.title}) {self.price} руб."

    class Meta:
        verbose_name = "Цена"
        verbose_name_plural = "Цены"
