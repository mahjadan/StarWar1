const request = require('request');
const rp = require('request-promise');
const Planet =require('./planet-model.js')
const async = require('async');

var exports= module.exports={};
var allFilmsUrl=[];
var allFilms=[{title:'',text:''}];
var url = 'http://swapi.co/api/planets/?search='
var options={
    url: '',
    json:true
  };

  // var all=[];
  var tempPlanet;

//Search the StarWar API by the planet name,
// then get the list of all the films.
// pass the films URL to __request function to retrieve the
// name and text of each film.

var filmsInfo =[{}];

exports.getFilms = (req,resp )=> {
    options.url= url + req.params.planetName;
    Planet.findOne({name: req.params.planetName}
    ).then(planet =>{
      if(!planet){
            return resp.status(404).send({message: "Planet with this Name not found: " +req.params.planetName });
      }else{
              //if the planet was found.
            rp(options).then((searchRes)=>{     //make a request to API to find the same name.
                if(!searchRes){
                    console.log('can not find this planet.....');
                    return ;
                }else if(searchRes.count > 0){  //check if the query returns result.
                    console.log('Number of results =' + searchRes.count);
                    allFilmsUrl=searchRes.results[0].films; //get the relevant film URLs
                    console.log(allFilmsUrl);
                      filmsInfo=[{}];   // clear the array..
                      //add the films information to the array to be displayed later with planet.
                      filmsInfo.push(planet);
                // get the name and descriptions of each film URL. save them in filmsInfo
                    MyRequest(allFilmsUrl, function (allfilms)
                     {
                       console.log('Number of requests to be made = ' +allFilms.length);
                    filmsInfo.push(allFilms);
                    });
                    // send both films information and planet.
                    return resp.send(filmsInfo);
                }
                else{
                  // send only the Planet
                   return resp.send(planet);
                }
             });
        }

}).catch(err =>{
  console.log('Error occured while getting the films.....' + err.message);
});
};




//this funtion is used to consequently retrieve the film name and text on each URL.
 var MyRequest= function (url, callback ){
var all=[];
      for(var i=0; i< url.length; i++)
      {
        request({
            url:url[i],
            json:true
          }, (error, response, body) =>{
        if(error){
              console.log('Error while retrieving Films. ' + error.message);
            }else{
                console.log(body.title);
                console.log('-------------------');
                console.log(body.opening_crawl);
                var f={title: body.title,
                text: body.opening_crawl
                };
                all.push(f);
               {callback(all)};
             }
          })
      }
};
