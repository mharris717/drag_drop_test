import Ember from 'ember';
import Droppable from '../mixins/droppable';

export default Ember.Component.extend(Droppable, {
  handlePayload: function(payload) {
    var obj = this.get('coordinator').getObject(payload);
    this.trigger('objectDropped',obj);
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