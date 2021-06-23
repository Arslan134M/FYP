const mongoose = require("mongoose");

const Donations = mongoose.model(
  "Donations",
  new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    contactNumber:String,
    status:String,
    added_by:{
      type: mongoose.Schema.ObjectId,
      ref: "User"
    }
  })
);

module.exports = Donations;