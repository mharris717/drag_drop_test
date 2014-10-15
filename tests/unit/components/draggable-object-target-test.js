import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';

var Thing = Ember.Object.extend({});
moduleForComponent("draggable-object-target");

test("smoke", function() {
  var s = this.subject();
  Ember.run(function() {
    s.set("thing",1);
  });
  equal(s.get('thing'),1);
});

test("handlePayload", function() {
  var s = this.subject();
  var id = Math.random();

  var payload = JSON.stringify({id: id, modelName: 'thing'});
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
  var s = this.subject();

  var id = Math.random();
  var payload = JSON.stringify({id: id, modelName: 'thing'});
  s.handlePayload(payload);

  var id2 = Math.random();
  payload = JSON.stringify({id: id2, modelName: 'thing'});
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
  var id = Math.random();
  var s = this.subject();
  var payload = JSON.stringify({id: id, modelName: 'thing'});
  var event = makeMockEvent(payload);

  s.handleDrop(event);

  equal(s.get('content.length'),1);
  equal(s.get('content.firstObject.id'),id);
});

test("pass in content", function() {
  var content = [];
  var s = this.subject({content: content});
  var id = Math.random();

  var payload = JSON.stringify({id: id, modelName: 'thing'});
  s.handlePayload(payload);
  equal(s.get('content.length'),1);
  equal(s.get('content.firstObject.id'),id);
  equal(content.length,1);
});