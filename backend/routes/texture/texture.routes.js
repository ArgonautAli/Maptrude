const express = require("express");
const cors = require("cors");
const { createTexture, getTexture } = require("./texture");

const texture = express.Router();

texture.use(cors());
texture.use(express.json());

texture.use("/create", createTexture);
texture.use("/get", getTexture);

module.exports = { texture };
