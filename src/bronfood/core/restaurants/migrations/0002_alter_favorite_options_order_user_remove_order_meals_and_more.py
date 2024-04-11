# Generated by Django 4.2.7 on 2024-04-09 18:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0001_initial'),
        ('restaurants', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='favorite',
            options={'verbose_name': 'Избранное заведение', 'verbose_name_plural': 'Избранные заведения'},
        ),
        migrations.AddField(
            model_name='order',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='order', to='client.client', verbose_name='Клиент'),
            preserve_default=False,
        ),
        migrations.RemoveField(
            model_name='order',
            name='meals',
        ),
        migrations.RemoveField(
            model_name='shopingcart',
            name='dish',
        ),
        migrations.AddField(
            model_name='order',
            name='meals',
            field=models.ManyToManyField(related_name='order', to='restaurants.dish', verbose_name='Блюда в заказе'),
        ),
        migrations.AddField(
            model_name='shopingcart',
            name='dish',
            field=models.ManyToManyField(related_name='shopingcarts', to='restaurants.dish', verbose_name='Блюдо'),
        ),
    ]
