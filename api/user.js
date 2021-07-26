const express = require('express')
const useAuth = require('./useAuth')

const router = express.Router()

router.get('/profile', useAuth , )