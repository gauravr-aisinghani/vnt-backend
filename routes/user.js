var express = require("express");
var router = express.Router();
var pool = require("./pool");

router.post("/add_new_user", function (req, res) {
  pool.query(
    "insert into user (firstname, lastname, email, phone, password, streetaddress, town, pincode, state) values (?,?,?,?,?,?,?,?,?)",
    [
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      req.body.phone,
      req.body.password,
      req.body.streetaddress,
      req.body.town,
      req.body.pincode,
      req.body.state,
    ],
    function (error, result) {
      console.log("body",req.body);
     
      if (error) {
        console.log(error);
        res.status(500).json({ status: false, message: "server error" });
      } else {
        res
          .status(200)
          .json({ status: true, message: "Sign Up Succesfully you can Login now" });
      }
    }
  );
});

router.post('/chk_user_login',function(req,res,next){
    pool.query("select * from user where (email=? or phone=?) and password=? ",[req.body.email,req.body.email,req.body.password],function(error,result){
       if(error)
       {
        console.log(error)
       return res.status(200).json({status:false,message:'Server Error'})
       }
       else
       {
        if(result.length==0)
        return res.status(200).json({status:false,message:'Invalid email address/mobile number/password'})
        else
        return res.status(200).json({data:result[0],status:true,message:' Login succesfully'})
       }
    })
   })

module.exports = router;
