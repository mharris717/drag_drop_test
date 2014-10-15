import Ember from 'ember';

export default Ember.Mixin.create({
  _dragStartInner: function(event) {
    console.debug("drag start");
    var dataTransfer = event.originalEvent.dataTransfer;

    var modelName = this.get("dragModelName");
    
    var id = this.get("controller.id");
    var data = {modelName: modelName, id: id};
    var payload = JSON.stringify(data);

    dataTransfer.setData('Text', payload);
  }.on("dragStart")
});