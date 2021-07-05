var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')

const BASE_URL = 'http://localhost:3001/dealsandcouponsrights'
const api = apiAdapter(BASE_URL)
console.log(api);

router.get('/dealsandcoupons', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})


router.get('/dealsandcoupons/:id', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})
router.get('/code', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})
router.get('/deal', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})
router.get('/deal/:id', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})

router.get('/lastdealorcoupon', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})


router.post('/dealandcouponadd', (req, res) => {
  console.log(req.path);
  api.post(req.path,req.body).then(resp => {
      res.send(resp.data)
    }).catch((err) => {
      res.send("Something went wrong. Please try again!!!")
    })
})
router.put('/dealsandcouponsupdate/:id', (req, res) => {
  console.log(req.path);
  api.put(req.path,req.body).then(resp => {
      res.send(resp.data)
    }).catch((err) => {
      res.send("Something went wrong. Please try again!!!")
    })
})

router.delete('/dealsandcouponsdelete/:id', (req, res) => {
  console.log(req.path);
  api.delete(req.path).then(resp => {
      res.send(resp.data)
    }).catch((err) => {
      res.send("Something went wrong. Please try again!!!")
    })
})


module.exports = router