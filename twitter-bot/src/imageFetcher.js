import fetch from "node-fetch";

const UNSPLASH_ACCESS_KEY = "aCXB6CKvZAcA_TmxS73ySBbajx6y8pdfKy3OAMaLEO8";

// Fetch background image based on the quote
export async function fetchBackgroundImage(quote) {
  const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(quote)}&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.urls && data.urls.regular ? data.urls.regular : null;
  } catch (e) {
    console.error("Failed to fetch Unsplash image", e);
    return null;
  }
}