from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Cita, AgendaDoctor
from datetime import datetime

@receiver(post_save, sender=Cita)
def crear_agenda_doctor(sender, instance, created, **kwargs):
    if created:
        odontologo = instance.id_odont
        fecha = instance.fecha_cita
        hora_inicio = instance.hora_cita

        servicio = instance.id_serv
        duracion_servicio = servicio.duracion_serv

        hora_inicio_dt = datetime.combine(datetime.today(), hora_inicio)
        hora_fin_dt = hora_inicio_dt + duracion_servicio
        hora_fin = hora_fin_dt.time()

        AgendaDoctor.objects.create(
            doctor=odontologo,
            fecha=fecha,
            hora_inicio=hora_inicio,
            hora_fin=hora_fin
        )
