var express = require("express");
var router = express.Router();
var pool = require("./pool");

router.get('/fetch_all_shirts',function(req,res){
    pool.query("select * from product where categoryid=2",function(error,result){
        if (error) {
            console.log(error);
            res.status(500).json({ status: false, message: "server error" });
          } else {
            
            res.status(200).json({ status: true, data: result });
            
          }
    })
})

router.get('/fetch_all_jeans',function(req,res){
    pool.query("select * from product where categoryid=1",function(error,result){
        if (error) {
            console.log(error);
            res.status(500).json({ status: false, message: "server error" });
          } else {
            
            res.status(200).json({ status: true, data: result });
            
          }
    })
})

router.get('/fetch_all_jackets',function(req,res){
    pool.query("select * from product where categoryid=3",function(error,result){
        if (error) {
            console.log(error);
            res.status(500).json({ status: false, message: "server error" });
          } else {
            
            res.status(200).json({ status: true, data: result });
            
          }
    })
})

router.get('/fetch_all_tshirts',function(req,res){
    pool.query("select * from product where categoryid=4",function(error,result){
        if (error) {
            console.log(error);
            res.status(500).json({ status: false, message: "server error" });
          } else {
            
            res.status(200).json({ status: true, data: result });
            
          }
    })
})

module.exports=router;