import hashlib
import io

from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models
from django_ckeditor_5.fields import CKEditor5Field

from directions.models import Direction


class Teacher(models.Model):
    name = models.CharField(max_length=150,
                            verbose_name="Имя преподавателя")
    avatar = models.ImageField(upload_to='teachers/avatars/%Y/%m/%d',
                               verbose_name="Аватарка учителя")
    directions = models.ManyToManyField(Direction,
                                        blank=True,
                                        related_name='teachers',
                                        verbose_name="Направления"
                                        )
    description = CKEditor5Field(blank=True,
                                 default="",
                                 config_name="extends",
                                 verbose_name="О тренере"
                                 )

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.avatar:
            img = Image.open(self.avatar)
            if img.mode == 'RGBA':
                img = img.convert('RGB')
            img_io = io.BytesIO()
            img.save(img_io, format='JPEG', quality=70)  # Качество можно регулировать
            img_hash = hashlib.md5(img_io.getvalue()).hexdigest()  # Хэш от содержимого
            new_filename = f"{img_hash}.jpg"
            img_content = InMemoryUploadedFile(
                img_io, None, new_filename, 'image/jpeg', img_io.tell(), None
            )
            self.avatar = img_content
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Тренер"
        verbose_name_plural = "Тренеры"
