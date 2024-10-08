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
  getFavorite,
  updateMainImagePosition,
  getAllHikes,
  rotateImage,
} from "~/Controllers/hiking";
import path from "path";
import console from "console";
import { Request } from "express";
import fs from "fs";
import process from "process";

const express = require("express");
const router = express.Router();

declare module "express" {
  interface Request {
    gpxFileName?: string;
  }
}

const storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    const hikingId = req.params.hikingId;
    const uploadPath = path.join(
      process.env.PATH_DATA || "",
      "/hiking_image",
      hikingId,
    );
    if (!fs.existsSync(uploadPath)) {
      fs.mkdir(uploadPath, (err) => {
        if (err) {
          console.log(`mkdir error : ${err}`);
        }
      });
    }
    cb(null, uploadPath);
  },
  filename: (req: Request, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const uploadImage = multer({ storage: storageImage });

router.get("/gpx/:hikingId", getGPX);

router.get("/images", getImages);

router.get("/imageState/:path", getImagesState);

router.get("/hikesState/:categoryId", getHikesStates);

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

router.put("/updateMainImagePosition", updateMainImagePosition);

router.delete("/deleteImage", deleteImage);

const storageGpx = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.env.PATH_DATA || "", "/GPX");
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

router.get("/getFavorites/favorite", getFavorite);

router.get("/getAllHikes", getAllHikes);

router.post("/rotate/:imageId", rotateImage);

module.exports = router;
