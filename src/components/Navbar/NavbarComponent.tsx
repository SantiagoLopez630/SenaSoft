"use client";

import { DarkThemeToggle } from "flowbite-react";
import { Button, Navbar } from "flowbite-react";
import { Link } from "gatsby";
import React from "react";

export function NavbarComponent() {
  return (
    <Navbar fluid rounded className="fixed left-0 top-0 z-50 w-full">
      <Navbar.Brand as={Link} to="/">
        <img
          src="/images/logo_OdontoNet.png"
          className="mr-3 h-6 sm:h-20"
          alt="logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-cyan-800 dark:text-white">
          OdontoNet
        </span>
      </Navbar.Brand>
      <div className="ml-3 flex md:order-2">
        <Link to="/login">
          <Button className="mr-4">Pide tu cita ahora!</Button>
        </Link>
        <DarkThemeToggle />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" active>
          Inicio
        </Navbar.Link>
        <Navbar.Link as={Link} to="/about">
          ¿Quiénes somos?
        </Navbar.Link>
        <Navbar.Link as={Link} to="/services">
          Servicios que ofrecemos
        </Navbar.Link>
        <Navbar.Link as={Link} to="/contact">
          Contacto
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
