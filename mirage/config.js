export default function() {

  this.namespace = '/api';

  this.get('/customers', () => {
      return {
          data: [
                {
                  type: 'customers',
                  id: 1,
                  name: 'Pedro Vargas',
                  attributes: {
                    name: 'Pedro Vargas',
                    phone: '8491234568',
                    email: 'pedrov@gmail.com',
                    active: true,
                    signup_token: '123456789987654321',
                    created_date: '2016-11-26 14:04:24.080094',
                    write_date: '2016-11-26 15:04:24.080094',
                  }
                },
                {
                  type: 'customers',
                  id: 2,
                  name: 'Luis Jimenez',
                  attributes: {
                    name: 'Luis Jimenez',
                    phone: '8491234568',
                    email: 'luisji@gmail.com',
                    active: true,
                    signup_token: '123456789987654321',
                    created_date: '2016-11-26 14:04:24.080094',
                    write_date: '2016-11-26 15:04:24.080094',
                  }
                },
                {
                  type: 'customers',
                  id: 3,
                  name: 'Manuel Gonzalez',
                  attributes: {
                    name: 'Manuel Gonzalez',
                    phone: '8491234568',
                    email: 'manuel@gmail.com',
                    active: true,
                    signup_token: '123456789987654321',
                    created_date: '2016-11-26 14:04:24.080094',
                    write_date: '2016-11-26 15:04:24.080094',
                  }
                }
          ]
      };
  });
  this.post('/customers', function(db, request) {
    let attrs = JSON.parse(request.requestBody).customer;
    let client = db.customers.insert(attrs);
    return client;
  });
    /*
  this.get('/customers/:id', function(db, request) {
      let id = request.params.id;

      return {
        data: {
          type: 'customers',
          id: id,
          attributes: db.customers.find(id)
        }
      };
  });*/
  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  // this.passthrough('/customers');
  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */
}
