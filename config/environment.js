/* jshint node: true */

module.exports = function(environment) {

  // var odoo = new Odoo(odooHost).connect(odooDb);
  // var Crypto = require('crypto');
  var ENV = {
    modulePrefix: 'ouigoes',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    // baseURL: 'http://localhost:4200/',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      // CRYPTO:Crypto
    },
    contentSecurityPolicy: {
      'connect-src': "'self' http://127.0.0.1:8069 ",
      'script-src': "'self' http://127.0.0.1:8069 " ,
      'style-src': "'self' 'unsafe-inline' ",
      'img-src': "'self' ",
      'font-src': "'self' data: " ,
      'object-src': "http://127.0.0.1:8069 "
    }
  };

  ENV['ember-simple-auth'] = {
    authorizer: 'authorizer:backend',
    authenticationRoute: 'users.signin',
    routeAfterAuthentication: 'customer',
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.locationType = 'none';
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'hash';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  ENV['ember-cli-mirage'] = {
    directory: 'mirage'
  };

  return ENV;
};
