const Planet =require('./planet-model.js')
const Films = require('./films-controller.js')



//create a new Planet..
exports.create = (req, res) => {
  if(!req.body.name) {
    console.log(req.body);
          return res.status(400).send({
              message: "Planet name can not be empty"
          });
      }
      //create a planet
      const planet =new Planet({
        name: req.body.name,
        climate:req.body.climate || 'unknown',
        terrain:req.body.terrain || 'unknown'
      });

      // write it to the DB.
      planet.save().then((doc)=>{
        res.send(doc);
      }).catch(err=>{
        res.status(500).send({message: 'can not create this record .'+ err.message});
      });
};


//show all planets
exports.getAll = (req, res) => {
    Planet.find().then(planets =>{
      if(!planets){
        return res.status(404).send({message: "No Planets are found " });
      }
      //return the result if sucessfully
        res.send(planets);
    }).catch(err =>{
        res.status(500).send({message: 'can not show all the planets. ' + err.message});
    });
};


// show the info for one planet by Id
exports.getById = (req, res) => {
  Planet.findById(req.params.planetId).then(planet =>{
    if(!planet){
        return res.status(404).send({message: "Planet with this Id not found: " +req.params.planetId });
    }
    //return the result if sucessfully
    return res.send(planet);
  }).catch(err =>{
    if(err.kind === 'ObjectId') {
        return res.status(404).send({ message: "Planet not found with Id: " + req.params.planetId });
    }
    return res.status(500).send({ message: "Error while retrieving Planet with Id: " + req.params.planetId });
  });
};




// show the info for one planet by Name
exports.getByName =(req,res)=> {
  Films.getFilms(req,res);
};



// Update a Planet with Planet-Id
exports.update = (req, res) => {
var oldName;
var oldClimate;
var oldTerrain;
if(!req.body.name){
  console.log('name cannot be empty');
}
Planet.findByIdAndUpdate(req.params.planetId, {
    name: req.body.name,
    climate: req.body.climate,
    terrain: req.body.terrain
  },{new : true }).then(planet => {
      if(!planet){
          return res.status(404).send({message : "Planet was notError while updating  found " + arams.planetId});
      }
      //return the result if sucessfully
      res.send(planet);
    }).catch(err =>{
        if(err.kind==='ObjectId'){
          return res.status(404).send({ message: "Planet was not found with this Id: " + req.params.planetId});
        }
        console.log(err);
        return res.status(500).send({ message: "Error while updating Planet with Id: " + req.params.planetId + err.message });
    });
};




// Delete a Planet with planet-Id
exports.delete = (req, res) => {
  Planet.findByIdAndRemove(req.params.planetId).then(planet =>{
     if(!planet){
        return res.status(404).send({message : "Planet with this Id was not found: " + req.params.planetId});
     }
     //return the result if sucessfully
     res.send({ message: "Planet deleted sucessfully !"  + planet });
  }).catch(err =>{
      if(err.kind==='ObjectId' || err.name=== 'NOTFOUND'){
          return res.status(404).send({ message : "Planet with this Id was not found : " +req.params.planetId});
      }
      res.status(500).send({ message: "Could not delete Planet with Id: " + req.params.planetId});
  });
};
