# Generated by Django 5.0 on 2024-02-10 01:03

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("tasks", "0003_tasks_category_alter_tasks_end_date_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="tasks",
            name="start_date",
            field=models.DateField(default=datetime.date(2024, 2, 10)),
        ),
    ]
