const express = require('express');
const app = express();
const merchantRightsRouter = require('./routes/merchant-routes');
const bodyParser = require("body-parser");


const swaggerJsDoc = require("swagger-jsdoc");                      //body-parser = It is a middleware used for parsing the incoming body before hadndle.
const swaggerUi = require("swagger-ui-express");


// Extended: https://swagger.io/specification/#infoObject
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            version: "1.0.0",
            title: "Deals and Coupons Finder Application - Merchants Microservice",
            description: "This is our first Swagger Application built in Node js.",
            contact: {
                name: "Bhushan Bire"
            }
        },
        servers: [
                {
                    url: "http://localhost:3002"
                }
        ]
    },

    apis: ["./routes/*.js"]
};


const swaggerDocs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());   //it parses text to json and without this data is not added to db
//initialize routes

app.use('/merchantrights', merchantRightsRouter);
const PORT = 3002; 

//error handling middleware
app.use(function(err, req, res, next){
    console.log(err);           // to see properties of message in our console
    res.status(422).send({error: err.message});
});


app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

module.exports = {
 app: app,
 merchantRightsRouter: merchantRightsRouter
}