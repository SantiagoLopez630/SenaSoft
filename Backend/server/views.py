from rest_framework import viewsets
from rest_framework.decorators import action
from django.utils.dateparse import parse_date
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta
from .models import HorarioRecurrente, AgendaDoctor, Cita
from .models import Employee, Paciente
from django.db.models import Count, F
from rest_framework.views import APIView
from .serializers import EmployeeSerializer, PacienteSerializer
from .utils import authenticatePac, authenticateEmple
# Vista de pruebas
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer




# Importacion de modelos y serializer

from .models import (
    Cita, DetalleFactura, DetalleInsumo, DetallePedido, Empleado,
    Factura, HistoriaOdontologica, Insumos, Odontologo, Paciente,
    PacienteSeguro, Pago, Pedido, SeguroMedico, SeguroTratamiento,
    ServicioHistoria, ServicioOdontologico, UsoInsumo, HorarioRecurrente, AgendaDoctor
)
from .serializers import (
    CitaSerializer, DetalleFacturaSerializer, DetalleInsumoSerializer, DetallePedidoSerializer, EmpleadoSerializer,
    FacturaSerializer, HistoriaOdontologicaSerializer, InsumosSerializer, OdontologoSerializer, PacienteSerializer,
    PacienteSeguroSerializer, PagoSerializer, PedidoSerializer, SeguroMedicoSerializer, SeguroTratamientoSerializer, LoginSerializerPac, LoginSerializerEmple,
    ServicioHistoriaSerializer, ServicioOdontologicoSerializer, UsoInsumoSerializer, HorarioRecurrenteSerializer, AgendaDoctorSerializer
)

# Vistas de la odontologia
class LoginPacienteView(APIView):
    def post(self, request):
        serializer = LoginSerializerEmple(data=request.data)
        if serializer.is_valid():
            nro_doc = serializer.validated_data.get('nro_doc')
            contrasena = serializer.validated_data.get('contrasena')

            user, model_name = authenticatePac(nro_doc=nro_doc, contrasena=contrasena)
            if user:
                response_data = {
                    "message": "Login exitoso",
                    "id": getattr(user, 'id_pac', 'No disponible'),
                    "rol": model_name
                }
                return Response(response_data, status=status.HTTP_200_OK)
            return Response({"message": "Credenciales incorrectas"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginEmpleadoView(APIView):
    def post(self, request):
        serializer = LoginSerializerEmple(data=request.data)  # Usa el serializer adecuado si es diferente
        if serializer.is_valid():
            nro_doc = serializer.validated_data.get('nro_doc')
            contrasena = serializer.validated_data.get('contrasena')

            user, model_name = authenticateEmple(nro_doc=nro_doc, contrasena=contrasena)
            if user:
                response_data = {
                    "message": "Login exitoso",
                    "nro_doc": user.nro_doc,
                    "nombre": getattr(user, 'nom', 'No disponible'),  # Asegúrate de que el atributo se llame correctamente
                    "tipo de acceso": model_name
                }
                return Response(response_data, status=status.HTTP_200_OK)
            return Response({"message": "Credenciales incorrectas"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



    
class CitaViewSet(viewsets.ModelViewSet):
    queryset = Cita.objects.all()
    serializer_class = CitaSerializer

    @action(detail=False, methods=['get'])
    def citas_por_fecha(self, request):
        fecha = request.query_params.get('fecha')
        if fecha:
            
            citas = Cita.objects.filter(fecha_cita=fecha).select_related('id_pac')
            data = []
            for cita in citas:
                paciente = cita.id_pac
                data.append({
                    'paciente_doc': paciente.nro_doc,
                    'paciente_nombre': paciente.nom,
                    'paciente_apellido': paciente.ape,
                    'fecha_cita': cita.fecha_cita,
                    'hora_cita': cita.hora_cita,
                })
            return Response(data)
        else:
            return Response({'error': 'Fecha no proporcionada'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def citas_disponibles(self, request):
        fecha_str = request.query_params.get('fecha')
        if not fecha_str:
            return Response({'error': 'Fecha no proporcionada'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            fecha = datetime.strptime(fecha_str, '%Y-%m-%d').date()
        except ValueError:
            return Response({'error': 'Formato de fecha inválido. Debe ser YYYY-MM-DD.'}, status=status.HTTP_400_BAD_REQUEST)
        
        dia_semana = (fecha.isoweekday() % 7) + 1
        
        horarios = HorarioRecurrente.objects.filter(dia_semana=dia_semana)
        
        if not horarios.exists():
            return Response({'error': 'No hay horarios definidos para ese día.'}, status=status.HTTP_404_NOT_FOUND)
        
        data = []
        for horario in horarios:
            odontologo = horario.doctor

            citas_ocupadas = AgendaDoctor.objects.filter(doctor=odontologo, fecha=fecha)

            hora_actual = datetime.combine(fecha, horario.hora_inicio)
            hora_fin = datetime.combine(fecha, horario.hora_fin)
            intervalos_disponibles = []

            while hora_actual < hora_fin:

                ocupado = False
                for cita in citas_ocupadas:
                    inicio_cita = datetime.combine(fecha, cita.hora_inicio)
                    fin_cita = datetime.combine(fecha, cita.hora_fin)
                    if inicio_cita <= hora_actual < fin_cita:
                        ocupado = True
                        break
                
                if not ocupado:
                    intervalos_disponibles.append(hora_actual.time())
                hora_actual += timedelta(minutes=15)

            data.append({
                'doctor': odontologo.nom,
                'fecha': fecha_str,
                'intervalos_disponibles': intervalos_disponibles
            })

        return Response(data, status=status.HTTP_200_OK)
    
    
class DetalleFacturaViewSet(viewsets.ModelViewSet):
    queryset = DetalleFactura.objects.all()
    serializer_class = DetalleFacturaSerializer

class DetalleInsumoViewSet(viewsets.ModelViewSet):
    queryset = DetalleInsumo.objects.all()
    serializer_class = DetalleInsumoSerializer

class DetallePedidoViewSet(viewsets.ModelViewSet):
    queryset = DetallePedido.objects.all()
    serializer_class = DetallePedidoSerializer

class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

class FacturaViewSet(viewsets.ModelViewSet):
    queryset = Factura.objects.all()
    serializer_class = FacturaSerializer

class HistoriaOdontologicaViewSet(viewsets.ModelViewSet):
    queryset = HistoriaOdontologica.objects.all()
    serializer_class = HistoriaOdontologicaSerializer

class InsumosViewSet(viewsets.ModelViewSet):
    queryset = Insumos.objects.all()
    serializer_class = InsumosSerializer

class OdontologoViewSet(viewsets.ModelViewSet):
    queryset = Odontologo.objects.all()
    serializer_class = OdontologoSerializer

class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer
    
    @action(detail=False, methods=['get'])
    def historial_paciente(self, request):
        nro_documento = request.query_params.get('nro_documento')
        
        if nro_documento:
            paciente = Paciente.objects.filter(nro_doc=nro_documento).prefetch_related(
                'cita_set__historiaodontologica_set__serviciohistoria_set__id_serv',
                'cita_set__historiaodontologica_set__id_cita__id_pac',
            ).first()

            if paciente:
                data = {
                    'paciente_nombre': paciente.nom,
                    'citas': []
                }
                for cita in paciente.cita_set.all():
                    historia = cita.historiaodontologica_set.all()
                    citas_data = {
                        'fecha_cita': cita.fecha_cita,
                        'historia': [
                            {
                                'resultado_serv': servicio.resultado_serv,
                                'observaciones': servicio.observaciones,
                                'servicio': servicio.id_serv.nom_serv
                            }
                            for historia in historia
                            for servicio in historia.serviciohistoria_set.all()
                        ]
                    }
                    data['citas'].append(citas_data)
                return Response(data)
            else:
                return Response({'error': 'Paciente no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Número de documento no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)
    
    
    @action(detail=False, methods=['post'], url_path='servicios_fecha')
    def servicios_fecha(self, request):
        nro_doc = request.data.get('nro_doc')
        fecha = request.data.get('fecha')

        if not nro_doc:
            return Response({"error": "Número de documento es obligatorio"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not fecha:
            return Response({"error": "Fecha es obligatoria"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            paciente = Paciente.objects.get(nro_doc=nro_doc)
        except Paciente.DoesNotExist:
            return Response({"error": "Paciente no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        citas = Cita.objects.filter(id_pac=paciente, fecha_cita=fecha)
        historias = HistoriaOdontologica.objects.filter(id_cita__in=citas)
        servicios = ServicioHistoria.objects.filter(id_hist__in=historias)

        total = 0
        servicios_data = []
        for servicio in servicios:
            
            servicio_odonto = servicio.id_serv
            servicio_data = {
                'descripcion': servicio_odonto.desc_serv,
                'valor': servicio_odonto.val_serv,
                'fecha': servicio.fecha_serv_hist,
            }
            subtotal = servicio_odonto.val_serv
            total += subtotal
            servicios_data.append(servicio_data)

        # Devuelve los servicios y el total
        return Response({
            'servicios': servicios_data,
            'total': total
        }, status=status.HTTP_200_OK)

    
            
class PacienteSeguroViewSet(viewsets.ModelViewSet):
    queryset = PacienteSeguro.objects.all()
    serializer_class = PacienteSeguroSerializer

class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

class SeguroMedicoViewSet(viewsets.ModelViewSet):
    queryset = SeguroMedico.objects.all()
    serializer_class = SeguroMedicoSerializer

class SeguroTratamientoViewSet(viewsets.ModelViewSet):
    queryset = SeguroTratamiento.objects.all()
    serializer_class = SeguroTratamientoSerializer

class ServicioHistoriaViewSet(viewsets.ModelViewSet):
    queryset = ServicioHistoria.objects.all()
    serializer_class = ServicioHistoriaSerializer

class ServicioOdontologicoViewSet(viewsets.ModelViewSet):
    queryset = ServicioOdontologico.objects.all()
    serializer_class = ServicioOdontologicoSerializer
    
    @action(detail=False, methods=['get'])
    def procedimientos_estadisticas(self, request):
        conteo_servicios = ServicioHistoria.objects.values('id_serv').annotate(total=Count('id_serv'))
        
        total_servicios = conteo_servicios.aggregate(total=Count('id_serv'))['total']
        
        if total_servicios == 0:
            return Response({'mensaje': 'No hay registros de servicios'}, status=status.HTTP_404_NOT_FOUND)
        
        servicios_con_porcentaje = [
            {
                'servicio': ServicioOdontologico.objects.get(id_serv=registro['id_serv']).nom_serv,
                'conteo': registro['total'],
                'porcentaje': (registro['total'] / total_servicios) * 100
            }
            for registro in conteo_servicios
        ]
        
        servicios_con_porcentaje.sort(key=lambda x: x['conteo'], reverse=True)
        
        return Response(servicios_con_porcentaje)

class UsoInsumoViewSet(viewsets.ModelViewSet):
    queryset = UsoInsumo.objects.all()
    serializer_class = UsoInsumoSerializer
    
class HorarioRecurrenteViewSet(viewsets.ModelViewSet):
    queryset = HorarioRecurrente.objects.all()
    serializer_class = HorarioRecurrenteSerializer

class AgendaDoctorViewSet(viewsets.ModelViewSet):
    queryset = AgendaDoctor.objects.all()
    serializer_class = AgendaDoctorSerializer
