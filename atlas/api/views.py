from argparse import ArgumentDefaultsHelpFormatter
from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers import *
from .models import *

# Create your views here.
# /////////////////////////////////////////////   U   S   E   R   S   ////////////////////////////////////////////////////

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    

#register a new student
@api_view(['POST'])
def registerStudent(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name = data['first_name'],
            last_name = data['last_name'], 
            username = data['username'], 
            email = data['email'],
            password = make_password(data['password'])
        )
        
        student = Student.objects.create(
            user = user,
            university = data['university']
        )

        serializer = UserSerializerWithToken(user, many = False)
        
        return Response(serializer.data)

    except:
        message = {'detail' : 'There is already an account using this email or username.'}
            
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
#register a new provider
@api_view(['POST'])
def registerProvider(request):
    data = request.data

    print(data)
    try:
        user = User.objects.create(
            first_name = data['first_name'],
            last_name = data['last_name'], 
            username = data['username'], 
            email = data['email'],
            password = make_password(data['password'])
        )
        
        provider = Provider.objects.create(
            user = user,
            providerType = data['providerType'],
            category = data['category'],
            afm = data['afm'],
            phone = data['phone'],
            workers = data['workers'],
            country = data['country'],
            street = data['street'],
            postal = data['postal'],
            name = data['name'],
            identification = data['identification']
        )

        serializer = UserSerializerWithToken(user, many = False)
        
        return Response(serializer.data)

    except:
        message = {'detail' : 'There is already an account using this email or username.'}
            
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# #update user information
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user

    serializer = UserSerializerWithToken(user, many=False)
    
    data = request.data
    
    
    user.first_name = data['first_name']
    user.last_name = data['last_name']
    user.username = data['username']
    user.email = data['email']

    #password change is optional
    if data['password'] != '':
        user.password = make_password(data['password'])
        
    # if(data['is_student'] == 'false'):
    if (hasattr(user, 'provider')):
        user.provider.providerType = data['providerType']
        user.provider.category = data['category']
        user.provider.afm = data['afm']
        user.provider.country = data['country']
        user.provider.workers = data['workers']
        user.provider.street = data['street']
        user.provider.postal = data['postal']
        user.provider.name = data['name']
        user.provider.identification = data['identification']
        user.provider.phone = data['phone']
        
        user.provider.save()
    
    user.save()

    return Response(serializer.data)

#get user info by requested user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user

    serializer = User_Serializer(user, many=False)
    return Response(serializer.data)



# /////////////////////////////////////////  I N T E R N S H I P S   ////////////////////////////////////////////////////
@api_view(['GET'])
def all_internship(request):

    uni = request.query_params.get('uni')         #keyword is for the search option 
    if uni == None:
        uni=''
    lenght = request.query_params.get('len')         #keyword is for the search option 
    if lenght == None:
        lenght=''
    typeS = request.query_params.get('typeS')         #keyword is for the search option 
    if typeS == None:
        typeS=''
    loc = request.query_params.get('loc')         #keyword is for the search option 
    if loc == None:
        loc=''
    
    #query the internships that contains keyword  
    internship = Internship.objects.filter(
                            university__icontains = uni, 
                            lenght__icontains = lenght,
                            type__icontains = typeS,
                            city__icontains = loc
                        )
    
    serializer = Internship_Serializer(internship, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def provider_internship(request):
    
    user = request.user
    
    internship = Internship.objects.filter(user = user)        

    serializer = Internship_Serializer(internship, many=True)
    
    return Response(serializer.data)

#returns a sigle internship
@api_view(['GET'])
def internship(request, pk):
    internship = Internship.objects.get(_id=pk)
    serializer = Internship_Serializer(internship, many=False)
    return Response(serializer.data)    

#creates an internship
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_internship(request):

    user = request.user
    data = request.data

    internship = Internship.objects.create (   
        user = user,
        name =  data['name'],
        price = data['price'],
        university = data['university'],
        lenght = data['lenght'],
        type = data['type'],
        description = data['description'],
        date = data['date'],
        country = data['country'],
        city = data['city'],
        state = data['state']
    )   
    
    serializer = Internship_Serializer(internship, many = False)

    return Response(serializer.data)

#updates an internship
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_internship(request, pk):

    data = request.data
    
    internship = Internship.objects.get(_id=pk)

    internship.name = data['name']
    internship.price = data['price']
    internship.university = data['university']
    internship.lenght = data['lenght']
    internship.type = data['type']
    internship.date = data['date'] 
    internship.description = data['description']
    internship.country = data['country']
    internship.city = data['city']
    internship.state = data['state']
    
    internship.save()

    serializer = Internship_Serializer(internship, many=False)
    return Response(serializer.data)

#delete an internship
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_internship(request, pk):
    internship = Internship.objects.get(_id=pk)
    internship.delete()

    return Response('Item succsesfully delete!')


# /////////////////////////////////////////  A P P L Y  ////////////////////////////////////////////////////
#delete an internship
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_apply(request, pk):
    
    user = request.user
    internship = Internship.objects.get(_id = pk)
    
    data = request.data
    
    apply = Apply.objects.create(
        user = user,
        internship = internship,
        state = data['state'],
        text = data['text']
    )
    
    if (data['flag'] == 'true'):
        apply.cv = request.FILES.get('file')
    
    apply.save()
   
    serializer = Apply_Serializer(apply, many = False)

    return Response(serializer.data) 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def apply_exist(request, pk):
    user = request.user
    internship = Internship.objects.get(_id = pk)

    if Apply.objects.filter(user = user, internship = internship).exists():
        return Response('true')
    
    return Response('false')

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_apply(request, pk):
    apply = Apply.objects.get(_id = pk)
    data = request.data
    
    print(data)
    if(apply.state == 'temporary'):
        apply.text = data['text']
        if (data['flag'] == 'true'):
            apply.cv = request.FILES.get('file')
    else:  
        if(data['state'] == 'declined'):
            apply.state = data['state']
            apply.rejectionText = data['rejectionText']
        else:
            apply.internship.hidden = True
            apply.internship.save()
    
    
    apply.state = data['state']
    
    apply.save()
    
    serializer = Apply_Serializer(apply, many = False)
    
    return Response(serializer.data) 
    
    

#show applications for an internship
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def applies(request, pk):
    apply = Apply.objects.filter(internship=pk).exclude(state='temporary')
    
    serializer = Apply_Serializer(apply, many = True)
    
    return Response(serializer.data) 


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def applies_view(request):
    user = request.user
    apply = Apply.objects.filter(user=user)
    
    serializer = Apply_Serializer(apply, many = True)
    
    return Response(serializer.data) 
    
#delete an application
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_apply(request,pk):
    apply = Apply.objects.get(_id=pk)
    
    apply.delete()
    
    return Response('Item succsesfully delete!') 

    