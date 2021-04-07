require('dotenv').config();
var AWS = require("aws-sdk");
const stage = process.env.STAGE;
AWS.config.update({
  'accessKeyId':'dummy',
  'secretAccessKey':'dummy',
  'region': "us-east-1",
  'endpoint': stage === 'dev' ? new AWS.Endpoint('http://localhost:8000') : new AWS.Endpoint('http://dynamodb-api:8000')
});
var dynamodb = new AWS.DynamoDB.DocumentClient();
var paramsInserUser = {
  TableName: 'User',
  Item: {
    username: 'zebrands',
    firstname: 'zebrands',
    lastname: 'zebrands',
    email: 'zebrands@zebrands.com',
    password: 'zebrands',
    profile: 1
  }
}

dynamodb.put(paramsInserUser, function (err, data){
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
})



