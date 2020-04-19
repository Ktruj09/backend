'use strict'

var Project = require('../model/project');
const { param } = require('../routes/projects');
var controller = {

    home: function(req, res){

        return res.status(200).send({
            message: 'Soy la Home'
        });
    },

    test:function(req, res) {
            return res.status(200).send({
                message: 'soy el metodo o acción test del controlador del project'
            });
    },

    //metodo que nos ayudara a guardar proyectos en la BD
   saveProject: function(req, res){

        var project = new Project();

        var params = req.body;
        project.name = params.name; 
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;


        //GUARDAMOS EN LA BD
        project.save((err, projectStore)=>{

            if(err) return res.status(500).send({message: 'Error en la petición para guardar el documento...'});


            //404 error no se encuentra ruta
            if(!projectStore) return res.status(404).send({message: 'No se ha podido guardar el proyecto..'});

            //200 es que todo esta correcto
            return res.status(200).send({project: projectStore});
        });
    
    },

        /**
         * metodo que nos ayudara a listar lo guardado en un documento
         */
        getProject: function(req, res){

            var projectid = req.params.id;

            Project.findById(projectid, (err, project)=>{


                //si no se coloca un id pase esto. 
                if(projectid == null){
                    return res.status(404).send({message: 'El proyecto no existe'});
                }

                //si se coloca un id y este no existe, muestra este mensaje 
                if(err) return res.status(500).send({message: 'Error al devolver los datos'});

                if(!project) return res.status(404).send({message: 'El proyecto no existe.'});

                //en este caso si muestra el id, ire a la carpeta router para ver la ruta de getProject
                return  res.status(200).send({
                    project
                });//end return 
            });

        },//end getProject

        //metodo que nos ayudara a devolver los datos almacenados en nuestra BD
        getProjects: function(req, res){

            //llamamos a nuestro modelo
            Project.find({}).exec((err, projetcs)=>{

                if(err) return res.status(500).send({message: 'Error al devolver los datos...'});

                if(!projetcs) return res.status(404).send({message: 'No hay proyectos que mostrar'});

                return res.status(200).send({projetcs});
            });

        },//end getProjects: 

        //metodo para actualizar datos
        updateProject: function(req, res){

            var projectId = req.params.id;
            var update = req.body;

            //{new: true} es utilizado para que nos devuelva el objeto nuevo, es decir, el objeto ya actualizado
            Project.findByIdAndUpdate(projectId, update, {new: true}, (err, projectUpdate)=>{

                if(err) return res.status(500).send({message: 'Error al actualizar'});

                if(!projectUpdate) return res.status(404).send({message: 'No existe el proyecto para actualizar'});

                return res.status(200).send({
                    project: projectUpdate
                });
            });
        },//end updateProject

        //metodo que servira para la eliminación
        deleteProject: function(req, res){

                var projectId = req.params.id;
                
                Project.findByIdAndDelete(projectId,{new: true},(err, projectRemove)=>{

                    if(err) return res.status(500).send({message: 'No se ha podido eliminar el archivo...'});

                    if(!projectRemove) return res.status(404).send({message: 'No se ha encontrado el archivo..'});

                    return res.status(200).send({
                            project: projectRemove 
                    });
                });

        },//end deleteProject


        //metodod para subir imagen
        uploadImage: function(req, res){

            var projectId = req.params.id;
		var fileName = 'Imagen no subida...';

		if(req.files){
			var filePath = req.files.image.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

				Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdated) => {
					if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

					if(!projectUpdated) return res.status(404).send({message: 'El proyecto no existe y no se ha asignado la imagen'});

					return res.status(200).send({
						project: projectUpdated
					});
				});

			}else{
				fs.unlink(filePath, (err) => {
					return res.status(200).send({message: 'La extensión no es válida'});
				});
			}

		}else{
			return res.status(200).send({
				message: fileName
			});
		}


            
        }//end uploadImage
};


module.exports = controller;