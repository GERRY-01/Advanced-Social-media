from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Registration(models.Model):
        user = models.OneToOneField(User,on_delete=models.CASCADE)
        dob = models.DateField()
        GENDER_CHOICES = (
            ('male', 'Male'),
            ('female', 'Female'),
            ('other', 'Other'),
        )
        gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
        profile_pic = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
        bio = models.TextField()
        phone_num = models.CharField(max_length=10)
        location = models.CharField(max_length=20)