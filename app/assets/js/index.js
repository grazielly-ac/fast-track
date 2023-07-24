import { createCard, arrayCarrinho } from "./card.js";
import { listarFeminino, listarMasculino, listarInfantil, removerItemCarrinho, buscarCarrinho, fetchJson, baseUrl} from "./http.js";

const links = document.querySelectorAll(".lista-link"); //seleciona todos os links
const divPai = document.querySelector(".divPai");
const paiDivItens = document.querySelector(".div-pai");
const itensPesquisados = document.querySelector(".pesquisados");
const pesquisadosDivItens = document.querySelector(".pesquisados-itens");
const btnPesquisar = document.getElementById("btnPesquisar");
const pesquisarEntrada = document.querySelector("#pesquisar");
let listaCarrinho = arrayCarrinho;


/**Funções para buscar os dados em mockup vestuario.js */
let feminino = async () =>
await listarFeminino().then((items) => {
    
    items.forEach((item) => {
        createCard(item, paiDivItens);
    });
});

let masculino = async () =>
listarMasculino().then((items) => {
    items.forEach((item) => {
        createCard(item, paiDivItens);
    });
});

let infantil = async () =>
listarInfantil().then((items) => {
    items.forEach((item) => {
        createCard(item, paiDivItens);
    });
});

async function listarTodos() {
    return await Promise.all([feminino(), infantil(), masculino()]);
}

listarTodos(); //apresentar todos os dados em tela
/**Funções para buscar os dados em mockup vestuario.js */

/**Função para selecionar link de acordo com o click do usuário */
links.forEach((link, index) => {
    
  link.addEventListener("click", async (evt) => {
    evt.preventDefault();
    paiDivItens.replaceChildren();
    divPai.style.display = "flex";
    itensPesquisados.style.display = "none";

    switch (index) {
      case 0:
        
        await listarTodos();
        break;
      case 1:
        await feminino();
        break;
      case 2:
        await infantil();
        break;
      case 3:
        await masculino();
        break;
    }
  });
});

/**Função para selecionar link de acordo com o click do usuário */

/**Funções para selecionar produto pelo campo pesquisa, ao clicar no botão pesquisar */
async function todosOsDados(){
    const [fem, inf, mas] = await Promise.all([listarFeminino(), listarInfantil(), listarMasculino()]);
    let array = [];
    array.push(...fem, ...inf, ...mas);

    return array;
}

btnPesquisar.addEventListener("click", async () => {
    //limpar div dos produtos selecionados anteriormente, a cada clique  <div class="pesquisados"></div>
    while(pesquisadosDivItens.firstChild){
        pesquisadosDivItens.removeChild(pesquisadosDivItens.firstChild);
    }

    let todosProdutos = await todosOsDados();
    let valorProcurado = pesquisarEntrada.value; //entrada do usuário no input


    todosProdutos.forEach(item => {
        let descricao = item.produto; //titulo do produto
       
        if(descricao.toLowerCase().includes(valorProcurado.toLowerCase()) && pesquisarEntrada.value != undefined){ //compara se o valor procurado está contido em item.produto 
            divPai.style.display = "none"; //oculta os produtos para apresentar os selecionados
            itensPesquisados.style.display = "flex";
            createCard(item, pesquisadosDivItens); //cria cards dos produtos pesquisados
        }else{
            
        }
    });

});

/**Função para selecionar produto pelo campo pesquisa, ao clicar no botão pesquisar */

/**Modal de produtos selecionados - exibir no botão de carrinho */
console.log(pesquisarEntrada.valueo)
export const atualizarCarrinho = async () => {
    
    listaCarrinho = await buscarCarrinho();
    let total = 0;
    let quantidade = listaCarrinho.length;

    listaCarrinho.forEach(item => {
        total += parseFloat(item.preco.replace('R$','').replace(',','.')) * item.quantidade;
    })
    document.querySelector('#cart-total').innerHTML = `Total: R$${total.toFixed(2)}`;
    document.querySelector('#cart-quantity').innerHTML = `Quantidade: ${quantidade}`;

    const itemsCarrinhoDiv = document.querySelector('.carrinho');
  

    listaCarrinho.forEach((item) => {
      
        const card = document.createElement("div");
        card.setAttribute("class","card card-item");
        card.style.width = "15rem";
        card.classList.add("mb-3");

        const img = document.createElement("img");
        img.src = item.caminho;
        img.alt = item.produto;
        img.setAttribute("class", "card-img-top ");
        
        const cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");
      
        
        const cardTitle = document.createElement("P");
        cardTitle.setAttribute("class", "card-title");
        cardTitle.textContent = item.produto;
        
        const cardPrice = document.createElement("p");
        cardPrice.setAttribute("class", "card-text");
        cardPrice.textContent = parseFloat(item.preco.replace('R$','').replace(',','.')) * item.quantidade;

        const cardQuantity = document.createElement("p");
        cardQuantity.setAttribute("class", "card-text");
        cardQuantity.textContent = `Quantidade: ${item.quantidade}`;
        
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardPrice);
        cardBody.appendChild(cardQuantity);
        
        card.appendChild(img);
        card.appendChild(cardBody);

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remover";
        removeButton.setAttribute("class","btn btn-primary")
        removeButton.addEventListener("click", async () => {
            if (item.quantidade > 1) {
              // Diminuir a quantidade do item
              item.quantidade -= 1;
              await fetchJson(`${baseUrl}carrinho/${item.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
              });
            } else {
              // Remover o item do carrinho
              await removerItemCarrinho(item.id);
            }
            atualizarCarrinho();
          });
        cardBody.appendChild(removeButton);

        itemsCarrinhoDiv.appendChild(card)
    })


    
}
atualizarCarrinho();

/**Modal de produtos selecionados - exibir no botão de carrinho */

