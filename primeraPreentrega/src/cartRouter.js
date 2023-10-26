const express = require('express');
const router = express.Router();
const { productManager } = require('../productManajer');


router.post('/', (req, res) => {
  const cart = productManager.createCart();
  res.status(201).json(cart);
});


router.get('/:cid', (req, res) => {
  const { cid } = req.params;
  const cart = productManager.getCart(cid);
  
  if (cart) {
    res.status(200).json(cart.products);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});


router.post('/:cid/product/:pid', (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  if (productManager.addProductToCart(cid, pid, quantity)) {
    res.status(201).json({ message: 'Producto agregado al carrito' });
  } else {
    res.status(404).json({ error: 'Carrito o producto no encontrado' });
  }
});

module.exports = router;
