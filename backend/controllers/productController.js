const fs = require('fs');
const path = require('path');

const getProducts = (req, res) => {
  const filePath = path.join(__dirname, '..', 'products.json');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load products' });
    }
    const products = JSON.parse(data);
    res.json(products);
  });
};

module.exports = {
  getProducts,
};
