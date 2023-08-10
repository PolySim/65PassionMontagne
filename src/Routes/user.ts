import {getUserName} from "~/Controllers/user";

import express from "express";

const router = express.Router();

router.get('/username', getUserName)

module.exports = router