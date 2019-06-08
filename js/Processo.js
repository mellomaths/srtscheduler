class Processo {
    constructor(id, tempoExecucao, tempoChegada) {
        this.id = id;
        this.tempoExecucao = parseInt(tempoExecucao);
        this.tempoChegada = parseInt(tempoChegada);
        this.tempoRestante = parseInt(tempoExecucao);
        this.status = 'Fora';

        /**
         * Status:
         * Fora, Pronto, Executando, Concluído
         */
    }

    diminuiTempoRestante() {
        this.tempoRestante--;
    }
}
