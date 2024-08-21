const mongoose = require("mongoose");

const TextureSchema = new mongoose.Schema(
  {
    texture: { type: String, required: true },
    coords: { type: Object, required: true },
    createdBy: { type: String, required: true },
    geoCode: { type: String, required: false },
  },
  {
    collection: "textures",
  }
);

const Texture = mongoose.model("TextureSchema", TextureSchema);

module.exports = Texture;
