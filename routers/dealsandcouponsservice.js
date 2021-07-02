var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')

const BASE_URL = 'http://localhost:3004/dealsandcouponsrights'
const api = apiAdapter(BASE_URL)
console.log(api);

router.get('/dealsandcouponss', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.get('/dealsandcoupons/:id', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.post('/dealsandcouponsadd', (req, res) => {
    console.log(req.path);
    api.post(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.put('/dealsandcouponsupdate', (req, res) => {
    console.log(req.path);
    api.put(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.delete('/dealsandcouponsdelete', (req, res) => {
    console.log(req.path);
    api.delete(req.path).then(resp => {
        res.send(resp.data)
    })
})



module.exports = router