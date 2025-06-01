
import { SentimentData, EngagementData, HashtagData } from '@/types/dashboard';

/**
 * Social media analytics data generation service
 * Handles sentiment analysis, engagement metrics, and hashtag tracking
 */
export class SocialMediaService {
  /**
   * Generates sentiment analysis data for social media monitoring
   */
  static generateSentimentData(): SentimentData[] {
    return Array.from({ length: 14 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (13 - i));
      
      const positive = Math.floor(Math.random() * 40) + 20;
      const negative = Math.floor(Math.random() * 30) + 10;
      const neutral = Math.floor(Math.random() * 30) + 20;
      const overall = positive - negative + (Math.random() - 0.5) * 20;
      
      return {
        date: date.toISOString().split('T')[0],
        positive,
        negative,
        neutral,
        overall: Math.round(overall)
      };
    });
  }

  /**
   * Generates engagement data for social platforms
   */
  static generateEngagementData(): EngagementData[] {
    const platforms = ['Instagram', 'Twitter', 'Facebook', 'TikTok', 'LinkedIn'];
    return platforms.map(platform => ({
      platform,
      likes: Math.floor(Math.random() * 10000) + 1000,
      shares: Math.floor(Math.random() * 2000) + 200,
      comments: Math.floor(Math.random() * 1000) + 100,
      reach: Math.floor(Math.random() * 50000) + 5000,
      engagement_rate: Math.round((Math.random() * 8 + 2) * 100) / 100
    }));
  }

  /**
   * Generates trending hashtag data
   */
  static generateHashtagData(): HashtagData[] {
    const hashtags = [
      '#crypto', '#bitcoin', '#ethereum', '#web3', '#nft',
      '#defi', '#blockchain', '#trading', '#hodl', '#metaverse'
    ];
    
    return hashtags.map(tag => ({
      tag,
      mentions: Math.floor(Math.random() * 5000) + 500,
      sentiment: (Math.random() - 0.5) * 2,
      trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable'
    })).sort((a, b) => b.mentions - a.mentions).slice(0, 8);
  }
}
