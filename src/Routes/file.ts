import express from "express";
import { sendImageStatic, sendMain, sendStatic } from "~/Controllers/file";

const router = express.Router();

router.use("/assets/:fileName", sendStatic);
router.use("/Home/:fileName", sendImageStatic);
router.use("/", sendMain);

module.exports = router;
