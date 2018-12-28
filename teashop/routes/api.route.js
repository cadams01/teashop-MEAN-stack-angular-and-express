var express = require('express')

var router = express.Router()
var teas = require('./api/teas.route')


router.use('/teas', teas);


module.exports = router;