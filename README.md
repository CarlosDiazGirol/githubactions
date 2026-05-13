Pega esto como primer workflow sencillo en GitHub Actions.

Nombre recomendado del archivo:

```txt
.github/workflows/first-action.yml
```

Contenido:

```yml
name: Primera Action

on:
  push:
    branches: [main]

jobs:
  hola:
    runs-on: ubuntu-latest

    steps:
      - name: Mostrar mensaje
        run: echo "Hola desde GitHub Actions"
```

## Qué estás enseñando aquí

```yml
name: Primera Action
```

Nombre del workflow que verán en la pestaña **Actions**.

```yml
on:
  push:
    branches: [main]
```

Cuándo se ejecuta. En este caso, cada vez que haya un `push` a la rama `main`.

```yml
jobs:
```

Lista de trabajos que se van a ejecutar.

```yml
hola:
```

Nombre interno del job.

```yml
runs-on: ubuntu-latest
```

GitHub levanta una máquina temporal con Ubuntu.

```yml
steps:
```

Pasos que ejecutará esa máquina.

```yml
run: echo "Hola desde GitHub Actions"
```

Ejecuta un comando de terminal.

## Frase para explicarlo en clase

> GitHub Actions levanta una máquina temporal en la nube, descarga o prepara el entorno que le digamos, y ejecuta comandos como si estuviéramos en una terminal. En este primer ejemplo solo imprime un mensaje, pero después haremos que instale dependencias, pase tests, revise el linter y compruebe el build.
