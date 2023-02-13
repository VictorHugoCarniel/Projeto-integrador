let oSimbolosEmail = {
  Erro: document.querySelector("#erroEmail"),
  Ok: document.querySelector("#okEmail"),
  msg: document.querySelector("#msgErroEmail"),
};

let oSimbolosSenha = {
  Erro: document.querySelector("#erroSenha"),
  Ok: document.querySelector("#okSenha"),
  msg: document.querySelector("#msgErroSenha"),
};

let oSimbolosConfirmaSenha = {
  Erro: document.querySelector("#erroConfirmSenha"),
  Ok: document.querySelector("#okConfirmSenha"),
  msg: document.querySelector("#msgErroConfirmSenha"),
};

let validacao = { email: false, senha: false };

function validaEmail(tagEmail, bModalEsqueciSenha) {
  let tagEmailF;
  let valorEmail;

  if (bModalEsqueciSenha) {
    tagEmailF = document.querySelector("#inputEmailEsqueciASenha");
    valorEmail = tagEmailF.value;
  } else {
    tagEmailF = tagEmail;
    valorEmail = tagEmail.value;
  }

  if (valorEmail == "") {
    return mostraErro(
      oSimbolosEmail,
      tagEmailF,
      "Não deixe o campo em branco!"
    );
    validacao.email = false;
  } else {
    if (valorEmail.indexOf(" ") >= 0) {
      mostraErro(oSimbolosEmail, tagEmailF, "O email não pode conter espaços!");
      validacao.email = false;
    } else {
      let validacaoRegex = /\S+@\S+\.\S+/;
      let resultadoValidacao = validacaoRegex.test(valorEmail);

      if (!bModalEsqueciSenha) {
        if (resultadoValidacao) {
          mostraOk(oSimbolosEmail, tagEmail);
          validacao.email = true;
        } else {
          mostraErro(oSimbolosEmail, tagEmail, "Email Inválido!");
          validacao.email = false;
        }
      } else {
        if (resultadoValidacao) {
          alert("Email enviado com sucesso!");
        } else {
          alert("Email Inválido!");
        }
      }
    }
  }
}

function validaSenha(tagSenha) {
  let valorSenha = tagSenha.value;
  let tagConfirmaSenha = document.querySelector("#inputConfirmSenha");

  if (valorSenha.indexOf(" ") >= 0) {
    mostraErro(oSimbolosSenha, tagSenha, "A senha não pode conter espaços!");
    validacao.senha = false;
  } else if (valorSenha.length < 8) {
    mostraErro(
      oSimbolosSenha,
      tagSenha,
      "A senha deve ter no mínimo 8 dígitos!"
    );
    validacao.senha = false;
  } else {
    mostraOk(oSimbolosSenha, tagSenha);
    validacao.senha = true;
  }

  if (window.location.pathname != "/login")
    validaSenhaIgual(tagConfirmaSenha, "inputSenha");
}

function validaSenhaIgual(tagConfirmaSenha, sIdCampoSenha) {
  let valorConfirmaSenha = tagConfirmaSenha.value;
  let valorSenha = document.querySelector(`#${sIdCampoSenha}`).value;

  if (valorConfirmaSenha !== valorSenha) {
    mostraErro(
      oSimbolosConfirmaSenha,
      tagConfirmaSenha,
      "As senhas devem ser iguais!"
    );
    validacao.senha = false;
  } else {
    mostraOk(oSimbolosConfirmaSenha, tagConfirmaSenha);
    validacao.senha = true;
  }
}

function mostraErro(objSimbolos, tagInput, msgErro) {
  resetaSimbolosValidacao(objSimbolos);
  objSimbolos.Erro.style.display = "block";
  objSimbolos.msg.style.display = "block";
  objSimbolos.msg.innerHTML = msgErro;
  tagInput.className = "form-control inputErro";
}

function mostraOk(objSimbolos, tagInput) {
  resetaSimbolosValidacao(objSimbolos);
  objSimbolos.Ok.style.display = "block";
  tagInput.className = "form-control inputOk";
}

function resetaSimbolosValidacao(objSimbolos) {
  for (let item in objSimbolos) {
    objSimbolos[item].style.display = "none";
  }
}

function enviarCadastro() {
  let inputs = document.querySelectorAll(".form-control");
  let chkTermos = document.querySelector("#chkTermos");
  let camposEmBranco;

  inputs.forEach((input) => {
    if (!input.value) {
      camposEmBranco = false;
    }
  });

   if (validacao.senha == false || validacao.email == false) {
    alert("Há campos inválidos");
  } else {
    alert("Cadastrado com sucesso!");

    window.location.href = window.location.origin + "/login";
  }
}

function login() {
  window.location.href = window.location.origin + "/";
}


