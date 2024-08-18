const express = require("express");
const { signup } = require("./signup");
const { login } = require("./login");

const auth = express.Router();

auth.use(express.json());

auth.use("/signup", signup);
auth.use("/login", login);

module.exports = { auth };
