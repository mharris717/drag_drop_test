import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';
import Coordinator from '../../../models/coordinator';

var Thing = Ember.Object.extend({});
moduleForComponent("object-bin", 'ObjectBinComponent', {
  needs: ["component:draggable-object-target", "component:draggable-object"]
});

test("smoke", function() {
  equal(2,2);

  var obj = Thing.create({title: "Hello"});
  var all = [obj];
  var s = this.subject({model: all});

  var titles = this.$().find(".title");
  equal(titles.length,1);
  equal(titles.text().trim(),"Hello");
});
