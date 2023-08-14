import {getUserName, signIn, signUp} from "~/Controllers/user";

import express from "express";

const router = express.Router();

router.get('/username', getUserName)

router.post('/signUp', signUp)

router.post('/signIn', signIn)

module.exports = router