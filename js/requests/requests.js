const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
}


const adicionarNaLista = (id, descricao, preco_custo, preco_venda, is_novo, data_criacao) => {

    let table = document.getElementById("tbl-produtos")
    let item = [id, descricao, preco_custo, preco_venda, is_novo, data_criacao];
    let row = table.insertRow();
    for (let i = 0; i < item.length; i++) {
        let cel = row.insertCell(i);
        cel.textContent = item[i];
    }


    // Crie um novo elemento de botão
    let btn = document.createElement('button');

    // Defina o conteúdo do botão
    btn.textContent = 'Excluir';

    // Adicione um manipulador de eventos click para chamar a função desejada
    btn.addEventListener('click', () => {
        deletarProduto(id)
    });

    insertButton(row.insertCell(-1))

    // Adicione o botão à última célula
    let cel = row.insertCell();
    cel.appendChild(btn);
}

const getProdutos = async () => {
    let url = 'http://127.0.0.1:5000/produto';

    let table = document.getElementById("tbl-produtos");
    // Delete rows of the table, except the header
    while(table.rows.length > 1) {
        table.deleteRow(1);
    }

    fetch(url, {method: 'GET'})
        .then((response) => response.json())
        .then((data) => {
            console.log('data: ', data);
            data['produtos'].forEach(item => adicionarNaLista(item.id, item.descricao, item.preco_custo, item.preco_venda, item.is_novo, item.data_criacao));
        })
        .catch((error) => {
            console.log(error);
        })
}

const deletarProduto = (id) => {
    console.log(id)
    let url = 'http://127.0.0.1:5000/produto?id=' + id;
    fetch(url, {
        method: 'delete'
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            atualizarTabela();  // atualizar a tabela após deletar o produto
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


const cadastrarProduto = async () => {
    //teste imagem
    const inputElement = document.getElementById("imagem");
    let file = inputElement.files[0];
    //fim teste imagem
    let nome_produto = document.getElementById('nome_produto').value;
    let preco_custo = document.getElementById('preco_custo').value;
    let preco_venda = document.getElementById('preco_venda').value;
    let is_novo = document.getElementById('is_novo').value;

    const formData = new FormData();
    formData.append('descricao', nome_produto);
    formData.append('preco_custo', preco_custo);
    formData.append('preco_venda', preco_venda);
    formData.append('imagem', file);
    formData.append('is_novo', is_novo);

    let url = 'http://127.0.0.1:5000/produto';
    fetch(url, {method: 'POST', body: formData})
        .then((response) => response.json())
        .catch((error) => {
            console.log(error);
        })

}

const atualizarTabela = () => {
    // Primeiro, limpe a tabela
    let table = document.getElementById("tbl-produtos")
    for (let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    // Então, readquira os dados e preencha a tabela
    getProdutos();
}
