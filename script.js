const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//show loading animation
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//hide loading 
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// get Quote from API
async function getQuote() {
    loading();
    const apiURL = "https://type.fit/api/quotes/?method=getQuote&lang=en&format=json";
    
    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        console.log(data);

        let number = Math.floor(Math.random() * data.length);
        let quote; // quote var
        //UNKNOWN AUTHOR
        if (data[number].author === null) {
          quote = data[number];
          quote.author = "Unknown";
        } else {
          quote = data[number];          
          authorText.innerText = quote.author;
        }
        console.log("Quote Length: "+quote.text.length);
        //DYNAMIC QUOTE TEXT REDUCTION
        if(quote.text.length>120){
            quoteText.classList.add('long-quote');    
        } else{
           quoteText.classList.remove('long-quote');
        } 
        //always want quoteText to be quote.text so no need to put it in any loop etc.
        quoteText.innerText = quote.text;
        // Stop Loader animation and show quote
        complete();
      } catch (error) {        
        
      }

}
//Twitter Function
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);

twitterBtn.addEventListener('click', tweetQuote);


// on Load

getQuote();

