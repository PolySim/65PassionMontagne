import express from "express";
import {getCategoriesImage, getCategoriesInformation} from "~/Controllers/categories";

const router = express.Router()

router.get('/getImage/:categoryId', getCategoriesImage)
router.get('/getInformation', getCategoriesInformation)

module.exports = router