const express = require('express');
const router = express.Router();
const ProductController = require('../controller/products.controller');
const {tokenVerify} = require('../utils/jwtUtils');

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJ6ZWJyYW5kcyIsInBhc3N3b3JkIjoiemVicmFuZHMiLCJlbWFpbCI6InplYnJhbmRzQHplYnJhbmRzLmNvbSIsInVzZXJuYW1lIjoiemVicmFuZHMiLCJsYXN0bmFtZSI6InplYnJhbmRzIiwicHJvZmlsZSI6MSwiaWF0IjoxNjE3NzgwMjE0LCJleHAiOjE2MTc3ODM4MTR9.so4ZtY0ul8CDayolHmqxJaVJ8-twsJUlPhPuJO97FZw

/**
 * @swagger
 * /products:
 *   get:
 *     security:
 *        - bearerAuth: []
 *     description: Lista todos los productos.
 *     tags:
 *      - Products
 *     responses:
 *       200:
 *         description: Exitosamente
 *         schema:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *            data:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  sku:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  price:
 *                    type: integer
 *                  brand:
 *                     type: string
 *       403:
 *         description: No autorizado
 *         schema:
 *          type: string
 *       500:
 *        description: Error Interno del Servidor
 *        schema:
 *          type: string
 */
router.get('/', tokenVerify, ProductController.getAllProduct);

/**
 * @swagger
 * /products:
 *   post:
 *     description: Crear un nuevo producto
 *     tags:
 *      - Products
 *     security:
 *      - bearerAuth: []
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: product
 *        description:
 *        schema:
 *          type: object
 *          required:
 *            - userName
 *          properties:
 *            sku:
 *              type: integer
 *            name:
 *              type: string
 *            price:
 *              type: integer
 *            brand:
 *              type: string
 *     responses:
 *       200:
 *         description: Exitosamente
 *         schema:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *            data:
 *              type: object
 *              properties:
 *                sku:
 *                  type: integer
 *                name:
 *                  type: string
 *                price:
 *                  type: integer
 *                brand:
 *                  type: string
 *       403:
 *         description: No autorizado
 *         schema:
 *          type: string
 *       500:
 *        description: Error Interno del Servidor
 *        schema:
 *          type: string
 *
 *
 */
router.post('/', tokenVerify, ProductController.createProduct);

/**
 * @swagger
 * /products/{sku}:
 *   put:
 *     description: Actualiza un producto por su SKU
 *     tags:
 *      - Products
 *     security:
 *      - bearerAuth: []
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: path
 *        name: sku
 *        description: Sku del producto a editar
 *        type: number
 *        required: true
 *      - in: body
 *        name: body
 *        description: Información a editar
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *            - userName
 *          properties:
 *            name:
 *              type: string
 *            price:
 *              type: integer
 *            brand:
 *              type: string
 *     responses:
 *       200:
 *         description: Success
 *       403:
 *        description: No autorizado
 *        schema:
 *          type: string
 *       500:
 *        description: Error Interno del Servidor
 *        schema:
 *          type: string
 *
 *
 */
router.put('/:sku', tokenVerify, ProductController.updateProduct);

/**
 * @swagger
 * /products/{sku}:
 *   get:
 *     description: Obtiene un producto por el SKU
 *     tags:
 *      - Products
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - name: sku
 *        in: path
 *        type: integer
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *            data:
 *              type: object
 *              properties:
 *                sku:
 *                  type: integer
 *                name:
 *                  type: string
 *                price:
 *                  type: integer
 *                brand:
 *                  type: string
 *       403:
 *         description: No autorizado
 *         schema:
 *           type: string
 *       500:
 *         description: Error Interno del Servidor
 *         schema:
 *           type: string
 *
 */
router.get('/:sku', tokenVerify, ProductController.getProductBySku);

/**
 * @swagger
 *  /products/{sku}:
 *    delete:
 *      description: Elimina un producto.
 *      tags:
 *        - Products
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: sku
 *          in: path
 *          description:
 *          type: number
 *          required: true
 *      responses:
 *        200:
 *          description: Exitosamente
 *          schema:
 *            type: string
 *        403:
 *          description: No autorizado
 *          schema:
 *            type: string
 *        500:
 *          description: Error Interno del Servidor
 *          schema:
 *            type: string
 */
router.delete('/:sku', tokenVerify, ProductController.deleteProduct);

module.exports = router;
