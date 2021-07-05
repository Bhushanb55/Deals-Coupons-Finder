'use strict';
const router = require('./routes/admin-routes');
const serverless = require('serverless-http');
module.exports.hello = serverless(router);
