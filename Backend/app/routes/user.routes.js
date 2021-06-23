const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
var url = require('url');
const multer=require("multer");
const upload=require("../controllers/user.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);


  
  app.patch(
    "/api/edit",
  //authJwt.verifyToken,
    controller.update
  )
  app.patch(
    "/api/rating",
   //[authJwt.verifyToken],
    controller.updateRating
  )
  
  app.delete(
    "/api/delete",
  //  [authJwt.verifyToken],
    controller.deleteUser
  )
  app.get(
    "/api",
  //  [authJwt.verifyToken],
    controller.byUserId
  );
  app.get(
    "/api/allUsers",
    // [authJwt.verifyToken],
    controller.allUsers2
  );
  ////search location
  app.post(
    "/api/allUserLoc",
    // [authJwt.verifyToken],
    controller.allUsersLoc
  );
  app.get(
    "/api/get_all_users",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.allUsers2
  );
  app.patch("/api/updateProfile",
  controller.uploadphoto,
  controller.updateProfileImage
  );
   
  
};