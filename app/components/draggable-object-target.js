import Ember from 'ember';

export default Ember.Component.extend({
  content: function() {
    return [];
  }.property(),

  handlePayload: function(payload) {
    var data = JSON.parse(payload);
    var obj = Ember.Object.create({id: data.id});
    this.get('content').pushObject(obj);
  },

  handleDrop: function(event) {
    var dataTransfer = event.originalEvent.dataTransfer;
    var payload = dataTransfer.getData("Text");
    this.handlePayload(payload);
  }
});