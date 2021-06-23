const { authJwt } = require("../middlewares");
const controller = require("../controllers/selectService.controller");


module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

app.post('/api/selectService',
controller.selectService
);
app.get('/api/userServices',
controller.byUser
);
app.get('/api/recieve-requests',
controller.recieveRequests
);

app.patch('/api/userRequest',
controller.updatesOnRequest
);

}