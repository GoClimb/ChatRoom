const express = require('express')
const { index,chatroom,login,posts } = require('../controller/indexController')
const auth = require('../middlewares/auth')

let route = express.Router()

route.get('/',index)
route.get('/chatroom',auth,chatroom)
route.get('/posts',auth,posts)
route.get('/login',login)

module.exports = route