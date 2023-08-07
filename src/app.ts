import express from "express";

const helloWorldRoutes = require('./routes/helloWorld');
const app = express()

app.use('/HelloWorld', helloWorldRoutes);

module.exports = app;