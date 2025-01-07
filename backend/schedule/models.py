from django.db import models
from django.utils import timezone

from directions.models import Direction
from halls.models import Hall
from teachers.models import Teacher


class ScheduleItem(models.Model):
    DAYS_OF_WEEK = [
        (0, 'Понедельник'),
        (1, 'Вторник'),
        (2, 'Среда'),
        (3, 'Четверг'),
        (4, 'Пятница'),
        (5, 'Суббота'),
        (6, 'Воскресенье'),
    ]

    hall = models.ForeignKey(Hall,
                             on_delete=models.CASCADE,
                             related_name='schedules',
                             verbose_name="Зал")
    direction = models.ForeignKey(Direction,
                                  on_delete=models.CASCADE,
                                  related_name='schedules',
                                  verbose_name="Направление")
    teachers = models.ManyToManyField(Teacher,
                                      related_name='schedules',
                                      verbose_name="Преподаватели")
    weekday = models.IntegerField(choices=DAYS_OF_WEEK,
                                  verbose_name="День недели")
    start_time = models.TimeField(verbose_name="Время начала занятия")
    end_time = models.TimeField(verbose_name="Время окончания занятия")
    remark = models.CharField(max_length=200,
                              blank=True,
                              default="",
                              verbose_name="Примечание")

    class Meta:
        verbose_name = "Элемент рассписания"
        verbose_name_plural = "Элементы рассписания"
        ordering = ['weekday', 'start_time']

    def __str__(self):
        weekday_display = dict(self.DAYS_OF_WEEK).get(self.weekday)
        return f"{self.direction} - {self.hall} ({weekday_display} {self.start_time} - {self.end_time})"


class ScheduleAnnouncementManager(models.Manager):
    def active(self):
        current_time = timezone.now()
        return self.filter(start_display__lte=current_time, end_display__gte=current_time)


class ScheduleAnnouncement(models.Model):
    text = models.TextField(verbose_name="Текст объявления")
    start_display = models.DateTimeField(verbose_name="Начало отображения объявления")
    end_display = models.DateTimeField(verbose_name="Окончание отображения объявления")

    objects = ScheduleAnnouncementManager()

    @property
    def is_active(self):
        return self.start_display <= timezone.now() <= self.end_display

    class Meta:
        verbose_name = "Объявление"
        verbose_name_plural = "Объявления"
        ordering = ['start_display']

    def __str__(self):
        return f"Объявление: {self.text[:20]}..."  # Показать первые 20 символов текста
