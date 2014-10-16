import Ember from 'ember';

var YieldLocalMixin = Ember.Mixin.create({
  _yield: function(context, options) {
    var view = options.data.view;
    var parentView = this._parentView;
    var template = Ember.get(this, 'template');

    if (template) {
      Ember.assert("A Component must have a parent view in order to yield.", parentView);

      view.appendChild(Ember.View, {
        isVirtual: true,
        tagName: '',
        _contextView: parentView,
        template: template,
        context: Ember.get(view, 'context'),
        controller: Ember.get(view, 'controller'),
        templateData: { keywords: {} }
      });
    }
  }
});

export default Ember.Component.extend(YieldLocalMixin, {
  model: [],

  thingnow: function() {
    console.debug("got objectDropped event in bin");
  }.on("objectDropped"),

  actions: {
    handleObjectDropped: function(obj) {
      console.debug("got handleObjectDropped in bin");
      this.get('model').pushObject(obj);
    }
  }
});