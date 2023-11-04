import { createServer, Model } from 'miragejs';

import books from './books.json';

// build a quick mock server so that I don't have to set database logic
// could have done it with msw, but i want to check this lib as well
function makeServer() {
  const server = createServer({
    models: {
      book: Model,
    },
    seeds(server) {
      server.db.loadData(books);
      //   server.createList('book', books.books);
    },
    routes() {
      this.namespace = 'api';

      // all
      this.get('/books', (schema) => {
        return schema.all('book');
      });

      // get by id
      this.get('/books/:id', (schema, request) => {
        const id = request.params.id;

        return schema.find('book', id);
      });

      // create
      this.post('/books', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create('book', attrs);
      });

      //   delete
      this.delete('/books/:id', (schema, request) => {
        const id = request.params.id;

        const bookToDelete = schema.find('book', id);

        if (!bookToDelete) {
          return new Response(null, { status: 404, statusText: 'Not found' });
        }

        bookToDelete.destroy();
        return new Response(null, { status: 200, statusText: 'Deleted' });
      });

      this.patch('/books/:id', (schema, request) => {
        const id = request.params.id;

        const bookToUpdate = schema.find('book', id);

        if (!bookToUpdate) {
          return new Response(null, { status: 404, statusText: 'Not found' });
        }

        const attrs = JSON.parse(request.requestBody);

        bookToUpdate.update(attrs);
        return new Response(null, { status: 200, statusText: 'Updated' });
      });
    },
  });

  return server;
}

export { makeServer };
