import { EMPLOYEE_TYPE } from './employee.js';

const MAX_CALLS = 10;

export default class Dispatcher {
  constructor(
    callsQueue = [],
    directorsQueue = [],
    supervisorsQueue = [],
    operatorsQueue = []
  ) {
    this.#callsQueue = callsQueue; // FIFO llamadas

    this.#directorsQueue = directorsQueue; // FIFO directores
    this.#supervisorsQueue = supervisorsQueue; // FIFO supervisores
    this.#operatorsQueue = operatorsQueue; // FIFO operadores
  }

  #callsQueue;

  #directorsQueue;
  #supervisorsQueue;
  #operatorsQueue;

  #currentCalls = 0; // contador de llamadas concurrentes

  // agrega una llamada a la cola
  addCall(call) {
    this.#callsQueue.push(call);
  }

  dispatchCall() {
    return new Promise((resolve) => {
      if (!this.#callsQueue.length)
        return resolve({ message: 'no more calls' });
      if (!(this.#currentCalls < MAX_CALLS))
        return resolve({ message: 'no free slots' });

      let employee;

      // en lugar de 3 if tambien se podria hacer un concat de los 3 arrays, no se cual seria mas optimo
      // se usa shift para tomar el empleado libre mas antiguo en la cola (FIFO)
      if (this.#operatorsQueue.length) {
        employee = this.#operatorsQueue.shift();
      } else if (this.#supervisorsQueue.length) {
        employee = this.#supervisorsQueue.shift();
      } else if (this.#directorsQueue.length) {
        employee = this.#directorsQueue.shift();
      }

      if (!employee) return resolve({ message: 'no free employees' });

      const call = this.#callsQueue.shift();

      this.#currentCalls++;

      this.startCall(call).then(() => {
        this.#currentCalls--;

        this.releaseEmployee(employee);

        resolve({
          employee: employee.getData,
          call: call.getData,
        });
      });
    });
  }

  // libera un empleado luego de terminar su llamada y lo vuelve a pushear en su cola respectiva
  releaseEmployee(employee) {
    switch (employee.getType) {
      case EMPLOYEE_TYPE.OPERATOR:
        this.#operatorsQueue.push(employee);
        break;
      case EMPLOYEE_TYPE.SUPERVISOR:
        this.#supervisorsQueue.push(employee);
        break;
      case EMPLOYEE_TYPE.DIRECTOR:
        this.#directorsQueue.push(employee);
        break;
    }

    return;
  }

  // inicia la llamada con un time out para simular la duracion
  startCall(call) {
    return new Promise((resolve) =>
      setTimeout(() => resolve(), call.getDuration)
    );
  }
}
