const jwt = require('jsonwebtoken')
const {jwtSign, jwtVerify} = require('../utils/jwtUtils')
const UserModel = require('../models/userModel')

async function login(req, res) {
  if (req.body.username && req.body.password) {
    const response = await UserModel.scan(req.body).exec();
    if (response.count > 0) {
      const token = await jwtSign(response[0].toJSON())
      res.status(200).json({token});
    } else {
      res.status(401).send('Usuario y/o password incorrecto')
    }
  } else {
    res.status(401).send('Debe ingresar un usuario y password')
  }

}

async function createUser(req, res) {
  try {
    const payload = await jwtVerify(req.headers.authorization);
    if (payload.profile === 1) {
      const response = await UserModel.scan({username: req.body.username}).exec();
      if (response[0]) {
        res.status(409).json({message: 'Usuario ya existe'});
      } else {
        await UserModel.create(req.body);
        res.status(200).json({message: 'Usuario creado con exito.'})
      }
    } else if (payload.profile === 2) {
      res.status(403).send('No autorizado')
    }
  } catch (e) {
    if (e.code) {
      return res.status(e.code).send(e.message)
    } else {
      return res.status(500).send('Ocurrio un error')
    }
  }
}

async function getAllUsers(req, res) {
  try {
    const payload = await jwtVerify(req.headers.authorization);
    if (payload.profile === 1) {
      const response = await UserModel.scan().exec();
      if (response.count > 0) {
        res.status(200).json({message: 'Success', data: response});
      } else {
        res.status(200).json({
          message: 'No se encontraron usuarios',
          data: []
        })
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

async function getUserByUsername(req, res) {
  try {
    const payload = await jwtVerify(req.headers.authorization);
    if (payload.profile === 1) {
      const response = await UserModel.scan({username: req.params.username}).exec();
      if (response.count > 0) {
        res.status(200).json({message: 'Usuario recuperado con exito', data: response[0].toJSON()});
      } else {
        res.status(200).json({message: 'Usuario no encontrado', data: {}});
      }
    } else if (payload.profile === 2) {
      res.status(403).send('No autorizado')
    }
  } catch (e) {
    if (e.code) {
      res.status(e.code).send(e.message)
    } else {
      res.status(500).send('Ocurrio un error')
    }
  }
}

async function updateUser(req, res) {
  try {
    const payload = await jwtVerify(req.headers.authorization);
    if (payload.profile === 1) {
      const user = await UserModel.scan({username: req.params.username}).exec();
      if (user.count > 0){
        const updateUser = await UserModel.update(
          {username: req.params.username},
          {firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          profile: req.body.profile,
          password: req.body.password});
        res.status(200).json({message: 'Usuario actualizado correctamente', data: updateUser});
      } else {
        res.status(200).json({message: 'Usuario no encontrado', data: {}});
      }
    } else if(payload.profile === 2) {
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

async function deleteUser(req, res) {
  try {
    const payload = await jwtVerify(req.headers.authorization);
    if (payload.profile === 1) {
      const user = await UserModel.scan({username: req.params.username}).exec();
      if (user.count > 0){
        await UserModel.delete(req.params.username)
        res.status(200).send('Usuario eliminado correctamente');
      } else {
        res.status(200).send('Usuario no encontrado');
      }
    } else if(payload.profile === 2) {
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

module.exports = {login, createUser, getAllUsers, getUserByUsername, updateUser, deleteUser}
