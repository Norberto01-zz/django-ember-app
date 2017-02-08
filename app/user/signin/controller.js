import Ember from 'ember';
import Crypto from 'npm:crypto';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  errorMessage: null,
  inputIdentification: '',
  inputPassword: '',

  actions: {
    authenticate() {
      let self = this;

      let username = this.get('inputIdentification');
      let password = this.get('inputPassword');

      // let pword = Crypto.createHash('sha512').update(pwd+'0u1go3s'+email).digest('hex');

      let pword = Crypto.createHash('sha512').update(password+'0u1go3s'+username).digest('hex');

      console.log(pword);

      new Ember.RSVP.Promise((resolve) => {
        return (self.get('session.isAuthenticated')) ? self.get('session').invalidate() : resolve(true);
      }).then(() => {
        return self.get('session').authenticate('authenticator:backend', {username, pword});
      }).then(function authSuccess() {
        console.log("Logged");
      },function authFailed() {
        self.set('errorMessage','Login Failed!');
      });
    }
  }
});
