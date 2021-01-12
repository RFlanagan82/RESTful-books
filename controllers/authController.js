const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../models");

//***Only 2 routes we care about here [ When the sign up or login]

// Sign up - First check to see if the db holds a user's email and pw
router.post("/api/signup", (req, res) => {
    const { emailAddress, password} = req.body;
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

// Login

module.exports = router;
