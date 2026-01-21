// Instagram Graph API integration to fetch reels

export interface InstagramReel {
  id: string;
  media_type: string;
  media_url: string;
  thumbnail_url: string;
  permalink: string;
  caption: string;
  timestamp: string;
}

const INSTAGRAM_GRAPH_API = 'https://graph.instagram.com';
const INSTAGRAM_BUSINESS_ACCOUNT_ID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

/**
 * Fetch reels from your Valavaara Instagram account
 */
export async function fetchInstagramReels(limit: number = 10): Promise<InstagramReel[]> {
  if (!INSTAGRAM_BUSINESS_ACCOUNT_ID || !ACCESS_TOKEN) {
    console.error('Instagram credentials not configured');
    return [];
  }

  try {
    // Fetch media from your account
    const response = await fetch(
      `${INSTAGRAM_GRAPH_API}/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp&access_token=${ACCESS_TOKEN}&limit=${limit}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Filter only reels/videos
    const reels = data.data.filter((item: InstagramReel) => 
      item.media_type === 'VIDEO' || item.media_type === 'REELS'
    );

    return reels;
  } catch (error) {
    console.error('Error fetching Instagram reels:', error);
    return [];
  }
}

/**
 * Get a single reel by ID
 */
export async function getInstagramReel(reelId: string): Promise<InstagramReel | null> {
  if (!ACCESS_TOKEN) {
    console.error('Instagram access token not configured');
    return null;
  }

  try {
    const response = await fetch(
      `${INSTAGRAM_GRAPH_API}/${reelId}?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp&access_token=${ACCESS_TOKEN}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Instagram reel:', error);
    return null;
  }
}

/**
 * Refresh your access token (tokens expire every 60 days)
 */
export async function refreshAccessToken(currentToken: string): Promise<string | null> {
  try {
    const response = await fetch(
      `${INSTAGRAM_GRAPH_API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`
    );

    if (!response.ok) {
      throw new Error(`Token refresh error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
}
