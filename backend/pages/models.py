import hashlib
import io

from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models
from django_ckeditor_5.fields import CKEditor5Field


class Page(models.Model):
    title = models.CharField(max_length=150,
                             verbose_name="Заголовок страницы")
    show_in_list = models.BooleanField(default=True,
                                       verbose_name="Показывать в общем списке на сайте")
    disabled = models.BooleanField(default=False,
                                   verbose_name="Отключить страницу")
    image = models.ImageField(upload_to='pages/images/%Y/%m/%d/',
                              verbose_name="Изображение страницы")
    content = CKEditor5Field(blank=True,
                             default="",
                             config_name="extends",
                             verbose_name="Содержимое страницы")

    def __str__(self):
        return self.title

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
        verbose_name = 'Страница'
        verbose_name_plural = 'Страницы'







