var express = require("express");
var router = express.Router();
const { checkBody } = require("../modules/checkBody");

const fetch = require("node-fetch");
const User = require("../models/users");

const OWM_API_KEY = "ce7418650c86eae6629dfcfdda141c14";

router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["name", "email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  // Check if the user is in the DB
  User.findOne({ name: req.body.name, email: req.body.email }).then(
    (dbData) => {
      if (dbData === null) {
        // Creates new document with new User
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        // Finally save in database
        newUser.save().then((user) => {
          console.log(user);
          res.json({ result: true });
        });
        // User email already exists in database
      } else if (dbData.email) {
        res.json({ result: false, error: "User already exists" });
      }
      // User already exists in database
      else {
        res.json({ result: false, error: "User already exists" });
      }
    }
  );
});

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  // Check if the user is in the DB
  User.findOne({ name: req.body.name, email: req.body.email }).then(
    (dbData) => {
      if (dbData) {
        res.json({ result: true });
      } else {
        res.json({ result: false, error: "User not found" });
      }
    }
  );
});

module.exports = router;
