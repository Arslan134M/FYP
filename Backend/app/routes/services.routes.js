const { authJwt } = require("../middlewares");
const { verifyServices } = require("../middlewares");
const controller = require("../controllers/services.controller");
const multer=require("multer");
const upload=require("../controllers/services.controller");


var url = require('url');
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });



  app.post("/api/addService",
  [verifyServices.checkDuplicateService],
  controller.addService);

  app.delete("/api/deleteService",
    controller.deleteService);

    app.patch("/api/updateService",
    controller.updateService);

    app.get("/api/byServiceId",
    controller.byServiceId);
    
    app.get("/api/allServices",
    controller.allServices);

    app.get("/api/hireMe",
   [controller.hireMe]);
   
   app.patch("/api/updateImage",
   controller.uploadphoto,
   controller.updateServiceImage
   );
    
}
