import Ember from 'ember';

export default Ember.View.extend({
  dragStartCount: 0,

  dragStart: function(event) {
    console.debug("drag start");
    var dataTransfer = event.originalEvent.dataTransfer;
    var data = this.get("controller.id");
    dataTransfer.setData('Text', data);
  }
});