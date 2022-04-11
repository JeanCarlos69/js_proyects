const button = document.getElementById('joke_btn')
const audioElement = document.getElementById('audio')
const spanish = document.getElementById('spanish')
const label = document.getElementsByClassName("myButton")

//Disable button
function toggleButton(){
    button.disabled = !button.disabled
}

//Get JOKESapi
async function getJokes(){

    try {
        const response = await fetch(jokeLinks())
        const data = await response.json()
            console.table(data)
        if (data.setup){
           tellJoke(`${data.setup} ... ${data.delivery}`)
        } else {
            tellJoke(data.joke)
        }
        toggleButton()
    } catch (error) {
        console.log('JOKES', error)
    }
}

//This will act like a bridge between both API
//We first get the joke and then pass it to the audio
function tellJoke(joke){
   if (spanish.checked) {
    VoiceRSS.speech({
        key: 'f8f6e2909ca44766818de1c64939b2e9',
        src: joke,
        hl: 'es-es',
        v: 'Diego',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
   } else {
    VoiceRSS.speech({
        key: 'f8f6e2909ca44766818de1c64939b2e9',
        src: joke,
        hl: 'en-us',
        v: 'John',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
   }
}
//Link for the JOKES

function jokeLinks(){
    if (spanish.checked) {
        return "https://v2.jokeapi.dev/joke/Any?lang=es"
    } 

    return "https://v2.jokeapi.dev/joke/Any"
}


button.addEventListener('click', getJokes)
spanish.addEventListener('click', e =>{
    if (spanish.checked) {
        label[0].textContent = "Español ✅"
        button.textContent = "Dime una broma"
    } else {
        label[0].textContent = "Spanish"
        button.textContent = "Tell me a Joke"
    }
})
audioElement.addEventListener('ended', toggleButton)