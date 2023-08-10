import express from "express";
import bodyParser from "body-parser";

const helloWorldRoutes = require('./routes/helloWorld');
const userRoutes = require('./Routes/user')
const hikingRoutes = require('./Routes/hiking')
const categoriesRoutes = require('./Routes/categories')
const app = express()

app.use(bodyParser.json())

app.use('/HelloWorld', helloWorldRoutes);
app.use('/user', userRoutes)
app.use('/hiking', hikingRoutes)
app.use('/categories', categoriesRoutes)

module.exports = app;