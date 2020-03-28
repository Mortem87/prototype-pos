'use strict'
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var jwt = require('../services/jwt');
function pruebas(req, res){
    res.status(200).send({
        message: 'Probando una accion del controlador en el api rest.'
    });
}

function saveUser(req, res){
    var user = new User();

    var params = req.body;
    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';
    if(params.password){
        //Encriptar contraseña y guardar datos.
        bcrypt.hash(params.password, 8, function(err, hash) {
            user.password = hash;

            if(dataUserIsOk(user, res)){
                user.email = user.email.toLowerCase();
                console.log('user.password:' + user.password);
                user.save((err, userStored) =>{
                    if(err){
                        res.status(500).send({message:'Error al guardar el usuario.'});
                    }else{
                        if(!userStored){
                            res.status(404).send({message:'No se ha registrado el usuario.'});
                        }else{
                            res.status(200).send({user: userStored});
                        }
                    }
                });
            }
        });
    }else{
        res.status(200).send({message:'Introduce la contraseña.'});
    }
}
function dataUserIsOk(user, res){
    var bname = user.name != null;
    var bsurname = user.surname != null;
    var bemail = user.email != null;
    if(bname && bsurname && bemail){
        return true;
    }else{
        var mensaje='parámetro ';
        if(!bname){
            mensaje += '[name]';
        }
        if(!bsurname){
            if(mensaje != 'parámetro '){
                mensaje+= ' ,';
            }
            mensaje += '[surname]';
        }
        if(!bemail){
            if(mensaje != 'parámetro '){
                mensaje+= ' ,';
            }
            mensaje += '[mail]';
        }
        mensaje += ' aún vacío.';
        res.status(200).send({message : mensaje});
    }
}
function loginUser(req, res){
    var params = req.body;

    var email = params.email.toLowerCase();
    var password = params.password;

    User.findOne({ email: email}, (err, user) => {
        if(err){
            res.status(500).send({message: 'Error en la petición.'});
        }else{
            if(!user){
                res.status(404).send({message: 'El usuario no existe.'});
            }else{
                bcrypt.compare(password, user.password, function(err, check){
                    if(check){
                          //devolver los datos del usuario logueado.
                        if(params.gethash){
                            //devolver un token de jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        }else{
                            res.status(200).send(user);
                        }
                    }else{
                        res.status(404).send({message: 'El usuario no ha podido loguearse.'});
                    }
                });
            }
        }
    }

    );
}
function updateUser(req, res){
    var user = new User();

    var update = req.body;
    console.log(update);

    user.name = update.name;
    user.surname = update.surname;
    user.email = update.email;
    user.role = 'ROLE_USER';
    user.image = 'null';

    var userId = req.params.id;

    if(dataUserIsOk(user, res)){
        User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al actualizar el usuario.'});
        }else{
            if(!userUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el usuario.'});
            }else{
                res.status(200).send({user: userUpdated});
            }
        }
    });
}
}
function uploadImage(req, res){
    var userId = req.params.id;
    var file_name = 'No subido...';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path .split('\\');
        var file_name = file_split[file_split.length - 1];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        console.log(file_path);
        console.log(file_split);
        console.log(file_name);
        console.log(file_ext);

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            User.findByIdAndUpdate(userId, {image: file_name},(err, userUpdated)=>{
                if(!userUpdated){
                    res.status(404).send({message: 'No se ha podido actualizar el usuario.'});
                }else{
                    res.status(200).send({user: userUpdated});
                }
            });
        }else{
            res.status(200).send({message: 'Extensión del archivo no válida.'});
        }
        
    }else{
        res.status().send({message: 'No has subido ninguna imagen...'});
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/' + imageFiles;
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status().send({message: 'No existe la imagen...'});
        }
    });

}
module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
}