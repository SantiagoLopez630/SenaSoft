// src/pages/contact.tsx
import React from "react";
import { HeadFC, PageProps } from "gatsby";
import { NavbarComponent } from "../components/Navbar/NavbarComponent";
import { FooterComponent } from "../components/FooterComponent";

const ContactPage: React.FC<PageProps> = () => {
  return (
    <>
      <NavbarComponent />
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-semibold dark:text-white">
          Contacto
        </h1>
        <FooterComponent />
      </div>
    </>
  );
};

export default ContactPage;

export const Head: HeadFC = () => <title>Contacto</title>;
