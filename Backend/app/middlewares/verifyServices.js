const db = require("../models");
const services = db.Services;

checkDuplicateService = (req, res, next) => {
    // Username
    services.findOne({
      title: req.body.title
    }).exec((err, services) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (services) {
        res.status(400).send({ message: "Failed! title is already in use!" });
        return;
      }
      next();
    });

    
};

// checkDuplicatePosition= (req, res, next) => {
//   // Username
//   services.find({
//     position: req.body.position
//   }).exec((err, services) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }

//     if (services) {
//       res.status(400).send({ message: "Failed! position is already in use!" });
//       return;
//     }
//     next();
//   });
  

  
// };
const verifyServices = {
  checkDuplicateService
    // checkDuplicatePosition
  };
  
  module.exports = verifyServices;