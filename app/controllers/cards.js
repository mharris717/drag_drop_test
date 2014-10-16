import Ember from 'ember';

export default Ember.ArrayController.extend({
  goodCards: Ember.computed.filterBy("content","rating","good"),
  badCards: Ember.computed.filterBy("content","rating","bad"),
  unrankedCards: Ember.computed.filterBy("content","rating","unranked")
});
