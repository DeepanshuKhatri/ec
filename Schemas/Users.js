const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name:String,
    email:String, 
    disabled:Boolean,
    password:String,
    role:String,
    cart:[[String, Number]]
})

module.exports = mongoose.model("Users", userSchema);