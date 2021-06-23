const mongoose = require("mongoose");

const mainFeature = mongoose.model(
  "mainFeature",
  new mongoose.Schema({
    title: String,
    status:String,
    redirectUrl:String
  })
);

module.exports = mainFeature;