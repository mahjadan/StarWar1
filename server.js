const express = require('express');
const bodyParser = require('body-parser');

const app= express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())  // parse application/json

//database Configuration.

const dbConfig = require('./database-URL.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Database connection.
mongoose.connect(dbConfig.url).then(()=>{
  console.log('connected to the database sucessfully...');
}).catch(err =>{
  console.log('can NOT connect to the database.' + err.message);
  console.log('Exiting now...');
  process.exit();
});

app.get('/',(req,res)=>{
    res.send('Welcome to StarWar application,\n Here are the available options:\n http://localhost:3000/planets/id    is used to Search or Delete by Id with GET and DELETE.  \n http://localhost:3000/planets/name/name    is used to search by Name. \n http://localhost:3000/planets     is used to List all the planets.\n http://localhost:3000/planets/id    also be used to Update or Create with PUT and POST. \n ');
  });

//passing app to the routes module
require('./planet-routes.js')(app);

  // start the server and listen on port 3000
app.listen(3000,()=>{
  console.log('Server started and listening on port 3000..');
});
