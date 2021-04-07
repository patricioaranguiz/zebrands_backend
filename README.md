# ZeBrands Luuna

Desarrollo de prueba técnica para Backend

---

### Descripción

Desarrollo de API Rest para la interacion de usuarios y productos.

---

### Pre-requisitos


Antes de ejecutar el proyecto debes tener como base instalado NodeJs para ejecutar el proyecto, Docker para levantar los 
contenedores que requiere el proyecto.

---

### Contruido con

* [NodeJS](https://nodejs.org/es) - Entorno de ejecución.
* [ExpressJS](https://expressjs.com/es/) - Infraestructura de aplicación.
* [Docker](https://www.docker.com/get-started) - Administrador de contenedores
* [Postman](https://www.postman.com)/[Insomnia](https://insomnia.rest/download) - Para el consumo de API's
* [DynamoDB](https://aws.amazon.com/es/dynamodb/) - Base de datos no relacional
* [Swagger](https://swagger.io/) - Documentación de API's

---

### Despliegue

Una vez clonado el repositorio debemos abrir un terminal en nuestra PC y ejecutar el comando **`docker-compose`** como se muestra 
en las siguientes líneas, con esto vamos a compilar y ejecutar los contenedores necesarios para que el proyecto funcione.

```
docker-compose up
```
Para chequear que el proyecto se está ejecutando sin problemas deben aparecer las siguientes líneas.
```
node-api        | [nodemon] 2.0.7
node-api        | [nodemon] to restart at any time, enter `rs`
node-api        | [nodemon] watching path(s): *.*
node-api        | [nodemon] watching extensions: js,mjs,json
node-api        | [nodemon] starting `node app.js`
node-api        | zeBrans Backend se encuentra ejecutando en http://localhost:3000
```


### Pruebas

Para realizar pruebas sobre las API's debemos importar en Postman o Insomnia el archivo con formato JSON que se encuentra en la 
raíz del proyecto.
Una vez importado se veran reflejadas todas las API's desarrolladas
del proyecto. Para comenzar se debe consumir la API de login para que entregue un token de sesión válido.

_Credenciales_
```
{
    username: 'zebrands',
    password: 'zebrands'     
}
```
_Archivo Json_
```
ZeBrands.json
```

#### **Recordar que el token generado debe ir en el Header de cada API's consumida**

###Documentación

Para revisar y comprender las API's desarrolladas podemos acceder a la documentación generada, en la cual también se pueden hacer 
pruebas 
funcionales directamente sin realizar el paso anterior.
Para acceder a la documentación debes copiar y pegar la siguiente URL.
```
http://localhost:3000/api-docs
```
