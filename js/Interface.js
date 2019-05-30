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

    static createProgressBar(processId, type, valuenow = 0) {
        let classList = 'progress-bar progress-bar-striped progress-bar-animated';
        switch (type) {
            case 'nonexisting':
                break;
            case 'executing':
                classList += ' bg-success';
                break;
            case 'stopped':
                classList += ' bg-danger';
                break;
        }

        return `
            <div
                id="progresso${processId}-nonexisting"
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
        const escalonamentoDiv = document.querySelector('#cardEscalonamento');
        for (let i = 0; i < scheduler.processos.length; i++) {
            const processo = scheduler.processos[i];
            const div = document.createElement('div');
            div.classList.add('mt-2');
            div.innerHTML = `
            <label for="progresso${processo.id}">Processo ${processo.id}</label>
            <div class="progress" id="progresso${processo.id}">
                ${Interface.createProgressBar(processo.id, 'nonexisting', 15)}
                ${Interface.createProgressBar(processo.id, 'executing', 30)}
                ${Interface.createProgressBar(processo.id, 'stopped', 20)}
            </div>
        `;
            escalonamentoDiv.appendChild(div);
        }
    }
}
