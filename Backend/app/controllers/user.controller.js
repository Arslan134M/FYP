const User = require("../models/user.model");
var url = require("url");
const db = require("../models");
var bcrypt = require("bcryptjs");
const { findByIdAndDelete, findOne } = require("../models/user.model");
const { user } = require("../models");
//const services=db.Services;
const Service = require("../models/services.model");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/profile");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    console.log("ext",`${req.query.id}.${ext}`)
    cb(null,`${req.query.id}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! please upload image only. ", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.uploadphoto = upload.single("image");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.updateProfileImage = (req, res) => {
  try{
  console.log(req.file);
  console.log(req.file.path);
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false,
    });
  } else {
    console.log("file received");
    // console.log(req.userId);
    const idOfUser = url.parse(req.url);
    const idUser = idOfUser.query;
console.log(req.file)
const ext = req.file.mimetype.split("/")[1];
const rename=`/profile/${req.query.id}.${ext}`
    const myquery = { _id: req.query.id };
    const newvalues = { $set: { image: req.file.path } };
    let users=User.findByIdAndUpdate(req.query.id, { $set: { image: rename } },{new: true, useFindAndModify: false}, async function (err, result) {
      if (result) {
        const user = await User.findById(req.query.id, {
     
          password: false,
        })
          .populate({ path: "roles" })
          .populate({ path: "service" })
          .populate({ path: "donation" })
          .exec((err, data) => {
        res.status(200).json({
          status: "success",
          message: "User image updated successfuly",
          data:data,
          file:req.file
        });})
      }
      if (!result) {
        res.status(404).send("No  User is found");
      }
    });
  }}catch(e){
    res.status(400).send(e.message);

  }
};
/////Rating
exports.updateRating = async (req, res) => {
  try {
    //  const pass=bcrypt.hashSync(req.body.password);
    console.log(req.body.rating);
    // if(req.body.rating){
    //   var getRating=req.body.rating;
    //   //console.log(req.body.rating);
    //   do{
    //   if(getRating>5){
    //       getRating=getRating/2;
    //     }
    //     else if(req.body.rating<5){
    //       getRating=getRating;
    //     }
    //   }while(getRating>5);
    //     req.body.rating=getRating;
    //   }
    const getUser = await User.findById(req.query.id);
    console.log(getUser);

    const tempRating = getUser.rating * getUser.ratingCounter + req.body.rating;
    const tempRatingCounter = getUser.ratingCounter + 1;
    getUser.ratingCounter = tempRatingCounter;
    getUser.rating = tempRating / tempRatingCounter;
    // console.log(getUser.ratingCounter);
    getUser.save({
      ratingCounter: getUser.ratingCounter,
      rating: tempRating / tempRatingCounter,
    });
    res.status(200).json({
      status: "success",
      rating: getUser.rating,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

///update
exports.update = async (req, res) => {
  try {
    // console.log(req.query.id);
    //console.log(req.query.service);
    // const user=await User.findById(req.query.id);
    // console.log(user);
    user.service = req.query.service;
    console.log("service", req.query.service);
    //   const pass=(req.body.password);
    // req.body.password=bcrypt.hashSync(pass,8);
    //  const users=await User.findByIdAndUpdate(user._id,req.body,
    //   {new:true,runValidators:true}).populate({path:'roles'}).populate({path:'service'}).populate({path:'donation'});

    User.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate({ path: "roles" })
      .populate({ path: "service" })
      .populate({ path: "donation" })
      .exec((err, data) => {
        if (err) {
          return handleError(res, err);
        }
        if (!data) {
          return res.status(500).send({ error: "No data in the collection" });
        } else {
          res.status(200).json({
            status: "success",
            user: data,
          });
        }
        //user.service = [service._id];
        // console.log(users);
        // user.save();
        // res.status(200).json({
        //   status:'success',
        //    user:users
      });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
// exports.update=async(req, res) => {
//   try {
//      //console.log(req.userId)
//    //console.log(req.body)
// //  const pass=bcrypt.hashSync(req.body.password);
//   const pass=(req.body.password);
//   req.body.password=bcrypt.hashSync(pass,8)
//      const user=await User.findByIdAndUpdate(req.userId,req.body,
//       {new:true,runValidators:true}).populate({path:'roles'});

//      //  await User.save();
//     res.status(200).json({
//       status:'success',
//        user:user
//     });

//   } catch (err) {
//     console.log(err)
//     res.status(500).send(err)
//   }
// };
///delete user
exports.deleteUser = async (req, res) => {
  try {
    // console.log(req.userId);
    // console.log(req.body);

    const myquery = { _id: req.userId };
    const newvalues = { $set: { status: "false" } };
    User.updateOne(req.query.id, newvalues, function (err, result) {
      if (err) throw err;
      if (result) {
        res.status(200).json({
          status: "success",
          message: "User deleted successfuly",
        });
      }
      if (!result) {
        res.status(404).send("No  User is found");
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

////user by id
exports.byUserId = async (req, res) => {
  try {
    console.log(req.query.id);
    const user = await User.findById(req.query.id, {
      password: false,
    })
      .populate({ path: "roles" })
      .populate({ path: "service" })
      .populate({ path: "donation" })
      .exec((err, data) => {
        if (err) {
          return handleError(res, err);
        }
        if (!data) {
          return res.status(500).send({ error: "No data in the collection" });
        } else {
          console.log(data);
          console.log(data.status);

          // if (data.status == "available")
           return res.status(200).send(data);
          // else {
          //   return res.status(500).send({ message: "user isn't available" });
          // }
        }
      });
    // console.log(user);
    //   res.status(200).send(user);
    //  if (!user) res.status(404).send("No user found")
    //   res.status(200).send()
  } catch (err) {
    res.status(500).send(err);
  }
};

////all user locations
exports.allUsersLoc = async function (req, res) {

  try {
    const long = req.body.location.coordinates[0];
    const latt = req.body.location.coordinates[1];
    const radius = req.body.location.radius;
    const service = req.body.service;
    console.log(service)
    await User.find(
      {
        location: {
          $near: {
            $maxDistance: radius,
            $geometry: {
              type: "Point",
              coordinates: [long, latt],
            },
          },
        }
       
      },
      {  password: false }
    )
      .populate({ path: "roles" })
      .populate({ path: "service" })
      .populate({ path: "donation" })
      .find({
        }, (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        } else {
          res.send({ allUsersAtLocation: results });
        }
      });
    // await User.find({},(err,users)=>{

    //   if (err){
    //   return  res.status(500).send(err)
    //   }

    //   if (!users){
    //       return res.status(500).send({error:"No data in the collection"})
    //   }

    // res.send({Allusers:users})

    // })
  } catch (err) {
    res.status(500).send(err);
  }
};

////all user
exports.allUsers2 = async function (req, res) {
  try {
    await User.find(null, { _id: false, password: false })
      .populate({ path: "roles" })
      .populate({ path: "service" })
      .populate({ path: "donation" })
      .exec((err, data) => {
        if (err) {
          return handleError(res, err);
        }
        if (!data) {
          return res.status(500).send({ error: "No data in the collection" });
        } else {
          //if(data[0].status=="available")
          return res.status(200).send({ allUsers: data });
          // else
          // return res.status(500).send({message:"user isn't available"});
        }
      });
  } catch (err) {
    res.status(500).send(err);
  }
};
