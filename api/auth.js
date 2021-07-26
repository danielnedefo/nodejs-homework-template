const express = require('express')
const auth = require('../controllers/auth')
const useAuth = require('./useAuth')

const router = express.Router()

router.post('/signup', express.json(), auth.login)

router.post('/register', express.json(), auth.register)

router.get('/logout', useAuth, auth.logOut)

module.exports = router
