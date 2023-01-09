// dependencies //
const express = require("express");
// const path = require("path");

// Initializing express //
const app = express();
const PORT = process.env.PORT || 3001;

// Setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Require routes file
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// PORT listener //
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
