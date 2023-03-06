var btn = document.querySelector('.btnForm')

btn.addEventListener("click", function(e) {
    
    
    var inputLanche = document.querySelector("#inputLanche")
    var lanche = inputLanche.value

    var inputPreco = document.querySelector("#inputPreco")
    var Preco = inputPreco.value

    var inputPeso = document.querySelector("#inputPeso")
    var Peso = inputPeso.value 

    if(lanche.length  == 0 || Preco.length == 0 || Peso.length == 0) {
        alert('Todos os campos do formulário devem estar preenchidos!!')
    }
})

function myFunction() {
    setTimeout(function(){ document.getElementById("image-form").submit();}, );   
    setTimeout(function(){ document.getElementById("formIMG").submit();}, );   
    }

var form = document.getElementById("image-form");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    var nome = document.getElementById("inputLanche").value;
    var preco = document.getElementById("inputPreco").value;
    var peso = document.getElementById("inputPeso").value;
    var idTipoProduto = document.getElementById("tipo").value;
    console.log(nome)
    console.log(preco)
    console.log(peso)
    console.log(idTipoProduto)

    let produto = new Array();

    if(localStorage.hasOwnProperty("produto")){
     produto =JSON.parse(localStorage.getItem("produto"))
    }

    produto.push({nome, preco, peso, idTipoProduto})

    localStorage.setItem("produto", JSON.stringify(produto));
})
