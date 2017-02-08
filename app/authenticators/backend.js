import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  // session: Ember.inject.service('session'),
  odoo: Ember.inject.service('odoo-backend'),
  restore(data) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      if (!Ember.isEmpty(data.access_token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },
  authenticate(options) {
    let self = this;
    let iClient = [];
    let inParams = [];
    let params = [];

    let odoo = this.get('odoo').getInstance();

    inParams.push([
      ['active', '=', true],
      ['customer', '=', true],
      ['email', '=', options.username],
      ['signup_token', '=', options.pword],
      ['signup_type', '=', 'complete']
    ]);

    inParams.push(['name', 'phone', 'email', 'active', 'signup_token', 'signup_type']); //fields

    params.push(inParams);

    return new Ember.RSVP.Promise((resolve, reject) => {
      odoo.connect((err) => {
        if (err) { return console.log(err); }
        odoo.execute_kw('res.partner', 'search_read', params, (err, value) => {
          if (err) {
            return reject({responseCode:503, responseMessage: 'The server is currently unable to handle the request'});
          }
          if(!value.length){
            return reject({responseCode:401, responseMessage: 'Authentication failed'});
          }

          iClient.addObjects(value);
          self.set('token', value[0].signup_token);
          console.log(iClient);

          return resolve({
            responseCode:200, access_token: value[0].signup_token, account: iClient, account_id: value[0].id
          });
        });
      });
    });
  },
  invalidate() {
    return new Ember.RSVP.resolve(true);
  }
});
