import Ember from 'ember';
export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  fileRepo: 'ouigoes_archives.ouigoes_archives',

  didRender: function () {
    this.$('.touch-slider').unslider({
      animation: 'fade',
      autoplay: true,
      infinite: true
    });
  }

});
