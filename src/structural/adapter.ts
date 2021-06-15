// Real world example

// Consider that you have some pictures in your memory card and you need to transfer them to your computer. In order to transfer them you need some kind of adapter that is compatible with your computer ports so that you can attach memory card to your computer. In this case card reader is an adapter. Another example would be the famous power adapter a three legged plug can't be connected to a two pronged outlet, it needs to use a power adapter that makes it compatible with the two pronged outlet. Yet another example would be a translator translating words spoken by one person to another

// In plain words

// Adapter pattern lets you wrap an otherwise incompatible object in an adapter to make it compatible with another class.

// Wikipedia says

// In software engineering, the adapter pattern is a software design pattern that allows the interface of an existing class to be used as another interface. It is often used to make existing classes work with others without modifying their source code.

/*
Lion interface :

roar()
*/

// First we have an interface Lion that all types of lions have to implement

interface Lion {
  roar(): void;
}

class AfricanLion implements Lion {
  roar() {}
}

class AsianLion implements Lion {
  roar() {}
}

// And hunter expects any implementation of Lion interface to hunt.

class Hunter {
  hunt(lion: Lion) {
    // ... some code before
    lion.roar();
    //... some code after
  }
}

// Now let's say we have to add a WildDog in our game so that hunter can hunt that also. But we can't do that directly because dog has a different interface. To make it compatible for our hunter, we will have to create an adapter that is compatible

interface Dog {
  bark(): void;
}

// This needs to be added to the game
class WildDog implements Dog {
  bark() {}
}

// Adapter around wild dog to make it compatible with our game
class WildDogAdapter {
  dog: Dog;
  constructor(dog: Dog) {
    this.dog = dog;
  }

  roar() {
    this.dog.bark();
  }
}

const wildDog = new WildDog();
const wildDogAdapter = new WildDogAdapter(wildDog);

const hunter = new Hunter();
hunter.hunt(wildDogAdapter);
