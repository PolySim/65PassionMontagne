const express = require('express');
const router = express.Router();
import {getImages, getGPX, getHikingInformation, getImagesState} from "~/Controllers/hiking";

router.get('/hikingInformation', getHikingInformation)

router.get('/gpx', getGPX)

router.get('/images', getImages)

router.get('/imageState/:path', getImagesState)

module.exports = router