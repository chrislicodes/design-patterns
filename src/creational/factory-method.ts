// Real world example

// Consider the case of a hiring manager. It is impossible for one person to interview for each of the positions. Based on the job opening, she has to decide and delegate the interview steps to different people.

// In plain words

// It provides a way to delegate the instantiation logic to child classes.

// Wikipedia says

// In class-based programming, the factory method pattern is a creational pattern that uses factory methods to deal with the problem of creating objects without having to specify the exact class of the object that will be created. This is done by creating objects by calling a factory method—either specified in an interface and implemented by child classes, or implemented in a base class and optionally overridden by derived classes—rather than by calling a constructor.

// Programmatic Example

/*
Interviewer interface

askQuestions()
*/

interface Interviewer {
  askQuestions(): void;
}

interface HiringManager {
  takeInterview(): void;
}

class Developer implements Interviewer {
  askQuestions() {
    console.log("Asking about design patterns!");
  }
}

class CommunityExecutive implements Interviewer {
  askQuestions() {
    console.log("Asking about community building");
  }
}

class HiringManager implements HiringManager {
  makeInterviewer(): unknown {
    return;
  }

  takeInterview() {
    const interviewer = this.makeInterviewer() as Interviewer;
    interviewer.askQuestions();
  }
}

class DevelopmentManager extends HiringManager {
  makeInterviewer() {
    return new Developer();
  }
}

class MarketingManager extends HiringManager {
  makeInterviewer() {
    return new CommunityExecutive();
  }
}

const devManager = new DevelopmentManager();
devManager.takeInterview(); // Output: Asking about design patterns

const marketingManager = new MarketingManager();
marketingManager.takeInterview(); // Output: Asking about community buildng.

// When to use?

// Useful when there is some generic processing in a class but the required sub-class is dynamically decided at runtime. Or putting it in other words, when the client doesn't know what exact sub-class it might need.

//Other Example

namespace FactoryMethodPattern {
  export interface AbstractProduct {
    method(param?: any): void;
  }

  export class ConcreteProductA implements AbstractProduct {
    method = (param?: any) => {
      return "Method of ConcreteProductA";
    };
  }

  export class ConcreteProductB implements AbstractProduct {
    method = (param?: any) => {
      return "Method of ConcreteProductB";
    };
  }

  export namespace ProductFactory {
    export function createProduct(type: string): AbstractProduct {
      if (type === "A") {
        return new ConcreteProductA();
      } else if (type === "B") {
        return new ConcreteProductB();
      }

      return null;
    }
  }
}
