const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  qrCode: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
