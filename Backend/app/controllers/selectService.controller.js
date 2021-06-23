const Services = require("../models/services.model");
const db = require("../models");
const SelectService = require("../models/selectService.model");
var url = require("url");
//const { title } = require('process');
const User = require("../models/user.model");
var Join = require("mongo-join").Join;
const { collection, aggregate } = require("../models/services.model");

exports.selectService = async (req, res) => {
  const service = new SelectService({
    user_id: req.headers.user_id,
    service_id: req.headers.service_id,
    servicetaker_id: req.headers.servicetaker_id,
    hiring_date: req.body.hiring_date,
    create_at: req.body.create_at,
    updated_at: req.body.updated_at,
    status: "pending",
  });
  service.save((err, service) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.headers.service_id) {
      Services.find(
        {
          _id: { $in: req.headers.service_id },
        },
        (err, _id) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          // user.roles = roles.map(role => role._id);
          service.save((err, r) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({
              message: "service was registered successfully!",
              data: r,
            });
          });
        }
      );
    } else {
      Services.findOne({ _id: req.headers.service_id }, (err, _id) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        //user.roles = [role._id];
        service.save((err, r) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({
            message: "service was registered successfully!",
            data: r,
          });
        });
      });
    }
  });
};

exports.byUser = async (req, res) => {
  try {
    console.log("req.query.id", req.query.id);
    await SelectService.find({ servicetaker_id: req.query.id })
      .populate("servicetaker_id")
      .populate("user_id ")
      .populate("service_id")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (user) {
          return res.status(200).send({ user });
        }
      });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.recieveRequests = async (req, res) => {
  try {
    await SelectService.find({ user_id: req.query.id })
      .populate("servicetaker_id")
      .populate("user_id ")
      .populate("service_id")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (user) {
          return res.status(200).send({ user });
        }
      });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updatesOnRequest = async (req, res) => {
  try {
    const myquery = { _id: req.query.id };
    const newvalues = { $set: { status: req.body.status } };
    SelectService.updateOne(myquery, newvalues,async function (err, result) {
      if (err) throw err;
      if (result) {
        await SelectService.find({ _id: req.query.id })
        .populate("servicetaker_id")
        .populate("user_id ")
        .populate("service_id")
        .exec((err, user) => {
          if (err) {
            return res.status(500).send({ message: err });
            // return;
          }
          if (user) {
            return res.status(200).send({ user });
          }
        });
        // res.status(200).json({
        //   data:result,
        //   Request: "success",
        //   message: "service request",
        //   // Status:req.body.status
        // });
      }
      if (!result) {
        es.status(404).send("No record found");
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
