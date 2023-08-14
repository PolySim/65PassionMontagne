import express from "express";
import http from "http";
import 'dotenv/config'

const app = require('./app')
const port = 3210;

app.set('port', port)
const server = http.createServer(app)

app.use(express.json())

server.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});