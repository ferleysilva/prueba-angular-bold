# Prueba tecnica Bold

## Razonamiento

La estructura del proyecto esta basada en los principios de Clean Architecture, segmentada en diversas capas que facilitan el mantenimiento y la escalabilidad. Varias de estas capas están orientadas hacia un paradigma funcional, lo que ofrece ventajas como la facilidad el entendimiento sobre el código, una mejor testabilidad y una mayor reutilización de componentes. Por ejemplo, si en el futuro decidimos migrar a un framework diferente, como React, la capa de dominio y otras componentes pueden ser reutilizadas sin complicaciones, lo que simplifica el proceso de adaptación.

Además, el proyecto cuenta con un proceso de CI/CD, utilizando GitHub Actions para integrarse con Firebase. Esto permite que la aplicación se despliegue automáticamente en el entorno de producción cada vez que se suben cambios a la rama principal, garantizando una entrega continua y eficiente.

En cuanto a los estilos, se ha optado por utilizar CSS puro para este proyecto. Esta decisión se tomó considerando que, dado el tamaño del proyecto, no se justificaba el uso de preprocesadores. El uso de CSS puro facilita la comprensión del código y elimina la necesidad de aprender sintaxis adicional, permitiendo a los desarrolladores concentrarse en la lógica y el diseño sin complejidades innecesarias.

## Requisitos

### Versiones de Node.js y npm

Asegúrate de tener instaladas las siguientes versiones:

- **Node.js**: `18.x` o superior
- **npm**: `10.x` o superior
- **Angular CLI**: `18.x` o superior

Puedes verificar las versiones instaladas con los siguientes comandos:

```bash
node -v
npm -v
ng --version
```

### Ejecutar el proyecto en local

Instalacion dependencias `npm install`

Correr el proyecto en local `ng serve` `localhost:4200`

### Ejecutar test Karma

Se integraron algunos pruebas unitarias con Karma, para correr los test ejecutar

`ng test` -> Ejecuta todos los test.

`ng test --code-coverage` -> Muestra porcentaje general de cobertura de pruebas que tiene le proyecto.

### URL donde se aloja la aplicación

Esta aplicacion esta en un host de firebase, pueden verlo ingresando a la siguiente url: [https://prueba-bold.web.app/dashboard](https://prueba-bold.web.app/dashboard)
 