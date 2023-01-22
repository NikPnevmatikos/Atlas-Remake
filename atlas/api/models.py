from django.db import models
from django.contrib.auth.models import User

# Create your models here.

#Intership provider
class Provider(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    companyName = models.CharField(max_length=30, null=True,blank=True)
    providerType = models.CharField(max_length=30, blank=True)
    category = models.CharField(max_length=30, blank=True)
    afm = models.CharField(max_length=20, null=True, blank=True)
    phone = models.CharField(max_length=30, null = True, blank=True)
    workers = models.IntegerField(null=True, blank=True, default=0)
    country = models.CharField(max_length=30, blank=True)
    street = models.CharField(max_length=30, blank=True)
    postal = models.IntegerField(null=True, blank=True, default=0)
    name = models.CharField(max_length=30, blank=True)
    identification = models.CharField(max_length=30, blank=True)

    _id = models.AutoField(primary_key=True, editable=False)  

    def __str__(self):
        return self.user.username
    
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    university = models.CharField(max_length=30, blank=True)
    
    def __str__(self):
        return self.user.username
    
class Internship(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    university = models.CharField(max_length=200, null=True, blank=True)
    lenght = models.CharField(max_length=200, null=True, blank=True)
    type = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    country = models.CharField(max_length=30, blank=True)
    city = models.CharField(max_length=30, null = True, blank=True)
    price = models.IntegerField(null=True, blank=True, default=0)
    state = models.CharField(max_length=30, null = True, blank=True)
    hidden = models.BooleanField(null=True, blank=True, default=False)
    
    _id = models.AutoField(primary_key=True, editable=False)   
    
    def __str__(self):
        return self.name
    
    
class Apply(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    internship = models.ForeignKey(Internship, on_delete=models.CASCADE, null=True) 
    state = models.CharField(max_length=200, null=True, blank=True)
    cv = models.FileField(upload_to='' , null=True, blank=True)
    text = models.TextField(null=True, blank=True)
    rejectionText = models.TextField(null=True, blank=True)
    
    _id = models.AutoField(primary_key=True, editable=False)   
    
    def __str__(self):
        return self.internship.name
    