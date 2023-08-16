import {
  addFavorite,
  getUserName,
  imageUser,
  removeFavorite,
  signIn,
  signInToken,
  signUp,
} from "~/Controllers/user";

import express from "express";

const router = express.Router();

router.get("/username", getUserName);

router.post("/signUp", signUp);

router.post("/signIn", signIn);

router.post("/signInToken", signInToken);

router.post("/addFavorite", addFavorite);

router.delete("/removeFavorite", removeFavorite);

router.get("/image/:userId", imageUser);

module.exports = router;
