import { addComment, getComments } from "~/Controllers/comment";
import express from "express";

const router = express.Router();

router.post("/add", addComment);

router.get("/get/:hikingId", getComments);

module.exports = router;
