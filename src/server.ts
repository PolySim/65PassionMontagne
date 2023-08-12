import {NextFunction, Request, Response} from "express";
import express from "express";
import http from "http";

const app = require('./app')
const port = 3210;

app.set('port', port)
const server = http.createServer(app)

app.use(express.json())

server.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});