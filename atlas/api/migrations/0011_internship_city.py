# Generated by Django 4.1 on 2023-01-21 16:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_provider_companyname_provider_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='internship',
            name='city',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]
