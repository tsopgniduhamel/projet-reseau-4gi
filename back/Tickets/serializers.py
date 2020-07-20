from rest_framework import serializers
from .models import Tickets, Services, User
class TicketsSerializer(serializers.ModelSerializer):
    service = serializers.SerializerMethodField('getService')
    auteur = serializers.SerializerMethodField('getAuteur')

    def getService(self, ticket):
        return ticket.service.name
        

    def getAuteur(self, ticket):
        return ticket.auteur.first_name
        

    class Meta:
        model = Tickets
        fields = (
            'id',
            'title',
            'state',
            'date_création',
            'service',
            'details',
            'auteur',
            'response',
        )

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name','last_name','email','is_staff')
"""class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = '__all__'"""