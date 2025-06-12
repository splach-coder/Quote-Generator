import rwClient from "./twitterClient.js";
import { fetchQuote } from "./quoteFetcher.js";
import { fetchBackgroundImage } from "./imageFetcher.js";
import fetch from "node-fetch";

// Helper to download image and return buffer
async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to download image");
  return Buffer.from(await response.arrayBuffer());
}

async function postQuoteWithImage() {
  try {
    // 1. Fetch quote
    const { text, author } = await fetchQuote();
    

    // 2. Fetch background image
    const imageUrl = await fetchBackgroundImage(text);
    

    let mediaId = null;

    if (imageUrl) {
      // 3. Download image
      const imageBuffer = await downloadImage(imageUrl);
      

      // 4. Upload image using v1 (v2 does not support media upload yet)
      mediaId = await rwClient.v1.uploadMedia(imageBuffer, {
        mimeType: "image/jpeg",
      });
      
    }

    // 5. Compose tweet content
    const tweetText = `"${text}"\n— ${author}`;

    // 6. Post tweet using v2 
    let tweet;
    if (mediaId) {
      tweet = await rwClient.v2.tweet({
        text: tweetText,
        media: { media_ids: [mediaId] },//media_ids must be inside a media object in v2.since the uploadMedia method returns a media_id
        
      });
      
    } else {
      tweet = await rwClient.v2.tweet({ text: tweetText });
      
    }

    console.log(" Tweet posted successfully!");
  } catch (error) {
    console.error(" Failed to post tweet:", error);
  }
}

export { postQuoteWithImage };

