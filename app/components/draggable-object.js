import Ember from 'ember';

export default Ember.Component.extend({
  payload: function() {
    var modelName = "thing";
    var id = this.get("content.id");
    var data = {id: id, modelName: modelName};
    return JSON.stringify(data);
  }.property("content.id"),

  handleDragStart: function(event) {
    var dataTransfer = event.originalEvent.dataTransfer;
    dataTransfer.setData('Text', this.get('payload'));
  }.on("dragStart")
});