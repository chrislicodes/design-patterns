// Real world example

// An old radio set will be a good example of iterator, where user could start at some channel and then use next or previous buttons to go through the respective channels. Or take an example of MP3 player or a TV set where you could press the next and previous buttons to go through the consecutive channels or in other words they all provide an interface to iterate through the respective channels, songs or radio stations.

// In plain words

// It presents a way to access the elements of an object without exposing the underlying presentation.

// Wikipedia says

// In object-oriented programming, the iterator pattern is a design pattern in which an iterator is used to traverse a container and access the container's elements. The iterator pattern decouples algorithms from containers in some cases, algorithms are necessarily container-specific and thus cannot be decoupled.

class RadioStation {
  frequency: number;

  constructor(frequency: number) {
    this.frequency = frequency;
  }

  getFrequency() {
    return this.frequency;
  }
}

//Iterator
class StationList {
  stations: RadioStation[];

  constructor() {
    this.stations = [];
  }

  addStation(station: RadioStation) {
    this.stations.push(station);
  }

  removeStation(toRemove: RadioStation) {
    const toRemoveFrequency = toRemove.getFrequency();
    this.stations = this.stations.filter((station) => {
      return station.getFrequency() !== toRemoveFrequency;
    });
  }
}

const stationList = new StationList();

stationList.addStation(new RadioStation(89));
stationList.addStation(new RadioStation(101));
stationList.addStation(new RadioStation(102));
stationList.addStation(new RadioStation(103.2));

stationList.stations.forEach((station) => console.log(station.getFrequency()));

stationList.removeStation(new RadioStation(89)); // Will remove station 89

//TS Version

export interface Iterator {
  next(): any;
  hasNext(): boolean;
}

export interface Aggregator {
  createIterator(): Iterator;
}

export class ConcreteIterator implements Iterator {
  private collection: any[] = [];
  private position: number = 0;

  constructor(collection: any[]) {
    this.collection = collection;
  }

  public next(): any {
    // Error handling is left out
    var result = this.collection[this.position];
    this.position += 1;
    return result;
  }

  public hasNext(): boolean {
    return this.position < this.collection.length;
  }
}

export class Numbers implements Aggregator {
  private collection: number[] = [];

  constructor(collection: number[]) {
    this.collection = collection;
  }
  public createIterator(): Iterator {
    return new ConcreteIterator(this.collection);
  }
}
