# Generated by Django 3.0.6 on 2020-07-20 07:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Tickets', '0008_auto_20200720_0837'),
    ]

    operations = [
        migrations.AlterField(
            model_name='services',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
