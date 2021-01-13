const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../models");

//***Only 2 routes we care about here [ When the sign up or login]

/// Sign Up ROUTE

//First check to see if the db holds a user's email and pw
router.post("/api/signup", (req, res) => {
  const { emailAddress, password } = req.body;
  if (!emailAddress.trim() || !password.trim()) {
    res.status(400);
  } else {
    bcrypt
      .hash(password, 10)
      .then((hashedPassword) => {
        console.log(hashedPassword);
        db.User.create({
          emailAddress: emailAddress,
          password: hashedPassword,
        })
          .then((newUser) => {
            res.json(newUser);
          })
          .catch((err) => {
            res.status(500).json({
              error: true,
              data: null,
              message: "Unable to signup.",
            });
          });
      })
      .catch((err) => {
        res.status(500);
      });
  }
});

/// LOGIN ROUTE

// First need to see if the user's email matches one in our database and if so, see if their pw matches.
router.post("/api/login", (req, res) => {
  const { emailAddress, password } = req.body;
  //.find pulls in an array - .findOne pulls a single record from an array
  db.User.findOne({ emailAddress, emailAddress })
    .then((foundUser) => {
      if (foundUser) {
        console.log(foundUser);
        console.log("Hashed password from DB", foundUser.password);
        console.log("Plain text password from user", password);
        // Load hash from your password DB.
        bcrypt
          .compare(password, foundUser.password)
          .then(function (result) {
            // result == true
            console.log("The passwords match: ", result);

            if (result) {
              //TODO: send a jwt back as data instead.

              res.json({
                error: false,
                data: null,
                message: "Successfully logged in.",
              });
            } else {
              // set status to Unauthorized (401) since passwords don't match
              res.status(401).json({
                error: true,
                data: null,
                message: "Failed to sign in.",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(401).json({
              error: true,
              data: null,
              message: "Failed to sign in.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: true,
        data: null,
        message: "Failed to sign in.",
      });
    });
});

module.exports = router;
