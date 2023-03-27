let pedidos = [];

if (typeof window === "object") {
  document.addEventListener('click', (e) => {
    const targetEl = e.target;

    if (targetEl.classList.contains('btnComprar')) {
      const cardBody = targetEl.parentNode;
      const filhos = cardBody.childNodes;
      const penultimoFilho = filhos[filhos.length - 4];
      const divTitulo = cardBody.firstElementChild;
      const h2nome = divTitulo.firstElementChild;
      const nome = h2nome.textContent;
      const preco = penultimoFilho.textContent;

      const pedido = criarPedido(nome, preco)

      pedidos.push(pedido);

      atualizaCarrinho(pedidos);
    }
  })

  document.addEventListener('click', (e) => {
    const targetEl = e.target;

    if (targetEl.classList.contains('increment')) {
      const quantidadePedido = targetEl.parentNode;
      const pedidoItem = quantidadePedido.nextElementSibling;
      const pedidoTexto = pedidoItem.lastElementChild;
      const h2Nome = pedidoTexto.firstElementChild;
      var nome = h2Nome.textContent;
      pedidos.forEach(pedido => {
        if (pedido.nome == nome) {
          pedido.quantidade = pedido.quantidade += 1;
          atualizaSubTotal();
          atualizaQuantidadePedidos();
        }

      })
    }
  })

  document.addEventListener('click', (e) => {
    const targetEl = e.target;

    if (targetEl.classList.contains('decrement')) {
      const quantidadePedido = targetEl.parentNode;
      const pedidoItem = quantidadePedido.nextElementSibling;
      const pedidoTexto = pedidoItem.lastElementChild;
      const h2Nome = pedidoTexto.firstElementChild;
      var nome = h2Nome.textContent;
      pedidos.forEach(pedido => {
        if (pedido.nome == nome && pedido.quantidade > 0) {
          pedido.quantidade = pedido.quantidade -= 1;
          removeCarrinho();
          atualizaSubTotal();
          atualizaQuantidadePedidos();
        }
      })
    }

  })
} else {
  // code is running in a non-browser environment
}

function criarPedido(nome, preco) {
  const precoFormatado = retornaPreco(preco);
  const id = Math.random();

  return {
    id,
    nome,
    preco: precoFormatado,
    quantidade: 1
  };
}

function removeCarrinho() {
  const novoArray = pedidos.filter(pedido => pedido.quantidade != 0);
  pedidos = novoArray;
  atualizaCarrinho(pedidos);
}

function atualizaSubTotal() {
  let tagSubTotal = document.querySelector("#subtotal");
  let subtotal = 0;

  pedidos.forEach((pedido) => {
    subtotal += pedido.preco * pedido.quantidade;
  });

  if (subtotal >= 0) {
    tagSubTotal.innerHTML = `<strong>Subtotal:</strong> R$ ${subtotal.toFixed(2)}`;
  } else {
    tagSubTotal.innerHTML = `<strong>Subtotal:</strong> R$ 0.00`;
  }
}

function retornaPreco(preco) {
  var preco = preco.slice(7);
  return preco;
}

function atualizaCarrinho(pedidos) {
  let tagPedidos = document.querySelector("#pedidos");
  tagPedidos.innerHTML = "";

  pedidos.forEach((pedido) => {
    tagPedidos.innerHTML += `
                              <div class="pedido">
                                <div class="quantidade pedido--quantidade">
                                    <button class='decrement'>-</button>
                                    <p class="num-contador-pedido">${pedido.quantidade}</p>
                                    <button class='increment'>+</button>
                                </div>
                                <div class="pedido--item">
                                      <div class="pedido--texto">
                                          <h2>${pedido.nome}</h2>
                                          <p>$${pedido.preco}</p>
                                      </div>
                                </div>
                              </div>
                                `;

    atualizaSubTotal();
    atualizaNotificacao();
  });

}

function atualizaQuantidadePedidos() {
  const numContadorPedidos = document.querySelectorAll('.num-contador-pedido');
  numContadorPedidos.forEach((contador) => {
    const nomePedido = contador.parentNode.nextElementSibling.lastElementChild.firstElementChild.textContent;
    console.log(nomePedido)
    pedidos.forEach((pedido) => {
      if (pedido.nome === nomePedido) {
        contador.textContent = pedido.quantidade;
      }
    });
  });
}


//#region Tarefas Iniciais

function carregaPedidos() {
  let pedidosStorage = JSON.parse(localStorage.getItem("pedidosCarrinho"));

  if (!pedidosStorage) {
    return;
  } else {
    for (let item of pedidosStorage) {
      pedidos.push(item);
    }
    atualizaCarrinho();
  }
}

//#endregion

//#region Eventos

function addCarrinho(id, nome, preco, imagem) {
  let { valorContador } = dadosContador(id);
  let tagUnidades;

  let idProduto = "b" + id;

  for (let i = 0; i < valorContador; i++) {
    let pedidoExiste = buscaProduto(idProduto);

    if (!pedidoExiste) {
      pedidos.push({
        idProduto,
        nome,
        preco,
        imagem,
        quantidade: valorContador,
      });
      atualizaCarrinho();
      break;
    } else {
      atualizaContador(idProduto);
      break;
    }
  }
  tagUnidades = document.querySelector("#unidades");
  tagCards = document.querySelector(".card")

  let UnidadesRestantes = estoqueUnidades(valorContador, idProduto);

  if (UnidadesRestantes == 0) {
    console.log("aa")
    tagCards.classList.add("displayNone")
  }

}

function buscaProduto(idProduto) {
  let produto = pedidos.find((item) => item.idProduto == idProduto);

  return produto;
}



function atualizaContador(idProduto) {
  let { valorContador } = dadosContador(idProduto.replace(/^./, ""));
  let { tagContador } = dadosContador(idProduto);

  atualizaQtdItensCarrinho(idProduto, tagContador, valorContador);

  atualizaSubTotal();
}

function atualizaQtdItensCarrinho(idProduto, tagContador, valorContador) {
  let indexPedidos = pedidos.findIndex((pedido) => {
    return pedido.idProduto === idProduto;
  });

  if (!pedidos[indexPedidos]) {
    return;
  }

  pedidos[indexPedidos].quantidade = valorContador;

  updateDisplay(tagContador, pedidos[indexPedidos].quantidade);
}

function atualizaNotificacao() {
  let notf = document.querySelector("#notificacao");

  notf.innerHTML = pedidos.length;
}

function gravaPedidos() {
  localStorage.setItem("pedidosCarrinho", JSON.stringify(pedidos));
}

function enviaPedido() {
  let tagPedidos = document.querySelector("#pedidos");
  console.log('sdfsdfsdfsd')
}

// function GetCard(cardBody){
//     console.log(cardBody)
// };
//#endregion



function EnviaId(idProduto) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
  };
  xhttp.open("GET", "/home/" + idProduto, true);
  xhttp.send();
}

module.exports = EnviaId;