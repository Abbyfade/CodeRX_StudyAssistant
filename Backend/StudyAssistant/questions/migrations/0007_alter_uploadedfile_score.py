# Generated by Django 5.1.1 on 2024-10-04 21:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0006_uploadedfile_score'),
    ]

    operations = [
        migrations.AlterField(
            model_name='uploadedfile',
            name='score',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
