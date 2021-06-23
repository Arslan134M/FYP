// const mongoose = require("mongoose");
//  const User = mongoose.model(
//   "User",
//   new mongoose.Schema({
//     username: String,
//     email: String,
//     password: String,
//     image: String,
//     location: {
//       type: {
//         type: String, // Don't do `{ location: { type: String } }`
//         enum: ['Point'], // 'location.type' must be 'Point'
//         required: true
//       },
//       coordinates: {
//         type: [Number],
//         required: true
//       }
//     },
   
//     working_history:[
//       {
//         type:Object,
//         properties:{
//         work_title:String,
//         start_date:Date,
//         end_date:Date,
//        details:String,
//        privacy:Boolean
      
//         }
//       }
//     ],
//     roles: [
//       {
//         type: mongoose.Schema.ObjectId,
//         ref: "Role"
//       }
//     ]
//   })
// );


// module.exports = User;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var MessageSchema =  new Schema({
  username: String,
  fullName:String,
  phone:String,
  email: String,
  password: String,
  image: String,
  status:String,
  rating:Number,
  ratingCounter:Number,
  location: {
    type: {
      type: String, 
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address:String
  },
 
  working_history:[
    {
      type:Object,
      properties:{
      work_title:String,
      position:String,
      start_date:Date,
      end_date:Date,
     details:String,
     privacy:Boolean
    
      }
    }
  ],
  donation:[
    {
      type:mongoose.Schema.ObjectId,
      ref:"Donations"
    }
  ]
  ,
  service: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Services"
    }
  ],
  roles: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Role"
    }
  ]
})
MessageSchema.index({ location: "2dsphere" });
var User = mongoose.model("User", MessageSchema);
module.exports = User;