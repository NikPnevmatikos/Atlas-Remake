# Generated by Django 4.1.5 on 2023-01-17 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_apply_cv'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apply',
            name='cv',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
    ]
