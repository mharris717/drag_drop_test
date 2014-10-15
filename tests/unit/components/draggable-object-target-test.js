import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';

var Thing = Ember.Object.extend({});
moduleForComponent("draggable-object-target");

var FakeStore = Ember.Object.extend({
  find: function(name,id) {
    var all = this.get('all');
    var res  = null;
    all.forEach(function(obj) {
      if (obj.get('id') === id) {
        res = obj;
      }
    });

    // return new Ember.RSVP.Promise(function(success,failure) {
    //   success(res);
    // });
    return res;
  }
});

var makeStore = function() {
  var all = [];
  for (var i=1;i<=5;i++) {
    all.push(Ember.Object.create({id: i}));
  }
  return FakeStore.create({all: all});
};

var randId = function() {
  return 1;
};

test("smoke", function() {
  var s = this.subject();
  Ember.run(function() {
    s.set("thing",1);
  });
  equal(s.get('thing'),1);
});

test("handlePayload", function() {
  var s = this.subject({store: makeStore()});
  var id = randId();

  var payload = JSON.stringify({id: id, modelName: 'post'});
  s.handlePayload(payload);
  equal(s.get('content.length'),1);
  equal(s.get('content.firstObject.id'),id);
});

var MockDataTransfer = Ember.Object.extend({
  getData: function(dataType) {
    return this.get('payload');
  }
});

test("handlePayload twice", function() {
  var s = this.subject({store: makeStore()});

  var id = randId();
  var payload = JSON.stringify({id: id, modelName: 'post'});
  s.handlePayload(payload);

  var id2 = randId();
  payload = JSON.stringify({id: id2, modelName: 'post'});
  s.handlePayload(payload);


  equal(s.get('content.length'),2);
  equal(s.get('content.firstObject.id'),id);
  equal(s.get('content.lastObject.id'),id2);
});

var MockDataTransfer = Ember.Object.extend({
  getData: function(dataType) {
    return this.get('payload');
  }
});

var makeMockEvent = function(payload) {
  var transfer = MockDataTransfer.create({payload: payload});
  var res = {dataTransfer: transfer};
  res.originalEvent = res;
  return res;
};

test("handleDrop", function() {
  var id = randId();
  var s = this.subject({store: makeStore()});
  var payload = JSON.stringify({id: id, modelName: 'post'});
  var event = makeMockEvent(payload);

  s.handleDrop(event);

  equal(s.get('content.length'),1);
  equal(s.get('content.firstObject.id'),id);
});

test("pass in content", function() {
  var content = [];
  var s = this.subject({content: content, store: makeStore()});
  var id = randId();

  var payload = JSON.stringify({id: id, modelName: 'post'});
  s.handlePayload(payload);
  equal(s.get('content.length'),1);
  equal(s.get('content.firstObject.id'),id);
  equal(content.length,1);
});

test("template smoke", function() {
  var all = [1,2,3,4,5];
  var s = this.subject({content: all});
  equal(this.$().find(".count").length,1);
  equal(this.$().find(".count").text(),"5");
});