class Processo {
    constructor(id, tempoExecucao, tempoChegada) {
        this.id = id;
        this.tempoExecucao = tempoExecucao;
        this.tempoChegada = tempoChegada;
        this.tempoRestante = tempoExecucao;
    }

    diminuiTempoRestante() {
        this.tempoRestante--;
    }
}
