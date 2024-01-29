import { v4 as uuidv4 } from 'uuid';

class Item {
    private _id: string = uuidv4();
    private _name: string;
    private _price: number;
    private _description: string;

    constructor(name: string, price: number, description: string) {
        this._name = name;
        this._price = price;
        this._description = description;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }
}


class User {
    private _id: string = uuidv4();
    private _name: string;
    private _age: number;
    private _cart: Item[] = [];

    constructor(name: string, age: number) {
        this._name = name;
        this._age = age;
    }


    // Getter for cart
    get cart(): Item[] {
        return [...this._cart];
    }

    // Method to add an item to the cart
    addToCart(item: Item): void {
        this._cart.push(item);
    }

    // Method to remove all instances of an item from the cart
    removeFromCart(itemId: string): void {
        this._cart = this._cart.filter(item => item.id !== itemId);
    }

    // Method to remove a specific quantity of an item from the cart
    removeQuantityFromCart(itemId: string, quantity: number): void {
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
    cartTotal(): number {
        return this._cart.reduce((total, item) => total + item.price, 0);
    }

    // Method to print the items in the cart
    printCart(): void {
        this._cart.forEach(item => console.log(`${item.name}: $${item.price}`));
        console.log(`Total: $${this.cartTotal()}`);
    }
}



class Shop {
    private _items: Item[] = [];

    constructor() {
        this._items.push(new Item("Item A", 100, "Description A"));
        this._items.push(new Item("Item B", 200, "Description B"));
        this._items.push(new Item("Item C", 300, "Description C"));
    }

    get items(): Item[] {
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
