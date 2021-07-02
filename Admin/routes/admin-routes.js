var adminController = require('../controllers/insert-admin-controller');
var userController = require('../../User/controllers/insert-user-controller');
// var router = express.Router();
var adminModel = require('../models/admin-models');
var userModel = require('../../User/models/user-models');
const axios = require('axios');
const merchantservice = 'http://localhost:3001/merchantrights'
const userservice = 'http://localhost:3000/merchantrights'
const dealsandcouponsservice = 'http://localhost:3006/merchantrights'


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express')
const router = express.Router();

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

router.get('/users', function (req, res) {
    axios.get(userservice+'/users').then((response) => {
        res.send(response.data);
    });
});

router.get('/user/:id', function (req, res) {
    axios.get(userservice +'/user/'+req.params.id).then((response) => {
        res.send(response.data);
    });
});


/**
 * @openapi
 * /adminrights/admin/{id}:
 *      get:
 *          summary: Returns a particular admin stored in the admins collections of the Deals and Coupons Admins Database.
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
 *          summary: Create a new admin in the admins collections of the DealsandCouponsAdmins Database.
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
    axios.post(userservice +'/useradd', req.body).then((response) => {
        res.send(response.data);
    });
});


/**
 * @openapi
 * /adminrights/adminupdate/{id}:
 *      put:
 *          summary: Update an admin by its id in the admins collections of the DealsandCouponsAdmins Database.
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


router.put('/updateuser/:id', function (req, res) {
    axios.put(userservice+ '/updateuser/' +req.params.id, req.body).then((response) => {
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
 *                              Admin's Account deleted with _id: 123edfz
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

