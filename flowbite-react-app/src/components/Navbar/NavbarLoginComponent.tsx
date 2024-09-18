"use client";

import { DarkThemeToggle } from "flowbite-react";
import { Navbar } from "flowbite-react";
import { Link } from "gatsby";
import React from "react";

export function NavbarLoginComponent() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} to="/">
        <img
          src="/images/logo_OdontoNet.png"
          className="mr-3 h-6 sm:h-9"
          alt="Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-cyan-800 dark:text-white">
          OdontoNet
        </span>
      </Navbar.Brand>

      <DarkThemeToggle />
    </Navbar>
  );
}
