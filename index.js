var express = require("express");
var router = require("./APP/router.js")
var app = express();
app.use(router);
app.use(express.static("public"))
app.set("port",3000|process.env.PORT)
app.set('views', __dirname+"/public/views");
app.set('view engine', 'ejs');

//servidor
app.listen(app.get("port"),function(){
    console.log("se conecto al localhost",app.get("port"))
})