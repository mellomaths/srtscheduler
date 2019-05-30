class Scheduler {
    constructor() {
        this.processos = [];
        this.filaDeProntos = new Fila();
        this.processosProntos = [];
        this.processoExecutando = null;
    }

    totalDeProcessos() {
        return this.processos.length;
    }

    adicionaProcesso(processo) {
        return this.processos.push(processo);
    }

    buscaProcesso() {
        const fila = this.filaDeProntos.self();
        return fila.reduce((prev, current) => {
            if (prev.tempoRestante < current.tempoRestante) {
                return prev;
            }

            if (prev.tempoRestante < current.tempoRestante) {
                return current;
            }

            if (prev.tempoRestante === current.tempoRestante) {
                return prev.tempoChegada < current.tempoChegada
                    ? prev
                    : current;
            }
        });
    }

    finalizaProcesso(processo) {
        this.processosProntos.push(processo);
    }
}
