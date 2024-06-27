# Generated by Django 4.2.10 on 2024-05-30 13:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('restaurant_admin', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='restaurantadmin',
            options={'verbose_name': 'Администратор ресторана', 'verbose_name_plural': 'Администраторы ресторанов'},
        ),
        migrations.RemoveField(
            model_name='restaurantadmin',
            name='login',
        ),
        migrations.RemoveField(
            model_name='restaurantadmin',
            name='password',
        ),
        migrations.RemoveField(
            model_name='restaurantadmin',
            name='restaurant_owner',
        ),
        migrations.AddField(
            model_name='restaurantadmin',
            name='restaurant_admin',
            field=models.OneToOneField(default=1, limit_choices_to={'role': 'RESTAURANT_ADMIN'}, on_delete=django.db.models.deletion.CASCADE, related_name='restaurant_admin', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
