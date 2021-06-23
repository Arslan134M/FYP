const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const verifyServices = require("./verifyServices");
const verifyDonation = require("./verifyDonation");

module.exports = {
  authJwt,
  verifySignUp,
  verifyServices,
  verifyDonation
};
