import express from "express";
import http from "http";
import "dotenv/config";

const app = require("./app");
const port = 3210;

app.set("port", port);
const index = http.createServer(app);

app.use(express.json());

index.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});
