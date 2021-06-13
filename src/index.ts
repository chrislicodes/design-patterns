// Publish / Subscriber Pattern
type Listener<EventType> = (event: EventType) => void;

function createObserver<EventType>(): {
  subscribe: (listener: Listener<EventType>) => () => void;
  publish: (event: EventType) => void;
} {
  let listeners: Listener<EventType>[] = []; //Closure

  return {
    subscribe: (listener: Listener<EventType>): (() => void) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
    publish: (event: EventType) => {
      listeners.forEach((l) => l(event));
    },
  };
}

interface BeforeSetEvent<T> {
  value: T;
  newValue: T;
}

interface AfterSetEvent<T> {
  value: T;
}

interface Todo {
  id: string;
  title: string;
  description: string;
}

interface BaseRecord {
  id: string;
}

interface Database<T extends BaseRecord> {
  set(newValue: T): void;
  get(id: string): T | undefined;

  onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void;
  onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void;
}

//Factory Pattern hides what we are implementing (either in memory or SQL or whatever) from the code
function createDatabase<T extends BaseRecord>() {
  class InMemoryDatabase implements Database<T> {
    private db: Record<string, T> = {};

    // other way to create a singleton:
    // static instance: InMemoryDatabase = new InMemoryDatabase();
    // private constructor() {}
    // then we call outside of this class TodoDB.instance.set({})

    public set(newValue: T): void {
      this.beforeAddListeners.publish({
        newValue,
        value: this.db[newValue.id],
      });

      this.db[newValue.id] = newValue;

      this.afterAddListeners.publish({
        value: newValue,
      });
    }

    public get(id: string): T {
      return this.db[id];
    }

    private beforeAddListeners = createObserver<BeforeSetEvent<T>>();
    private afterAddListeners = createObserver<AfterSetEvent<T>>();

    onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void {
      return this.beforeAddListeners.subscribe(listener);
    }
    onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void {
      return this.afterAddListeners.subscribe(listener);
    }
  }

  //Singleton - used for example in Redux Stores - Singleton means "there can only be one";
  const db = new InMemoryDatabase();
  return db;

  //Factory and Second Variant for Singleton
  //return InMemoryDataBase
}

// Using the Factory without Singleton:
// const TodoDB = createDatabase<Todo>();
// const todoDB = new TodoDB();

//Singleton
const todoDB = createDatabase<Todo>();

todoDB.set({
  id: "123",
  title: "new Todo",
  description: "todo description",
});

todoDB.onAfterAdd(({ value }) => {
  console.log(value);
});

todoDB.set({
  id: "456",
  title: "new Todo 2",
  description: "todo description 2",
});
