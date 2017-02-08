import BackendAuthenticator from '../authenticators/backend';

export function initialize(application) {
  application.register('authenticator:backend', BackendAuthenticator);

}

export default {
  before: 'ember-simple-auth',
  name: 'backend-authenticator',
  initialize
};
