var btn = document.querySelector('.btnForm')

btn.addEventListener("click", function(e) {
    
    
    var inputLanche = document.querySelector("#inputLanche")
    var lanche = inputLanche.value

    var inputPreco = document.querySelector("#inputPreco")
    var Preco = inputPreco.value

    var inputPeso = document.querySelector("#inputPeso")
    var Peso = inputPeso.value 

    if(lanche.length  =! 0 || Preco.length != 0 || Peso.length  != 0) {
        alert('Produto cadastrado com sucesso!!')
    } else if (lanche.length  == 0 || Preco.length == 0 || Peso.length == 0){
        alert('Todos os campos do formulário devem estar preenchidos!!')
    }
})

function myFunction() {
    setTimeout(function(){ document.getElementById("image-form").submit();}, );   
    setTimeout(function(){ document.getElementById("formIMG").submit();}, );   
    }





