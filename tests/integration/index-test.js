import Em from 'ember';
import startApp from '../helpers/start-app';
import { test } from 'ember-qunit';
import PaginationAssertions from '../helpers/assertions';

var App;

module('Integration - Index', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Em.run(App, App.destroy);
  }
});

test("smoke", function() {
  visit("/posts").then(function() {
    equal(find(".author").length,10);
    equal(find(".title:eq(0)").text(),"Title 1");
  });
});