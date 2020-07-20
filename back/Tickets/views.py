from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from .models import Tickets, Services
from .serializers import TicketsSerializer, UserSerializer, ServicesSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, get_user_model, logout
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.parsers import JSONParser

@api_view(['POST'])
def createUser(request):
    username = request.get('username')
    mail = request.get('mail')
    password = request.get('password')
    user = User.objects.create_user(username, mail, password)


@api_view(['POST'])
def connectAdmin(request):
    password = request.data['password']
    username = request.data['username']
    success = {'state':'success'}
    echec = {'state':'echec'}
    user = authenticate(username = username, password = password)
    if user is not None:
        if user.is_staff==True:
            return JsonResponse(success)
    else:
        return JsonResponse(echec)


@api_view(['POST'])
def connectUser(request):
    password = request.data['password']
    username = request.data['username']
    success = {'state':'success'}
    echec = {'state':'echec'}
    user = authenticate(username = username, password = password)
    if user is not None:
        if user.is_staff==False:
            return JsonResponse(success)
    else:
        return JsonResponse(echec)
        

@api_view(['POST'])
def create(request):
    user = authenticate(username = request.data['user'], password = request.data['password'])
    service = get_object_or_404(Services, name=request.data['service'])
    ticket = Tickets(
        title=request.data['cas'],
        details=request.data['content'],
        service =service,
        auteur=user,
        state = 'créé'
    )
    data={'state':"success"}
    ticket.save()
    return JsonResponse(data)


@api_view(['POST'])
def getSolved(request):
    data = {"echec":"echec"}
    user = authenticate(username = request.data['user'], password = request.data['password'])
    if user.is_staff == True:
        ticket = Tickets.objects.filter(state = 'resolu', service=user.users.service).order_by('date_création').reverse()
        serializer = TicketsSerializer(ticket,many=True)
        return JsonResponse(serializer.data, safe=False)
    ticket = Tickets.objects.filter(state = 'resolu', auteur = user).order_by('date_création').reverse()
    serializer = TicketsSerializer(ticket,many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(['POST'])
def getTickets(request):
    data = {"echec":"echec"}
    user = authenticate(username = request.data['user'], password = request.data['password'])
    if (user.is_staff == True):
        ticket = Tickets.objects.filter(service=user.users.service).order_by('date_création').reverse()
        serializer = TicketsSerializer(ticket,many=True)
        return JsonResponse(serializer.data, safe=False)
    ticket = Tickets.objects.filter(auteur = user).order_by('date_création').reverse()
    serializer = TicketsSerializer(ticket,many=True)
    return JsonResponse(serializer.data, safe=False)    


@api_view(['POST'])
def delete(request):
    ticket=Tickets.get(request.data['id'])
    ticket.delete()
    data={'status':'success'}
    return JsonResponse(data)

 
@api_view(['POST'])
def edit(request):
    response = request.data['response']
    ticket = get_object_or_404(Tickets, id = request.data['id'])
    ticket.response = response
    ticket.state = 'en cours'
    ticket.save()
    data = {'status':'success'}
    return JsonResponse(data)

@api_view(['POST'])
def setSolved(request):
    print (request.data['id'])
    ticket = get_object_or_404(Tickets, id = request.data['id'])
    ticket.state = 'resolu'
    ticket.save()
    data = {'status':'success'}
    return JsonResponse(data)



@api_view(['POST'])
def createService(request):
    service = Services(
        name=request.data['Nom'],
        addresse=request.data['Adresse'],
    )
    data={'state':"Service créé avec succès"}
    echec={'state':"echec"}
    service.save()
    return JsonResponse(data)

@api_view(['GET'])
def ListAdmin(request):
    admin = get_list_or_404(User, is_staff = True)
    serializer = UserSerializer(admin,many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def ListService(request):
    admin = get_list_or_404(Services)
    serializer = ServicesSerializer(admin,many=True)
    return JsonResponse(serializer.data, safe=False)

@action(methods = ['GET'], detail = False)
def logout_view(request):
    logout(request)
    

@api_view(['GET'])
def getUnsolved(request):
    data = {"echec":"echec"}
    user = authenticate(username = request.data['user'], password = request.data['password'])
    if (user.is_staff == True):
        ticket = Tickets.objects.filter(state = 'en cour', service=user.users.service).order_by('date_création').reverse()
        serializer = TicketsSerializer(ticket,many=True)
        return JsonResponse(serializer.data, safe=False)
    ticket = Tickets.objects.filter(state = 'en cour', auteur = user).order_by('state').order_by('date_création').reverse()
    serializer = TicketsSerializer(ticket,many=True)
    return JsonResponse(serializer.data, safe=False)
   