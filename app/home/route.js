import Ember from 'ember';

export default Ember.Route.extend({
  odoo: Ember.inject.service('odoo-backend'),
  archivesRepo: 'ouigoes_archives.ouigoes_archives',
  model() {
    let odoo = this.get('odoo');
    let img_terms = [['status', '=', true], ['category.name', '=', 'Slider']];
    let img_retrieve = ['id', 'label', 'category', 'product_archives_id'];
    let img_entity = this.get('archivesRepo');

    let pic_instance = odoo.getEntities(img_entity, img_terms, img_retrieve);

    return Ember.RSVP.hash({
      sliders: pic_instance,
    });
  }
});
