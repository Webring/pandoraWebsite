import hashlib
import io

from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models
from django_ckeditor_5.fields import CKEditor5Field


class DirectionTag(models.Model):
    title = models.CharField(max_length=50,
                             verbose_name="Название категории направления")
    description = models.CharField(max_length=200,
                                   verbose_name="Описание")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Тэг направления"
        verbose_name_plural = 'Тэги направления'


class Direction(models.Model):
    name = models.CharField(max_length=150,
                            verbose_name="Название направления")
    image = models.ImageField(upload_to='direction/image/%Y/%m/%d/',
                              verbose_name="Главное изображение направления")
    tags = models.ManyToManyField('DirectionTag',
                                  blank=True,
                                  related_name='directions',
                                  verbose_name="Категории")
    description = CKEditor5Field(blank=True,
                                 default="",
                                 config_name="extends",
                                 verbose_name="Описание направления")

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if self.image:
            img = Image.open(self.image)
            if img.mode == 'RGBA':
                img = img.convert('RGB')
            img_io = io.BytesIO()
            img.save(img_io, format='JPEG', quality=70)  # Качество можно регулировать
            img_hash = hashlib.md5(img_io.getvalue()).hexdigest()  # Хэш от содержимого
            new_filename = f"{img_hash}.jpg"
            img_content = InMemoryUploadedFile(
                img_io, None, new_filename, 'image/jpeg', img_io.tell(), None
            )
            self.image = img_content
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Направление"
        verbose_name_plural = 'Направления'
