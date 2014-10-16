import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "span", 

  handleDragStart: function(event) {
    console.debug("handleDragStart");
    
    var dataTransfer = event.originalEvent.dataTransfer;

    var obj = this.get('content');
    var id = this.get('coordinator').setObject(obj);

    dataTransfer.setData('Text', id);
  }.on("dragStart"),

  notifyDrop: function() {
    // this.incrementProperty("dropNotifyCount");
  }
});