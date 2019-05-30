class Interface {
    static adiciona(processo) {
        const listaDeProcessos = document.querySelector(
            '#listaDeProcessos'
        );
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
}
