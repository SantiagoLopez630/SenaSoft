from django.db import models
from datetime import datetime, timedelta
from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password

# Modelo de pruebas

class Employee(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    position = models.CharField(max_length=50)
    salary = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return "__all__"
    


class Cita(models.Model):
    id_cita = models.AutoField(primary_key=True)
    id_pac = models.ForeignKey('Paciente', on_delete=models.CASCADE, db_column='id_pac')
    id_odont = models.ForeignKey('Odontologo', on_delete=models.CASCADE, db_column='id_odont')
    id_emp = models.ForeignKey('Empleado', on_delete=models.CASCADE, db_column='id_emp', blank=True, null=True)
    tipo_cita = models.CharField(max_length=50)
    fecha_cita = models.DateField()
    hora_cita = models.TimeField()
    est_cita = models.BooleanField()
    id_serv = models.ForeignKey('ServicioOdontologico', on_delete=models.CASCADE, db_column='id_serv')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['fecha_cita', 'hora_cita'], name='unique_fecha_hora_cita')
        ]

    def __str__(self):
        return f"Cita {self.id_cita} - {self.fecha_cita} {self.hora_cita}"




class DetalleFactura(models.Model): 
    id_det = models.AutoField(primary_key=True)
    id_serv = models.ForeignKey('ServicioOdontologico', on_delete=models.CASCADE, db_column='id_serv')
    id_fact = models.ForeignKey('Factura', on_delete=models.CASCADE, db_column='id_fact')
    cant = models.IntegerField()
    descuento = models.DecimalField(max_digits=5, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.id_det} - {self.id_serv}"


class DetalleInsumo(models.Model):
    id_ins = models.OneToOneField('Insumos', on_delete=models.CASCADE, db_column='id_ins', primary_key=True) 
    id_uso = models.ForeignKey('UsoInsumo', on_delete=models.CASCADE, db_column='id_uso')
    id_emp = models.ForeignKey('Empleado', on_delete=models.CASCADE, db_column='id_emp')
    cant_uso = models.IntegerField()
    fecha_uso = models.DateField()

    def __str__(self):
        return f"ID Insumo: {self.id_ins_id}, ID Uso: {self.id_uso_id}, ID Empleado: {self.id_emp_id}, Cantidad: {self.cant_uso}, Fecha: {self.fecha_uso}"


class DetallePedido(models.Model):
    id_det = models.AutoField(primary_key=True)
    id_ins = models.ForeignKey('Insumos', on_delete=models.CASCADE, db_column='id_ins')
    id_ped = models.ForeignKey('Pedido', on_delete=models.CASCADE, db_column='id_ped')
    cant = models.IntegerField()
    val_uni = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return "__all__"




class Empleado(models.Model):
    id_emp = models.AutoField(primary_key=True)
    nro_doc = models.CharField(unique=True, max_length=50, blank=True, null=True)
    tip_doc = models.CharField(max_length=50)
    nom = models.CharField(max_length=20)
    ape = models.CharField(max_length=100)
    sexo = models.CharField(max_length=10)
    tel = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    cargo = models.CharField(max_length=100, blank=True, null=True)
    fec_reg = models.DateTimeField(blank=True, null=True)
    contrasena = models.CharField(max_length=255, blank=True, null=True)
    rol = models.ForeignKey('Rol', on_delete=models.CASCADE, db_column='rol', blank=True, null=True)

    def set_password(self, raw_password):
        self.contrasena = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.contrasena)


class Factura(models.Model):
    id_fact = models.AutoField(primary_key=True)
    id_emp = models.ForeignKey(Empleado, on_delete=models.CASCADE, db_column='id_emp')
    id_pac = models.ForeignKey('Paciente', on_delete=models.CASCADE, db_column='id_pac')
    fecha_fact = models.DateField()
    observacion = models.TextField()
    total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        paciente =self.id_pac.nro_doc
        return f"factura {self.id_fact} del paciente {paciente}"


class HistoriaOdontologica(models.Model):
    id_hist = models.AutoField(primary_key=True)
    id_pac = models.ForeignKey('Paciente', on_delete=models.CASCADE, db_column='id_pac')
    id_cita = models.ForeignKey(Cita, on_delete=models.CASCADE, db_column='id_cita')
    fecha_hist = models.DateField()
    observaciones = models.TextField()
    motivo_consulta = models.TextField()
    diagnostico = models.TextField()
    recomendaciones = models.TextField()

    def __str__(self):
        paciente_nombre = self.id_pac.nom
        paciente_documento = self.id_pac.nro_doc
        return f"ID: {self.id_hist} Historia del paciente: {paciente_documento} - {paciente_nombre}"


class Insumos(models.Model):
    id_ins = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=100)
    descp = models.TextField()
    existencia = models.IntegerField()
    uni_medida = models.CharField(max_length=50)

    def __str__(self):
        return "__all__"


class Odontologo(models.Model):
    id_odont = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=100)
    ape = models.CharField(max_length=100)
    nro_doc = models.CharField(unique=True, max_length=50, blank=True, null=True)
    tip_doc = models.CharField(max_length=50)
    fecha_nac = models.DateField()
    sexo = models.CharField(max_length=10)
    tel = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    espe = models.CharField(max_length=100)
    disp = models.CharField(max_length=20)
    est = models.BooleanField()
    contrasena = models.CharField(max_length=255, blank=True, null=True)
    rol = models.ForeignKey('Rol', on_delete=models.CASCADE, db_column='rol', blank=True, null=True)

    def __str__(self):
        return f"ID: {self.id_odont}, Nombre: {self.nom} {self.ape}, Documento: {self.nro_doc if self.nro_doc else 'No disponible'}"
    
    def set_password(self, raw_password):
        self.contrasena = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.contrasena)


class Paciente(models.Model):
    id_pac = models.AutoField(primary_key=True)
    nro_doc = models.CharField(unique=True, max_length=50, blank=True, null=True)
    tip_doc = models.CharField(max_length=50)
    fec_exp = models.DateField()
    nom = models.CharField(max_length=100)
    ape = models.CharField(max_length=100)
    fec_nac = models.DateField(blank=True, null=True)
    ciudad = models.CharField(max_length=100)
    sexo = models.CharField(max_length=10)
    dir = models.CharField(max_length=255)
    tel1 = models.CharField(max_length=50, blank=True, null=True)
    tel2 = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(max_length=100)
    est = models.BooleanField()
    ant_med = models.TextField()
    tip_san = models.CharField(max_length=3)
    ocup = models.CharField(max_length=100, blank=True, null=True)
    est_civ = models.CharField(max_length=50)
    fec_reg = models.DateTimeField(blank=True, null=True)
    contrasena = models.CharField(max_length=255, blank=True, null=True)
    rol = models.ForeignKey('Rol', on_delete=models.CASCADE, db_column='rol', blank=True, null=True)

    def __str__(self):
        return f"ID: {self.id_pac}, Nombre: {self.nom} {self.ape}, Documento: {self.nro_doc if self.nro_doc else 'No disponible'}"
    
    def set_password(self, raw_password):
        self.contrasena = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.contrasena)


class PacienteSeguro(models.Model):
    id_pac = models.OneToOneField(Paciente, on_delete=models.CASCADE, db_column='id_pac', primary_key=True)  # The composite primary key (id_pac, id_seg) found, that is not supported. The first column is selected.
    id_seg = models.ForeignKey('SeguroMedico', on_delete=models.CASCADE, db_column='id_seg')
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField(blank=True, null=True)

    def __str__(self):
        return "__all__"


class Pago(models.Model):
    id_pago = models.AutoField(primary_key=True)
    id_fact = models.ForeignKey(Factura, on_delete=models.CASCADE, db_column='id_fact')
    fecha_pago = models.DateField()
    met_pago = models.CharField(max_length=50)

    def __str__(self):
        return f"PAGO con id:{self.id_pago} de la fecha {self.fecha_pago}"


class Pedido(models.Model):
    id_ped = models.AutoField(primary_key=True)
    id_emp = models.ForeignKey(Empleado, on_delete=models.CASCADE, db_column='id_emp')
    id_prov = models.IntegerField()
    fecha_ped = models.DateField()
    fecha_ent = models.DateField()

    def __str__(self):
        return "__all__"


class Rol(models.Model):
    name = models.CharField(unique=True, max_length=50)
    permisos = models.TextField(blank=True, null=True)

    def __str__(self):
        return "__all__"


class SeguroMedico(models.Model):
    id_seg = models.AutoField(primary_key=True)
    nombre_seguro = models.CharField(max_length=100)
    detalles = models.TextField(blank=True, null=True)

    def __str__(self):
        return "__all__"


class SeguroTratamiento(models.Model):
    id_seg = models.OneToOneField(SeguroMedico, on_delete=models.CASCADE, db_column='id_seg', primary_key=True)  # The composite primary key (id_seg, id_serv) found, that is not supported. The first column is selected.
    id_serv = models.ForeignKey('ServicioOdontologico', on_delete=models.CASCADE, db_column='id_serv')

    def __str__(self):
        return "__all__"



class ServerRol(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=50)
    permissions = models.TextField()

    def __str__(self):
        return "__all__"


class ServicioHistoria(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_serv = models.ForeignKey('ServicioOdontologico', on_delete=models.CASCADE, db_column='id_serv')
    id_hist = models.ForeignKey(HistoriaOdontologica, on_delete=models.CASCADE, db_column='id_hist')
    resultado_serv = models.TextField()
    observaciones = models.TextField()
    fecha_serv_hist = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"ID: {self.id_serv}"


class ServicioOdontologico(models.Model):
    id_serv = models.AutoField(primary_key=True)
    nom_serv = models.CharField(max_length=50)
    desc_serv = models.TextField()
    val_serv = models.DecimalField(max_digits=10, decimal_places=2)
    duracion_serv = models.DurationField()
    tipo_serv = models.CharField(max_length=20)
    requiere_autorizacion = models.BooleanField(blank=True, null=True)

    def __str__(self):
        return f"ID: {self.id_serv}, Servicio: {self.nom_serv}, Duración: {self.duracion_serv}, Valor: {self.val_serv}"


class UsoInsumo(models.Model):
    id_uso = models.AutoField(primary_key=True)
    id_ins = models.ForeignKey(Insumos, on_delete=models.CASCADE, db_column='id_ins')
    id_odont = models.ForeignKey(Odontologo, on_delete=models.CASCADE, db_column='id_odont')
    fecha_uso = models.DateField()
    cant_uso = models.IntegerField()

    def __str__(self):
        return "__all__"


class HorarioRecurrente(models.Model):
    DIA_SEMANA_CHOICES = [
        (1, 'Domingo'),
        (2, 'Lunes'),
        (3, 'Martes'),
        (4, 'Miércoles'),
        (5, 'Jueves'),
        (6, 'Viernes'),
        (7, 'Sábado'),
    ]
    
    doctor = models.ForeignKey('Odontologo', on_delete=models.CASCADE,db_column='id_odont')
    dia_semana = models.IntegerField(choices=DIA_SEMANA_CHOICES)
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    
    def __str__(self):
        return f"{self.doctor.nombre} - {self.get_dia_semana_display()} ({self.hora_inicio} - {self.hora_fin})"


class AgendaDoctor(models.Model):
    doctor = models.ForeignKey('Odontologo', on_delete=models.CASCADE, db_column='id_odont')
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    estado = models.CharField(max_length=20, default='Pendiente')
    
    def __str__(self):
        return f"{self.doctor.nombre} - {self.fecha} ({self.hora_inicio} - {self.hora_fin}) - {self.estado}"
