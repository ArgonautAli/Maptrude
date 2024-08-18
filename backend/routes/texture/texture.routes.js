const express = require("express");
const cors = require("cors");
const { createTexture } = require("./texture");

const texture = express.Router();

texture.use(cors());
texture.use(express.json());

texture.use("/create", createTexture);

module.exports = { texture };
