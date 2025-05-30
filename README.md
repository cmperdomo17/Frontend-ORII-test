# Sistema de Gestión de Movilidad ORII

Este es un proyecto [Next.js](https://nextjs.org) para la Oficina de Relaciones Interinstitucionales e Internacionales (ORII) de la Universidad del Cauca, diseñado para gestionar los procesos de movilidad académica, convenios y estadísticas institucionales.

## Módulos del Sistema

El sistema cuenta con los siguientes módulos principales:

### Inicio
- **Acerca de ORII**: Información general sobre la oficina y sus funciones
- *Roles permitidos*: SU, ADMIN, USER

### Convenios
- **Listar convenios**: Visualización de todos los convenios activos
- **Crear convenio**: Registro de nuevos convenios institucionales
- *Roles permitidos*: ADMIN, USER (solo lectura para USER)

### Movilidad
- **Listar movilidades**: Visualización de todos los procesos de movilidad
- **Crear movilidad**: Registro de nuevas solicitudes de movilidad
- *Roles permitidos*: ADMIN, USER

### Estadísticas
- **Gráficos**: Visualización de datos estadísticos sobre movilidad y convenios
- *Roles permitidos*: ADMIN, USER

### Gestión de usuarios (Solo Superusuario)
- **Registrar usuario**: Creación de nuevos usuarios del sistema
- *Roles permitidos*: SU

### Gestión de enlaces (Solo Administradores)
- **Registrar enlace**: Creación de nuevos enlaces institucionales
- *Roles permitidos*: ADMIN

## Configuración Inicial

### Variables de Entorno

Antes de iniciar el proyecto, debes crear un archivo `.env` en el directorio raíz con la siguiente configuración:

```
NEXT_PUBLIC_API_URL = "http://localhost:8080/api/v1"
```

### Iniciar el Servidor de Desarrollo

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

Puedes comenzar a editar la página modificando `app/page.tsx`. La página se actualiza automáticamente cuando editas el archivo.

## Tecnologías

Este proyecto utiliza [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para optimizar y cargar automáticamente [Geist](https://vercel.com/font), una nueva familia de fuentes para Vercel.

## Más Información

Para aprender más sobre Next.js:

- [Documentación de Next.js](https://nextjs.org/docs) - aprende sobre características y API de Next.js.
- [Aprende Next.js](https://nextjs.org/learn) - un tutorial interactivo de Next.js.
- [Repositorio GitHub de Next.js](https://github.com/vercel/next.js) - tus comentarios y contribuciones son bienvenidos.

## Despliegue

La forma más sencilla de desplegar tu aplicación Next.js es utilizar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), creada por los autores de Next.js.

Consulta nuestra [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.
