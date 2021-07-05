var adminController = require('../controllers/insert-admin-controller');
var userController = require('../../User/controllers/insert-user-controller');
// var router = express.Router();
var adminModel = require('../models/admin-models');
var userModel = require('../../User/models/user-models');
const axios = require('axios');
const merchantservice = 'http://localhost:3002/merchantrights'
const usersservice = 'http://localhost:3003/userrights'
const dealsandcouponsservice = 'http://localhost:3001/dealsandcouponsright'


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express')
const router = express.Router();
const verify = require('../middleware/verify');
const maxAge = 3 * 24 * 60 * 60;

/*
 @openapi
 * tags: 
 *      name: Admins
 *      description: The Admins managing API.
 */


/**
 * @openapi
 * components:
 *      schemas:
 *          admins:
 *              type: object
 *              required:
 *                  - name
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The auto generated unique id of the Admin Members.
 *                  full_name:
 *                      type: string
 *                      description: Name of the Admins.
 *                  email_address:
 *                      type: string
 *                      description: Name of the product of the respective Admin
 *                  password:
 *                      type: string
 *                      description: Respecitive passwords of the Admins.
 *                  mobile_number:
 *                      type: string
 *                      description: Respecitive phone numbers of the Admins.
 *              example:
 *                  id: 60d2066364e31665b86d6065
 *                  full_name: Bhushan Bire
 *                  email_address: bhushan@gmail.com
 *                  password: bhushan@123
 *                  mobile_number: 7020078196
 *
 *                  
 */



/**
 * @openapi
 * /adminrights/admins:
 *      get:
 *          summary: Returns list of Admins in the database.
 *          responses:
 *              200:
 *                  description: The list of the Admins
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/admins'
 */



 router.get('/admins', function (req, res) {
        adminModel.find({}).then(function (admins) {
        res.send(admins);
    });
});


router.post('/api/posts', verify, (req, res) => { 
    //   console.log("Hello");
    // verifyToken;
    //   // Verify Token
    // function verifyToken(req, res, next) {
    //     // Get auth header value
    //     const bearerHeader = req.headers['authorization'];
    //     // Check if bearer is undefined
    //     if(typeof bearerHeader !== 'undefined') {
    //       // Split at the space
    //       const bearer = bearerHeader.split(' ');
    //       // Get token from array
    //       const bearerToken = bearer[1];
    //       // Set the token
    //       req.token = bearerToken;
    //       // Next middleware
    //       next();
    //     } else {
    //       // Forbidden
    //       res.send("Killed");
    //     }
    //   }
      jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
          res.json({
            message: 'Post created...',
            authData
          });
        }
      });
    });
    
    
    
     
       
    // //   // Verify Token
    // function verifyToken(req, res, next) {
    //   console.log("Hello");
    //     // Get auth header value
    //     const bearerHeader = req.headers['authorization'];
    //     // Check if bearer is undefined
    //     if(typeof bearerHeader !== 'undefined') {
    //       // Split at the space
    //       const bearer = bearerHeader.split(' ');
    //       // Get token from array
    //       const bearerToken = bearer[1];
    //       // Set the token
    //       req.token = bearerToken;
    //       // Next middleware
    //       next();
    //     } else {
    //       // Forbidden
    //       res.sendStatus(403);
    //     }
    //   }
    router.post('/adminsignup', function(req, res) {
       //  bcrypt.hash(req.body.password, 10, function(err, hash){
       //     if(err) {
       //        return res.status(500).json({
       //           error: err
       //        });
       //     }
       //     else {
            //   var mailer = require('../../Mail/server');
            //   mailer(req.body.email_address);
              const admin = new adminModel({
                 full_name: req.body.full_name,
                 email_address: req.body.email_address,
                 password: req.body.password,
                 mobile_number: req.body.mobile_number      
              });
             console.log(admin)
              admin.save(function(err, created){
                if(err){
                    return res.status(500).json({success: false, error: err});
                }
                else{
                    res.status(201).json({success:"Registration Successful..Please login to continue..", data: created})
                }
            });
     });
    
    
     router.post('/adminsignin', function(req, res){
    
        adminModel.findOne({email_address: req.body.email_address})
        .exec()
        .then(function(user) {
           bcrypt.compare(req.body.password, user.password, function(err, result){
              if(err) {
                 return res.status(401).json({
                    failed: 'Unauthorized Access'
                 });
              }
              if(result) {
                const JWTToken = jwt.sign({
                email_address: user.email_address,
              },
              'secretkey',
               {
                 expiresIn: maxAge
               });
              //  app.use(function(req, res, next) {
                // res.setheader('Access-Control-Allow-Credentials', true);
                // res.setheader('Access-Control-Allow-Origin', req.headers.origin);
                // res.setheader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
                // res.setheader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
                // next();
              // });
               res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000/signin');
               res.setHeader('Access-Control-Allow-Credentials',true);
               res.cookie('jwt', JWTToken, {httpOnly: true, maxAge: maxAge * 1000})
               return res.status(200).json({
                 success: 'Admin login successful..',
                 token: JWTToken
               });
              }
              return res.status(401).json({
              failed: 'The Password is incorrect.'
             });
           });
        })
        .catch(error => {
           res.status(500).json({
              failed: "This Email does not exist."
           });
        });
     });
    
    
router.get('/adminlogout', function(req, res) {
      // res.cookie('jwt', '', { maxAge: 1 }).send("Logged out successfully..")
      res.send("Logged out successfully..")
});
router.get('/adminusers', verify, function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome Users!!");
    // userModel.find({}).then(function (users) {
    //     res.send(users);
    //     });
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            console.log(req.token);
          res.sendStatus(403);
        } else {
            axios.get(usersservice+'/users').then((response) => {
                res.send(response.data);
            });
        }
      });
   
});

router.get('/user/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome Users!!");
    // userModel.find({}).then(function (users) {
    //     res.send(users);
    //     });
    axios.get(usersservice+'/user/'+req.params.id).then((response) => {
        res.send(response.data);
    });
});




/**
 * @openapi
 * /adminrights/admin/{id}:
 *      get:
 *          summary: Returns a respective admin stored in the admins collections of the Deals and Coupons Admins Database.
 *          tags: [Admins]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The admin id.
 *          responses:
 *              200:
 *                  description: A particular admin.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example:
 *                                  _id: 60d32df849ba05210cf89292
 *                                  full_name: Bhushan Bire
 *                                  email_address: bhushan@gmail.com
 *                                  password: bhushan@123
 *                                  mobile_number: 7020078196
 * 
 * 
 *              404:
 *                  description: The admin cannot be found.
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example:
 *                                  success: false
 *                                  error: {}
 */


 router.get('/admin/:id', function (req, res) {
    adminModel.findById(req.params.id, (err,data) => {
        if(err){
            res.status(404).json({success: false, error: err});
        }
        else{
            res.status(200).json(data);
        }
    });   
});


/**
 * @openapi
 * /adminrights/adminadd:
 *      post:
 *          summary: Create a new admin in the admins collections of the Deals and Coupons Admins Database.
 *          tags: [Admins] 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: object
 *                         example:
 *                              {"full_name": "Bhushan Bire",  "email_address": "bhushan@gmail.com", "password": "bhushan@123", "mobile_number": 7020078196}
 *          responses:
 *              '201':
 *                  description: OK.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: 
 *                                  success: true
 *                                  data: { "_id": "60d32df849ba05210cf89292",  "full_name": "Bhushan Bire",  "email_address": "bhushan@gmail.com", "password": "bhushan@123", "mobile_number": 7020078196, "__v": 0 }
 *              '500':
 *                  description: There was some server error.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: 
 *                                  success: false
 *                                  error: {}                              
 */
 router.post('/adminadd', adminController);

 
router.post('/useradd', function (req, res) {
    axios.post(usersservice +'/useradd', req.body).then((response) => {
        res.send(response.data);
    });
});


/**
 * @openapi
 * /adminrights/adminupdate/{id}:
 *      put:
 *          summary: Update an admin by its id in the admins collections of the Deals and Coupons Admins Database.
 *          tags: [Admins] 
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The admin id.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {"email_address": "abhinam@gmail.com", "password": "abhinam@gmail.com"}
 *          responses:
 *              '200':
 *                  description: OK.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: 
 *                                  id: 60d32df849ba05210cf89292
 *                                  full_name: Bhushan Bire
 *                                  email_address: bhushan@gmail.com
 *                                  mobile_number: 7020078196
 *
 * 
 *              '404':
 *                  description: The admin was not found.
 */


 router.put('/adminupdate/:id', function (req, res) {
    var doc = req.body
    if(req.body.password){
       bcrypt.hash(req.body.password, 10, function(err, hash){
          if(err) {
             return res.status(500).json({
                error: err
             });
          }
          else{
             doc.password = hash;
             adminModel.findByIdAndUpdate({_id: req.params.id}, doc , {new: true}, function(err, result){
 
                if(err){
                    return res.status(404).json({success: false, error: err});
                }
                else{
                    res.status(200).json(result);
                }
 
          })
       }
   })
 }
 else{
    adminModel.findByIdAndUpdate({_id: req.params.id}, req.body , {new: true}, function(err, result){
 
       if(err){
           return res.status(404).json({success: false, error: err});
       }
       else{
           res.status(200).json(result);
       }
   })
  }
});


router.put('/userupdate/:id', function (req, res) {
    axios.put(usersservice+ '/userupdate/' +req.params.id, req.body).then((response) => {
        res.send(response.data);
    });
});


router.delete('/user/:id', function (req, res) {
    axios.delete(userservice+'/userdelete/'+req.params.id).then((response) => {
        res.send(response.data);
    });
});  


/**
 * @openapi
 * /adminrights/admindelete/{id}:
 *      delete:
 *          summary: Remove the admin by its id.
 *          tags: [Admins] 
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The admin id.
 *          responses:
 *              '200':
 *                  description: The admin was deleted.
 *                  content:
 *                      text/plain:
 *                          schema:
 *                              Admin's Account deleted with _id: 
 *              '404':
 *                  description: The admin was not found.
 */



 router.delete('/admindelete/:id', function (req, res) {
    adminModel.findByIdAndDelete(req.params.id, function (err) {
        if(err){
            res.status(404).json({success: false, error: err});
        }
        else{
            res.status(200).send(`Admin's account deleted with _id: ${req.params.id}`);
        }
      });
});  




router.get('/merchants', function (req, res) {
    axios.get(merchantservice+'/merchants').then((response) => {
        res.send(response.data);
    });
});


router.post('/merchantadd', function (req, res) {
    axios.post(merchantservice+'/merchantadd', req.body).then((response) => {
        res.send(response.data);
    
    });
});


router.get('/dealsandcoupons', function (req, res) {
    axios.get(dealsandcouponsservice +'/dealsandcoupons').then((response) => {
        res.send(response.data);
    });
});


router.get('/deal', function (req, res) {
    axios.get(dealsandcouponsservice +'/deal').then((response) => {
        res.send(response.data);
    });
});


router.get('/code', function (req, res) {
    axios.get(dealsandcouponsservice +'/code').then((response) => {
        res.send(response.data);
    });
});

module.exports = router;

