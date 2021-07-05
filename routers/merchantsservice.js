var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')


const BASE_URL = 'http://localhost:3002/merchantrights'
const api = apiAdapter(BASE_URL)
console.log(api);

router.get('/merchants', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})


router.get('/merchant/:id', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})
// router.get('/code', (req, res) => {
//     console.log(req.path);
//     api.get(req.path).then(resp => {
//         res.send(resp.data)
//       })
// })
router.post('/merchantadd', (req, res) => {
    console.log(req.path);
    api.post(req.path,req.body).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})

router.post('/signupmerchant', (req, res) => {
  console.log(req.path);
  api.post(req.path,req.body,{
    withCredentials:true,
}).then(resp => {
      res.send(resp.data)
    }).catch((err) => {
      res.send("Something went wrong. Please try again!!!")
    })
})

router.post('/signinmerchant', (req, res) => {
  console.log(req.path);
  api.post(req.path ,req.body,{
    withCredentials:true,
    crossDomain: true
}).then(resp => {
      i = resp.data;
      j = i.token;
      console.log(i);
      console.log(resp.headers);
      // console.log(resp.headers.set-cookie);
      res.send(resp.data)
    }).catch((err) => {
      res.send("Please login to access this resource!!")
    })
})

// axios.interceptors.request.use(
//   config => {
//     config.headers.authorization = `Bearer ${j}`;
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );


router.post('/api/posts', (req, res) => {
  console.log(req.path);
  api.post(req.path, req.body,{
    headers: { Authorization: `Bearer ${j}` }
}).then(resp => {
  res.send(resp.data)
}).catch((err) => {
  // res.send("Something went wrong. Please try again!!!")
  res.sendStatus(403)
})
})


router.get('/logoutmerchant', (req, res) => {
  console.log(req.path);
  j=''
  api.get(req.path, {headers: { Authorization: `Bearer ${j}` }}).then(resp => {
  res.send(resp.data)
}).catch((err) => {
  res.send("Something went wrong. Please try again!!!")
})
})





router.put('/merchantupdate/:id', (req, res) => {
    console.log(req.path);
    api.put(req.path,req.body).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})

router.delete('/merchantdelete/:id', (req, res) => {
    console.log(req.path);
    api.delete(req.path).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})


module.exports = router