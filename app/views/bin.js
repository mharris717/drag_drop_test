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
  acceptDrop: function(event) {
    console.debug("acceptDrop");
    var dataTransfer = event.originalEvent.dataTransfer;
    var data = dataTransfer.getData("Text");
    console.debug(data);
    this.get("controller").addPostById(data);
  }
});