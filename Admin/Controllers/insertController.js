const { models } = require('mongoose');
const express = require('express');
var adminModel = require('../models/admin-models');


var ObjectId = require('mongoose').Types.ObjectId;


// => localhost: 3002/employees/
var app = express();
app.get('/', (req, res) => {
  admin-models.find((err,docs) => {
      if(!err) { res.send(docs); }
      else {console.log('Error in Retriving Admin :' + JSON.stringify(err, undefined, 2)); }
  }); 
});


//doc paramerter saves the data of field in mongoDB
app.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    admin-models.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Admin :' + JSON.stringify(err, undefined, 2));}
    });
});

app.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        var newAdmin = new adminModel 
        newAdmin.full_name = req.body.full_name,
        newAdmin.email_address = req.body.email_address,
        newAdmin.password = req.body.password,
        newAdmin.mobile_number = req.body.mobile_number
    
    newAdmin.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, doc) => {
        if(!err) {res.send(doc);}
        else {console.log('Error in Admin Update :' + JSON.stringify(err, undefined, 2)); }
    });
});



app.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        newAdmin.findByIdAndRemove(req.param.id, (err, doc) => {
            if(!err) {res.send(doc);}
            else {console.log('Error in Admin Delete :' + JSON.stringify(err, undefined, 2)); }
        });
    });




module.exports = function (req, res){
 var newAdmin = new adminModel();
 newAdmin.full_name = req.body.full_name;
 newAdmin.email_address = req.body.email_address;
 newAdmin.password = req.body.password;
 newAdmin.mobile_number = req.body.mobile_number;
 
 newAdmin.save(function(err, data){
 if(err){
 console.log(error);
 }
 else{
 res.send("Data inserted");
 }
 });
}