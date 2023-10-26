const fs = require('fs')

class ProductManager {
    constructor(path){
        this.path = path
        this.products = this.products;
    }

async addProduc(data){ 
    const {title, description, price, thumbnail, code, stock} = data;
    if (!title, !description, !price, !thumbnail, !code, !stock) {
        console.error('Todos los campos son requeridos')
        return;
    }
    
    const products = await getJson(this.path);
    const newProduct ={
        id: products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    }
    if (products.find((productManager) => productManager.code === code)) {
        console.log(`ya existe un producto con el code: ${code}`);
        return;
    }
    products.push(newProduct);
    await saveJson(this.path, products)
    console.log('Producto agregado');
    
     

}
getProducts(){
    return getJson(this.path);
}
async getProductsById(id){
    const products = await getJson(this.path)
    const product = products.find(p => p.id === parseInt(id));
    if (!product) {
     console.log('Not found',`el id: ${id}` );
    } 
    console.log(`Product con id: ${id}`,product);
    return product;
    
}


async updateProducts(id, updatedProducts){
    const products = await getJson(this.path)
    const updateP = products.findIndex(product => product.id === id);
    if (updateP !== -1) {
        products[updateP] = { ...products[updateP], ...updatedProducts };
      await saveJson(this.path, products);
      console.log('Producto Actualizado');
      return products[updateP];
        
    }

    return null;
}

async deleteProduct(id) {
    const products = await getJson(this.path)
    const product = products.findIndex(product => product.id === id);
    if (product !== -1) {
      products.splice(product, 1);
      await saveJson(this.path, products);
      console.log('Producto eliminado');
    } else{
    console.log(`no existe ningun producto con el id: ${id}`);
    }
    
  }

  
}

const getJson = async (path) =>{
    if (!fs.existsSync(path)) {
        return[];
    }
    const content = await fs.promises.readFile(path, 'utf-8');
    return JSON.parse(content);
}

const saveJson = async (path, data) =>{
    const content = JSON.stringify(data, null, '\t');
    await fs.promises.writeFile(path, content, 'utf-8');
}

module.exports = ProductManager;

// async function test(){
//     const productManager = new ProductManager('./Products.json');
//     const data = {
//         title: 'producto prueba',
//         description: 'Este es un producto prueba',
//         price: 200,
//         thumbnail: 'sin imagen',
//         code: 'asd123',
//         stock: 25,
  
//     }
//     const data2 = {
//         title: 'producto prueba 2',
//         description: 'Este es un producto prueba2',
//         price: 500,
//         thumbnail: 'sin imagen',
//         code: 'asd1231',
//         stock: 12,
//     }
//     const data3 = {
//         title: 'producto prueba 3',
//         description: 'Este es un producto prueba3',
//         price: 430,
//         thumbnail: 'sin imagen',
//         code: 'asd1583',
//         stock: 12,
//     }
//     const data4 = {
//         title: 'producto prueba 4',
//         description: 'Este es un producto prueba4',
//         price: 760,
//         thumbnail: 'sin imagen',
//         code: 'asd8442',
//         stock: 12,
//     }

    
//     await productManager.addProduc(data);
//     console.log(await productManager.getProducts());
   
//     await productManager.addProduc(data2);
//     await productManager.addProduc(data3);
//     await productManager.addProduc(data4);
//     console.log(await productManager.getProducts());

// }
// test();