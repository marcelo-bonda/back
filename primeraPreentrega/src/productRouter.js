const express = require('express');
const router = express.Router();
const { ProductManager } = require('../productManajer');


const productManager = new ProductManager();


router.get('/', (req, res) => {
const { limit } = req.query;
const products = productManager.getProducts();

if (limit) {
const limitedProducts = products.slice(0, parseInt(limit));
res.status(200).json(limitedProducts);
} else {
res.status(200).json(products);
}
});


router.get('/:pid', (req, res) => {
const { pid } = req.params;
const products = productManager.getProducts();
const product = products.find(p => p.id === pid);

if (product) {
res.status(200).json(product);
} else {
res.status(404).json({ error: 'Producto no encontrado' });
}
});


router.post('/', (req, res) => {
const { title, description, code, price, stock, category, thumbnails } = req.body;

if (!title || !description || !code || !price || !stock || !category) {
res.status(400).json({ error: 'Todos los campos son obligatorios' });
return;
}

const newProduct = {
title,
description,
code,
price,
stock,
category,
thumbnails,
};

productManager.addProduct(newProduct);

res.status(201).json(newProduct);
});


router.put('/:pid', (req, res) => {
const { pid } = req.params;
const updatedProductData = req.body;

const updatedProduct = productManager.updateProduct(pid, updatedProductData);

if (updatedProduct) {
    res.status(200).json(updatedProduct);
} else {
    res.status(404).json({ error: 'Producto no encontrado' });
}
});

router.delete('/:pid', (req, res) => {
const { pid } = req.params;
const success = productManager.deleteProduct(pid);

if (success) {
res.status(204).send();
} else {
res.status(404).json({ error: 'Producto no encontrado' });
}
});

module.exports = router;
