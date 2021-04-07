require('dotenv').config();
const express = require('express')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const app = express()
const port = process.env.PORT || 3000;
const stage = process.env.STAGE;
const dynamoose = require("dynamoose");
const bodyParser = require('body-parser')
dynamoose.aws.sdk.config.update({
  'accessKeyId':'dummy',
  'secretAccessKey':'dummy',
  'region': "us-east-1",
  'endpoint': stage ? 'http://localhost:8000' : 'http://dynamodb-api:8000'
});
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "ZeBrands Luuna Back End API",
      version: '1.0.0',
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        schema: 'bearer',
        in: 'header'
      }
    }
  },
  apis: ["./src/routes/*.js"],

};
const productsRoutes = require("./src/routes/products");
const usersRoutes = require("./src/routes/users");

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use('/products', productsRoutes)
app.use('/users', usersRoutes)

if (process.env.NODE_ENV !== 'test'){
  app.listen(port, () => {
    console.log(`zeBrans Backend se encuentra ejecutando en http://localhost:${port}`)
  });
}


module.exports = app;
