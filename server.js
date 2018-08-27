var express = require("express");
var exphbs  = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var app = express();

//Port being used...
var PORT = 3000;

// Use body-parser for handling form submissions...
app.use(bodyParser.urlencoded({ extended: true }));

// Use express.static to serve the public folder as a static directory...
app.use(express.static("public"));

// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//Handlebars...
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Routes used for app
require("./controllers/routes.js")(app);

 
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });