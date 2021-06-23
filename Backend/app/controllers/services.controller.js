const Services=require('../models/services.model');
const db = require("../models");
var url = require('url');
const { title } = require('process');
const { serialize } = require('v8');
const User = require("../models/user.model");
var Join = require('mongo-join').Join;
const { collection, aggregate } = require('../models/services.model');
const multer=require("multer");
const { stat } = require('fs');


const multerStorage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'images/services');
  },
  filename:(req,file,cb)=>{
    const ext=file.mimetype.split('/')[1];
    //console.log(ext);
    cb(null,file.originalname);
  }
});
const multerFilter=(req,file,cb)=>{
  if(file.mimetype.startsWith('image')){
    cb(null,true)
  }
  else{
   cb(new AppError('Not an image! please upload image only. ',400),false);
  }
};
const upload=multer({
storage:multerStorage,
fileFilter: multerFilter
});
exports.uploadphoto=upload.single('photo');

exports.updateServiceImage = (req, res)=> {
  console.log(req.file);
  console.log(req.query.id);
  //console.log(req.file.path);
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');
   // console.log(req.userId);
   const idOfUser=url.parse(req.url);
   const idUser=idOfUser.query;
   console.log(req.query.id);

    const myquery = { _id:req.query.id };
    const newvalues = { $set: {image: req.file.path } };
     Services.findByIdAndUpdate(req.query.id, newvalues , 
      function(err, result){
      if(result){
          (res.status(200).json({
          status:"success",
         message:"service image updated successfuly"
     })
      );
      }
      if (!result) 
      {
          res.status(404).send("No  service is found")
    }
  }); 
  }
};
////delete service
exports.deleteService=async (req,res)=>{
  try{  

      const ido=await Services.findById(req.query.id);
      
    const myquery = { _id:ido};
  const newvalues = { $set: {status: "false" } };
   Services.updateOne(myquery, newvalues, function(err, result) {
    if (err) throw err;
      if(result){
          (res.status(200).json({
          status:"success",
         message:"Service deleted successfuly"
     })
      );
      }
      if (!result) 
      {
          res.status(404).send("No  Services is found")
    }
    });
  //   if(result){
  //       (res.status(200).json({
  //       status:"success",
  //      message:"service deleted successfuly"
  //  })
  //   );
//}
    // if (!result) 
    // {res.status(404).send("No service found")
//}
  }
     catch (err) {
     res.status(500).send(err)
     }
}

exports.updateService=async (req,res)=>{
    try{  
      const ido=await Services.findById(req.query.id);
      console.log(ido);
      const result=await Services.findByIdAndUpdate(ido._id,req.body,{new:true,runValidators:true});

      if(result){
          (res.status(200).json({
          status:"success",
         message:"service updated successfuly"
     })
      );
  }
      if (!result) 
      {res.status(404).send("No service found")
  }
    }
       catch (err) {
       res.status(500).send(err)
       }     
  }
//// get by service ID
  exports.byServiceId =async (req, res) => {
    try {   
  
  const service=await Services.findById(req.query.id);
    console.log(service);
    res.status(200).send(service);
   if (!user) res.status(404).send("No user found")
    res.status(200).send()
    }
  catch (err) {
    res.status(500).send(err)
  }
}

/////allServices
exports.allServices =async function(req, res) {
    try{
      const myquery = { status: "avaiable"  };
      await Services.find(myquery,{},(err,services)=>{
  
        if (err){
        return  res.status(500).send(err)
        }
    
        if (!services){
            return res.status(500).send({error:"No data in the collection"})
        }
    
        res.send({AllServices:services})
    
    })
     }
   catch (err) {
    res.status(500).send(err)
   }
  };

  exports.addService =async (req, res) => {
    const service = new Services({
               title: req.body.title,
               description: req.body.description,
               image:req.body.image,
               status: req.body.status
              //, position:req.body.position
    });
  
    service.save((err, service) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (req.body.title) {
        Services.find(
          {
            title: { $in: req.body.title }
          },
          (err, title) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
           // user.roles = roles.map(role => role._id);
           service.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
  
              res.send({ message: "service was registered successfully!" });
            });
          }
        );
      } else {
        Services.findOne({ title: req.body.title }, (err, title) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          //user.roles = [role._id];
          service.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
  
            res.send({ message: "service was registered successfully!" });
          });
        });
      }
    });
  };

  exports.hireMe =async (req, res) => {

   // console.log(req.body.service);
    console.log(req.body);
  

    try {
       Services.aggregate([
        {
          $match:{
            title:req.body.service
          }
        },  
        {
          $lookup: {
               from: 'users',   //other table name
               localField:'service',  //name of local table field
               foreignField:'id',   //name of foreign table field
               as: 'users'    //alias for other table
           }
        }, 
           
           {
              $unwind: {
                  path: '$users'// $unwind used for getting data in object or for one record only
              }
          },
          {
            $project: {
              _id:1,
              title:1,
              description:1,
              image:1,
              userName:'$users.username',
              email:'$users.email',
              location:'$users.location',
              working_history:'$users.working_history'

            }
          },
          // {
          //   $group:{
          //     work_title:'$users.work_title'
          //   }
          // }
       ])
       .then((result, error ) => {
        console.log(result);
          res.status(200).send(result);
          if(error){
            res.status(500).send(error);
          }
      });
  } catch (error) {
      res.send(error)
  }
  };