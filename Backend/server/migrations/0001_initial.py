# Generated by Django 5.0.6 on 2024-09-16 18:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Insumos',
            fields=[
                ('id_ins', models.AutoField(primary_key=True, serialize=False)),
                ('nom', models.CharField(max_length=100)),
                ('descp', models.TextField()),
                ('existencia', models.IntegerField()),
                ('uni_medida', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Empleado',
            fields=[
                ('id_emp', models.AutoField(primary_key=True, serialize=False)),
                ('nro_doc', models.CharField(blank=True, max_length=50, null=True, unique=True)),
                ('tip_doc', models.CharField(max_length=50)),
                ('nom', models.CharField(max_length=20)),
                ('ape', models.CharField(max_length=100)),
                ('sexo', models.CharField(max_length=10)),
                ('tel', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=100)),
                ('cargo', models.CharField(blank=True, max_length=100, null=True)),
                ('fec_reg', models.DateTimeField(blank=True, null=True)),
                ('contrasena', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('position', models.CharField(max_length=50)),
                ('salary', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Odontologo',
            fields=[
                ('id_odont', models.AutoField(primary_key=True, serialize=False)),
                ('nom', models.CharField(max_length=100)),
                ('ape', models.CharField(max_length=100)),
                ('nro_doc', models.CharField(blank=True, max_length=50, null=True, unique=True)),
                ('tip_doc', models.CharField(max_length=50)),
                ('fecha_nac', models.DateField()),
                ('sexo', models.CharField(max_length=10)),
                ('tel', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=100)),
                ('espe', models.CharField(max_length=100)),
                ('disp', models.CharField(max_length=20)),
                ('est', models.BooleanField()),
                ('contrasena', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Paciente',
            fields=[
                ('id_pac', models.AutoField(primary_key=True, serialize=False)),
                ('nro_doc', models.CharField(blank=True, max_length=50, null=True, unique=True)),
                ('tip_doc', models.CharField(max_length=50)),
                ('fec_exp', models.DateField()),
                ('nom', models.CharField(max_length=100)),
                ('ape', models.CharField(max_length=100)),
                ('fec_nac', models.DateField(blank=True, null=True)),
                ('ciudad', models.CharField(max_length=100)),
                ('sexo', models.CharField(max_length=10)),
                ('dir', models.CharField(max_length=255)),
                ('tel1', models.CharField(blank=True, max_length=50, null=True)),
                ('tel2', models.CharField(blank=True, max_length=50, null=True)),
                ('email', models.CharField(max_length=100)),
                ('est', models.BooleanField()),
                ('ant_med', models.TextField()),
                ('tip_san', models.CharField(max_length=3)),
                ('ocup', models.CharField(blank=True, max_length=100, null=True)),
                ('est_civ', models.CharField(max_length=50)),
                ('fec_reg', models.DateTimeField(blank=True, null=True)),
                ('contrasena', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Rol',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('permisos', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='SeguroMedico',
            fields=[
                ('id_seg', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_seguro', models.CharField(max_length=100)),
                ('detalles', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ServerRol',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, unique=True)),
                ('permissions', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='ServicioOdontologico',
            fields=[
                ('id_serv', models.AutoField(primary_key=True, serialize=False)),
                ('nom_serv', models.CharField(max_length=50)),
                ('desc_serv', models.TextField()),
                ('val_serv', models.DecimalField(decimal_places=2, max_digits=10)),
                ('duracion_serv', models.DurationField()),
                ('tipo_serv', models.CharField(max_length=20)),
                ('requiere_autorizacion', models.BooleanField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Cita',
            fields=[
                ('id_cita', models.AutoField(primary_key=True, serialize=False)),
                ('tipo_cita', models.CharField(max_length=50)),
                ('fecha_cita', models.DateField()),
                ('hora_cita', models.TimeField()),
                ('est_cita', models.BooleanField()),
                ('id_emp', models.ForeignKey(db_column='id_emp', on_delete=django.db.models.deletion.CASCADE, to='server.empleado')),
                ('id_odont', models.ForeignKey(db_column='id_odont', on_delete=django.db.models.deletion.CASCADE, to='server.odontologo')),
                ('id_pac', models.ForeignKey(db_column='id_pac', on_delete=django.db.models.deletion.CASCADE, to='server.paciente')),
            ],
        ),
        migrations.CreateModel(
            name='Factura',
            fields=[
                ('id_fact', models.AutoField(primary_key=True, serialize=False)),
                ('fecha_fact', models.DateField()),
                ('observacion', models.TextField()),
                ('total', models.DecimalField(decimal_places=2, max_digits=10)),
                ('id_emp', models.ForeignKey(db_column='id_emp', on_delete=django.db.models.deletion.CASCADE, to='server.empleado')),
                ('id_pac', models.ForeignKey(db_column='id_pac', on_delete=django.db.models.deletion.CASCADE, to='server.paciente')),
            ],
        ),
        migrations.CreateModel(
            name='HistoriaOdontologica',
            fields=[
                ('id_hist', models.AutoField(primary_key=True, serialize=False)),
                ('fecha_hist', models.DateField()),
                ('observaciones', models.TextField()),
                ('motivo_consulta', models.TextField()),
                ('diagnostico', models.TextField()),
                ('recomendaciones', models.TextField()),
                ('id_cita', models.ForeignKey(db_column='id_cita', on_delete=django.db.models.deletion.CASCADE, to='server.cita')),
                ('id_pac', models.ForeignKey(db_column='id_pac', on_delete=django.db.models.deletion.CASCADE, to='server.paciente')),
            ],
        ),
        migrations.CreateModel(
            name='Pago',
            fields=[
                ('id_pago', models.AutoField(primary_key=True, serialize=False)),
                ('fecha_pago', models.DateField()),
                ('met_pago', models.CharField(max_length=50)),
                ('id_fact', models.ForeignKey(db_column='id_fact', on_delete=django.db.models.deletion.CASCADE, to='server.factura')),
            ],
        ),
        migrations.CreateModel(
            name='Pedido',
            fields=[
                ('id_ped', models.AutoField(primary_key=True, serialize=False)),
                ('id_prov', models.IntegerField()),
                ('fecha_ped', models.DateField()),
                ('fecha_ent', models.DateField()),
                ('id_emp', models.ForeignKey(db_column='id_emp', on_delete=django.db.models.deletion.CASCADE, to='server.empleado')),
            ],
        ),
        migrations.CreateModel(
            name='DetallePedido',
            fields=[
                ('id_det', models.AutoField(primary_key=True, serialize=False)),
                ('cant', models.IntegerField()),
                ('val_uni', models.DecimalField(decimal_places=2, max_digits=10)),
                ('subtotal', models.DecimalField(decimal_places=2, max_digits=10)),
                ('id_ins', models.ForeignKey(db_column='id_ins', on_delete=django.db.models.deletion.CASCADE, to='server.insumos')),
                ('id_ped', models.ForeignKey(db_column='id_ped', on_delete=django.db.models.deletion.CASCADE, to='server.pedido')),
            ],
        ),
        migrations.AddField(
            model_name='paciente',
            name='rol',
            field=models.ForeignKey(blank=True, db_column='rol', null=True, on_delete=django.db.models.deletion.CASCADE, to='server.rol'),
        ),
        migrations.AddField(
            model_name='odontologo',
            name='rol',
            field=models.ForeignKey(blank=True, db_column='rol', null=True, on_delete=django.db.models.deletion.CASCADE, to='server.rol'),
        ),
        migrations.AddField(
            model_name='empleado',
            name='rol',
            field=models.ForeignKey(blank=True, db_column='rol', null=True, on_delete=django.db.models.deletion.CASCADE, to='server.rol'),
        ),
        migrations.CreateModel(
            name='DetalleFactura',
            fields=[
                ('id_det', models.AutoField(primary_key=True, serialize=False)),
                ('cant', models.IntegerField()),
                ('descuento', models.DecimalField(decimal_places=2, max_digits=5)),
                ('subtotal', models.DecimalField(decimal_places=2, max_digits=10)),
                ('id_fact', models.ForeignKey(db_column='id_fact', on_delete=django.db.models.deletion.CASCADE, to='server.factura')),
                ('id_serv', models.ForeignKey(db_column='id_serv', on_delete=django.db.models.deletion.CASCADE, to='server.servicioodontologico')),
            ],
        ),
        migrations.CreateModel(
            name='UsoInsumo',
            fields=[
                ('id_uso', models.AutoField(primary_key=True, serialize=False)),
                ('fecha_uso', models.DateField()),
                ('cant_uso', models.IntegerField()),
                ('id_ins', models.ForeignKey(db_column='id_ins', on_delete=django.db.models.deletion.CASCADE, to='server.insumos')),
                ('id_odont', models.ForeignKey(db_column='id_odont', on_delete=django.db.models.deletion.CASCADE, to='server.odontologo')),
            ],
        ),
        migrations.CreateModel(
            name='DetalleInsumo',
            fields=[
                ('id_ins', models.OneToOneField(db_column='id_ins', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='server.insumos')),
                ('cant_uso', models.IntegerField()),
                ('fecha_uso', models.DateField()),
                ('id_emp', models.ForeignKey(db_column='id_emp', on_delete=django.db.models.deletion.CASCADE, to='server.empleado')),
                ('id_uso', models.ForeignKey(db_column='id_uso', on_delete=django.db.models.deletion.CASCADE, to='server.usoinsumo')),
            ],
        ),
        migrations.CreateModel(
            name='PacienteSeguro',
            fields=[
                ('id_pac', models.OneToOneField(db_column='id_pac', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='server.paciente')),
                ('fecha_inicio', models.DateField()),
                ('fecha_fin', models.DateField(blank=True, null=True)),
                ('id_seg', models.ForeignKey(db_column='id_seg', on_delete=django.db.models.deletion.CASCADE, to='server.seguromedico')),
            ],
        ),
        migrations.CreateModel(
            name='SeguroTratamiento',
            fields=[
                ('id_seg', models.OneToOneField(db_column='id_seg', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='server.seguromedico')),
                ('id_serv', models.ForeignKey(db_column='id_serv', on_delete=django.db.models.deletion.CASCADE, to='server.servicioodontologico')),
            ],
        ),
        migrations.CreateModel(
            name='ServicioHistoria',
            fields=[
                ('id_serv', models.OneToOneField(db_column='id_serv', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='server.servicioodontologico')),
                ('resultado_serv', models.TextField()),
                ('observaciones', models.TextField()),
                ('fecha_serv_hist', models.DateTimeField(blank=True, null=True)),
                ('id_hist', models.ForeignKey(db_column='id_hist', on_delete=django.db.models.deletion.CASCADE, to='server.historiaodontologica')),
            ],
        ),
    ]
