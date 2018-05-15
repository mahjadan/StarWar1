const mongoose = require('mongoose');

const PlanetSchema= mongoose.Schema({
//  id: {type: Number, required:true,unique:true },
  name: { type: String, lowercase:true, required: true, unique: true, trim: true },
  climate: {type: String, default: 'Uknown'},
  terrain: {type: String, default: 'Uknown'}
});

module.exports = mongoose.model('Planet', PlanetSchema);
