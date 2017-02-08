export function initialize(appInstance) {
  // appInstance.inject('route', 'foo', 'service:foo');

  const applicationRoute = appInstance.container.lookup('route:application');
  const session = appInstance.container.lookup('service:session');
  session.on('authenticationSucceeded', function() {
    applicationRoute.transitionTo('customer');
  });
  session.on('invalidationSucceeded', function() {
    applicationRoute.transitionTo('index');
  });
}

export default {
  after: 'ember-simple-auth',
  name: 'session-events',
  initialize
};
