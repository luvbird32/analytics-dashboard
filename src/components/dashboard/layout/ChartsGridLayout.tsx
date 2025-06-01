
import React from 'react';
import { MainChartsSection } from '../sections/MainChartsSection';
import { EChartsSection } from '../sections/EChartsSection';
import { DetailedAnalyticsSection } from '../analytics/DetailedAnalyticsSection';
import { SalesTrafficSection } from '../sections/SalesTrafficSection';
import { SocialMediaSection } from '../sections/SocialMediaSection';
import { CryptocurrencySection } from '../sections/CryptocurrencySection';
import { AdvancedAnalyticsSection } from '../sections/AdvancedAnalyticsSection';
import { SpecializedChartsSection } from '../sections/SpecializedChartsSection';

interface ChartsGridLayoutProps {
  sections: {
    main: React.ReactNode;
    echarts: React.ReactNode;
    analytics: React.ReactNode;
    salesTraffic: React.ReactNode;
    social: React.ReactNode;
    crypto: React.ReactNode;
    advanced: React.ReactNode;
    specialized: React.ReactNode;
  };
}

/**
 * Layout component for organizing chart sections
 */
export const ChartsGridLayout: React.FC<ChartsGridLayoutProps> = ({ sections }) => {
  return (
    <div className="space-y-12 lg:space-y-16">
      {sections.main}
      {sections.echarts}
      {sections.analytics}
      {sections.salesTraffic}
      {sections.social}
      {sections.crypto}
      {sections.advanced}
      {sections.specialized}
    </div>
  );
};
