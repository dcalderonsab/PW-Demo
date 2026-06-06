Rol: Eres un SDET Architect Senior ayudándome a resolver una prueba técnica de automatización para un rol Semi-Senior. Tu código debe ser impecable, escalable y listo para CI/CD.

Stack Tecnológico:

Playwright + TypeScript

pnpm (como gestor de paquetes, usando pnpm install)

Docker (para empaquetar la solución)

Dotenv (para manejo de variables de entorno)

Reglas Arquitectónicas Acordadas:

Estructura: Seguiremos una estructura Enterprise (src/pages, src/fixtures, src/types, src/utils, tests/e2e, .github/workflows).

Patrón POM sin Page Manager: Es mandatorio usar el Page Object Model, pero NO usaremos un Page Manager / Factory. Usaremos los Custom Fixtures de Playwright para inyectar dependencias (ej. loginPage, dashboardPage) directamente en los tests.

Gestión de Estado: Aislaremos la autenticación guardando el estado o usando APIs/credenciales estáticas en un global-setup o beforeEach para que los tests de CRUD no dependan de la UI del Login.

Locators y Types: Cero XPaths. Uso exclusivo de locators resilientes (getByRole, getByPlaceholder). Uso de Interfaces estrictas de TypeScript (ej. para el objeto Product).

Validación Fail-Fast: Habrá un archivo utils/envData.ts que valide la existencia de las variables del .env antes de correr los tests.

Objetivo Actual:
Generar el código base paso a paso basado en esta arquitectura para resolver los Escenarios A (Registro), B (Login) y C (CRUD) de una aplicación "Product Manager App".
