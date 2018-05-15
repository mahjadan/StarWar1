module.exports = (app) => {

const planets = require('./planet-controller.js');

//create a planet
app.post('/planets', planets.create);

// Show all the Planets
app.get('/planets', planets.getAll);

// show the info for one planet by Id
app.get('/planets/:planetId', planets.getById);

// show the info for one planet by Name
app.get('/planets/name/:planetName',planets.getByName);

// Update a Planet with Planet-Id
app.put('/planets/:planetId', planets.update);

// Delete a Planet with planet-Id
app.delete('/planets/:planetId', planets.delete);

}
