import axios from "axios";
import * as cheerio from "cheerio";
import { YoutubeTranscript, TranscriptResponse } from "youtube-transcript";

export async function extractTweetFromNitter(
  tweetUrl: string
): Promise<string | null> {
  const tweetId = tweetUrl.match(/status\/(\d+)/)?.[1];
  const username = tweetUrl.match(/x\.com\/([^/]+)\/status/)?.[1];

  if (!tweetId || !username) throw new Error("Invalid Tweet URL");

  const nitterURL = `https://nitter.net/${username}/status/${tweetId}`;
  console.log(`🔍 Fetching from: ${nitterURL}`);

  const res = await axios.get(nitterURL, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      "Accept-Language": "en-US,en;q=0.9",
    },
  });

  const $ = cheerio.load(res.data);
  const tweetContent = $(".main-tweet .tweet-content").text().trim();

  if (!tweetContent) {
    console.warn(
      "⚠️ Tweet content not found. Maybe selector changed or tweet is private."
    );
    return null;
  }

  return tweetContent;
}

// Call the function
// extractTweetFromNitter("https://x.com/gharkekalesh/status/1907772573879869778")
//   .then((content: string | null) => {
//     if (content) {
//       console.log(`✅ Extracted Tweet:\n${content}`);
//     } else {
//       console.log("❌ No content found.");
//     }
//   })
//   .catch((err: unknown) => {
//     console.error("💥 Error:", err);
//   });

export async function youtubeToText(url: string): Promise<string> {
  const transcripts: TranscriptResponse[] =
    await YoutubeTranscript.fetchTranscript(`${url}`);

  let caption = "";
  transcripts.forEach((transcript: TranscriptResponse) => {
    caption += transcript.text;
  });
  return caption;
}
