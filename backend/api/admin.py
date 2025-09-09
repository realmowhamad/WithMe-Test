from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from .models import Profile


class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'
    fields = ['date_of_birth', 'gender']  # Only show registration fields


class CustomUserAdmin(UserAdmin):
    inlines = (ProfileInline,)
    list_display = ['id', 'username', 'email', 'get_date_of_birth', 'get_gender', 'date_joined']
    list_filter = ['date_joined', 'profile__gender']
    search_fields = ['username', 'email']
    readonly_fields = ['username', 'date_joined']
    
    # Remove unnecessary fields from the form
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Profile Info', {'fields': ()}),  # Will be handled by inline
        ('Important dates', {'fields': ('date_joined',)}),
    )
    
    def get_date_of_birth(self, obj):
        try:
            return obj.profile.date_of_birth
        except Profile.DoesNotExist:
            return None
    get_date_of_birth.short_description = 'Date of Birth'
    
    def get_gender(self, obj):
        try:
            return obj.profile.get_gender_display() if obj.profile.gender else None
        except Profile.DoesNotExist:
            return None
    get_gender.short_description = 'Gender'


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'get_user_email', 'date_of_birth', 'gender', 'get_date_joined', 'created_at']
    list_filter = ['created_at', 'gender']
    search_fields = ['user__username', 'user__email']
    fields = ['user', 'get_user_email', 'get_date_joined', 'date_of_birth', 'gender']  # Show all registration fields
    readonly_fields = ['user', 'get_user_email', 'get_date_joined']
    
    def get_user_email(self, obj):
        return obj.user.email
    get_user_email.short_description = 'Email'
    
    def get_date_joined(self, obj):
        return obj.user.date_joined
    get_date_joined.short_description = 'Date Joined'


# Unregister the default User admin and register our custom one
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
