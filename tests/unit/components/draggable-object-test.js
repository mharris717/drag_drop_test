import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';

var Thing = Ember.Object.extend({});
moduleForComponent("draggable-object", {
  setup: function() {
    
  }
});

test("smoke", function() {
  var s = this.subject();
  Ember.run(function() {
    s.set("thing",1);
  });
  equal(s.get('thing'),1);
});

test("payload", function() {
  var thing = Thing.create({id: 1});

  var s = this.subject();
  s.set("content",thing);

  var exp = JSON.stringify({id: 1, modelName: 'thing'});
  equal(s.get('payload'),exp);
});

var MockDataTransfer = Ember.Object.extend({
  setData: function(dataType,payload) {
    this.set("data", {dataType: dataType, payload: payload});
  }
});

var makeMockEvent = function() {
  var res = {dataTransfer: MockDataTransfer.create()};
  res.originalEvent = res;
  return res;
};

test("handleDragStart", function() {
  var thing = Thing.create({id: 1});
  var expPayload = JSON.stringify({id: 1, modelName: 'thing'});

  var s = this.subject();
  s.set("content",thing);

  var event = makeMockEvent();
  s.handleDragStart(event);

  var data = event.dataTransfer.get('data');
  equal(data.dataType,"Text");
  equal(data.payload,expPayload);
});