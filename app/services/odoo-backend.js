import Ember from 'ember';
import Odoo from 'npm:odoo-xmlrpc';

var oHost = {
  url: '127.0.0.1',
  port: 8069,
  db: 'ouigoes_db_2',
  username: 'norbertoortiz01@gmail.com',
  password: 'admin'
};

const ws_glisell = new Odoo(oHost);

export default Ember.Service.extend({
  entities: null,

  init() {
    this._super(...arguments);
  },
  getInstance(){
    return ws_glisell;
  },
  getEntities(model, terms, retrieve){
    let entities = [];
    let params = [];
    let inParams = [];

    inParams.push(terms);
    inParams.push(retrieve);
    params.push(inParams);

    ws_glisell.connect((err) => {
      if (err) { return console.log(err); }
      ws_glisell.execute_kw(String(model), 'search_read', params, (err, value) => {
        if (err) { return console.log(err); }
        entities.addObjects(value);
      });
    });
    return entities;
  },
  getPictureList(terms = null, retrieve=null, model=null){
    let pictures = [];
    let params = [];
    let inParams = [];

    let condition = [['status', '=', true], ['category.name', '=', 'Slider']];
    let selection = ['id', 'label', 'category', 'product_archives_id',
                     'product_archives_id.sequence', 'product_archives_id.name'];
    let entity = 'ouigoes_archives.ouigoes_archives';

    if(terms){
      condition = terms;
    }
    if(model){
      entity = model;
    }
    if(retrieve){
      selection = retrieve;
    }

    inParams.push(condition);
    inParams.push(selection);
    params.push(inParams);

    ws_glisell.connect((err) => {
      if (err) { return console.log(err); }
      ws_glisell.execute_kw(String(entity), 'search_read', params, (err, value) => {
        if (err) { return console.log(err); }

        console.log(value);

        pictures.addObjects(value);
      });
    });
    console.log("GET PICTURE LIST!!!!!");
    console.log(pictures);
    return pictures;
  }
});
