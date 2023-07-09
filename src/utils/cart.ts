interface CartItem {
  item: string;
  quantity: number;
  price: number;
}
export class Cart {
  cart: CartItem[];
  constructor() {
    this.cart = [];
  }

  checkout() {
    let sum = 0;
    for (let i = 0; i < this.cart.length; i++) {
      sum += this.cart[i].price;
    }
    this.cart = [];
    return sum;
  }

  addItem(item: string, quantity: number, price: number) {
    const idx = this.cart.findIndex((cartItem) => cartItem.item === item);
    if (idx !== -1) {
      this.cart[idx].quantity += 1;
    } else {
      this.cart.push({
        item,
        quantity,
        price,
      });
    }
    return this.cart;
  }
  removeItem(item: string) {
    const idx = this.cart.findIndex((cartItem) => cartItem.item === item);
    this.cart.splice(idx, 1);
    return this.cart;
  }
}
