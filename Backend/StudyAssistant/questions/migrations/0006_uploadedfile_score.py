# Generated by Django 5.1.1 on 2024-10-04 01:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0005_uploadedfile_answers'),
    ]

    operations = [
        migrations.AddField(
            model_name='uploadedfile',
            name='score',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
