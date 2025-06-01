
import { useState, useCallback } from 'react';
import { SentimentData, EngagementData, CryptoData, HashtagData } from '@/types/dashboard';
import { DataGeneratorService } from '@/services/dataGenerator';

/**
 * Hook for managing social media and crypto data
 */
export const useSocialCryptoData = () => {
  const [sentimentData, setSentimentData] = useState<SentimentData[]>([]);
  const [engagementData, setEngagementData] = useState<EngagementData[]>([]);
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [hashtagData, setHashtagData] = useState<HashtagData[]>([]);

  /**
   * Generates initial social media and crypto data
   */
  const generateInitialSocialCrypto = useCallback(() => {
    console.log('📱 Generating social media and crypto data...');
    
    setSentimentData(DataGeneratorService.generateSentimentData());
    setEngagementData(DataGeneratorService.generateEngagementData());
    setCryptoData(DataGeneratorService.generateCryptoData());
    setHashtagData(DataGeneratorService.generateHashtagData());
  }, []);

  return {
    sentimentData,
    engagementData,
    cryptoData,
    hashtagData,
    generateInitialSocialCrypto
  };
};
