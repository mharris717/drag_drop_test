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

var postsTest = function(name,f) {
  test(name, function() {
    visit("/posts").then(f);
  });
};

postsTest("smoke", function() {
  equal(find(".author").length,10);
  equal(find(".title:eq(0)").text(),"Title 1");
});

postsTest("has draggable attr", function() {
  equal(find(".title[draggable=true]").length,10);
});