/**
 * Analytics tracking utilities for Valavaara
 * Supports Google Analytics 4
 */

// TypeScript declaration for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const analytics = {
  /**
   * Track poster views and language toggles
   */
  viewPoster: (posterId: string, language: 'english' | 'kannada') => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_poster', {
        poster_id: posterId,
        language: language,
        event_category: 'engagement',
      });
    }
  },

  /**
   * Track file downloads (posters, shorts, BTS, press materials)
   */
  download: (
    type: 'poster' | 'short' | 'bts' | 'press' | 'crew' | 'promotion',
    itemId: string,
    filename: string
  ) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'file_download', {
        content_type: type,
        item_id: itemId,
        file_name: filename,
        event_category: 'downloads',
      });
    }
  },

  /**
   * Track video plays (trailer, shorts, reels)
   */
  playVideo: (videoId: string, videoType: 'trailer' | 'short' | 'reel', videoTitle?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'video_start', {
        video_id: videoId,
        video_type: videoType,
        video_title: videoTitle,
        event_category: 'video_engagement',
      });
    }
  },

  /**
   * Track booking button clicks
   */
  bookingClick: (source: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'booking_click', {
        source: source,
        destination: 'bookmyshow',
        event_category: 'conversions',
        value: 1,
      });
    }
  },

  /**
   * Track social shares
   */
  share: (platform: 'whatsapp' | 'twitter' | 'facebook' | 'instagram' | 'copy_link', contentType: string, contentId?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share', {
        method: platform,
        content_type: contentType,
        content_id: contentId,
        event_category: 'social',
      });
    }
  },

  /**
   * Track navigation to different pages
   */
  navigate: (destination: string, source?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_navigation', {
        destination: destination,
        source: source,
        event_category: 'navigation',
      });
    }
  },

  /**
   * Track character card interactions
   */
  viewCharacter: (characterName: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_character', {
        character_name: characterName,
        event_category: 'engagement',
      });
    }
  },

  /**
   * Track story chapter views
   */
  viewChapter: (chapterId: string, chapterTitle: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_chapter', {
        chapter_id: chapterId,
        chapter_title: chapterTitle,
        event_category: 'content',
      });
    }
  },

  /**
   * Track press kit section views
   */
  viewPressSection: (section: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_press_section', {
        section: section,
        event_category: 'press_kit',
      });
    }
  },

  /**
   * Track tab switches (trailer/shorts/bts)
   */
  switchTab: (tabName: string, currentPage: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tab_switch', {
        tab_name: tabName,
        current_page: currentPage,
        event_category: 'navigation',
      });
    }
  },

  /**
   * Track auto-open trailer from URL parameter
   */
  autoOpenTrailer: () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'auto_open_trailer', {
        source: 'url_parameter',
        event_category: 'engagement',
      });
    }
  },
};

export default analytics;
