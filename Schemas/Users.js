const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name:String,
    email:String, 
    disabled:Boolean,
    password:String,
})

module.exports = mongoose.model("Users", userSchema);