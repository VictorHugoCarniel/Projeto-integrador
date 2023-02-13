var btn = document.querySelector('.btnForm')

btn.addEventListener("click", function (e) {
    e.preventDefault();

    var inputNome = document.querySelector("#inputNome")
    var Nome = inputNome.value

    var inputSobrenome = document.querySelector("#inputSobrenome")
    var Sobrenome = inputSobrenome.value

    var inputEmail = document.querySelector("#inputEmail")
    var Email = inputEmail.value

    var inputTel = document.querySelector("#inputTel")
    var Tel = inputTel.value

    var inputCidade = document.querySelector("#inputCidade")
    var Cidade = inputCidade.value

    var inputSenha = document.querySelector("#inputSenha")
    var Senha = inputSenha.value

    var inputConfirmSenha = document.querySelector("#inputConfirmSenha")
    var ConfirmSenha = inputConfirmSenha.value


    if (Nome.length == 0 || Sobrenome.length == 0 || Email.length == 0 || Tel.length == 0 || Cidade.length == 0 || Senha.length == 0 || ConfirmSenha.length == 0) {
        alert('Todos os campos do formulário devem estar preenchidos!!')
    }
    else if (Nome.length == 0) {
        alert('O campo nome deve estar preenchido')
    }
    else if (Sobrenome.length == 0) {
        alert('O campo Sobrenome deve estar preenchido')
    }
    else if (Email.length == 0) {
        alert('O campo E-mail deve estar preenchido')
    }
    else if (Tel.length == 0) {
        alert('O campo telefone deve estar preenchido')
    }
    else if (Cidade.length == 0) {
        alert('O campo cidade deve estar preenchido')
    }
    else if (Senha.length == 0) {
        alert('O campo senha deve estar preenchido')
    }
    else if (ConfirmSenha.length == 0) {
        alert('O campo confirmar senha deve estar preenchido')
    }

})