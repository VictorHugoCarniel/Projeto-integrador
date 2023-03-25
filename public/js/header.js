// const item = document.querySelector(".link")

// function LinkActive(){
//     item.classList.toggle("active")
// }'

document.addEventListener('DOMContentLoaded', () => {
  if (isDarkModeSystem()) {
    const chkDarkMode = document.querySelector('#chkDarkMode')
    chkDarkMode.checked = true
    darkModeToggle()
  }
})

function darkModeToggle() {
  const html = document.querySelector('html')
  html.classList.toggle('dark-mode')
}

function isDarkModeSystem() {
  return matchMedia && matchMedia('(prefers-color-scheme: dark)').matches
}


var login = document.querySelector('.user-info')
var dropdown = document.querySelector(".user-dropdown-content");
function toggleDropdown() {
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "block";
  }
  login.classList.toggle("botaozin");
}

document.addEventListener("click", function (event) {
  // Verifica se o clique ocorreu fora da toolbar
  if (!dropdown.parentElement.contains(event.target) && event.target !== login) {
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
      login.classList.toggle("botaozin");
    }
  }
});
