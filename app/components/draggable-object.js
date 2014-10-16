import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "span", 

  handleDragStart: function(event) {
    console.debug("handleDragStart");
    
    var dataTransfer = event.originalEvent.dataTransfer;

    var obj = this.get('content');
    var id = this.get('coordinator').setObject(obj, {source: this});

    dataTransfer.setData('Text', id);
  }.on("dragStart"),

  notifyDrop: function(obj) {
    console.debug("notifyDrop");
    this.get("parent").removeObject(obj);
    // this.incrementProperty("dropNotifyCount");
  }
});