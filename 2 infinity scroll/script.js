const IMAGE_CONTAINER = document.getElementById('image-container')
const LOADER = document.getElementById('loader')
let ready = false
let imagesLoaded = 0
let totalImages = 0
let photoArray = []

//API
let count = 10
const API_KEY = ''
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`

async function getPhotos(){
   try {
    const response = await fetch(apiURL)
    photoArray = await response.json()
    displayPhotos()
    console.log(photoArray)
   } catch (error) {
       console.log(error)
   }
}
//Calling function
getPhotos()


//Creating elementes

function displayPhotos(){
    totalImages = photoArray.length
    console.log(`Total images: ${totalImages}`)
    photoArray.forEach(photo => {
        
        //Create an <a> element to link to unsplash
        const item = document.createElement('a')
        setAttributes(item, {href: photo.links.html, target: '_blank'})
       
        //Creating the img tag
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        //Event to check whe it finish loading
        img.addEventListener('load', imageLoader)
        //Put img insede a then put both inside container
        item.appendChild(img)
        IMAGE_CONTAINER.appendChild(item)
    })
}

// TODO:
function addingDetails(){
    //create details tag
    const details = document.createElement('details')
    const summary = document.createElement('summary')
    const p = document.createElement('p')
    const node = document.createTextNode("This is new.");

//https://www.w3schools.com/js/js_htmldom_nodes.asp#:~:text=To%20add%20text%20to%20the,is%20a%20new%20paragraph.%22)%3B

}

//Function to set attributes
function setAttributes(el, attrs) {
    for(let key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

function imageLoader(){
    imagesLoaded++
    console.log(`Image loaded`)
    if(imagesLoaded === totalImages){
        LOADER.hidden = true
        ready = true
        console.log(`ready= ${ready}`)
    }
}

//Checking if scroll is near the bottom
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
            getPhotos()
            ready = false
            imagesLoaded = 0
    }
})

        /**
        const img = document.createElement('img')
        Object.assign(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
         */

//TODO:
/**
 <details>
  <summary>Epcot Center</summary>
  <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
</details>
 */