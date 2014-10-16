import Ember from 'ember';

export default Ember.Component.extend({
  model: [],

  forEach: function(f) {
    return this.get('model').forEach(f);
  },

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