import React, { useEffect } from "react";
import { HeadFC, PageProps, navigate } from "gatsby";
import { NavbarPaciente } from "../components/Navbar/NavbarPaciente";
import { FooterComponent } from "../components/FooterComponent";
import { ServicesComponent } from "../components/ServicesComponent";
import Cookies from "js-cookie";

const ServicesPage: React.FC<PageProps> = () => {
  useEffect(() => {
    const isAuthenticated = Cookies.get("isAuthenticated");
    const userRole = Cookies.get("user_role");

    if (!isAuthenticated || userRole !== "Paciente") {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <NavbarPaciente />
      <div className="flex min-h-screen flex-col text-center">
        <main className="flex grow flex-col items-center justify-center gap-6 py-8 dark:bg-gray-800">
          <h1 className="mb-4 text-2xl font-semibold dark:text-white">
            Servicios
          </h1>
          <hr className="mx-auto mb-6 w-24 border-t-2 border-cyan-800 dark:border-gray-600" />
          <ServicesComponent />
        </main>
        <FooterComponent />
      </div>
    </>
  );
};

export default ServicesPage;

export const Head: HeadFC = () => <title>Servicios</title>;
