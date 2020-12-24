export const EMPLOYEE_TYPE = { DIRECTOR: 1, SUPERVISOR: 2, OPERATOR: 3 };

export default class Employee {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}
