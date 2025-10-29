const Product = require('../models/product.model');

exports.getAll = (req, res) => {
  Product.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getById = (req, res) => {
  Product.getById(req.params.id, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Produit non trouvé' });
    res.json(row);
  });
};

exports.create = (req, res) => {
  Product.create(req.body, (err, product) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(product);
  });
};

exports.update = (req, res) => {
  Product.update(req.params.id, req.body, (err, product) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(product);
  });
};

exports.delete = (req, res) => {
  Product.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
};
