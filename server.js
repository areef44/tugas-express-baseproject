//import express
const responseHelper = require('express-response-helper').helper();
// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import db from "./app/models";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models/index");




const app = express();


// attach the middleware before any route definition



//CORS config
var corsOptions = {
  origin: "http://localhost:3031"
};

app.use(cors(corsOptions));
app.use(responseHelper);
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// simple route
app.get("/user", async (req, res) => {
    const users = await db.User.findAll();
    res.respond(users ,200);
});

//routes untuk mengakses auth dan user
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});