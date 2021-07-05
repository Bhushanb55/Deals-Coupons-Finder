var express = require('express');
var router = express.Router()
const apiAdapter = require('./apiAdapter')
var i;
var j = '';

const BASE_URL = 'http://localhost:3000/adminrights'
const api = apiAdapter(BASE_URL)
console.log(api);

router.get('/admins', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})


router.get('/admin/:id', (req, res) => {
    console.log(req.path);
    api.get(req.path).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})

router.post('/adminadd', (req, res) => {
    console.log(req.path);
    api.post(req.path,req.body).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})
router.put('/adminupdate/:id', (req, res) => {
    console.log(req.path);
    api.put(req.path,req.body).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})

router.delete('/admindelete/:id', (req, res) => {
    console.log(req.path);
    api.delete(req.path).then(resp => {
        res.send(resp.data)
      }).catch((err) => {
        res.send("Something went wrong. Please try again!!!")
      })
})

router.post('/adminsignup', (req, res) => {
  console.log(req.path);
  api.post(req.path,req.body,{
    withCredentials:true,
}).then(resp => {
      res.send(resp.data)
    }).catch((err) => {
      res.send("Something went wrong. Please try again!!!")
    })
})

router.post('/adminsignin', (req, res) => {
  console.log(req.path);
  api.post(req.path ,req.body,{
    withCredentials:true,
    crossDomain: true
}).then(resp => {
      i = resp.data;
      j = i.token;
      console.log(i);
      console.log(j);
      console.log(resp.headers);
      // console.log(resp.headers.set-cookie);
      res.send(resp.data)
    }).catch((err) => {
      res.send("Either email or password is incorrect")
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


router.get('/adminlogout', (req, res) => {
  console.log(req.path);
  j=''
  console.log(j);
  api.get(req.path, {headers: { Authorization: `Bearer ${j}` }}).then(resp => {
  res.send(resp.data)
}).catch((err) => {
  res.send("Something went wrong. Please try again!!!")
})
})

router.get('/adminusers', (req, res) => {
  console.log(req.path);
  console.log(j);
  api.get(req.path, {headers: { Authorization: `Bearer ${j}` }}).then(resp => {
  res.send(resp.data)
}).catch((err) => {
  res.send("Something went wrong. Please try again!!!")
})
})


// router.get('/hashtags/:n', (req, res) => {
//     res.send(req.path + " called")  
// })

module.exports = router