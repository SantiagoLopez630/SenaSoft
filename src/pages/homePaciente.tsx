import React, { useEffect } from "react";
import { HeadFC, Link, PageProps, navigate } from "gatsby";
import { NavbarPaciente } from "../components/Navbar/NavbarPaciente";
import { FooterComponent } from "../components/FooterComponent";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";
import { Button, Card, Timeline } from "flowbite-react";
import Cookies from "js-cookie";

const HomePacientePage: React.FC<PageProps> = () => {
  
  useEffect(() => {
    const isAuthenticated = Cookies.get('isAuthenticated');
    const userRole = Cookies.get('user_role');
    
    if (!isAuthenticated || userRole !== 'Paciente') {
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <NavbarPaciente />
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-8 dark:bg-gray-800 md:flex-row md:px-16 lg:px-24">
        {/* Content Section */}
        <div className="flex-1 text-center md:mr-12 md:text-left">
          <h1 className="mb-6 text-3xl font-semibold dark:text-white md:mb-8">
            Bienvenid@ <strong>paciente</strong>
          </h1>
          <h2 className="mb-4 font-normal dark:text-white md:mb-6">
            Qué quieres hacer hoy?
          </h2>
          <Card className="mx-auto max-w-sm md:mx-0 md:mb-8">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Panel de cita!
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Ooops... Pareces que no tienes citas activas...
            </p>
            <Link to="/appoiments">
              <Button>
                Pide ahora!
                <svg
                  className="-mr-1 ml-2 size-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Link>
          </Card>
          <div className="h-32 sm:h-64 xl:h-96 2xl:h-96">
            <img src="/images/logo-removebg-preview.png" alt="logo2" />
          </div>
        </div>

        <div className="flex-1 md:max-w-xs">
          <Timeline>
            <Timeline.Item>
              <Timeline.Point icon={HiCalendar} />
              <Timeline.Content>
                <Timeline.Time>February 2022</Timeline.Time>
                <Timeline.Title>
                  Application UI code in Tailwind CSS
                </Timeline.Title>
                <Timeline.Body>
                  Get access to over 20+ pages including a dashboard layout,
                  charts, kanban board, calendar, and pre-order E-commerce &
                  Marketing pages.
                </Timeline.Body>
                <Button color="gray">
                  Learn More
                  <HiArrowNarrowRight className="ml-2 size-3" />
                </Button>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point icon={HiCalendar} />
              <Timeline.Content>
                <Timeline.Time>March 2022</Timeline.Time>
                <Timeline.Title>Marketing UI design in Figma</Timeline.Title>
                <Timeline.Body>
                  All of the pages and components are first designed in Figma
                  and we keep a parity between the two versions even as we
                  update the project.
                </Timeline.Body>
                <Button color="gray">
                  Learn More
                  <HiArrowNarrowRight className="ml-2 size-3" />
                </Button>
              </Timeline.Content>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.Point icon={HiCalendar} />
              <Timeline.Content>
                <Timeline.Time>April 2022</Timeline.Time>
                <Timeline.Title>
                  E-Commerce UI code in Tailwind CSS
                </Timeline.Title>
                <Timeline.Body>
                  Get started with dozens of web components and interactive
                  elements built on top of Tailwind CSS.
                </Timeline.Body>
                <Button color="gray">
                  Learn More
                  <HiArrowNarrowRight className="ml-2 size-3" />
                </Button>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default HomePacientePage;

export const Head: HeadFC = () => <title>Iniciar sesión</title>;
