// Real world example
// There can only be one president of a country at a time. The same president has to be brought to action, whenever duty calls. President here is singleton.

// In plain words
// Ensures that only one object of a particular class is ever created.

// Singleton pattern is actually considered an anti-pattern and overuse of it should be avoided. It is not necessarily bad and could have some valid use-cases but should be used with caution because it introduces a global state in your application and change to it in one place could affect in the other areas and it could become pretty difficult to debug. The other bad thing about them is it makes your code tightly coupled plus it mocking the singleton could be difficult.

//Way 1:

const president = (function () {
  const presidentsPrivateInformation = "Super private";

  const name = "Gans Meier";

  const getName = () => name;

  return {
    getName,
  };
})();

//Way 2

namespace SingletonPattern {
  export class Singleton {
    // A variable which stores the singleton object. Initially,
    // the variable acts like a placeholder
    private static singleton: Singleton;

    // private constructor so that no instance is created
    private constructor() {}

    printHello() {
      console.log("Hi!");
    }

    // This is how we create a singleton object
    public static getInstance(): Singleton {
      // check if an instance of the class is already created
      if (!Singleton.singleton) {
        // If not created create an instance of the class
        // store the instance in the variable
        Singleton.singleton = new Singleton();
      }
      // return the singleton object
      return Singleton.singleton;
    }
  }
}

console.log(
  SingletonPattern.Singleton.getInstance() ===
    SingletonPattern.Singleton.getInstance()
);
SingletonPattern.Singleton.getInstance().printHello();
