
import React from 'react';
import { Activity } from 'lucide-react';
import { AIRetrainingPanel } from '../AIRetrainingPanel';
import { useAIRetraining } from '@/hooks/useAIRetraining';

interface AIManagementSectionProps {
  data: any[];
}

/**
 * AI Management section with retraining and data cleaning
 */
export const AIManagementSection = ({ data }: AIManagementSectionProps) => {
  const {
    modelStatus,
    dataQuality,
    predictions,
    cleanData,
    retrainModel,
    autoRetrain
  } = useAIRetraining();

  const handleRetrain = async () => {
    const historicalData = data.slice(0, -10);
    const newData = data.slice(-10);
    await retrainModel(historicalData, newData);
  };

  const handleCleanData = async () => {
    await cleanData(data);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl lg:text-2xl font-semibold flex items-center gap-3">
        <Activity className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600" />
        AI Model Management
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <AIRetrainingPanel
          modelStatus={modelStatus}
          dataQuality={dataQuality}
          predictions={predictions}
          onRetrain={handleRetrain}
          onCleanData={handleCleanData}
        />
      </div>
    </div>
  );
};
