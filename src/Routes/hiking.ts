const express = require('express');
const router = express.Router();
import {getImages, getGPX, getHikingInformation} from "~/Controllers/hiking";

router.get('/hikingInformation', getHikingInformation)

router.get('/gpx', getGPX)

router.get('/images', getImages)

module.exports = router