"use client";

import { Avatar, Dropdown, Navbar, DarkThemeToggle } from "flowbite-react";
import React from "react";
import { ClearCookiesButton } from "../ClearCookiesButton"

export function NavbarPaciente() {
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
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Mi perfil</Dropdown.Item>
          <Dropdown.Item>Historial médico</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <strong><ClearCookiesButton></ClearCookiesButton></strong>
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
        <div className="mx-3">
          <DarkThemeToggle />
        </div>
      </div>

      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Inicio
        </Navbar.Link>
        <Navbar.Link href="#"></Navbar.Link>
        <Navbar.Link href="#">Pide tu cita</Navbar.Link>
        <Navbar.Link href="#">Servicios</Navbar.Link>
        <Navbar.Link href="#">Contacto</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
