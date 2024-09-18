"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from server.views import EmployeeViewSet, PacienteViewSet
from rest_framework.documentation import include_docs_urls
from server.views import (
    CitaViewSet, DetalleFacturaViewSet, DetalleInsumoViewSet, DetallePedidoViewSet, EmpleadoViewSet,
    FacturaViewSet, HistoriaOdontologicaViewSet, InsumosViewSet, OdontologoViewSet, PacienteViewSet,
    PacienteSeguroViewSet, PagoViewSet, PedidoViewSet, SeguroMedicoViewSet, SeguroTratamientoViewSet,
    ServicioHistoriaViewSet, ServicioOdontologicoViewSet, UsoInsumoViewSet, AgendaDoctorViewSet, HorarioRecurrenteViewSet, LoginEmpleadoView, LoginPacienteView
)


router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'citas', CitaViewSet)
router.register(r'detalle_factura', DetalleFacturaViewSet)
router.register(r'detalle_insumo', DetalleInsumoViewSet)
router.register(r'detalle_pedido', DetallePedidoViewSet)
router.register(r'empleados', EmpleadoViewSet)
router.register(r'facturas', FacturaViewSet)
router.register(r'historias_odontologicas', HistoriaOdontologicaViewSet)
router.register(r'insumos', InsumosViewSet)
router.register(r'odontologos', OdontologoViewSet)
router.register(r'pacientes', PacienteViewSet)
router.register(r'paciente_seguro', PacienteSeguroViewSet)
router.register(r'pagos', PagoViewSet)
router.register(r'pedidos', PedidoViewSet)
router.register(r'seguros_medicos', SeguroMedicoViewSet)
router.register(r'seguro_tratamiento', SeguroTratamientoViewSet)
router.register(r'servicio_historia', ServicioHistoriaViewSet)
router.register(r'servicio_odontologico', ServicioOdontologicoViewSet)
router.register(r'uso_insumo', UsoInsumoViewSet)
router.register(r'horario', HorarioRecurrenteViewSet)
router.register(r'agenda', AgendaDoctorViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('docs/', include_docs_urls(title='Documentation REST')),
    path('', include(router.urls)) ,
    path('login_paciente/', LoginPacienteView.as_view(), name='login_pac'),
    path('login_empleado/', LoginEmpleadoView.as_view(), name='login_emple')
]
