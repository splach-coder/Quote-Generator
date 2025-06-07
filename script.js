const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const newQuoteBtn = document.getElementById("quoteButton");
const titleEl = document.getElementById("quote-title");
let isFirstLoad = true;// to check if ts d first load
const tweetBtn = document.getElementById("tweetBtn");
const quoteContainer = document.getElementById("container");
const spinner = document.getElementById("spinner");
const authorAvatar = document.getElementById("author-avatar");
const colors = [
  'hsl(210, 80%, 90%)',
  'hsl(340, 70%, 80%)',
  'hsl(120, 40%, 85%)',
  'hsl(45, 90%, 85%)',
  'hsl(290, 80%, 90%)'
];
// Add event listeners for like and share buttons
const likeBtn = document.querySelector('.like-btn');
const shareFacebook = document.getElementById('share-facebook');
const shareInstagram = document.getElementById('share-instagram');



// Update share links when quote changes
function updateShareLinks(quote, author) {
    const text = encodeURIComponent(`"${quote}" — ${author}`);
    shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=https://yourwebsite.com&quote=${text}`;
    // Instagram does not support direct sharing via URL, so you can copy to clipboard 
    shareInstagram.href = "https://www.instagram.com/";
    shareInstagram.onclick = () => {
        navigator.clipboard.writeText(`"${quote}" — ${author}`);
        alert("Quote copied! Paste it in your Instagram story or post.");}
    shareFacebook.onclick = () => {
        navigator.clipboard.writeText(`"${quote}" — ${author}`);
        alert("Quote copied! Paste it in your Facebook or post.");
        
    }
    return false;
}
// Fetch Unsplash image for background (whole quote as query)
async function fetchBackgroundImage(quote) {
  const accessKey = "aCXB6CKvZAcA_TmxS73ySBbajx6y8pdfKy3OAMaLEO8";
  const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(quote)}&orientation=landscape&client_id=${accessKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.urls && data.urls.regular ? data.urls.regular : null;
  } catch (e) {
    console.error("Failed to fetch Unsplash image", e);
    return null;
  }
}
// Fetch Unsplash avatar for author (portrait only)
async function fetchAuthorAvatar(author) {
  const accessKey = "aCXB6CKvZAcA_TmxS73ySBbajx6y8pdfKy3OAMaLEO8";
  const url = `https://api.unsplash.com/photos/random?query=portrait,${encodeURIComponent(author)}&orientation=portrait&client_id=${accessKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.urls && data.urls.thumb ? data.urls.thumb : "images/avatar-placeholder.png";//It checks if the JSON response contains a property urls, and if inside urls there's a property called thumb
  } catch (e) {
    console.error("Failed to fetch author avatar", e);
    return "images/avatar-placeholder.png";
  }
}

// Fct to fetch and display quote
async function getQuote() {
  spinner.style.display = "block";
  quoteEl.style.display = "none";
  authorEl.style.display = "none";
  authorAvatar.style.display = "none";

  try {
    const randomParam = Math.random();
    const url = 'https://api.allorigins.win/get?url=' +
      encodeURIComponent('https://zenquotes.io/api/random?' + randomParam) +
      '&cache=false';
    const response = await fetch(url);
    const data = await response.json();
    const contents = JSON.parse(data.contents);
    const quote = contents[0];

    quoteEl.textContent = `"${quote.q}"`;
    authorEl.textContent = ` ${quote.a}`;
    // Set author avatar
    const avatarUrl = await fetchAuthorAvatar(quote.a);
    authorAvatar.src = avatarUrl;
    authorAvatar.style.display = "block";

    // Extract up to 6 keywords and set Unsplash image as container background
    /*const keywords = extractKeywords(quote.q);
    console.log("Extracted keywords:", keywords);
    const imageUrl = await fetchBackgroundImage(keywords);*/
    const imageUrl = await fetchBackgroundImage(quote.q);
    if (imageUrl) {
      quoteContainer.style.backgroundImage = `url('${imageUrl}')`;
      quoteContainer.style.backgroundSize = "cover";
      quoteContainer.style.backgroundPosition = "center";
      quoteContainer.style.backgroundRepeat = "no-repeat";
      quoteContainer.style.backdropFilter = "blur(10px)";
    } else {
      quoteContainer.style.backgroundImage = "";
      quoteContainer.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    }
    updateShareLinks(quote.q, quote.a);
  } catch (error) {
    quoteEl.textContent = "Failed to fetch quote.";
    authorEl.textContent = "";
    authorAvatar.style.display = "none";
    console.error(error);
  }
  spinner.style.display = "none";
  quoteEl.style.display = "block";
  authorEl.style.display = "block";
  authorAvatar.style.display = "block";
  if (isFirstLoad) {
    isFirstLoad = false;
  } else {
    titleEl.textContent = "";
    tweetBtn.style.display = "inline-block";
  }
}

// if u ever press d button d function is called
newQuoteBtn.addEventListener("click", () => {
    getQuote();
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

likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('liked');
});


// when d page loads
getQuote();
