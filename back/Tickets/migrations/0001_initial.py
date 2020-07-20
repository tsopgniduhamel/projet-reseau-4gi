# Generated by Django 3.0.3 on 2020-07-15 08:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Services',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('addresse', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Tickets.Services')),
            ],
        ),
        migrations.CreateModel(
            name='Tickets',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('state', models.CharField(max_length=10)),
                ('response', models.CharField(max_length=1000)),
                ('date_création', models.DateTimeField(auto_now_add=True)),
                ('details', models.CharField(max_length=250)),
                ('auteur', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Tickets.User')),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Tickets.Services')),
            ],
        ),
        migrations.CreateModel(
            name='Manager',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('manager', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Tickets.User')),
                ('ticket', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Tickets.Tickets')),
            ],
        ),
    ]
