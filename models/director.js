import Employee, { EMPLOYEE_TYPE } from './employee.js';

export default class Director extends Employee {
  constructor(id, name) {
    super(id, name);
    this.type = EMPLOYEE_TYPE.DIRECTOR;
  }
}
