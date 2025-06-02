
import { useState, useCallback, useEffect } from 'react';
import { SentimentData, EngagementData, CryptoData, HashtagData } from '@/types/dashboard';

/**
 * Hook for managing social media and cryptocurrency data
 */
export const useSocialCryptoData = () => {
  const [sentimentData, setSentimentData] = useState<SentimentData[]>([]);
  const [engagementData, setEngagementData] = useState<EngagementData[]>([]);
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [hashtagData, setHashtagData] = useState<HashtagData[]>([]);

  const generateSentimentData = useCallback(() => {
    const dates = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05'];
    return dates.map(date => ({
      date,
      positive: Math.floor(Math.random() * 40) + 30,
      negative: Math.floor(Math.random() * 30) + 10,
      neutral: Math.floor(Math.random() * 20) + 20,
      overall: Math.floor(Math.random() * 60) + 20
    }));
  }, []);

  const generateEngagementData = useCallback(() => {
    const platforms = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'TikTok'];
    return platforms.map(platform => ({
      platform,
      likes: Math.floor(Math.random() * 5000) + 1000,
      shares: Math.floor(Math.random() * 2000) + 500,
      comments: Math.floor(Math.random() * 1000) + 200,
      reach: Math.floor(Math.random() * 50000) + 10000, // Added missing reach property
      engagement_rate: Math.random() * 10 + 2
    }));
  }, []);

  const generateCryptoData = useCallback(() => {
    const timestamps = Array.from({ length: 30 }, (_, i) => 
      new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    );
    return timestamps.map(timestamp => ({
      timestamp,
      price: Math.random() * 20000 + 30000,
      volume: Math.random() * 1000000 + 500000,
      marketCap: Math.random() * 500000000000 + 500000000000, // Added missing marketCap property
      change24h: (Math.random() - 0.5) * 10 // Added missing change24h property
    }));
  }, []);

  const generateHashtagData = useCallback(() => {
    const hashtags = ['#trending', '#viral', '#tech', '#crypto', '#social'];
    return hashtags.map(tag => ({
      tag,
      mentions: Math.floor(Math.random() * 10000) + 1000,
      sentiment: (Math.random() - 0.5) * 2,
      trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable'
    }));
  }, []);

  const generateInitialSocialCrypto = useCallback(async () => {
    console.log('🚀 Generating social crypto data...');
    
    try {
      const sentiment = generateSentimentData();
      const engagement = generateEngagementData();
      const crypto = generateCryptoData();
      const hashtag = generateHashtagData();

      setSentimentData(sentiment);
      setEngagementData(engagement);
      setCryptoData(crypto);
      setHashtagData(hashtag);

      console.log('✅ Social crypto data generated:', {
        sentiment: sentiment.length,
        engagement: engagement.length,
        crypto: crypto.length,
        hashtag: hashtag.length
      });
    } catch (error) {
      console.error('❌ Error generating social crypto data:', error);
    }
  }, [generateSentimentData, generateEngagementData, generateCryptoData, generateHashtagData]);

  // Generate initial data on mount
  useEffect(() => {
    generateInitialSocialCrypto();
  }, [generateInitialSocialCrypto]);

  return {
    sentimentData,
    engagementData,
    cryptoData,
    hashtagData,
    generateInitialSocialCrypto
  };
};
