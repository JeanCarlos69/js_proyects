const newQuoteButton = document.querySelector('#newQuote')
const quoteContainer = document.querySelector('#quote-container')
const TwitterBtn = document.querySelector('#twitter')
const quotesChart = document.querySelector('#quote')
const author = document.querySelector('#author')
const loader = document.querySelector('#loader')
let apiQuotes = []

//on load
getQuotes()

//Event listeners
newQuoteButton.addEventListener('click', getQuotes)
TwitterBtn.addEventListener('click', tweetQuote)


/*
 * FUNCTIONS
 */

//Show loader
function loading(){
    loader.hidden = false
    quoteContainer.hidden = true
}
//hide
function complete(){
    loader.hidden = true
    quoteContainer.hidden = false
}


function newQuote(){
    loading()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    
    //checking quote length
    quote.text.length > 85 ? quotesChart.classList.add('long-text') : quotesChart.classList.remove('long-text')

    //Set the quote, hide the loader
    quotesChart.textContent = quote.text;
    author.textContent = quote.author ? quote.author : 'Unknown';
    complete()

}

//Get quotes from API
async function getQuotes(){
    loading()
    const apiURL = "https://type.fit/api/quotes"

    try {
        const response = await fetch(apiURL)
        apiQuotes = await response.json()
        newQuote()
    } catch (error) {
        
    }
}

// Tweet Quote
function tweetQuote(){
    const twitterURL = `https://twitter.com/intent/tweet?text=${quotesChart.textContent} - ${author.textContent}`
    window.open(twitterURL, '_blank')
}

// For localquotes this will require to load the script in the html index
// function otro(){
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
//     console.log(quote)
// }

// otro()
