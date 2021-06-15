// Wikipedia says:

// * The abstract factory pattern provides a way to encapsulate a group of individual factories that have a common theme without specifying their concrete classes

// Real world example:

// *  Based on your needs you might get a wooden door from a wooden door shop, iron door from an iron shop or a PVC door from the relevant shop. Plus you might need a guy with different kind of specialities to fit the door, for example a carpenter for wooden door, welder for iron door etc. As you can see there is a dependency between the doors now, wooden door needs carpenter, iron door needs a welder etc.

// Door Interface

class WoodenDoor {
  getDescription() {
    console.log("I am a wooden door");
  }
}

class IronDoor {
  getDescription() {
    console.log("I am an iron door");
  }
}

// Fitting Interface

class Welder {
  getDescription() {
    console.log("I can only fit iron doors");
  }
}

class Carpenter {
  getDescription() {
    console.log("I can only fit wooden doors");
  }
}

// Doorfactory Interface

// Wooden factory to return carpenter and wooden door
class WoodenDoorFactory {
  makeDoor() {
    return new WoodenDoor();
  }

  makeFittingExpert() {
    return new Carpenter();
  }
}

// Iron door factory to get iron door and the relevant fitting expert
class IronDoorFactory {
  makeDoor() {
    return new IronDoor();
  }

  makeFittingExpert() {
    return new Welder();
  }
}

const woodenFactory = new WoodenDoorFactory();

const woodenDoor = woodenFactory.makeDoor();
const woodenExpert = woodenFactory.makeFittingExpert();

woodenDoor.getDescription(); // Output: I am a wooden door
woodenExpert.getDescription(); // Output: I can only fit wooden doors

// Same for Iron Factory
const ironFactory = new IronDoorFactory();

const ironDoor = ironFactory.makeDoor();
const ironExpert = ironFactory.makeFittingExpert();

ironDoor.getDescription(); // Output: I am an iron door
ironExpert.getDescription(); // Output: I can only fit iron doors

// As you can see the wooden door factory has encapsulated the carpenter and the wooden door also iron door factory has encapsulated the iron door and welder. And thus it had helped us make sure that for each of the created door, we do not get a wrong fitting expert.

// When to use?

// When there are interrelated dependencies with not-that-simple creation logic involved

//Other Example

function droidProducer(kind?: string) {
  if (kind === "battle") return battleDroidFactory;
  return pilotDroidFactory;
}

function battleDroidFactory() {
  return new B1();
}

function pilotDroidFactory() {
  return new Rx24();
}

class B1 {
  info() {
    return "B1, Battle Droid";
  }
}

class Rx24 {
  info() {
    return "Rx24, Pilot Droid";
  }
}

const battleProducer = droidProducer("battle");
const battleDroid = battleProducer();

battleDroid.info();

//Typescript Way

namespace AbstractFactoryPattern {
  export interface AbstractProductA {
    methodA(): string;
  }

  export interface AbstractProductB {
    methodB(): number;
  }

  export interface AbstractFactory {
    createProductA(param?: any): AbstractProductA;
    createProductB(): AbstractProductB;
  }

  export class ProductA1 implements AbstractProductA {
    methodA = () => {
      return "This is methodA of ProductA1";
    };
  }
  export class ProductB1 implements AbstractProductB {
    methodB = () => {
      return 1;
    };
  }

  export class ProductA2 implements AbstractProductA {
    methodA = () => {
      return "This is methodA of ProductA2";
    };
  }
  export class ProductB2 implements AbstractProductB {
    methodB = () => {
      return 2;
    };
  }

  export class ConcreteFactory1 implements AbstractFactory {
    createProductA(param?: any): AbstractProductA {
      return new ProductA1();
    }

    createProductB(param?: any): AbstractProductB {
      return new ProductB1();
    }
  }
  export class ConcreteFactory2 implements AbstractFactory {
    createProductA(param?: any): AbstractProductA {
      return new ProductA2();
    }

    createProductB(param?: any): AbstractProductB {
      return new ProductB2();
    }
  }

  export class Tester {
    private abstractProductA: AbstractProductA;
    private abstractProductB: AbstractProductB;

    constructor(factory: AbstractFactory) {
      this.abstractProductA = factory.createProductA();
      this.abstractProductB = factory.createProductB();
    }

    public test(): void {
      console.log(this.abstractProductA.methodA());
      console.log(this.abstractProductB.methodB());
    }
  }
}
