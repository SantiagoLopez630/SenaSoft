from rest_framework import serializers
from .models import Employee, Paciente
from .utils import authenticatePac, authenticateEmple
# Serializer de pruebas

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
        
# Serializadores de la odontologia

from .models import (
    Cita, DetalleFactura, DetalleInsumo, DetallePedido, Empleado,
    Factura, HistoriaOdontologica, Insumos, Odontologo, Paciente,
    PacienteSeguro, Pago, Pedido, SeguroMedico, SeguroTratamiento,
    ServicioHistoria, ServicioOdontologico, UsoInsumo, AgendaDoctor, HorarioRecurrente
)

class CitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cita
        fields = '__all__'

class DetalleFacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleFactura
        fields = '__all__'

class DetalleInsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleInsumo
        fields = '__all__'

class DetallePedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetallePedido
        fields = '__all__'

class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = '__all__'

class FacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Factura
        fields = '__all__'

class HistoriaOdontologicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoriaOdontologica
        fields = '__all__'

class InsumosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insumos
        fields = '__all__'

class OdontologoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Odontologo
        fields = '__all__'

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'

class PacienteSeguroSerializer(serializers.ModelSerializer):
    class Meta:
        model = PacienteSeguro
        fields = '__all__'

class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = '__all__'

class SeguroMedicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeguroMedico
        fields = '__all__'

class SeguroTratamientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeguroTratamiento
        fields = '__all__'

class ServicioHistoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicioHistoria
        fields = '__all__'

class ServicioOdontologicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicioOdontologico
        fields = '__all__'

class UsoInsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsoInsumo
        fields = '__all__'

class AgendaDoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgendaDoctor
        fields = '__all__'
        
class HorarioRecurrenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = HorarioRecurrente
        fields = '__all__'
        
# Serializador
class LoginSerializerPac(serializers.Serializer):
    nro_doc = serializers.CharField()
    contrasena = serializers.CharField()

    def validate(self, data):
        nro_doc = data.get('nro_doc')
        contrasena = data.get('contrasena')

        if not (nro_doc and contrasena):
            raise serializers.ValidationError("Todos los campos son obligatorios")

        user = authenticatePac(nro_doc=nro_doc, contrasena=contrasena)

        if not user:
            raise serializers.ValidationError("Credenciales incorrectas")

        return data

class LoginSerializerEmple(serializers.Serializer):
    nro_doc = serializers.CharField()
    contrasena = serializers.CharField()

    def validate(self, data):
        nro_doc = data.get('nro_doc')
        contrasena = data.get('contrasena')

        if not (nro_doc and contrasena):
            raise serializers.ValidationError("Todos los campos son obligatorios")

        user = authenticateEmple(nro_doc=nro_doc, contrasena=contrasena)

        if not user:
            raise serializers.ValidationError("Credenciales incorrectas")

        return data


