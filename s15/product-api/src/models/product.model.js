const db = require('../db/sqlite');

const Product = {
  getAll: (cb) => db.all('SELECT * FROM products', cb),
  getById: (id, cb) => db.get('SELECT * FROM products WHERE id = ?', [id], cb),
  create: (data, cb) =>
    db.run(
      'INSERT INTO products (title, description, price, image) VALUES (?, ?, ?, ?)',
      [data.title, data.description, data.price, data.image],
      function (err) {
        cb(err, { id: this.lastID, ...data });
      }
    ),
  update: (id, data, cb) =>
    db.run(
      'UPDATE products SET title = ?, description = ?, price = ?, image = ? WHERE id = ?',
      [data.title, data.description, data.price, data.image, id],
      function (err) {
        cb(err, { id, ...data });
      }
    ),
  delete: (id, cb) => db.run('DELETE FROM products WHERE id = ?', [id], cb),
};

module.exports = Product;
