// Real world example

// Imagine you run a car service shop offering multiple services. Now how do you calculate the bill to be charged? You pick one service and dynamically keep adding to it the prices for the provided services till you get the final cost. Here each type of service is a decorator.

// In plain words

// Decorator pattern lets you dynamically change the behavior of an object at run time by wrapping them in an object of a decorator class.

// Wikipedia says

// In object-oriented programming, the decorator pattern is a design pattern that allows behavior to be added to an individual object, either statically or dynamically, without affecting the behavior of other objects from the same class. The decorator pattern is often useful for adhering to the Single Responsibility Principle, as it allows functionality to be divided between classes with unique areas of concern.

/*
Coffee interface:
getCost()
getDescription()
*/

interface Coffee {
  getCost(): number;
  getDescription(): string;
}

class SimpleCoffee implements Coffee {
  getCost() {
    return 10;
  }

  getDescription() {
    return "Simple coffee";
  }
}

class MilkCoffee implements Coffee {
  coffee: Coffee;
  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  getCost() {
    return this.coffee.getCost() + 2;
  }

  getDescription() {
    return this.coffee.getDescription() + ", milk";
  }
}

class WhipCoffee implements Coffee {
  coffee: Coffee;
  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  getCost() {
    return this.coffee.getCost() + 5;
  }

  getDescription() {
    return this.coffee.getDescription() + ", whip";
  }
}

class VanillaCoffee implements Coffee {
  coffee: Coffee;
  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  getCost() {
    return this.coffee.getCost() + 3;
  }

  getDescription() {
    return this.coffee.getDescription() + ", vanilla";
  }
}

let someCoffee;

someCoffee = new SimpleCoffee();
console.log(someCoffee.getCost()); // 10
console.log(someCoffee.getDescription()); // Simple Coffee

someCoffee = new MilkCoffee(someCoffee);
console.log(someCoffee.getCost()); // 12
console.log(someCoffee.getDescription()); // Simple Coffee, milk

someCoffee = new WhipCoffee(someCoffee);
console.log(someCoffee.getCost()); // 17
console.log(someCoffee.getDescription()); // Simple Coffee, milk, whip

someCoffee = new VanillaCoffee(someCoffee);
console.log(someCoffee.getCost()); // 20
console.log(someCoffee.getDescription()); // Simple Coffee, milk, whip, vanilla

//TS Example

export interface Component {
  operation(): void;
}

export class ConcreteComponent implements Component {
  private s: String;

  constructor(s: String) {
    this.s = s;
  }

  public operation(): void {
    console.log(
      "`operation` of ConcreteComponent",
      this.s,
      " is being called!"
    );
  }
}

export class Decorator implements Component {
  private component: Component;
  private id: Number;

  constructor(id: Number, component: Component) {
    this.id = id;
    this.component = component;
  }

  public get Id(): Number {
    return this.id;
  }

  public operation(): void {
    console.log("`operation` of Decorator", this.id, " is being called!");
    this.component.operation();
  }
}

export class ConcreteDecorator extends Decorator {
  constructor(id: Number, component: Component) {
    super(id, component);
  }

  public operation(): void {
    super.operation();
    console.log(
      "`operation` of ConcreteDecorator",
      this.Id,
      " is being called!"
    );
  }
}
