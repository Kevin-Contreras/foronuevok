var express = require("express");
var router = require("./router.js")
var app = express();
app.use(router);
app.use(express.static("public"))
app.set("port",3000|process.env.PORT)


//servidor
app.listen(app.get("port"),function(){
    console.log("se conecto al localhost",app.get("port"))
})