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

  actions: {
    selectForDrag: function() {
      console.debug("selectForDrag");
      var obj = this.get('content');
      var hashId = this.get('coordinator').setObject(obj, {source: this});
      this.get('coordinator').set("clickedId",hashId);
    }
  }
});