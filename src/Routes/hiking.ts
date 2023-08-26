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
  updateMainImage,
  deleteImage,
  uploadNewGpx,
  createAlbum,
} from "~/Controllers/hiking";
import path from "path";
import console from "console";
import { Request } from "express";

const express = require("express");
const router = express.Router();

declare module "express" {
  interface Request {
    fileName?: string[];
    gpxFileName?: string;
  }
}

const storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    const hikingId = req.params.hikingId;
    const uploadPath = path.join(__dirname, "../data/hiking_image", hikingId);
    cb(null, uploadPath);
  },
  filename: (req: Request, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    req.fileName = req.fileName ? [...req.fileName, fileName] : [fileName];
    cb(null, fileName);
  },
});

const uploadImage = multer({ storage: storageImage });

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
  uploadImage.array("images", 12),
  downloadImages,
);

router.put("/updateMainImage", updateMainImage);

router.delete("/deleteImage", deleteImage);

const storageGpx = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../data/GPX");
    cb(null, uploadPath);
  },
  filename: (req: Request, file, cb) => {
    const gpxFileName = Date.now() + file.originalname;
    req.gpxFileName = gpxFileName;
    cb(null, gpxFileName);
  },
});

const uploadGpx = multer({ storage: storageGpx });

router.post("/uploadGpx/:hikingId", uploadGpx.single("gpx"), uploadNewGpx);

router.post("/createAlbum", createAlbum);

module.exports = router;
