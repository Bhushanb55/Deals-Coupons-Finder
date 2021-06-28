const express = require('express');
const app = express();
var merchantContoller = require('../controllers/insert-merchant-controller');
const merchantModel = require('../models/merchant-models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const router = express.Router();


/**
 * @openapi
 * tags: 
 *      name: Merchants
 *      description: The merchants managing API.
 */

/**
 * @openapi
 * components:
 *      schemas:
 *          Merchant:
 *              type: object
 *              required:
 *                  - merchant_name
 *                  - email_address
 *                  - password
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: The auto generated unique id of the Merchant Members.
 *                  merchant_name:
 *                      type: string
 *                      description: Name of the Merchant.
 *                  email_address:
 *                      type: string
 *                      description: The Email-ID of the Merchant.
 *                  password:
 *                      type: string
 *                      description: Password of the respective Merchant.
 *              example:
 *                  id: 60d58b56305871674ce58679
 *                  merchant_name: Amazon India
 *                  email_address: amazon@gmail.com
 *                  password: amazon@123
 */
    


/**
 * @openapi
 * /merchantrights/merchants:
 *      get:
 *          summary: Returns list of Merchants in the Database
 *          tags: [Merchants]  
 *          responses:
 *              200:
 *                  description: The list of the Merchants.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/merchants'
 */

router.get('/merchants', function (req, res) {
    merchantModel.find({}).then(function (merchants) {
        res.send(merchants);
      });
});

/**
 * @openapi
 * /merchantrights/merchant/{id}:
 *      get:
 *          summary: Returns a respective merchant stored in the merchants collections of Database.
 *          tags: [Merchants]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The merchant id.
 *          responses:
 *              200:
 *                  description: A particular Merchant.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example:
 *                                  id: 60d58b56305871674ce58679
 *                                  merchant_name: Amazon India
 *                                  email_address: amazon@gmail.com
 *                                  password: amazon@123                          
 */

router.get('/merchant/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome merchants!!");
    merchantModel.findById(req.params.id, (err,data) => {
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
 * /merchantrights/merchantsadd:
 *      post:
 *          summary: Create a new merchant in the merchants collections of the Database.
 *          tags: [Merchants] 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: object
 *                         example:                         
 *                             id: 60d58b56305871674ce58679
 *                             merchant_name: Amazon India
 *                             email_address: amazon@gmail.com
 *                             password: amazon@123  
 * 
 *          responses:
 *              '201':
 *                  description: OK.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: 
 *                                  success: true
 *                                  data: { "merchant_name": "Flipkart",  "email_address": "abc@flipkart.com", "password": "flipkart@123" }                              
 */

router.post('/merchantsadd', merchantContoller);


router.post('/api/posts', verifyToken, (req, res) => {  
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

  
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  
  }
router.post('/signup', function(req, res) {
    bcrypt.hash(req.body.password, 10, function(err, hash){
       if(err) {
          return res.status(500).json({
             error: err
          });
       }
       else {
          const merchant = new merchantModel({
             merchant_name: req.body.merchant_name,
             email_address: req.body.email_address,
             password: hash  
          });
          merchant.save().then(function(result) {
             console.log(result);
             res.status(200).json({
                success: 'New merchant created..'
             });
          }).catch(error => {
             res.status(500).json({
                error: err
             });
          });
       }
    });
 });


 router.post('/signin', function(req, res){

    merchantModel.findOne({email_address: req.body.email_address})
    .exec()
    .then(function(merchant) {
       bcrypt.compare(req.body.password, merchant.password, function(err, result){
          if(err) {
             return res.status(401).json({
                failed: 'Unauthorized Access'
             });
          }
          if(result) {
            const JWTToken = jwt.sign({
            email_address: merchant.email_address,
          },
          'secretkey',
           {
             expiresIn: '2h'
           });
           return res.status(200).json({
             success: 'Welcome to the JWT Auth to Merchants',
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
          failed: "This Email-ID does not exist."
       });
    });
 });

 /**
 * @openapi
 * /merchantrights/merchantupdate/{id}:
 *      put:
 *          summary: Update a merchant by its id in the merchants collections of the Database.
 *          tags: [Merchants] 
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The merchant id.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {"email_address": "amazon1@gmail.com", "password": "amazon@124"}
 *          responses:
 *              '200':
 *                  description: The Merchant updated with given details.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: 
 *                                  id: 60d58b56305871674ce58679
 *                                  merchant_name: Amazon India
 *                                  email_address: amazon1@gmail.com
 *                                  password: amazon@124
 *              '404':
 *                  description: The merchant was not found.
 *              '500':
 *                  description: There was some server error.
 */


router.put('/merchantsupdate/:id', function (req, res) {
   merchantModel.findByIdAndUpdate({_id: req.params.id}, req.body , {new: true}, function(err, result){
      if(err){
          return res.status(404).json({success: false, error: err});
      }
      else{
          res.status(200).json(result);
      }
  })
});

/**
 * @openapi
 * /merchantrights/deletemerchant/{id}:
 *      delete:
 *          summary: Delete the merchant by its id.
 *          tags: [Merchants] 
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The merchant id.
 *          responses:
 *              '200':
 *                  description: The merchant will be deleted.
 *                  content:
 *                      text/plain:
 *                          schema:
 *                              Merchant's Account deleted with _id: 60d58b56305871674ce58679
 *              '404':
 *                  description: The merchant was not found.
 * 
 */

router.delete('/merchantsdelete/:id', function (req, res) {
   merchantModel.deleteMany({_id: req.params.id}, function (err, _) {
      if (err) {
          return res.status(404).json({success: false, error: err});
      }
      else{
          res.status(200).send(`Merchant's account deleted with id: ${req.params.id}`);
      }
  });
});  


module.exports = router;