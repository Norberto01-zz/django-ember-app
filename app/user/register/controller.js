import Ember from 'ember';
import Crypto from 'npm:crypto';
import Validations from '../../validators/register';

export default Ember.Controller.extend(Validations, {
  odoo: Ember.inject.service('odoo-backend'),

  nameField:  null,
  lastField:  null,
  emailField: null,
  pwdField:   null,
  pwdconField: null,

  t_and_c: false,
  hasError: false,
  serverError: false,
  isValid: true,

  fullName: Ember.computed('nameField', 'lastField', function() {
    return `${this.get('nameField')} ${this.get('lastField')}`;
  }),
  clearForm: () => {
    this.setProperties({
      nameField:  null,
      lastField:  null,
      emailField: null,
      pwdField:   null,
      pwdconField: null,
      t_and_c: false,
      hasError: false,
      serverError: false,
      isValid: true,
    });
  },
  deactivate: () => {
    this.controller.clearForm();
  },
  // emailMessage: false,
  // isDisabled: Ember.computed.empty('emailField'),

  actions: {
    save(){
      let _that = this;
      let odoo = this.get('odoo').getInstance();

      let name  = this.get('fullName');
      let email = this.get('emailField');
      let pwd   = this.get('pwdField');

      let pword = Crypto.createHash('sha512').update(pwd+'0u1go3s'+email).digest('hex');

      // Server request vars
      let inParams = [];
      let params   = [];
      let lookFor  = [];
      let looking  = [];

      this.set("hasError", false);

      lookFor.push([['email', '=', email]]);
      looking.push(lookFor);
      // Set signup_type == 'partial' and when the user confirm the account it will change to 'complete'
      inParams.push({
        'name': name,
        'email': email,
        'signup_token':pword, 'customer': true,
        'active': true, 'signup_type': 'partial'
      });
      params.push(inParams);

      odoo.connect((err) => {
        if (err) { return console.log(err); }
        console.log('Connected to server.');

        odoo.execute_kw('res.partner', 'search_read', looking, (err, value) => {

          if (err) { return console.log(err); }
          console.log(value);

          if(value.length){

            this.set('hasError', 'This email already exist.');

          }else{

            console.log(params);
            console.log("PARAMS...");
            odoo.execute_kw('res.partner', 'create', params, (err, value) => {
              if (err) {
                this.set('serverError', true);
                this.set(
                  'responseMessage',
                  `Validation error, check that the information provided is correct.`
                );
                console.log(err);
                return false;
              }else{
                console.log('Result: ', value);
                _that.set('nameField', '');
                _that.set('emailField', '');
                _that.set('pwdField', '');
                _that.set('pwdconField', '');
                this.set(
                  'responseMessage',
                  `Thank you! We've just saved your account. We sent you an email to confirm your new account.`
                );
                return true;
              }
            });

          }

        });
        console.log(this.get('isValid'));
      });
    }
  }
});
