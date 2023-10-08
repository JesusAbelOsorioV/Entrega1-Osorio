const fs = require('fs')

class ProductManager {
    constructor(path){
        this.path = path
        this.products = [];
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
    const product = products.find(p => p.id === id);
    if (!product) {
     console.log('Not found',`el id: ${id}` );
    } 
    console.log(`Product con id: ${id}`,product);
    
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

async function test(){
    const productManager = new ProductManager('Products.json');
    const data = {
        title: 'producto prueba',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'sin imagen',
        code: 'asd123',
        stock: 25,
  
    }
    const data2 = {
        title: 'producto prueba 2',
        description: 'Este es un producto prueba',
        price: 500,
        thumbnail: 'sin imagen',
        code: 'asd1231',
        stock: 12,
  
    }

    
    await productManager.addProduc(data);
    console.log(await productManager.getProducts());
    await productManager.getProductsById(1);
    await productManager.updateProducts(1 , {title: 'producto 1', description:'producto modificado 1'});
    console.log(await productManager.getProducts());
    await productManager.deleteProduct(1);
    console.log(await productManager.getProducts());
    await productManager.addProduc(data);
    console.log(await productManager.getProducts());
    await productManager.addProduc(data2);
    console.log(await productManager.getProducts());

}
test();

