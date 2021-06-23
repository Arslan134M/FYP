const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const services=db.Services;
const Donation=db.Donations;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { Services, Donations } = require("../models");

exports.signup = async (req, res) => {
  const user = new User({
    username: req.body.username,
    fullName:req.body.fullName,
    email: req.body.email,
    image:req.body.image,
    password: req.body.password,
    location: req.body.location,
    status:req.body.status,
    //service:req.body.service,
    working_history:req.body.working_history,
    //donation:req.body.donation,
    rating:req.body.rating,
    ratingCounter:0,
    totalRating:0
  });
const salt= await bcrypt.genSalt(10);
user.password=await bcrypt.hash(user.password,salt);
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map(role => role._id);
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
      });
    }

/////////donations
if (req.body.donation) {
  Donation.find(
    {
      title: { $in: req.body.donation }
    },
    (err, donation) => {
      if (err) {
       res.status(500).send({ message: err });
        return;
      }
      user.donation = donation.map(donation => donation._id);
    }
  );
} 
else {
  Donation.findOne({ name: "user" }, (err, donation) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    user.donation=[donation._id];
  });
}

//////service
    if (req.body.service) {
      services.find(
        {
          title: { $in: req.body.service }
        },
        (err, service) => {
          if (err) {
            res.status(500).send({ message: err });

            return;
          }
          user.service=service.map(service => service._id) ;
         let u= user.save((err,result) => {
            if (err) {
              //console.log(err);
              res.status(500).send({ message: err });

              return;
            }
            else{
              console.log(result)
       res.send({user:result, message: "User was registered successfully!" });

          }
          });
        }
      );
    } else {
      services.findOne({ title: req.body.service }, (err, service) => {
        if (err) {
         res.status(500).send({ message: err });

          return;
        }

        user.service = [service._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  },{}) 
    .populate("roles", "-__v").populate("service")
    .populate("donation")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log(user)

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token=jwt.sign({ id:user.id },config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      //var authorities = [];

      // for (let i = 0; i < user.donation.length; i++) {
      //   authorities.push("Donation_" + user.donation[i].title.toUpperCase());
      // }
      
      res.status(200).send({
        id: user._id,
        username: user.username,
        fullName:user.fullName,
        email: user.email,
        roles: user.roles,
        image: user.image,
        location:user.location,
        working_history:user.working_history,
        donation:user.donation,
        service:user.service,
        rating:user.rating,
        accessToken:token
      });
    });
};