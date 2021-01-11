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
const db = require("./models");

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

// ====================================================================================
//Setup our routes for Resource Driven API

app.get("/api/book", (req, res) => {
  db.Book.find({}).then((foundBooks) => {
    res.json(foundBooks);
  });
});

app.get("/api/book/:id", (req, res) => {
  db.Book.find({ _id: req.params.id }).then((foundBook) => {
    res.json(foundBook);
  });
});

app.post("/api/book", (req, res) => {
  db.Book.create(req.body).then((newBook) => {
    res.json(newBook);
  });
});

app.put("/api/book/:id", (req, res) => {
  db.Book.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((updatedBook) => {
    res.json(updatedBook);
  });
});

app.delete("/api/book/:id", (req, res) => {
    db.Book.findByIdAndDelete(req.params.id).then((result) => {
        res.json(result);
    })
});
// ===================================================================================

// Run App on the Port in the browser
app.listen(PORT, () => {
  console.log(`App is running on http://localhost${PORT}`);
});
