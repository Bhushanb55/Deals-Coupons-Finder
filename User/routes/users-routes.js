const express = require('express');
var userContoller = require('../controllers/insert-user-controller');
const app = express();
const router = express.Router();

//for JWT Authentication
const userModel = require('../models/user-models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


/**
 * @openapi
 * tags: 
 *      name: Users
 *      description: The users managing API's.
 */

/**
 * @openapi
 * components:
 *      schemas:
 *          User:
 *              type: object
 *              required:
 *                  - full_name
 *                  - email_address
 *                  - password
 *                  - mobile_number
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: The auto_generated id of the user.
 *                  full_name:
 *                      type: string
 *                      description: Name of the user.
 *                  email_address:
 *                      type: string
 *                      description: The Email-ID of the user.
 *                  password:
 *                      type: string
 *                      description: Password of the respective user.
 *                  mobile_number:
 *                      type: number
 *                      description: The 10 digit mobile number of the user.
 *              example:
 *                  id: d5fE_asz
 *                  full_name: Bhushan Bire
 *                  email_address: bhushan@gmail.com
 *                  password: bhushan@123
 *                  mobile_number: 7020078196
 */
    


/**
 * @openapi
 * /userrights/users:
 *      get:
 *          summary: Returns all the users stored in the users collections of the Database.
 *          tags: [Users]  
 *          responses:
 *              200:
 *                  description: The list of the users.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/User'
 */

router.get('/users', function (req, res) {
    userModel.find({}).then(function (users) {
        res.send(users);
        });
});


/**
 * @openapi
 * /userrights/user/{id}:
 *      get:
 *          summary: Returns a particular user stored in the users collections of the Database.
 *          tags: [Users]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The user id.
 *          responses:
 *              200:
 *                  description: A particular user.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example:
 *                                  _id: d5fE_asz
 *                                  full_name: Bhushan Bire
 *                                  email_address: bhushan@gmail.com
 *                                  password: bhushan@123
 *                                  mobile_number: 7020078196
 */

router.get('/user/:id', function (req, res) {
    userModel.findById(req.params.id, (err,data) => {
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
 * /userrights/usersadd:
 *      post:
 *          summary: Create a new user in the users collections of the DealsandCouponsUsers Database.
 *          tags: [Users] 
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
 *                                  data: { "_id": "60d0daa888183a30b47a0a1b",  "full_name": "Bhushan Bire",  "email_address": "bhushan@gmail.com", "password": "bhushan@123", "mobile_number": 7020078196, "__v": 0 }                              
 */

router.post('/usersadd', userContoller);

const authenticateJWT = (req, res, next) => {
   const authHeader = req.headers.authorization;
 
   if (authHeader) {
       const token = authHeader.split(' ')[1];
 
       jwt.verify(token, 'secretkey', (err, authData) => {
           if (err) {
               return res.sendStatus(403);
           }
 
           res.json({
                   message: 'Post created...',
                   authData
                 });
                 next();
       });
   } else {
       res.sendStatus(401);
   }
 };


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

  // Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }
router.post('/signup', function(req, res) {
   var mailer = require('../../mail/server');
   mailer(req.body.email_address);
   const user = new userModel({
      full_name: req.body.full_name,
      email_address: req.body.email_address,
      password: req.body.password,
      mobile_number: req.body.mobile_number      
   });
   user.save(function(err, created){
     if(err){
         return res.status(500).json({success: false, error: err});
     }
     else{
         res.status(201).json({success:"New user has been created.", data: created})
     }
 });
});


 router.post('/signin', function(req, res){

    userModel.findOne({email_address: req.body.email_address})
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
             expiresIn: '2h'
           });
           return res.status(200).json({
             success: 'Welcome to the JWT Auth',
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
 * /userrights/userupadte/{id}:
 *      put:
 *          summary: Update a user by its id in the users collections of the DealsandCouponsUsers Database.
 *          tags: [Users] 
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The user id.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {"email_address": "abx@gmail.com", "password": "abc123$%"}
 *          responses:
 *              '200':
 *                  description: OK.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: 
 *                                  id: d5fE_asz
 *                                  full_name: Amit Mahadik
 *                                  email_address: abx@gmail.com
 *                                  password: abc123$%
 *                                  mobile_number: 7890656783
 *              '404':
 *                  description: The user was not found.
 *              '500':
 *                  description: There was some server error.
 */


router.put('/usersupdate/:id', function (req, res) {
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
            userModel.findByIdAndUpdate({_id: req.params.id}, doc , {new: true}, function(err, result){

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
   userModel.findByIdAndUpdate({_id: req.params.id}, req.body , {new: true}, function(err, result){

      if(err){
          return res.status(404).json({success: false, error: err});
      }
      else{
          res.status(200).json(result);
      }
   })
  }
});

/**
 * @openapi
 * /userrights/userdelete/{id}:
 *      delete:
 *          summary: Remove the user by its id.
 *          tags: [Users] 
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The user id.
 *          responses:
 *              '200':
 *                  description: The user was deleted.
 *                  content:
 *                      text/plain:
 *                          schema:
 *                              User's Account deleted with _id: 123edfz
 *              '404':
 *                  description: The user was not found.
 */


router.delete('/userdelete/:id', function (req, res) {
   userModel.deleteMany({_id: req.params.id}, function (err, _) {
      if (err) {
          return res.status(404).json({success: false, error: err});
      }
      else{
          res.status(200).send(`User's account deleted with _id: ${req.params.id}`);
      }
  });
});  


module.exports = router;