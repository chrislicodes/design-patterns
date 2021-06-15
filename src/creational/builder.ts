// Separate the construction of a complex object from its representation, allowing the same construction process to create various representations.
// Real world example

// Imagine you are at Hardee's and you order a specific deal, lets say, "Big Hardee" and they hand it over to you without any questions this is the example of simple factory. But there are cases when the creation logic might involve more steps. For example you want a customized Subway deal, you have several options in how your burger is made e.g what bread do you want? what types of sauces would you like? What cheese would you want? etc. In such cases builder pattern comes to the rescue.

// In plain words

// Allows you to create different flavors of an object while avoiding constructor pollution. Useful when there could be several flavors of an object. Or when there are a lot of steps involved in creation of an object.

// Wikipedia says

// The builder pattern is an object creation software design pattern with the intentions of finding a solution to the telescoping constructor anti-pattern.

class PollutedBurger {
  constructor(
    size: number,
    cheese = true,
    pepperoni = true,
    tomato = false,
    lettuce = true
  ) {
    //setting the parameters
  }
}

// As you can see the number of constructor parameters can quickly get out of hand and it might become difficult to understand the arrangement of parameters. Plus this parameter list could keep on growing if you would want to add more options in future. This is called telescoping constructor anti-pattern.

class Burger {
  size: number;
  cheese: boolean;
  pepperoni: boolean;
  lettuce: boolean;
  tomato: boolean;

  constructor(builder: BurgerBuilder) {
    this.size = builder.size;
    this.cheese = builder.cheese || false;
    this.pepperoni = builder.pepperoni || false;
    this.lettuce = builder.lettuce || false;
    this.tomato = builder.tomato || false;
  }
}

class BurgerBuilder {
  size: number;
  cheese: boolean;
  pepperoni: boolean;
  lettuce: boolean;
  tomato: boolean;

  constructor(size) {
    this.size = size;
  }

  addPepperoni() {
    this.pepperoni = true;
    return this;
  }

  addLettuce() {
    this.lettuce = true;
    return this;
  }

  addCheese() {
    this.cheese = true;
    return this;
  }

  addTomato() {
    this.tomato = true;
    return this;
  }

  build() {
    return new Burger(this);
  }
}

const burger = new BurgerBuilder(14)
  .addCheese()
  .addLettuce()
  .addTomato()
  .build();
