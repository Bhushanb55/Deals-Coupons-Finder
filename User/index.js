const express = require('express');
const app = express();
const usersRightsRouter = require('./routes/users-routes');

var bodyParser = require('body-parser');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        version: "1.0.0",
        title: "Deals and Coupons Finder App - Users Microservice",
        description: "This application is built using Node.js.",
        contact: {
          name: "Bhushan Bire"
        }
    },
        servers: [
            {
                url: "http://localhost:3000"
            }
            ]
    },

    // ['.routes/*.js']
    apis: ["./routes/*.js"]
  };
  


  
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
const PORT = 3000;

app.get('/checking', function(req, res){
  res.json({
     "Tutorial": "Welcome to the Node express JWT Tutorial"
  });
});

app.use('/userrights',usersRightsRouter);

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});


module.exports = {
  app: app,
  usersRightsRouter: usersRightsRouter
}

