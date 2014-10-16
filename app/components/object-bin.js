import Ember from 'ember';

export default Ember.Component.extend({
  model: [],

  forEach: function(f) {
    return this.get('model').forEach(f);
  }
});