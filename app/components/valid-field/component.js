import Ember from 'ember';
export default Ember.Component.extend({
  beenFocused: false,
  valid: null,
  hasError: Ember.computed('valid', 'beenFocused', function() {
    if (this.get('beenFocused')) {
      return !this.get('valid');
    }
  }),
  focusOut: function() {
    this.set('beenFocused', true);
  }
});
