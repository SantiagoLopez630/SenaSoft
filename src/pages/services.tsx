import React from "react";
import { FooterComponent } from "../components/FooterComponent";
import { NavbarComponent } from "../components/Navbar/NavbarComponent";
import { HeadFC, PageProps } from "gatsby";

const ServicesPage: React.FC<PageProps> = () => {
  return (
    <>
      <div>
        <NavbarComponent />
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-semibold dark:text-white">
            Servicios
          </h1>
          <hr className="mx-auto mb-6 w-24 border-t-2 border-cyan-800 dark:border-gray-600" />
          <p className="mx-20 text-lg text-gray-700 dark:text-gray-300">
            Queremos que sepas todo sobre tu tratamiento y acompañarte desde la
            primera cita, por eso contamos con un equipo de especialistas en el
            mismo lugar para facilitar y agilizar tu tratamiento. Conoce
            nuestros servicios, agenda tu cita y da el primer paso para tu
            sonrisa soñada.
          </p>
        </div>
        <main></main>
        <FooterComponent />
      </div>
    </>
  );
};

export default ServicesPage;

export const Head: HeadFC = () => <title>Servicios</title>;
