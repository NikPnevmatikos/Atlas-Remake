from django.urls import path
from . import views

urlpatterns = [
   #users
   path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
   path('users/register/student/', views.registerStudent),
   path('users/register/provider/', views.registerProvider),
   path('users/update/', views.updateUserProfile),
   path('users/profile/', views.getUserProfile),
   #internships
   path('internships/', views.all_internship),
   path('provider/internships/', views.provider_internship),
   path('internships/delete/<str:pk>/', views.delete_internship),
   path('internships/create/', views.create_internship),
   path('internships/update/<str:pk>/', views.update_internship),
   path('internships/<str:pk>/', views.internship),
   #apply
   path("apply/view/<str:pk>/", views.applies),
   path('applies/', views.applies_view),
   path("apply/update/<str:pk>/", views.update_apply),
   path("apply/delete/<str:pk>/", views.delete_apply),
   path('apply/exist/<str:pk>/', views.apply_exist),
   path("apply/<str:pk>/", views.create_apply)
]