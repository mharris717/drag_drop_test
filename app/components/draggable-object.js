import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "span", 
  
  payload: function() {
    var modelName = "post";
    var id = this.get("content.id");
    var data = {id: id, modelName: modelName};
    return JSON.stringify(data);
  }.property("content.id"),

  handleDragStart: function(event) {
    console.debug("handleDragStart");
    
    var dataTransfer = event.originalEvent.dataTransfer;

    var payload = this.get('payload');
    var obj = this.get('content');

    dataTransfer.setData('Text', payload);

    this.get('coordinator').setObject(payload,obj);
  }.on("dragStart")
});