import Ember from 'ember';
import Card from '../models/card';

export default Ember.Route.extend({
  befodreModel: function() {
    var fixtures = Card.FIXTURES;
    for(var i=0;i<fixtures.length;i++) {
      var data = fixtures[i];
      data.rev = null;
      var card = this.store.createRecord('card',data);
      card.save();
    }
  },

  model: function() {
    return this.store.find('card');
  },

  afterModel: function (recordArray) {
      // This tells PouchDB to listen for live changes and
      // notify Ember Data when a change comes in.
      new PouchDB('carddb').changes({
        since: 'now', 
        live: true
      }).on('change', function () {
        recordArray.update();
      });
    }
});
