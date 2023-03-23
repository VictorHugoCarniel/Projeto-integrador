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


function toggleDropdown() {
    var dropdown = document.querySelector(".user-dropdown-content");
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
    } else {
      dropdown.style.display = "block";
    }
  }
  
  function positionDropdown() {
    var dropdown = document.querySelector(".user-dropdown-content");
    var button = document.querySelector(".user-dropdown");
    var rect = button.getBoundingClientRect();
    dropdown.style.top = (rect.bottom + window.scrollY) + "px";
  }
  
