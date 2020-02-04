from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _
from django.contrib.auth import get_user_model
# from .models import User

User = get_user_model()


class UserAdmin(BaseUserAdmin):
    ordering = ['id']
    # list_display = ['username', 'email']
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        (_('Personal Info'), {'fields': (
            'first_name', 'last_name', 'gender', 'phone_number', 'bio', 'followers', 'profile_picture',)}),
        (
            _('Permissions'),
            {'fields': ('is_active', 'is_staff', 'is_superuser', 'is_admin',)}
        ),
        (_('Important dates'), {'fields': ('last_login',)})
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'first_name', 'last_name', 'gender', 'phone_number', 'bio', 'followers', 'profile_picture', 'is_active', 'is_staff', 'is_superuser', 'is_admin',)
        }),
    )


admin.site.register(User, UserAdmin)
