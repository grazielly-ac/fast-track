export const baseUrl = "http://localhost:3000/";

export async function fetchJson(url, options){
    const response = await fetch(url, options);
    return await response.json();
}

export function listarFeminino(){
    return fetchJson(`${baseUrl}feminino`);
}

export function listarMasculino(){
    return fetchJson(`${baseUrl}masculino`);
}

export function listarInfantil(){
    return fetchJson(`${baseUrl}infantil`);
}

/**Funções carrinho */

/* export async function adicionarItemCarrinho(item){
        return fetchJson(`${baseUrl}carrinho`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })        
   
} */

export async function adicionarItemCarrinho(item) {
    const carrinho = await buscarCarrinho();
    const itemExistente = carrinho.find((i) => i.id === item.id);
    if (itemExistente) {
      // Atualizar a quantidade do item existente
      itemExistente.quantidade += 1;
      return fetchJson(`${baseUrl}carrinho/${itemExistente.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemExistente),
      });
    } else {
      // Adicionar o novo item ao carrinho
      item.quantidade = 1;
      return fetchJson(`${baseUrl}carrinho`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
    }
  }

export function removerItemCarrinho(id){
    return fetchJson(`${baseUrl}carrinho/${id}`, {
        method: 'DELETE'
    });
}

export function buscarCarrinho(){
    return fetchJson(`${baseUrl}carrinho`);
}
/**Funções carrinho */