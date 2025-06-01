
import { useState, useCallback } from 'react';
import { SentimentData, EngagementData, CryptoData, HashtagData } from '@/types/dashboard';

/**
 * Hook for managing social media and cryptocurrency data using mock data
 */
export const useSocialCryptoData = () => {
  // Initialize with mock data
  const [sentimentData, setSentimentData] = useState<SentimentData[]>([
    { date: '2024-01', positive: 65, negative: -20, neutral: 15, overall: 45 },
    { date: '2024-02', positive: 70, negative: -15, neutral: 25, overall: 55 },
    { date: '2024-03', positive: 60, negative: -25, neutral: 35, overall: 35 },
    { date: '2024-04', positive: 75, negative: -10, neutral: 20, overall: 65 },
    { date: '2024-05', positive: 80, negative: -12, neutral: 22, overall: 68 },
    { date: '2024-06', positive: 72, negative: -18, neutral: 28, overall: 54 }
  ]);

  const [engagementData, setEngagementData] = useState<EngagementData[]>([
    { platform: 'Twitter', likes: 15420, shares: 3240, comments: 1820, reach: 45000, engagement_rate: 4.8 },
    { platform: 'Facebook', likes: 24680, shares: 5670, comments: 3450, reach: 78000, engagement_rate: 6.2 },
    { platform: 'Instagram', likes: 38920, shares: 8940, comments: 5670, reach: 125000, engagement_rate: 8.5 },
    { platform: 'LinkedIn', likes: 12350, shares: 2890, comments: 1560, reach: 32000, engagement_rate: 3.7 },
    { platform: 'TikTok', likes: 45670, shares: 12340, comments: 8920, reach: 180000, engagement_rate: 12.3 }
  ]);

  const [cryptoData, setCryptoData] = useState<CryptoData[]>(() => {
    const data = [];
    let price = 45000;
    
    for (let i = 0; i < 24; i++) {
      const change = (Math.random() - 0.5) * 2000;
      price += change;
      const volume = Math.floor(Math.random() * 1000000);
      const marketCap = price * 19000000; // Approximate market cap calculation
      
      data.push({
        timestamp: `${String(i).padStart(2, '0')}:00`,
        price: Number(price.toFixed(2)),
        volume: volume,
        marketCap: marketCap,
        change24h: Number(change.toFixed(2))
      });
    }
    
    return data;
  });

  const [hashtagData, setHashtagData] = useState<HashtagData[]>([
    { tag: '#crypto', mentions: 15420, sentiment: 0.6, trend: 'up' as const },
    { tag: '#blockchain', mentions: 12350, sentiment: 0.4, trend: 'up' as const },
    { tag: '#bitcoin', mentions: 18920, sentiment: 0.2, trend: 'stable' as const },
    { tag: '#ethereum', mentions: 14670, sentiment: -0.1, trend: 'down' as const },
    { tag: '#defi', mentions: 9840, sentiment: 0.8, trend: 'up' as const },
    { tag: '#nft', mentions: 7230, sentiment: -0.3, trend: 'down' as const }
  ]);

  /**
   * Generates initial social crypto data using mock data
   */
  const generateInitialSocialCrypto = useCallback(() => {
    console.log('🚀 Loading mock social crypto data...');
    console.log('💭 Mock sentiment data:', sentimentData);
    console.log('📱 Mock engagement data:', engagementData);
    console.log('💰 Mock crypto data:', cryptoData);
    console.log('🏷️ Mock hashtag data:', hashtagData);
    
    // Data is already initialized, just log success
    console.log('✅ Mock social crypto data loaded successfully');
  }, [sentimentData, engagementData, cryptoData, hashtagData]);

  return {
    sentimentData,
    engagementData,
    cryptoData,
    hashtagData,
    generateInitialSocialCrypto
  };
};
