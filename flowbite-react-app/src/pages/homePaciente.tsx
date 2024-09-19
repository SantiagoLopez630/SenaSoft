import React, { useEffect, useState } from "react";
import { HeadFC, Link, PageProps, navigate } from "gatsby";
import { NavbarPaciente } from "../components/Navbar/NavbarPaciente";
import { FooterComponent } from "../components/FooterComponent";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";
import { Button, Card, Timeline, Modal, Alert } from "flowbite-react"; // Import Alert
import Cookies from "js-cookie";
import axios from "axios";

const HomePacientePage: React.FC<PageProps> = () => {
  const [paciente, setPaciente] = useState({
    nom: "Cargando...",
    ape: "",
    nro_doc: "Cargando...",
  });

  const [historial, setHistorial] = useState([]);
  const [citasPendientes, setCitasPendientes] = useState<any[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCita, setSelectedCita] = useState<any>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    const userId = Cookies.get("user_id");

    if (userId) {
      axios
        .get(`http://127.0.0.1:8000/pacientes/${userId}/`)
        .then((response) => {
          setPaciente(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener los datos del paciente", error);
        });
    }
  }, []);

  useEffect(() => {
    const isAuthenticated = Cookies.get("isAuthenticated");
    const userRole = Cookies.get("user_role");

    if (!isAuthenticated || userRole !== "Paciente") {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (paciente.nro_doc !== "Cargando...") {
      axios
        .get(
          `http://127.0.0.1:8000/pacientes/historial_paciente/?nro_documento=${paciente.nro_doc}`,
        )
        .then((response) => {
          setHistorial(response.data.citas.slice(0, 3)); // Mostrar solo 3 citas
        })
        .catch((error) => {
          console.error("Error al obtener el historial del paciente", error);
        });
    }
  }, [paciente.nro_doc]);

  useEffect(() => {
    const userId = Cookies.get("user_id");

    if (userId) {
      axios
        .get(`http://127.0.0.1:8000/pacientes/citas_pendientes/?id=${userId}`)
        .then((response) => {
          if (response.data.mensaje) {
            setCitasPendientes([]);
          } else {
            setCitasPendientes(response.data.citas_pendientes);
          }
        })
        .catch((error) => {
          console.error("Error al obtener las citas pendientes", error);
        });
    }
  }, []);
  const handleOpenModal = (cita: any) => {
    setSelectedCita(cita);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCita(null);
  };
  const handleOpenConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleCancelCita = () => {
    if (selectedCita) {
      axios
        .delete(`http://127.0.0.1:8000/citas/${selectedCita.id_cita}/`)
        .then((response) => {
          console.log("Cita cancelada con éxito:", response.data);
          setCitasPendientes(
            citasPendientes.filter(
              (cita) => cita.id_cita !== selectedCita.id_cita,
            ),
          );
          handleCloseConfirmModal();
          handleCloseModal();
          setShowSuccessAlert(true);
          setTimeout(() => setShowSuccessAlert(false), 3000);
        })
        .catch((error) => {
          console.error("Error al cancelar la cita:", error);
        });
    }
  };

  return (
    <div>
      <NavbarPaciente />
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-8 dark:bg-gray-800 md:flex-row md:px-16 lg:px-24">
        {showSuccessAlert && (
          <Alert color="success" className="mb-4">
            Cita cancelada con éxito.
          </Alert>
        )}

        <div className="flex-1 text-center md:mr-12 md:text-left">
          <h1 className="mb-6 text-3xl font-semibold dark:text-white md:mb-8">
            Bienvenid@{" "}
            <strong>
              {paciente.nom} {paciente.ape}
            </strong>
          </h1>

          <h2 className="mb-4 font-normal dark:text-white md:mb-6">
            Qué quieres hacer hoy?
          </h2>
          {Array.isArray(citasPendientes) && citasPendientes.length === 0 ? (
            <Card className="mx-auto max-w-sm md:mx-0 md:mb-8">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Panel de cita!
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Ooops... Pareces que no tienes citas activas...
              </p>
              <Button as={Link} to="/asignacionCita">
                Pide ahora!
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
          ) : (
            <div className="flex flex-wrap gap-4">
              {citasPendientes.map((cita, index) => (
                <Card
                  key={index}
                  className="w-full flex-none md:w-1/2 lg:w-1/3 xl:w-1/4"
                >
                  <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Cita pendiente
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    <strong>Fecha:</strong> {cita.fecha_cita}
                    <br />
                    <strong>Hora:</strong> {cita.hora_cita}
                    <br />
                    <strong>Tipo de cita:</strong> {cita.tipo_cita}
                    <br />
                    <strong>Servicio:</strong> {cita.id_serv}
                  </p>
                  <Button onClick={() => handleOpenModal(cita)}>
                    Ver
                    <HiArrowNarrowRight className="ml-2 size-3" />
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 md:max-w-xs">
          <Timeline>
            {historial.map((cita, index) => (
              <Timeline.Item key={index}>
                <Timeline.Point icon={HiCalendar} />
                <Timeline.Content>
                  <Timeline.Time>{cita.fecha_cita}</Timeline.Time>
                  {cita.historia ? (
                    <>
                      <Timeline.Title>
                        Motivo: {cita.historia.motivo_consulta}
                      </Timeline.Title>
                      <Timeline.Body>
                        <strong>Diagnóstico:</strong>{" "}
                        {cita.historia.diagnostico}
                        <br />
                        <strong>Observaciones:</strong>{" "}
                        {cita.historia.observaciones}
                        <br />
                      </Timeline.Body>
                    </>
                  ) : (
                    <Timeline.Title>No hay historia disponible</Timeline.Title>
                  )}
                  <Button color="gray" onClick={() => handleOpenModal(cita)}>
                    Learn More
                    <HiArrowNarrowRight className="ml-2 size-3" />
                  </Button>
                </Timeline.Content>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </main>
      <FooterComponent />

      <Modal show={isModalOpen} onClose={handleCloseModal}>
        <Modal.Header>Cita Detalles</Modal.Header>
        <Modal.Body>
          {selectedCita ? (
            <div>
              <p>
                <strong>Fecha:</strong> {selectedCita.fecha_cita}
              </p>
              <p>
                <strong>Hora:</strong> {selectedCita.hora_cita}
              </p>
              <p>
                <strong>Tipo de cita:</strong> {selectedCita.tipo_cita}
              </p>
              <p>
                <strong>Servicio:</strong> {selectedCita.id_serv}
              </p>

              {selectedCita.historia ? (
                <div>
                  <p>
                    <strong>Motivo de consulta:</strong>{" "}
                    {selectedCita.historia.motivo_consulta}
                  </p>
                  <p>
                    <strong>Diagnóstico:</strong>{" "}
                    {selectedCita.historia.diagnostico}
                  </p>
                  <p>
                    <strong>Observaciones:</strong>{" "}
                    {selectedCita.historia.observaciones}
                  </p>
                </div>
              ) : (
                <p>No hay historia disponible para esta cita.</p>
              )}
            </div>
          ) : (
            <p>Cargando detalles de la cita...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={handleOpenConfirmModal}>
            Cancelar cita
          </Button>
          <Button color="gray" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isConfirmModalOpen} onClose={handleCloseConfirmModal}>
        <Modal.Header>Confirmar Cancelación</Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro que deseas cancelar esta cita?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" onClick={handleCancelCita}>
            Sí, cancelar
          </Button>
          <Button color="gray" onClick={handleCloseConfirmModal}>
            No, cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HomePacientePage;
