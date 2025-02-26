export default class CartState {
  constructor() {
    this.observers = new Set();
    this.cart = new Map();
  }

  subscribe(func) {
    this.observers.add(func);
  }

  notify() {
    this.observers.forEach((func) => func());
  }

  getTotalPrice() {
    let total = 0;
    for (const item of this.cart.values()) {
      total += item.price * item.count;
    }
    return total;
  }

  getItemCount(product = null) {
    if (product) {
      const item = this.cart.get(product.name);
      return item ? item.count : 0;
    }

    let count = 0;
    for (const item of this.cart.values()) {
      count += item.count;
    }
    return count;
  }

  addToCart(product) {
    if (!this.cart.has(product.name)) {
      this.cart.set(product.name, {
        name: product.name,
        count: 1,
        price: product.price,
      });
    } else {
      const existingProduct = this.cart.get(product.name);
      existingProduct.count += 1;
      this.cart.set(product.name, existingProduct);
    }
    this.notify();
  }

  removeOne(product) {
    if (this.cart.has(product.name)) {
      const existingProduct = this.cart.get(product.name);
      existingProduct.count -= 1;

      if (existingProduct.count <= 0) {
        this.cart.delete(product.name);
      } else {
        this.cart.set(product.name, existingProduct);
      }
      this.notify();
    }
  }

  clearItem(product) {
    if (this.cart.has(product.name)) {
      this.cart.delete(product.name);
      this.notify();
    }
  }

  clearCart() {
    this.cart.clear();
    this.notify();
  }

  getCartItems() {
    return Array.from(this.cart.values());
  }
}
