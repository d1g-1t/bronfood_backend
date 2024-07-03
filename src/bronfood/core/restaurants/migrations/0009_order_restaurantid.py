# Generated by Django 4.2.10 on 2024-06-14 16:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0008_order_paymentstatus'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='restaurantId',
            field=models.CharField(default=1, max_length=255, verbose_name='Идентификатор ресторана'),
            preserve_default=False,
        ),
    ]
