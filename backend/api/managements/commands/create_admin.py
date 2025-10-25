import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Creates a superuser non-interactively using environment variables.'

    def handle(self, *args, **options):
        username = os.environ.get('DJANGO_ADMIN_USER')
        email = os.environ.get('DJANGO_ADMIN_EMAIL')
        password = os.environ.get('DJANGO_ADMIN_PASS')

        if not all([username, email, password]):
            self.stdout.write(self.style.ERROR(
                'Missing environment variables. Set DJANGO_ADMIN_USER, '
                'DJANGO_ADMIN_EMAIL, and DJANGO_ADMIN_PASS.'
            ))
            return

        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.SUCCESS(
                f"Superuser '{username}' already exists. Skipping."
            ))
        else:
            try:
                User.objects.create_superuser(
                    username=username,
                    email=email,
                    password=password
                )
                self.stdout.write(self.style.SUCCESS(
                    f"Successfully created superuser '{username}'."
                ))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error creating superuser: {e}"))