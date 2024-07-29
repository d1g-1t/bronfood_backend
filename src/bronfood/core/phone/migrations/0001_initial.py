import bronfood.core.phone.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='PhoneSmsOtpVerification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(choices=[('Your code for registration in the Broonfood: ', 'Registration'), ('Your password recovery code in the Broonfood: ', 'Password Recovery'), ('Your code for editing data in the Broonfood: ', 'Editing'), ('Your payment confirmation code for the Broonfood: ', 'Payment Confirmation')], max_length=255, verbose_name='Sms message')),
                ('code', models.CharField(max_length=4, verbose_name='One-time password')),
                ('phone_number', models.CharField(max_length=11, verbose_name='Phone number')),
                ('sms_status', models.SmallIntegerField(choices=[(1, 'Pending'), (2, 'Accepted'), (3, 'Declined'), (4, 'Expired')], default=1, verbose_name='Sms status')),
                ('issue_reason', models.SmallIntegerField(choices=[(1, 'Registration'), (2, 'Password Recovery'), (3, 'Editing'), (4, 'Payment Confirmation')], verbose_name='Code issuance status')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('expired_at', models.DateTimeField(default=bronfood.core.phone.models.in_one_hour, verbose_name='Expired at')),
                ('attempt_counter', models.IntegerField(default=0, verbose_name='Attempt counter')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='otp', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-created_at',),
            },
        ),
    ]
