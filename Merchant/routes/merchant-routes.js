const express = require('express');
const app = express();
var merchantContoller = require('../controllers/insert-merchant-controller');
const merchantModel = require('../models/merchant-models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const router = express.Router();


router.get('/merchants', function (req, res) {
    // console.log(req.get('Content-Type')); 
    // res.send("Hello World!! Welcome merchants!!");
    merchantModel.find({}).then(function (merchants) {
        res.send(merchants);
        });
});


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

router.post('/merchants', merchantContoller);


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
             name: req.body.name,
             email_address: req.body.email_address,
             password: hash  
          });
          merchant.save().then(function(result) {
             console.log(result);
             res.status(200).json({
                success: 'New merchant has been created..'
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
router.put('/merchants', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome to update a merchant!!");
});
router.delete('/merchants', function (req, res) {
    // console.log(req.get('Content-Type')); 
    res.send("Hello World!! Welcome to delete a merchant!!");
});  



module.exports = router;