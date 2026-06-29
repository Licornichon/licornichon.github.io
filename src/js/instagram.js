/*
  ⚠️ NOTE: Instagram feed currently uses PLACEHOLDER DATA for styling.

  Replace this with real Instagram posts once:
  1. INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID are configured as GitHub secrets
  2. The GitHub Actions workflow (instagram-feed.yml) is triggered
  3. src/data/instagram-posts.json is populated with real posts
*/

const { t } = require('./lang');

async function loadInstagramPosts() {
  const grid = document.getElementById('instagram-grid');
  if (!grid) return;

  try {
    const response = await fetch('./data/instagram-posts.json');
    if (!response.ok) throw new Error('Failed to load posts');

    const posts = await response.json();

    if (!posts || posts.length === 0) {
      grid.innerHTML = `<div class="instagram__empty">${t('instagram.empty')}</div>`;
      return;
    }

    grid.innerHTML = posts
      .map(
        (post) => `
      <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="instagram__post" title="${post.caption}">
        <img src="${post.image}" alt="${post.caption}" loading="lazy">
        <div class="instagram__post__overlay">
          <span class="instagram__post__icon">❤</span>
        </div>
      </a>
    `
      )
      .join('');
  } catch (error) {
    console.error('Error loading Instagram posts:', error);
    grid.innerHTML = `<div class="instagram__empty">Unable to load posts</div>`;
  }
}

document.addEventListener('DOMContentLoaded', loadInstagramPosts);
