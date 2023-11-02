import express from "express";
import {
  sendFavicon,
  sendImageStatic,
  sendMain,
  sendStatic,
} from "~/Controllers/file";

const router = express.Router();

router.use("/assets/:fileName", sendStatic);
router.use("/Home/:fileName", sendImageStatic);
router.use("/Favicon/:fileName", sendFavicon);
router.use("/", sendMain);

module.exports = router;
