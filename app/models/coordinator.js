import Ember from 'ember';
import ObjHash from './obj-hash';

export default Ember.Object.extend({
  objectMap: function() {
    return ObjHash.create();
  }.property(),

  getObject: function(id) {
    return this.get('objectMap').getObj(id);
  },

  setObject: function(obj) {
    return this.get('objectMap').add(obj);
  }
});