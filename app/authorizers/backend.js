import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
  // authorize(sessionData, block) {
  // }

  //notice the change, it will add an authorization header, in this case I'm using basic http authentication.
  authorize: function(addHeaderFunction) {
    if (this.get('session.isAuthenticated') && !Ember.isEmpty(this.get('session.authenticated.access_token'))) {
      let basicHTTPToken = btoa(this.get('session.authenticated.account_id') + ":" + this.get('session.authenticated.access_token'));
      addHeaderFunction('Authorization', 'Basic ' + basicHTTPToken);
    }
  }
});
