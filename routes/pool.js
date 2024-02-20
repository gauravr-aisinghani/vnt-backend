var mysql=require("mysql")
var pool=mysql.createPool(
    {
        host:'localhost',
        port:3306,
        user:'root',
        password:'ritik56789',
        database:'vnt',
        multipleStatements:true,
        connectionLimit:50
    }
)
module.exports=pool