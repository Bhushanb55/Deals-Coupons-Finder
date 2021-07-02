const express = require('express');
var dealsAndCouponsController = require('../controllers/insert-dealsAndcoupons-controller');
const router = express.Router();
const dealsAndcouponsModel = require('../models/dealsAndcoupons-models');



/**
 * @openapi
 * tags: 
 *      name: deals and coupons Microservice
 *      description: The deals and coupons managing API's.
 */

/**
 * @openapi
 * components:
 *      schemas:
 *          DealsAndCoupons:
 *              type: object
 *              required:
 *                  - lmd_id
 *                  - store
 *                  - offer_text
 *                  - offer_value
 *                  - title
 *                  - description
 *                  - code
 *                  - terms_and_conditions
 *                  - categories
 *                  - category_array
 *                  - featured
 *                  - url
 *                  - smartLink
 *                  - image_url
 *                  - type
 *                  - offer
 *                  - status
 *                  - start_date
 *                  - end_date
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The auto generated ObjectId of the Deals & Coupons Schema.
 *                  lmd_id:
 *                      type: string
 *                      description: The id of the deals and coupons.
 *                  store:
 *                      type: string
 *                      description: The name of the store.
 *                  offer_text:
 *                      type: string
 *                      description: The text on the offer.
 *                  offer_value:
 *                      type: string
 *                      description: The discount available to user.
 *                  title:
 *                      type: string
 *                      description: The title of the deals and coupons.
 *                  description:
 *                      type: string
 *                      description: Short description about the deals and the coupons.
 *                  code:
 *                      type: string
 *                      description: The code for the deals and the coupons.
 *                  terms_and_conditions:
 *                      type: string
 *                      description: The terms and conditions for the deals and the coupons.
 *                  categories:
 *                      type: string
 *                      description: The categories for the deals and the coupons.
 *                  category_array: 
 *                      type: object
 *                      description: The category of the deals and coupons.
 *                      properties: 
 *                          Fashion:
 *                              type: array
 *                              description: It belongs to the fashion category.
 *                          Travel:
 *                              type: array
 *                              description: It belongs to the travel category.
 *                  featured:
 *                      type: string
 *                      description: Whether the deals and the coupons is featured or not.
 *                  url:
 *                      type: string
 *                      description: The link of the deals and the coupons.
 *                  smartLink:
 *                      type: string
 *                      description: The smartlink of the deals and the coupons.
 *                  image_url:
 *                      type: string
 *                      description: The link for the image of the company offering the deals and the coupons.
 *                  type:
 *                      type: string
 *                      description: Whether it's a deals and coupons.
 *                  offer:
 *                      type: string
 *                      description: What is the offer by deals and the coupons.
 *                  status:
 *                      type: string
 *                      description: Is the deals and coupons active or has been expired.
 *                  start_date:
 *                      type: string
 *                      description: The start date from which the coupons and the deals activates.
 *                  end_date:
 *                      type: string
 *                      description: The end date till which the coupons and the deals will be alive.
 *              example:
 *                  id: 60d3a03660fc7e220ce52b50
 *                  lmd_id: "633156"
 *                  store: au.zaful.com
 *                  offer_text: Up to 18% discount on all products
 *                  offer_value: 18%
 *                  title: Avail Up to 18% OFF
 *                  description: This discount is applicable on all products (On Min. Purchase of $20)
 *                  code: ZFLIST
 *                  terms_and_conditions: ""
 *                  categories: Fashion,Mens Apparels,Womens Apparels,Footwear,Fashion Accessories
 *                  category_array: {Fashion: ["Mens Apparel", "Footwear"], Travel: ["Travel accessories"]}
 *                  featured: No
 *                  url: https://au.zaful.com/
 *                  smartLink: http://linkmydeals.com/smartlink/?account_id=4514&network=&url=https%3A%2F%2Fau.zaful.com%2F
 *                  image_url: "https://c.cfjump.com/Avatars/ECED3475-931C-41F1-B3CD-513CD7FDFDCA.png"
 *                  type: Code
 *                  offer: Percentage-Off
 *                  status: active
 *                  start_date: 2021-01-28T00:00:00.000Z
 *                  end_date: 2022-01-01T00:00:00.000Z
 */



/**
 * @openapi
 * /dealsandcouponsrights/dealsandcoupons:
 *      get:
 *          summary: Returns all the deals and coupons stored in the the DealsandCoupons Offers Database.
 *          tags: [DealsAndCoupons]  
 *          responses:
 *              200:
 *                  description: The list of the dealsandcoupons.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/DealsAndCoupons'
 */


router.get('/dealsandcoupons', function (req, res) {
    dealsAndcouponsModel.find({}, null, function (err, docs) {
        if (err){
            res.status(404).json({success: false, message: "The resource cannot be found"});
        }
        else{
            res.status(200).json(docs);
        }
    });
});


/**
 * @openapi
 * /dealsandcouponsrights/dealsandcoupons/{id}:
 *      get:
 *          summary: Returns a particular deal and coupon stored in the offers collections of the DealsandCouponsOffers Database.
 *          tags: [DealsAndCoupons]
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The offer id.
 *          responses:
 *              200:
 *                  description: A particular deal/coupon.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example:
 *                                  _id: d5fE_asz
 *                                  store_name: Amazon
 *                                  business_email_address: amazon@gmail.com
 *                                  password: amazon@123                             
 */



router.get('/dealsandcoupons/:id', function (req, res) {
    dealsAndcouponsModel.findById(req.params.id, (err,data) => {
        if(err){
            res.status(404).json({success: false, error: err});
        }
        else{
            res.status(200).json(data);
        }
    });
});

router.get('/code', function (req, res) {
    dealsAndcouponsModel.find({type: "Code"}, null, function (err, docs) {
        if (err){
            res.status(404).json({success: false, message: "The resource cannot be found"});
        }
        else{
            res.status(200).json(docs);
        }
    });
});

router.get('/deal', function (req, res) {
    dealsAndcouponsModel.find({type: "Deal"}, null, function (err, docs) {
        if (err){
            res.status(404).json({success: false, message: "The resource cannot be found"});
        }
        else{
            res.status(200).json(docs);
        }
    });
});


router.get('/deal/:id', function (req, res) {
    dealsAndcouponsModel.find({
        $and: [{_id: req.params.id, type: "Deal"}]
      }, null, (err,data) => {
        if(err){
            res.status(404).json({success: false, error: "The requested data cannot be found...."});
        }
        else{
            res.status(200).json(data);
        }
    });
    
});

router.get('/lastdealorcoupon', function (req,res){

    dealsAndcouponsModel.find({}, null, function (err, docs) {
        if (err){
            res.status(404).json({success: false, message: "The resource cannot be found"});
        }
        else{
            const last = docs.length;
            res.status(200).json(docs[last-1]);
        }
    });

});


/**
 * @openapi
 * /dealsandcouponsrights/dealsandcouponsadd/:
 *      post:
 *          summary: Create a new deal/coupon in the offers collections of the Deals and Coupons Offers Database.
 *          tags: [DealsAndCoupons] 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: object
 *                         example:
 *                              { "store_name": "Amazon",  "business_email_address": "abc@amazon.com", "password": "abc123$" }
 *          responses:
 *              '201':
 *                  description: OK.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: 
 *                                  success: true
 *                                  data: { "_id": "60d368a899be30066e2a8db3",  "store_name": "Amazon",  "business_email_address": "abc@amazon.com", "password": "abc123$", "__v": 0 }                              
 */


router.post('/dealsandcouponsadd',dealsAndCouponsController);



/**
 * @openapi
 * /dealsandcouponsrights/dealsandcouponsupdate/{id}:
 *      put:
 *          summary: Update an deal/coupon by its id in the offers collections of the DealsandCouponsOffers Database.
 *          tags: [DealsAndCoupons] 
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The deal/couponid.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example: {"business_email_address": "abx@amazon.com", "password": "abc123$%"}
 *          responses:
 *              '200':
 *                  description: OK.
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              example: 
 *                                  id: d5fE_asz
 *                                  store_name: Amazon
 *                                  business_email_address: abx@amazon.com
 *                                  password: abc123$%
 *              '404':
 *                  description: The deal/coupon was not found.
 *              '500':
 *                  description: There was some server error.
 */

router.put('/dealsandcouponsupdate/:id', function (req, res) {
   dealsAndcouponsModel.findByIdAndUpdate({_id: req.params.id}, req.body , {new: true}, function(err, result){

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
 * /dealsorcouponsrights/dealsandcouponsdelete/{id}:
 *      delete:
 *          summary: Remove the deal/coupon by its id.
 *          tags: [DealsAndCoupons] 
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: The deal/coupon id.
 *          responses:
 *              '200':
 *                  description: The deal/coupon will be deleted.
 *                  content:
 *                      text/plain:
 *                          schema:
 *                              Deal/Coupon deleted with _id: 60d3a03660fc7e220ce52b4a
 *              '404':
 *                  description: The merchant was not found.
 */

 router.delete('/dealsandcouponsdelete/:id', function (req, res) {
    // console.log(req.get('Content-Type')); 
   //  res.send("Hello World!! Welcome to delete a user!!");
   dealsOrCouponsModel.deleteMany({_id: req.params.id}, function (err, _) {
      if (err) {
          return res.status(404).json({success: false, error: err});
      }
      else{
          res.status(200).send(`Deal/Coupon deleted with _id: ${req.params.id}`);
      }
  });
});  


module.exports = router;