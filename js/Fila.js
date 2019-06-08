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

    next() {
        if (this.fila.length == 0) {
            return null;
        }

        if (this.fila.length == 1) {
            return this.fila.shift();
        }

        let index = 0;
        let nextProcess = this.fila[0];

        for (let i = 0; i < this.fila.length; i++) {
            const processo = this.fila[i];
            if (processo.tempoRestante < nextProcess.tempoRestante) {
                nextProcess = processo;
                index = i;
            } else if (
                processo.tempoRestante == nextProcess.tempoRestante &&
                processo.tempoChegada < nextProcess.tempoChegada
            ) {
                nextProcess = processo;
                index = i;
            }
        }

        return this.fila.splice(index, 1)[0];
    }
}
