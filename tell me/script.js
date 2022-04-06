const btn = document.getElementById('btn')
const post = document.getElementById('source')
const download = document.getElementById('download')
let p = document.getElementById('text')
var textToAdd = document.createTextNode(`w: ${window.screen.availWidth} h: ${window.screen.availHeight}`);
p.appendChild(textToAdd)

btn.addEventListener('click', changeBackground)

async function changeBackground(){
    const request =  await fetch('https://api.waifu.im/random/?is_nsfw=false&many=true&full=false')
    const response = await request.json()
    let bestPhoto = perfectImage(response.images)

    //body
    document.body.style.background = `${bestPhoto.dominant_color} url(${bestPhoto.url}) no-repeat center center fixed`;
    document.body.style.backgroundSize = 'cover';

    addAttribute([post,download], {href: bestPhoto.source})
    buttonColor(post, bestPhoto.dominant_color)
    buttonColor(download, bestPhoto.dominant_color)   

}

function buttonColor(element, color){
    element.style.background = color
}

function addAttribute(arr, obj){
    arr.forEach(element => {
        Object.assign(element, obj)
    });
}

function perfectImage(photos){
   for(let i = 0; i < photos.length;i++){
       console.log(photos[i].width)
    if(parseInt(photos[i].width) <= window.screen.availHeight ){
        console.log(`Actual image: ${parseInt(photos[i].width)} screenW: ${window.screen.availWidth}`)
        return {dominant_color, url, source} = photos[i] 
    }
   }
   
}