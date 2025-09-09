from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.db import IntegrityError


class Command(BaseCommand):
    help = 'Creates a superuser with predefined credentials if it does not exist'

    def handle(self, *args, **options):
        username = 'adminuser123'
        email = 'a@gmail.com'
        password = 'London2025'

        try:
            # Check if superuser already exists
            if User.objects.filter(username=username).exists():
                self.stdout.write(
                    self.style.WARNING(f'Superuser "{username}" already exists. Skipping creation.')
                )
                return

            # Create superuser
            user = User.objects.create_superuser(
                username=username,
                email=email,
                password=password
            )
            
            self.stdout.write(
                self.style.SUCCESS(f'Successfully created superuser "{username}"')
            )
            
        except IntegrityError:
            self.stdout.write(
                self.style.ERROR(f'Error creating superuser "{username}". User might already exist.')
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Unexpected error creating superuser: {str(e)}')
            )
