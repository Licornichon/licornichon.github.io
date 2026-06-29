const https = require('https');
const fs = require('fs');
const path = require('path');

/*
  ⚠️ NOTE: Instagram feed currently uses PLACEHOLDER DATA for styling.

  To enable live Instagram posts:
  1. Convert @licornich0n to a Business Account (Instagram Settings)
  2. Create an app at https://developers.facebook.com
  3. Configure Instagram Graph API
  4. Generate a long-lived access token
  5. Add two GitHub secrets:
     - INSTAGRAM_ACCESS_TOKEN
     - INSTAGRAM_USER_ID
  6. This script will then fetch real posts automatically via GitHub Actions
*/

const TOKEN = process.env.INSTAGRAM_TOKEN;
const USER_ID = process.env.INSTAGRAM_USER_ID;
const OUTPUT_PATH = path.join(__dirname, '../src/data/instagram-posts.json');

if (!TOKEN || !USER_ID) {
  console.warn('⚠️ Missing INSTAGRAM_TOKEN or INSTAGRAM_USER_ID. Skipping fetch.');
  process.exit(0);
}

function fetchInstagram(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(new Error(`Failed to parse response: ${err.message}`));
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  try {
    console.log('📸 Fetching Instagram posts...');

    // Get media list
    const mediaUrl = `https://graph.instagram.com/${USER_ID}/media?fields=id,caption,media_type,media_url,timestamp,permalink&access_token=${TOKEN}`;
    const mediaResponse = await fetchInstagram(mediaUrl);

    if (!mediaResponse.data) {
      throw new Error('Invalid response from Instagram API');
    }

    const posts = mediaResponse.data
      .filter((item) => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL')
      .slice(0, 12)
      .map((item) => ({
        id: item.id,
        caption: item.caption || '',
        image: item.media_url,
        timestamp: item.timestamp,
        link: item.permalink,
      }));

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(posts, null, 2));
    console.log(`✅ Updated ${posts.length} Instagram posts`);
  } catch (error) {
    console.error(`❌ Failed to fetch Instagram posts: ${error.message}`);
    process.exit(1);
  }
}

main();
