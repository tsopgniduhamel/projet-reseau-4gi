# Generated by Django 3.0.6 on 2020-07-19 22:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Tickets', '0003_users'),
    ]

    operations = [
        migrations.RenameField(
            model_name='manager',
            old_name='manager',
            new_name='user',
        ),
    ]
