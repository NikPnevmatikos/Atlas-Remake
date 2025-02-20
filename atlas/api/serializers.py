from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class User_Serializer(serializers.ModelSerializer):

    providerType = serializers.CharField(source = 'provider.providerType')
    category = serializers.CharField(source = 'provider.category')
    afm = serializers.CharField(source = 'provider.afm')
    companyName = serializers.CharField(source = 'provider.companyName')
    phone = serializers.CharField(source = 'provider.phone')
    workers = serializers.IntegerField(source = 'provider.workers')
    country = serializers.CharField(source = 'provider.country')
    street = serializers.CharField(source = 'provider.street')
    postal = serializers.IntegerField(source = 'provider.postal')
    name = serializers.CharField(source = 'provider.name')
    identification = serializers.CharField(source = 'provider.identification')
    university = serializers.CharField(source = 'student.university')
    is_student = serializers.SerializerMethodField(read_only = True)


    class Meta:
        model = User
        fields = '__all__'
        
    def get_is_student(self,obj):
        if (hasattr(obj, 'student')):
            return True
        
        return False
        


    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email

        return token
    #all the json response information for user
    def validate(self, attrs):
        data = super().validate(attrs)
        
        serializer = UserSerializerWithToken(self.user).data
        
        for key, value in serializer.items():
            data[key] = value
            
        
        return data
    



class UserSerializerWithToken(User_Serializer):

    token = serializers.SerializerMethodField(read_only = True)
    providerType = serializers.CharField(source = 'provider.providerType')
    category = serializers.CharField(source = 'provider.category')
    afm = serializers.CharField(source = 'provider.afm')
    #phone = PhoneNumberField(blank = True, null = True)
    workers = serializers.IntegerField(source = 'provider.workers')
    country = serializers.CharField(source = 'provider.country')
    street = serializers.CharField(source = 'provider.street')
    postal = serializers.IntegerField(source = 'provider.postal')
    name = serializers.CharField(source = 'provider.name')
    identification = serializers.CharField(source = 'provider.identification')
    university = serializers.CharField(source = 'student.university')
    is_student = serializers.SerializerMethodField(read_only = True)
        
    class Meta:
        model = User
        fields = '__all__'
    
    #new access token
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    
    def get_is_student(self,obj):
        if (hasattr(obj, 'student')):
            return True
        
        return False
            
    
    
    

class Internship_Serializer(serializers.ModelSerializer):
    companyName = serializers.CharField(source = 'user.provider.name')
    phone = serializers.CharField(source = 'user.provider.phone')
    email = serializers.CharField(source = 'user.email')
    class Meta:
        model = Internship
        fields = '__all__'



class Apply_Serializer(serializers.ModelSerializer):
    name = serializers.CharField(source = 'internship.name')
    country = serializers.CharField(source = 'internship.country')
    city = serializers.CharField(source = 'internship.city')
    lenght = serializers.CharField(source = 'internship.lenght')
    type = serializers.CharField(source = 'internship.type')
    companyName = serializers.CharField(source = 'internship.user.provider.name')
    phone = serializers.CharField(source = 'internship.user.provider.phone')
    email = serializers.CharField(source = 'internship.user.email')
    university = serializers.CharField(source = 'user.student.university')
    first_name = serializers.CharField(source = 'user.first_name')
    last_name = serializers.CharField(source = 'user.last_name')
    class Meta:
        model = Apply
        fields = '__all__'