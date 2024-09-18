import django
import os

# Configura Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
django.setup()

from django.contrib.auth.hashers import make_password
from server.models import Empleado, Odontologo, Paciente

def update_passwords():
    # Actualizar contraseñas para Empleados
    empleados = Empleado.objects.all()
    for empleado in empleados:
        empleado.contrasena = make_password(empleado.contrasena)
        empleado.save()
        print(f"Contraseña actualizada para Empleado ID: {empleado.id_emp}")

    # Actualizar contraseñas para Odontologos
    odontologos = Odontologo.objects.all()
    for odontologo in odontologos:
        odontologo.contrasena = make_password(odontologo.contrasena)
        odontologo.save()
        print(f"Contraseña actualizada para Odontologo ID: {odontologo.id_odont}")

    # Actualizar contraseñas para Pacientes
    pacientes = Paciente.objects.all()
    for paciente in pacientes:
        paciente.contrasena = make_password(paciente.contrasena)
        paciente.save()
        print(f"Contraseña actualizada para Paciente ID: {paciente.id_pac}")

if __name__ == "__main__":
    update_passwords()

