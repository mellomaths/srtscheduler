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
    Interface.clearFields();
});

document.querySelector('#listaDeProcessos').addEventListener('click', e => {
    const id = e.target.parentElement.parentElement.parentElement.id;
    Interface.deleta(e.target);
    scheduler.removeProcesso(id);
});

document.querySelector('#iniciarEscalonamento').addEventListener('click', async e => {
    e.preventDefault();
    if (scheduler.processos.length == 0) {
        Interface.showAlert('Adicione pelo menos um processo antes de iniciar o escalonamento', 'info');
        return;
    }

    Interface.resetScheduleApplication();

    Interface.disableForm();
    Interface.showProcessProgressBar(scheduler);

    await scheduler.start();

    Interface.clearProcessList();
    Interface.enableForm();
    Interface.changeStartScheduleButton();
    scheduler.reset();
});
