from django.contrib import admin
from django.urls import path
from . import views


app_name = 'ticket'
urlpatterns = [
    path('create/', views.create, name = "create"),
    path('edit/',views.edit, name="edit"),
    path('delete/<ticket_id>',views.delete, name="delete"),
    path('liste/', views.getTickets, name="liste"),
    path('loginClient/', views.connectUser, name="login"),
    path('login/', views.connectAdmin, name="login"),
    path('solved/', views.getSolved, name="solved"),
    path('validate/', views.setSolved, name="validate"),
    path('createService/', views.createService, name="createService"),
    path('listeAdmin/', views.ListAdmin, name="admin"),
    path('logout/', views.logout_view, name="logout"),
    path('unsolved/', views.getUnsolved, name="unsolved"),
    path('listeService/', views.ListService, name="services"),
]
