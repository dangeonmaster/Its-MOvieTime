'use strict';

import mongoose from 'mongoose';

var MoviesendpointSchema = new mongoose.Schema({
  Title:{ type:String,required:[true]},
  Langauge: { type:String,required:[true]},
  Poster:{ type:String},
  Director:{ type:String,required:[true]},
  Runtime:{ type:String,required:[true]},
  Genre:{ type:String,required:[true]},
  Actors:{ type:String,required:[true]},
  Year:{ type:String,required:[true]},
  Status: false
});

export default mongoose.model('Moviesendpoint', MoviesendpointSchema);
