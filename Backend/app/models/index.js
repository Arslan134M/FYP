const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.Donations=require("./donation.model");
db.Services = require("./services.model");
db.ROLES = ["user", "admin", "moderator"];
db.mainFeatures=require("./mainFeature.model");
db.selectService=require("./selectService.model");
db.MainFeatures=["Get Services","Provide Services","Get Donations","Provide Donations"];

module.exports = db;