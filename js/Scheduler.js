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

    finalizaProcesso(processo) {
        processo.status = 'Concluído';
        this.processosProntos.push(processo);
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
        while (this.processos.length !== this.processosProntos.length) {
            this.insereProcessoNaFilaDePronto(tempoAtualExecucao);
            await this.sleep(5000);
            console.log(tempoAtualExecucao);
            console.log(this.filaDeProntos);

            if (this.processoExecutando) {
                this.processoExecutando.status = 'Pronto';
                this.filaDeProntos.insere(this.processoExecutando);
            }

            await this.sleep(2000);
            console.log(this.filaDeProntos);
            this.processoExecutando = this.filaDeProntos.next();
            console.log(this.processoExecutando);
            if (!this.processoExecutando) {
                tempoAtualExecucao++;
                continue;
            }
            this.processoExecutando.status = 'Executando';
            this.processoExecutando.diminuiTempoRestante();

            if (this.processoExecutando.tempoRestante == 0) {
                this.finalizaProcesso(this.processoExecutando);
                this.processoExecutando = null;
            }

            tempoAtualExecucao++;
            await this.sleep(2000);
            console.log(this.processos);
        }
        console.log('END');
        console.log(this.processosProntos);
    }
}
