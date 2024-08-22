const mongoose = require("mongoose");

const TextureSchema = new mongoose.Schema(
  {
    texture: { type: String, required: true },
    coords: { type: Object, required: true },
    createdBy: { type: String, required: true },
    geoCode: { type: String, required: false, index: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "textures",
  }
);

TextureSchema.index({ createdAt: -1 });
TextureSchema.index({ geoCode: 1, coords: 1 });

const Texture = mongoose.model("TextureSchema", TextureSchema);

module.exports = Texture;
