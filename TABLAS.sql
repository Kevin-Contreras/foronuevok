USE id18705713_proyecto;
CREATE TABLE USUARIOS(
    indentificadorUsuario int NOT NULL AUTO_INCREMENT,
    usuario VARCHAR(100),
    contrasenia VARCHAR(30),
    nombre VARCHAR(50),
    correo VARCHAR(50),
     PRIMARY KEY (indentificadorUsuario)
); 
CREATE TABLE COMENTARIOS(
    id int NOT NULL AUTO_INCREMENT,
    comentario VARCHAR(200),
    fecha VARCHAR(50),
    hora VARCHAR(50),
    Identificador int, 
     PRIMARY KEY (id),
     FOREIGN KEY (Identificador) REFERENCES USUARIOS (indentificadorUsuario)
); 

