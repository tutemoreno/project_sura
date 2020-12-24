export default class Call {
  constructor(number, duration) {
    this.#number = number;
    this.#duration = duration;
  }

  #number;
  #duration;

  get getDuration() {
    return this.#duration;
  }

  get getData() {
    return { number: this.#number, duration: this.#duration };
  }
}
