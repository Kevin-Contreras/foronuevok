var express = require("express");
var app = express.Router();
var bodyParser = require('body-parser')
var mysql2 = require("./datos")
var verdadero=0;
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.get("/",function(req,res){

    res.redirect("login.html")
  })
app.post("/sesion",urlencodedParser,function(req,res){

  mysql2.query("SELECT usuario, contrasenia FROM USUARIOS",function(err,result,fields){
   
    if(err){
      console.log(err);

    }else{
      
      for (let index = 0; index < result.length; index++) {
       
        if(result[index].usuario === req.body.usuario2 && result[index].contrasenia === req.body.contra){
         
         verdadero=1
        }else{
         verdadero=0;
        }
        
      }
      
      if(verdadero ==1){
        res.redirect("main.html")
      }else{
        res.send("el usuario o la contraseña no estan correctas")
      }
      
    }

  })
})
hola a todos

app.get("/home/:usuario",function(req,res){
  
res.redirect("main.html")
})
app.get("/register",function(req,res){
  res.redirect("index.html")                  
})
app.post("/usuarios" ,urlencodedParser, function(req,res){
   console.log(req.body)
   mysql2.query('INSERT INTO USUARIOS (usuario,contrasenia,nombre,correo) VALUES (?,?,?,?)',[req.body.usuario,req.body.password,req.body.nombre,req.body.correo],function(err,result){
    if(err){
      return res.json({ err: err });
conmo etras
ddd
     }else{
       console.log(result)
     } 
    })
   res.redirect("/")
   
})
module.exports = app;