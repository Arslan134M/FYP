const Donations=require('../models/donation.model');
var url = require('url');
const { title } = require('process');
const { serialize } = require('v8');
const User=require('../models/user.model');

exports.allDonations =async function(req, res) {
  try{
    // const user=await User.findById(req.query.id);
    // const donation=await Donations.findById(user.donation,{"_id":false,},

   await Donations.find({status:"available"},
    { "title": true, "description":true,
    "status":true,"contactNumber": true,"image":true ,
    added_by:true
  },
    function (err, donation) {
    if(err) { return handleError(res, err); }
    if (!donation){
      return res.status(500).send({error:"No data in the collection"})
  }
  else{
    return res.status(200).send({AllDonations:donation});
  }
  });
   }
 catch (err) {
  res.status(500).send(err)
 }
};

// exports.allDonations =async function(req, res) {
//     try{
//       await Donations.find({},(err,donations)=>{
  
//         if (err){
//         return  res.status(500).send(err)
//         }
    
//         if (!donations){
//             return res.status(500).send({error:"No data in the collection"})
//         }
    
//         res.send({AllDonations:donations})
    
//     })
//      }
//    catch (err) {
//     res.status(500).send(err)
//    }
//   };


  exports.addDonation =async (req, res) => {
    const donations = new Donations({
               title: req.body.title,
               description: req.body.description,
               image:req.body.image,
               status: "available",
               contactNumber:req.body.contactNumber,
               added_by:req.query.id
    });
  const user=await User.findById(req.query.id);
  if(user){
  
    donations.save((err, donation) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (req.body.title) {
        Donations.find(
          {
            title: { $in: req.body.title }
          },
          (err, title) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
           // user.roles = roles.map(role => role._id);
           donations.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
  
              res.send({ message: "donation was registered successfully!" });
            });
            
            // var authorities = [];
            // for (let i = 0; i < user.donation.length; i++) {
            //   authorities.push("Donation_" + user.donation[i]._id);
            //   console.log(user.donation[i]);
           // }
            //console.log(authorities);
            user.donation =donation._id;
            user.save();
          }
        );
      } else {
        Donations.findOne({ title: req.body.title }, (err, title) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          //user.roles = [role._id];
          donations.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            user.donation = donation.map(donation => donation._id);
            user.save();

            res.send({ message: "Donation was registered successfully!" });
          });
        });
      }
    });
   }
  
  };

  exports.deleteDonation=async (req,res)=>{
    try{  
  const myquery = { _id:req.query.id  };
  const newvalues = { $set: {status: "false" } };
  Donations.updateOne(myquery, newvalues, function(err, result) {
    if (err) throw err;
      if(result){
          (res.status(200).json({
            status:"success",
            message:"Donation deleted successfuly"
     })
      );
      }
      if (!result) 
      {
        es.status(404).send("No Donation found")
      }
    });

    }
       catch (err) {
       res.status(500).send(err)
       }
  };

  exports.updateDonation=async (req,res)=>{
    try{  
      const ido=await Donations.findById(req.query.id);
      console.log(ido);
      const result=await Donations.findByIdAndUpdate(ido._id,req.body,{new:true,runValidators:true});

      if(result){
          (res.status(200).json({
          status:"success",
         message:"Donation updated successfuly"
     })
      );
  }
      if (!result) 
      {res.status(404).send("No Donation found")
  }
    }
       catch (err) {
       res.status(500).send(err)
       }     
  };

  
  exports.byDonationId =async (req, res) => {
    try {   
  const user=await User.findById(req.query.id);
 //   console.log(user.query.id);
   //console.log(user.donation);
  // const ido=await Donations.findById(req.query.id);
  //     console.log(ido);
//const donation=await Donations.findById(req.query.id,{"_id":false});
    const donation=await Donations.findById(user.donation,{"_id":false,});
   if(donation)
  res.status(200).send(donation);
   if (!user) res.status(404).send("No Donation found");
    }
  catch (err) {
    res.status(500).send(err)
  }
};

