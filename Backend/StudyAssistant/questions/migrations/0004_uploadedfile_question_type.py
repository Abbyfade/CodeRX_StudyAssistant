# Generated by Django 5.1.1 on 2024-10-04 00:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0003_uploadedfile_question_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='uploadedfile',
            name='question_type',
            field=models.CharField(default='mcq', max_length=255),
            preserve_default=False,
        ),
    ]
