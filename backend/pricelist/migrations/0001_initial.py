# Generated by Django 5.1 on 2024-11-18 19:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="PriceCategory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "title",
                    models.CharField(max_length=50, verbose_name="Название группы цен"),
                ),
                (
                    "description",
                    models.CharField(
                        max_length=250, verbose_name="Описание группы цен"
                    ),
                ),
            ],
            options={
                "verbose_name": "Группа цен",
                "verbose_name_plural": "Группы цен",
            },
        ),
        migrations.CreateModel(
            name="Price",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=50, verbose_name="Заголовок")),
                ("price", models.PositiveIntegerField(verbose_name="Цена")),
                (
                    "category",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="prices",
                        to="pricelist.pricecategory",
                        verbose_name="Категория",
                    ),
                ),
            ],
            options={
                "verbose_name": "Цена",
                "verbose_name_plural": "Цены",
            },
        ),
    ]
