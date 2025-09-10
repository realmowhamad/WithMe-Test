# profiles/tests/test_models.py
from django.test import TestCase
from django.contrib.auth.models import User
from api.models import Profile
from datetime import date

class ProfileModelTest(TestCase):
    def test_create_profile(self):
        # Create a user
        user = User.objects.create_user(username="testuser", email="test@example.com", password="TestPass123")
        
        # Create a profile for that user
        profile = Profile.objects.create(
            user=user,
            bio="This is a test bio",
            location="London",
            date_of_birth=date(1990, 1, 1),
            gender="M"
        )
        
        # Assertions
        self.assertEqual(str(profile), "testuser's Profile")
        self.assertEqual(profile.bio, "This is a test bio")
        self.assertEqual(profile.location, "London")
        self.assertEqual(profile.date_of_birth, date(1990, 1, 1))
        self.assertEqual(profile.gender, "M")
        self.assertEqual(profile.user.username, "testuser")
