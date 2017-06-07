/**
 * Mapendpoint model events
 */

'use strict';

import {EventEmitter} from 'events';
import Mapendpoint from './mapendpoint.model';
var MapendpointEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MapendpointEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Mapendpoint.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MapendpointEvents.emit(event + ':' + doc._id, doc);
    MapendpointEvents.emit(event, doc);
  }
}

export default MapendpointEvents;
