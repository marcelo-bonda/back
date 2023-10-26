const fs = require('fs').promises;

class ProductManager {
  constructor(path) {
    this.path = 'productList'
    this.products = [];
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {

      this.products = [];

    }
  }

  async saveProducts() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    } catch (error) {
      console.error(`Error al guardar los productos: ${error.message}`);
    }
  }
  
  

  async addProduct(title, description, price, thumbnail, code, stock) {
    
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }


    const newProduct = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);


    await this.saveProducts();

    console.log('Producto agregado');
  }

  async updateProduct(id, updatedProduct) {
    
    const index = this.products.findIndex(product => product.id === id);

    if (index === -1) {
      console.error(`Producto con ID ${id} no encontrado`);
      return;
    }

    
    this.products[index] = {
        ...this.products[index],
        ...updatedProduct,
        id, 
    };

    
    await this.saveProducts();

    console.log('Producto actualizado');
}

async deleteProduct(idToDelete) {
    const indexToDelete = this.products.findIndex(product => product.id === idToDelete);
  
    if (indexToDelete !== -1) {
      this.products.splice(indexToDelete, 1);
      await this.saveProducts(); 
      console.log(`Producto con ID ${idToDelete} eliminado.`);
    } else {
      console.log(`Producto con ID ${idToDelete} no encontrado.`);
    }
  }
getProducts() {
    return this.products;
}
}



const productManager = new ProductManager



productManager.addProduct('producto de prueba','esto es un producto de prueba',200,'sin imagen','abc123',25);
productManager.addProduct('producto de prueba2','esto es un producto de pruebaa',300,'sin imagen','abc125',3);
productManager.addProduct('producto de prueba3','esto es un producto de prueba!',400,'sin imagen','abc126',121);



console.log(productManager.getProducts())


module.exports = {productManager};