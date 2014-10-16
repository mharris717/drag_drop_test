import Ember from 'ember';

export default Ember.Object.extend({
  content: {},
  contentLength: 0,

  add: function(obj) {
    var id = this.generateId();
    this.get('content')[id] = obj;
    this.incrementProperty("contentLength");
    return id;
  },

  getObj: function(key) {
    var res = this.get('content')[key];
    if (!res) {
      throw "no obj for key "+key;
    }
    return res;
  },

  generateId: function() {
    var num = Math.random() * 1000000000000.0;
    num = parseInt(num);
    return num;
  },

  lengthBinding: "contentLength"
});