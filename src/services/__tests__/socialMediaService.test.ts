
import { SocialMediaService } from '../social/socialMediaService';

describe('SocialMediaService', () => {
  describe('generateSentimentData', () => {
    it('generates sentiment data for 14 days', () => {
      const data = SocialMediaService.generateSentimentData();
      
      expect(data).toHaveLength(14);
      expect(data[0]).toHaveProperty('date');
      expect(data[0]).toHaveProperty('positive');
      expect(data[0]).toHaveProperty('negative');
      expect(data[0]).toHaveProperty('neutral');
      expect(data[0]).toHaveProperty('overall');
    });

    it('generates valid sentiment values', () => {
      const data = SocialMediaService.generateSentimentData();
      
      data.forEach(item => {
        expect(item.positive).toBeGreaterThanOrEqual(0);
        expect(item.negative).toBeGreaterThanOrEqual(0);
        expect(item.neutral).toBeGreaterThanOrEqual(0);
        expect(typeof item.overall).toBe('number');
      });
    });
  });

  describe('generateEngagementData', () => {
    it('generates engagement data for social platforms', () => {
      const data = SocialMediaService.generateEngagementData();
      
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('platform');
      expect(data[0]).toHaveProperty('likes');
      expect(data[0]).toHaveProperty('shares');
      expect(data[0]).toHaveProperty('comments');
      expect(data[0]).toHaveProperty('reach');
      expect(data[0]).toHaveProperty('engagement_rate');
    });

    it('includes expected platforms', () => {
      const data = SocialMediaService.generateEngagementData();
      const platforms = data.map(item => item.platform);
      
      expect(platforms).toContain('Instagram');
      expect(platforms).toContain('Twitter');
      expect(platforms).toContain('Facebook');
    });
  });

  describe('generateHashtagData', () => {
    it('generates hashtag data', () => {
      const data = SocialMediaService.generateHashtagData();
      
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('tag');
      expect(data[0]).toHaveProperty('mentions');
      expect(data[0]).toHaveProperty('sentiment');
      expect(data[0]).toHaveProperty('trend');
    });

    it('sorts hashtags by mentions in descending order', () => {
      const data = SocialMediaService.generateHashtagData();
      
      for (let i = 0; i < data.length - 1; i++) {
        expect(data[i].mentions).toBeGreaterThanOrEqual(data[i + 1].mentions);
      }
    });
  });
});
