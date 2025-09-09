#!/usr/bin/env python
"""
Test script to verify superuser creation functionality
Run this script to test if the superuser creation command works correctly
"""

import os
import sys
import django

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'simple_backend.settings')
django.setup()

from django.contrib.auth.models import User
from django.core.management import call_command
from io import StringIO


def test_superuser_creation():
    """Test the superuser creation command"""
    print("Testing superuser creation...")
    
    # Check if superuser already exists
    username = 'adminuser123'
    if User.objects.filter(username=username).exists():
        print(f"✓ Superuser '{username}' already exists")
        user = User.objects.get(username=username)
        print(f"  - Email: {user.email}")
        print(f"  - Is superuser: {user.is_superuser}")
        print(f"  - Is staff: {user.is_staff}")
    else:
        print(f"✗ Superuser '{username}' does not exist")
        
        # Run the management command
        print("Running create_superuser command...")
        try:
            call_command('create_superuser')
            
            # Check if it was created
            if User.objects.filter(username=username).exists():
                print(f"✓ Successfully created superuser '{username}'")
                user = User.objects.get(username=username)
                print(f"  - Email: {user.email}")
                print(f"  - Is superuser: {user.is_superuser}")
                print(f"  - Is staff: {user.is_staff}")
            else:
                print(f"✗ Failed to create superuser '{username}'")
        except Exception as e:
            print(f"✗ Error running command: {str(e)}")


if __name__ == '__main__':
    test_superuser_creation()
