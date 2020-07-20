from django.db import models
from django.contrib.auth.models import User


class Services(models.Model):
    name=models.CharField(max_length=20)
    addresse =models.CharField(max_length=20,  default='Yaoundé Cameroun , ENSP')

class Users(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    service = models.ForeignKey(Services, on_delete=models.CASCADE, null=True)

    
class Tickets(models.Model):
    id=models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    state = models.CharField(max_length=10)
    response = models.CharField(max_length=1000)
    auteur = models.ForeignKey(User, on_delete=models.CASCADE)
    date_création = models.DateTimeField(auto_now_add=True)
    details = models.CharField(max_length=250)
    service= models.ForeignKey(Services, on_delete=models.CASCADE, null =True)
    def setState(self, state):
        self.state=state

