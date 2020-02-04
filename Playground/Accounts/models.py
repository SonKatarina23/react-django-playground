# Django Imports
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# External imports
from uuid import uuid4
from phonenumber_field.modelfields import PhoneNumberField

GENDER = (
    ('M', 'Male'),
    ('F', 'Female'),
    ('X', "Prefer not to mention")
)


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not username:
            raise ValueError('You need to have a valid username')
        elif not email:
            raise ValueError('You need to have a valid email address')

        user = self.model(
            username=username,
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, username, email, password=None):
        user = self.create_user(username, email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user


# Permission mixin gives u is_superuser attribute
class User(AbstractBaseUser, PermissionsMixin):
    # Basic Attributes
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # Additional Attributes
    gender = models.CharField(
        max_length=50, choices=GENDER, default='M', blank=True)
    bio = models.CharField(max_length=322)
    phone_number = PhoneNumberField(blank=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    objects = UserManager()

    def __str__(self):
        return self.username
