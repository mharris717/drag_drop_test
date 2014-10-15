import Ember from 'ember';
import Droppable from '../mixins/droppable';

// var cancelFunc = function(event) {
//   event.preventDefault();
//   return false;
// };

// export default Ember.View.extend({
//   dragEnter: cancelFunc,
//   dragOver: cancelFunc,

//   dropThing: function(event) {
//     console.debug("drop event");
//     event.preventDefault();

//     var dataTransfer = event.originalEvent.dataTransfer;
//     var data = dataTransfer.getData("Text");
//     console.debug(data);
//     this.get("controller").addPostById(data);
    
//     return false;
//   }.on("drop")
// });

export default Ember.View.extend(Droppable, {
  // addDroppedObject: function(event) {

  // },
  
  acceptDrop: function(event) {
    var dataTransfer = event.originalEvent.dataTransfer;
    var payload = dataTransfer.getData("Text");
    var data = JSON.parse(payload);
    
    this.get("controller").addPostById(data);
  }
});