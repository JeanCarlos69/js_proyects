const toggleSwitch = document.querySelector("input[type=checkbox]")
const textSpan = document.querySelector("#toggle-icon > span")
const icon = document.querySelector("#toggle-icon > .fas")
const bodyBackground = document.querySelector('body')
const images = document.querySelectorAll('img')
const textBox = document.querySelector("#text-box")
const nav = document.getElementById('nav')


toggleSwitch.addEventListener('change', ()=>{

    if(!toggleSwitch.checked){
    toggleDarkLightMode(false)
    localStorage.setItem('theme', 'light')
    } else{
    toggleDarkLightMode(true)
    
    }

})

function imageChanger(imgs, mode = 'dark'){
    imgs.forEach(element => {
        if(element.id === 'image1')
        element.src = `img/undraw_proud_coder_${mode}.svg`
        
        if(element.id === 'image2')
        element.src = `img/undraw_feeling_proud_${mode}.svg`
        
        if(element.id === 'image3')
        element.src = `img/undraw_conceptual_idea_${mode}.svg`
    });
}

/* This will make it a little cleaner
this was my version, but since I find andreis better I'll use his
function superFunction(innerTe, iconClass, datasetTheme, navBG, txtBG){
        textSpan.textContent = innerTe
        icon.className = iconClass
        bodyBackground.dataset.theme = datasetTheme
        imageChanger(images, datasetTheme)
        nav.style.backgroundColor = navBG
        textBox.style.backgroundColor = txtBG
}  */

function toggleDarkLightMode(isDark){

    textSpan.textContent = isDark ? 'Dark mode' : 'Light mode'
    icon.className = isDark ? 'fas fa-moon' : 'fas fa-sun'
    bodyBackground.dataset.theme = isDark ? 'dark' : 'light'
    isDark ? imageChanger(images) : imageChanger(images, 'light')
    nav.style.backgroundColor = isDark ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)'
    textBox.style.backgroundColor = isDark ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)'
    isDark ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'light') //This will save last theme chosen
}


const currentTheme = localStorage.getItem('theme')
    if(currentTheme === 'dark'){
        toggleDarkLightMode(true)
        toggleSwitch.checked = true
    } 