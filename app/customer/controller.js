import Ember from 'ember';
import Crypto from 'npm:crypto';

export default Ember.Controller.extend({
  nameField: '',
  emailField: '',
  phoneField: '',
  pwdField: '',

  // serviceOdoo: () => {
  //   var Odoo = new Odoo({
  //     host: 'localhost',
  //     port: 8069,
  //     database: 'ouigoes_db_2',
  //     username: 'norbertoortiz01@gmail.com',
  //     password: 'admin'
  //   });
  //   return Odoo;
  // },
  // validEmail: Ember.computed.match('emailField', /^.+@.+\..+$/),
  isDisabled: Ember.computed.not('validEmail'),
  odoo: Ember.inject.service('odoo-backend'),
  actions: {
    saveCustomer(){
      let _that   = this;
      let odoo = this.get('odoo').getInstance();

      const name  = this.get('nameField');
      const email = this.get('emailField');
      const phone = this.get('phoneField');
      const pwd   = this.get('pwdField');
      let pword   = Crypto.createHash('sha512').update(pwd+'0u1go3s'+email).digest('hex');

      // Server request vars
      let inParams = [];
      inParams.push({
        'name': name, 'email': email, 'phone': phone,
        'signup_token':pword, 'customer': true, 'active': true
      });
      let params = [];
      params.push(inParams);

      odoo.connect((err) => {
        if (err) { return console.log(err); }
        console.log('Connected to server.');

        odoo.execute_kw('res.partner', 'create', params, (err, value) => {
          if (err) { return console.log(err); }
          console.log('Result: ', value);
          _that.set('nameField', '');
          _that.set('emailField', '');
          _that.set('phoneField', '');
          _that.set('pwdField', '');
        });
      });

      this.set(
        'responseMessage',
        `Thank you! We've just saved your account. We sent you an email to confirm your new account.`
      );
    },
    updateCustomer(){
      // let _that   = this;
      // let iClient = [];
      const name  = this.get('nameField');
      const email = this.get('emailField');
      const phone = this.get('phoneField');
      const pwd   = this.get('pwdField');
      let pword   = Crypto.createHash('sha512').update(pwd+'0u1go3s'+email).digest('hex');
      let odoo = this.get('odoo').getInstance();

      // Server request vars
      let inParams = [];
      inParams.push({
        'name': name, 'email': email, 'phone': phone,
        'signup_token':pword, 'customer': true, 'active': true
      });
      let params = [];
      params.push(inParams);

      odoo.connect((err) => {
        if (err) { return console.log(err); }
        console.log('Connected to server.');

        odoo.execute_kw('res.partner', 'write', params, (err, value) => {
          if (err) { return console.log(err); }
          console.log('Result: ', value);
        });
      });
      this.set(
        'responseMessage',
        `Your account has been successfully updated.`
      );
    }
  }
});
