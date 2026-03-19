const Product = require("../models/Product");
const ProductJourney = require("../models/ProductJourney");
const Supplier = require("../models/Supplier");

// Add Product
const addProduct = async (data) => {
  return await Product.create(data);
};

// Add Stage (Versioning Logic)
const addStage = async (productId, stage, supplierId, data) => {
  const last = await ProductJourney.findOne({
    productId,
    isLatest: true,
  });

  let version = 1;

  if (last) {
    version = last.version + 1;

    // Old version inactive
    await ProductJourney.updateOne(
      { _id: last._id },
      { isLatest: false }
    );
  }

  return await ProductJourney.create({
    productId,
    stage,
    supplierId,
    data,
    version,
    isLatest: true,
  });
};

// Get Product Journey
const getProductJourney = async (productId) => {
  return await ProductJourney.find({ productId }).sort({ version: 1 });
};

// Add Supplier
const addSupplier = async (data) => {
  return await Supplier.create(data);
};

// Risk Detection
const getSupplierRisk = async (supplierId) => {
  const supplier = await Supplier.findById(supplierId);

  const avg =
    supplier.energyLogs.reduce((a, b) => a + b, 0) /
    supplier.energyLogs.length;

  let risk = "LOW";

  if (supplier.claimedEmission === 0 && avg > 300) {
    risk = "HIGH ⚠️";
  }

  return {
    supplier: supplier.name,
    risk,
  };
};

module.exports = {
  addProduct,
  addStage,
  getProductJourney,
  addSupplier,
  getSupplierRisk,
};
