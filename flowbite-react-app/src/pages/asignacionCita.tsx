import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Select, Alert } from "flowbite-react";
import { NavbarPaciente } from "../components/Navbar/NavbarPaciente";
import { FooterComponent } from "../components/FooterComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HiOutlineCalendar, HiOutlineSearch } from "react-icons/hi";
import { navigate } from "gatsby";
import Cookies from "js-cookie";
import axios from "axios";

const AsignacionCitasPage: React.FC = () => {
  const [fecha, setFecha] = useState<Date | null>(null);
  const [citasDisponibles, setCitasDisponibles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCita, setSelectedCita] = useState(null);
  const [tipoConsulta, setTipoConsulta] = useState("");
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [servicios, setServicios] = useState([]);
  const [intervaloSeleccionado, setIntervaloSeleccionado] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const formatearFecha = (date: Date | null) => {
    if (!date) return null;
    return date.toISOString().split("T")[0];
  };

  const handleBuscar = () => {
    const fechaFormateada = formatearFecha(fecha);
    if (fechaFormateada) {
      axios
        .get(
          `http://127.0.0.1:8000/citas/citas_disponibles/?fecha=${fechaFormateada}`,
        )
        .then((response) => {
          setCitasDisponibles(response.data);
        })
        .catch((error) => {
          console.error("Error al buscar citas disponibles", error);
        });
    } else {
      console.log("Selecciona una fecha antes de buscar.");
    }
  };

  const fetchServicios = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/servicio_odontologico/",
      );
      setServicios(response.data);
    } catch (error) {
      console.error("Error al obtener servicios", error);
    }
  };

  useEffect(() => {
    fetchServicios();
    const isAuthenticated = Cookies.get("isAuthenticated");
    const userRole = Cookies.get("user_role");

    if (!isAuthenticated || userRole !== "Paciente") {
      navigate("/login");
    }
  }, []);

  const handlePedir = () => {
    if (
      selectedCita &&
      tipoConsulta &&
      servicioSeleccionado &&
      intervaloSeleccionado
    ) {
      const datosCita = {
        id_cita: selectedCita.id_cita,
        tipo_cita: tipoConsulta,
        fecha_cita: selectedCita.fecha,
        hora_cita: intervaloSeleccionado,
        est_cita: true,
        id_pac: Cookies.get("user_id"),
        id_odont: selectedCita.id_odont,
        id_emp: null,
        id_serv: servicioSeleccionado,
      };

      axios
        .post("http://127.0.0.1:8000/citas/", datosCita)
        .then((response) => {
          console.log("Cita solicitada con éxito:", response.data);
          setShowModal(false);
          setShowAlert(true);
        })
        .catch((error) => {
          console.error("Error al solicitar la cita:", error);
          if (error.response) {
            console.error("Detalles del error:", error.response.data);
          }
        });
    } else {
      console.log(
        "Selecciona un tipo de consulta, un servicio y un intervalo.",
      );
    }
  };

  return (
    <div>
      <NavbarPaciente />
      <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8  dark:bg-gray-800  md:px-16 lg:px-24">
        <div className="mt-8 w-full overflow-x-auto">
          <div className="flex flex-nowrap gap-4">
            {citasDisponibles.length > 0 ? (
              citasDisponibles.map((cita, index) => (
                <div key={index} className="flex flex-nowrap gap-4">
                  {cita.intervalos_disponibles.map((intervalo, i) => (
                    <Card
                      key={i}
                      className="w-80 shrink-0 rounded-lg border border-gray-300 shadow-sm"
                    >
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Doctor: {cita.doctor}
                      </h5>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        Fecha: {cita.fecha}
                      </p>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        Hora: {intervalo}
                      </p>
                      <Button
                        className="mt-2"
                        onClick={() => {
                          setSelectedCita(cita); // Establece la cita seleccionada
                          setIntervaloSeleccionado(intervalo); // Establece el intervalo seleccionado
                          setShowModal(true); // Muestra el modal
                        }}
                      >
                        Solicítala
                        <svg
                          className="-mr-1 ml-2 size-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </Card>
                  ))}
                </div>
              ))
            ) : (
              <div className="flex w-full justify-center">
                <p className="dark:text-white">
                  No hay citas disponibles para la fecha seleccionada.
                </p>
              </div>
            )}
          </div>
        </div>
        <br />
        <br />
        <h1 className="text-3xl font-semibold dark:text-white">
          Asignación de Citas <br />
          <br />
        </h1>

        <div className="relative mb-4">
          <DatePicker
            selected={fecha}
            onChange={(date: Date) => setFecha(date)}
            minDate={new Date()}
            dateFormat="yyyy-MM-dd"
            placeholderText="Selecciona una fecha"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <HiOutlineCalendar
            className="absolute right-3 top-3 text-gray-500"
            size={24}
          />
        </div>

        <div className="mb-20 mt-4 flex flex-wrap gap-2">
          <Button onClick={handleBuscar}>
            Buscar cita
            <HiOutlineSearch className="ml-2 size-5" />
          </Button>
        </div>

        {/* Modal para solicitar la cita */}
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <Modal.Header>Solicitar Cita</Modal.Header>
          <Modal.Body>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Tipo de Consulta
              </label>
              <Select
                value={tipoConsulta}
                onChange={(e) => setTipoConsulta(e.target.value)}
              >
                <option value="">Selecciona un tipo de consulta</option>
                <option value="Control">Control</option>
                <option value="Urgencia">Urgencia</option>
                <option value="Revisión">Revisión</option>
              </Select>

              <label className="mb-2 mt-4 block text-sm font-medium text-gray-900 dark:text-white">
                Servicio
              </label>
              <Select
                value={servicioSeleccionado || ""}
                onChange={(e) =>
                  setServicioSeleccionado(Number(e.target.value))
                }
              >
                <option value="">Selecciona un servicio</option>
                {servicios.map((servicio) => (
                  <option key={servicio.id_serv} value={servicio.id_serv}>
                    {servicio.nom_serv} - ${servicio.val_serv}
                  </option>
                ))}
              </Select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button onClick={handlePedir}>Confirmar Cita</Button>
          </Modal.Footer>
        </Modal>

        {/* Alerta para mostrar cuando se confirme la cita */}
        {showAlert && (
          <Alert color="success" onDismiss={() => setShowAlert(false)}>
            <span className="font-medium">¡Éxito!</span> La cita ha sido
            solicitada con éxito.
          </Alert>
        )}
      </main>
      <FooterComponent />
    </div>
  );
};

export default AsignacionCitasPage;
