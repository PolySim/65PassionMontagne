const express = require('express');
const router = express.Router();

const helloWorldCtrl = require('../controllers/helloWorld')

router.get('/', helloWorldCtrl.helloWorld)

module.exports = router;