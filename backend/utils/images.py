from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile
from django.utils.text import slugify


def compress_image(image, quality=70):
    im = Image.open(image)
    im = im.convert("RGB")
    output = BytesIO()
    im.save(output, format='JPEG', quality=quality)
    output.seek(0)
    return ContentFile(output.read())


def process_images(instance, field_names, quality=70):
    """
    Сжимает изображения и изменяет их имена в формате pk_modelName_fieldName.jpg.
    :param instance: Экземпляр модели.
    :param field_names: Список имен полей с изображениями.
    :param quality: Качество сжатия (по умолчанию 70).
    """
    processed_fields = []  # Список для отслеживания обработанных полей

    # Проходим по списку полей
    for field_name in field_names:
        image_field = getattr(instance, field_name)

        # Если поле пустое, пропускаем его
        if not image_field:
            continue

        # Если объект новый (pk нет), сохраняем его временно
        if not instance.pk:
            temp_image = image_field  # Сохраняем ссылку на исходное изображение
            setattr(instance, field_name, None)  # Убираем изображение перед сохранением
            instance.save()  # Сохраняем объект без изображения
            setattr(instance, field_name, temp_image)  # Восстанавливаем изображение

        # Сжимаем изображение
        compressed_image = compress_image(image_field, quality)

        # Генерируем новое имя файла в формате pk_modelName_fieldName.jpg
        new_filename = f"{instance.pk}_{slugify(instance.__class__.__name__)}_{field_name}.jpg"

        # Обновляем изображение с новым именем
        image_field.save(new_filename, compressed_image, save=False)

        # Добавляем поле в список обработанных
        processed_fields.append(field_name)

    # Если есть обработанные поля, сохраняем изменения
    if processed_fields:
        # Сохраняем только изменённые поля, используя update_fields
        super(type(instance), instance).save(update_fields=processed_fields)