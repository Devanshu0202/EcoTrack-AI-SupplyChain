const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: String,
  location: String,
  energyLogs: [Number],
  claimedEmission: Number,
});

module.exports = mongoose.model("Supplier", supplierSchema);
