from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
# from my_auth.managers import CustomUserManager


class MyUser(AbstractBaseUser, PermissionsMixin):
    fullname = models.CharField(max_length=50, blank=True)
    name = models.CharField(max_length=50, blank=True)
    username = models.CharField(max_length=30, blank=True, null=True)
    email = models.EmailField(unique=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_auth = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    # objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __unicode__(self):
        return self.email

    def is_authenticated(self):
        return True

    def get_short_name(self):
        return self.name

    def get_full_name(self):
        return self.fullname

