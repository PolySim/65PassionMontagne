import bodyParser from "body-parser";
import { NextFunction, Request, Response } from "express";

const express = require("express");

const helloWorldRoutes = require("./routes/helloWorld");
const userRoutes = require("./Routes/user");
const hikingRoutes = require("./Routes/hiking");
const categoriesRoutes = require("./Routes/categories");
const commentRoute = require("./Routes/comment");
const difficultyRoute = require("./Routes/difficulty");
const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  next();
});

app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/HelloWorld", helloWorldRoutes);
app.use("/user", userRoutes);
app.use("/hiking", hikingRoutes);
app.use("/categories", categoriesRoutes);
app.use("/comment", commentRoute);
app.use("/difficulty", difficultyRoute);

module.exports = app;
