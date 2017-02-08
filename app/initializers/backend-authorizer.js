import BackendAuthorizer from '../authorizers/backend';
export function initialize(application) {
  application.register('authorizer:backend', BackendAuthorizer);
  // application.inject('route', 'foo', 'service:foo');
}

export default {
  before: 'ember-simple-auth',
  name: 'backend-authorizer',
  initialize
};
