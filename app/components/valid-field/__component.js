import Ember from 'ember';

const {
  computed,
  defineProperty,
} = Ember;

export default Ember.Component.extend({
  classNames: ['validated-input', 'form-group'],
  classNameBindings: ['showErrorClass:has-error', 'isValid:has-success'],
  model: null,
  value: null,
  type: 'text',
  valuePath: '',
  placeholder: '',
  validation: null,
  isTyping: false,

  init() {
    this._super(...arguments);
    var valuePath = this.get('valuePath');
    defineProperty(this, 'validation', computed.oneWay(valuePath));
    defineProperty(this, 'value', computed.alias(valuePath));

  },
  wrong: Ember.computed('valuePath', function () {
    return this.get('valuePath') === '';
  }),
  hasValue: Ember.computed.bool('valuePath'),
  wrongData: computed.empty('validation'),
  notValidating: computed.not('validation.isValidating'),
  didValidate: computed.oneWay('targetObject.didValidate'),
  hasContent: computed.notEmpty('value'),
  isValid: computed.and('hasContent', 'validation.isValid', 'notValidating'),
  isInvalid: computed.oneWay('value.isInvalid'),
  showErrorClass: computed.and('notValidating', 'showMessage', 'hasContent', 'validation'),
  showMessage: computed('validation.isDirty', 'isInvalid', 'didValidate', function() {
    return (this.get('validation.isDirty') || this.get('didValidate')) && this.get('isInvalid');
  }),
  actions: {
    validFields(){
      // let wrongData = computed.empty('validation');
      // console.log(wrongData);
      // let wrong =  Ember.computed('valuePath', function () {
      //     return this.get('valuePath') === '';
      // });
      console.log(this.get('wrong'));
       if(this.get('wrongData')){
          console.log(this.get('wrongData'));
       }
      console.log("FAILUR DATA");

       return;
    }
  }
});
