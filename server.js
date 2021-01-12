const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("client/build"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/RESTfulbooks",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

// set up connection to constructed Database
const BookController = require("./controllers/bookController");
const AuthorController = require("./controllers/authorController");
const UserController = require("./controllers/userController");
const AuthController = require("./controllers/authController");

//Check to see if Mongoose connection is running
const connection = mongoose.connection;

//  If connected to Mongoose
connection.on("connected", () => {
  console.log("Mongoose successfully connected.");
});

// If an error connecting to Mongoose
connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

//Check to see if PORT is working - use browser tab or Postman
app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

//Call the Route Controllers for the app to work
app.use("/api/book", BookController);
app.use("/api/author", AuthorController);
app.use("/api/user", UserController);
app.use(AuthController);

// Run App on the Port in the browser
app.listen(PORT, () => {
  console.log(`App is running on http://localhost${PORT}`);
});
