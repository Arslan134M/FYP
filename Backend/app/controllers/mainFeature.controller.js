const mainFeature=require('../models/mainFeature.model');
var url = require('url');

exports.addFeature =async (req, res) => {
    const feature = new mainFeature({
               title: req.body.title,
               status:req.body.status,
               redirectUrl:req.body.redirectUrl
    });
  
    feature.save((err, feature) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (req.body.title) {
        mainFeature.find(
          {
            title: { $in: req.body.title }
          },
          (err, title) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
           // user.roles = roles.map(role => role._id);
           feature.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
  
              res.send({ message: "Feature was registered successfully!" });
            });
          }
        );
      } else {
        mainFeature.findOne({ title: req.body.title }, (err, title) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  

          feature.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
  
            res.send({ message: "feature was registered successfully!" });
          });
        });
      }
    });
  };

  exports.deleteFeature=async (req,res)=>{
    try{  
  const myquery = { _id:req.query.id  };
  const newvalues = { $set: {status: "false" } };
   mainFeature.updateOne(myquery, newvalues, function(err, result) {
    if (err) throw err;
      if(result){
          (res.status(200).json({
          status:"success",
         message:"Main Feature deleted successfuly"
     })
      );
      }
      if (!result) 
      {
          res.status(404).send("No feature is found")
    }
    });

    }
       catch (err) {
       res.status(500).send(err)
       }
  };

  exports.updateFeature=async (req,res)=>{
    try{  
      const ido=await mainFeature.findById(req.query.id);
      console.log(ido);
      const result=await mainFeature.findByIdAndUpdate(ido._id,req.body,{new:true,runValidators:true});

      if(result){
          (res.status(200).json({
          status:"success",
         message:"Main Feature updated successfuly"
     })
      );
  }
      if (!result) 
      {res.status(404).send("No Feature found")
  }
    }
       catch (err) {
       res.status(500).send(err)
       }     
  };

  exports.byFeatureId =async (req, res) => {
    try {   
  
  const feature=await mainFeature.findById(req.query.id);
    console.log(feature);
    res.status(200).send(feature);
   if (!user) res.status(404).send("No feature found")
    res.status(200).send()
    }
  catch (err) {
    res.status(500).send(err)
  }
};

exports.allFeatures=async function(req, res) {
        try{
          await mainFeature.find({},(err,features)=>{
      
            if (err){
            return  res.status(500).send(err)
            }
        
            if (!features){
                return res.status(500).send({error:"No data in the collection"})
            }
        
            res.send({AllFeatures:features})
        
        })
         }
       catch (err) {
        res.status(500).send(err)
       }
     };
