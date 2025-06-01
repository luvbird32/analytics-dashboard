
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SankeyData } from '@/types/dashboard';

interface SankeyChartProps {
  data: SankeyData;
}

/**
 * Sankey diagram for flow visualization
 */
export const SankeyChart = ({ data }: SankeyChartProps) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>User Flow Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="grid grid-cols-3 gap-8 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium">Sources</h4>
                {data.nodes.slice(0, 3).map(node => (
                  <div key={node.id} className="p-2 bg-primary/10 rounded text-xs">
                    {node.name}
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Pages</h4>
                {data.nodes.slice(3, 5).map(node => (
                  <div key={node.id} className="p-2 bg-secondary/10 rounded text-xs">
                    {node.name}
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Outcomes</h4>
                {data.nodes.slice(5).map(node => (
                  <div key={node.id} className="p-2 bg-accent/10 rounded text-xs">
                    {node.name}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Simplified flow visualization showing user journey paths
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
