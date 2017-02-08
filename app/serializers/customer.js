import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
    attrs: {
        signupToken: 'signup_token',
        createdDate: 'created_date',
        writeDate: 'write_date'
    }
});
