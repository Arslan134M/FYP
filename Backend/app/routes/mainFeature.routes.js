const { authJwt} = require("../middlewares");
const controller = require("../controllers/mainFeature.controller");

var url = require('url');
const verifyFeature = require("../middlewares/verifyFeature");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

    app.post("/api/addFeature",
    verifyFeature.checkDuplicateFeature,
    controller.addFeature);

   app.delete("/api/deleteFeature",
    controller.deleteFeature);

    app.patch("/api/updateFeature",
    controller.updateFeature);

    app.get("/api/feature",
    controller.byFeatureId);
    app.get(
    "/api/allFeatures",
    controller.allFeatures
  )


};


