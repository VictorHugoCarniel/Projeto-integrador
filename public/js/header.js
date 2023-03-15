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


const inputFile = document.getElementById('inputIMG');
const previewImage = document.getElementById('preview');

inputFile.addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener('load', function() {
      previewImage.setAttribute('src', reader.result);
    });
    reader.readAsDataURL(file);
  }
});