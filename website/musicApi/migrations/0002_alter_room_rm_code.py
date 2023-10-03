# Generated by Django 4.2.5 on 2023-10-03 22:01

from django.db import migrations, models
import musicApi.models


class Migration(migrations.Migration):

    dependencies = [
        ('musicApi', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='rm_code',
            field=models.CharField(default=musicApi.models.gen_unique_code, max_length=8, unique=True),
        ),
    ]
