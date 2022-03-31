var express = require("express");
var app = express.Router();
var bodyParser = require('body-parser')
var mysql2 = require("./datos");
const { query } = require("./datos");
var verdadero=0;
var usuario="";
var errorr="";
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.get("/",function(req,res){
  usuario="";
    res.render("login",{error:""})

  })
  app.get("/sesion",function(req,res){
    res.redirect("/")

  })
 
app.post("/sesion",urlencodedParser,function(req,res){

  mysql2.query("SELECT usuario, contrasenia FROM USUARIOS",function(err,result,fields){
   
    if(err){
      console.log(err);

    }else{
      
      for (let index = 0; index < result.length; index++) {
   
        if(result[index].usuario === req.body.usuario2 && result[index].contrasenia === req.body.contra){
         usuario = req.body.usuario2;
         verdadero=1
         break;
        }else{
         verdadero=0;
        }
        
      }
      
      if(verdadero ==1){
        res.redirect("/home")
        
      }else{
        errorr="La contraseña o el Usuario no estan correctos";
        res.render("login",{error:errorr})
        
      }
      
    }

  })
})


app.get("/home",function(req,res){
  if(usuario == "" ){
  
      res.render("login",{error:""})

  }else{
    mysql2.query("SELECT * FROM USUARIOS WHERE usuario = '"+usuario+"'",function(err,resultUsuario,fields){
      if(err){
        console.log(err)
    }else{
      mysql2.query("SELECT * FROM USUARIOS INNER JOIN COMENTARIOS ON Identificador = indentificadorUsuario;",function(err,result,fields){
        var datos =[];
        var contador=0;
        for (let index = 0; index < result.length; index++) {
          if(result[index].usuario==usuario){
            datos[contador]=result[index];
            contador=contador+1;
            
          }
          
          
        }
        console.log(datos)
        res.render("main",{dato:datos,usuario:resultUsuario})
       
      })
     
}
})



}


})
app.get("/home/:id",function(req,res){
  mysql2.query("DELETE FROM COMENTARIOS WHERE id="+req.params.id,function(err,result){
    if(err){
      console.log(err);
    }else{
      res.redirect("/home")     
    }
  })
 
})
app.get("/perfil",function(req,res){
 
  mysql2.query("SELECT * FROM USUARIOS WHERE usuario = '"+usuario+"'",function(err,result,fields){
    if(err){
      console.log(err)
    }else{
      res.render("perfil",{perfil:result})
    }
  })
})
app.post("/comentarios",urlencodedParser,function(req,res){
var time = new Date();
console.log(time.getDay()+"/"+time.getMonth()+"/"+time.getFullYear())
console.log(usuario)
mysql2.query("SELECT * FROM USUARIOS WHERE usuario = '"+usuario+"'",function(err,result,fields){
  console.log(result[0].indentificadorUsuario)
  mysql2.query("INSERT INTO COMENTARIOS (comentario,fecha,hora,Identificador) VALUES (?,?,?,?)",[req.body.comentario,time.getDay()+"/"+time.getMonth()+1+"/"+time.getFullYear(),time.getHours()+":"+time.getMinutes(),result[0].indentificadorUsuario],function(err,result){
    if(err){
      console.log(err)
    }else{
      console.log("se guardo el dato")
      res.redirect("/home")
    }
  })

})
})


app.get("/register",function(req,res){
  res.render("index")                  
})
app.post("/usuarios" ,urlencodedParser, function(req,res){
   console.log(req.body)
   mysql2.query('INSERT INTO USUARIOS (usuario,contrasenia,nombre,correo) VALUES (?,?,?,?)',[req.body.usuario,req.body.password,req.body.nombre,req.body.correo],function(err,result){
    if(err){
      return res.json({ err: err });


     }else{
       console.log(result)
     } 
    })
   res.render("login",{error:""})
   
})
app.post("/perfil/:id",function(req,res){
  mysql2.query("SELECT * FROM USUARIOS WHERE usuario = '"+req.params.id+"'",function(err,result,fields){
    if(err){
      console.log(err)
    }else{
      console.log(result[0].indentificadorUsuario)
    mysql2.query("DELETE FROM COMENTARIOS WHERE Identificador="+result[0].indentificadorUsuario,function(err,result){
      if(err){
        console.log(err)
      }else{
        mysql2.query("DELETE FROM USUARIOS WHERE usuario='"+req.params.id+"'",function(err,result){
          if(err){
            console.log(err)
          }else{
            console.log(result)
            console.log("se ha elimindado el usuario y las tareas exitosamente")
            res.render("login",{error:""})
          }
        })
      }
    })
    }
   
  })
})
module.exports = app;