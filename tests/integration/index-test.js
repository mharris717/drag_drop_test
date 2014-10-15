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
    equal(find("table").length,1);
    equal(find("td.author").length,5);
    equal(find("td.title:eq(0)").text(),"Title 1");
  });
});

test("basic filter", function() {
  visit("/posts");
  fillIn("input[type=text]","Adam");

  andThen(function() {
    equal(find("td.author").length,4);
  });
});

test("pagination controls", function() {
  visit("/posts");

  andThen(function() {
    equal(find(".pagination .page-number").length,2);
  });
});

test("pagination controls after filter", function() {
  visit("/posts");
  fillIn("input[type=text]","Adam");

  andThen(function() {
    equal(find(".pagination .page-number").length,1);
  });
});

test("pagination click", function() {
  visit("/posts");
  clickPage(2);

  andThen(function() {
    hasActivePage(2);
    equal(find("td.title:eq(0)").text(),"Title 6");
  });
});