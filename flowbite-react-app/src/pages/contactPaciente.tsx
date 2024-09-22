import React, { useEffect } from "react";
import { HeadFC, PageProps, navigate } from "gatsby";
import { FooterComponent } from "../components/FooterComponent";
import { NavbarPaciente } from "../components/Navbar/NavbarPaciente";
import Cookies from "js-cookie";

const ContactPacientePage: React.FC<PageProps> = () => {
  useEffect(() => {
    const isAuthenticated = Cookies.get("isAuthenticated");
    const userRole = Cookies.get("user_role");

    if (!isAuthenticated || userRole !== "Paciente") {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <NavbarPaciente />
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 py-8 dark:bg-gray-800">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-semibold dark:text-white">
            Contacto
          </h1>
          <hr className="mx-auto mb-6 w-24 border-t-2 border-cyan-800 dark:border-gray-600" />
        </div>

        {/* Formulario de contacto */}
        <form className="w-full max-w-md space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-left text-gray-700 dark:text-gray-300"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              placeholder="Tu nombre"
              className="w-full rounded-md border p-2 focus:outline-none focus:ring focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-left text-gray-700 dark:text-gray-300"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              placeholder="Tu correo"
              className="w-full rounded-md border p-2 focus:outline-none focus:ring focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-left text-gray-700 dark:text-gray-300"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              placeholder="Tu mensaje"
              className="w-full rounded-md border p-2 focus:outline-none focus:ring focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-cyan-600 p-2 text-white hover:bg-cyan-700 focus:outline-none"
          >
            Enviar
          </button>
        </form>
      </main>
      <FooterComponent />
    </div>
  );
};

export default ContactPacientePage;

export const Head: HeadFC = () => <title>Contacto</title>;
