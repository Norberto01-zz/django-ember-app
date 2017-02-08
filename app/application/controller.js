import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  validEmail: Ember.computed.match('emailField', /^.+@.+\..+$/),
  actions: {
    invalidateSession(){
      this.get('session').invalidate();
    }
  }
});
