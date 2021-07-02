var express = require('express');
var router = express.Router()
var adminService = require('./adminservice');
var dealsandCouponsService = require('./dealsandcouponsservice');
var merchantsService = require('./merchantsservice');
var userService = require('./usersservice');

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(adminService);
router.use(userService);
router.use(dealsandCouponsService);
router.use(merchantsService);


module.exports = router