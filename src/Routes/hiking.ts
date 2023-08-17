const express = require("express");
const router = express.Router();
import {
  getImages,
  getGPX,
  getImagesState,
  getHikesStates,
  getHikingInformation,
  getHikingImage,
  getHikes,
  getHikesWithState,
} from "~/Controllers/hiking";

router.get("/gpx/:hikingId", getGPX);

router.get("/images", getImages);

router.get("/imageState/:path", getImagesState);

router.get("/hikesState", getHikesStates);

router.get("/getHikingInformation/:hikingId", getHikingInformation);

router.get("/getImage/:imageId", getHikingImage);

router.get("/hikes/:categoryId", getHikes);

router.get("/hikes/:categoryId/:stateId", getHikesWithState);

module.exports = router;
