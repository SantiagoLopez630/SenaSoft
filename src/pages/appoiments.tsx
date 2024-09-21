import React, { useEffect, useState } from "react";
import { HeadFC, PageProps } from "gatsby";
import { NavbarPaciente } from "../components/Navbar/NavbarPaciente";
import { FooterComponent } from "../components/FooterComponent";
import { Checkbox, Table } from "flowbite-react";
import axios from "axios";

const LoginPage: React.FC<PageProps> = () => {
  const [citas, setCitas] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/citas/")
      .then((response) => {
        setCitas(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error al cargar los datos.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <NavbarPaciente />
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 py-8 dark:bg-gray-800">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-semibold dark:text-white">Citas</h1>
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className="p-4">
                  <Checkbox />
                </Table.HeadCell>
                <Table.HeadCell>ID Cita</Table.HeadCell>
                <Table.HeadCell>Tipo Cita</Table.HeadCell>
                <Table.HeadCell>Fecha Cita</Table.HeadCell>
                <Table.HeadCell>Hora Cita</Table.HeadCell>
                <Table.HeadCell>Estado Cita</Table.HeadCell>
                <Table.HeadCell>ID Paciente</Table.HeadCell>
                <Table.HeadCell>ID Odontólogo</Table.HeadCell>
                <Table.HeadCell>ID Empleado</Table.HeadCell>
                <Table.HeadCell>ID Servicio</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {citas.map((cita: unknown) => (
                  <Table.Row
                    key={cita.id_cita}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="p-4">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {cita.id_cita}
                    </Table.Cell>
                    <Table.Cell>{cita.tipo_cita}</Table.Cell>
                    <Table.Cell>{cita.fecha_cita}</Table.Cell>
                    <Table.Cell>{cita.hora_cita}</Table.Cell>
                    <Table.Cell>
                      {cita.est_cita ? "Confirmado" : "Pendiente"}
                    </Table.Cell>
                    <Table.Cell>{cita.id_pac}</Table.Cell>
                    <Table.Cell>{cita.id_odont}</Table.Cell>
                    <Table.Cell>{cita.id_emp}</Table.Cell>
                    <Table.Cell>{cita.id_serv}</Table.Cell>
                    <Table.Cell>
                      <a
                        href="#"
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        Editar
                      </a>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default LoginPage;

export const Head: HeadFC = () => <title>Citas</title>;
