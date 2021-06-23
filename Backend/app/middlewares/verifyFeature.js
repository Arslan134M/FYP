const { MainFeatures } = require("../models");
const db = require("../models");
const mainFeature = require("../models/mainFeature.model");
const mainFeatures = db.mainFeatures;

checkDuplicateFeature = (req, res, next) => {
    // Username

    console.log(req.body);
    
    mainFeatures.findOne({
      title: req.body.title,
      description:req.body.description
    }).exec((err, feature) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (feature) {
        res.status(400).send({ message: "Failed! title is already in use!" });
        return;
      }
      next();
    });

    
    
};


const verifyFeature = {
  checkDuplicateFeature
  };
  
  module.exports = verifyFeature;