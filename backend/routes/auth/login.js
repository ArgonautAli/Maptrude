const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
var router = express.Router();

const login = router.post("/", async function (req, res, next) {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName }).lean();

    if (!user) {
      return res.json({ status: "error", message: "User does not exist" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const body = {
        _id: user._id,
        userName: user.userName,
      };

      jwt.sign(
        body,
        process.env.JWT_SECRET_KEY,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) {
            console.log("err", err);
            res.status(500).json({ status: "error", message: err });
          }
          res.json({
            status: "ok",
            message: "login succesful",
            data: {
              userId: user._id,
              userName: user.userName,
              fullName: user.fullName,
              token,
            },
          });
        }
      );
    } else {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid password" });
    }
  } catch (err) {
    const error = JSON.stringify(err);
    console.log(err);
    res.status(500).json({ status: "error", message: error });
  }
});

module.exports = { login };
