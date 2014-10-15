import Ember from 'ember';

export default Ember.ArrayController.extend({
  model: [],

  // init: function() {
  //   debugger;
  //   var seed = this.get('store').find('post',6);
  //   this.pushObject(seed);
  // }

  addPostById: function(id) {
    var me = this;
    this.get('store').find('post',parseInt(id)).then(function(post) {
      me.pushObject(post);
    }, function(error) {
      console.debug("addPostById error");
      console.debug(error);
    });
  }
});