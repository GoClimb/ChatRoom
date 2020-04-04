const express = require('express')
let { login } = require('../controller/userController')

let router = express.Router()

router.post('/',login)

module.exports = router