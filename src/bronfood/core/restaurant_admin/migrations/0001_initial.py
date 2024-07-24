# Generated by Django 4.2.10 on 2024-07-22 08:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('restaurants', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='RestaurantAdmin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('login', models.CharField(max_length=255, unique=True, verbose_name='Логин')),
                ('password', models.CharField(max_length=255, verbose_name='Пароль')),
                ('restaurant', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='restaurants.restaurant')),
                ('restaurant_owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='restaurant_owner', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Администратор ресторана',
                'verbose_name_plural': 'Администраторы ресторанов',
            },
        ),
    ]
