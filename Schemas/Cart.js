const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  email: String,
  buyer_name: String,
  vendor_name: String,
  quantity: {
    type: Number,
    unique: true,
  },
  product_id: {
    type:String,
    unique:true 
  },
  category: [String], 
});

module.exports = mongoose.model("Cart", cartSchema);
