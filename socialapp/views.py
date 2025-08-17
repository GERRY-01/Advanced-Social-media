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
    
@api_view(['GET'])
def user_data(request):
    user_id = request.query_params.get('user_id')
    try:
        user = User.objects.get(id=user_id)
        registration = Registration.objects.get(user=user)
        return Response({
            "username": user.username,
            "profile_pic": request.build_absolute_uri(registration.profile_pic.url)
        })
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
    except Registration.DoesNotExist:
        return Response({"error": "Registration not found"}, status=404)