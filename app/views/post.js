import Ember from 'ember';
import Draggable from '../mixins/draggable';

export default Ember.View.extend(Draggable, {
  dragModelName: 'post'
});