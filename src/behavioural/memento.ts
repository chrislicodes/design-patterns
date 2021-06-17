// Real world example

// Take the example of calculator (i.e. originator), where whenever you perform some calculation the last calculation is saved in memory (i.e. memento) so that you can get back to it and maybe get it restored using some action buttons (i.e. caretaker).

// In plain words

// Memento pattern is about capturing and storing the current state of an object in a manner that it can be restored later on in a smooth manner.

// Wikipedia says

// The memento pattern is a software design pattern that provides the ability to restore an object to its previous state (undo via rollback).

// Usually useful when you need to provide some sort of undo functionality.

//Text Editor

class EditorMemento {
  _content: unknown;

  constructor(content) {
    this._content = content;
  }

  getContent() {
    return this._content;
  }
}

//Originator

class Editor {
  _content: unknown;

  constructor() {
    this._content = "";
  }

  type(words) {
    this._content = this._content + " " + words;
  }

  getContent() {
    return this._content;
  }

  save() {
    return new EditorMemento(this._content);
  }

  restore(memento) {
    this._content = memento.getContent();
  }
}

const editor = new Editor();

// Type some stuff
editor.type("This is the first sentence.");
editor.type("This is second.");

// Save the state to restore to : This is the first sentence. This is second.
const saved = editor.save();

// Type some more
editor.type("And this is third.");

// Output: Content before Saving
console.log(editor.getContent()); // This is the first sentence. This is second. And this is third.

// Restoring to last saved state
editor.restore(saved);

console.log(editor.getContent()); // This is the first sentence. This is second.
