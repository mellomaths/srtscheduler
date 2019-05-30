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

    removeProcesso(id) {
        let processoIndice = 0;
        for (let i = 0; i < this.processos.length; i++) {
            let processo = this.processos[i];
            if (processo.id == id) {
                processoIndice = i;
            }
        }

        return this.processos.splice(processoIndice, 1);
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
