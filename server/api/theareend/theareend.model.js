'use strict';

import mongoose from 'mongoose';

var TheareendSchema = new mongoose.Schema({
  TheatreName:{type:String, required:[true]} ,
  PlaceName: {type:String, required:[true]},
  City: {type:String, required:[true]}
});

export default mongoose.model('Theareend', TheareendSchema);
