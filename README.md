# E-Commerce Server (Object-Oriented Programming)

This e-commerce server is built using Object-Oriented Programming (OOP) principles in Node.js, with classes for user management, products, and orders. The project demonstrates OOP concepts such as encapsulation, inheritance, and modularity for better maintainability and scalability.

## OOP Principles Demonstrated

1. **Encapsulation**: Each class manages its own data and functions, creating modular components like `UserService` and `ProductService`.
2. **Inheritance**: `AdminService` extends `UserService`, adding functionalities specific to admin users.
3. **Polymorphism**: Methods with similar interfaces allow different classes to interact seamlessly.

## Project Structure

- **models/**: Defines data structures for `User`, `Product`, and `Order`.
- **services/**: Handles core business logic with service classes.
- **controllers/**: Routes HTTP requests to appropriate services.

## Key Classes

### UserService (Encapsulation Example)

Handles user registration and login, encapsulating logic for password encryption and database access.

```javascript
// services/UserService.js
import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';

class UserService {
    async register(email, password) {
        const existingUser = await prisma.user.findFirst({ where: { email } });
        if (existingUser) throw new Error("Email already exists");

        const hashPassword = await bcrypt.hash(password, 8);
        return await prisma.user.create({ data: { email, password: hashPassword } });
    }
}

export default new UserService();




# API Endpoints Summary

## Authentication

| Endpoint             | Method | Description       | Body                                         |
| -------------------- | ------ | ----------------- | -------------------------------------------- |
| `/api/login`         | POST   | Login user        | `{ "email": "tam@tam", "password": "1234" }` |
| `/api/register`      | POST   | Register user     | `{ "email": "tam@tam", "password": "1234" }` |
| `/api/current-user`  | POST   | Get current user  | None                                         |
| `/api/current-admin` | POST   | Get current admin | None                                         |

## Category

| Endpoint            | Method | Description           | Body                  |
| ------------------- | ------ | --------------------- | --------------------- |
| `/api/category`     | POST   | Create category       | `{ "name": "Test1" }` |
| `/api/category`     | GET    | Get categories        | None                  |
| `/api/category/:id` | DELETE | Delete category by ID | None                  |

## Product

| Endpoint               | Method | Description                    | Body                                                                                                        |
| ---------------------- | ------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `/api/product`         | POST   | Create product                 | `{ "title": "TEST", "description": "test", "price": 10000, "quantity": 20, "categoryId": 2, "images": [] }` |
| `/api/product/:id`     | GET    | Get product by ID              | None                                                                                                        |
| `/api/product/:id`     | DELETE | Delete product by ID           | None                                                                                                        |
| `/api/productby`       | POST   | Get products by filters        | `{ "sort": "price", "order": "asc", "limit": 2 }` or `{ "sort": "quantity", "order": "desc", "limit": 2 }`  |
| `/api/search/filters`  | POST   | Search with filters            | `{ "query": "mouse" }`, `{ "price": [100, 600] }`, or `{ "category": [1, 2] }`                              |
| `/api/products/:count` | GET    | Get product and show by amount | None                                                                                                        |
| `/api/products/:id`    | put    | Update product                 | `{ "title": "TEST", "description": "test", "price": 10000, "quantity": 20, "categoryId": 2, "images": [] }` |

## User Management

| Endpoint             | Method | Description        | Body                                                                                         |
| -------------------- | ------ | ------------------ | -------------------------------------------------------------------------------------------- |
| `/api/users`         | GET    | Get all users      | None                                                                                         |
| `/api/change-status` | POST   | Change user status | `{ "id": 1, "enabled": false }`                                                              |
| `/api/change-role`   | POST   | Change user role   | `{ "id": 1, "role": "user" }`                                                                |
| `/api/user/cart`     | POST   | Add to cart        | `{ "cart": [{ "id": 1, "count": 2, "price": 100 }, { "id": 5, "count": 1, "price": 200 }] }` |
| `/api/user/cart`     | GET    | Get cart           | None                                                                                         |
| `/api/user/cart`     | DELETE | Delete cart        | None                                                                                         |
| `/api/user/address`  | POST   | Add user address   | `{ "address": "korat" }`                                                                     |
| `/api/user/order`    | POST   | Place an order     | None                                                                                         |
| `/api/user/order`    | GET    | Get user orders    | None                                                                                         |

## Admin

| Endpoint            | Method | Description         | Body                                            |
| ------------------- | ------ | ------------------- | ----------------------------------------------- |
| `/api/admin/orders-statusr`   | PUT    | Update order status | `{ "orderId": 35, "orderStatus": "Completed" }` |
| `/api/admin/orders` | GET    | Get all orders      | None                                            |
