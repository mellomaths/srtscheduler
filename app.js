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

    // Disable Form Inputs
    document.querySelector('#tempoChegada').disabled = true;
    document.querySelector('#tempoExecucao').disabled = true;

    // Disable Buttons in Form
    document.querySelector('#iniciarEscalonamento').disabled = true;
    document.querySelector('#adicionarProcesso').disabled = true;
    document.querySelectorAll('.delete').forEach(btnDelete => (btnDelete.disabled = true));

    Interface.showProcessProgressBar(scheduler);

    await scheduler.start();
});
