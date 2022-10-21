## Flujo de trabajo

1. Realizamos las instalaciones necesarias (tome como referencia el archivo "instalacion-configuracion.md")
   - Configuracion del eslint y el package.json

2. Cramos las carpetas del scafolding

3. Dentro de la carpeta "config" creamos las variables de entorno en los archivos
   ```
    development.env
    productin.env
    staging.env
   ```
4. Luego nos dirigimos hacia el archivo "app.ts" y realizamos la configuracion de express y variables de entorno 

5. Realizamos el levantamiento del servidor en el puerto 3000 en el archivo "server.ts" el cual importa la constante app del "app.ts"

6. Dentro de la carpeta "common", vamos a creamos una sub-carpeta llamda persistence en donde vamos a tener un archivo llamado "mysql.persistence.ts" es el archivo que realiza la conexion hacia la base de datos en base a las variables de entorno.

4. Una vez que logramos levantar el servidor en el puerto 3000 y tenemos las variables de entorno configuradas, debemos ir al carpeta de "services" y comenzamos la creacion de los entitys en el dominio y los repository, tomando como punto de partida la tabla wallet_subscription de la base de datos

 - Domain
 - Interfaces
 - Impl ( antes de comenzar a codear aca debo realizar la conexion a mysql)
 - Recordemos la conexión hacia la base de datos "carpeta common -> persistence"


5. Este es el orden de las carpetas
  - Programamos domain -> ISubscriptionDomain (Que mapea la tabla de la base de datos).
  - Creamos los métodos abstractos del Repository interfaces -> ISubscriptionRepository.ts 
  - Luego en impl -> mysql -> subscriptionRepository.ts implementamos los métodos abstractos de la interface

6. Registramos el repository subscriptionRepository.ts (SubscriptionMySQLRepository) en el container.ts

7. Luego creamos el Servicio, dto y errores de Exceptions
   - Creo los errores common -> exceptions -> application.exception.ts (ApplicationException)
   - En el folder dtos creamos (ISubscriptionCreateDto, ISubscriptionUpdateDto)
   - Creamos dentro de services -> subscription.service.ts

   **El servicio va recibe en su constructor una inyeccion de dependencia para trabajar con los metodos del Repository**

8. Registrar el servicio en el container.ts

11. Luego programamos los controladores ( admitir el decorator en tsconfig.json) 
    Nos vamos al archivo tsconfig.json
    ```
      "experimentalDecorators": true,                  
      "emitDecoratorMetadata": true,  
    ```
    Y debemos habiltar esto para trabajar con los controladores

12. El controlador recibe una inyeccion de dependencias del servicio, el controlador necesita manejar sus errores en el common -> "error-controller" -> "error-base.controller.ts"

13. Crear los métodos del C.R.U.D consumiendo la inyección del Servicio

14. Realizar la conexion a Sql Server


