const express = require('express');
const ProductManager = require('./ProductManager');

const productManager = new ProductManager('./Products.json');

const app = express();
app.use(express.urlencoded( {extended: true}));
app.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit);
    const product = await productManager.getProducts();

    if(!isNaN(limit) && limit > 0){
        const limitedProducts = product.slice(0, limit);
        res.json(limitedProducts);
    } else{
      res.json(product);
    console.log(product);  
    }
});

app.get('/products/:pid', async (req, res) => {
  const {pid} = req.params;
  const product = await productManager.getProductsById(pid);
    if(product){
     res.json(product);
     console.log(product)
    }else{
      res.json({ error: 'Producto no encontrado'})
    }
  
    
});

app.listen(8080, () => {
    console.log('servidor http en el puerto 8080');
});