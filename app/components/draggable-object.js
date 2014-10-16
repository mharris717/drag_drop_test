import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "span", 

  init: function() {

    //var me = this;
    // if (!this.get('coordinator')) {
    //   throw ("no coordinator");
    // }

    // this.get('coordinator').on("objectDropsped", function() {
    //   me.sendAction();
    // });

    this._super();
  },

  dfdsfsdgdfg: function() {
    throw "bad stuff";
  
  }.observes("coordinator"),

  handleDragStart: function(event) {
    console.debug("handleDragStart");
    
    var dataTransfer = event.originalEvent.dataTransfer;

    var obj = this.get('content');
    var id = this.get('coordinator').setObject(obj, {source: this});

    dataTransfer.setData('Text', id);
  }.on("dragStart"),

  sdfsdf: function() {
    this.sendAction();
  }.on("coordinator.objectDropdped"),

  actions: {
    selectForDrag: function() {
      console.debug("selectForDrag");
      var obj = this.get('content');
      var hashId = this.get('coordinator').setObject(obj, {source: this});
      this.get('coordinator').set("clickedId",hashId);
    }
  }
});