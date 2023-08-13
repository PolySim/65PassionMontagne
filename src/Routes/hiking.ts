const express = require('express');
const router = express.Router();
import {
  getImages,
  getGPX,
  getImagesState,
  getHikesStates,
  getHikingInformation,
  getHikingImage
} from "~/Controllers/hiking";

router.get('/gpx/:hikingId', getGPX)

router.get('/images', getImages)

router.get('/imageState/:path', getImagesState)

router.get('/hikesState', getHikesStates)

router.get('/getHikingInformation/:hikingId', getHikingInformation)

router.get('/getImage/:imageId', getHikingImage)

module.exports = router