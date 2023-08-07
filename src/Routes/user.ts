import {getUserName} from "~/Controllers/user";

const express = require('express');
const router = express.Router();

router.get('/username', getUserName)

module.exports = router