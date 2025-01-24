from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = 'Create a superuser if no users exist in the database'

    def handle(self, *args, **kwargs):
        User = get_user_model()

        # Проверяем, есть ли пользователи в базе данных
        if User.objects.count() == 0:
            admin_username = "admin"
            admin_password = "adminadmin"

            User.objects.create_superuser(
                username=admin_username,
                password=admin_password
            )
            self.stdout.write(
                self.style.SUCCESS(f"Superuser '{admin_username}' created.")
            )
        else:
            self.stdout.write(
                self.style.WARNING("Users already exist. Skipping superuser creation.")
            )