# Generated by Django 4.1.5 on 2023-01-17 09:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_internship_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='internship',
            name='date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
