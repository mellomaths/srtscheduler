class Interface {
    static adiciona(processo) {
        const listaDeProcessos = document.querySelector('#listaDeProcessos');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${processo.id}</td>
            <td>${processo.tempoChegada}</td>
            <td>${processo.tempoExecucao}</td>
            <td><button type="button" class="btn btn-danger btn-sm delete"><i class="far fa-trash-alt"></i></button></td>
        `;
        row.id = processo.id;
        listaDeProcessos.appendChild(row);
    }

    static showAlert(message, type) {
        const div = document.createElement('div');
        div.className = `alert alert-${type}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#form-card');
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    static deleta(target) {
        if (target.classList.contains('delete')) {
            target.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#tempoChegada').value = '';
        document.querySelector('#tempoExecucao').value = '';
    }

    static disableForm() {
        // Disable Form Inputs
        document.querySelector('#tempoChegada').disabled = true;
        document.querySelector('#tempoExecucao').disabled = true;

        // Disable Buttons in Form
        document.querySelector('#iniciarEscalonamento').disabled = true;
        document.querySelector('#adicionarProcesso').disabled = true;
        document.querySelectorAll('.delete').forEach(btnDelete => (btnDelete.disabled = true));
    }

    static enableForm() {
        // Disable Form Inputs
        document.querySelector('#tempoChegada').disabled = false;
        document.querySelector('#tempoExecucao').disabled = false;

        // Disable Buttons in Form
        document.querySelector('#iniciarEscalonamento').disabled = false;
        document.querySelector('#adicionarProcesso').disabled = false;
        document.querySelectorAll('.delete').forEach(btnDelete => (btnDelete.disabled = false));
    }

    static clearProcessList() {
        const listaDeProcessos = document.querySelector('#listaDeProcessos');
        listaDeProcessos.innerHTML = '';
    }

    static resetScheduleApplication() {
        const progressosDiv = document.querySelector('#progressos');
        progressosDiv.innerHTML = '';
        const tempoLabel = document.querySelector(`#tempo-atual-execucao`);
        tempoLabel.innerHTML = `Tempo: 0`;
    }

    static changeStartScheduleButton() {
        document.querySelector('#iniciarEscalonamento').innerHTML = 'Iniciar Novo Escalonamento';
    }

    static createProgressBar(processId, type, valuenow = 0) {
        let classList = 'progress-bar progress-bar-striped progress-bar-animated';
        switch (type) {
            case 'Pronto':
                break;
            case 'Executando':
                classList += ' bg-success';
                break;
            case 'Fora':
                classList += ' bg-danger';
                break;
        }

        return `
            <div
                id="progresso${processId}-${type}"
                class="${classList}"
                role="progressbar"
                style="width: ${valuenow}%"
                aria-valuenow="${valuenow}"
                aria-valuemin="0"
                aria-valuemax="100"
            ></div>
        `;
    }

    static showProcessProgressBar(scheduler) {
        const progressosDiv = document.querySelector('#progressos');
        for (let i = 0; i < scheduler.processos.length; i++) {
            const processo = scheduler.processos[i];
            const div = document.createElement('div');
            div.classList.add('mt-2');
            div.innerHTML = `
                <label for="progresso${processo.id}">Processo ${processo.id}</label>
                <label class="float-right" id="status-${processo.id}">Status: ${processo.status}. Tempo Restante: ${
                processo.tempoRestante
            }</label>
                <div class="progress" id="progresso${processo.id}"></div>
            `;
            progressosDiv.appendChild(div);
        }
    }

    static async updateProcessProgressBar(scheduler) {
        let walk = scheduler.walkPercentage();
        if (walk < 1) {
            walk = 2;
        }

        for (let i = 0; i < scheduler.processos.length; i++) {
            const process = scheduler.processos[i];
            if (process.status == 'Concluído') {
                continue;
            }

            const progressDiv = document.querySelector(`#progresso${process.id}`);
            if (!progressDiv.lastElementChild) {
                console.log('Criou Progress bar');
                console.log(process.status);
                progressDiv.innerHTML = Interface.createProgressBar(process.id, process.status, walk);
            } else {
                const lastDivCreatedStatus = progressDiv.lastElementChild.id.split('-')[1];
                console.log(lastDivCreatedStatus, process.status);
                if (lastDivCreatedStatus == process.status) {
                    let valuenow = parseInt(progressDiv.lastElementChild.getAttribute('aria-valuenow'));
                    progressDiv.lastElementChild.style.width = `${walk + valuenow}%`;
                    progressDiv.lastElementChild.setAttribute('aria-valuenow', walk + valuenow);
                } else {
                    progressDiv.innerHTML += Interface.createProgressBar(process.id, process.status, walk);
                }
            }
        }
    }

    static async updateProcessStatus(scheduler) {
        for (let i = 0; i < scheduler.processos.length; i++) {
            const process = scheduler.processos[i];
            const statusLabel = document.querySelector(`#status-${process.id}`);
            statusLabel.innerHTML = `Status: ${process.status}. Tempo Restante: ${process.tempoRestante}`;
        }
    }

    static async updateTempoAtualExecucao(tempo) {
        const tempoLabel = document.querySelector(`#tempo-atual-execucao`);
        tempoLabel.innerHTML = `Tempo: ${tempo + 1}`;
    }
}
