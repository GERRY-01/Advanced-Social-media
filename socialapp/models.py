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

class Posts(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    caption = models.TextField()
    image = models.ImageField(upload_to='post_images/', blank=True, null=True)
    video = models.FileField(upload_to='post_videos/', blank=True, null=True)
    likes = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)
    shares = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)

class CommentSection(models.Model):
    post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

class Like(models.Model):
    post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)