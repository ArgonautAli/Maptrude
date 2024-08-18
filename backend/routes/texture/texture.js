const express = require("express");
const Texture = require("../../models/texture");
var router = express.Router();

const createTexture = router.post("/create", async function (req, res) {
  try {
    const { img, info, createdBy } = req.body;
    if (!img || !info || !createdBy) {
      return res
        .status(400)
        .json({ status: "error", message: "Missing fields" });
    }

    const response = await Texture.create({
      img,
      info,
      createdBy,
    });
    res.json({ status: "ok", message: "Texture created successfully!" });
  } catch (err) {
    const error = JSON.stringify(err);
    console.log(err);
    res.status(500).json({ status: "error", message: error });
  }
});

module.exports = { createTexture };
