const mongoose = require("mongoose");

const TextureSchema = new mongoose.Schema(
  {
    img: { type: String, required: true },
    createdBy: { type: String, required: true },
    info: { type: String, required: true },
  },
  {
    collection: "textures",
  }
);

const Texture = mongoose.model("TextureSchema", TextureSchema);

module.exports = Texture;
