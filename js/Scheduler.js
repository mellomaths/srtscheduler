class Scheduler {
    constructor() {
        this.processos = [];
        this.filaDeProntos = new Fila();
        this.processosConcluidos = [];
        this.processoExecutando = null;
    }

    totalDeProcessos() {
        return this.processos.length;
    }

    totalTempoDeExecucao() {
        let total = 0;
        for (let i = 0; i < this.processos.length; i++) {
            total += this.processos[i].tempoExecucao;
        }

        return total;
    }

    walkPercentage() {
        return this.totalTempoDeExecucao() / 100;
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

    finalizaProcesso(processo) {
        processo.status = 'Concluído';
        this.processosConcluidos.push(processo);
    }

    insereProcessoNaFilaDePronto(tempoAtualExecucao) {
        for (let i = 0; i < this.processos.length; i++) {
            let processo = this.processos[i];
            if (processo.tempoChegada == tempoAtualExecucao) {
                processo.status = 'Pronto';
                this.filaDeProntos.insere(processo);
            }
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async start() {
        let tempoAtualExecucao = 0;
        console.log(this.processos);
        while (this.processos.length !== this.processosConcluidos.length) {
            this.insereProcessoNaFilaDePronto(tempoAtualExecucao);
            await this.sleep(2000);
            await Interface.updateProcessProgressBar(this);
            console.log('Escalonamento DEBUG - Tempo: ', tempoAtualExecucao);
            console.log('Escalonamento DEBUG - Fila de Prontos: ', this.filaDeProntos);

            if (this.processoExecutando) {
                this.processoExecutando.status = 'Pronto';
                this.filaDeProntos.insere(this.processoExecutando);
            }

            console.log('Escalonamento DEBUG - Fila de Prontos: ', this.filaDeProntos);
            this.processoExecutando = this.filaDeProntos.next();
            console.log('Escalonamento DEBUG - Processo em execução: ', this.processoExecutando);
            if (!this.processoExecutando) {
                tempoAtualExecucao++;
                continue;
            }

            this.processoExecutando.status = 'Executando';
            this.processoExecutando.diminuiTempoRestante();

            await Interface.updateProcessProgressBar(this);
            if (this.processoExecutando.tempoRestante == 0) {
                this.finalizaProcesso(this.processoExecutando);
                this.processoExecutando = null;
            }

            tempoAtualExecucao++;
            console.log('Escalonamento DEBUG - Processos: ', this.processos);
        }
        console.log('END');
        console.log(this.processosConcluidos);
    }
}
