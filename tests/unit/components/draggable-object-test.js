import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';
import Coordinator from '../../../models/coordinator';

var Thing = Ember.Object.extend({});
moduleForComponent("draggable-object");

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
  var coordinator = Coordinator.create();

  var s = this.subject({coordinator: coordinator});
  s.set("content",thing);

  var event = makeMockEvent();
  Ember.run(function() {
    s.handleDragStart(event);
  });

  var keys = coordinator.get("objectMap").keys();
  var hashId = Ember.A(keys).get("lastObject");

  var data = event.dataTransfer.get('data');
  equal(data.dataType,"Text");
  equal(data.payload,hashId);
});

test("notified of drop", function() {
  var thing = Thing.create({id: 1});
  var coordinator = Coordinator.create();

  var s = this.subject({coordinator: coordinator});
  s.set("content",thing);

  var notifyDropCount = 0;
  s.notifyDrop = function() {
    notifyDropCount = notifyDropCount + 1;
  };

  var hashId = Ember.run(function() {
    return coordinator.setObject(thing, {source: s});
  });

  coordinator.getObject(hashId);
  equal(notifyDropCount,1);
});

test("drop callbacks", function() {
  var thing = Thing.create({id: 1});
  var coordinator = Coordinator.create();

  var callbackArgs = [];
  coordinator.registerCallback(function(ops) {
    callbackArgs.push(ops);
  });

  var s = this.subject({coordinator: coordinator, parent: []});
  s.set("content",thing);

  var hashId = Ember.run(function() {
    return coordinator.setObject(thing, {source: s});
  });

  coordinator.getObject(hashId);

  equal(callbackArgs.length,1);
  equal(callbackArgs[0].obj.get('id'),1);
});

// test("template smoke", function() {
//   var s = this.subject();
//   equal(this.$().find(".thing").length,1);
// });