const apiCallFromRequest = require('./couponsexternalapi.js');

const http = require('http')

http.createServer((req, res) => {
        if(req.url === "/request"){
            apiCallFromRequest.callApi(function(response){
                //console.log(JSON.stringify(response));
                res.write(JSON.stringify(response));
                res.end();
            });
        }
        else if(req.url === "/node"){
            apiCallFromNode.callApi(function(response){
                res.write(response);
                res.end();
            });
        }
        
        // res.end();
}).listen(3000);

console.log("service running on 3000 port....");





// // var express = require('express');
// // var app = express();
// // var PORT = 8000;
// // var router = require('./couponsexternalapi');
// // app.use(express.urlencoded({extended: true})); 
// // app.use(express.json()); 
// // // const CouponsAPI = require('./couponsexternalapi')
// // // const asyncApiCall = async () => {
// // //     const response = await CouponsAPI.getCompatibility();
// // //     console.log(response.data);
// // // }
// // // asyncApiCall()

// // app.use(router);
  
// // app.listen(PORT, function(err){
// //     if (err) console.log("Error in server setup")
// //     console.log("Server listening on Port", PORT);
// // })

// const express = require("express");
// const https = require("http");
// const app = express();

// const url =
//   "http://feed.linkmydeals.com/getOffers/?API_KEY=a3ef8739a073d48cf2f8df3561f7a1dc&incremental=1&last_extract=1448536485";
// app.get("/", (req, res) => {
//   https.get(url, response => {
//     response.on("data", data => {
//       const weatherData = JSON.parse(data);
//       const temp = weatherData.main.temp;
//       const { description, icon } = weatherData.weather[0];
//       const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

//       //res.set("Content-Type", "text/html");
//       //OR
//       res.setHeader("Content-Type", "text/html");

//       res.send(`
//       <h3>The weather is currently ${description}</h3>
//       <img src="${imageURL}">
//       <h1>The temperature in London is <span>${temp}</span> ° Celsius.</h1>
//       `);
//     });
//   });
//   //res.send('server is up!!!');
// });

// app.listen(3000, () => {
//   console.log("Server started!!!");
// });