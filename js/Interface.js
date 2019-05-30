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
            <td><button type="button" class="btn btn-danger btn-sm"><i class="far fa-trash-alt"></i></button></td>
        `;
        listaDeProcessos.appendChild(row);
    }
}
