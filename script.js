const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const newQuoteBtn = document.getElementById("quoteButton");
const titleEl = document.getElementById("quote-title");
let isFirstLoad = true;// to check if ts d first load
const tweetBtn = document.getElementById("tweetBtn");
//const container = document.querySelector(".container");
const quoteContainer = document.getElementById("container");
const colors = [
  'hsl(210, 80%, 90%)',
  'hsl(340, 70%, 80%)',
  'hsl(120, 40%, 85%)',
  'hsl(45, 90%, 85%)',
  'hsl(290, 80%, 90%)'
];

// Fct to fetch and display quote
async function getQuote() {
  spinner.style.display = "block";// When u start fetching a quote u show the spinner that is hidden by default
  quoteEl.style.display = "none";
  authorEl.style.display = "none";

  try {
    const randomParam = Math.random();// Add randomness to avoid caching
    //i used allorigins to bypass cors prblm
    const url = 'https://api.allorigins.win/get?url=' +
      encodeURIComponent('https://zenquotes.io/api/random?' + randomParam) +
      '&cache=false';
    const response = await fetch(url);
    const data = await response.json();
    const contents = JSON.parse(data.contents);
    const quote = contents[0];

    quoteEl.textContent = `"${quote.q}"`;
    authorEl.textContent = `– ${quote.a}`;
  } catch (error) {
    quoteEl.textContent = "Failed to fetch quote.";
    authorEl.textContent = "";
    console.error(error);
  }
  spinner.style.display = "none";//When the quote is loaded, u hide the spinner
  quoteEl.style.display = "block";
  authorEl.style.display = "block";
   if (isFirstLoad) {
    // First load — keep the default title
    isFirstLoad = false; // Turn it off for future clicks
  } else {
    titleEl.textContent = "Here's a quote for you 💌"; // After user clicks the button the new title is shown 
    tweetBtn.style.display = "inline-block"; // show d tweet btn
  }
}

//fnt to change d background color of d container whenever a new quote s generated
function changeContainerBackground() {
  // Pick a random color different from current
  let newColor;
  do {
    newColor = colors[Math.floor(Math.random() * colors.length)];
  } while (newColor === quoteContainer.style.backgroundColor);
  quoteContainer.style.backgroundColor = newColor;
  quoteContainer.classList.remove("animate-bg"); // Remove the class to reset the animation
  void quoteContainer.offsetWidth; //force the browser to reflow the element.
  quoteContainer.classList.add("animate-bg"); // Add the class back to trigger the animation
}

//this is temporary to test
/*const quotes = [
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" }
];

function getRandomQuote() {
  
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.textContent = `"${random.text}"`;
  authorEl.textContent = `– ${random.author}`;
  if (isFirstLoad) {
    // First load — keep the default title
    isFirstLoad = false; // Turn it off for future clicks
  } else {
    titleEl.textContent = "Here's a quote for you 💌"; // After user clicks the button the new title is shown 
    tweetBtn.style.display = "inline-block"; // show d tweet btn
  }
  

}*/
// if u ever press d button d 2 functions are called
newQuoteBtn.addEventListener("click", () => {
    getQuote() ;
    changeContainerBackground ();
});
// when u click d tweet btn
// it will open a new tab with d tweet
tweetBtn.addEventListener("click", () => {
  const quote = quoteEl.textContent;
  const author = authorEl.textContent;

  const tweetText = `${quote} ${author}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`; // Create the tweet URL
  window.open(tweetUrl, "_blank");// Open the tweet URL in a new tab
});

// when u press space bar it will generate a new quote
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();  // Prevents page from scrolling down
    getQuote();        // Call your function to get a new quote
  }
});

// when d page loads
getQuote();