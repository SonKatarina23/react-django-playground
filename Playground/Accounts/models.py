from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# External Imports
from uuid import uuid4
from phonenumber_field.modelfields import PhoneNumberField

# Model Fields
# Django default user model fields :
# id : generated with UUID
# username
# email
# password
# is_staff
# is_active
# is_superuser
# date_joined
# Exta fields :
# Gender (choice)
# Phone Number
# Bio
# Followers
# Profile Picture

GENDER = (
    ('M', 'Male'),
    ('F', 'Female'),
    ('X', 'Prefer not to mention')
)


def pfp_directory(instance, filename):
    file_extension = filename.split('.')[-1]
    filename = f'user_ProfilePicture.{file_extension}'
    return f'photos/user_{instance.username}/{filename}'


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not username:
            raise ValueError('You need to have a valid username')
        elif not email:
            raise ValueError('You need  to have a valid email address')

        user = self.model(
            username=username,
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        user = self.create_user(username, email, password)
        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    # Default fields
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField()
    date_joined = models.DateTimeField(
        auto_now_add=True, verbose_name="Joined at")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # Additional fields
    gender = models.CharField(choices=GENDER, max_length=50)
    phone_number = PhoneNumberField(blank=True)
    bio = models.CharField(max_length=322)
    followers = models.ManyToManyField(
        "User", related_name="followings", blank=True)
    profie_picture = models.ImageField(upload_to=pfp_directory, blank=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ('email',)
    objects = UserManager()

    def __str__(self):
        return f'@{self.username}'

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'
