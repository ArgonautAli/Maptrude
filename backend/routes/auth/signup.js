const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
var router = express.Router();

const signup = router.post("/", async function (req, res, next) {
  try {
    const {
      userName: plainTextUserName,
      fullName,
      password: plainTextPassword,
    } = req.body;

    if (!plainTextUserName || !fullName || !plainTextPassword) {
      return res
        .status(400)
        .json({ status: "error", message: "Missing fields" });
    }
    const password = await bcrypt.hash(plainTextPassword, 10);
    const userName = plainTextUserName.toLowerCase();
    const response = await User.create({
      fullName,
      userName,
      password,
    });
    console.log("response", response);
    res.json({ status: "ok", message: "User created successfully!" });
  } catch (err) {
    const error = JSON.stringify(err);
    console.log(err);
    res.status(500).json({ status: "error", message: error });
  }
});

module.exports = { signup };
