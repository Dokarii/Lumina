# Lumina - Aplicación de Bienestar Emocional

## Descripción del Proyecto
Lumina es una aplicación web diseñada para ayudar a los usuarios a monitorear y mejorar su bienestar emocional. Permite a los usuarios registrar diariamente su estado de ánimo, nivel de energía y estrés, visualizar estos datos en formato de tabla y obtener promedios para entender mejor sus patrones emocionales a lo largo del tiempo.

## Estructura del Proyecto
El proyecto está organizado en una arquitectura cliente-servidor:

### Frontend (React + Vite)
- `/src`: Código fuente principal
  - `/Pages`: Componentes principales de la aplicación
    - `App.jsx`: Componente principal y gestión de rutas
    - `Dashboard.jsx`: Panel principal del usuario
    - `MoodSurvey.jsx`: Formulario para registrar el estado emocional
    - `Resumen.jsx`: Visualización de datos en formato tabla
    - `Registro.jsx`: Formulario de registro de usuarios
    - `Header.jsx` y `footer.jsx`: Componentes de navegación
  - `/assets` y `/images`: Recursos gráficos
  - `Router.jsx`: Configuración de rutas
  - `Funciones.jsx`: Funciones de utilidad

### Backend (Python + Flask)
- `/backend`: Código del servidor
  - `app.py`: Punto de entrada de la aplicación Flask
  - `/routes`: Endpoints de la API
    - `auth_routes.py`: Autenticación y gestión de usuarios
    - `calificaciones_routes.py`: Gestión de registros emocionales
  - `/models`: Modelos de datos
  - `database.py`: Configuración de la base de datos

## Tecnologías Utilizadas

### Frontend
- **React**: Biblioteca para construir interfaces de usuario
- **Vite**: Herramienta de construcción y desarrollo
- **CSS**: Estilos personalizados para cada componente
- **React Router**: Navegación entre páginas

### Backend
- **Python**: Lenguaje de programación principal
- **Flask**: Framework web para Python
- **MySQL**: Base de datos relacional
- **SQLAlchemy**: ORM para interactuar con la base de datos

## Funcionalidades Principales
1. **Registro e inicio de sesión**: Sistema de autenticación de usuarios
2. **Encuesta de bienestar**: Formulario para registrar estado de ánimo, energía y estrés
3. **Visualización de datos**: Tabla con historial de registros y promedios
4. **Dashboard personalizado**: Panel principal con resumen de información

## Instalación y Configuración

### Requisitos Previos
- Node.js (v14 o superior)
- Python (v3.8 o superior)
- MySQL

### Configuración del Frontend
```bash
# Clonar el repositorio
git clone https://github.com/Dokarii/Lumina.git

# Navegar al directorio del proyecto
cd Lumina

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Configuración del Backend
```bash
# Navegar al directorio del backend
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# En Windows:
venv\Scripts\activate
# En macOS/Linux:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno para la base de datos
# Editar el archivo config.py

# Iniciar servidor
python app.py
```

## Uso de la Aplicación
1. Registrarse o iniciar sesión
2. Completar la encuesta diaria de bienestar
3. Visualizar el historial y promedios en la sección de Resumen
4. Explorar el Dashboard para ver información adicional

## Contribución
Si deseas contribuir al proyecto, por favor:
1. Haz un fork del repositorio
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`)
4. Sube los cambios a tu fork (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## Contacto
Para más información, contactar a los desarrolladores del proyecto.
