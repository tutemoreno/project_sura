import Employee, { EMPLOYEE_TYPE } from './employee.js';

export default class Operator extends Employee {
  constructor(id, name) {
    super(id, name);
    this.#type = EMPLOYEE_TYPE.OPERATOR;
  }

  #type;

  get getType() {
    return this.#type;
  }
}
