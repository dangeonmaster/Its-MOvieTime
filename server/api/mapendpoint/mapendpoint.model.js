'use strict';

import mongoose from 'mongoose';

var MapendpointSchema = new mongoose.Schema({
  MovieName:{
    type:String,
    required:[true]

  },
  location:{
    type:String,
    required:[true]

  },

  theatreName:{
    type:String,
    reuired:[true]
  },

  time:{
    type:Array,
    required:[true]

  },

  date:{
    type:Array,
    required:[true]

  },

Status : false
});

export default mongoose.model('Mapendpoint', MapendpointSchema);
