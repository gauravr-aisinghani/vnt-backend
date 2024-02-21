var mysql=require("mysql")
var pool=mysql.createPool(
    {
        host:'localhost',
        port:3306,
        user:'root',
        password:'Sql@1234',
        database:'vnt',
        multipleStatements:true,
        connectionLimit:50
    }
)
module.exports=pool