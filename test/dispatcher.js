import chai from "chai";
import Dispatcher from "../models/dispatcher.js";
import Director from "../models/director.js";
import Supervisor from "../models/supervisor.js";
import Operator from "../models/operator.js";
import Call from "../models/call.js";

const expect = chai.expect;

describe("Starting test...", function() {
  it("dispatchCall (10)", function(done) {
    // en este test entran 10 llamadas y se les asignan a los 8 operadores, las 2 faltantes a los primeros 2 supervisores en la cola, ningun director atiende llamados

    const mockDirectors = [
        new Director(1, "Director 1"),
        new Director(2, "Director 2")
      ],
      mockSupervisors = [
        new Supervisor(1, "Supervisor 1"),
        new Supervisor(2, "Supervisor 2"),
        new Supervisor(3, "Supervisor 3"),
        new Supervisor(4, "Supervisor 4"),
        new Supervisor(5, "Supervisor 5")
      ],
      mockOperators = [
        new Operator(1, "Operator 1"),
        new Operator(2, "Operator 2"),
        new Operator(3, "Operator 3"),
        new Operator(4, "Operator 4"),
        new Operator(5, "Operator 5"),
        new Operator(6, "Operator 6"),
        new Operator(7, "Operator 7"),
        new Operator(8, "Operator 8")
      ],
      mockCalls = [
        new Call("0000-0001", 5000),
        new Call("0000-0002", 10000),
        new Call("0000-0003", 7000),
        new Call("0000-0004", 6000),
        new Call("0000-0005", 8000),
        new Call("0000-0006", 5000),
        new Call("0000-0007", 9000),
        new Call("0000-0008", 7000),
        new Call("0000-0009", 10000),
        new Call("0000-0010", 5000)
      ];

    const dispatcher = new Dispatcher(
      mockCalls,
      mockDirectors,
      mockSupervisors,
      mockOperators
    );

    Promise.all([
      dispatcher.dispatchCall(),
      dispatcher.dispatchCall(),
      dispatcher.dispatchCall(),
      dispatcher.dispatchCall(),
      dispatcher.dispatchCall(),
      dispatcher.dispatchCall(),
      dispatcher.dispatchCall(),
      dispatcher.dispatchCall(),
      dispatcher.dispatchCall(),
      dispatcher.dispatchCall()
    ]).then(res => {
      expect(res).to.deep.equal([
        {
          employee: { id: 1, name: "Operator 1", type: 3 },
          call: { number: "0000-0001", duration: 5000 }
        },
        {
          employee: { id: 2, name: "Operator 2", type: 3 },
          call: { number: "0000-0002", duration: 10000 }
        },
        {
          employee: { id: 3, name: "Operator 3", type: 3 },
          call: { number: "0000-0003", duration: 7000 }
        },
        {
          employee: { id: 4, name: "Operator 4", type: 3 },
          call: { number: "0000-0004", duration: 6000 }
        },
        {
          employee: { id: 5, name: "Operator 5", type: 3 },
          call: { number: "0000-0005", duration: 8000 }
        },
        {
          employee: { id: 6, name: "Operator 6", type: 3 },
          call: { number: "0000-0006", duration: 5000 }
        },
        {
          employee: { id: 7, name: "Operator 7", type: 3 },
          call: { number: "0000-0007", duration: 9000 }
        },
        {
          employee: { id: 8, name: "Operator 8", type: 3 },
          call: { number: "0000-0008", duration: 7000 }
        },
        {
          employee: { id: 1, name: "Supervisor 1", type: 2 },
          call: { number: "0000-0009", duration: 10000 }
        },
        {
          employee: { id: 2, name: "Supervisor 2", type: 2 },
          call: { number: "0000-0010", duration: 5000 }
        }
      ]);

      done();
    });
  });

  it("dispatchCall without calls - ERR(no more calls)", function(done) {
    // llamada a dispatchCall sin llamadas en cola

    const mockDirectors = [new Director(1, "Director 1")],
      mockSupervisors = [new Supervisor(1, "Supervisor 1")],
      mockOperators = [new Operator(1, "Operator 1")],
      mockCalls = [];

    const dispatcher = new Dispatcher(
      mockCalls,
      mockDirectors,
      mockSupervisors,
      mockOperators
    );

    dispatcher.dispatchCall().then(res => {
      expect(res).to.deep.equal({ message: "no more calls" });

      done();
    });
  });

  it("dispatchCall without employees - ERR(no free employees)", function(done) {
    // llamada a dispatchCall sin empleados disponibles

    const mockDirectors = [],
      mockSupervisors = [],
      mockOperators = [],
      mockCalls = [new Call("0000-0001", 5000)];

    const dispatcher = new Dispatcher(
      mockCalls,
      mockDirectors,
      mockSupervisors,
      mockOperators
    );

    dispatcher.dispatchCall().then(res => {
      expect(res).to.deep.equal({ message: "no free employees" });

      done();
    });
  });

  it("dispatchCall (11) - ERR(no more slots)", function(done) {
    // entran 11 llamadas cuando solo hay 10 slots para atender

    const mockDirectors = [
        new Director(1, "Director 1"),
        new Director(2, "Director 2")
      ],
      mockSupervisors = [
        new Supervisor(1, "Supervisor 1"),
        new Supervisor(2, "Supervisor 2"),
        new Supervisor(3, "Supervisor 3"),
        new Supervisor(4, "Supervisor 4"),
        new Supervisor(5, "Supervisor 5")
      ],
      mockOperators = [
        new Operator(1, "Operator 1"),
        new Operator(2, "Operator 2"),
        new Operator(3, "Operator 3"),
        new Operator(4, "Operator 4"),
        new Operator(5, "Operator 5"),
        new Operator(6, "Operator 6"),
        new Operator(7, "Operator 7"),
        new Operator(8, "Operator 8")
      ],
      mockCalls = [
        new Call("0000-0001", 1000),
        new Call("0000-0002", 1000),
        new Call("0000-0003", 1000),
        new Call("0000-0004", 1000),
        new Call("0000-0005", 1000),
        new Call("0000-0006", 1000),
        new Call("0000-0007", 1000),
        new Call("0000-0008", 1000),
        new Call("0000-0009", 1000),
        new Call("0000-0010", 1000),
        new Call("0000-0011", 1000)
      ];

    const dispatcher = new Dispatcher(
      mockCalls,
      mockDirectors,
      mockSupervisors,
      mockOperators
    );

    Promise.all([
      dispatcher.dispatchCall(), //1
      dispatcher.dispatchCall(), //2
      dispatcher.dispatchCall(), //3
      dispatcher.dispatchCall(), //4
      dispatcher.dispatchCall(), //5
      dispatcher.dispatchCall(), //6
      dispatcher.dispatchCall(), //7
      dispatcher.dispatchCall(), //8
      dispatcher.dispatchCall(), //9
      dispatcher.dispatchCall(), //10
      dispatcher.dispatchCall() //11
    ]).then(res => {
      expect(res).to.deep.equal([
        {
          employee: { id: 1, name: "Operator 1", type: 3 },
          call: { number: "0000-0001", duration: 1000 }
        },
        {
          employee: { id: 2, name: "Operator 2", type: 3 },
          call: { number: "0000-0002", duration: 1000 }
        },
        {
          employee: { id: 3, name: "Operator 3", type: 3 },
          call: { number: "0000-0003", duration: 1000 }
        },
        {
          employee: { id: 4, name: "Operator 4", type: 3 },
          call: { number: "0000-0004", duration: 1000 }
        },
        {
          employee: { id: 5, name: "Operator 5", type: 3 },
          call: { number: "0000-0005", duration: 1000 }
        },
        {
          employee: { id: 6, name: "Operator 6", type: 3 },
          call: { number: "0000-0006", duration: 1000 }
        },
        {
          employee: { id: 7, name: "Operator 7", type: 3 },
          call: { number: "0000-0007", duration: 1000 }
        },
        {
          employee: { id: 8, name: "Operator 8", type: 3 },
          call: { number: "0000-0008", duration: 1000 }
        },
        {
          employee: { id: 1, name: "Supervisor 1", type: 2 },
          call: { number: "0000-0009", duration: 1000 }
        },
        {
          employee: { id: 2, name: "Supervisor 2", type: 2 },
          call: { number: "0000-0010", duration: 1000 }
        },
        { message: "no free slots" }
      ]);

      done();
    });
  });

  it("dispatchCall priority", function(done) {
    // en este test entran 5 llamadas cuando solo hay 4 empleados disponibles
    // se atienden todas en orden, operator 1 2 3, supervisor 1
    // segun la duracion de las llamadas el primer empleado en liberarse es el supervisor 1 (llamada de 1 seg)
    // pero al respetar la prioridad por jerarquia de los empleados
    // el operador 2 tiene una llamada de 2 segundos cuando los otros dos tienen una llamada de 3 segundos
    // entonces al reintentar dispatchCall el supervisor 1 fue el primero en liberarse pero atiende el operador 2

    const mockDirectors = [],
      mockSupervisors = [new Supervisor(1, "Supervisor 1")],
      mockOperators = [
        new Operator(1, "Operator 1"),
        new Operator(2, "Operator 2"),
        new Operator(3, "Operator 3")
      ],
      mockCalls = [
        new Call("0000-0001", 3000), // op 1
        new Call("0000-0002", 2000), // op 2
        new Call("0000-0003", 3000), // op 3
        new Call("0000-0004", 1000), // sup 1
        new Call("0000-0005", 1000) // op 2 again
      ];

    const dispatcher = new Dispatcher(
      mockCalls,
      mockDirectors,
      mockSupervisors,
      mockOperators
    );

    Promise.all([
      dispatcher.dispatchCall(),
      dispatcher.dispatchCall(),
      dispatcher.dispatchCall(),
      dispatcher.dispatchCall(),
      dispatcher.dispatchCall()
    ]).then(res => {
      expect(res).to.deep.equal([
        {
          employee: { id: 1, name: "Operator 1", type: 3 },
          call: { number: "0000-0001", duration: 3000 }
        },
        {
          employee: { id: 2, name: "Operator 2", type: 3 },
          call: { number: "0000-0002", duration: 2000 }
        },
        {
          employee: { id: 3, name: "Operator 3", type: 3 },
          call: { number: "0000-0003", duration: 3000 }
        },
        {
          employee: { id: 1, name: "Supervisor 1", type: 2 },
          call: { number: "0000-0004", duration: 1000 }
        },
        { message: "no free employees" }
      ]);

      Promise.all([dispatcher.dispatchCall(), dispatcher.dispatchCall()]).then(
        res => {
          expect(res).to.deep.equal([
            {
              employee: { id: 2, name: "Operator 2", type: 3 },
              call: { number: "0000-0005", duration: 1000 }
            },
            { message: "no more calls" }
          ]);

          done();
        }
      );
    });
  });
});
