# PROJECT SURA

_Projecto test CallCenter_

## Comenzando 🚀

**Class Dispatcher**

_Atributos_

* callsQueue: array Call
* directorsQueue: array Director
* supervisorsQueue: array Supervisor
* OperatorsQueue: array Operator
* currentCalls: integer //contador de llamadas concurrentes (max 10)

_Se inicializa con los siguientes parametros_
```
new Dispatcher(callsQueue = [], directorsQueue = [], supervisorsQueue = [], operatorsQueue = [])
```

_Metodos_

```
addCall(Call): void

Agrega una llamada a la cola
```

```
dispatchCall(): Promise

* Al disparar este metodo toma la llamada mas antigua en "callsQueue" (FIFO)
* Asigna la llamada al primer empleado disponible por orden de prioridad de jerarquia y de antiguedad en su respectiva cola
* Aumenta el contador de llamadas concurrentes "currentCalls"
```

```
startCall(Call): Promise

Inicia la llamada simulando un delay con un setTimeout sobre la duracion
```

```
releaseEmployee(Employee): void

Libera un empleado pusheandolo de nuevo en su respectiva cola
```

**Class Employee**

_Atributos_

* id: integer
* name: string

**Class Director/Supervisor/Operator extend Employee**

_Atributos_

super(id,name)
* id: integer
* name: string
* type: integer // tipo de empleado

// EMPLOYEE_TYPE = { DIRECTOR: 1, SUPERVISOR: 2, OPERATOR: 3 }

_Se inicializa con los siguientes parametros_
```
new Employee(id, name)
```

**Class Call**

* number: string //numero de telefono guardado como string
* duration: integer //tiempo de la duracion de la llamada en milisegundos

## Ejecutando las pruebas ⚙️

_npm test_

### Diagrama 🔧

_project/diagram.drawio_

_Abrir con www.draw.io_

### Test y puntos extra 🔩

_project/test/dispatcher.js_

1. _El test unitario que requiere el ejercicio pidiendo 10 llamadas simultaneas_
2. _Caso de error cuando se llama a dispatchCall y ya no hay mas llamadas en la cola (PLUS)_
3. _Caso de error cuando se llama a dispatchCall y no hay empleados disponibles (PLUS)_
4. _Caso de error cuando se llama a dispatchCall 11 veces cuando solo hay 10 slots disponibles para llamadas (PLUS)_
5. _Revision de prioridad_

## Construido con 🛠️

* [mocha.js](http://https://mochajs.org/)
* [chai](https://https://www.chaijs.com/)

## Autor ✒️

* **Matias Adrian Moreno Gallo** 
