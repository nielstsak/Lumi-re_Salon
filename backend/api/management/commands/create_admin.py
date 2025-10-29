import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Creates or updates a superuser non-interactively.'

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

        try:
            # Essayer de récupérer l'utilisateur
            user = User.objects.get(username=username)

            # Mettre à jour l'email et le mot de passe
            user.email = email
            user.set_password(password)
            user.save()

            self.stdout.write(self.style.SUCCESS(
                f"Superuser '{username}' already exists. Email and password updated."
            ))

        except User.DoesNotExist:
            # Créer l'utilisateur s'il n'existe pas
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