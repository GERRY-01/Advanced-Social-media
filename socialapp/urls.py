from django.urls import path
from . import views

urlpatterns = [
    path('register', views.register_user, name='register'),
    path('completeregistration', views.complete_registration, name='completeregistration'),
    path('login', views.login_user, name='login'),
    path('userdata', views.user_data, name='userdata'),
    path('createpost', views.create_post, name='createpost'),
    path('getposts', views.get_posts, name='getposts'),
    path('deletepost/<int:post_id>', views.delete_post, name='deletepost'),
    path('editpost/<int:post_id>', views.edit_post, name='editpost'),
]