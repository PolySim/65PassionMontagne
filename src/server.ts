import {NextFunction, Request, Response} from "express";
import express from "express";
import http from "http";

const app = require('./app')
const port = 3000;

app.set('port', port)
const server = http.createServer(app)

app.use(express.json())
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

server.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});