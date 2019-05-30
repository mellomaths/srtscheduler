var totalDeProcessos = 0;

document.querySelector('#process-form').addEventListener('submit', e => {
    e.preventDefault();

    const tempoChegada = document.querySelector('#tempoChegada').value;
    const tempoExecucao = document.querySelector('#tempoExecucao').value;

    if (!tempoChegada || !tempoExecucao) {
        Interface.showAlert('Preencha todos os campos', 'info');
        return;
    }

    totalDeProcessos++;
    const id = totalDeProcessos;
    const processo = new Processo(id, tempoExecucao, tempoChegada);

    Interface.adiciona(processo);
});
