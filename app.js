const scheduler = new Scheduler();

document.querySelector('#process-form').addEventListener('submit', e => {
    e.preventDefault();

    const tempoChegada = document.querySelector('#tempoChegada').value;
    const tempoExecucao = document.querySelector('#tempoExecucao').value;

    if (!tempoChegada || !tempoExecucao) {
        Interface.showAlert('Preencha todos os campos', 'info');
        return;
    }

    const id = scheduler.totalDeProcessos() + 1;
    const processo = new Processo(id, tempoExecucao, tempoChegada);
    scheduler.adicionaProcesso(processo);

    Interface.adiciona(processo);
});
