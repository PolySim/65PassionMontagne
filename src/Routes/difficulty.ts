import express from "express";
import { getDifficulty } from "~/Controllers/difficulty";

const router = express.Router();

router.get("/getAll", getDifficulty);

module.exports = router;
