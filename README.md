# E commerce backend
เป็น server สำหรับระบบ e commerce ที่มีระบบสมาชิก สามารถเพิ่ม/ลด และสั่งซื้อสินค้าและบริการได้

## การติดตั้ง
- npm i

## การตั้งค่า prisma schema
- npx prisma migrate dev --name init

## เริ่มการทำงาน
- npm start

## หลักการ oop ที่ใช้
- encapsulation: แยกการทำงานด้วยคลาสได้แก่ UserService, categoryService
- sigle Resposibility: แยกคลาส เมธอด และไฟล์ตามหน้าที่


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



## conclusion oop
oop มีหลักอยู่ 4 อย่าง
คือ 1.abstrack มีส่วนประกอบย่อย อยู่ 2 อย่าง คือ 1 class และ 2 method
ซึ่ง class เป็น object ที่มี method อยู่ในนั้น ตัวอย่าง

'class Car {
    constructor(color, brand) {
        this.color = color;
        this.brand = brand;
    }

    drive() {
        console.log(`The ${this.color} ${this.brand} is driving.`);
    }

    stop() {
        console.log(`The ${this.color} ${this.brand} has stopped.`);
    }
}'
ในตัวอย่างโค๊ดมี class Car ที่รับ 2 property ในคลาสมี 2 method โดยที่ผายนอกจะไม่รู้ว่า
แต่ละmethod ทำอะไร เวลาเรียกใช้ให้แสดงก็สามารถทำงานได้
และป้องกันการถึงจากแหล่งที่อื่นที่ไม่ใช่ตัวมันเอง

2.Encapsulation
การห่อหุ้มการปกป้องข้อมูล
จากโค๊ดตัวอย่างจะไม่สามารถเข้าถึงค่าของตัวแปรได้โดยตรง
เช่นจะใช้ cosole.log(color) จะไม่สามามารถเข้าถึงค่าของ color ได้
การจะเข้าถึงค่าต้องเข้าผ่านเฉพาะ method ที่กำหนดไว้เท่านั้น

สมมติ const myCar = new Car("red","honda")
การจะเข้าถึงให้แสดงค่าparameter เข้าผ่าน method
myCar.drive()

3.การสืบทอด
เป็นการเข้าถึงobject จากที่สืบทอด และสามารถเพิ่ม parameter หรือ method เข้าไปเพิ่มได้หรือสามารถ
เขียน method ชื่อซ้ำทับไปได้ 
เช่น 'class Car {
    #color;  // ห่อหุ้มด้วย #
    #brand;

    constructor(color, brand) {
        this.#color = color;
        this.#brand = brand;
    }

    getColor() {
        return this.#color;
    }
}'

ต่อไปการสืบทอด
'class ElectricCar extends Car {  // การสืบทอดจากคลาส Car
    constructor(color, brand, batteryLevel) {
        super(color, brand);
        this.batteryLevel = batteryLevel;
    }
}'

4.ความสามารถในการใช้ method เดียวกันที่ต่าง object กัน
จะแสดงตามตัวอย่าง เช่นมี 2 class แต่มัน method ชื่อเดียวกันเลยซึ่ง method
ชื่อเดียวกัน แต่ในmethod ที่ชื่อเดัยวกันทำงานไม่เหมือนกัน
โค๊ดตัวอย่าง
'class Car {
    drive() {
        console.log("The car is driving.");
    }
}

class ElectricCar extends Car {
    drive() {
        console.log("The electric car is driving silently.");
    }
}

function testDrive(car) {
    car.drive();
}

const car = new Car();
const electricCar = new ElectricCar();

testDrive(car);           // Output: The car is driving.
testDrive(electricCar);   // Output: The electric car is driving silently.'

จะเห็นว่า method drive ใน class Car ต่างจาก class ElectricCar

เมื่อมีการเรียกใช้ function testDrive ถึงแม้ method เดียวกันแต่ผลลัพธ์ที่ได้ต่างกัน