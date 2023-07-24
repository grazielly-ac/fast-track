import {adicionarItemCarrinho,removerItemCarrinho, buscarCarrinho } from "./http.js";
import { atualizarCarrinho } from "./index.js";

export function createCard(objeto, divPai){

    let {id, produto, preco, caminho} = objeto;


    const card = document.createElement("div");
    card.setAttribute("class","card");
    card.style.width = "15rem";
    card.classList.add("mb-3")

    const img = document.createElement("img");
    img.src = caminho;
    img.alt = produto;
    img.setAttribute("class", "card-img-top ")

    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    card.style.height = "70vh";

    const cardTitle = document.createElement("P");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.textContent = produto;

    const cardPrice = document.createElement("p");
    cardPrice.setAttribute("class", "card-text");
    cardPrice.textContent = preco;

    const btnAdicionar = document.createElement("button");
    btnAdicionar.textContent = "Adicionar";
    btnAdicionar.setAttribute("class", "btn btn-primary adicionar");
    

    btnAdicionar.addEventListener('click', async () => {
      await adicionarItemCarrinho(objeto);
      atualizarCarrinho();
    }); //adicionar produto carrinho

    cardBody.appendChild(cardTitle);//titulo
    cardBody.appendChild(cardPrice);//preço
    cardBody.appendChild(btnAdicionar);//botão

    card.appendChild(img);//img
    card.appendChild(cardBody);//cardBody

    //divCol.appendChild(card);
    divPai.appendChild(card);

    return divPai;
}

export let arrayCarrinho = [];
