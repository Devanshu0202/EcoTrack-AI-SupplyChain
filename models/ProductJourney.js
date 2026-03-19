const mongoose = require("mongoose");

const journeySchema = new mongoose.Schema({
  productId: String,
  stage: String,
  supplierId: String,
  data: {
    energyUsage: Number,
    carbonEmission: Number,
  },
  version: Number,
  isLatest: Boolean,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ProductJourney", journeySchema);
