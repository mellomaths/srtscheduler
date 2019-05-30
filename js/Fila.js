class Fila {
    constructor() {
        this.fila = [];
    }

    self() {
        return this.fila;
    }

    insere(process) {
        this.fila.push(process);
    }

    get() {
        return this.fila.shift();
    }
}
