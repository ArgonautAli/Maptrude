const express = require("express");
const User = require("../../models/user");
const Texture = require("../../models/texture");
const redisClient = require("../../redisClient");
var router = express.Router();
const axios = require("axios");

require("dotenv").config();

const createTexture = router.post("/", async function (req, res) {
  try {
    const { texture, coords, createdBy } = req.body;
    if (!texture || !coords || !createdBy) {
      return res
        .status(400)
        .json({ status: "error", message: "Missing fields" });
    }

    const cachekey = `textures_${createdBy}`;

    const cachedData = await redisClient.get(cacheKey);
    console.log("cachedData", cachedData);
    if (cachedData) {
      // return res.json(JSON.parse(cachedData));
      console.log("cached", JSON.parse(cachedData));
    }

    const textures = await Texture.find({ createdBy: userId });
    await redisClient.setex(cachekey, 3600, JSON.stringify(textures));

    const { northEast, southWest } = coords;

    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${northEast.lat},${northEast.lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    // Fetch geocoding data for the north-east corner
    const northEastResponse = await axios.get(geocodeUrl);
    const northEastGeocode = northEastResponse.data;

    // Fetch geocoding data for the south-west corner
    const southWestUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${southWest.lat},${southWest.lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const southWestResponse = await axios.get(southWestUrl);
    const southWestGeocode = southWestResponse.data;

    // Combine and process geocoding data
    const result = {
      northEast: northEastGeocode,
      southWest: southWestGeocode,
    };

    const geoCode = northEastGeocode.plus_code.compound_code
      .split(",")[1]
      .slice(1);

    const response = await Texture.create({
      texture,
      coords,
      createdBy,
      geoCode,
    });
    res.json({ status: "ok", message: "Texture created successfully!" });
  } catch (err) {
    const error = JSON.stringify(err);
    console.log(err);
    res.status(500).json({ status: "error", message: error });
  }
});

const getTexture = router.get("/:userId", async function (req, res) {
  try {
    const userId = req.params.userId;
    if (!userId)
      return res.json({ status: "error", message: "User does not exist" });

    const user = await User.findById(userId).lean();

    if (!user) {
      return res.json({ status: "error", message: "User does not exist" });
    }
    const textures = await Texture.find({ createdBy: userId });

    if (!textures.length) {
      return res.json({ status: "error", message: "User does not exist" });
    }

    return res.json({ status: "ok", data: textures });
  } catch (err) {
    const error = JSON.stringify(err);
    console.log(err);
    res.status(500).json({ status: "error", message: error });
  }
});

module.exports = { createTexture, getTexture };
