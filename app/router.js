import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  // this.resource('post', { path: 'posts/:post_id' }, function() { });
  this.route('posts');
});

export default Router;
