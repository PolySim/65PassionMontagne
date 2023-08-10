import express from "express";
import {getCategoriesImage} from "~/Controllers/categories";

const router = express.Router()

router.get('/getImage/:categoryId', getCategoriesImage)

module.exports = router