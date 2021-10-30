const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs');


const app = express();
var PORT = process.env.PORT || 3001

// middleware
app.use(express.urlencoded({extened: true}));
app.use(express.json);
app.use(express.static("public"));

//api routes
