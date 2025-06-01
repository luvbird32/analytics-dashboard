
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Brain, RefreshCw, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';

interface AIRetrainingPanelProps {
  modelStatus: {
    isTraining: boolean;
    accuracy: number;
    version: string;
    lastTrained: Date | null;
  };
  dataQuality: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
  predictions: any[];
  onRetrain: () => void;
  onCleanData: () => void;
}

/**
 * AI Retraining control panel component
 */
export const AIRetrainingPanel = ({
  modelStatus,
  dataQuality,
  predictions,
  onRetrain,
  onCleanData
}: AIRetrainingPanelProps) => {
  const getQualityColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getQualityBadge = (score: number) => {
    if (score >= 0.8) return <Badge variant="default" className="bg-green-100 text-green-800">Excellent</Badge>;
    if (score >= 0.6) return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Good</Badge>;
    return <Badge variant="destructive">Needs Improvement</Badge>;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Brain className="h-5 w-5 text-blue-600" />
          AI Model Management
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Model Status */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Model Status</span>
            <Badge variant={modelStatus.isTraining ? "secondary" : "default"}>
              {modelStatus.isTraining ? 'Training...' : 'Ready'}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Accuracy:</span>
              <div className="flex items-center gap-2 mt-1">
                <Progress value={modelStatus.accuracy * 100} className="flex-1 h-2" />
                <span className="font-medium">{(modelStatus.accuracy * 100).toFixed(1)}%</span>
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Version:</span>
              <p className="font-medium">{modelStatus.version}</p>
            </div>
          </div>
          
          {modelStatus.lastTrained && (
            <p className="text-sm text-muted-foreground">
              Last trained: {modelStatus.lastTrained.toLocaleString()}
            </p>
          )}
        </div>

        <Separator />

        {/* Data Quality */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Data Quality</span>
            {getQualityBadge(dataQuality.score)}
          </div>
          
          <div className="flex items-center gap-2">
            <Progress value={dataQuality.score * 100} className="flex-1 h-2" />
            <span className={`font-medium ${getQualityColor(dataQuality.score)}`}>
              {(dataQuality.score * 100).toFixed(0)}%
            </span>
          </div>
          
          {dataQuality.issues.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-orange-600">
                <AlertTriangle className="h-4 w-4" />
                Issues Found
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                {dataQuality.issues.map((issue, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {dataQuality.recommendations.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                <CheckCircle className="h-4 w-4" />
                Recommendations
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                {dataQuality.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Separator />

        {/* Predictions */}
        {predictions.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-medium">
              <TrendingUp className="h-4 w-4 text-green-600" />
              AI Predictions
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm">
              {predictions.slice(0, 3).map((pred, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                  <span>Next {index + 1}h: {pred.predictedValue.toFixed(0)}</span>
                  <Badge variant="outline" className="text-xs">
                    {(pred.confidence * 100).toFixed(0)}% confidence
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={onRetrain}
            disabled={modelStatus.isTraining}
            className="flex-1"
            variant="default"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${modelStatus.isTraining ? 'animate-spin' : ''}`} />
            {modelStatus.isTraining ? 'Training...' : 'Retrain Model'}
          </Button>
          
          <Button onClick={onCleanData} variant="outline" className="flex-1">
            <Brain className="h-4 w-4 mr-2" />
            Clean Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
