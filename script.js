
// CARRINHO


let carrinho = [];



// ADICIONAR PRODUTO


function adicionarCarrinho(nome, preco) {

    // Procurar se o produto já existe
    const produtoExistente = carrinho.find(
        produto => produto.nome === nome
    );


    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }


    atualizarCarrinho();

}



// ATUALIZAR CARRINHO

function atualizarCarrinho() {

    const lista = document.getElementById("listaCarrinho");

    const quantidadeCarrinho =
        document.getElementById("quantidadeCarrinho");

    const carrinhoVazio =
        document.getElementById("carrinhoVazio");


    if (!lista) return;


    lista.innerHTML = "";


    let quantidadeTotal = 0;


    
    // CARRINHO VAZIO
    

    if (carrinho.length === 0) {

        carrinhoVazio.style.display = "block";

    } else {

        carrinhoVazio.style.display = "none";
    }


    
    // PRODUTOS
    

    carrinho.forEach((produto, index) => {

        quantidadeTotal += produto.quantidade;


        const item = document.createElement("li");

        item.className =
            "list-group-item";


        item.innerHTML = `

            <div class="d-flex
                        justify-content-between
                        align-items-center">

                <div>

                    <strong>
                        ${produto.nome}
                    </strong>

                    <br>

                    <small>
                        R$ ${formatarPreco(produto.preco)}
                    </small>

                </div>


                <div>

                    <button
                        class="btn btn-sm btn-secondary"
                        onclick="diminuirQuantidade(${index})">

                        −

                    </button>


                    <span class="mx-2 fw-bold">

                        ${produto.quantidade}

                    </span>


                    <button
                        class="btn btn-sm btn-primary"
                        onclick="aumentarQuantidade(${index})">

                        +

                    </button>


                    <button
                        class="btn btn-sm btn-danger ms-2"
                        onclick="removerProduto(${index})">

                        🗑️

                    </button>

                </div>

            </div>
        `;


        lista.appendChild(item);

    });


    // Atualizar quantidade do ícone
    if (quantidadeCarrinho) {

        quantidadeCarrinho.textContent =
            quantidadeTotal;
    }


    calcularTotal();
}


// AUMENTAR QUANTIDADE


function aumentarQuantidade(index) {

    carrinho[index].quantidade++;

    atualizarCarrinho();
}



// DIMINUIR QUANTIDADE


function diminuirQuantidade(index) {

    carrinho[index].quantidade--;


    if (carrinho[index].quantidade <= 0) {

        carrinho.splice(index, 1);
    }


    atualizarCarrinho();
}


// REMOVER PRODUTO


function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}


// CALCULAR TOTAL


function calcularTotal() {

    let total = 0;


    carrinho.forEach(produto => {

        total +=
            produto.preco *
            produto.quantidade;

    });


    const valorTotal =
        document.getElementById("valorTotal");


    if (valorTotal) {

        valorTotal.textContent =
            `R$ ${formatarPreco(total)}`;
    }
}



// LIMPAR CARRINHO


function limparCarrinho() {

    carrinho = [];

    atualizarCarrinho();
}


// FINALIZAR COMPRA

function chuvaDeBaloes() {
    const quantidade = 100;

    for (let i = 0; i < quantidade; i++) {
        const balao = document.createElement("div");

        balao.innerHTML = "🎈";
        balao.style.position = "fixed";
        balao.style.left = Math.random() * 100 + "vw";
        balao.style.top = "-50px";
        balao.style.fontSize = (25 + Math.random() * 35) + "px";
        balao.style.zIndex = "9999";
        balao.style.pointerEvents = "none";

        document.body.appendChild(balao);

        const duracao = 3 + Math.random() * 3;

        balao.animate(
            [
                {
                    transform: "translateY(0) rotate(0deg)"
                },
                {
                    transform: `translateY(110vh) rotate(${360 + Math.random() * 360}deg)`
                }
            ],
            {
                duration: duracao * 1000,
                easing: "linear"
            }
        );

        setTimeout(() => {
            balao.remove();
        }, duracao * 1000);
    }
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("🛒 Seu carrinho está vazio!");
        return;
    }

    let total = 0;

    let nota = `===== NOTA DE COMPRA =====\n\n`;

    carrinho.forEach(produto => {
        const subtotal = produto.preco * produto.quantidade;

        total += subtotal;

        nota += `Produto: ${produto.nome}\n`;
        nota += `Quantidade: ${produto.quantidade}\n`;
        nota += `Preço: R$ ${formatarPreco(produto.preco)}\n`;
        nota += `Subtotal: R$ ${formatarPreco(subtotal)}\n`;
        nota += `--------------------------\n`;
    });

    nota += `\nTOTAL: R$ ${formatarPreco(total)}\n`;
    nota += `\nObrigado pela compra! 🎉`;

    alert(nota);

    chuvaDeBaloes();

    carrinho = [];

    atualizarCarrinho();
}


// FORMATAR PREÇO

function formatarPreco(valor) {
    return valor
        .toFixed(2)
        .replace(".", ",");
}



// INICIAR


document.addEventListener(
    "DOMContentLoaded",
    () => {

        atualizarCarrinho();

        console.log(
            "🎉 Loja Festa & Alegria carregada!"
        );

    }
);






