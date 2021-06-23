const db = require("../models");
const Donations = require("../models/donation.model");
const donations = db.Donations;

checkDuplicateDonations = (req, res, next) => {
    // Username

    console.log(req.body);
    
    Donations.findOne({
      title: req.body.title,
      description:req.body.description
    }).exec((err, donations) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (donations) {
        res.status(400).send({ message: "Failed! title is already in use!" });
        return;
      }
      next();
    });

    
    
};


const verifyDonation = {
  checkDuplicateDonations
  };
  
  module.exports = verifyDonation;