# Instalaciones API REST FULL CON NODE Y TYPESCRIPT

1. Es necesario antes de comenzar teneg instalado typescript en nuestros equipos de forma global, esto lo realizamos con el siguiente comando: 
    ```
    npm install -g typescript
    npm install -g ts-node
    ```

2. Creamos una carpeta( en nuestro caso se llama node_avanzado) y la abrimos en una terminal e inicializamos un proyecto de typescript

    ```
        tsc --init
    ```
    
    Este comando nos va permitir crear un proyecto de typescript, si se ejecuta de manera exitosa veremos el archivo "tsconfig.json"

3. Inicializamos un proyecto de Node
   ```
    npm init -y
   ```
   Este comando nos va crear el package.json, en donde vamos a tener el registro de las dependencias de desarrollo y de producción de nuestro proyecto

4. Para el manejo de errores eslint
    ```
    npx eslint --init
   ```

5. Creamos la estructura carpetas
   Creamos la carpeta config y src en donde tendremos toda la estructura para trabajar con el patrón repositorio. (revizar la primera clase en donde creamos toda esa estructura).

6. Dependencias el proyecto
   
   ### Express
   ```
   npm install express --save
   npm install --save-dev @types/express
   ```

   ### Variables de entorno
   ```
   npm install --save dotenv
   npm install @types/dotenv -D
   ```

   ### Debugear y para crear comandos
    ```
  	npm install ts-node -D
  	npm install ts-node-dev -D
  	npm install tsconfig-paths -D
    ```

   ### Para trabajar con el contenedor y route
   ```
   npm install awilix@7.0.3 --save
   npm install awilix-express@7.0.0 --save
   ```
   ### Instalación para trabajar con MySQL
   ```
   npm install mysql2 --save
   ```