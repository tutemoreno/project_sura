export const EMPLOYEE_TYPE = { DIRECTOR: 1, SUPERVISOR: 2, OPERATOR: 3 };

export default class Employee {
  constructor(id, name) {
    this.#id = id;
    this.#name = name;
  }

  #id;
  #name;

  get getId() {
    return this.#id;
  }

  get getName() {
    return this.#name;
  }

  get getData() {
    return { id: this.#id, name: this.#name, type: this.getType };
  }
}
