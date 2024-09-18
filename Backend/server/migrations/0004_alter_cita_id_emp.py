# Generated by Django 5.0.6 on 2024-09-16 19:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_cita_id_serv'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cita',
            name='id_emp',
            field=models.ForeignKey(blank=True, db_column='id_emp', null=True, on_delete=django.db.models.deletion.CASCADE, to='server.empleado'),
        ),
    ]
