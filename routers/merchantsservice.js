var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')

const BASE_URL = 'http://localhost:3001/merchantsrights'
const api = apiAdapter(BASE_URL)
console.log(api);

router.get('/merchants', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.get('/merchants/:id', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.post('/merchantsadd', (req, res) => {
    console.log(req.path);
    api.post(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.put('/merchantsupdate', (req, res) => {
    console.log(req.path);
    api.put(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.delete('/merchantsdelete', (req, res) => {
    console.log(req.path);
    api.delete(req.path).then(resp => {
        res.send(resp.data)
    })
})



module.exports = router