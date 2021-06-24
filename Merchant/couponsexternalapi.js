const request = require('request');
 
_EXTERNAL_URL = 'http://feed.linkmydeals.com/getOffers/?API_KEY=a3ef8739a073d48cf2f8df3561f7a1dc&format=json&incremental=0&last_extract=1624347910&off_record=1';

const callExternalApiUsingRequest = (callback) => {
    request(_EXTERNAL_URL, { json: true }, (err, res, body) => {
    if (err) { 
        return callback(err);
     }
    return callback(body);
    });
}

//external API call using request or node
module.exports.callApi = callExternalApiUsingRequest;






























// //const got = require('got');
// //var express = require('express');
// //var app = express();
// //var router = express.Router();
// //app.use(express.urlencoded({extended: true})); 
// //app.use(express.json()); 


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

// // app.listen(3000, () => {
// //   console.log("Server started!!!");
// // });


// // const options = {
// //   method: 'GET',
// //   url: 'https://27coupons.p.rapidapi.com/coupons/trending/',
// //   qs: {key: 'nye30a14KDwLNHEp5UJlHHhW28nlr59n'},
// //   headers: {
// //     'x-rapidapi-key': '62dcdacfedmsh1eebd99a7fb3fedp1d1660jsn76ce0845ec4c',
// //     'x-rapidapi-host': '27coupons.p.rapidapi.com',
// //     useQueryString: true
// //   }
// // };

// // request(options, function (error, response, body) {
// // 	if (error) throw new Error(error);

// // 	console.log(body);
// // });








// // const options = {
// //   method: 'GET',
// //   url: 'https://27coupons.p.rapidapi.com/coupons/popular/',
// //   qs: {key: 'nye30a14KDwLNHEp5UJlHHhW28nlr59n'},
// //   headers: {
// //     'x-rapidapi-key': 'SIGN-UP-FOR-KEY',
// //     'x-rapidapi-host': '27coupons.p.rapidapi.com',
// //     useQueryString: true
// //   }
// // };

// // request(options, function (error, response, body) {
// // 	if (error) throw new Error(error);

// // 	console.log(body);
// // });






// // router.get('/posts', function(req, res, next) {
// //   request({
// //     uri: 'https://linkmydeals.p.rapidapi.com/getOffers/',
// //     qs: {
// //       api_key: 'fa474d1c382104d3e99ab0e35e06773e'
// //     }
// //   }).pipe(res);
// // });

// //module.exports = router;