import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  odoo: Ember.inject.service('odoo-backend'),
  fileRepo: 'ouigoes_archives.ouigoes_archives',
  // redirect: function() {
  //   this.transitionTo('home');
  // },
  model() {
    // Use authorization data
    let odoo = this.get('odoo');
    let terms = [['status', '=', true], ['category.name', '=', 'Slider']];
    // let retrieve = ['label', 'category'];
    // let entity = 'ir.attachment';
    return Ember.RSVP.hash({
      // sliders: odoo.getEntities(entity, terms, retrieve),
      // fileRepo: entity,
    });
  }
});
