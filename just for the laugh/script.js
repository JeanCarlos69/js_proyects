
const btn = document.getElementById('btn')
const post = document.getElementById('source')
const download = document.getElementById('download')
const versatile = document.getElementById('versatile')
const versatile_dark = document.getElementById('NSFW')
const nsfw = document.getElementById('container-n')

const checkbox = document.getElementById('n')
const cache = {}
const record_id = []

checkbox.addEventListener('click', ()=>{
    const result = checkbox.checked
    if (result) {
        nsfw.hidden = false
        versatile.hidden = true
        versatile.value = ''
    } else {
        nsfw.hidden = true
        versatile.hidden = false
        versatile_dark.value = ''
    }
})
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
    buttonColor([post,download,btn,versatile,versatile_dark], bestPhoto.dominant_color) 
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
  
    for(let i = 0; i < photos.length;i++){ 
        
        _id = photos[i].image_id 
        creatingCardImages(_id)
        //save any new ID
        if(!record_id.includes(_id)) record_id.push(_id)

        cache[_id] = {dominant_color, url, source,file} = photos[i]
        return  cache[_id]
   }

   return { dominant_color: '#f5f5f5' }
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

      if(versatile.value != ''){
          console.log(`value: ${versatile.value}`)
          return BASE_URL + `&selected_tags=${versatile.value}&many=true&full=false`
      } else if(versatile_dark.value != ''){
        console.log(`value: ${versatile_dark.value}`)
          return BASE_URL + `&selected_tags=${versatile_dark.value}&many=true&full=false`
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

      response.nsfw.forEach(element => {
          const option_tag = document.createElement('option')
          const text = document.createTextNode(element.charAt(0).toUpperCase() + element.slice(1)) //first letter uppercase
          setAttributes(option_tag, {value: element})
          option_tag.appendChild(text) 
          versatile_dark.appendChild(option_tag)
      });
  }

gettingTags() 

function creatingCardImages(id){
    let cacheKeys = Object.keys(cache)
    
    //This will prevent repeted images (sometimes)
    if(record_id.includes(id)) return
    
    //Creating cards
    const div = document.createElement('div')
    const a = document.createElement('a')
    const img = document.createElement('img')
    div.classList.add('card')
    
    cacheKeys.forEach(key =>{
        Object.assign(a,{href: cache[key].url, target: "_blank", alt: cache[key].file})
        img.src = cache[key].url
        a.appendChild(img)
        div.appendChild(a)
        document.getElementsByClassName('card_container')[0].appendChild(div)

    })
    
    for (let member in cache) delete cache[member];
}
