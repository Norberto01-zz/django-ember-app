import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  nameField: {
    validators: [
      validator('presence', true),
      validator('length', {
        max: 30
      })
    ]
  },
  emailField: {
    validators: [
      validator('presence', {
        presence: true,
        message: 'Email is required'
      }),
      validator('format', {
        type: 'email',
        message: 'Email incorrect format'
      }),
      validator('length', {
        max: 200,
      })
    ]
  },
  pwdField: {
    validators:[
      validator('presence', {
        presence: true
      }),
      validator('length', {
        max: 15
      })
    ]
  },
  pwdconField: {
    validators:[
      validator('presence', {
        presence: true
      }),
      validator('confirmation', {
        on: 'password'
      }),
      validator('length', {
        max: 15
      })
    ]
  }
});

export default Validations;
