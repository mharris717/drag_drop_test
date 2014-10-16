import Ember from 'ember';
import Droppable from '../mixins/droppable';

export default Ember.Component.extend(Droppable, {
  content: function() {
    return [];
  }.property(),

  handlePayload: function(payload) {
    var obj = this.get('coordinator').getObject(payload);
    this.get('content').pushObject(obj);
  },

  handleDrop: function(event) {
    var dataTransfer = event.originalEvent.dataTransfer;
    var payload = dataTransfer.getData("Text");
    this.handlePayload(payload);
  },

  acceptDrop: function(event) {
    this.handleDrop(event);
  },

  actions: {
    acceptForDrop: function() {
      var hashId = this.get('coordinator.clickedId');
      this.handlePayload(hashId);
    }
  }
});