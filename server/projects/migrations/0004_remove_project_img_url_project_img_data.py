# Generated by Django 5.0 on 2024-01-29 17:11

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("projects", "0003_project_description_project_img_url"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="project",
            name="img_url",
        ),
        migrations.AddField(
            model_name="project",
            name="img_data",
            field=models.BinaryField(blank=True, null=True),
        ),
    ]