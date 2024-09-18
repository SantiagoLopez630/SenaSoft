cat <<EOL > README.md
# Proyecto Clínica Odontológica

## Descripción del Proyecto

Este proyecto es una aplicación para la gestión de una clínica odontológica, diseñada específicamente para el entrenamiento de los aprendices del SENA en el programa **SENASoft**. La aplicación proporciona una solución integral para la administración de citas, gestión de pacientes, y control de historial médico, entre otras funcionalidades esenciales para el funcionamiento eficiente de una clínica odontológica.

## Características Principales

- **Gestión de Pacientes**: Permite registrar y actualizar la información de los pacientes, incluyendo datos personales, historial médico y detalles de contacto.
- **Agenda de Citas**: Facilita la programación, modificación y cancelación de citas con los dentistas, así como el seguimiento de las citas pasadas y futuras.
- **Historial Médico**: Guarda el historial médico completo de cada paciente, incluyendo tratamientos anteriores, diagnósticos y notas de los dentistas.
- **Reportes**: Genera reportes sobre las actividades de la clínica, como el número de citas realizadas, tipos de tratamientos realizados y estadísticas generales.

## Tecnologías Utilizadas

- **Frontend**: [Gatsby](https://www.gatsbyjs.com/) - Para el desarrollo de la interfaz de usuario.
- **Backend**: [Django REST Framework](https://www.django-rest-framework.org/) - Para la creación de la API y la lógica del servidor.
- **Base de Datos**: [SQLite](https://www.sqlite.org/) - Para el almacenamiento de datos de pacientes, citas y tratamientos.
- **Autenticación**: Aún no implementada.

## Instalación

1. **Clonar el Repositorio**:

   \`\`\`bash
   git clone <url-del-repositorio>
   cd nombre-del-repositorio
   \`\`\`

2. **Instalar Dependencias del Frontend**:

   Navega a la carpeta del frontend (por ejemplo, \`flowbite-react-app/\`) y ejecuta:

   \`\`\`bash
   npm install
   \`\`\`

3. **Instalar Dependencias del Backend**:

   Navega a la carpeta del backend (por ejemplo, \`Backend/\`) y crea un entorno virtual, luego instala las dependencias:

   \`\`\`bash
   python -m venv venv
   source venv/bin/activate  # En Windows usa \`venv\\Scripts\\activate\`
   pip install -r requirements.txt
   \`\`\`

4. **Configurar la Base de Datos**:

   Ejecuta las migraciones para configurar la base de datos SQLite:

   \`\`\`bash
   python manage.py migrate
   \`\`\`

5. **Iniciar la Aplicación**:

   Para iniciar el servidor backend:

   \`\`\`bash
   python manage.py runserver
   \`\`\`

   Y para iniciar el frontend:

   \`\`\`bash
   npm start
   \`\`\`

## Uso

Una vez que la aplicación esté en funcionamiento, puedes acceder al frontend a través de \`http://localhost:3000\` y al backend a través de \`http://localhost:8000/api/\` (o los puertos que hayas configurado).

## Contribuciones

Este proyecto es parte del entrenamiento de los aprendices del SENA. Las contribuciones son bienvenidas y deben ser realizadas siguiendo las normas del proyecto. Por favor, consulta las [directrices de contribución](CONTRIBUTING.md) para más detalles.

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.
EOL
