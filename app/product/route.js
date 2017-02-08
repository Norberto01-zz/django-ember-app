import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  odoo: Ember.inject.service('odoo-backend'),
  model() {
    // Use authorization data
    let entities = [];
    let inParams = [];
    let params = [];
    let odoo = this.get('odoo').getInstance();

    inParams.push([['active', '=', true], ['type', '=', 'service'], ['sale_ok', '=', true]]);
    inParams.push(['id', 'name', 'description', 'categ_id']); //fields

    params.push(inParams);

    odoo.connect((err) => {
      if (err) { return console.log(err); }
      odoo.execute_kw('product.template', 'search_read', params, (err, value) => {
        if (err) { return console.log(err); }
        entities.addObjects(value);
      });
    });
    console.log(entities);
    return entities;
  }
});
