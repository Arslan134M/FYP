const mongoose = require("mongoose");

const Services = mongoose.model(
  "Services",
  new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    status: String
    // ,position: String
  })
);

module.exports = Services;
