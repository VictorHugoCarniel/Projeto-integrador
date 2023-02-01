let btnMobile = document.querySelector("#navbar--btnMobile");
let nav = document.querySelector("#navbar");

btnMobile.onclick = () => {
  nav.classList.toggle("active");
  btnMobile.classList.toggle("active");
};

window.onscroll = () => {
  nav.classList.remove("active");
  btnMobile.classList.remove("active");
};

let modal = document.querySelector("#modalCarrinho");
function abreFechaModal() {
  modal.classList.toggle("ativo");
}
