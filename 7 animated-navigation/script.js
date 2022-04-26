const menuBar = document.getElementById('menu-bars')
const overlay = document.getElementById('overlay')
const navs = document.querySelectorAll('li')

menuBar.addEventListener('click', toggleNav)
navs.forEach(nav =>{
    nav.addEventListener('click',toggleNav)
})

function toggleNav(){
    // * Toggle menu bar Open/close
    menuBar.classList.toggle('change')
    // * Toggle: Menu Active
    overlay.classList.toggle('overlay-active')
    
    if(overlay.classList.contains('overlay-active')){
        //Anime In - overlay
        removeAddClass(overlay)
        animationNav(navs)
    } else {
        // OUT
        removeAddClass(overlay,'left','right')
        animationNav(navs,'out','in')
    }
}

function removeAddClass(element,adding='right',removing='left'){
    element.classList.add(`overlay-slide-${adding}`)
    element.classList.remove(`overlay-slide-${removing}`)
}

function animationNav(elements, add="in", remove="out"){
    let counter = 1
    elements.forEach(nav => {
        nav.classList.add(`slide-${add}-${counter}`)
        nav.classList.remove(`slide-${remove}-${counter++}`)
    });
}