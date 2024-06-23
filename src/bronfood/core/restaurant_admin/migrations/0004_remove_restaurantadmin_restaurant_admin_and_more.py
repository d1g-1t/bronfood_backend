# Generated by Django 4.2.10 on 2024-05-30 14:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('restaurant_admin', '0003_restaurantadmin_login_restaurantadmin_password'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='restaurantadmin',
            name='restaurant_admin',
        ),
        migrations.AddField(
            model_name='restaurantadmin',
            name='restaurant_owner',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, related_name='restaurant_owner', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
