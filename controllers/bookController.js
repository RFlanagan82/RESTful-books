const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../models");

// ====================================================================================
//Setup our routes for Resource Driven API

router.get("/", (req, res) => {
  console.log(req.headers);
  // if there is no valid authorization token - kick user out
  if (!req.headers.authorization) {
    return res.status(401).json({
      error: true,
      data: null,
      message: "Unauthorized.",
    });
  }
  // Validate user-provided token.
  jwt.verify(req.headers.authorization, process.env.SECRET, (err, decoded) => {
    // if token not validated throw a 401
    if (err) {
      console.log(err);
      return res.status(401).json({
        error: true,
        data: null,
        message: "Invalid User",
      });
      // If token is valide, decode it.
    } else {
      console.log(decoded);
      // If valid token, find books.
      db.Book.find({})
        .populate("author", "firstName lastName")
        .then((foundBooks) => {
          res.json(foundBooks);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: true,
            data: null,
            message: "Failed to retrieve all books.",
          });
        });
    }
  });
});

router.get("/:id", (req, res) => {
  db.Book.find({ _id: req.params.id }).then((foundBook) => {
    res.json(foundBook);
  });
});

router.post("/", (req, res) => {
  db.Book.create(req.body).then((newBook) => {
    res.json(newBook);
  });
});

router.put("/:id", (req, res) => {
  db.Book.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (updatedBook) => {
      res.json(updatedBook);
    }
  );
});

router.delete("/:id", (req, res) => {
  db.Book.findByIdAndDelete(req.params.id).then((result) => {
    res.json(result);
  });
});

module.exports = router;
