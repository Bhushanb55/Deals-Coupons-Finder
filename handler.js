'use strict';
const app = require('./APIGateway');
const serverless = require('serverless-http');
module.exports.hello = serverless(APIGateway);
message = {
  'message': 'Execution started successfully!'
}

exports.handler = (event, context, callback) => {
  callback(null, { statusCode: 200, body: 'Hello from Lambda' });
};