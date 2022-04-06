const btn = document.getElementById('btn')
const post = document.getElementById('source')
const download = document.getElementById('download')

btn.addEventListener('click', getJoke)


//Calling the API
// async function getJoke(){
//     const request =  await fetch('https://animechan.vercel.app/api/random')
//     const {quote, anime} = await request.json()

//     let utterance = new SpeechSynthesisUtterance(`${quote} From the anime = ${anime}`);
//     speechSynthesis.speak(utterance);
    
//     console.log()
// }

async function getJoke(){
    const request =  await fetch('https://api.waifu.im/random/?is_nsfw=false')
    const response = await request.json()
    //const {} = response[0]
    const {dominant_color, url, source} = response.images[0]
    console.table(response.images[0])

    document.body.style.background = `${dominant_color} url(${url}) no-repeat center center fixed`;
    document.body.style.backgroundSize = 'cover';
    Object.assign(post, {href: source})
    Object.assign(download, {href: url})
}