# GitHub Actions Calculator

Proyecto React + Vite + Jest pensado para explicar GitHub Actions con un caso simple: instalar dependencias, ejecutar tests, pasar lint y generar el build.

## Paso 1. Tener el proyecto preparado

Este proyecto ya tiene los comandos que después ejecutará GitHub Actions:

```bash
npm install
npm test
npm run lint
npm run build
```

La idea es que GitHub Actions haga exactamente eso en una máquina temporal de GitHub.

## Paso 2. Crear el primer workflow más simple posible

Primero conviene enseñar un workflow mínimo para que se entienda la estructura.

Archivo:

```txt
.github/workflows/hello.yml
```

Contenido:

```yml
name: Hello Workflow

on:
  push:
    branches: [main]
jobs:
  hello:
    runs-on: ubuntu-latest

    steps:
      - name: Mostrar mensaje
        run: echo "Hola desde GitHub Actions"
```

Qué explica este YAML:

- `name`: nombre visible del workflow en la pestaña Actions.
- `on`: evento que dispara la ejecución.
- `jobs`: trabajos que GitHub ejecuta.
- `runs-on`: sistema operativo de la máquina temporal.
- `steps`: comandos que se ejecutan dentro del job.

## Paso 3. Pasar del ejemplo simple al workflow real

Cuando el alumnado entienda la estructura básica, el siguiente paso es usar el workflow real del proyecto.

Archivo:

```txt
.github/workflows/main.yml
```

Contenido:

```yml
name: Validar proyecto

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read

jobs:
  validate:
    runs-on: ubuntu-latest

    steps:
      - name: Descargar el código
        uses: actions/checkout@v6

      - name: Instalar Node
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: npm

      - name: Instalar dependencias
        run: npm install

      - name: Ejecutar linter
        run: npm run lint

      - name: Ejecutar tests
        run: npm test

      - name: Comprobar build
        run: npm run build
```

Nota importante:

- La documentación actual de GitHub ya usa `actions/setup-node@v6`.
- Se puede poner `node-version: 24` directamente.
- `actions/checkout` y `actions/setup-node` no tienen por qué compartir número de versión, pero ahora mismo ambos tienen versión moderna `v6`.
- `permissions: contents: read` es una buena práctica mínima para este caso.
- `cache: npm` activa la caché de dependencias de npm.

## Paso 4. Explicar qué hace el workflow de CI

Este flujo enseña una idea muy útil: GitHub Actions puede repetir automáticamente el mismo proceso que haríamos en local.

Orden del job:

1. Descarga el repositorio con `actions/checkout@v6`.
2. Instala Node 24 con `actions/setup-node@v6`.
3. Ejecuta `npm install`.
4. Ejecuta `npm run lint`.
5. Ejecuta `npm test`.
6. Ejecuta `npm run build`.

Si uno de esos pasos falla, el workflow falla.

Por qué está bien así:

- El checkout usa la versión moderna actual de la action.
- El setup de Node usa la versión moderna actual de la action.
- Node 24 queda fijado de forma explícita.
- El proyecto pasa exactamente los comandos que quieres enseñar después.

## Paso 5. Trabajar con ramas y pull requests

El flujo recomendado para clase es este:

1. La rama protegida es `main`.
2. El alumnado crea una rama nueva para trabajar.
3. Hace cambios y sube esa rama a GitHub.
4. Abre una pull request hacia `main`.
5. GitHub Actions ejecuta el workflow `Validar proyecto`.
6. Si todo pasa, se puede aprobar y hacer merge.

Esto permite enseñar integración continua de una forma muy visual.

## Paso 6. Configurar protección de la rama `main`

La protección de rama no se configura con YAML dentro del repositorio. Se configura en la interfaz de GitHub.

Ruta en GitHub:

```txt
Repository Settings > Branches > Branch protection rules
```

Configuración recomendada para `main`:

1. Crear una regla para la rama `main`.
2. Activar `Require a pull request before merging`.
3. Activar `Require approvals` si quieres forzar revisión.
4. Activar `Require status checks to pass before merging`.
5. Seleccionar el check del workflow de CI cuando aparezca en la lista.
6. Guardar la regla.

Normalmente el check aparecerá con un nombre parecido a:

```txt
Validar proyecto / validate
```

Eso depende del nombre del workflow (`Validar proyecto`) y del nombre del job (`validate`).

## Paso 7. Secuencia didáctica recomendada

Si quieres enseñarlo por fases, este orden funciona bien:

1. Crear el workflow `hello.yml` y enseñar la estructura mínima.
2. Crear o mostrar el workflow definitivo `main.yml` y explicar `checkout` y `setup-node`.
3. Lanzar una pull request para ver cómo se ejecuta.
4. Activar la protección de `main`.
5. Intentar mergear con un fallo para que se vea cómo GitHub lo bloquea.

## Resumen corto para clase

GitHub Actions ejecuta en la nube los mismos comandos que ejecutaríamos en local. En este proyecto, el workflow definitivo de [.github/workflows/main.yml](.github/workflows/main.yml) instala dependencias, pasa el linter, lanza tests y genera el build antes de permitir integrar cambios en `main`.
