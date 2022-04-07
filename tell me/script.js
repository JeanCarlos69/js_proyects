
const btn = document.getElementById('btn')
const post = document.getElementById('source')
const download = document.getElementById('download')
const versatile = document.getElementById('versatile')
const category = document.getElementById('ctg')

const checkbox = document.getElementById('n')
const cache = {}

btn.addEventListener('click', changeBackground)
//This is the main function
async function changeBackground(){
    const request =  await fetch(linkToUse())
    const response = await request.json()
    const bestPhoto = imageProperties(response.images)
    //Body style
    document.body.style.background = `${bestPhoto.dominant_color} url(${bestPhoto?.url}) no-repeat center center fixed`;
    document.body.style.backgroundSize = 'cover';

    post.href = bestPhoto?.source
    setAttributes(download, {download: bestPhoto?.file, href: bestPhoto?.url})
    buttonColor([post,download,btn,versatile,category], bestPhoto.dominant_color) 
}


function buttonColor(elements, color){
    elements.forEach(element =>{
        element.style.background = color
    })
}

//Set Atributes
function setAttributes(el, attrs) {
    for(let key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

  //parseInt(photos[i].width

//Chose an image == || > than the width of the curren device
function imageProperties(photos){
   //TODO: default values
   let defaultValue = {
    dominant_color: '#f5f5f5'
   }
    for(let i = 0; i < photos.length;i++){ 
        _id = photos[i].image_id //Getting the individual tag  
        if (cache.hasOwnProperty(_id)){
            //Destructury to get just what we need
            console.count()
            return {dominant_color, url, source,file} = cache[_id]
        }else {
        //We create the property with the id of the image and use destructuring 
        //to get just what we'll ned
        cache[_id] = {dominant_color, url, source,file} = photos[i]
        return  cache[_id]
    }
   }

   return defaultValue
}

function downloader(url) {
    const a = document.createElement('a')
    a.href = url
    a.target = "_blank"
    a.download = url.split('/').pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  function linkToUse(){
      const BASE_URL =  `https://api.waifu.im/random/?is_nsfw=${checkbox.checked}`
      if(versatile.value){
          return BASE_URL + `&selected_tags=${versatile.value}&many=true&full=false`
      }

      return `https://api.waifu.im/random/?is_nsfw=${checkbox.checked}&many=true&full=false`
  }

  async function gettingTags(){
      const request = await fetch("https://api.waifu.im/tags/?full=false")
      const response = await request.json()

      response.versatile.forEach(element => {
          const option_tag = document.createElement('option')
          const text = document.createTextNode(element.charAt(0).toUpperCase() + element.slice(1)) //first letter uppercase
          setAttributes(option_tag, {value: element})
          option_tag.appendChild(text) 
          versatile.appendChild(option_tag)
      });
  }

gettingTags()