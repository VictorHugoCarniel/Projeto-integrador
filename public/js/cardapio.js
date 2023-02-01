
let comidas = [
  {
    _id: "6245cd054c41f3195ff0f637",
    nome: "Água Mineral",
    tipoProduto: "bebida",
    preco: 2.5,
    imagem: "/public/images/agua.jpg",
    diaSemana: null,
    descricao: "500ml",
    unidades: 10,
    __v: 0,
  },
  {
    _id: "6245cd744c41f3195ff0f639",
    nome: "Fanta Laranja",
    tipoProduto: "bebida",
    preco: 3.5,
    imagem: "/public/images/fanta.jpg",
    diaSemana: null,
    descricao: "350ml",
    unidades: 10,
    __v: 0,
  },
  {
    _id: "6245cdd74c41f3195ff0f63b",
    nome: "Coca-Cola",
    tipoProduto: "bebida",
    preco: 3.5,
    imagem: "/public/images/coca.jpg",
    diaSemana: null,
    descricao: "350ml",
    unidades: 10,
    __v: 0,
  },
  {
    _id: "6245ce764c41f3195ff0f63d",
    nome: "Suco de Uva",
    tipoProduto: "bebida",
    preco: 3,
    imagem: "/public/images/sucoUva.jpg",
    diaSemana: null,
    descricao: "290ml",
    unidades: 10,
    __v: 0,
  },
  {
    _id: "6245d3e04c41f3195ff0f63f",
    nome: "Suco de Laranja",
    tipoProduto: "bebida",
    preco: 3,
    imagem: "/public/images/sucoLaranja.jpg",
    diaSemana: null,
    descricao: "290ml",
    unidades: 10,
    __v: 0,
  },
  {
    _id: "6245e123d954badd5f1c8476",
    nome: "Pão de Queijo",
    tipoProduto: "comida",
    preco: 1.5,
    imagem: "/public/images/paoDeQueijo.jpg",
    diaSemana: "segunda",
    descricao: "50g",
    unidades: 10,
    __v: 0,
  },
  {
    _id: "6245e22a61c46cc8c9eab8a6",
    nome: "Mini-Pizza",
    tipoProduto: "comida",
    preco: 5,
    imagem: "/public/images/miniPizza.jpg",
    diaSemana: "terca",
    descricao: "200g",
    unidades: 10,
    __v: 0,
  },
  {
    _id: "6245e28361c46cc8c9eab8a8",
    nome: "Bolo Nega Maluca",
    tipoProduto: "comida",
    preco: 5,
    imagem: "/public/images/bolo.jpg",
    diaSemana: "quarta",
    descricao: "200g",
    unidades: 10,
    __v: 0,
  },
  {
    _id: "6245e2e161c46cc8c9eab8aa",
    nome: "Cheesecake",
    tipoProduto: "comida",
    preco: 6,
    imagem: "/public/images/cheesecake.jpg",
    diaSemana: "terca",
    descricao: "170g",
    unidades: 10,
    __v: 0,
  },
  {
    _id: "6245e3ca61c46cc8c9eab8ac",
    nome: "Brigadeiro",
    tipoProduto: "comida",
    preco: 2,
    imagem: "/public/images/brigadeiro.jpg",
    diaSemana: "quinta",
    descricao: "40g",
    unidades: 10,
    __v: 0,
  },
  {
    _id: "6245e46c61c46cc8c9eab8ae",
    nome: "Beijinho",
    tipoProduto: "comida",
    preco: 2,
    imagem: "/public/images/beijinho.jpg",
    diaSemana: "quinta",
    descricao: "40g",
    unidades: 10,
    __v: 0,
  },
  {
    _id: "6245e54e61c46cc8c9eab8b0",
    nome: "Panqueca",
    tipoProduto: "comida",
    preco: 6,
    imagem: "/public/images/panqueca.jpg",
    diaSemana: "terca",
    descricao: "170g",
    unidades: 10,
    __v: 0,
  },
  {
    _id: "6245ecac7e1e256134010453",
    nome: "Bolo Nega Maluca",
    tipoProduto: "comida",
    preco: 5,
    imagem: "/public/images/bolo.jpg",
    diaSemana: "sexta",
    descricao: "200g",
    unidades: 10,
    __v: 0,
  },
  {
    _id: "6245e3ca61c46cc8c9eab8af",
    nome: "Brigadeiro",
    tipoProduto: "comida",
    preco: 2,
    imagem: "/public/images/brigadeiro.jpg",
    diaSemana: "terca",
    descricao: "40g",
    unidades: 10,
    __v: 0,
  },
  {
    _id: "6245e46c61c46cc8c9eab8ae",
    nome: "Beijinho",
    tipoProduto: "comida",
    preco: 2,
    imagem: "/public/images/beijinho.jpg",
    diaSemana: "terca",
    descricao: "40g",
    unidades: 10,
    __v: 0,
  },
  {
    _id: "6245e123d954badd5f1c8476",
    nome: "Pão de Queijo",
    tipoProduto: "comida",
    preco: 1.5,
    imagem: "/public/images/paoDeQueijo.jpg",
    diaSemana: "quarta",
    descricao: "50g",
    unidades: 10,
    __v: 0,
  },
  {
    _id: "6245e2e161c46cc8c9eab8aa",
    nome: "Cheesecake",
    tipoProduto: "comida",
    preco: 6,
    imagem: "/public/images/cheesecake.jpg",
    diaSemana: "quinta",
    descricao: "170g",
    unidades: 10,
    __v: 0,
  },
  {
    _id: "6245e123d954badd5f1c8476",
    nome: "Pão de Queijo",
    tipoProduto: "comida",
    preco: 1.5,
    imagem: "/public/images/paoDeQueijo.jpg",
    diaSemana: "sexta",
    descricao: "50g",
    unidades: 10,
    __v: 0,
  },
];

//#region Tarefas Iniciais

/* async function carregaProdutos() {
    await fetch('http://localhost:3000/produtos').then(res => {
        res.json().then(json => {
            json.forEach(produto => {
                comidas.push(produto)
            })
        })
    }).catch(error => {
        console.log(error);
    })

    carregaDiaSemana()
} */

function carregaDiaSemana() {//carrega o botão "clicado" no dia da semana em que a pessoa esta
  let semana = [
    "domingo",
    "segunda",
    "terca",
    "quarta",
    "quinta",
    "sexta",
    "sabado",
  ];
  let date = new Date();

  let diaAtual = semana[date.getDay()];

  if (diaAtual == "domingo" || diaAtual == "sabado") {
    diaAtual = "segunda";
  }

  let listaDias = document.querySelectorAll(".dia");// o ".dia" vem do cardapio.css

  for (let tagBtnDiaSemana of listaDias) {
    let diaSemana = verificaDiaSemanaBtn(tagBtnDiaSemana);

    if (diaSemana == diaAtual) {
      alteraBtnDiaSemana(tagBtnDiaSemana, diaSemana);
      break;
    }
  }
}

//#endregion

//#region Eventos

function alteraBtnDiaSemana(tagBtnDiaSemana) {
  let tagBtnDiaSemanaAtivo = document.querySelector(".activeSemana");//pega o dia que esta "clicado"(o botão que esta clicado tem a classe .dia acrive semana)
  let diaSemana = verificaDiaSemanaBtn(tagBtnDiaSemana);//retorna o dia que esta na tag "data-dia" no index.html

  tagBtnDiaSemanaAtivo.classList.remove("activeSemana");//remove o ".active" no botão(desclica o btn)
  tagBtnDiaSemana.classList.add("activeSemana");//coloca o atributo ".active" no "tagBtnDiaSemana"

  let bVerificaBebida = diaSemana == "bebida" ? true : false;//verifica se é bebida 

  atualizaCards(diaSemana, bVerificaBebida);//manda para a função atualizaCards o diaSemana e o bVerificaBebida
}

function atualizaCards(diaSemana, bVerificaBebida) {
  let cards = document.querySelector("#cards");//pega a div que tem o id de "cards" no index.html
  cards.innerHTML = "";

  let arrayFiltrado;

  if (bVerificaBebida) {//verifica se é bedida
    arrayFiltrado = filtraBebidas();
  } else {
    arrayFiltrado = filtraComidasDiaSemana(diaSemana);
  }

  //cria um card para cada item do arrayFiltrado
  arrayFiltrado.forEach((item) => {
    cards.innerHTML += ` 
        <div class="card">
            <div class="cardImg">
                <img src=${item.imagem} alt="imgProduto">
            </div>
            <div class="cardBody">
                <h3>${item.nome}</h3>
                <div class="precoQuantidade">
                    <p>R$${item.preco.toFixed(2)}</p>
                    <div class="quantidade">
                        <button onclick="decrementClick('a${
                          item._id
                        }')">-</button>
                        <p class="num-contador" id=a${
                          item._id
                        } data-contador="1">1</p>
                        <button onclick="incrementClick('a${
                          item._id
                        }')">+</button>
                    </div>
                </div>
                <p><i class="fas fa-balance-scale"></i> ${
                  item.descricao
                } Unidade</p>
                <button class="btnComprar" onclick="addCarrinho('a${
                  item._id
                }', '${item.nome}', ${item.preco}, '${
      item.imagem
    }')">Comprar</button>
            </div>
        </div>
        `;
  }
  );
}

function verificaDiaSemanaBtn(tagBtnDiaSemana) {
  let diaSemana = tagBtnDiaSemana.getAttribute("data-dia");//pega o conteudo da tag "data-dia" no index.html

  return diaSemana;
}

function filtraComidasDiaSemana(diaSemana) {
  let arrayComidasFiltrado = comidas.filter((comida) => {
    return comida.diaSemana == diaSemana;
  });

  return arrayComidasFiltrado;//retorna as comidas que tem o atributo diaSemana igual a variavel diaSemana
}

function filtraBebidas() {
  arrayBebidasFiltrado = comidas.filter((bebida) => {
    return bebida.tipoProduto == "bebida";
  });

  return arrayBebidasFiltrado;//retorna as comidas que tem o tipoProduto igual bebida
}

//#region contador

function incrementClick(id, contadorPedido = false) {//pega o id do produto e o boolean contadorPedido = false como parametro.
  let { tagContador, valorContador } = dadosContador(id);
  ++valorContador;

  verificaContadorPedido(contadorPedido, id, tagContador, valorContador);

  updateDisplay(tagContador, valorContador);
}

function decrementClick(id, contadorPedido = false) {//pega o id do produto e o boolean contadorPedido = false como parametro.
  let { tagContador, valorContador } = dadosContador(id);

  if (valorContador == 1 && contadorPedido == true) {
    removeCarrinho(id);
  } else if (valorContador == 1) {
    valorContador = 1;
  } else {
    --valorContador;
  }

  verificaContadorPedido(contadorPedido, id, tagContador, valorContador);

  updateDisplay(tagContador, valorContador);
}

function updateDisplay(tagContador, valorContador) {
  tagContador.setAttribute("data-contador", valorContador);

  tagContador.innerHTML = valorContador;
}

function dadosContador(id) {
  let tagContador = document.querySelector(`#${id}`);//pega os componentes que tem o "id"
  let valorContador = Number(tagContador.getAttribute("data-contador"));//o valor contador é a contagem de quantas unidades a pessoa pegou

  return { tagContador, valorContador };
}

function verificaContadorPedido(
  contadorPedido,
  id,
  tagContador,
  valorContador
) {
  if (contadorPedido) {
    atualizaQtdItensCarrinho(id, tagContador, valorContador);
    atualizaSubTotal();
  }
}

// function estoqueUnidades(valorContador,idProduto){
//   let UnidadesRestantes;

//   for (let item of comidas){
//     if("ba" + item._id == idProduto){
//       UnidadesRestantes = item.unidades - valorContador
//       return UnidadesRestantes;
//     }
//   }
  
// }

//#endregion

//#endregion
