const express = require('express');
const {productManager} = require('./productManajer'); 




const app = express();
const port = 8080; 




app.use(express.json());


app.get('/products',  (req, res) => {
const { limit } = req.query;
const products =  productManager.getProducts();

if (limit) {
const limitedProducts = products.slice(0, parseInt(limit));
res.json(limitedProducts);
} else {
res.json(products);
}
});

app.get('/products/:productId', async (req, res) => {
const { pid } = req.params;
const products = await productManager.getProducts();
const product = products.find(p => p.id === parseInt(pid));

if (product) {
res.json(product);
} else {
res.status(404).json({ error: 'Producto no encontrado' });
}
});



app.listen(port, () => {
console.log(`Servidor Express corriendo en el puerto ${port}`);
});