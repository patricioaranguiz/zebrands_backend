'use strict';
const dynamoose = require('dynamoose');
const Schema = dynamoose.Schema;
let userSchema = new Schema({
  username: {
    type: String,
    hashKey: true
  }, password: {
    type: String
  }, firstname: {
    type: String
  }, lastname: {
    type: String
  }, email: {
    type: String
  }, profile: {
    type: Number
  }
});
let UserModel = dynamoose.model('User', userSchema, {
  create: true, // Create table in DB, if it does not exist,
  update: true, // Update remote indexes if they do not match local index structure
  waitForActive: true, // Wait for table to be created before trying to use it
  waitForActiveTimeout: 180000, // wait 3 minutes for table to activate
});
module.exports = UserModel;
