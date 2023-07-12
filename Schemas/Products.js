const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    vendor_name:String,
    email:String,
    product_name:String,
    approved: String,
    // images:[String],
    desc: String,
    price:String,
    category:String,

})

module.exports = mongoose.model("Products", productSchema);