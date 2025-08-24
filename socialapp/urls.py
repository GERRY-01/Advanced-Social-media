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
    path('likepost/<int:post_id>', views.like_post, name='likepost'),
    path('addcomment/<int:post_id>', views.add_comment, name='addcomment'),
    path('getcomments/<int:post_id>', views.get_comments, name='getcomments'),
    path('logout', views.logout_user, name='logout'),
]