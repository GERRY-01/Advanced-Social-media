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

    return Response({'message': 'User registered successfully'})

@api_view(['POST'])
def complete_registration(request):
    profile_pic = request.FILES.get('profilePicture')
    bio = request.data.get('bio')
    phone = request.data.get('phone')
    location = request.data.get('location')

    if not profile_pic or not bio or not phone or not location:
        return Response({'message': 'All fields are required'}, status=400)

    registration = Registration.objects.get(user=request.user)
    registration.profile_pic = profile_pic
    registration.bio = bio
    registration.phone_num = phone
    registration.location = location
    registration.save()

    return Response({'message': 'Registration completed successfully'})
