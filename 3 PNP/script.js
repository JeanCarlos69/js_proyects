const button = document.getElementById('PIP')
const video = document.getElementById('video')

//Promts access

async function selectMediaStream(){
    try { 
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        video.srcObject = mediaStream
        video.onloadeddata = ()=> {
            video.play()
        }
    } catch (error) {
        console.log(error)
    }
}

button.addEventListener('click', async()=>{
    //Disable button
    button.disabled = true
    //Start picture in picture
    await video.requestPictureInPicture()
    //reset button
    button.disabled = false
    
})

//on load
selectMediaStream() //Some windows won't open