const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  buyer_email: String,
  vendor_email:String,
  buyer_name: String,
  vendor_name: String,
  price:Number,
  address:String,
  image:String,
  brand:String,
  quantity: Number,
  product_id: String,
  category: [String], 
});

module.exports = mongoose.model("Order", orderSchema);
