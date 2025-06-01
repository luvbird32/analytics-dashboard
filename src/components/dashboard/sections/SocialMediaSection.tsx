
import { Users } from 'lucide-react';
import { SentimentChart } from '../charts/SentimentChart';
import { EngagementChart } from '../charts/EngagementChart';
import { HashtagChart } from '../charts/HashtagChart';
import { SentimentData, EngagementData, HashtagData } from '@/types/dashboard';

interface SocialMediaSectionProps {
  sentimentData: SentimentData[];
  engagementData: EngagementData[];
  hashtagData: HashtagData[];
}

/**
 * Social media analytics section with separate rows for better visual experience
 */
export const SocialMediaSection = ({
  sentimentData,
  engagementData,
  hashtagData
}: SocialMediaSectionProps) => {
  return (
    <div className="space-y-8 lg:space-y-10">
      <h2 className="text-xl lg:text-2xl font-semibold flex items-center gap-3">
        <Users className="h-5 w-5 lg:h-6 lg:w-6" />
        Social Media Analytics
      </h2>
      
      {/* Sentiment Chart - Full Width Row */}
      <div className="w-full">
        <SentimentChart data={sentimentData} />
      </div>
      
      {/* Engagement Chart - Full Width Row */}
      <div className="w-full">
        <EngagementChart data={engagementData} />
      </div>
      
      {/* Hashtag Chart - Full Width Row */}
      <div className="w-full">
        <HashtagChart data={hashtagData} />
      </div>
    </div>
  );
};
