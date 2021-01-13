const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models");

//***Only 2 routes we care about here [ When the sign up or login]

/// Sign Up ROUTE - Enables our user to tell us who they are

//First check to see if the db holds a user's email and pw
router.post("/api/signup", (req, res) => {
  const { emailAddress, password } = req.body;
  // if thereis no email address or password on file then it is a bad request - set status to 400
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
            const token = jwt.sign(
                //this following part in the squiggly brackets is called the payload and is provided when JWT is decoded.
              {
                emailAddress: newUser.emailAddress,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
              },
              // this next line is your SECRET to validate the JWT signature - use a .env file and install dotenv as a dependency. Add to top of server.js
              process.env.SECRET
            );

            res.json({
              error: false,
              data: token,
              message: "Successfully signed up.",
            });
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

/// LOGIN ROUTE - Confirms that the user is who they say they are

// First need to see if the user's email matches one in our database and if so, see if their pw matches.
router.post("/api/login", (req, res) => {
  // Step 1: pull user provided email and password from the body.
  const { emailAddress, password } = req.body;
  // Step 2: See if there is a matching user in the database.
  //[NOTE].find pulls in an array - .findOne pulls a single record object from an array
  db.User.findOne({ emailAddress, emailAddress })
    .then((foundUser) => {
      if (foundUser) {
        console.log(foundUser);
        console.log("Hashed password from DB", foundUser.password);
        console.log("Plain text password from user", password);
        // Step 3: If there is a matching user, compare the plaintext password with the stored hashed pw.
        bcrypt
          .compare(password, foundUser.password)
          .then(function (result) {
            // result == true
            console.log("The passwords match: ", result);

            if (result) {
              // Step 4: if passwords match, send back success
              //TODO: Lock down the token with a time frame

              const token = jwt.sign(
                {
                  emailAddress: foundUser.emailAddress,
                  firstName: foundUser.firstName,
                  lastName: foundUser.lastName,
                },
                process.env.SECRET
              );

              res.json({
                error: false,
                data: token,
                message: "Successfully logged in.",
              });
            } else {
              // Step 5: If the passwords don't match set status to Unauthorized (401) and send back an error
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
