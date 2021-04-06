const express = require('express')
const app = express()
const port = 3000

const { routes } = require("./src/routes");

routes(app)



app.listen(port, () => {
  console.log(`zeBrans Backend se encuentra ejecutando en http://localhost:${port}`)
})