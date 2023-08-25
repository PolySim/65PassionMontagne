import multer from "multer";
import {
  getImages,
  getGPX,
  getImagesState,
  getHikesStates,
  getHikingInformation,
  getHikingImage,
  getHikes,
  getHikesWithState,
  updateHeader,
  updateStatistical,
  updateContent,
  reorderImages,
  downloadImages,
} from "~/Controllers/hiking";
import path from "path";
import console from "console";
import { Request } from "express";

const express = require("express");
const router = express.Router();

declare module "express" {
  interface Request {
    fileName?: string;
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const hikingId = req.params.hikingId;
    const uploadPath = path.join(__dirname, "../data/hiking_image", hikingId);
    cb(null, uploadPath);
  },
  filename: (req: Request, file, cb) => {
    // cb(null, file.originalname);
    const fileName = Date.now() + path.extname(file.originalname);
    req.fileName = fileName;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/gpx/:hikingId", getGPX);

router.get("/images", getImages);

router.get("/imageState/:path", getImagesState);

router.get("/hikesState", getHikesStates);

router.get("/getHikingInformation/:hikingId", getHikingInformation);

router.get("/getImage/:imageId", getHikingImage);

router.get("/hikes/:categoryId", getHikes);

router.get("/hikes/:categoryId/:stateId", getHikesWithState);

router.put("/updateHeader", updateHeader);

router.put("/updateStatistical", updateStatistical);

router.put("/updateContent", updateContent);

router.put("/reorderImages", reorderImages);

router.post(
  "/downloadImages/:hikingId",
  upload.array("images", 12),
  downloadImages,
);

module.exports = router;
