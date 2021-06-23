const { authJwt, verifyDonations } = require("../middlewares");
const { verifyDonation } = require("../middlewares");
const controller = require("../controllers/donation.controller");
//const controller2 = require("../controllers/user.controller");

var url = require('url');
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });



  app.post("/api/addDonation",
   verifyDonation.checkDuplicateDonations,
  controller.addDonation);

  app.delete("/api/deleteDonation",
    controller.deleteDonation);

    app.patch("/api/updateDonation",
    controller.updateDonation);

    app.get("/api/DonationId",
    controller.byDonationId);
    
    app.get("/api/allDonations",
    controller.allDonations);
    
    
}
