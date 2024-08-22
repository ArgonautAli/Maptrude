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

    const cacheKey = `textures_${createdBy}`;
    const top_geocodes = "top_3_geocodes";
    console.log("cacheKey", cacheKey);
    const result1 = await redisClient.del(cacheKey);
    const result2 = await redisClient.del(top_geocodes);

    console.log(`Deleted ${result1} key(s) for ${cacheKey}`);
    console.log(`Deleted ${result2} key(s) for ${top_geocodes}`);

    const { northEast, southWest } = coords;

    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${northEast.lat},${northEast.lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const northEastResponse = await axios.get(geocodeUrl);
    const northEastGeocode = northEastResponse.data;

    const southWestUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${southWest.lat},${southWest.lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const southWestResponse = await axios.get(southWestUrl);
    const southWestGeocode = southWestResponse.data;

    const result = {
      northEast: northEastGeocode,
      southWest: southWestGeocode,
    };

    const geoCode = northEastGeocode.plus_code.compound_code
      .split(",")[1]
      .trim();

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
    const cachekey = `textures_${userId}`;
    const cachedData = await redisClient.get(cachekey);
    console.log(cachekey, "cachekey");

    if (cachedData) {
      return res.json({ status: "ok", data: JSON.parse(cachedData) });
    }

    const textures = await Texture.find({ createdBy: userId });
    await redisClient.set(cachekey, JSON.stringify(textures));
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

const getMostCreated = router.get("/", async function (req, res) {
  try {
    const cacheKey = "top_3_geocodes";

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.json({ status: "ok", data: JSON.parse(cachedData) });
    }

    const topGeoCodes = await Texture.aggregate([
      {
        $project: {
          geoCode: 1,
          coords: 1,
        },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $ne: ["$geoCode", null] },
              then: "$geoCode",
              else: "$coords",
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 3 },
    ]).allowDiskUse(true);

    await redisClient.set(cacheKey, JSON.stringify(topGeoCodes));

    return res.json({ status: "ok", data: topGeoCodes });
  } catch (error) {
    console.error("Error fetching top 3 geocodes:", error);
    res.status(500).json({ status: "error", message: error });
  }
});

module.exports = { createTexture, getTexture, getMostCreated };
