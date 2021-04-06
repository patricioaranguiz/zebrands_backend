'use strict';
const dynamoose = require('dynamoose');
const Schema = dynamoose.Schema;
let productoSchema = new Schema({
  sku: {
    type: String,
    hashKey: true
  }, nombre: {
    type: String
  }, precio: {
    type: Number
  }, marca: {
    type: String
  }
});
let ProductoModel = dynamoose.model('producto', productoSchema, {
  create: true, // Create table in DB, if it does not exist,
  update: true, // Update remote indexes if they do not match local index structure
  waitForActive: true, // Wait for table to be created before trying to use it
  waitForActiveTimeout: 180000, // wait 3 minutes for table to activate
});
module.exports = ProductoModel;