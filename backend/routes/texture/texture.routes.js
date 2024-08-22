const express = require("express");
const cors = require("cors");
const { createTexture, getTexture, getMostCreated } = require("./texture");

const texture = express.Router();

texture.use(cors());
texture.use(express.json());

texture.use("/create", createTexture);
texture.use("/get", getTexture);
texture.use("/most-frequent", getMostCreated);

module.exports = { texture };
