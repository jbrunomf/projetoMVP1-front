// const removeElement = () => {
//     let close = document.getElementsByClassName("close");
//     // var table = document.getElementById('myTable');
//     let i;
//     for (i = 0; i < close.length; i++) {
//         close[i].onclick = function () {
//             let div = this.parentElement.parentElement;
//             const nomeItem = div.getElementsByTagName('td')[0].innerHTML
//             if (confirm("Você tem certeza?")) {
//                 div.remove()
//                 deleteItem(nomeItem)
//                 alert("Removido!")
//             }
//         }
//     }
// }


const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
}


const appendToList = (id, product, price) => {
    let item = [id, product, price];
    let table = document.getElementById("tbl-products")
    let row = table.insertRow();

    for (let i = 0; i < item.length; i++) {
        let cel = row.insertCell(i);
        cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))
    // document.getElementById("newInput").value = "";
    // document.getElementById("newQuantity").value = "";
    // document.getElementById("newPrice").value = "";

    // removeElement()
}

const getProducts = async () => {
    let url = 'http://127.0.0.1:5000/products';

    fetch(url, {method: 'GET'}).then((response) => response.json())
        .then((data) => {
            console.log('data: ', data)
            data.forEach(item => appendToList(item.id, item.nome, item.valor))
        })
        .catch((error) => {
            console.log(error);
        })
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