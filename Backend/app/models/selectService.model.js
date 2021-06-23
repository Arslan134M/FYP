const mongoose = require("mongoose");

const SelectServices = mongoose.model(
  "SelectServices",
  new mongoose.Schema({
    // user_id: String,
    // service_id: String,
    user_id:
      {
        type: mongoose.Schema.ObjectId,
        ref: "User"
      }
    ,
    servicetaker_id:
      {
        type: mongoose.Schema.ObjectId,
        ref: "User"
      }
    ,
    service_id:
      {
        type: mongoose.Schema.ObjectId,
        ref: "Services"
      }
    ,
   
    create_at:Date,
    updated_at:Date,
    hiring_date:Date,
    status: String
  })
);

module.exports = SelectServices;
