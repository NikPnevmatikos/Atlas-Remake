# Generated by Django 4.1.5 on 2023-01-17 09:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_intership_internship'),
    ]

    operations = [
        migrations.AddField(
            model_name='internship',
            name='hidden',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
