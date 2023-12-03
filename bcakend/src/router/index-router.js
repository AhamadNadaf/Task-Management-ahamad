const express = require('express')
const userRoute = require('./userRoute-router')
const projectRoute = require('./projectRoute-router')

const router = express.Router()

router.use('/user', userRoute)
router.use('/project', projectRoute)

module.exports = router;