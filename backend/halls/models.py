import hashlib
import io
import os

from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models

from django_ckeditor_5.fields import CKEditor5Field


class Photo(models.Model):
    image = models.ImageField(upload_to='halls/photos/%Y/%m/%d',
                              verbose_name="Изображение")
    description = models.CharField(max_length=100,
                                   blank=True,
                                   default='',
                                   verbose_name="Описание фотографии")

    def __str__(self):
        return f"Изображение с описанием '{self.description}'"

    def save(self, *args, **kwargs):
        if self.image:
            img = Image.open(self.image)
            if img.mode == 'RGBA':
                img = img.convert('RGB')
            img_io = io.BytesIO()
            img.save(img_io, format='JPEG', quality=70)
            img_hash = hashlib.md5(img_io.getvalue()).hexdigest()
            new_filename = f"{img_hash}.jpg"
            img_content = InMemoryUploadedFile(
                img_io, None, new_filename, 'image/jpeg', img_io.tell(), None
            )
            self.image = img_content
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Фотография зала"
        verbose_name_plural = "Фотографии зала"


class HallCenter(models.Model):
    address = models.CharField(max_length=100,
                               verbose_name="Адрес")
    description = CKEditor5Field(blank=True,
                                 default="",
                                 config_name="extends",
                                 verbose_name="Описание")
    photos = models.ManyToManyField(Photo,
                                    verbose_name="Фотографии")

    def __str__(self):
        return f"Зал по адресу: {self.address}"

    class Meta:
        verbose_name = 'Локация'
        verbose_name_plural = 'Локации'


class Hall(models.Model):
    title = models.CharField(max_length=20,
                             verbose_name="Название зала")
    description = CKEditor5Field(blank=True,
                                 default="",
                                 config_name="extends",
                                 verbose_name="Описание")
    square = models.PositiveIntegerField(verbose_name="Площадь зала")
    hall_center = models.ForeignKey(HallCenter,
                                    on_delete=models.CASCADE,
                                    related_name='halls',
                                    verbose_name="Локация")
    photos = models.ManyToManyField(Photo,
                                    verbose_name="Фотографии")

    def __str__(self):
        return f"{self.title} {self.hall_center.address}"

    class Meta:
        verbose_name = 'Зал'
        verbose_name_plural = 'Залы'
