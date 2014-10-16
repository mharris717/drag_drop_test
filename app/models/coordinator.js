import Ember from 'ember';
import ObjHash from './obj-hash';

export default Ember.Object.extend(Ember.Evented, {
  objectMap: function() {
    return ObjHash.create();
  }.property(),

  getObject: function(id) {
    var payload = this.get('objectMap').getObj(id);

    if (payload.ops.source) {
      payload.ops.source.sendAction();
    }

    this.trigger("objectDropped", {obj: payload.obj});

    return payload.obj;
  },

  setObject: function(obj,ops) {
    ops = ops || {};
    return this.get('objectMap').add({obj: obj, ops: ops});
  },

  moveCallbacks: [],
  registerCallsback: function(f) {
    this.get("moveCallbacks").pushObject(f);
  }
});