"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Item {
    constructor(name, price, description) {
        this._id = (0, uuid_1.v4)();
        this._name = name;
        this._price = price;
        this._description = description;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
}
class User {
    constructor(name, age) {
        this._id = (0, uuid_1.v4)();
        this._cart = [];
        this._name = name;
        this._age = age;
    }
    // Getter for cart
    get cart() {
        return [...this._cart];
    }
    // Method to add an item to the cart
    addToCart(item) {
        this._cart.push(item);
    }
    // Method to remove all instances of an item from the cart
    removeFromCart(itemId) {
        this._cart = this._cart.filter(item => item.id !== itemId);
    }
    // Method to remove a specific quantity of an item from the cart
    removeQuantityFromCart(itemId, quantity) {
        let count = 0;
        this._cart = this._cart.filter(item => {
            if (item.id === itemId && count < quantity) {
                count++;
                return false;
            }
            return true;
        });
    }
    // Method to calculate the total price of all items in the cart
    cartTotal() {
        return this._cart.reduce((total, item) => total + item.price, 0);
    }
    // Method to print the items in the cart
    printCart() {
        this._cart.forEach(item => console.log(`${item.name}: $${item.price}`));
        console.log(`Total: $${this.cartTotal()}`);
    }
}
class Shop {
    constructor() {
        this._items = [];
        this._items.push(new Item("Item A", 100, "Description A"));
        this._items.push(new Item("Item B", 200, "Description B"));
        this._items.push(new Item("Item C", 300, "Description C"));
    }
    get items() {
        return this._items;
    }
}
// Create a Shop and a User
let shop = new Shop();
let user = new User("John Doe", 30);
// Add items to the user's cart
user.addToCart(shop.items[0]); // Add Item A
user.printCart();
// Remove an item from the cart
user.removeFromCart(shop.items[0].id);
user.printCart();
// Add multiple items and remove a quantity
user.addToCart(shop.items[1]); // Add Item B
user.addToCart(shop.items[1]); // Add another Item B
user.addToCart(shop.items[1]); // Add another Item B
user.removeQuantityFromCart(shop.items[1].id, 2); // Remove 2 Item B
user.printCart();
