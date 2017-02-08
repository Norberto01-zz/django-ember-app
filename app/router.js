import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', { path: '/' });
  this.route('home', { path: '/welcome' });
  this.route('search');
  this.resource('customer', function() {
    this.route('create');
    this.route('show', { path: '/:customer_id' });
  });
  this.resource('product', function() {
    this.route('new');
  });
  this.route('user', function() {
    this.route('register');
    this.route('signin');
    this.route('signout');
  });
});

export default Router;
