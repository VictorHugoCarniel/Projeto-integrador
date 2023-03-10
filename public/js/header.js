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