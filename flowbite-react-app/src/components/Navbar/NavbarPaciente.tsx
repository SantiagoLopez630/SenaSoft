"use client";

import { Avatar, Dropdown, Navbar, DarkThemeToggle } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { ClearCookiesButton } from "../ClearCookiesButton";
import axios from "axios";
import { Link } from "gatsby";
import Cookies from "js-cookie";

export function NavbarPaciente() {
  const [paciente, setPaciente] = useState({
    nom: "Cargando...",
    ape: "",
    nro_doc: "Cargando...",
  });

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

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          src="/images/logo_OdontoNet.png"
          className="mr-3 h-6 sm:h-9"
          alt="Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-cyan-800 dark:text-white">
          OdontoNet
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {paciente.nom} {paciente.ape} {/* Nombre y apellido */}
            </span>
            <span className="block truncate text-sm font-medium">
              {paciente.nro_doc} {/* Número de documento */}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Mi perfil</Dropdown.Item>
          <Dropdown.Item>Historial médico</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <strong>
              <ClearCookiesButton />
            </strong>
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
        <div className="mx-3">
          <DarkThemeToggle />
        </div>
      </div>

      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/homePaciente">
          Inicio
        </Navbar.Link>
        <Navbar.Link as={Link} to="/asignacionCita">
          Asignación de Citas
        </Navbar.Link>
        <Navbar.Link href="#">Servicios</Navbar.Link>
        <Navbar.Link href="#">Contacto</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
