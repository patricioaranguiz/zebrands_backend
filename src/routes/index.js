const prod = require('../controller/producto.controller');

function routes(app) {

  app.get('/listar', prod.listar);

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
}

module.exports = {routes}
