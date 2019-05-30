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

document
    .querySelector('#listaDeProcessos')
    .addEventListener('click', e => {
        const id = e.target.parentElement.parentElement.parentElement.id;
        Interface.deleta(e.target);
        scheduler.removeProcesso(id);
    });

document
    .querySelector('#iniciarEscalonamento')
    .addEventListener('click', e => {
        const escalonamentoDiv = document.querySelector(
            '#cardEscalonamento'
        );
        for (let i = 0; i < scheduler.processos.length; i++) {
            const processo = scheduler.processos[i];
            const div = document.createElement('div');
            div.classList.add('mt-2');
            div.innerHTML = `
                <label for="progresso${processo.id}">Processo ${
                processo.id
            }</label>
                <div class="progress" id="progresso${processo.id}">
                    <div
                        id="progresso${processo.id}-nonexisting"
                        class="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        style="width: 15%"
                        aria-valuenow="15"
                        aria-valuemin="0"
                        aria-valuemax="100"
                    ></div>
                    <div
                        id="progresso${processo.id}-executing"
                        class="progress-bar progress-bar-striped progress-bar-animated bg-success"
                        role="progressbar"
                        style="width: 30%"
                        aria-valuenow="30"
                        aria-valuemin="0"
                        aria-valuemax="100"
                    ></div>
                    <div
                        id="progresso${processo.id}-stopped"
                        class="progress-bar progress-bar-striped progress-bar-animated bg-danger"
                        role="progressbar"
                        style="width: 20%"
                        aria-valuenow="20"
                        aria-valuemin="0"
                        aria-valuemax="100"
                    ></div>
                </div>
            `;
            escalonamentoDiv.appendChild(div);
        }
    });
