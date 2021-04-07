"use strict";
const ProductModel = require('../models/productModel');
const TrackeingModel = require('../models/trackingModel');
const UserModel = require('../models/userModel');
const {jwtVerify} = require('../utils/jwtUtils');
const emailUtils = require('../utils/emailUtils');


async function getAllProduct(req, res) {
  try {
    console.log(req.headers.authorization)
    const payload = await jwtVerify(req.headers.authorization);
    if (payload.profile === 1) {
      const response = await ProductModel.scan().exec();
      if (response.count > 0) {
        res.status(200).json({message: 'Listado de productos recuperado correctamente', data: response});
      } else {
        res.status(200).json({
          message: 'No se encontraron productos',
          data: []
        });
      }
    } else if (payload.profile === 2) {
      res.status(403).send('No autorizado')
    }

  } catch (e) {
    if (e.code) {
      res.status(e.code).send(e.message);
    } else {
      res.status(500).send('Ocurrio un error');
    }
  }
}

async function getProductBySku(req, res) {
  try {
    const payload = await jwtVerify(req.headers.authorization);
    const sku = parseInt(req.params.sku)
    const data = await ProductModel.query({sku: sku}).exec();
    if (data.count > 0) {
      if (payload.profile === 2) {
        await TrackeingModel.create({username: payload.username, date: new Date(), product: data[0].sku})
      }
      res.status(200).json({message: 'Producto obtenedo con exito', data})
    } else {
      res.status(200).json({message: 'Producto no encontrado'});
    }
  } catch (e) {
    if (e.code) {
      res.status(e.code).send(e.message);
    } else {
      res.status(500).send('Ocurrio un error');
    }
  }
}

async function createProduct(req, res) {
  try {
    const payload = await jwtVerify(req.headers.authorization);
    if (payload.profile === 1) {
      console.log(req.body);
      const product = await ProductModel.create(req.body)
      return res.status(200).json({message: 'Success', data: product});
    } else if (payload.profile === 2) {
      res.status(403).send('No autorizado')
    }
  } catch (e) {
    if (e.code) {
      res.status(e.code).send(e.message);
    } else {
      res.status(500).send('Ocurrio un error');
    }
  }


}

async function updateProduct(req, res) {
  try {
    const payload = await jwtVerify(req.headers.authorization);
    const sku = parseInt(req.params.sku);
    if (payload.profile === 1) {
      const user = await ProductModel.scan({sku: sku}).exec();
      if (user.count > 0) {
        const updateProduct = await ProductModel.update(
          {sku: sku},
          {
            name: req.body.name,
            price: req.body.price,
            brand: req.body.brand
          });

        res.status(200).json({message: 'Producto actualizado correctamente', data: updateProduct});

        const usersAdmin = await UserModel.scan({profile: 1}).exec();
        if (usersAdmin.count > 0) {
          usersAdmin.map((user)=> {
            emailUtils.sendEmailUpdateProduct({user, updateProduct})
          })
        }
      } else {
        res.status(200).json({message: 'Producto no encontrado', data: {}});
      }
    } else if (payload.profile === 2) {
      res.status(403).send('No autorizado')
    }
  } catch (e) {
    console.log(e);
    if (e.code) {
      res.status(e.code).send(e.message);
    } else {
      res.status(500).send('Ocurrio un error');
    }
  }
}

async function deleteProduct(req, res) {
  try {
    console.log(req.params.sku);
    const sku = parseInt(req.params.sku);
    const payload = await jwtVerify(req.headers.authorization);
    if (payload.profile === 1) {
      const product = await ProductModel.scan({sku: sku}).exec();
      console.log(product);
      if (product.count > 0) {
        await ProductModel.delete(sku);
        res.status(200).send('Producto eliminado correctamente');
      } else {
        res.status(200).send('Producto no encontrado');
      }
    } else if (payload.profile === 2) {
      res.status(403).send('No autorizado')
    }
  } catch (e) {
    console.log(e);
    if (e.code) {
      res.status(e.code).send(e.message);
    } else {
      res.status(500).send('Ocurrio un error');
    }
  }
}

module.exports = {getAllProduct, createProduct, getProductBySku, updateProduct, deleteProduct};
