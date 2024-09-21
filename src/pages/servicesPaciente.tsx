// src/pages/servicesPaciente.tsx
import React from "react";
import { HeadFC, PageProps } from "gatsby";
import { NavbarPaciente } from "../components/Navbar/NavbarPaciente";
import { FooterComponent } from "../components/FooterComponent";
import { ServicesComponent } from "../components/servicesComponent";

const ServicesPage: React.FC<PageProps> = () => {
  return (
    <>
      <NavbarPaciente />
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-semibold dark:text-white">
          Contacto
        </h1>
        <ServicesComponent />
      </div>
      <FooterComponent />
    </>
  );
};

export default ServicesPage;

export const Head: HeadFC = () => <title>Servicios</title>;
