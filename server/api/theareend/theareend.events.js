/**
 * Theareend model events
 */

'use strict';

import {EventEmitter} from 'events';
import Theareend from './theareend.model';
var TheareendEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TheareendEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Theareend.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TheareendEvents.emit(event + ':' + doc._id, doc);
    TheareendEvents.emit(event, doc);
  }
}

export default TheareendEvents;
