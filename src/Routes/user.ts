import {
  addFavorite,
  getUserName,
  removeFavorite,
  signIn,
  signUp,
} from "~/Controllers/user";

import express from "express";

const router = express.Router();

router.get("/username", getUserName);

router.post("/signUp", signUp);

router.post("/signIn", signIn);

router.post("/addFavorite", addFavorite);

router.delete("/removeFavorite", removeFavorite);

module.exports = router;
