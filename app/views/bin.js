import Ember from 'ember';

var cancelFunc = function(event) {
  event.preventDefault();
  return false;
};

export default Ember.View.extend({
  dragEnter: cancelFunc,
  dragOver: cancelFunc,

  drop: function(event) {
    console.debug("drop event");
    event.preventDefault();

    var dataTransfer = event.originalEvent.dataTransfer;
    var data = dataTransfer.getData("Text");
    console.debug(data);
    this.get("controller").addPostById(data);
    
    return false;
  }
});