from django.contrib import admin
from .models import Tickets, Services, Users

# Register your models here.
admin.site.register(Tickets)
admin.site.register(Services)
admin.site.register(Users)
