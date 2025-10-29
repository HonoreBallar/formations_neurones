const express = require('express');
const app = express();
const productRoutes = require('./routes/product.routes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());
app.use('/', (req, res) => {
  res.send('Bienvenue sur l\'API de gestion des produits');
});
app.use('/uploads', express.static('uploads'));
app.use('/api/products', productRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API lancée sur http://localhost:${PORT}`));
