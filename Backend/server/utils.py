from django.contrib.auth.hashers import check_password
from .models import Empleado, Odontologo, Paciente

def authenticatePac(nro_doc, contrasena):
    for model in [Paciente]:
        try:
            user = model.objects.get(nro_doc=nro_doc)
            if check_password(contrasena, user.contrasena):
                return user, model.__name__
        except model.DoesNotExist:
            continue
    return None, None

def authenticateEmple(nro_doc, contrasena):
    for model in [Empleado, Odontologo]:
        try:
            user = model.objects.get(nro_doc=nro_doc)
            if check_password(contrasena, user.contrasena):
                return user, model.__name__
        except model.DoesNotExist:
            continue
    return None, None
