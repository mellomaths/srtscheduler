class Processo {
    constructor(id, tempoExecucao, tempoChegada) {
        this.id = id;
        this.tempoExecucao = parseInt(tempoExecucao);
        this.tempoChegada = parseInt(tempoChegada);
        this.tempoRestante = this.tempoExecucao;
    }

    diminuiTempoRestante() {
        this.tempoRestante--;
    }
}
