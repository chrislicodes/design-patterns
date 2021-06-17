// Real world example

// Did you ever have fresh tea from some stall? They often make more than one cup that you demanded and save the rest for any other customer so to save the resources e.g. gas etc. Flyweight pattern is all about that i.e. sharing.

// In plain words

// It is used to minimize memory usage or computational expenses by sharing as much as possible with similar objects.

// Wikipedia says

// In computer programming, flyweight is a software design pattern. A flyweight is an object that minimizes memory use by sharing as much data as possible with other similar objects it is a way to use objects in large numbers when a simple repeated representation would use an unacceptable amount of memory.
// Anything that will be cached is flyweight.
// Types of tea here will be flyweights.
class KarakTea {}

// Acts as a factory and saves the tea
class TeaMaker {
  availableTea;
  constructor() {
    this.availableTea = {};
  }

  make(preference) {
    this.availableTea[preference] =
      this.availableTea[preference] || new KarakTea();
    return this.availableTea[preference];
  }
}

class TeaShop {
  teaMaker;
  orders;
  constructor(teaMaker) {
    this.teaMaker = teaMaker;
    this.orders = [];
  }

  takeOrder(teaType, table) {
    this.orders[table] = this.teaMaker.make(teaType);
  }

  serve() {
    this.orders.forEach((order, index) => {
      console.log("Serving tea to table#" + index);
    });
  }
}

const teaMaker = new TeaMaker();
const shop = new TeaShop(teaMaker);

shop.takeOrder("less sugar", 1);
shop.takeOrder("more milk", 2);
shop.takeOrder("without sugar", 5);

shop.serve();
// Serving tea to table# 1
// Serving tea to table# 2
// Serving tea to table# 5
