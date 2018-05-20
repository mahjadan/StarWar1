const rp = require('request-promise');
const Planet =require('./planet-model.js')
const async =require('async');

var exports= module.exports={};
var allFilmsUrl=[];
var url = 'http://swapi.co/api/planets/?search='
var options={
    uri: '',
    json:true
  };

//Search the StarWar API by the planet name,
// then get the list of all the films.
// pass the films URL to Myrequest function to retrieve the
// name and text of each film.
//send the array to be shown on getbyname.


exports.getFilms = (req,resp )=> {
    options.url= url + req.params.planetName;
  var  filmsInfo=[];

    Planet.findOne({name: req.params.planetName}
    ).then(planet =>{
      if(!planet){
            return resp.status(404).send({message: "Planet with this Name not found: " +req.params.planetName });
      }else{
              //if the planet was found in MongoDB.
            rp(options).then((searchRes)=>{     //make a request to API to find the same name.
                if(!searchRes){
                    console.log('can not find this planet.....');
                    return ;
                }else if(searchRes.count > 0){  //check if the query returns result.
                    console.log('Number of results =' + searchRes.count);
                    allFilmsUrl=searchRes.results[0].films; //get the relevant film URLs
                    console.log(allFilmsUrl);
                    var ps =[];
                    for (var i=0;i<allFilmsUrl.length;i++){
                        ps.push(rp({uri:allFilmsUrl[i],json:true}));
                    }
                    Promise.all(ps)   //get the results of all the films in the form of array.
                                  .then((results)=>{
                                    var filmNames=results.map(function(onePlanet,index,array){
                                      return onePlanet.title; //extract only the title from the array and save it to new array.
                                    });
                                    filmsInfo.push(planet);
                                    filmsInfo.push(filmNames);
                                    console.log('number of results=' +results.length);
                                    console.log(filmNames);
                                    resp.send(filmsInfo);
                                  }).catch(err => console.log(err));
                }
                else{
                    filmsInfo.push(planet);
                    return resp.send(filmsInfo);
                }
             }).catch(function (err){
               console.log('Something went wrong while retreiving data: ' +err.message);
             });
        }
}).catch(err =>{
  console.log('Error occured while getting the films.....' + err.message);
});
};
