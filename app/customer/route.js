import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  odoo: Ember.inject.service('odoo-backend'),
  model() {
    // Use authorization data

    let odoo = this.get('odoo');
    let terms = [['active', '=', true], ['customer', '=', true]];
    let retrieve = ['name', 'phone', 'email', 'active', 'signup_token'];

    return Ember.RSVP.hash({
      customers: odoo.getEntities('res.partner', terms, retrieve),
    });
  }
});
