from rest_framework.decorators import api_view
from rest_framework.response import Response
from socialapp.models import *
from django.contrib.auth import authenticate, login

@api_view(['POST'])
def register_user(request):
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    username = request.data.get('username')
    email = request.data.get('email')
    dob = request.data.get('dob')
    gender = request.data.get('gender')
    password = request.data.get('password')

    if not first_name or not last_name or not username or not email or not dob or not gender or not password:
        return Response({'message': 'All fields are required'}, status=400)
    
    if User.objects.filter(username=username).exists():
        return Response({'message': 'Username already exists'}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({'message': 'Email already exists'}, status=400)

    user = User.objects.create_user(username=username, email=email, password=password)
    user.first_name = first_name
    user.last_name = last_name
    user.save()

    registration = Registration(user=user, dob=dob, gender=gender)
    registration.save()

    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)

    return Response({'message': 'User registered successfully','user_id': user.id})

@api_view(['POST'])
def complete_registration(request):
    user_id = request.data.get('user_id')
    profile_pic = request.FILES.get('profilePicture')
    bio = request.data.get('bio')
    phone = request.data.get('phone')
    location = request.data.get('location')

    if not profile_pic or not bio or not phone or not location:
        return Response({'message': 'All fields are required'}, status=400)

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'message': 'User not found'}, status=404)
    
    try:
        registration = Registration.objects.get(user=user)
    except Registration.DoesNotExist:
        return Response({'message': 'Registration not found'}, status=404)
    registration.profile_pic = profile_pic
    registration.bio = bio
    registration.phone_num = phone
    registration.location = location
    registration.save()

    return Response({'message': 'Registration completed successfully'})

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)
        return Response({'message': 'Login successful', 'user_id': user.id})
    else:
        return Response({'message': 'Invalid credentials'}, status=401)
    
 # Fetching user data   
@api_view(['GET'])
def user_data(request):
    user_id = request.query_params.get('user_id')
    try:
        user = User.objects.get(id=user_id)
        registration = Registration.objects.get(user=user)

        user_info = {
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "profile_pic": request.build_absolute_uri(registration.profile_pic.url) if registration.profile_pic else None,
            "bio": registration.bio,
            "dob": registration.dob,
            "gender": registration.gender,
            "phone_num": registration.phone_num,
            "location": registration.location,
        }
        return Response(user_info)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
    except Registration.DoesNotExist:
        return Response({"error": "Registration not found"}, status=404)

@api_view(['POST'])
def create_post(request):
    user_id = request.data.get('user_id')
    caption = request.data.get('caption')
    image = request.FILES.get('image')
    video = request.FILES.get('video')

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'message': 'User not found'}, status=404)

    post = Posts(user=user, caption=caption, image=image, video=video)
    post.save()

    return Response({
        'message': 'Post created successfully',
        'post': {
            'id': post.id,
            'caption': post.caption,
            'image': request.build_absolute_uri(post.image.url) if post.image else None,
            'video': request.build_absolute_uri(post.video.url) if post.video else None,
            'time': post.timestamp,
            'likes': post.likes,
            'comments': post.comments,
            'shares': post.shares,
        }
    })

# Fetching posts
@api_view(['GET'])
def get_posts(request):
    posts = Posts.objects.all().order_by('-timestamp')
    post_data = []
    for post in posts:
        post_data.append({
            'id': post.id,
            'caption': post.caption,
            'image': request.build_absolute_uri(post.image.url) if post.image else None,
            'video': request.build_absolute_uri(post.video.url) if post.video else None,
            'time': post.timestamp,
            'likes': post.likes,
            'comments': post.comments,
            'shares': post.shares,
            'user': {
                'id': post.user.id,
                'username': post.user.username,
                'profile_pic': request.build_absolute_uri(post.user.registration.profile_pic.url) if post.user.registration.profile_pic else None
            }
        })
    return Response({'posts': post_data})

@api_view(['DELETE'])
def delete_post(request, post_id):
    try:
        post = Posts.objects.get(id=post_id)
        post.delete()
        return Response({'message': 'Post deleted successfully'})
    except Posts.DoesNotExist:
        return Response({'message': 'Post not found'}, status=404)
    
@api_view(['PUT'])
def edit_post(request, post_id):
    try:
        post = Posts.objects.get(id=post_id)
        post.caption = request.data.get('caption')
        if 'image' in request.FILES:
            post.image = request.FILES['image']
        if 'video' in request.FILES:
            post.video = request.FILES['video']
        post.save()
        return Response({'message': 'Post edited successfully'})
    except Posts.DoesNotExist:
        return Response({'message': 'Post not found'}, status=404)
    
@api_view(['POST'])
def like_post(request, post_id):
   post = Posts.objects.get(id=post_id)
   isliked = request.data.get('liked', False)

   if isliked:
       post.likes += 1
   else:
       post.likes -= 1 if post.likes > 0 else 0

   post.save()

   return Response({
       'likes': post.likes,
       'liked': isliked
   })
   

