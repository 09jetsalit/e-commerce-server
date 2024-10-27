class Product {
    constructor (id, name, price, category) {
        this.id = id,
        this.name = name,
        this.price = price,
        this.category = category
    }

    updatePrice(newPrice) {
        this.price = newPrice
    }
}

export default Product

// Product Class
class Product {
    constructor(name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }

    addProduct() {
        // logic สำหรับเพิ่มสินค้า
    }

    updateProduct(newData) {
        // logic สำหรับอัปเดตสินค้า
    }

    deleteProduct() {
        // logic สำหรับลบสินค้า
    }
}

// Example Usage in Controller
const user1 = new User('johnDoe', 'password123', 'john@example.com');
user1.register();
user1.login();

const product1 = new Product('Laptop', 1200, 'Electronics');
product1.addProduct();
