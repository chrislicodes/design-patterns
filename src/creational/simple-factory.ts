// Real world example

// Consider, you are building a house and you need doors. It would be a mess if every time you need a door, you put on your carpenter clothes and start making a door in your house. Instead you get it made from a factory.

// In plain words

// Simple factory simply generates an instance for client without exposing any instantiation logic to the client

// Wikipedia says

// In object-oriented programming (OOP), a factory is an object for creating other objects – formally a factory is a function or method that returns objects of a varying prototype or class from some method call, which is assumed to be "new".

/*
Door
getWidth()
getHeight()
*/

class WoodenDoor2 {
  #width: number;
  #height: number;

  constructor(width: number, height: number) {
    this.#width = width;
    this.#height = height;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }
}

const DoorFactory = {
  makeDoor: (width: number, height: number): WoodenDoor2 =>
    new WoodenDoor2(width, height),
};

const door = DoorFactory.makeDoor(100, 200);
console.log("Width:", door.width);
console.log("Height:", door.height);
