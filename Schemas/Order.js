const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  email: String,
  buyer_name: String,
  vendor_name: String,
  quantity: Number,
  product_id: String,
  category: [String], 
});

module.exports = mongoose.model("Order", orderSchema);
