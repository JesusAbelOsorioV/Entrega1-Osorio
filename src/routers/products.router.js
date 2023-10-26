const { Router } = require('express');

const router = Router();
const ProductManager = require('../ProductManager');
const productManager = new ProductManager('./Products.json');

router.get('/products', async (req, res) =>{
    const limit = parseInt(req.query.limit);
    const product = await productManager.getProducts();

    if(!isNaN(limit) && limit > 0){
        const limitedProducts = product.slice(0, limit);
        res.status(200).json(limitedProducts);
    }else{
        res.status(200).json(product);
        console.log('productos',product);
    }
});

router.get('/products/:pid', async (req, res) => {
  const {pid} = req.params;
  const product = await productManager.getProductsById(pid);
    if(product){
     res.json(product);
     console.log(product)
    }else{
      res.json({ error: 'Producto no encontrado'})
    }
});

// router.post('/products', (req, res) => {
//   const {
//     body
//   } = req;

//   const newProduct = {
//     ...body
//   };

//   products.push(newProduct);
//   res.json(newProduct);
// });

module.exports = router;