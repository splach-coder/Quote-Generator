import fetch from "node-fetch";

export async function fetchQuote() {
  const randomParam = Math.random();
  const url =
    "https://api.allorigins.win/get?url=" +
    encodeURIComponent(`https://zenquotes.io/api/random?${randomParam}`) +
    "&cache=false";

  try {
    const response = await fetch(url);
    const data = await response.json();
    const contents = JSON.parse(data.contents);
    const quote = contents[0];
    return {
      text: quote.q,
      author: quote.a,
    };
  } catch (error) {
    console.error("Failed to fetch quote", error);
    return {
      text: "Failed to fetch quote.",
      author: "Unknown",
    };
  }
}
