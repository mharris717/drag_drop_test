import Ember from 'ember';
import Droppable from '../mixins/droppable';

export default Ember.Component.extend(Droppable, {
  content: function() {
    return [];
  }.property(),

  handlePayload: function(payload) {
    var data = JSON.parse(payload);
    //var obj = Ember.Object.create({id: data.id});
    var obj = this.get('store').find(data.modelName,data.id);
    this.get('content').pushObject(obj);
  },

  handleDrop: function(event) {
    var dataTransfer = event.originalEvent.dataTransfer;
    var payload = dataTransfer.getData("Text");
    this.handlePayload(payload);
  },

  acceptDrop: function(event) {
    this.handleDrop(event);
  }
});