require('dotenv').config();
var AWS = require("aws-sdk");
const stage = process.env.STAGE;
console.log(stage);
AWS.config.update({
  'accessKeyId':'dummy',
  'secretAccessKey':'dummy',
  'region': "us-east-1",
  'endpoint': stage === 'dev' ? new AWS.Endpoint('http://localhost:8000') : new AWS.Endpoint('http://dynamodb-api:8000')
});
var dynamodb = new AWS.DynamoDB();
var params = {
  TableName : "User",
  KeySchema: [
    { AttributeName: "username", KeyType: "HASH"},
  ],
  AttributeDefinitions: [
    { AttributeName: "username", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};
dynamodb.createTable(params, function(err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});

var paramsProduct = {
  TableName : "Product",
  KeySchema: [
    { AttributeName: "sku", KeyType: "HASH"},
  ],
  AttributeDefinitions: [
    { AttributeName: "sku", AttributeType: "N" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};
dynamodb.createTable(paramsProduct, function(err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});


var paramsTracking = {
  TableName : "Tracking",
  KeySchema: [
    { AttributeName: "username", KeyType: "HASH"},
    {AttributeName: "date", KeyType: "RANG"}
  ],
  AttributeDefinitions: [
    { AttributeName: "username", AttributeType: "S" },
    { AttributeName: "date", AttributeType: "N" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  }
};
dynamodb.createTable(paramsTracking, function(err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});
