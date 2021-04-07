const express = require('express');
const router = express.Router();
const UserController = require('../controller/users.controller');

const {tokenVerify} = require('../utils/jwtUtils');

/**
 * @swagger
 * /users/login:
 *    post:
 *      description: Autenticación de usuario
 *      tags:
 *        - Users
 *      parameters:
 *        - in: body
 *          name: body
 *          description: Json con información de usuario a Logear
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                 type: string
 *      responses:
 *        200:
 *          description: Exitosamente
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *        401:
 *          description: Problemas de credenciales
 *          schema:
 *            type: string
 */
router.post('/login', UserController.login);

/**
 * @swagger
 * /users:
 *   post:
 *     security:
 *        - bearerAuth: []
 *     description: Creación de nuevo usuario
 *     tags:
 *      - Users
 *     parameters:
 *      - in: body
 *        name: user
 *        description: Usuario a crear.
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            firstname:
 *              type: string
 *            lastname:
 *              type: string
 *            email:
 *              type: string
 *            profile:
 *              type: number
 *            password:
 *              type: string
 *     responses:
 *       200:
 *         description: Exitosamente
 *         schema:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *       409:
 *        description: Usuario existente
 *        schema:
 *          type: string
 *       403:
 *        description: No autorizado
 *        schema:
 *          type: string
 *       500:
 *        description: Error Interno del Servidor
 *        schema:
 *          type: string
 *
 */
router.post('/', tokenVerify, UserController.createUser);

/**
 * @swagger
 * /users:
 *  get:
 *    description: Obtiene todos los usuarios
 *    tags:
 *      - Users
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Exitosamente
 *        schema:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *            data:
 *             type: array
 *             items:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                firstname:
 *                  type: string
 *                lastname:
 *                  type: string
 *                profile:
 *                  type: number
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      403:
 *        description: No autorizado
 *        schema:
 *          type: string
 *      500:
 *        description: Error Interno del Servidor
 *        schema:
 *          type: string
 */
router.get('/', tokenVerify, UserController.getAllUsers);

/**
 * @swagger
 * /users/{username}:
 *  get:
 *    description: Obtiene un usuario por su username
 *    tags:
 *      - Users
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: username
 *        in: path
 *        description: Username
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: success
 *        schema:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *            data:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *      403:
 *        description: No autorizado
 *        schema:
 *          type: string
 *      500:
 *        description: Error Interno del Servidor
 *        schema:
 *          type: string
 */
router.get('/:username', tokenVerify, UserController.getUserByUsername)

/**
 * @swagger
 * /users/{username}:
 *  put:
 *    description: Actualiza un usuario por su Username
 *    tags:
 *      - Users
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: username
 *        required: true
 *        schema:
 *          type: string
 *      - in: body
 *        name: body
 *        description: Información de usuario que se actualizará
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            firstname:
 *              type: string
 *            lastname:
 *              type: string
 *            email:
 *              type: string
 *            profile:
 *              type: number
 *            password:
 *              type: string
 *    responses:
 *      200:
 *        description: success
 *        schema:
 *          type: string
 *      403:
 *        description: No autorizado
 *        schema:
 *          type: string
 *      500:
 *        description: Error Interno del Servidor
 *        schema:
 *          type: string
 */
router.put('/:username', tokenVerify, UserController.updateUser);

/**
 * @swagger
 * /users/{username}:
 *  delete:
 *    description: Elimina un usuario.
 *    tags:
 *      - Users
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: username
 *        in: path
 *        description:
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Exitosamente
 *        schema:
 *          type: string
 *      403:
 *        description: No autorizado
 *        schema:
 *          type: string
 *      500:
 *        description: Error Interno del Servidor
 *        schema:
 *          type: string
 *
 *
 */
router.delete('/:username', tokenVerify, UserController.deleteUser);


module.exports = router;
