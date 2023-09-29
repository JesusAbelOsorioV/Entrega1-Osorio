class ProductManager {
    constructor(){
        this.products =[];
    }


addProduc(title, description, price, thumbnail, code, stock){
    
    if (this.products.some((productManager) => productManager.code === code)) {
        console.log(`ya existe un producto con el code: ${code}`);
        return;
    } else{
        this.products.push({
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        });
    }
}
getProducts(){
    return this.products;
}

getProductsById(id){
    const product = this.products.find(p => p.id === id);
    if (product) {
     return product;
    } else{
    console.log('Not found');
    }
}
}

let productManager = new ProductManager();

console.log(productManager.getProducts())
productManager.addProduc('producto prueba', 'Este es un producto prueba', 200, 'sin imagen', 'asd123', 25)

console.log(productManager.getProducts());

productManager.addProduc('producto prueba', 'Este es un producto prueba', 200, 'sin imagen', 'asd123', 25)

console.log(productManager.getProducts());
console.log(productManager.getProductsById(3));
