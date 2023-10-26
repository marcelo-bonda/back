const express = require('express');
const app = express();
const port = 8080;


const productsRouter = require('./src/productRouter');
const cartsRouter = require('./src/cartRouter');


app.use(express.json());


app.use('/api/products', productsRouter);


app.use('/api/carts', cartsRouter);

app.listen(port, () => {
console.log(`Servidor Express corriendo en el puerto ${port}`);
});




