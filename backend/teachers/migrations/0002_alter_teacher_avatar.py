# Generated by Django 5.1 on 2025-01-06 07:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teachers', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teacher',
            name='avatar',
            field=models.ImageField(upload_to='teachers/avatars/%Y/%m/%d', verbose_name='Аватарка учителя'),
        ),
    ]
