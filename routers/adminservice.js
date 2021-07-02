var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')

const BASE_URL = 'http://localhost:3002/adminrights'
const api = apiAdapter(BASE_URL)
console.log(api);

router.get('/admin', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.get('/admin/:id', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
    })
})


router.post('/adminadd', (req, res) => {
    console.log(req.path);
    api.post(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.put('/adminupdate', (req, res) => {
    console.log(req.path);
    api.put(req.path).then(resp => {
        res.send(resp.data)
    })
})

router.delete('/admindelete', (req, res) => {
    console.log(req.path);
    api.delete(req.path).then(resp => {
        res.send(resp.data)
    })
})



module.exports = router