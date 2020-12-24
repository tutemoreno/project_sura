# project_sura
test sura

Class Dispatcher

Se inicializa con los siguientes parametros

callsQueue: array Call
directorsQueue: array Director
supervisorsQueue: array Supervisor
OperatorsQueue: array Operator

el atributo contador "currentCalls" inicia en 0 hasta un limite de 10

addCall(Call): void
agrega una llamada a la cola

dispatchCall(): Promise
al llamar este metodo toma la llamada mas antigua en "callsQueue" (FIFO)
la asigna al primer empleado disponible por orden de prioridad de jerarquia y de antiguedad en su respectiva cola
aumenta el contador de llamadas concurrentes "currentCalls"

startCall(Call): Promise
inicia la llamada simulando un delay con un setTimeout sobre la duracion

releaseEmployee(Employee): void
libera un empleado pusheandolo de nuevo en su respectiva cola

Class Employee
id: int
name: str

las clases Operador, Supervisor, Director extienden de Employee y tiene un atributo mas que el tipo de jerarquia

Class Director
type: 1
Class Supervisor
type: 2
Class Operator
type: 3

EMPLOYEE_TYPE = { DIRECTOR: 1, SUPERVISOR: 2, OPERATOR: 3 };

Class Call
number: str //numero de telefono guardado como string
duration: int //tiempo de la duracion de la llamada en milisegundos

TESTS Y PUNTOS EXTRA
1. el test unitario que requiere el ejercicio pidiendo 10 llamadas simultaneas
2. caso de error cuando se llama a dispatchCall y ya no hay mas llamadas en la cola (PLUS)
3. caso de error cuando se llama a dispatchCall y no hay empleados disponibles (PLUS)
4. caso de error cuando se llama a dispatchCall 11 veces cuando solo hay 10 slots disponibles para llamadas (PLUS)
